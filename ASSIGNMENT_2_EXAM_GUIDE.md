# Assignment 2: Browser-Only UNO Against Bots - Exam Study Guide

This comprehensive guide covers **Assignment 2** - implementing a browser-based UNO game where you play against computer opponents (bots). No server, no multiplayer - just you vs AI in the browser.

---

## 📋 Assignment 2 Overview

**Goal:** Create a fully functional UNO game in the browser where a human player can compete against 1-3 computer-controlled opponents.

**Key Technologies:**
- **Frontend Only:** Vue.js 3 (Composition API)
- **No Backend:** All game logic runs in the browser
- **No Database:** Game state exists only in memory
- **Bot AI:** Simple computer opponents

---

## ✅ Assignment 2 Requirements

### **Must Have**
- ✅ Play one round of UNO against 1-3 players (bots)
- ✅ Create bots to play against
- ✅ Bots play according to UNO rules
- ✅ Bots can be smart or stupid (simple AI is acceptable)
- ✅ Can be implemented as web workers or postMessage
- ✅ Combine with Assignment 3 for real players option
- ✅ Must follow official UNO rules from Assignment 1
- ✅ Screen for setting up a game
- ✅ Screen for playing the game
- ✅ Implemented in Vue.js

### **Should Have**
- ⚠️ Bots sometimes forget to say UNO
- ⚠️ Bots sometimes forget to catch when another player forgets
- ✅ Game over screen showing the result

### **Could Have**
- ⚠️ Play entire game (with score) against 1-3 bots
- ⚠️ "Between rounds" screen showing match state

---

## 🎮 Part 1: Game Architecture

### **1A. Component Structure**

```
src/
  App.vue           # Main game component (UI + game loop)
  main.ts           # Vue app entry point
  cards/
    Card.ts         # Card type definitions
    Rules.ts        # Card matching + bot AI logic
  offline/
    Round.ts        # Core game state management
    Deck.ts         # Deck creation and shuffling
    Hand.ts         # Hand manipulation utilities
    index.ts        # Barrel export
```

### **1B. Data Flow**

```
User Action (Click card / Draw button)
        ↓
App.vue event handler
        ↓
Round.play() or Round.draw()
        ↓
Round updates internal game state
        ↓
Round.snapshot() creates view model
        ↓
Vue reactive state updates
        ↓
UI re-renders
        ↓
Bot AI loop checks if it's a bot's turn
        ↓
Bot plays automatically
        ↓
Loop continues until human's turn or game ends
```

---

## 🎯 Part 2: Core Game Logic (Round.ts)

### **2A. The Round Class**

**What it is:** The Round class manages the entire game state for one round of UNO.

```typescript
export class Round {
  private deck: Card[];
  private discard: Card[];
  private hands: Map<string, Card[]>;
  private playerIds: readonly string[];
  private currentIndex: number;
  private direction: 1 | -1;
  private pendingDraw: number;
  private pendingType: "draw2" | "draw4" | null;
  private chainPlayerId: string | null;
  private chainValue: number | null;
  private winner: string | null;
  private history: GameEvent[];

  constructor(players: string[], options?: { deal?: number }) {
    // Initialize deck, shuffle, deal cards
    // Set up initial game state
  }

  play(playerId: string, handIndex: number, chosenColor?: Color): void
  draw(playerId: string): void
  drawAndMaybePlay(playerId: string): void
  endTurn(playerId: string): void
  snapshot(): RoundSnapshot
  getHand(playerId: string): readonly Card[]
}
```

**Key Methods:**

1. **`play(playerId, handIndex, chosenColor?)`**
   - Validates it's the player's turn
   - Checks if card is legal to play
   - Removes card from hand
   - Applies card effects (skip, reverse, draw, etc.)
   - Advances turn or sets up chains
   - Detects win condition

2. **`draw(playerId)`**
   - Draws cards from deck
   - Handles penalty draws (+2/+4)
   - Advances turn if penalty draw

3. **`drawAndMaybePlay(playerId)`**
   - Draws one card
   - If playable, plays it automatically
   - Otherwise, ends turn

4. **`endTurn(playerId)`**
   - Manually ends player's turn
   - Used when number chaining
   - Advances to next player

5. **`snapshot()`**
   - Returns immutable view of game state
   - Used for UI rendering
   - Doesn't expose internal state

---

### **2B. Game State Management**

**Immutable Snapshots:**

```typescript
export interface RoundSnapshot {
  readonly players: readonly { id: string; handCount: number }[];
  readonly topCard: Card;
  readonly chosenColor?: Color;
  readonly currentPlayer: string;
  readonly direction: 1 | -1;
  readonly pendingDraw: number;
  readonly pendingType: "draw2" | "draw4" | null;
  readonly chainPlayerId: string | null;
  readonly chainValue: number | null;
  readonly winner: string | null;
  readonly history?: readonly GameEvent[];
}
```

**Why Snapshots:**
- UI only receives read-only data
- Prevents accidental state mutations
- Clear separation of concerns
- Easy to serialize for debugging

---

## 🃏 Part 3: Card Logic

### **3A. Card Types**

```typescript
export type Color = "red" | "yellow" | "green" | "blue";

export type NumberCard = {
  kind: "number";
  color: Color;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

export type ActionCard = {
  kind: "action";
  color: Color;
  action: "skip" | "reverse" | "draw2";
};

export type WildCard = {
  kind: "wild";
  action: "wild" | "wildDraw4";
  chosenColor?: Color;  // Set when played
};

export type Card = NumberCard | ActionCard | WildCard;
```

**Type Safety Benefits:**
- TypeScript catches invalid cards at compile time
- Discriminated unions enable type narrowing
- IDE autocomplete for card properties

---

### **3B. Card Matching Rules**

**File: `src/cards/Rules.ts`**

```typescript
export function matches(top: Card, c: Card): boolean {
  // Wild cards always playable
  if (c.kind === "wild") return true;

  // If top is wild, match against chosen color
  if (top.kind === "wild") {
    const chosen = top.chosenColor;
    if (!chosen) return true;  // Defensive
    return (c as any).color === chosen;
  }

  // Number cards: match color OR value
  if (c.kind === "number" && top.kind === "number") {
    return c.color === top.color || c.value === top.value;
  }

  // Action cards: match color OR action type
  if (c.kind === "action" && top.kind === "action") {
    return c.color === top.color || c.action === top.action;
  }

  // Mixed (number vs action): match by color
  return c.color === top.color;
}
```

**Matching Rules Summary:**
| Top Card | Your Card | Matches? |
|----------|-----------|----------|
| Red 5 | Red 7 | ✅ Same color |
| Red 5 | Blue 5 | ✅ Same number |
| Red Skip | Red 7 | ✅ Same color |
| Red Skip | Blue Skip | ✅ Same action |
| Any card | Wild | ✅ Wild always plays |
| Wild (Red) | Red 5 | ✅ Matches chosen color |

---

## 🤖 Part 4: Bot AI Implementation

### **4A. Simple Bot Strategy**

**File: `src/cards/Rules.ts`**

```typescript
export function chooseForAI(hand: Card[], top: Card): Card | "draw" {
  // Find first playable card
  const playable = hand.find(c => matches(top, c));
  
  // Play it if found, otherwise draw
  return playable ?? "draw";
}
```

**Strategy:**
- Very simple: play first valid card
- No strategic thinking
- No color preference
- No hoarding special cards

**Exam Note:** This is acceptable for "simple/stupid" bot requirement.

---

### **4B. Bot Auto-Play Loop**

**File: `src/App.vue`**

```typescript
async function botsLoop(r: Round) {
  let snap = r.snapshot();
  snapshot.value = snap;
  
  // Loop while it's a bot's turn and game not over
  while (!snap.winner && snap.currentPlayer !== "You") {
    await sleep(400);  // Visual delay
    
    const pid = snap.currentPlayer;
    const hand = r.getHand(pid);
    const choice = chooseForAI([...hand], snap.topCard);
    
    try {
      if (choice === "draw") {
        r.drawAndMaybePlay(pid);  // Draw and auto-play if possible
      } else {
        const idx = hand.findIndex(c => c === choice);
        if (idx >= 0) {
          if (choice.kind === "wild") {
            r.play(pid, idx, pickColor(hand));  // Auto-choose color
          } else {
            r.play(pid, idx);
          }
        }
      }
    } catch (e) {
      // If error, try drawing
      try { r.drawAndMaybePlay(pid); } catch { }
    }
    
    snap = r.snapshot();
    snapshot.value = snap;
    await sleep(200);  // Short delay between actions
  }
}
```

**Key Features:**
- Async loop with delays for visibility
- Handles all card types
- Auto-selects color for wild cards
- Graceful error handling
- Stops when human's turn or game ends

---

### **4C. Color Selection for Wild Cards**

```typescript
function pickColor(hand: readonly Card[]): Color {
  // Count cards of each color
  const counts: Record<Color, number> = { 
    red: 0, yellow: 0, green: 0, blue: 0 
  };
  
  hand.forEach(c => { 
    if (c.kind !== "wild") counts[c.color]++; 
  });
  
  // Pick most common color
  const entries = Object.entries(counts).sort((a,b) => b[1] - a[1]);
  return (entries[0]?.[0] as Color) || "red";
}
```

**Strategy:** Choose color that matches most cards in hand.

---

## 🎨 Part 5: Vue Component (UI)

### **5A. Reactive State**

```typescript
import { ref, computed } from "vue";

const numBots = ref(3);                    // Config: number of bots
const running = ref(false);                // Is game active?
const round = ref<Round | null>(null);     // Round instance
const snapshot = ref<RoundSnapshot | null>(null);  // Game state
const showColorPicker = ref(false);        // Wild color picker modal
const pendingCardIndex = ref<number | null>(null);  // Card waiting for color
const drawnCardIndex = ref<number | null>(null);    // Highlight drawn card
```

### **5B. Computed Properties**

```typescript
const playerHand = computed(() => {
  if (!round.value || !snapshot.value) return [];
  return round.value.getHand("You");
});

const hasPlayableCard = computed(() => {
  if (!snapshot.value || playerHand.value.length === 0) return false;
  
  // During penalty draw, only counter cards are playable
  if (snapshot.value.pendingType === "draw2") {
    return playerHand.value.some(c => 
      c.kind === "action" && c.action === "draw2"
    );
  }
  if (snapshot.value.pendingType === "draw4") {
    return playerHand.value.some(c => 
      c.kind === "wild" && c.action === "wildDraw4"
    );
  }
  
  // Normal: any matching card
  const topCard = snapshot.value.topCard;
  return playerHand.value.some(card => matches(topCard, card));
});

const drawButtonText = computed(() => {
  if (!snapshot.value) return "Draw Card";
  if (snapshot.value.pendingDraw > 0) {
    return `Draw +${snapshot.value.pendingDraw}`;
  }
  return "Draw Card";
});
```

---

### **5C. Event Handlers**

**Play Card:**

```typescript
function playCard(idx: number, card: Card) {
  if (!round.value || snapshot.value?.currentPlayer !== "You") return;
  
  const wasDrawnCard = drawnCardIndex.value === idx;
  
  // Wild cards need color selection
  if (card.kind === "wild") {
    pendingCardIndex.value = idx;
    showColorPicker.value = true;
    return;
  }
  
  try {
    round.value.play("You", idx);
    snapshot.value = round.value.snapshot();
    drawnCardIndex.value = null;
    
    // If drawn card, force end turn (can't chain)
    if (wasDrawnCard && snapshot.value.chainPlayerId === "You") {
      round.value.endTurn("You");
      snapshot.value = round.value.snapshot();
    }
    
    // Start bot loop if game continues
    if (!snapshot.value.winner) {
      setTimeout(() => botsLoop(round.value!), 300);
    }
  } catch (e: any) {
    alert(`Cannot play that card: ${e.message}`);
  }
}
```

**Draw Card:**

```typescript
function drawCard() {
  if (!round.value || snapshot.value?.currentPlayer !== "You") return;
  
  const wasPenalty = snapshot.value.pendingDraw > 0;
  
  try {
    round.value.draw("You");
    snapshot.value = round.value.snapshot();
    
    // Penalty draw auto-advances turn
    if (wasPenalty) {
      if (!snapshot.value.winner && snapshot.value.currentPlayer !== "You") {
        setTimeout(() => botsLoop(round.value!), 300);
      }
    } else {
      // Highlight drawn card (last in hand)
      const hand = round.value.getHand("You");
      drawnCardIndex.value = hand.length - 1;
    }
  } catch (e: any) {
    alert(`Error drawing: ${e.message}`);
  }
}
```

**Start Game:**

```typescript
function startGame() {
  const names = ["You", ...Array.from({ length: numBots.value }, (_, i) => `Bot${i+1}`)];
  const r = new Round(names, { deal: 7 });
  
  round.value = r;
  snapshot.value = r.snapshot();
  running.value = true;
  drawnCardIndex.value = null;
  
  // If bot goes first, start bot loop
  if (snapshot.value.currentPlayer !== "You") {
    botsLoop(r);
  }
}
```

---

## 🎯 Part 6: Special Features

### **6A. Drawn Card Highlighting**

**Feature:** When you draw a card (not penalty), it's highlighted with a green glow.

**Implementation:**

```typescript
// When drawing normally (not penalty)
const handSizeBefore = round.value.getHand("You").length;
round.value.draw("You");
const handSizeAfter = round.value.getHand("You").length;

if (handSizeAfter > handSizeBefore) {
  drawnCardIndex.value = handSizeAfter - 1;  // Highlight last card
}

// CSS animation
.drawn-card img {
  animation: pulse 1s ease-in-out infinite;
  box-shadow: 0 0 20px 5px #10b981 !important;
  border: 3px solid #10b981 !important;
}
```

**Why:** Helps player see which card they drew, making it easier to play it.

---

### **6B. Wild Color Picker Modal**

**Feature:** When playing a wild card, a modal appears to choose the color.

```vue
<div v-if="showColorPicker" style="...modal styles...">
  <div style="...card styles...">
    <h3>Choose a color:</h3>
    <div style="display: flex; gap: 1rem;">
      <button @click="selectColor('red')" style="...">Red</button>
      <button @click="selectColor('yellow')" style="...">Yellow</button>
      <button @click="selectColor('green')" style="...">Green</button>
      <button @click="selectColor('blue')" style="...">Blue</button>
    </div>
  </div>
</div>
```

**Flow:**
1. Player clicks wild card
2. `pendingCardIndex` stores card position
3. `showColorPicker` set to true
4. Modal appears
5. Player clicks color
6. `selectColor()` called, plays card with chosen color
7. Modal closes

---

### **6C. Card Images**

**Feature:** All cards display as actual card images.

```typescript
function getCardImage(c: Card): string {
  if (c.kind === "number") {
    return `/cards/${c.color}_${c.value}.png`;
    // Example: /cards/red_5.png
  }
  if (c.kind === "action") {
    return `/cards/${c.color}_${c.action}.png`;
    // Example: /cards/blue_skip.png
  }
  if (c.action === "wildDraw4") {
    return `/cards/wildDraw4.png`;
  }
  return `/cards/wild.png`;
}
```

**Images in `public/cards/`:**
- Number cards: `{color}_{value}.png` (e.g., `red_0.png`, `blue_7.png`)
- Action cards: `{color}_{action}.png` (e.g., `green_skip.png`)
- Wild cards: `wild.png`, `wildDraw4.png`

---

## 🐛 Part 7: Common Issues & Solutions

### **Issue 1: Bot plays immediately, can't see what happened**

**Solution:** Add delays in bot loop
```typescript
await sleep(400);  // Before bot decides
// ... bot plays ...
await sleep(200);  // After bot plays
```

### **Issue 2: Can draw when you have playable cards**

**Solution:** Disable draw button when playable cards exist
```typescript
<button 
  @click="drawCard"
  :disabled="hasPlayableCard && !isPenaltyDraw"
>
```

### **Issue 3: Wild card played without choosing color**

**Solution:** Show color picker before playing
```typescript
if (card.kind === "wild") {
  pendingCardIndex.value = idx;
  showColorPicker.value = true;
  return;  // Don't play yet
}
```

### **Issue 4: Drawn card can be chained with other cards**

**Solution:** Track if card was drawn, force end turn
```typescript
const wasDrawnCard = drawnCardIndex.value === idx;
// ... play card ...
if (wasDrawnCard && snapshot.value.chainPlayerId === "You") {
  round.value.endTurn("You");
}
```

---

## 🎓 Exam Questions & Answers

### **Q1: Why use a Round class instead of just keeping state in Vue component?**

**Answer:**
- **Separation of Concerns:** Game logic separate from UI
- **Testability:** Can test Round class without Vue
- **Reusability:** Same logic can be used in React, Svelte, etc.
- **Encapsulation:** Internal state is private, only snapshot exposed
- **Type Safety:** TypeScript validates game rules at compile time

---

### **Q2: How do you prevent the UI from mutating game state?**

**Answer:**
- Use `readonly` types in snapshot
- Return new arrays with `.slice()` or spread operator
- Never expose internal state directly
- `snapshot()` method creates immutable view
- TypeScript enforces read-only at compile time

---

### **Q3: Explain the bot auto-play loop**

**Answer:**
```typescript
while (!snap.winner && snap.currentPlayer !== "You") {
  // 1. Wait for visual delay
  await sleep(400);
  
  // 2. Get bot's hand and choose card
  const choice = chooseForAI(hand, snap.topCard);
  
  // 3. Play the card (or draw)
  if (choice === "draw") {
    r.drawAndMaybePlay(pid);
  } else {
    r.play(pid, idx, color?);
  }
  
  // 4. Update snapshot
  snap = r.snapshot();
  
  // 5. Repeat until human's turn or game ends
}
```

Loop continues as long as:
- No winner yet AND
- Current player is not "You"

---

### **Q4: How do wild cards work?**

**Answer:**
1. **When Played:**
   - Player clicks wild card
   - Color picker modal opens
   - Player selects color
   - Card is played with `chosenColor` property set

2. **Matching Against Wild:**
   ```typescript
   if (top.kind === "wild") {
     const chosen = top.chosenColor;
     return (c as any).color === chosen;
   }
   ```
   Match against the chosen color, not "wild" itself.

3. **Bot Selection:**
   ```typescript
   function pickColor(hand) {
     // Count colors, pick most common
   }
   ```

---

### **Q5: What's the difference between draw() and drawAndMaybePlay()?**

**Answer:**

**`draw(playerId)`:**
- Draws specified number of cards (or penalty amount)
- **Does NOT** auto-play
- Human uses this for normal draws
- Highlighted card shows what was drawn

**`drawAndMaybePlay(playerId)`:**
- Draws exactly one card
- **If playable, plays it automatically**
- **If not playable, ends turn**
- Bots use this when they can't play

---

### **Q6: How is number chaining implemented?**

**Answer:**
1. **When Number Played:**
   ```typescript
   if (card.kind === "number") {
     const stillHasSame = myHand.some(c => 
       c.kind === "number" && c.value === card.value
     );
     if (stillHasSame) {
       // Keep current player's turn
       chainPlayerId = playerId;
       chainValue = card.value;
     }
   }
   ```

2. **While Chaining:**
   - Player can only play same number
   - Or click "End Turn" button
   - Turn doesn't advance until chain ends

3. **End Chain:**
   ```typescript
   endTurn(playerId) {
     chainPlayerId = null;
     chainValue = null;
     // Advance to next player
   }
   ```

---

## 📚 Quick Reference

### **Card Matching**
```typescript
matches(top, card):
  - Wild always plays
  - Number: color OR value
  - Action: color OR action
  - Mixed: color only
  - Wild top: match chosen color
```

### **Bot AI**
```typescript
chooseForAI(hand, top):
  - Find first playable card
  - Return it or "draw"
```

### **Game Flow**
```
Start → Deal 7 cards → Set first player
  ↓
While no winner:
  If human's turn: Wait for input
  If bot's turn: Auto-play
  ↓
  Play card → Apply effects → Check win → Next turn
  ↓
End: Show winner
```

### **Key Vue Patterns**
```typescript
ref()        // Reactive primitive
computed()   // Derived value
@click       // Event listener
v-if         // Conditional render
v-for        // Loop render
:disabled    // Bind attribute
{{ }}        // Interpolation
```

---

## ✅ Assignment 2 Compliance Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Play vs 1-3 bots | ✅ | Configurable number of bots |
| Bots play by rules | ✅ | `chooseForAI` validates moves |
| Simple/smart AI | ✅ | Simple first-valid-card strategy |
| Setup screen | ✅ | Number of bots input |
| Play screen | ✅ | Full game board with cards |
| Official UNO rules | ✅ | All rules from Assignment 1 |
| Vue.js implementation | ✅ | Vue 3 Composition API |
| Game over screen | ✅ | Winner announced with emoji |

---

## 🎯 Study Tips for Exam

### **Topics to Master:**

1. **Vue Composition API:**
   - `ref()` vs `reactive()`
   - `computed()` for derived state
   - Template syntax (v-if, v-for, @click)
   - Lifecycle (onMounted, onUnmounted)

2. **Game State Management:**
   - Immutable snapshots
   - Private vs public state
   - Type safety with TypeScript
   - Separation of concerns

3. **Bot Implementation:**
   - Simple AI strategies
   - Async loops with delays
   - Error handling
   - Auto-play logic

4. **UNO Rules:**
   - Card matching algorithm
   - Special card effects
   - Number chaining
   - Penalty draws
   - Wild card color selection

### **Practice Questions:**

1. Write a Vue computed property
2. Implement a simple bot strategy
3. Explain card matching rules
4. Draw the game architecture diagram
5. Describe the auto-play loop flow

---

## 🎉 Summary

Your Assignment 2 implementation demonstrates:
- ✅ **Single-page Vue.js app** with Composition API
- ✅ **Complete UNO rules** in pure TypeScript
- ✅ **Simple bot AI** that plays automatically
- ✅ **Clean architecture** separating logic from UI
- ✅ **Type-safe game state** with immutable snapshots
- ✅ **Visual polish** with card images and animations

**You've built a fully playable offline UNO game!** 🎮🔥

Good luck on your exam! 🍀
