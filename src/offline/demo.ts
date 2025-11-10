// Tiny demo runner for the offline model; not used by the app.
import { Round } from "./Round";
import type { Card, Color } from "../cards/Card";

// CLI flags: --verbose prints per-turn info; --history prints final history list
const argv = process.argv.slice(2);
const FLAG_VERBOSE = argv.includes("--verbose");
const FLAG_HISTORY = argv.includes("--history");

// Simple heuristic to choose a color for wild: pick the color the player has most of.
function pickColor(hand: readonly Card[]): Color {
  const counts: Record<Color, number> = { red: 0, yellow: 0, green: 0, blue: 0 };
  hand.forEach(c => {
    if (c.kind !== "wild") counts[c.color]++;
  });
  return (Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0] as Color) || "red";
}

export function runDemo() {
  const r = new Round(["Kim","Bob","Ada","Lee"], { deal: 7 });
  let turns = 0;
  const MAX_TURNS = 5000; // safety to avoid infinite loop if a bug appears
  while (!r.snapshot().winner && turns < MAX_TURNS) {
    // Snapshot the state at the start of the turn for accurate logging (pre-action)
    const pre = r.snapshot();
    const pid = pre.currentPlayer;
    const hand = r.getHand(pid);

    // Attempt chained or regular plays by scanning hand.
    let played = false;
    for (let i = 0; i < hand.length; i++) {
      try {
        const card = hand[i];
        if (card.kind === "wild") {
          r.play(pid, i, pickColor(hand));
        } else {
          r.play(pid, i);
        }
        played = true;
        break;
      } catch { /* ignore invalid attempts */ }
    }

    if (!played) {
      // Draw and maybe immediate play according to rule extension.
      // drawAndMaybePlay will auto-advance if no play possible or if penalty was applied.
      r.drawAndMaybePlay(pid);
    } else {
      // If chaining is active we stay on same player; else endTurn performed inside play logic.
      const post = r.snapshot();
      if (post.chainPlayerId === pid) {
        // continue chaining within same while iteration next loop
      }
    }

    turns++;
    if (FLAG_VERBOSE) {
      // Post-action snapshot to show who is next
      const post = r.snapshot();
      const last = post.history?.[post.history.length - 1];
      let action = "";
      if (last) {
        switch (last.kind) {
          case "play": action = `PLAY ${last.playerId} ${describeCard(last.card)}`; break;
          case "draw": action = `DRAW ${last.playerId} x${last.amount}`; break;
          case "penaltyDraw": action = `PENALTY ${last.playerId} +${last.amount} (${last.reason})`; break;
          case "endTurn": action = `END ${last.playerId}`; break;
        }
      }
      // Clearer turn line: Actor (pre), Action, Top transition, Penalty at start, Chain after, and Next (post)
      const actor = pre.currentPlayer;
      const penaltyStart = describePenalty(pre.pendingDraw, pre.pendingType, pre.pendingTargetId);
      const chainAfter = describeChain(post.chainPlayerId, post.chainValue) || "None";
      console.log(
        `[Turn ${turns}] Actor=${actor} | Action=${action || "(none)"} | ` +
        `Top=${describeCard(pre.topCard)}->${describeCard(post.topCard)} | ` +
        `PenaltyStart=${penaltyStart} | ChainAfter=${chainAfter} | Next=${post.currentPlayer}`
      );
    } else if (turns % 200 === 0) {
      const post = r.snapshot();
      const actor = pre.currentPlayer;
      const penaltyStart = describePenalty(pre.pendingDraw, pre.pendingType, pre.pendingTargetId);
      const chainAfter = describeChain(post.chainPlayerId, post.chainValue) || "None";
      console.log(
        `Turn ${turns} | Actor ${actor} | Top ${describeCard(pre.topCard)}->${describeCard(post.topCard)} | PenaltyStart=${penaltyStart} | ChainAfter=${chainAfter} | Next ${post.currentPlayer}`
      );
    }
  }
  console.log("Winner:", r.snapshot().winner, "after", turns, "turns");
  if (FLAG_HISTORY) printHistory(r);
}

function describeCard(c: Card): string {
  if (c.kind === "number") return `${c.color} ${c.value}`;
  if (c.kind === "action") return `${c.color} ${c.action}`;
  return c.action + (c.chosenColor ? `(${c.chosenColor})` : "");
}

// Format the pending draw penalty at the start of the turn
function describePenalty(
  pendingDraw?: number,
  pendingType?: "draw2" | "draw4" | null,
  pendingTargetId?: string | null
): string {
  if (!pendingDraw || pendingDraw <= 0) return "None";
  const type = pendingType ?? "?";
  const target = pendingTargetId ?? "?";
  return `+${pendingDraw}(${type})->${target}`;
}

function describeChain(
  chainPlayerId?: string | null,
  chainValue?: number | null
): string {
  if (!chainPlayerId || chainValue == null) return "";
  return `Chain=${chainPlayerId}#${chainValue}`;
}

function printHistory(r: Round) {
  console.log("\n=== History ===");
  for (const h of r.snapshot().history ?? []) {
    switch (h.kind) {
      case "play":
        console.log(`PLAY ${h.playerId} -> ${describeCard(h.card)}${h.chosenColor ? ` as ${h.chosenColor}` : ""}`);
        break;
      case "draw":
        console.log(`DRAW ${h.playerId} x${h.amount}`);
        break;
      case "penaltyDraw":
        console.log(`PENALTY ${h.playerId} +${h.amount} (${h.reason})`);
        break;
      case "endTurn":
        console.log(`END ${h.playerId}`);
        break;
    }
  }
}

// Execute when run via npm script
runDemo();

