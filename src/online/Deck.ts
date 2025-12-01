import type { Card } from "../cards/Card";

// Functional Programming: Pure functions with immutable data structures
// No classes, no mutations, only pure transformations

/**
 * Pure function to create a standard UNO deck
 * Uses higher-order functions (map, flatMap) and immutability
 */
export const createStandardDeck = (): readonly Card[] => {
  const colors = ["red", "yellow", "green", "blue"] as const;
  
  // Use flatMap to create number cards (demonstrates higher-order functions)
  const numberCards = colors.flatMap(color => [
    { kind: "number" as const, color, value: 0 } as Card,
    ...Array.from({ length: 9 }, (_, i) => i + 1).flatMap(value => [
      { kind: "number" as const, color, value } as Card,
      { kind: "number" as const, color, value } as Card
    ])
  ]);
  
  // Use flatMap and Array.from for action cards
  const actionCards = colors.flatMap(color =>
    Array.from({ length: 2 }, () => [
      { kind: "action" as const, color, action: "skip" as const } as Card,
      { kind: "action" as const, color, action: "reverse" as const } as Card,
      { kind: "action" as const, color, action: "draw2" as const } as Card
    ]).flat()
  );
  
  // Use flatMap for wild cards
  const wildCards = Array.from({ length: 4 }, () => [
    { kind: "wild" as const, action: "wild" as const } as Card,
    { kind: "wild" as const, action: "wildDraw4" as const } as Card
  ]).flat();
  
  // Combine all cards immutably and shuffle
  return shuffle([...numberCards, ...actionCards, ...wildCards]);
};

/**
 * Pure function to shuffle an array (Fisher-Yates algorithm)
 * Returns a new shuffled array without modifying the original
 */
export const shuffle = <T>(array: readonly T[]): readonly T[] => {
  const arr = [...array]; // Create new array (immutability)
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

/**
 * Pure function to draw cards from a deck
 * Returns new deck and drawn cards without mutations
 */
export const drawFromDeck = (
  deck: readonly Card[],
  count: number
): { readonly newDeck: readonly Card[]; readonly drawnCards: readonly Card[] } => {
  const actualCount = Math.min(count, deck.length);
  return {
    drawnCards: deck.slice(0, actualCount),
    newDeck: deck.slice(actualCount)
  };
};

/**
 * Pure function to refill deck with discard pile
 * Returns new shuffled deck
 */
export const refillDeck = (
  currentDeck: readonly Card[],
  discardPile: readonly Card[]
): readonly Card[] => {
  return shuffle([...currentDeck, ...discardPile]);
};