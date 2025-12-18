import type { Card, Color } from "../cards/Card";
import { matches } from "../cards/Rules";
import { createStandardDeck, drawFromDeck, refillDeck, shuffle } from "./Deck";
import { addCard, removeCardAt, getCardAt, getHandSize, findPlayableIndex, isHandEmpty } from "./Hand";

// Functional Programming: Immutable game state with pure functions
// No classes, no mutations - all operations return new state

export interface PlayerState {
  readonly id: string;
  readonly hand: readonly Card[];
}

export interface GameState {
  readonly deck: readonly Card[];
  readonly discard: readonly Card[];
  readonly players: readonly PlayerState[];
  readonly currentIndex: number;
  readonly direction: 1 | -1;
  readonly winner?: string;
  readonly pendingDraw: number;
  readonly pendingType: "draw2" | "draw4" | null;
  readonly chosenColor: Color | null;
  readonly chainPlayerId: string | null;
  readonly chainValue: number | null;
  readonly pendingTargetId: string | null;
  readonly history: readonly HistoryEntry[];
}

export type HistoryEntry =
  | { kind: "play"; playerId: string; card: Card; chosenColor?: Color }
  | { kind: "draw"; playerId: string; amount: number }
  | { kind: "penaltyDraw"; playerId: string; amount: number; reason: "draw2" | "draw4" }
  | { kind: "endTurn"; playerId: string };

export interface RoundSnapshot {
  players: { id: string; handCount: number }[];
  topCard: Card;
  currentPlayer: string;
  direction: 1 | -1;
  winner?: string;
  pendingDraw?: number;
  pendingType?: "draw2" | "draw4" | null;
  chosenColor?: Color | null;
  chainPlayerId?: string | null;
  chainValue?: number | null;
  pendingTargetId?: string | null;
  history?: readonly HistoryEntry[];
}

/**
 * Pure function to get current player
 * Demonstrates function composition
 */
export const getCurrentPlayer = (state: GameState): PlayerState => {
  return state.players[state.currentIndex];
};

/**
 * Pure function to get top card
 */
export const getTopCard = (state: GameState): Card => {
  return state.discard[state.discard.length - 1];
};

/**
 * Pure function to advance to next player
 * Returns new index without mutation
 */
const advanceIndex = (state: GameState): number => {
  return (state.currentIndex + state.direction + state.players.length) % state.players.length;
};

/**
 * Pure helper to draw cards with reshuffling
 * Returns new deck, discard, and drawn cards
 */
const drawWithReshuffle = (
  deck: readonly Card[],
  discard: readonly Card[],
  count: number
): { newDeck: readonly Card[]; newDiscard: readonly Card[]; drawnCards: readonly Card[] } => {
  if (count <= 0) return { newDeck: deck, newDiscard: discard, drawnCards: [] };

  const { drawnCards, newDeck } = drawFromDeck(deck, count);
  
  if (drawnCards.length >= count) {
    return { newDeck, newDiscard: discard, drawnCards };
  }

  // Need more cards - reshuffle discard pile
  const need = count - drawnCards.length;
  const keepTop = discard[discard.length - 1];
  const cardsToReshuffle = discard.slice(0, Math.max(0, discard.length - 1));
  
  if (cardsToReshuffle.length === 0) {
    // Nothing to reshuffle
    return { newDeck, newDiscard: discard, drawnCards };
  }

  const reshuffledDeck = refillDeck(newDeck, cardsToReshuffle);
  const { drawnCards: additionalCards, newDeck: finalDeck } = drawFromDeck(reshuffledDeck, need);

  return {
    newDeck: finalDeck,
    newDiscard: [keepTop],
    drawnCards: [...drawnCards, ...additionalCards]
  };
};

/**
 * Pure function to handle drawing cards
 * Returns new game state
 */
export const drawCards = (
  state: GameState,
  playerId: string,
  count?: number
): GameState => {
  if (getCurrentPlayer(state).id !== playerId) {
    throw new Error("Not your turn");
  }

  const amount = count ?? (state.pendingDraw > 0 ? state.pendingDraw : 1);
  const player = getCurrentPlayer(state);
  
  const { newDeck, newDiscard, drawnCards } = drawWithReshuffle(state.deck, state.discard, amount);
  
  // Add cards to player's hand immutably
  const updatedPlayers = state.players.map(p =>
    p.id === playerId
      ? { ...p, hand: [...p.hand, ...drawnCards] }
      : p
  );

  let newState: GameState;

  if (state.pendingDraw > 0) {
    // Penalty draw - advance turn immediately
    const historyEntry: HistoryEntry = {
      kind: "penaltyDraw",
      playerId,
      amount: drawnCards.length,
      reason: state.pendingType!
    };

    newState = {
      ...state,
      deck: newDeck,
      discard: newDiscard,
      players: updatedPlayers,
      currentIndex: advanceIndex(state),
      pendingDraw: 0,
      pendingType: null,
      pendingTargetId: null,
      chainPlayerId: null,
      chainValue: null,
      history: [...state.history, historyEntry]
    };
  } else {
    // Normal draw
    const historyEntry: HistoryEntry = {
      kind: "draw",
      playerId,
      amount: drawnCards.length
    };

    newState = {
      ...state,
      deck: newDeck,
      discard: newDiscard,
      players: updatedPlayers,
      history: [...state.history, historyEntry]
    };
  }

  return newState;
};

/**
 * Pure function to play a card
 * Returns new game state immutably
 */
export const playCard = (
  state: GameState,
  playerId: string,
  handIndex: number,
  chosenColor?: Color
): GameState => {
  if (getCurrentPlayer(state).id !== playerId) {
    throw new Error("Not your turn");
  }
  if (state.winner) {
    throw new Error("Round finished");
  }

  const player = getCurrentPlayer(state);
  const candidate = getCardAt(player.hand, handIndex);
  
  if (!candidate) {
    throw new Error("No card at index");
  }

  // Validate pending draw stacking
  if (state.pendingType) {
    const validDraw2 = candidate.kind === "action" && candidate.action === "draw2" && state.pendingType === "draw2";
    const validDraw4 = candidate.kind === "wild" && candidate.action === "wildDraw4" && state.pendingType === "draw4";
    
    if (!validDraw2 && !validDraw4) {
      throw new Error("Must satisfy pending draw stack or draw instead");
    }
  } else {
    if (state.chainPlayerId === playerId) {
      const ok = candidate.kind === "number" && state.chainValue != null && candidate.value === state.chainValue;
      if (!ok) {
        throw new Error("Must continue chain with same number or end turn");
      }
    } else {
      if (!matches(getTopCard(state), candidate)) {
        throw new Error("Card does not match top");
      }
    }
  }

  // Validate wild color
  if (candidate.kind === "wild" && !chosenColor) {
    throw new Error("Wild requires chosenColor");
  }

  // Remove card from hand immutably
  const { newHand, removedCard } = removeCardAt(player.hand, handIndex);
  if (!removedCard) throw new Error("Failed to remove card");

  const updatedPlayers = state.players.map(p =>
    p.id === playerId ? { ...p, hand: newHand } : p
  );

  // Calculate new state based on card played
  let newPendingDraw = state.pendingDraw;
  let newPendingType = state.pendingType;
  let newChosenColor = state.chosenColor;
  let newDirection = state.direction;
  let skipNext = false;

  if (removedCard.kind === "wild") {
    newChosenColor = chosenColor!;
    if (removedCard.action === "wildDraw4") {
      newPendingDraw += 4;
      newPendingType = "draw4";
    } else {
      newPendingType = null;
    }
  } else {
    newChosenColor = null;
  }

  if (removedCard.kind === "action") {
    if (removedCard.action === "draw2") {
      newPendingDraw += 2;
      newPendingType = "draw2";
    }
    if (removedCard.action === "reverse") {
      newDirection = state.players.length === 2 ? state.direction : (state.direction === 1 ? -1 : 1);
    }
    if (removedCard.action === "skip") {
      skipNext = true;
    }
  }

  // Add card to discard pile
  const cardToDiscard = removedCard.kind === "wild" 
    ? { ...removedCard, chosenColor } as Card
    : removedCard;

  let newState: GameState = {
    ...state,
    players: updatedPlayers,
    discard: [...state.discard, cardToDiscard],
    pendingDraw: newPendingDraw,
    pendingType: newPendingType,
    chosenColor: newChosenColor,
    direction: newDirection,
    history: [...state.history, { kind: "play", playerId, card: removedCard, chosenColor }]
  };

  // Check win condition
  if (isHandEmpty(newHand)) {
    return { ...newState, winner: playerId };
  }

  // Handle turn advancement and chaining
  let newChainPlayerId = state.chainPlayerId;
  let newChainValue = state.chainValue;
  let newCurrentIndex = state.currentIndex;
  let newPendingTargetId = state.pendingTargetId;

  if (skipNext) {
    // Skip advances turn twice (once for normal, once for skip effect)
    const tempState = { ...newState, currentIndex: advanceIndex(newState) };
    newCurrentIndex = advanceIndex(tempState);
    newChainPlayerId = null;
    newChainValue = null;
  } else if (!newPendingType && removedCard.kind === "number") {
    if (state.chainPlayerId === playerId && state.chainValue === removedCard.value) {
      // Continue chain - keep turn
    } else if (state.chainPlayerId == null) {
      // Start new chain
      newChainPlayerId = playerId;
      newChainValue = removedCard.value;
    } else {
      // Chain broken
      newChainPlayerId = null;
      newChainValue = null;
      newCurrentIndex = advanceIndex(newState);
    }
  } else {
    // Non-number or pending draw breaks chain
    newChainPlayerId = null;
    newChainValue = null;
    newCurrentIndex = advanceIndex(newState);
  }

  if (newPendingType && newChainPlayerId == null) {
    newPendingTargetId = newState.players[newCurrentIndex].id;
  }

  return {
    ...newState,
    currentIndex: newCurrentIndex,
    chainPlayerId: newChainPlayerId,
    chainValue: newChainValue,
    pendingTargetId: newPendingTargetId
  };
};

/**
 * Pure function to end turn
 * Returns new game state
 */
export const endTurn = (state: GameState, playerId: string): GameState => {
  if (getCurrentPlayer(state).id !== playerId) {
    throw new Error("Not your turn");
  }
  if (state.chainPlayerId !== playerId) {
    throw new Error("Cannot end turn now");
  }

  return {
    ...state,
    currentIndex: advanceIndex(state),
    chainPlayerId: null,
    chainValue: null,
    history: [...state.history, { kind: "endTurn", playerId }]
  };
};


