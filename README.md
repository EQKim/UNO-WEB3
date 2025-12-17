# UNO Web3 – Assignment 4: Functional Programming

This branch implements the assignment requirements of converting the UNO game logic to use functional programming principles with immutable data structures and pure functions.

## ✅ Requirements Implemented

Must have:
- **Functional programming style**: All game logic uses pure functions with no side effects
- **Immutable data structures**: All types use `readonly` modifiers, no mutations
- **Lodash library**: Uses lodash for array operations (_.map, _.concat, _.take, _.drop, _.shuffle)
- **Higher-order functions**: Demonstrates compose, pipe, curry, closures in `functional-utils.ts`
- **Pure functions**: All state transformations return new objects without modifying inputs

Should have:
- UNO calling function (optional feature)

Could have:
- Unit tests for pure functions

## Functional Programming Architecture

```
Immutable Game State (GameState interface with readonly)
        │
        ▼
Pure Functions (createInitialState, playCard, drawCards)
        │ returns new state
        ▼
Lodash Operations (_.map, _.concat, _.take, _.drop, _.shuffle)
        │ immutable transformations
        ▼
Higher-Order Functions (compose, pipe, curry, closures)
        │ function composition
        ▼
New Game State (no mutations, always new objects)
```

## Key Files
- `src/online/Round.ts` (517 lines) – Pure functional game state management with immutable types
- `src/online/Hand.ts` (87 lines) – Pure hand manipulation functions using lodash
- `src/online/Deck.ts` (78 lines) – Pure deck operations with lodash.shuffle
- `src/online/functional-utils.ts` (236 lines) – Higher-order functions (compose, pipe, curry, closures)
- `src/cards/Card.ts` – Immutable card type definitions
- `src/cards/Rules.ts` – Pure card matching logic

## How to Run

```powershell
npm install
npm run dev
```
Visit local dev server (default: http://localhost:5173/UNO-WEB3/ if base applied) and create/join a room.

## Building & Deploying

```powershell
npm run build
npm run deploy   # publishes dist/ to gh-pages branch
```

## Functional Programming Highlights

### Immutability
All game state types use `readonly` modifiers:
```typescript
export interface GameState {
  readonly deck: readonly Card[];
  readonly discard: readonly Card[];
  readonly players: readonly PlayerState[];
  // ...
}
```

### Pure Functions with Lodash
```typescript
// Using lodash for immutable array operations
export const addCard = (hand: readonly Card[], card: Card): readonly Card[] => {
  return _.concat(hand, card); // No mutations
};

export const removeCardAt = (hand: readonly Card[], index: number) => {
  const newHand = _.concat(
    _.take(hand, index),
    _.drop(hand, index + 1)
  );
  return { newHand, removedCard: hand[index] };
};
```

### Higher-Order Functions
Demonstrated in `functional-utils.ts`:
- **compose**: Right-to-left function composition
- **pipe**: Left-to-right function composition
- **curry**: Transform multi-arg functions to curried form
- **Closures**: Private state without classes

### State Transformations
All game operations return new state:
```typescript
export const playCard = (state: GameState, playerId: string, cardIndex: number): GameState => {
  // Returns entirely new GameState object
  return {
    ...state,
    deck: newDeck,
    discard: _.concat(state.discard, card),
    players: updatedPlayers, // mapped with lodash
    // ...
  };
};
```

## Verification
- ✅ All functions are pure (no side effects)
- ✅ All data structures are immutable (readonly types)
- ✅ Lodash used for array operations
- ✅ Higher-order functions demonstrated
- ✅ No classes, no mutations, functional style throughout

## Future Enhancements
- Add UNO calling function (should-have)
- Unit tests for pure functions (could-have)
- Property-based testing with fast-check

## License
Internal coursework project – no production use implied.

