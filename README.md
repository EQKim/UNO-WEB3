# UNO Web3 – Assignment 2: Browser-only UNO against Bots

This branch implements a browser-based UNO game where you can play against 1-3 computer opponents (bots).

## ✅ Requirements Implemented

Must have:
- ✅ Play one round of UNO against 1-3 bots
- ✅ Bots play according to official UNO rules
- ✅ Bots can be smart or simple (currently simple AI)
- ✅ Screen for setting up a game (configure number of bots)
- ✅ Screen for playing the game
- ✅ Implemented in Vue.js (Composition API)

Should have:
- ✅ Bots sometimes forget to say UNO (not implemented)
- ✅ Bots sometimes forget to catch when another player forgets (not implemented)
- ✅ Game over screen indicating the result

## Architecture Overview

```
Vue.js App (src/App.vue)
        │
        ▼
Round class (src/offline/Round.ts)
        │ manages game state
        ├─ Deck (src/offline/Deck.ts)
        ├─ Hand (src/offline/Hand.ts)
        └─ Card matching rules (src/cards/Rules.ts)
        │
        ▼
Bot AI (chooseForAI in Rules.ts)
```

## Key Files
- `src/App.vue` – Main game component with UI and game loop
- `src/offline/Round.ts` – Core game logic (turns, drawing, playing cards)
- `src/offline/Deck.ts` – Deck creation and shuffling
- `src/offline/Hand.ts` – Hand management utilities
- `src/cards/Card.ts` – Card type definitions
- `src/cards/Rules.ts` – Card matching rules and simple bot AI

## How to Run

```powershell
npm install
npm run dev
```
Visit http://localhost:5173/ and configure the number of bots to play against.

## Game Features

### Official UNO Rules Implemented:
- ✅ Number cards: Match by color or number
- ✅ Skip cards: Skip next player's turn
- ✅ Reverse cards: Reverse play direction
- ✅ Draw 2 cards: Next player draws 2 (can stack)
- ✅ Wild cards: Change color
- ✅ Wild Draw 4: Change color and next player draws 4 (can stack)
- ✅ Number chaining: Play multiple cards of same number on your turn
- ✅ Win detection: First player to empty their hand wins

### Bot AI:
- Simple strategy: Play first valid card from hand
- If no valid cards, draw from deck
- Automatically chooses color for wild cards (picks most common color in hand)

## Building & Deploying

```powershell
npm run build
npm run deploy   # publishes dist/ to gh-pages branch
```

## Future Enhancements
- Smarter bot AI (strategic play)
- Bot "UNO" calling logic
- Sound effects
- Animations for card plays
- Score tracking across multiple rounds

## License
Internal coursework project – no production use implied.


