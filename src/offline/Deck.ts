import type { Card, Color, NumberValue, ActionKind, WildKind } from "../cards/Card";

export interface Deck {
  size(): number;
  draw(count?: number): Card[]; // draws up to count or remaining
  peekTop(): Card | undefined;
  refill(cards: Card[], opts?: { shuffle?: boolean }): void; // add cards back into the deck (typically reshuffled discards)
}

export class StandardDeck implements Deck {
  private cards: Card[] = [];

  constructor(opts?: { shuffle?: boolean }) {
    this.cards = buildFullDeck();
    if (opts?.shuffle !== false) shuffleInPlace(this.cards);
  }

  size() { return this.cards.length; }

  draw(count = 1): Card[] {
    const n = Math.max(0, Math.min(count, this.cards.length));
    const out: Card[] = [];
    for (let i = 0; i < n; i++) out.push(this.cards.pop()!);
    return out;
  }

  peekTop(): Card | undefined { return this.cards[this.cards.length - 1]; }

  refill(cards: Card[], opts?: { shuffle?: boolean }) {
    if (cards.length === 0) return;
    // Add cards to deck and optionally shuffle
    this.cards.push(...cards);
    if (opts?.shuffle !== false) shuffleInPlace(this.cards);
  }
}

export function buildFullDeck(): Card[] {
  const colors: Color[] = ["red","yellow","green","blue"];
  const nums: NumberValue[] = [0,1,2,3,4,5,6,7,8,9];
  const actions: ActionKind[] = ["skip","reverse","draw2"];

  const deck: Card[] = [];

  // Number cards: one 0 per color, two of 1..9 per color
  for (const c of colors) {
    deck.push({ kind: "number", color: c, value: 0 });
    for (const v of nums) if (v !== 0) { deck.push({ kind: "number", color: c, value: v }); deck.push({ kind: "number", color: c, value: v }); }
  }

  // Action cards: two of each per color
  for (const c of colors) {
    for (const a of actions) { deck.push({ kind: "action", color: c, action: a, drawAmount: a === "draw2" ? 2 : undefined }); deck.push({ kind: "action", color: c, action: a, drawAmount: a === "draw2" ? 2 : undefined }); }
  }

  // Wild cards: 4 wild, 4 wildDraw4
  const wilds: WildKind[] = ["wild","wildDraw4"];
  for (const w of wilds) for (let i = 0; i < 4; i++) deck.push({ kind: "wild", action: w, drawAmount: w === "wildDraw4" ? 4 : undefined });

  return deck;
}

function shuffleInPlace<T>(a: T[]) {
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
}
