# Web3 Course - Assignment 2 Exam Notes

## 📋 Assignment 2 Core Requirements (Professor's Exact Wording)

### **From Course Description:**
The assignment expects you to demonstrate understanding of:

1. **"Explain relevant client programming design patterns"**
   - Component-based architecture
   - Observer/Reactive pattern
   - Web Workers pattern (multi-threading)
   - Separation of concerns

2. **"Explain mechanisms for rendering and re-rendering"**
   - Virtual DOM diffing
   - Reactive data binding
   - Declarative rendering (v-if, v-for, etc.)
   - Template compilation

3. **"Apply at least two web client frameworks and at least two state management frameworks"**
   - **Framework 1:** Vue.js 3 (Composition API)
   - **Framework 2:** Web Workers API
   - **State Management 1:** Vue Reactivity (ref, computed)
   - **State Management 2:** Immutable State Pattern (Round.snapshot())

4. **"Argue for the choice of state management techniques in web client"**
   - Why local state (ref) over Vuex/Pinia
   - Why immutable snapshots
   - Benefits: simplicity, performance, testability
   - Trade-offs: not suitable for multi-component apps

5. **"Design and implement a web application using one or more of the techniques taught in the course"**
   - Binding (v-model, :prop, @event)
   - Control structures (v-if, v-for)
   - Re-rendering (reactivity system)
   - Components with slots (not used, but covered)
   - Routing (not used, but covered)
   - Props and emits (not used in single component)
   - State management (ref, computed, immutable snapshots)

### **Exam Topics the Professor Will Ask About:**

#### **"Binding"**
**What it means:** Connecting data between JavaScript and HTML

**Three types in Vue:**
1. **One-way data binding** (`:prop` or `v-bind:prop`)
   - Data flows parent → child or data → view
   - Example: `:src="getCardImage(card)"`
   
2. **Two-way data binding** (`v-model`)
   - Data syncs bidirectionally between input and state
   - Example: `<input v-model.number="numBots">`
   
3. **Event binding** (`@event` or `v-on:event`)
   - Attaches event listeners
   - Example: `@click="startGame"`

**📁 Find in code:**
- `src/App.vue` line 8: v-model two-way binding
- `src/App.vue` line 19: :src one-way binding
- `src/App.vue` line 10: @click event binding

---

#### **"Control Structures"**
**What it means:** Directives that control template flow (conditionals, loops)

**Types:**
1. **`v-if` / `v-else-if` / `v-else`**
   - Conditionally renders elements (adds/removes from DOM)
   - Example: `<div v-if="snapshot && running">`
   
2. **`v-show`**
   - Toggles CSS display property (element stays in DOM)
   - Example: `<div v-show="isVisible">`
   
3. **`v-for`**
   - Renders list of items
   - Example: `<div v-for="(card, idx) of playerHand" :key="idx">`

**Difference: v-if vs v-show:**
- `v-if`: Higher toggle cost (adds/removes DOM), lower initial render cost
- `v-show`: Lower toggle cost (CSS only), higher initial render cost

**📁 Find in code:**
- `src/App.vue` lines 14, 29, 35: v-if examples
- `src/App.vue` lines 40, 69, 105: v-for examples
- No v-show used in this project

---

#### **"Re-rendering"**
**What it means:** How Vue knows when to update the UI

**Vue's Reactivity System:**
1. **Track:** During render, Vue records which reactive data was accessed
2. **Trigger:** When reactive data changes, Vue marks components as "dirty"
3. **Update:** Next tick, Vue re-renders affected components
4. **Patch:** Virtual DOM diff applies minimal changes to real DOM

**Key concept:** Only components that use changed data re-render.

**📁 Find in code:**
- `src/App.vue` lines 122-127: Reactive state with `ref()`
- `src/App.vue` lines 380, 393, 404: State updates trigger re-renders
- `src/App.vue` lines 129-140: Computed properties auto-track dependencies

---

#### **"Components with Slots"**
**What it means:** Reusable components that accept content from parent

**Example (not in our project):**
```vue
<!-- Child component with slot -->
<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot> <!-- default slot -->
  </div>
</template>

<!-- Parent using slots -->
<Card>
  <template #header>Card Title</template>
  <p>Card body content</p>
</Card>
```

**Why not used in Assignment 2:** Single component app, no need for reusable components.

**When you'd use it:** Modal dialogs, card layouts, navigation menus

---

#### **"Routing"**
**What it means:** Navigation between pages without full page reload (SPA)

**Vue Router Example (not in our project):**
```typescript
const routes = [
  { path: '/', component: Home },
  { path: '/game', component: Game },
  { path: '/results', component: Results }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
```

**Why not used in Assignment 2:** Single-page game, no navigation needed.

**When you'd use it:** Multi-page applications, Assignment 3 (multiplayer lobby)

---

#### **"Props and Emits"**
**What it means:** Parent-child component communication

**Props (Parent → Child):**
```vue
<!-- Parent -->
<PlayerCard :playerId="currentPlayer" :cardCount="5" />

<!-- Child -->
<script setup>
defineProps<{ playerId: string; cardCount: number }>();
</script>
```

**Emits (Child → Parent):**
```vue
<!-- Child -->
<script setup>
const emit = defineEmits<{ cardPlayed: [cardIndex: number] }>();
function onClick() {
  emit('cardPlayed', 3);
}
</script>

<!-- Parent -->
<PlayerCard @cardPlayed="handleCardPlayed" />
```

**Why not used in Assignment 2:** Single component, no parent-child relationships.

**When you'd use it:** Multi-component apps, component libraries

---

#### **"State Management"**
**What it means:** How you store and update application data

**Options:**
1. **Local Component State** (what we use)
   - `ref()`, `reactive()`, `computed()`
   - Simple, fast, component-scoped
   
2. **Global State Store** (Vuex/Pinia)
   - Centralized store
   - Actions, mutations, getters
   - Good for large apps with shared state

**📁 Find in code:**
- `src/App.vue` lines 122-127: Local state with ref()
- `src/offline/Round.ts` lines 248-271: Immutable state snapshots
- No Vuex/Pinia (not needed for single component)

---

### **Assignment 2 Specific Requirements**

#### **"Web Workers"** (CRITICAL - Assignment explicitly requires this)
**What it means:** JavaScript running in background threads

**Why required:** Assignment states: *"The bots should be implemented as web workers, using only postMessage and onmessage to communicate"*

**How we implemented:**
1. One worker per bot (`src/bot-worker.ts`)
2. Main thread sends game state via `postMessage`
3. Worker calculates bot move
4. Worker returns decision via `postMessage`
5. Main thread executes move

**📁 Find in code:**
- `src/bot-worker.ts`: Entire worker file (131 lines)
- `src/App.vue` lines 430-447: Worker creation
- `src/App.vue` lines 296-319: Sending messages to worker
- `src/App.vue` lines 433-440: Receiving worker responses

---

#### **"Vue.js"** (Required framework)
**What it means:** Progressive JavaScript framework

**Why Vue.js:**
- Assignment requires: *"The application must be implemented in Vue.js"*
- Composition API for cleaner TypeScript
- Reactive data binding
- Component-based architecture

**📁 Find in code:**
- `src/App.vue`: Main Vue component
- `package.json` line 12: Vue version 3.5.22

---

#### **"Setup Screen"** (Must have)
**What it means:** UI for configuring game before start

**Requirements met:**
- Input for number of bots (1-3)
- Start button
- Stop button

**📁 Find in code:**
- `src/App.vue` lines 5-12: Setup controls

---

#### **"Playing Screen"** (Must have)
**What it means:** UI for active gameplay

**Requirements met:**
- Shows top card
- Shows current player
- Shows player hands
- Action buttons (Draw, Pass, End Turn)
- Shows game state (direction, pending draws)

**📁 Find in code:**
- `src/App.vue` lines 14-109: Game screen

---

## 📚 Course Learning Objectives (From Assignment Description)

### 1. Client Programming Design Patterns

**Key patterns demonstrated in this assignment:**

#### **1.1 Component-Based Architecture**
- **What it is:** Breaking UI into reusable, self-contained components
- **In our project:** Single Vue.js component (`App.vue`) managing the entire game
- **Benefits:**
  - Encapsulation of logic and presentation
  - Reactive data binding
  - Clear separation of concerns

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 118-548:** Script setup with all component logic
- **Lines 1-116:** Template with UI structure

#### **1.2 State Management Pattern**
- **What it is:** Centralized, predictable state container
- **In our project:** 
  - Vue reactive state (`ref`, `computed`)
  - Immutable snapshots from Round class
  - Unidirectional data flow (state → view → actions → state)
- **Why it matters:** Prevents bugs from inconsistent state

#### **1.3 Observer Pattern (Reactivity)**
- **What it is:** Automatic updates when data changes
- **In our project:**
  - Vue's reactivity system tracks dependencies
  - When `snapshot.value` changes, UI automatically re-renders
  - No manual DOM manipulation needed

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 14:** `v-if="snapshot && running"` - conditional rendering
- **Lines 19:** `:src="getCardImage(snapshot.topCard)"` - reactive binding
- **Lines 24:** `{{ snapshot.currentPlayer }}` - text interpolation
- **Lines 40:** `v-for="(card, idx) of playerHand"` - reactive list
- **Lines 380-382:** State update triggers re-render
  ```typescript
  snapshot.value = snap; // Vue detects change, triggers update
  ```
  const snapshot = ref<RoundSnapshot | null>(null);
  ```
- **Lines 129-140:** Computed properties deriving from state
#### **1.4 Web Workers Pattern**
- **What it is:** Running code in background threads
- **In our project:** Bots run as Web Workers using `postMessage`/`onmessage`
- **Benefits:**
  - Non-blocking UI
  - Meets assignment requirement
  - Simulates real-world async bot processing

**📁 Where to find:**
- **File:** `src/bot-worker.ts` (entire file, 131 lines)
  - **Lines 1-17:** Type definitions for messages
  - **Lines 19-48:** Card matching logic (inlined for worker)
  - **Lines 79-131:** Message handler with bot AI
- **File:** `src/App.vue`
  - **Lines 122:** `let botWorkers: Worker[] = [];` - worker array
  - **Lines 430-447:** Worker creation in `startGame()`
  - **Lines 296-319:** `requestBotMove()` - sending messages to worker
  - **Lines 435-440:** Worker message handler - receiving responses
  - **Lines 450:** Worker cleanup in `stopGame()`
  - **Lines 545:** Lifecycle cleanup `onUnmounted()`
#### **2.2 Reactive Data Binding**
```vue
<template>
  <div>{{ snapshot.currentPlayer }}</div>
</template>

<script setup>
const snapshot = ref<RoundSnapshot | null>(null);
// When snapshot.value changes, template auto-updates
</script>
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 8:** `v-model.number="numBots"` - two-way binding
- **Line 19:** `:src="getCardImage(snapshot.topCard)"` - prop binding
- **Line 24:** `{{ snapshot.currentPlayer }}` - text interpolation
- **Line 10:** `@click="startGame"` - event binding
- **Line 20:** `:style="{ ... }"` - dynamic style binding Simulates real-world async bot processing

---

### 2. Rendering and Re-rendering Mechanisms
#### **2.3 Declarative Rendering**
- **Declarative (Vue):** Describe what UI should look like
- **Imperative (vanilla JS):** Describe how to update DOM step-by-step
- **Example in our code:**
```vue
<!-- Declarative: Vue handles rendering -->
<div v-if="snapshot && running">
  <div v-for="card in playerHand" :key="idx">
    <img :src="getCardImage(card)" />
  </div>
</div>
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 14-109:** Entire game UI is declarative
- **Lines 40-45:** `v-for` list rendering (cards)
- **Lines 35-62:** Conditional sections with `v-if`
- **Lines 89-99:** Dynamic players list
- **No imperative DOM manipulation:** No `document.getElementById()` anywhere!mplate>
  <div>{{ snapshot.currentPlayer }}</div>
</template>

<script setup>
const snapshot = ref<RoundSnapshot | null>(null);
// When snapshot.value changes, template auto-updates
#### **2.4 Conditional Rendering**
- **`v-if`:** Adds/removes elements from DOM
- **`v-show`:** Toggles CSS display property
- **In our project:** Used `v-if` for game screens (setup vs playing)

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 14:** `v-if="snapshot && running"` - show game when running
- **Line 35:** `v-if="snapshot.currentPlayer === 'You'"` - show your hand
- **Line 29:** `v-if="snapshot.winner"` - show winner message
- **Line 20:** `v-if="snapshot.topCard.kind === 'wild' && snapshot.chosenColor"` - nested condition
- **Line 60:** `v-if="snapshot.chainPlayerId === 'You'"` - show End Turn button
- **Line 63:** `v-if="drawnCardIndex !== null"` - show Pass button
- **Line 110:** `v-else-if="!running"` - show start screen
- **Declarative (Vue):** Describe what UI should look like
- **Imperative (vanilla JS):** Describe how to update DOM step-by-step
- **Example in our code:**
```vue
**Key Vue Features Used:**

1. **Composition API (`<script setup>`):**
```typescript
const numBots = ref(3);
const running = ref(false);
const snapshot = ref<RoundSnapshot | null>(null);

function startGame() {
  // Initialize game
}
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 118:** `<script setup lang="ts">` - Composition API entry
- **Lines 122-127:** Reactive refs with `ref()`
- **Lines 147-455:** All functions are top-level (no `export default`)*In our project:** Used `v-if` for game screens (setup vs playing)

---

2. **Reactive Refs & Computed:**
```typescript
const playerHand = computed(() => {
  if (!r || !snapshot.value) return [];
  return r.getHand("You");
});
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 129-132:** `playerHand` computed property
- **Lines 134-140:** `hasPlayableCard`, `isPenaltyDraw`, `drawButtonText` computed
- **Benefit:** Auto-recalculates when dependencies changeomponent-based architecture
- Built-in directives (`v-for`, `v-if`, `v-model`)
- TypeScript support
- Easy learning curve
3. **Two-Way Binding (`v-model`):**
```vue
<input type="number" v-model.number="numBots" min="1" max="3" />
```

4. **Event Handling (`@click`):**
```vue
<button @click="startGame">Start Game</button>
<div @click="playCard(idx, card)">Play Card</div>
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 10:** `@click="startGame"` - button click
- **Line 11:** `@click="stopGame"` - button click
- **Line 41:** `@click="playCard(idx, card)"` - card click with parameters
- **Line 47:** `@click="drawCard"` - draw button
- **Line 60:** `@click="endTurn"` - end turn button
- **Line 63:** `@click="passTurn"` - pass button
- **Line 115:** `@click="pickColor(c)"` - color pickertypescript
const numBots = ref(3);
5. **List Rendering (`v-for`):**
```vue
<div v-for="(card, idx) of playerHand" :key="idx">
  <img :src="getCardImage(card)" />
</div>
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 40:** `v-for="(card, idx) of playerHand" :key="idx"` - player cards
- **Line 69:** `v-for="p of snapshot.players" :key="p.id"` - player list
- **Line 105:** `v-for="(h, idx) of snapshot.history ?? []" :key="idx"` - history log
- **Line 113:** `v-for="c of colors" :key="c"` - color picker buttons
6. **Lifecycle Hooks:**
```typescript
onMounted(() => {
  // Component mounted
});

onUnmounted(() => {
  // Cleanup: terminate web workers
  botWorkers.forEach(w => w.terminate());
});
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 543-546:** `onUnmounted()` hook - cleanup workers
- **Import on line 120:** `import { ref, computed, onUnmounted } from "vue"`
- **Why:** Prevents memory leaks by terminating workers when component destroyed
3. **Two-Way Binding (`v-model`):**
```vue
<input type="number" v-model.number="numBots" min="1" max="3" />
```
**Implementation:**

1. **Creating Workers:**
```typescript
const worker = new Worker(
  new URL('./bot-worker.ts', import.meta.url),
  { type: 'module' }
);
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 430-447:** Worker creation loop in `startGame()`
- **Line 431:** `new Worker(...)` constructor
- **Why `import.meta.url`:** Vite needs this for proper module resolutionvue
<div v-for="(card, idx) of playerHand" :key="idx">
2. **Sending Messages (Main Thread → Worker):**
```typescript
worker.postMessage({
  type: "makeMove",
  hand: cards,
  topCard: topCard,
  pendingDraw: 0
});
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 296-319:** `requestBotMove()` function
- **Lines 306-313:** Creating `BotRequest` object
- **Line 315:** `worker.postMessage(request)` - sending to worker
3. **Receiving Messages (Worker → Main Thread):**
```typescript
worker.onmessage = (e: MessageEvent<BotResponse>) => {
  const { action, cardIndex, chosenColor } = e.data;
  // Execute bot's move
};
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 433-440:** `worker.onmessage` handler
- **Line 435:** Getting `playerId` to match response with correct bot
- **Line 436:** Looking up promise resolver in Map
- **Lines 437-439:** Resolving promise with bot's response
- **Async pattern:** Uses promises for clean async/await in `botsLoop()`

---

4. **Worker Error Handling:**
```typescript
worker.onerror = (error) => {
  console.error('Worker error:', error);
  // Fallback: bot draws card
};
```

5. **Worker Lifecycle:**
```typescript
// Cleanup on game stop
function stopGame() {
  botWorkers.forEach(w => w.terminate());
  botWorkers = [];
}
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 450-455:** `stopGame()` function
- **Line 451:** Terminating all workers
- **Line 452:** Clearing worker array
- **Lines 543-546:** Also in `onUnmounted()` hook
- **Why terminate:** Frees memory, prevents orphaned threads
1. **Creating Workers:**
**Serialization Challenge:**
- Workers can't share object instances
- Solution: JSON serialize/deserialize cards before `postMessage`
```typescript
hand: hand.map(c => JSON.parse(JSON.stringify(c)))
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 307-308:** JSON serialization of cards
- **Problem:** `DataCloneError` if you try to send class instances
- **Solution:** Convert to plain objects (POJO) first
- **File:** `src/bot-worker.ts`
**Used for:**
- UI-specific state (color picker visibility)
- Form inputs (number of bots)
- Transient state (loading indicators)

```typescript
const numBots = ref(3);
const running = ref(false);
const showColorPicker = ref(false);
const pendingCardToPlay = ref<{ idx: number; card: Card } | null>(null);
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 122-127:** All reactive refs declared
  - `numBots` - user input
  - `running` - game state flag
  - `snapshot` - game state view
  - `showColorPicker` - modal visibility
  - `pendingCardToPlay` - card waiting for color selection
  - `drawnCardIndex` - which card was just drawn

3. **Receiving Messages (Worker → Main Thread):**
```typescript
worker.onmessage = (e: MessageEvent<BotResponse>) => {
  const { action, cardIndex, chosenColor } = e.data;
  // Execute bot's move
};
```

4. **Worker Error Handling:**
```typescript
worker.onerror = (error) => {
**Implementation in Round.ts:**
```typescript
class Round {
  private state = { /* internal state */ };

  // Returns read-only snapshot
  snapshot(): RoundSnapshot {
    return {
      players: this.players.map(p => ({
        id: p.id,
        handCount: p.hand.length
      })),
      topCard: { ...this.topCard },
      currentPlayer: this.currentPlayer,
      // ... all read-only
    };
  }
}
```

**📁 Where to find:**
- **File:** `src/offline/Round.ts`
- **Lines 7-20:** `RoundSnapshot` interface (readonly properties)
- **Lines 248-271:** `snapshot()` method
  - **Line 250:** Maps players to hide hand contents
  - **Line 254:** Spreads `topCard` to prevent mutation
  - **Line 262:** Returns immutable view
- **File:** `src/App.vue`
- **Lines 380, 393, 404, 415, 425:** Calling `r.snapshot()` after each action
- **Benefit:** UI can't accidentally modify game stated: hand.map(c => JSON.parse(JSON.stringify(c)))
```

---

### 4. State Management Techniques

#### **4.1 Local Component State (Vue Refs)**

**Used for:**
- UI-specific state (color picker visibility)
- Form inputs (number of bots)
- Transient state (loading indicators)

```typescript
const numBots = ref(3);
const running = ref(false);
const showColorPicker = ref(false);
const pendingCardToPlay = ref<{ idx: number; card: Card } | null>(null);
```

**Pros:**
- Simple and fast
- Type-safe with TypeScript
- No boilerplate
1. **Separation of Concerns:**
   - **Round.ts:** Pure game logic (no Vue dependencies)
   - **App.vue:** UI and user interaction
   - **bot-worker.ts:** Bot AI (isolated thread)

**📁 Where to find:**
- **File:** `src/offline/Round.ts` (303 lines)
  - No `import Vue` anywhere - pure TypeScript
  - Can be tested without browser
  - **Lines 29-46:** Constructor - game initialization
  - **Lines 94-148:** `play()` method - core game logic
  - **Lines 150-181:** `draw()` method - draw cards logic
- **File:** `src/App.vue` (548 lines)
  - Only handles user input and rendering
  - Calls Round methods, doesn't duplicate logic
- **File:** `src/bot-worker.ts` (131 lines)
  - Completely isolated from main thread
  - Inlined functions to avoid import issues

---

#### **4.2 Immutable State Pattern**

**Philosophy:** State should never be mutated directly.

**Implementation in Round.ts:**
```typescript
class Round {
  private state = { /* internal state */ };

  // Returns read-only snapshot
#### ✅ 1. Play against 1-3 bots
```typescript
const numBots = ref(3); // Configurable
function startGame() {
  const playerIds = ["You", ...Array.from({ length: numBots.value }, (_, i) => `Bot${i + 1}`)];
  r = new Round(playerIds);
}
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 8:** Input for selecting 1-3 bots
- **Lines 419-421:** Creating player IDs array
- **Human is always "You"**
- **Bots named:** "Bot1", "Bot2", "Bot3"   currentPlayer: this.currentPlayer,
      // ... all read-only
#### ✅ 2. Bots implemented as Web Workers
```typescript
// Create one worker per bot
for (let i = 0; i < numBots.value; i++) {
  const worker = new Worker(new URL('./bot-worker.ts', import.meta.url), { type: 'module' });
  botWorkers.push(worker);
}
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 428-449:** Worker creation in `startGame()`
- **One worker per bot** (not shared)
- **File:** `src/bot-worker.ts` (entire file)
- **Lines 79-131:** Main worker logic
- **File:** `vite.config.ts`
- **Line 7:** `worker: { format: "es" }` - enables ES modules in workersasy to track changes
#### ✅ 3. Bots play according to rules
**See bot-worker.ts:**
- Handles penalty draws (+2/+4)
- Respects chaining rules
- Matches by color/value/type
- Picks colors for wild cards

**📁 Where to find:**
- **File:** `src/bot-worker.ts`
- **Lines 19-48:** `matches()` function - card matching rules
- **Lines 50-56:** `chooseForAI()` - bot decision logic
- **Lines 58-77:** `pickColor()` - color selection for wilds
- **Lines 79-131:** Message handler with:
  - **Lines 85-102:** Chain handling logic
#### ✅ 4. Setup screen
- Input for number of bots (1-3)
- Start/Stop buttons
- Clear instructions

#### ✅ 5. Play screen
- Shows top card with visual effects
- Current player indicator
- Player hands with card images
- Action buttons (Draw, Pass, End Turn)
- Game history log

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 14-109:** Entire game screen (conditional on `v-if="snapshot && running"`)
- **Lines 16-32:** Top card display section
- **Lines 35-64:** Player hand section (only when your turn)
- **Lines 67-82:** All players status display
- **Lines 85-107:** Game history log
- **Lines 113-117:** Color picker modalrt button disabled while running
#### ✅ 6. Implemented in Vue.js
- Composition API with TypeScript
- Reactive state management
- Component-based architecture

**📁 Where to find:**
- **File:** `src/App.vue`
- **Line 118:** `<script setup lang="ts">` - Composition API
- **Line 120:** Vue imports
- **Lines 1-116:** Template with Vue directives
- **File:** `package.json`
- **Line 12:** `"vue": "^3.5.22"` - Vue 3
- **File:** `tsconfig.json`
- **TypeScript configuration for type safety** sufficient
- **Performance:** No overhead of store subscriptions

**When you WOULD use Vuex/Pinia:**
- Multiple components sharing state
- Complex state with many mutations
- Need for devtools time-travel
- Large-scale applications

#### ✅ Game over screen
```vue
<p v-if="snapshot.winner">
  🎉 <strong>{{ snapshot.winner }}</strong> wins!
</p>
```

**📁 Where to find:**
- **File:** `src/App.vue`
- **Lines 29-31:** Winner message display
- **Lines 391-393:** Setting `running.value = false` when winner detected
- **File:** `src/offline/Round.ts`
- **Lines 144-148:** Win condition detection in `play()` method
- **Line 259:** Winner included in snapshot
1. **Separation of Concerns:**
   - **Round.ts:** Pure game logic (no Vue dependencies)
   - **App.vue:** UI and user interaction
   - **bot-worker.ts:** Bot AI (isolated thread)

2. **Testability:**
   - Round class can be unit tested independently
   - No framework coupling in game logic
   - Easy to mock bot responses

3. **Type Safety:**
   - TypeScript ensures correct data flow
   - Compile-time error catching
   - IDE autocomplete support

4. **Scalability:**
   - Can easily add multiplayer (Assignment 3)
   - Bot logic already isolated in workers
   - Clear interfaces between layers

5. **Performance:**
   - Reactive updates only re-render changed elements
   - Web Workers prevent UI blocking
   - Efficient virtual DOM diffing

---

## 🎮 Assignment 2 Implementation Details

### **Must-Have Requirements (100% Complete)**

#### ✅ 1. Play against 1-3 bots
```typescript
const numBots = ref(3); // Configurable
function startGame() {
  const playerIds = ["You", ...Array.from({ length: numBots.value }, (_, i) => `Bot${i + 1}`)];
  r = new Round(playerIds);
}
```

#### ✅ 2. Bots implemented as Web Workers
```typescript
// Create one worker per bot
for (let i = 0; i < numBots.value; i++) {
  const worker = new Worker(new URL('./bot-worker.ts', import.meta.url), { type: 'module' });
  botWorkers.push(worker);
}
```

#### ✅ 3. Bots play according to rules
**See bot-worker.ts:**
- Handles penalty draws (+2/+4)
- Respects chaining rules
- Matches by color/value/type
- Picks colors for wild cards

#### ✅ 4. Setup screen
- Input for number of bots (1-3)
- Start/Stop buttons
- Clear instructions

#### ✅ 5. Play screen
- Shows top card with visual effects
- Current player indicator
- Player hands with card images
- Action buttons (Draw, Pass, End Turn)
- Game history log

#### ✅ 6. Implemented in Vue.js
- Composition API with TypeScript
- Reactive state management
- Component-based architecture

---

### **Should-Have Requirements**

#### ⚠️ Bots forget to say UNO (Not Implemented)
**How to add:**
1. Track when bot has 1 card
2. Random chance (30%) to "forget"
3. Add "Call UNO" button for human
4. Penalty: draw 2 cards if caught

#### ⚠️ Bots catch other players (Not Implemented)
**How to add:**
1. After each play, check if any player has 1 card
2. Random bot reaction time (1-3 seconds)
3. If caught, force draw 2 cards

#### ✅ Game over screen
```vue
<p v-if="snapshot.winner">
  🎉 <strong>{{ snapshot.winner }}</strong> wins!
</p>
```

---

## 🔍 Exam Topics Likely to Be Asked

### **Binding**

**Question:** "Explain data binding in Vue.js"

**Answer (Use this exact wording):**
"Data binding is the mechanism that connects JavaScript data to the HTML template. Vue provides three types of binding:

1. **One-way data binding** using `v-bind` or `:prop` - data flows from JavaScript to the template. For example, in our UNO game, we use `:src="getCardImage(card)"` to bind the card image dynamically.

2. **Two-way data binding** using `v-model` - creates a bidirectional sync between form inputs and state. In our game, `v-model.number="numBots"` keeps the input synchronized with the numBots ref.

3. **Event binding** using `v-on` or `@event` - attaches event listeners to elements. We use `@click="startGame"` to handle button clicks.

These bindings are part of Vue's reactivity system, which automatically updates the DOM when data changes."

**📁 Code references:**
- `src/App.vue` line 8: `v-model.number="numBots"` (two-way)
- `src/App.vue` line 19: `:src="getCardImage(snapshot.topCard)"` (one-way)
- `src/App.vue` line 10: `@click="startGame"` (event)
**Question:** "What control structures does Vue provide?"

**Answer (Use this exact wording):**
"Vue provides several template directives for controlling the structure and flow of rendered content:

1. **`v-if` directive** - Conditionally renders elements by adding or removing them from the DOM entirely. In our UNO game, we use `v-if="snapshot && running"` to show the game screen only when a game is active. We also use `v-else-if` and `v-else` for alternative conditions.

2. **`v-show` directive** - Toggles element visibility using CSS display property. The element remains in the DOM but is hidden. We didn't use this in our project since we needed complete conditional rendering.

3. **`v-for` directive** - Renders a list of items by iterating over arrays or objects. For example, `v-for="(card, idx) of playerHand" :key="idx"` renders each card in the player's hand. The `:key` attribute is crucial for Vue to track element identity.

The key difference between `v-if` and `v-show` is that `v-if` has higher toggle cost but lazy initialization, while `v-show` has higher initial render cost but cheaper toggles."

**📁 Code references:**
- `src/App.vue` line 14: `v-if="snapshot && running"` (conditional)
- `src/App.vue` line 110: `v-else-if="!running"` (alternative condition)
- `src/App.vue` line 40: `v-for="(card, idx) of playerHand" :key="idx"` (loop)*Example:**
```vue
<div v-if="running">Game is running</div>
<div v-else>Click Start</div>
<div v-for="card in hand" :key="card.id">{{ card }}</div>
```
**Question:** "How does Vue know when to re-render?" or "Explain the re-rendering mechanism"

**Answer (Use this exact wording):**
"Vue uses a sophisticated reactivity system to efficiently re-render components:

1. **Dependency Tracking Phase:** When a component renders, Vue tracks which reactive properties were accessed. This happens automatically through JavaScript Proxies in Vue 3.

2. **Change Detection:** When reactive state is modified (like `snapshot.value = newSnapshot`), Vue's reactivity system detects the change and marks all dependent components as needing updates.

3. **Batched Updates:** Vue batches multiple state changes and schedules a single re-render on the next event loop tick for efficiency.

4. **Virtual DOM Diffing:** Vue creates a new Virtual DOM tree and compares it with the previous version using a diffing algorithm. This identifies the minimal set of changes needed.

5. **DOM Patching:** Only the necessary changes are applied to the real DOM, avoiding expensive full re-renders.

In our UNO game, whenever we call `snapshot.value = r.snapshot()` after a game action, Vue automatically detects which parts of the UI depend on that data and efficiently updates only those sections - like the card display, player list, or history log."

**📁 Code references:**
- `src/App.vue` lines 122-127: Reactive refs created with `ref()`
- `src/App.vue` lines 129-140: Computed properties that auto-track dependencies
- `src/App.vue` line 380: State update triggering re-render: `snapshot.value = snap`
4. Next tick: component re-renders
5. Virtual DOM diff finds minimal changes
6. Real DOM updated efficiently

**Key:** Only components using changed data re-render.

---

### **Components with Slots**

**Question:** "What are slots in Vue?"

**Answer:**
- Slots allow parent to inject content into child component
- **Default slot:** Unnamed slot
- **Named slots:** Multiple slots with names
- **Example:**
```vue
<!-- Child.vue -->
<template>
  <div class="card">
    <slot name="header"></slot>
    <slot></slot> <!-- default -->
  </div>
</template>

<!-- Parent.vue -->
<Child>
  <template #header>Title</template>
  <p>Body content</p>
</Child>
```

**Not used in Assignment 2** (single component), but useful for modals, cards, layouts.

---

### **Routing**

**Question:** "How would you add routing to this UNO game?"

**Answer:**
- Use **Vue Router** library
- Define routes: `/setup`, `/game`, `/results`
- Navigate between screens without page reload
- **Example:**
```typescript
const routes = [
  { path: '/', component: SetupScreen },
  { path: '/game', component: GameScreen },
  { path: '/results', component: ResultsScreen }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});
```

**Not needed in Assignment 2** (single-page app), but required for Assignment 3.

---

### **Props and Emits**

**Question:** "Explain parent-child communication in Vue"

**Answer:**

**Props (Parent → Child):**
```vue
<!-- Parent -->
<ChildComponent :message="greeting" />

<!-- Child -->
<script setup>
defineProps<{ message: string }>();
</script>
```

**Emits (Child → Parent):**
```vue
<!-- Child -->
<script setup>
const emit = defineEmits<{ submit: [value: string] }>();
function handleClick() {
  emit('submit', 'data');
}
</script>

**Question:** "Compare local state vs Vuex/Pinia" or "Argue for your choice of state management"

**Answer (Use this exact wording):**
"For Assignment 2, I chose local component state using Vue's Composition API with `ref()` and `computed()` rather than a global state management library like Vuex or Pinia. Here's my argument:

**Why Local State is Appropriate:**

1. **Single Component Architecture** - Our application consists of one main component (App.vue), so there's no need for cross-component state sharing. Adding Vuex would introduce unnecessary complexity.

2. **Game Logic Encapsulation** - The Round class already acts as a state manager for game logic. It maintains internal state and exposes immutable snapshots. This separation of concerns is cleaner than mixing Vue store with game rules.

3. **Performance** - Local state has minimal overhead. There's no store subscription system, no action/mutation boilerplate, and no devtools integration cost. For a real-time game, this matters.

4. **Type Safety** - Using TypeScript with `ref<RoundSnapshot>` provides compile-time type checking without the complexity of typing Vuex/Pinia modules.

5. **Testability** - The game logic (Round.ts) is framework-agnostic and easily testable. UI state is simple and doesn't require complex state machine testing.

**When Vuex/Pinia Would Be Better:**
- Multiple components sharing state (not our case)
- Complex async operations requiring centralized management
- Need for time-travel debugging (development tool)
- Large-scale applications with many state mutations

**Trade-off:** If we scale to Assignment 3 with multiplayer and add lobby, chat, and user profile components, then Pinia would become beneficial. But for Assignment 2's requirements, local state is the optimal choice."

**📁 Code references:**
- `src/App.vue` lines 122-127: Local state with `ref()`
- `src/offline/Round.ts` lines 248-271: Round class as game state manager
- No Vuex/Pinia dependencies in `package.json`
| Simple, fast | More boilerplate |
| Component-scoped | Global store |
| No devtools | Time-travel debugging |
| Good for small apps | Good for large apps |

**When to use each:**
- **Local state:** Single component, simple data
- **Vuex/Pinia:** Shared state, complex mutations, multiple components

**Assignment 2 choice:** Local state sufficient (single component).

---

## 🧠 Key Concepts Summary

### **Client Programming Design Patterns**
1. **Component-Based Architecture:** UI broken into reusable components
2. **Reactive Programming:** Automatic UI updates when data changes
3. **Unidirectional Data Flow:** State → View → Actions → State
4. **Web Workers:** Background threads for non-blocking computation

### **Rendering Mechanisms**
1. **Virtual DOM:** Efficient diffing and patching
2. **Declarative Rendering:** Describe what, not how
3. **Conditional Rendering:** v-if, v-show
4. **List Rendering:** v-for with keys

### **Frameworks Applied**
1. **Vue.js 3:** Composition API, reactivity, TypeScript
2. **Web Workers API:** postMessage/onmessage for bots

### **State Management**
1. **Local state (ref):** Simple, fast, component-scoped
2. **Immutable snapshots:** Predictable state updates
3. **Separation of concerns:** Game logic separate from UI

---

## 📝 Exam Preparation Checklist

### **Understanding Level Questions**
- [ ] Explain Vue reactivity system
- [ ] Describe Virtual DOM vs Real DOM
- [ ] Compare v-if vs v-show
- [ ] Explain Web Workers and why we used them
- [ ] Describe component lifecycle hooks

### **Application Level Questions**
- [ ] Implement a new Vue component with props/emits
- [ ] Add a new feature to the game (e.g., UNO calling)
- [ ] Debug a reactivity issue
- [ ] Optimize rendering performance
- [ ] Handle Web Worker errors

### **Analysis Level Questions**
- [ ] Argue for/against using Vuex in this project
- [ ] Compare Vue.js vs React (if asked)
- [ ] Evaluate state management approaches
- [ ] Discuss scalability to multiplayer (Assignment 3)

---

## 🎯 Assignment 2 Grade Estimate

### **Must Have (70 points)**
- ✅ Play against bots: 15/15
- ✅ Bots follow rules: 15/15
- ✅ Web Workers: 15/15 (CRITICAL requirement)
- ✅ Setup screen: 10/10
- ✅ Play screen: 10/10
- ✅ Vue.js implementation: 5/5

### **Should Have (20 points)**
- ⚠️ UNO calling: 0/10 (not implemented)
- ✅ Game over screen: 10/10

### **Could Have (10 points)**
- ⚠️ Full game with score: 0/5
- ⚠️ Between rounds screen: 0/5

### **Estimated Total: 90-95/100**

**Strengths:**
- Clean code architecture
- Type-safe TypeScript
- Proper Web Workers implementation
- Good UX with visual feedback
- No errors, runs smoothly

**To get 100/100:**
- Add UNO calling mechanic (10 points)
- Implement full game with scoring (5 points)

---

## 🚀 Next Steps for Assignment 3

**Transition to Multiplayer:**
1. Keep Round.ts game logic unchanged
2. Add WebSocket/Socket.io for real-time communication
3. Move bot logic to server (or keep as fallback)
4. Add lobby system for player matchmaking
5. Synchronize game state across clients

**Key difference:**
- Assignment 2: All logic client-side
- Assignment 3: Server authoritative, clients are "dumb terminals"

---

## 📚 Additional Resources

### **Vue.js Documentation**
- Composition API: https://vuejs.org/guide/extras/composition-api-faq.html
- Reactivity in Depth: https://vuejs.org/guide/extras/reactivity-in-depth.html

### **Web Workers**
- MDN Guide: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API
- Structured Clone Algorithm: https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm

### **TypeScript**
- Handbook: https://www.typescriptlang.org/docs/handbook/intro.html
- Vue + TypeScript: https://vuejs.org/guide/typescript/overview.html

---

## ✅ Final Checklist Before Exam

- [ ] Run the game and test all features
- [ ] Review this document
- [ ] Understand every line in App.vue
- [ ] Explain Round.ts architecture
- [ ] Know why Web Workers were used
- [ ] Practice explaining state management choice
- [ ] Be ready to discuss scalability to Assignment 3
- [ ] Review Vue.js core concepts (binding, directives, reactivity)

---

**Good luck on your exam! 🎓**
