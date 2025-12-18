import type { Card } from "../cards/Card";

// Functional Programming: Pure functions for hand operations
// All functions return new arrays without modifying the original

/**
 * Pure function to add a card to a hand
 * Returns a new hand array
 */
export const addCard = (hand: readonly Card[], card: Card): readonly Card[] => {
  return [...hand, card];
};



/**
 * Pure function to remove a card at a specific index
 * Returns new hand and the removed card (if found)
 */
export const removeCardAt = (
  hand: readonly Card[],
  index: number
): { readonly newHand: readonly Card[]; readonly removedCard: Card | undefined } => {
  if (index < 0 || index >= hand.length) {
    return { newHand: hand, removedCard: undefined };
  }
  return {
    newHand: [...hand.slice(0, index), ...hand.slice(index + 1)],
    removedCard: hand[index]
  };
};

/**
 * Pure function to get a card at a specific index
 */
export const getCardAt = (hand: readonly Card[], index: number): Card | undefined => {
  return hand[index];
};

/**
 * Pure function to find index of first playable card
 * Uses higher-order function (predicate)
 */
export const findPlayableIndex = (
  hand: readonly Card[],
  predicate: (card: Card) => boolean
): number => {
  return hand.findIndex(predicate);
};



/**
 * Pure function to get hand size
 */
export const getHandSize = (hand: readonly Card[]): number => {
  return hand.length;
};

/**
 * Pure function to check if hand is empty
 */
export const isHandEmpty = (hand: readonly Card[]): boolean => {
  return hand.length === 0;
};