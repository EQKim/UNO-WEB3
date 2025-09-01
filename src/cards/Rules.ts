import type { Card, Color } from "./Card";

export function matches(top: Card, c: Card): boolean {
  // You can always play a wild (+4 or color change)
  if (c.kind === "wild") return true;

  // If the top is a wild with a chosen color, you can play any card of that color
  if (top.kind === "wild") {
    const chosen = top.chosenColor as Color | undefined;
    if (!chosen) {
      // Defensive: if someone forgot to set chosenColor, allow any color
      return true;
    }
    // c is number or action here (we returned above if c.kind === "wild")
    return c.color === chosen;
  }

  // Normal matching rules by color or value/action
  if (c.kind === "number" && top.kind === "number") {
    return c.color === top.color || c.value === top.value;
  }

  if (c.kind === "action" && top.kind === "action") {
    return c.color === top.color || c.action === top.action;
  }

  // Mixed kinds (number vs action): match by color
  return c.color === top.color;
}


// Very basic AI: play first valid, else "draw"
export function chooseForAI(hand: Card[], top: Card): Card | "draw" {
  const playable = hand.find(c => matches(top, c));
  return playable ?? "draw";
}
