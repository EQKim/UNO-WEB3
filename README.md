# UNO Web3 – Assignment 1: Core TypeScript Implementation

This branch implements the foundational TypeScript types and game logic for UNO without any UI framework.

## ✅ Assignment 1 Requirements

**Must Have:**
- ✅ Object-oriented implementation (Card, Deck, Hand, Round classes)
- ✅ Card type with number cards, colored action cards, and wild cards
- ✅ Deck interface representing a full UNO deck
- ✅ Hand interface for player hands
- ✅ Round interface for playing one round of UNO
- ✅ Complete UNO rule implementation

**Should Have:**
- ⚠️ "UNO" call rules (not implemented)

**Could Have:**
- ⚠️ Full game with scoring across multiple rounds (only single round implemented)

## Architecture Overview

```
src/cards/
  Card.ts       → Type definitions (NumberCard, ActionCard, WildCard)
  Rules.ts      → Card matching logic

src/offline/
  Deck.ts       → Deck interface & StandardDeck implementation
  Hand.ts       → Hand interface & PlayerHand implementation
  Round.ts      → Round class with full game logic
  demo.ts       → CLI demo that simulates a game
  index.ts      → Barrel exports
```

## Key Features

**Card Types:**
- Number cards (0-9 in 4 colors)
- Action cards (Skip, Reverse, Draw 2)
- Wild cards (Wild, Wild Draw 4)

**Game Rules Implemented:**
- ✅ Card matching by color or value
- ✅ Wild cards always playable
- ✅ Draw 2 and Draw 4 stacking
- ✅ Number chaining (play multiple cards of same number)
- ✅ Skip, Reverse effects
- ✅ Direction changes
- ✅ Win detection
- ✅ Turn management
- ✅ Deck reshuffling when empty

## How to Run

```powershell
npm install

# Run a simulated game (no UI)
npm run dev

# Run with full history log
npm run dev:history

# Run with verbose turn-by-turn output
npm run dev:verbose

# Type checking
npm run typecheck
```

## Demo Output

The demo simulates a 4-player game (Kim, Bob, Ada, Lee) and shows:
- Turn-by-turn actions (play, draw, penalty draws)
- Top card changes
- Pending penalties and chains
- Final winner

**Example:**
```
[Turn 1] Actor=Kim | Action=PLAY Kim blue 5 | Top=red 3->blue 5 | Next=Bob
[Turn 2] Actor=Bob | Action=DRAW Bob x1 | Top=blue 5->blue 5 | Next=Ada
...
Winner: Ada after 187 turns
```

## Implementation Notes

**Type Safety:**
- Discriminated unions for Card types
- Readonly interfaces for immutable snapshots
- Strict TypeScript configuration

**Game Logic:**
- All rules in `Round.ts` class
- Immutable snapshots prevent external state mutation
- History log tracks all actions
- Automatic turn advancement
- Chain management for number sequences

**Bug Fixes Applied:**
- ✅ Skip cards now correctly skip one player (was skipping two)
- ✅ Wild cards cannot be starting card
- ✅ Action cards at start don't trigger effects

## Testing

Run the demo with verbose flag to verify game rules:
```powershell
npm run dev:verbose
```

Watch for:
- Correct turn order (clockwise, or counter-clockwise after Reverse)
- Skip cards skipping exactly one player
- Draw 2/Draw 4 stacking correctly
- Number chaining working (multiple cards of same number)
- Win detection when a player runs out of cards

## Next Steps (Assignment 2+)

- Assignment 2: Add Vue UI and bot players
- Assignment 3: Add online multiplayer with Firebase
- Assignment 4: Functional programming patterns
- Assignment 5: Redux + RxJS architecture

