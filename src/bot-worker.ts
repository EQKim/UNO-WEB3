import type { Card, Color } from "./cards/Card";

export interface BotRequest {
  type: "makeMove";
  hand: Card[];
  topCard: Card;
  pendingDraw?: number;
  pendingType?: "draw2" | "draw4" | null;
  chainValue?: number | null;
}

export interface BotResponse {
  type: "moveReady";
  action: "play" | "draw" | "endTurn";
  cardIndex?: number;
  chosenColor?: Color;
}

// Card matching logic (inlined to avoid import issues in worker)
function matches(top: Card, c: Card): boolean {
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

// Basic AI: play first valid, else "draw"
function chooseForAI(hand: Card[], top: Card): Card | "draw" {
  const playable = hand.find(c => matches(top, c));
  return playable ?? "draw";
}

// Web Worker message handler
self.onmessage = (e: MessageEvent<BotRequest>) => {
  const { type, hand, topCard, pendingDraw, pendingType, chainValue } = e.data;

  if (type !== "makeMove") return;

  let response: BotResponse;

  // If bot is in a chain, check if can continue
  if (chainValue !== null && chainValue !== undefined) {
    const canContinueChain = hand.some(
      c => c.kind === "number" && c.value === chainValue
    );

    if (canContinueChain) {
      const idx = hand.findIndex(
        c => c.kind === "number" && c.value === chainValue
      );
      response = {
        type: "moveReady",
        action: "play",
        cardIndex: idx
      };
    } else {
      response = {
        type: "moveReady",
        action: "endTurn"
      };
    }
  } else {
    // Normal turn - use AI to choose card
    const choice = chooseForAI(hand, topCard);

    if (choice === "draw") {
      response = {
        type: "moveReady",
        action: "draw"
      };
    } else {
      const idx = hand.findIndex(c => c === choice);
      
      if (idx >= 0) {
        if (choice.kind === "wild") {
          // Pick color based on most cards in hand
          const counts: Record<Color, number> = { red: 0, yellow: 0, green: 0, blue: 0 };
          hand.forEach(c => { 
            if (c.kind !== "wild") counts[c.color]++; 
          });
          const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
          const pickedColor = (entries[0]?.[0] as Color) || "red";

          response = {
            type: "moveReady",
            action: "play",
            cardIndex: idx,
            chosenColor: pickedColor
          };
        } else {
          response = {
            type: "moveReady",
            action: "play",
            cardIndex: idx
          };
        }
      } else {
        // Fallback to draw if card not found
        response = {
          type: "moveReady",
          action: "draw"
        };
      }
    }
  }

  // Send response back to main thread
  self.postMessage(response);
};
