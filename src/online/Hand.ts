import type { Card } from "../cards/Card";
import _ from "lodash";

// Functional Programming: Pure functions for hand operations using lodash
// All functions return new arrays without modifying the original

/**
 * Pure function to add a card to a hand
 * Returns a new hand array using lodash.concat
 */
export const addCard = (hand: readonly Card[], card: Card): readonly Card[] => {
  return _.concat(hand, card);
};

/**
 * Pure function to add multiple cards to a hand
 * Uses lodash.concat to add multiple cards at once
 */
export const addCards = (hand: readonly Card[], cards: readonly Card[]): readonly Card[] => {
  return _.concat(hand, ...cards);
};

/**
 * Pure function to remove a card at a specific index
 * Returns new hand and the removed card (if found)
 * Uses lodash for immutable array manipulation
 */
export const removeCardAt = (
  hand: readonly Card[],
  index: number
): { readonly newHand: readonly Card[]; readonly removedCard: Card | undefined } => {
  if (index < 0 || index >= hand.length) {
    return { newHand: hand, removedCard: undefined };
  }
  const newHand = _.concat(
    _.take(hand, index),
    _.drop(hand, index + 1)
  );
  return {
    newHand,
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