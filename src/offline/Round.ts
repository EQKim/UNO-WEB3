import type { Card, Color } from "../cards/Card";
import { matches } from "../cards/Rules";
import { StandardDeck, Deck } from "./Deck";
import { PlayerHand, Hand } from "./Hand";

export interface PlayerState { id: string; hand: Hand; }
export interface RoundSnapshot {
  players: { id: string; handCount: number }[];
  topCard: Card;
  currentPlayer: string;
  direction: 1 | -1;
  winner?: string;
  pendingDraw?: number; // accumulated draw2/draw4
  pendingType?: "draw2" | "draw4" | null;
  chosenColor?: Color | null; // color locked by last wild
  chainPlayerId?: string | null; // if set, same player may continue playing same number value
  chainValue?: number | null; // number being chained
  pendingTargetId?: string | null; // next player forced to satisfy pending draw
  history?: HistoryEntry[]; // append-only play/draw/endTurn log
}

export type HistoryEntry =
  | { kind: "play"; playerId: string; card: Card; chosenColor?: Color }
  | { kind: "draw"; playerId: string; amount: number }
  | { kind: "penaltyDraw"; playerId: string; amount: number; reason: "draw2" | "draw4" }
  | { kind: "endTurn"; playerId: string };

export class Round {
  private deck: Deck;
  private discard: Card[] = [];
  private players: PlayerState[] = [];
  private currentIndex = 0;
  private direction: 1 | -1 = 1;
  private winner: string | undefined;
  private pendingDraw = 0;
  private pendingType: "draw2" | "draw4" | null = null;
  private chosenColor: Color | null = null;
  private chainPlayerId: string | null = null;
  private chainValue: number | null = null;
  private pendingTargetId: string | null = null;
  private history: HistoryEntry[] = [];

  constructor(playerIds: string[], opts?: { deck?: Deck; deal?: number }) {
    if (playerIds.length < 2) throw new Error("Need at least 2 players");
    this.deck = opts?.deck ?? new StandardDeck();
    this.players = playerIds.map(id => ({ id, hand: new PlayerHand() }));
    const deal = opts?.deal ?? 7;
    for (let r = 0; r < deal; r++) this.players.forEach(p => p.hand.add(this.drawOneStrict()));
    // Flip initial top card (must not be a wild card per official UNO rules)
    let startCard = this.drawOneStrict();
    while (startCard.kind === "wild") {
      // Put wild back and draw another
      this.deck.refill([startCard]);
      startCard = this.drawOneStrict();
    }
    this.discard.push(startCard);
  }

  private drawOneStrict(): Card { const d = this.deck.draw(1)[0]; if (!d) throw new Error("Deck empty"); return d; }

  get top(): Card { return this.discard[this.discard.length - 1]; }
  get current(): PlayerState { return this.players[this.currentIndex]; }

  snapshot(): RoundSnapshot {
    return {
      players: this.players.map(p => ({ id: p.id, handCount: p.hand.size() })),
      topCard: this.top,
      currentPlayer: this.current.id,
      direction: this.direction,
      winner: this.winner,
      pendingDraw: this.pendingDraw || undefined,
      pendingType: this.pendingType,
      chosenColor: this.chosenColor,
      chainPlayerId: this.chainPlayerId,
      chainValue: this.chainValue,
      pendingTargetId: this.pendingTargetId,
      history: this.history
    };
  }

  // Access a player's current hand cards (read-only reference)
  getHand(playerId: string): readonly Card[] {
    const p = this.players.find(pl => pl.id === playerId);
    return p ? p.hand.cards() : [];
  }

  draw(playerId: string, n?: number) {
    this.assertTurn(playerId);
    const amount = n ?? (this.pendingDraw > 0 ? this.pendingDraw : 1);
    const player = this.players[this.currentIndex];
    const drawn = this.drawWithReshuffle(amount);
    drawn.forEach(c => player.hand.add(c));
    if (this.pendingDraw > 0) {
      // Record actual drawn count for penalty
      this.history.push({ kind: "penaltyDraw", playerId, amount: drawn.length, reason: this.pendingType! });
      this.pendingDraw = 0; this.pendingType = null; this.pendingTargetId = null;
      // After taking a penalty draw you cannot play; advance turn immediately.
      this.chainPlayerId = null; this.chainValue = null;
      this.advanceIndex();
    } else {
      // Record actual drawn count
      this.history.push({ kind: "draw", playerId, amount: drawn.length });
    }
    return drawn;
  }

  play(playerId: string, handIndex: number, chosenColor?: Color) {
    this.assertTurn(playerId);
    if (this.winner) throw new Error("Round finished");
    const ps = this.players[this.currentIndex];
    const candidate = ps.hand.getAt(handIndex);
    if (!candidate) throw new Error("No card at index");

    // Validate pending draw stacking
    if (this.pendingType) {
      if (!(candidate.kind === "action" && candidate.action === "draw2" && this.pendingType === "draw2") &&
          !(candidate.kind === "wild" && candidate.action === "wildDraw4" && this.pendingType === "draw4")) {
        throw new Error("Must satisfy pending draw stack or draw instead");
      }
    } else {
      if (this.chainPlayerId === playerId) {
        // During a number-chain, the only legal play is the same number value; otherwise you must endTurn
        const ok = (candidate.kind === "number" && this.chainValue != null && candidate.value === this.chainValue);
        if (!ok) throw new Error("Must continue chain with same number or end turn");
      } else {
        if (!matches(this.effectiveTop(), candidate)) {
          throw new Error("Card does not match top");
        }
      }
    }

    // Wild chosen color handling
    if (candidate.kind === "wild") {
      if (!chosenColor) throw new Error("Wild requires chosenColor");
      this.chosenColor = chosenColor;
    } else {
      this.chosenColor = null; // colored card overrides wild color context
    }

    // Now actually remove the card and finalize state
    const card = (ps.hand as PlayerHand).removeAt(handIndex)!;

    if (card.kind === "wild") {
      (card as any).chosenColor = chosenColor!;
      if (card.action === "wildDraw4") {
        this.pendingDraw += 4;
        this.pendingType = "draw4";
      } else {
        this.pendingType = null; // plain wild resets type
      }
    }

    if (card.kind === "action") {
      if (card.action === "draw2") { this.pendingDraw += 2; this.pendingType = "draw2"; }
      if (card.action === "reverse") { this.direction = (this.players.length === 2) ? this.direction : (this.direction === 1 ? -1 : 1); }
      if (card.action === "skip") { this.advanceIndex(); }
    }

  this.discard.push(card);
  this.history.push({ kind: "play", playerId, card, chosenColor });

    // Win condition
    if (ps.hand.size() === 0) {
      this.winner = ps.id;
      return;
    }

    if (!this.pendingType && card.kind === "number") {
      if (this.chainPlayerId === playerId && this.chainValue === card.value) {
        // continue chain; keep turn
      } else if (this.chainPlayerId == null) {
        // start new chain
        this.chainPlayerId = playerId;
        this.chainValue = card.value;
      } else {
        // chain broken (different value or different player)
        this.chainPlayerId = null;
        this.chainValue = null;
        this.advanceIndex();
      }
    } else {
      // non-number or pending draw state breaks/doesn't start chain
      this.chainPlayerId = null;
      this.chainValue = null;
      this.advanceIndex();
    }
    if (this.pendingType && this.chainPlayerId == null) {
      this.pendingTargetId = this.current.id; // next player must respond
    }
  }

  private effectiveTop(): Card {
    return this.top;
  }

  private advanceIndex() {
    this.currentIndex = (this.currentIndex + this.direction + this.players.length) % this.players.length;
  }

  private assertTurn(playerId: string) {
    if (this.current.id !== playerId) throw new Error("Not your turn");
  }

  endTurn(playerId: string) {
    this.assertTurn(playerId);
    // Only allow ending turn when voluntarily stopping an active number-chain for this player
    if (this.chainPlayerId !== playerId) {
      throw new Error("Cannot end turn now");
    }
    this.chainPlayerId = null;
    this.chainValue = null;
    this.history.push({ kind: "endTurn", playerId });
    this.advanceIndex();
  }

  drawAndMaybePlay(playerId: string): { drawn: Card[]; played: boolean } {
    const prePending = this.pendingDraw;
    const drawn = this.draw(playerId, undefined);
    if (prePending > 0) return { drawn, played: false };
    // If we could not draw exactly one (e.g., deck exhaustion), break chain and advance
    if (drawn.length !== 1) {
      this.chainPlayerId = null;
      this.chainValue = null;
      this.advanceIndex();
      return { drawn, played: false };
    }
    const idx = this.current.hand.findPlayable(this.top, (c) => {
      if (this.chainPlayerId === playerId) {
        return c.kind === "number" && this.chainValue != null && c.value === this.chainValue;
      }
      return matches(this.effectiveTop(), c);
    });
    if (idx >= 0) {
      const card = this.current.hand.getAt(idx)!;
      if (card.kind === "wild") {
        // Choose color heuristically: most frequent color in current hand excluding wilds.
        const counts: Record<Color, number> = { red: 0, yellow: 0, green: 0, blue: 0 };
        for (const c of this.current.hand.cards()) if (c.kind !== "wild") counts[c.color]++;
        const chosen = (Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] as Color) || "red";
        this.play(playerId, idx, chosen);
      } else {
        this.play(playerId, idx);
      }
      return { drawn, played: true };
    }
    // Could not play after drawing one card; advance turn automatically.
    this.chainPlayerId = null;
    this.chainValue = null;
    this.advanceIndex();
    return { drawn, played: false };
  }

  // Try to draw 'count' cards, reshuffling the discard pile (except the top card)
  // back into the deck if needed. Returns as many as could be drawn.
  private drawWithReshuffle(count: number): Card[] {
    if (count <= 0) return [];
    const out: Card[] = [];
    let need = count;
    while (need > 0) {
      const got = this.deck.draw(need);
      out.push(...got);
      need -= got.length;
      if (need <= 0) break;
      // Not enough cards: attempt to reshuffle discards (keep the current top)
      const keepTop = this.discard[this.discard.length - 1];
      const refill = this.discard.slice(0, Math.max(0, this.discard.length - 1));
      if (refill.length === 0) break; // nothing to reshuffle
      // Clear discard except for top
      this.discard = [keepTop];
      // Refill deck with shuffled discards
      this.deck.refill(shuffleCopy(refill));
    }
    return out;
  }
}

// Simple non-mutating shuffle helper for arrays
function shuffleCopy<T>(arr: T[]): T[] {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
