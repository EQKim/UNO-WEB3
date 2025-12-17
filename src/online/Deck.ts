import type { Card } from "../cards/Card";
import _ from "lodash";

// Functional Programming: Pure functions with immutable data structures using lodash
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
 * Pure function to shuffle an array using lodash.shuffle
 * Returns a new shuffled array without modifying the original
 */
export const shuffle = <T>(array: readonly T[]): readonly T[] => {
  return _.shuffle([...array]); // lodash.shuffle requires mutable array, so we clone first
};

/**
 * Pure function to draw cards from a deck using lodash
 * Returns new deck and drawn cards without mutations
 */
export const drawFromDeck = (
  deck: readonly Card[],
  count: number
): { readonly newDeck: readonly Card[]; readonly drawnCards: readonly Card[] } => {
  const actualCount = Math.min(count, deck.length);
  return {
    drawnCards: _.take(deck, actualCount),
    newDeck: _.drop(deck, actualCount)
  };
};

/**
 * Pure function to refill deck with discard pile using lodash
 * Returns new shuffled deck
 */
export const refillDeck = (
  currentDeck: readonly Card[],
  discardPile: readonly Card[]
): readonly Card[] => {
  return shuffle(_.concat(currentDeck, discardPile));
};