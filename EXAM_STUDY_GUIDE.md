# Assignments 4 & 5: Complete Exam Study Guide

This comprehensive guide covers **Assignment 4** (Functional Programming) and **Assignment 5** (Redux + RxJS Architecture). It demonstrates how the UNO Online project implements modern JavaScript patterns with detailed explanations for exam preparation.

---

## 📋 Assignment 5 Overview

**⚠️ Important Implementation Note:**

Since we're using **Vue** instead of React, we need to bridge Vue's reactivity system with Redux. The key challenge is that Vue's `computed()` doesn't automatically re-run when Redux state changes (unlike React's hooks).

**Solution: Subscribe to Redux Store Changes**

In `src/store/vue.ts`, our `useSelector` hook:
1. Creates a reactive Vue `ref`
2. Subscribes to Redux store with `store.subscribe()`
3. Updates the ref when Redux state changes
4. Automatically unsubscribes on component unmount

```typescript
export function useSelector<T>(selector: (state: RootState) => T): ComputedRef<T> {
  const state = ref(selector(store.getState())) as Ref<T>;
  
  // ✅ Subscribe to Redux - update Vue ref when state changes
  const unsubscribe = store.subscribe(() => {
    state.value = selector(store.getState());
  });
  
  // ✅ Cleanup on component unmount
  if (typeof onUnmounted !== 'undefined') {
    onUnmounted(() => unsubscribe());
  }
  
  return computed(() => state.value);
}
```

**Why this works:**
- RxJS Observable emits → Redux action dispatched → Redux state updates
- `store.subscribe()` callback fires → Vue ref updates
- Vue reactivity detects ref change → Component re-renders

---

## 📋 Assignment 5 Requirements

**Conversion to Other Technologies:**
- Convert Vue/Pinia client to React/Redux using RxJS
- Use functional model from Assignment 4
- Retain all features from Assignments 1-3

**Must Have Requirements:**
1. ✅ Functional model from Assignment 4
2. ✅ Redux for state management
3. ✅ RxJS for handling messages from the server
4. ✅ Retain features from assignments 1-3

**Should Have:**
- React for rendering (optional - we use Vue + Redux bridge)

---

## 📚 RxJS Exam Concepts (From Course Slides)

The course description states: *"I will be asking about e.g.: One-way data flow, reducers, slices, thunks, (RxJS) observables, subjects, pipes and operators, merge vs concat"*

### **Key RxJS Concepts:**

#### **1. Observables**
**Definition:** A lazy Push collection of multiple values over time.

**Our Implementation:** `src/store/streams.ts`
```typescript
export function createDocumentObservable<T>(docPath: string): Observable<T | null> {
  return new Observable((subscriber) => {
    const docRef = doc(db, docPath);
    
    // ✅ Observable wraps Firestore onSnapshot
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        // Push new value when Firestore updates
        subscriber.next({ id: snapshot.id, ...snapshot.data() } as T);
      },
      (error) => subscriber.error(error)
    );
    
    // ✅ Return cleanup function
    return () => unsubscribe();
  });
}
```

**Exam Question:** *"What is an Observable?"*
- A stream that emits values over time
- Lazy (doesn't execute until subscribed)
- Can emit multiple values (unlike Promises which emit once)
- Supports operators for transformation (map, filter, etc.)

#### **2. Subjects**
**Definition:** A special Observable that can multicast to many observers (both Observable and Observer).

**Note:** Our solution uses standard Observables (not Subjects) because Firestore's `onSnapshot` already handles multicasting internally.

**When to use Subjects:**
- Need to manually push values (`subject.next(value)`)
- Multiple subscribers should receive same values
- Hot observables (vs cold)

#### **3. Pipes and Operators**
**Definition:** Operators transform Observable values (like array methods but for streams).

**Common operators:**
- `map()` - Transform each value
- `filter()` - Only emit values that pass test
- `take(n)` - Only take first n values
- `switchMap()` - Switch to new Observable

**Example (not in our code, but for exam):**
```typescript
import { map, filter } from 'rxjs/operators';

const numbers$ = new Observable(sub => {
  sub.next(1); sub.next(2); sub.next(3);
});

numbers$.pipe(
  filter(x => x > 1),  // Only 2, 3
  map(x => x * 10)     // Transform to 20, 30
).subscribe(val => console.log(val));
```

#### **4. Merge vs Concat**

**merge()** - Subscribe to all Observables simultaneously (parallel)
```typescript
import { merge } from 'rxjs';

const room$ = createDocumentObservable('rooms/abc');
const players$ = createCollectionObservable('rooms/abc/players');

// ✅ Both streams run in parallel
merge(room$, players$).subscribe(data => console.log(data));
```

**concat()** - Subscribe to Observables sequentially (one after another)
```typescript
import { concat } from 'rxjs';

// ✅ players$ only starts after room$ completes
concat(room$, players$).subscribe(data => console.log(data));
```

**Our Implementation:**
We use **parallel subscriptions** (similar to merge concept):
```typescript
// src/store/streams.ts - Line 73
export function startListeningToRoom(roomId: string): () => void {
  const subscriptions: Subscription[] = [];
  
  // ✅ All three Observables run simultaneously (like merge)
  subscriptions.push(roomObservable.subscribe({...}));
  subscriptions.push(playersObservable.subscribe({...}));
  subscriptions.push(handObservable.subscribe({...}));
  
  return () => subscriptions.forEach(sub => sub.unsubscribe());
}
```

**Exam Answer:**
- **merge**: Interleaves emissions from multiple Observables (parallel)
- **concat**: Subscribes to next Observable only after previous completes (sequential)
- **Our solution**: Uses merge-like pattern (parallel subscriptions)

---

## 🎯 Part 1: Redux State Management

### **What is Redux?**

Redux is a **predictable state container** for JavaScript applications. It centralizes application state in a single store, making state changes traceable and debuggable.

**Core Concepts:**
1. **Store** - Single source of truth for application state
2. **Actions** - Plain objects describing what happened
3. **Reducers** - Pure functions that specify how state changes
4. **Dispatch** - Function to send actions to the store

### **One-Way Data Flow (Exam Topic)**

**Definition:** Data flows in a single direction through the application.

**Redux/RxJS Flow in Our App:**
```
Firestore Update → RxJS Observable → Redux Action → Reducer → Store → Component
     ↑                                                                      |
     └───────────────── User Action (GraphQL Mutation) ←───────────────────┘
```

**Step-by-Step:**
1. **User clicks button** in `OnlineBoard.vue`
2. **GraphQL mutation** sent to server (`playCardOnline()`)
3. **Server updates Firestore** with new game state
4. **Firestore triggers snapshot** event
5. **RxJS Observable emits** new data (`createDocumentObservable`)
6. **Observable subscription dispatches** Redux action (`store.dispatch(setRoom(...))`)
7. **Redux reducer** updates store immutably
8. **Vue component re-renders** via `useSelector` hook

**Code Example:** `src/services/OnlineBoard.vue` (Line 210-215)
```typescript
onMounted(() => {
  // ✅ Start one-way data flow: Firestore → RxJS → Redux → Vue
  unsubscribe = startListeningToRoom(roomId);
});
```

**Exam Question:** *"Explain one-way data flow in Redux"*
- UI triggers action → Action dispatched → Reducer updates state → UI re-renders
- Data never flows backwards (no direct state mutation)
- Predictable and debuggable

### **Reducers (Exam Topic)**

**Definition:** Pure functions that take previous state + action, return new state.

**Our Implementation:** `src/store/gameSlice.ts`
```typescript
import { createSlice } from "@reduxjs/toolkit";

const gameSlice = createSlice({
  name: "game",
  initialState: {
    room: null,
    players: [],
    myHand: []
  },
  reducers: {
    // ✅ Reducer: (state, action) => newState
    setRoom: (state, action) => {
      state.room = action.payload;  // Redux Toolkit uses Immer (auto-immutable)
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setMyHand: (state, action) => {
      state.myHand = action.payload;
    },
    resetGame: (state) => {
      state.room = null;
      state.players = [];
      state.myHand = [];
    }
  }
});
```

**Exam Answer:**
- **Pure function**: Same input always produces same output
- **No side effects**: Don't call APIs, modify arguments, etc.
- **Immutable updates**: Return new state object (Redux Toolkit handles this with Immer)

### **Slices (Exam Topic)**

**Definition:** A "slice" of Redux state with its own reducers and actions.

**Our Implementation:** `src/store/gameSlice.ts`
```typescript
// ✅ gameSlice manages the "game" portion of Redux state
const gameSlice = createSlice({
  name: "game",  // Namespace for actions: "game/setRoom"
  initialState: { room, players, myHand },
  reducers: { setRoom, setPlayers, setMyHand, resetGame }
});

export const { setRoom, setPlayers, setMyHand, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
```

**Store Configuration:** `src/store/store.ts`
```typescript
export const store = configureStore({
  reducer: {
    game: gameReducer  // ✅ "game" slice
    // Could add more slices: user: userReducer, ui: uiReducer
  }
});
```

**Exam Question:** *"What is a slice in Redux Toolkit?"*
- A collection of reducer logic and actions for a specific feature
- Automatically generates action creators
- Reduces boilerplate compared to traditional Redux
- Organizes code by feature domain

---

### **1A. Redux Store Configuration**

**What it means:** The store holds the entire application state tree. Only one store per application.

**File: `src/store/store.ts`**

```typescript
import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer  // ✅ Register slice reducers
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firestore Timestamp objects
        ignoredActions: ["game/setRoom", "game/setPlayers"],
        ignoredPaths: ["game.room.createdAt", "game.room.updatedAt"]
      }
    })
});

// TypeScript types for type-safe access
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

**Key Points:**
- `configureStore()` from Redux Toolkit simplifies store setup
- Middleware configured to handle non-serializable Firestore timestamps
- TypeScript types exported for type safety
- Single store for entire application

**Exam Question:** *"What is the purpose of the Redux store?"*
- Holds entire application state in one place
- Provides `getState()` to access current state
- Provides `dispatch()` to send actions
- Notifies subscribers when state changes

---

### **1B. Redux Slice (Actions + Reducer)**

**What it means:** A "slice" is a collection of reducer logic and actions for a single feature. Redux Toolkit's `createSlice` generates action creators automatically.

**File: `src/store/gameSlice.ts`**

```typescript
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GameState, RoomData, PlayerData } from "./types";
import type { Card } from "../cards/Card";

const initialState: GameState = {
  room: null,
  players: [],
  myHand: []
};

const gameSlice = createSlice({
  name: "game",  // ✅ Slice name (used in action types)
  initialState,
  reducers: {
    // ✅ Each reducer is a pure function
    setRoom(state, action: PayloadAction<RoomData>) {
      state.room = action.payload;  // Redux Toolkit uses Immer for immutability
    },
    setPlayers(state, action: PayloadAction<PlayerData[]>) {
      state.players = action.payload;
    },
    setMyHand(state, action: PayloadAction<Card[]>) {
      state.myHand = action.payload;
    },
    resetGame(state) {
      state.room = null;
      state.players = [];
      state.myHand = [];
    }
  }
});

// ✅ Export actions (automatically generated)
export const { setRoom, setPlayers, setMyHand, resetGame } = gameSlice.actions;

// ✅ Export reducer (for store configuration)
export default gameSlice.reducer;
```

**How Redux Toolkit Handles Immutability:**

Redux Toolkit uses **Immer** library internally, allowing you to write "mutating" code that actually produces immutable updates:

```typescript
// This LOOKS like mutation:
state.room = action.payload;

// But Immer converts it to:
return {
  ...state,
  room: action.payload
};
```

**Exam Question:** *"What is a Redux reducer?"*
- Pure function: `(state, action) => newState`
- Takes current state and action as input
- Returns new state without mutating original
- Must be deterministic (same input → same output)
- No side effects (no API calls, no random values)

**Exam Question:** *"What are Redux actions?"*
- Plain JavaScript objects with a `type` property
- Describe "what happened" in the application
- Can include additional data in `payload`
- Example: `{ type: "game/setRoom", payload: roomData }`

---

### **1C. TypeScript Types for State**

**File: `src/store/types.ts`**

```typescript
import type { Card } from "../cards/Card";

export interface PlayerData {
  id: string;
  displayName: string;
  isHost?: boolean;
  handCount: number;
  isReady?: boolean;
  joinedAt?: any;
}

export interface RoomData {
  id?: string;
  code?: string;
  status: string;
  currentTurn?: string;
  topCard?: Card;
  direction?: 1 | -1;
  pendingDraw?: number;
  pendingType?: "draw2" | "draw4" | null;
  // ... other fields
}

export interface GameState {
  room: RoomData | null;
  players: PlayerData[];
  myHand: Card[];
}
```

**Why TypeScript with Redux:**
- Type-safe state access
- Autocomplete in IDE
- Catch errors at compile time
- Self-documenting code

---

### **1D. Dispatching Actions**

**How to update Redux state:**

```typescript
import { store } from "./store";
import { setRoom, setPlayers, setMyHand } from "./gameSlice";

// Dispatch an action
store.dispatch(setRoom({
  id: "abc123",
  status: "playing",
  currentTurn: "player1"
}));

// Redux Toolkit automatically creates action object:
// { type: "game/setRoom", payload: { id: "abc123", ... } }
```

**In components (using Vue bridge):**

```typescript
import { useDispatch } from "../store/vue";

const dispatch = useDispatch();

// Dispatch from component
function handleSomeEvent() {
  dispatch(setMyHand([card1, card2, card3]));
}
```

---

### **1E. Reading from Redux Store**

**Using Selectors:**

A **selector** is a function that extracts specific data from the Redux state tree.

```typescript
import { useSelector } from "../store/vue";
import type { RootState } from "../store/store";

// ✅ Select room data
const room = useSelector((state: RootState) => state.game.room);

// ✅ Select players array
const players = useSelector((state: RootState) => state.game.players);

// ✅ Select my hand
const myHand = useSelector((state: RootState) => state.game.myHand);

// ✅ Derived data (computed selector)
const topCard = useSelector((state: RootState) => state.game.room?.topCard ?? null);
const isMyTurn = useSelector((state: RootState) => 
  state.game.room?.currentTurn === myPlayerId
);
```

**Exam Question:** *"What is a selector in Redux?"*
- A function that extracts data from Redux state
- Can compute derived data (memoized with reselect library)
- Keeps components decoupled from state shape
- Example: `(state) => state.game.room`

---

### **1F. Thunks (Exam Topic)**

**Definition:** A thunk is a function that wraps an expression to delay its evaluation. In Redux, thunks are used for async actions.

**Traditional Redux Thunk Pattern:**
```typescript
// Async action creator (returns function, not object)
const fetchUser = (userId) => async (dispatch) => {
  dispatch({ type: 'FETCH_USER_START' });
  try {
    const user = await api.getUser(userId);
    dispatch({ type: 'FETCH_USER_SUCCESS', payload: user });
  } catch (error) {
    dispatch({ type: 'FETCH_USER_ERROR', error });
  }
};
```

**Our Implementation:**
We don't use explicit thunks because:
1. **RxJS handles async** - Observables manage real-time data streams
2. **GraphQL mutations** - Server actions are simple async functions
3. **Direct dispatch** - Observable subscriptions dispatch synchronously

**Code Reference:** `src/store/streams.ts` (Lines 77-85)
```typescript
// ✅ Observable subscription dispatches directly (no thunk needed)
roomObservable.subscribe({
  next: (room) => {
    if (room) {
      store.dispatch(setRoom(room));  // Synchronous dispatch
    }
  }
});
```

**Exam Question:** *"What is a thunk in Redux?"*
- A function returned by an action creator for async logic
- Receives `dispatch` and `getState` as arguments
- Used for API calls, side effects, conditional dispatching
- We use RxJS Observables instead for real-time streams

**Exam Question:** *"What is a selector in Redux?"*
- Function that takes Redux state and returns derived data
- Enables components to extract exactly what they need
- Can compute derived state (e.g., filtering, sorting)
- Memoizable for performance (using reselect library)

---

## 🌊 Part 2: RxJS for Server Messages

### **What is RxJS?**

RxJS (Reactive Extensions for JavaScript) is a library for **reactive programming** using **Observables**. It handles asynchronous data streams.

**Core Concepts:**
1. **Observable** - Represents a stream of data over time
2. **Observer** - Consumes values emitted by Observable
3. **Subscription** - Represents execution of an Observable
4. **Operators** - Pure functions to transform Observables

**Why RxJS for this project:**
- Firestore provides real-time snapshots (data streams)
- RxJS wraps these snapshots as Observables
- Clean subscription management with automatic cleanup
- Composable async operations

---

### **2A. Creating Observables from Firestore**

**File: `src/store/streams.ts`**

```typescript
import { Observable } from "rxjs";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase";

/**
 * Wrap Firestore document snapshot as RxJS Observable
 */
export function createDocumentObservable<T>(
  docPath: string
): Observable<T | null> {
  return new Observable((subscriber) => {  // ✅ Create new Observable
    const docRef = doc(db, docPath);
    
    // ✅ Subscribe to Firestore snapshots
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          subscriber.next({ id: snapshot.id, ...snapshot.data() } as T);  // ✅ Emit data
        } else {
          subscriber.next(null);
        }
      },
      (error) => {
        subscriber.error(error);  // ✅ Emit error
      }
    );
    
    // ✅ Cleanup function (called when subscription ends)
    return () => unsubscribe();
  });
}
```

**How it works:**
1. `new Observable(subscriber => ...)` creates the Observable
2. Inside, we subscribe to Firestore with `onSnapshot`
3. When Firestore emits data, we call `subscriber.next(data)`
4. If error occurs, we call `subscriber.error(error)`
5. Return cleanup function to unsubscribe from Firestore

**Exam Question:** *"What is an RxJS Observable?"*
- Represents a stream of values over time
- Lazy - doesn't execute until subscribed
- Can emit multiple values (unlike Promise which resolves once)
- Supports cancellation via unsubscribe
- Three notification types: next (data), error, complete

---

### **2B. Observable for Collections**

```typescript
export function createCollectionObservable<T>(
  collectionPath: string
): Observable<T[]> {
  return new Observable((subscriber) => {
    const collectionRef = collection(db, collectionPath);
    
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        subscriber.next(docs);  // ✅ Emit array of documents
      },
      (error) => {
        subscriber.error(error);
      }
    );
    
    return () => unsubscribe();
  });
}
```

---

### **2C. Subscribing to Observables**

**File: `src/store/streams.ts`**

```typescript
import { Subscription } from "rxjs";
import { store } from "./store";
import { setRoom, setPlayers, setMyHand } from "./gameSlice";

export function startListeningToRoom(roomId: string): () => void {
  const subscriptions: Subscription[] = [];
  
  // ✅ Create Observable for room document
  const roomObservable = createDocumentObservable<any>(`rooms/${roomId}`);
  
  // ✅ Subscribe to Observable
  subscriptions.push(
    roomObservable.subscribe({
      next: (room) => {
        if (room) {
          store.dispatch(setRoom(room));  // ✅ Dispatch to Redux
        }
      },
      error: (err) => console.error("Room stream error:", err)
    })
  );
  
  // Similar for players and hand...
  
  // ✅ Return cleanup function
  return () => {
    subscriptions.forEach((sub) => sub.unsubscribe());
  };
}
```

**Data Flow:**
```
Firestore snapshot
    ↓
Observable emits with next(data)
    ↓
Subscription callback receives data
    ↓
Dispatch Redux action with data
    ↓
Redux reducer updates state
    ↓
Vue component re-renders (via useSelector)
```

**Exam Question:** *"How do you subscribe to an RxJS Observable?"*
```typescript
const subscription = observable.subscribe({
  next: (value) => console.log("Received:", value),
  error: (err) => console.error("Error:", err),
  complete: () => console.log("Complete")
});

// Clean up when done
subscription.unsubscribe();
```

---

### **2D. Observer Pattern**

**Observer** is an object with three methods:
- `next(value)` - Called when Observable emits a value
- `error(err)` - Called when Observable encounters an error
- `complete()` - Called when Observable completes (optional for infinite streams)

```typescript
const observer = {
  next: (data) => {
    console.log("New data:", data);
    store.dispatch(setRoom(data));
  },
  error: (err) => {
    console.error("Stream error:", err);
  }
  // No complete - Firestore streams are infinite
};

roomObservable.subscribe(observer);
```

---

### **2E. Subscription Management**

**Why cleanup matters:**
- Prevent memory leaks
- Avoid dispatching to unmounted components
- Release Firestore listeners

**Pattern used in project:**

```typescript
// Component mounts
onMounted(() => {
  unsubscribe = startListeningToRoom(roomId);
});

// Component unmounts
onUnmounted(() => {
  if (unsubscribe) unsubscribe();  // ✅ Clean up all subscriptions
});
```

**Inside startListeningToRoom:**

```typescript
const subscriptions: Subscription[] = [];

// Add subscriptions
subscriptions.push(roomObservable.subscribe(...));
subscriptions.push(playersObservable.subscribe(...));

// Return cleanup
return () => {
  subscriptions.forEach(sub => sub.unsubscribe());
};
```

**Exam Question:** *"Why is unsubscribing important?"*
- Prevents memory leaks (subscriptions hold references)
- Stops unnecessary network requests
- Avoids updating unmounted components
- Releases system resources

---

## 🔗 Part 3: Vue-Redux Bridge

Since we're using **Vue** (not React), we need custom hooks to connect Vue components to Redux.

**File: `src/store/vue.ts`**

```typescript
import { computed, type ComputedRef } from "vue";
import { store, type RootState } from "./store";

/**
 * Vue composable to select data from Redux store
 * Similar to useSelector from react-redux
 */
export function useSelector<T>(
  selector: (state: RootState) => T
): ComputedRef<T> {
  // ✅ Vue's computed creates reactive reference
  return computed(() => selector(store.getState()));
}

/**
 * Get Redux dispatch function
 */
export function useDispatch() {
  return store.dispatch;
}
```

**How Vue reactivity works with Redux:**

1. `computed()` creates a reactive reference
2. Inside computed, we call `selector(store.getState())`
3. When Redux state changes, `store.getState()` returns new value
4. Vue's reactivity system detects the change
5. Component re-renders with new data

**Usage in Vue component:** `src/services/OnlineBoard.vue` (Lines 199-202)

```typescript
import { useSelector } from "../store/vue";

// ✅ Creates reactive reference that updates automatically
const room = useSelector((state: RootState) => state.game.room);
const players = useSelector((state: RootState) => state.game.players);
const myHand = useSelector((state: RootState) => state.game.myHand);

// Use in template
<div>{{ room?.status }}</div>
<div>Players: {{ players.length }}</div>
<div>Cards in hand: {{ myHand.length }}</div>
```

**Component Lifecycle:** `src/services/OnlineBoard.vue` (Lines 210-217)
```typescript
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  // ✅ Start RxJS streams when component mounts
  unsubscribe = startListeningToRoom(roomId);
});

onUnmounted(() => {
  // ✅ Clean up subscriptions when component unmounts
  if (unsubscribe) unsubscribe();
});
```

**Exam Question:** *"How does Vue connect to Redux?"*
- Custom `useSelector` hook wraps Redux state in Vue `computed()`
- `computed()` makes the value reactive
- When Redux state updates, Vue reactivity triggers re-render

---

## 🔄 Part 4: Complete Data Flow Example

### **Real-World Scenario: Playing a Card**

**User Action → Server → Firestore → RxJS → Redux → Vue**

**Step 1: User clicks card** (`OnlineBoard.vue` - template)
```vue
<div @click="onPlay(card, index)" class="card-wrapper">
  <CardView :card="card" size="md" />
</div>
```

**Step 2: Component calls GraphQL mutation** (`OnlineBoard.vue` - Line ~280)
```typescript
const onPlay = async (card: Card, index: number) => {
  // If wild card, choose color first
  if (card.kind === "wild") {
    pendingWild.value = { index, card };
    return;
  }
  
  // ✅ Send mutation to GraphQL server
  await playCardOnline(roomId, card);
};
```

**Step 3: GraphQL server validates and updates Firestore** (`OnlineGame.ts` - Lines 53-58)
```typescript
export async function playCardOnline(roomId: string, card: Card) {
  type R = { playCard: boolean };
  await gql<R>(
    `mutation ($roomId: ID!, $card: JSON!) { playCard(roomId: $roomId, card: $card) }`,
    { roomId, card }
  );
}
```

**Step 4: Firestore triggers snapshot event**
- Server updates `rooms/{roomId}` document with new `topCard`
- Firestore's `onSnapshot` callback fires

**Step 5: RxJS Observable emits new data** (`streams.ts` - Lines 20-26)
```typescript
const unsubscribe = onSnapshot(
  docRef,
  (snapshot) => {
    // ✅ Observable pushes new value to subscribers
    subscriber.next({ id: snapshot.id, ...snapshot.data() } as T);
  }
);
```

**Step 6: Observable subscription dispatches Redux action** (`streams.ts` - Lines 77-85)
```typescript
roomObservable.subscribe({
  next: (room) => {
    console.log("[RxJS] Room update:", room);
    if (room) {
      // ✅ Dispatch to Redux store
      store.dispatch(setRoom(room));
    }
  }
});
```

**Step 7: Redux reducer updates state** (`gameSlice.ts`)
```typescript
reducers: {
  setRoom: (state, action) => {
    // ✅ Immutable update (Redux Toolkit uses Immer)
    state.room = action.payload;
  }
}
```

**Step 8: Vue component reactively updates** (`OnlineBoard.vue` - Line 199)
```typescript
// ✅ useSelector hook detects Redux state change
const room = useSelector((state: RootState) => state.game.room);

// ✅ Computed property automatically recalculates
const top = computed<Card | null>(() => room.value?.topCard ?? null);
```

**Step 9: Template re-renders with new card**
```vue
<CardView :card="top" size="lg" />
```

**Complete Flow Diagram:**
```
┌─────────────┐
│ User Click  │
└──────┬──────┘
       ↓
┌──────────────────┐
│ playCardOnline() │ (GraphQL mutation)
└──────┬───────────┘
       ↓
┌──────────────┐
│ Server Logic │ (validates, updates Firestore)
└──────┬───────┘
       ↓
┌───────────────┐
│ Firestore DB  │
└──────┬────────┘
       ↓ (snapshot event)
┌────────────────┐
│ RxJS Observable│ (emits new data)
└──────┬─────────┘
       ↓
┌──────────────────┐
│ Observable.next()│
└──────┬───────────┘
       ↓
┌────────────────────┐
│ store.dispatch()   │ (Redux action)
└──────┬─────────────┘
       ↓
┌────────────────┐
│ Reducer        │ (updates state)
└──────┬─────────┘
       ↓
┌────────────────┐
│ Redux Store    │ (new state)
└──────┬─────────┘
       ↓
┌────────────────┐
│ useSelector()  │ (Vue hook detects change)
└──────┬─────────┘
       ↓
┌────────────────┐
│ Component      │ (re-renders)
└────────────────┘
```

**Exam Question:** *"Explain the complete data flow from user action to UI update"*
1. User interaction triggers GraphQL mutation
2. Server validates and updates Firestore
3. Firestore snapshot callback fires
4. RxJS Observable emits new data
5. Observable subscriber dispatches Redux action
6. Redux reducer updates state immutably
7. Vue `useSelector` detects change via `computed()`
8. Component re-renders with new data
- `useDispatch` provides access to Redux dispatch function

---

## 🏗️ Part 4: Complete Architecture Flow

### **4A. Data Flow Diagram**

```
User Action (e.g., play card)
    ↓
GraphQL Mutation
    ↓
Firestore Update (server-side)
    ↓
Firestore Snapshot Event
    ↓
RxJS Observable emits (streams.ts)
    ↓
Observer callback receives data
    ↓
Redux Action Dispatched (setRoom/setPlayers/setMyHand)
    ↓
Redux Reducer Updates State (gameSlice.ts)
    ↓
Vue Computed Updates (via useSelector)
    ↓
Component Re-renders with New Data
```

### **4B. Concrete Example: Playing a Card**

**Step-by-step:**

1. **User clicks card in OnlineBoard.vue**
   ```typescript
   async function onPlayCard(card: Card, index: number) {
     await playCardOnline(roomId, card);  // GraphQL mutation
   }
   ```

2. **GraphQL mutation updates Firestore**
   ```typescript
   // OnlineGame.ts
   export async function playCardOnline(roomId: string, card: Card) {
     await gql(`mutation { playCard(roomId: $roomId, card: $card) }`, { roomId, card });
   }
   ```

3. **Firestore snapshot triggered**
   - Server updates `rooms/{roomId}` document
   - Firestore sends snapshot to all listeners

4. **RxJS Observable emits**
   ```typescript
   // streams.ts
   const roomObservable = createDocumentObservable(`rooms/${roomId}`);
   roomObservable.subscribe({
     next: (room) => store.dispatch(setRoom(room))  // ✅
   });
   ```

5. **Redux reducer updates state**
   ```typescript
   // gameSlice.ts
   setRoom(state, action) {
     state.room = action.payload;  // Immer makes this immutable
   }
   ```

6. **Vue component updates**
   ```typescript
   // OnlineBoard.vue
   const room = useSelector((state) => state.game.room);
   // Vue reactivity detects change → re-render
   ```

7. **UI updates**
   - New top card displayed
   - Turn indicator updates
   - Hand updates for players

---

## 📚 Part 5: Exam Question Categories

### **Category A: Redux Fundamentals**

**Q1: What are the three principles of Redux?**
1. **Single source of truth** - One store for entire app
2. **State is read-only** - Only way to change state is dispatch action
3. **Changes via pure functions** - Reducers are pure functions

**Q2: What is the difference between action and reducer?**
- **Action**: Plain object describing what happened (`{ type: "game/setRoom", payload: data }`)
- **Reducer**: Pure function specifying how state changes (`(state, action) => newState`)

**Q3: Why are Redux reducers pure functions?**
- Predictable - same input always produces same output
- Testable - no side effects to mock
- Time-travel debugging possible
- Can replay actions to reconstruct state

**Q4: How does Redux Toolkit simplify Redux?**
- `createSlice` generates actions automatically
- Immer library allows "mutating" syntax
- `configureStore` sets up middleware automatically
- TypeScript support built-in

---

### **Category B: RxJS Observables**

**Q1: What is an Observable?**
- Represents a stream of values over time
- Lazy - doesn't execute until subscribed
- Can emit 0, 1, or many values
- Supports cancellation

**Q2: Observable vs Promise - what's the difference?**

| Observable | Promise |
|------------|---------|
| Lazy (doesn't start until subscribed) | Eager (starts immediately) |
| Can emit multiple values | Resolves to single value |
| Cancellable (unsubscribe) | Not cancellable |
| Synchronous or asynchronous | Always asynchronous |

**Q3: What are the three notification types?**
- `next(value)` - Emit a value
- `error(err)` - Emit an error (terminates stream)
- `complete()` - Signal completion (no more values)

**Q4: Why wrap Firestore snapshots in Observables?**
- Unified interface for async streams
- Composable with RxJS operators
- Automatic cleanup via subscription
- Type-safe with TypeScript

---

### **Category C: Integration Patterns**

**Q1: How does Redux integrate with RxJS?**
- RxJS Observables emit data from Firestore
- Observable subscribers dispatch Redux actions
- Redux reducers update centralized state
- Components read from Redux store

**Q2: Why use both Redux AND RxJS?**
- **Redux**: Centralized, predictable state management
- **RxJS**: Handle async real-time streams from Firestore
- Together: Reactive updates + predictable state changes

**Q3: How does Vue access Redux state?**
- Custom `useSelector` hook
- Wraps Redux state in Vue `computed()`
- Provides reactive reference to components
- Automatic re-rendering when state changes

**Q4: What is the cleanup pattern?**
```typescript
onMounted(() => {
  unsubscribe = startListeningToRoom(roomId);  // Start
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();  // Cleanup
});
```

---

### **Category D: Assignment 5 Compliance**

**Q1: How does the project meet "Redux for state management"?**
- `configureStore` creates Redux store
- `gameSlice` defines reducers and actions
- All game state (room, players, myHand) stored in Redux
- Components read via `useSelector`

**Q2: How does the project meet "RxJS for server messages"?**
- `createDocumentObservable` wraps Firestore docs
- `createCollectionObservable` wraps Firestore collections
- Subscriptions automatically dispatch to Redux
- Clean unsubscribe on component unmount

**Q3: How is the functional model retained?**
- `src/online/` folder unchanged
- All card logic uses pure functions
- Game state remains immutable
- No classes, only functions and types

**Q4: What features are retained from Assignments 1-3?**
- Multiplayer lobby (create/join rooms)
- Card playing with validation
- Stacking +2/+4 cards
- Number chaining
- Wild card color picker
- Win detection and turn management

---

## 🎓 Part 6: Code Examples for Exam

### **Example 1: Creating a Redux Slice**

```typescript
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CounterState {
  value: number;
}

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 } as CounterState,
  reducers: {
    increment(state) {
      state.value += 1;  // Looks like mutation, but Immer makes it immutable
    },
    decrement(state) {
      state.value -= 1;
    },
    incrementByAmount(state, action: PayloadAction<number>) {
      state.value += action.payload;
    }
  }
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;
export default counterSlice.reducer;
```

### **Example 2: Creating an Observable**

```typescript
import { Observable } from "rxjs";

const numberStream = new Observable<number>((subscriber) => {
  subscriber.next(1);
  subscriber.next(2);
  subscriber.next(3);
  
  setTimeout(() => {
    subscriber.next(4);
    subscriber.complete();
  }, 1000);
  
  // Cleanup
  return () => {
    console.log("Unsubscribed");
  };
});

// Subscribe
const subscription = numberStream.subscribe({
  next: (n) => console.log("Received:", n),
  complete: () => console.log("Done")
});

// Later: unsubscribe
subscription.unsubscribe();
```

### **Example 3: Dispatching Actions**

```typescript
import { store } from "./store";
import { setRoom } from "./gameSlice";

// Direct dispatch
store.dispatch(setRoom({
  id: "abc",
  status: "playing",
  currentTurn: "player1"
}));

// In component
const dispatch = useDispatch();
dispatch(setRoom(roomData));
```

### **Example 4: Using Selectors**

```typescript
import { useSelector } from "../store/vue";

// Simple selector
const room = useSelector(state => state.game.room);

// Derived selector
const isMyTurn = useSelector(state => 
  state.game.room?.currentTurn === myPlayerId
);

// Complex selector
const playableCards = useSelector(state => {
  const hand = state.game.myHand;
  const top = state.game.room?.topCard;
  if (!top) return [];
  return hand.filter(card => matches(top, card));
});
```

---

## ✅ Assignment 5 Compliance Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Use functional model from A4 | ✅ Complete | `src/online/` unchanged |
| Retain features from A1-A3 | ✅ Complete | All gameplay working |
| **Redux for state management** | ✅ Complete | `src/store/store.ts`, `gameSlice.ts` |
| **RxJS for server messages** | ✅ Complete | `src/store/streams.ts` with Observables |
| React for rendering (optional) | ⚠️ Optional | Vue + Redux bridge (`vue.ts`) |

---

## 📂 Quick Code Reference Map

### **Redux Files**
- **`src/store/store.ts`** - Redux store configuration with `configureStore()`
  - Line 5-13: Store setup with gameReducer
  - Line 16-17: TypeScript types (RootState, AppDispatch)
  
- **`src/store/gameSlice.ts`** - Redux slice with actions/reducers
  - Line 10-15: Initial state definition
  - Line 17-35: Reducers (setRoom, setPlayers, setMyHand, resetGame)
  - Line 38: Export action creators
  
- **`src/store/types.ts`** - TypeScript interfaces
  - GameState, RoomData, PlayerData interfaces

### **RxJS Files**
- **`src/store/streams.ts`** - RxJS Observables wrapping Firestore
  - Line 15-36: `createDocumentObservable()` - Wraps Firestore doc
  - Line 43-65: `createCollectionObservable()` - Wraps Firestore collection
  - Line 73-128: `startListeningToRoom()` - Subscribes to 3 Observables (room, players, hand)
  - Line 77-85: Room Observable subscription → dispatches `setRoom()`
  - Line 88-97: Players Observable subscription → dispatches `setPlayers()`
  - Line 102-113: Hand Observable subscription → dispatches `setMyHand()`
  - Line 117-120: Cleanup function returning unsubscribe callbacks

### **Vue-Redux Bridge**
- **`src/store/vue.ts`** - Custom hooks for Vue integration
  - Line 5-17: `useSelector()` - Wraps Redux state in Vue computed()
  - Line 19-21: `useDispatch()` - Returns Redux dispatch function

### **Component Integration**
- **`src/services/OnlineBoard.vue`** - Main game component
  - Line 199-202: useSelector hooks reading Redux state
  - Line 205-207: Local UI state (not in Redux)
  - Line 210-217: onMounted/onUnmounted lifecycle with RxJS cleanup
  - Line 220-235: Computed properties deriving data from Redux state
  - Line 280+: Event handlers calling GraphQL mutations

### **GraphQL Mutations**
- **`src/services/OnlineGame.ts`** - GraphQL client
  - Line 11-38: `gql()` helper function with Firebase auth
  - Line 43-48: `startGameClient()` mutation
  - Line 50-55: `playCardOnline()` mutation
  - Line 57-62: `drawOneOnline()` mutation
  - Line 64-69: `endTurnOnline()` mutation

### **Functional Model (Assignment 4)**
- **`src/online/Deck.ts`** - Pure deck functions with lodash
  - Uses `_.shuffle()` for deck randomization
  
- **`src/online/Hand.ts`** - Pure hand functions with lodash
  - Uses `_.concat()`, `_.take()`, `_.drop()` for immutable operations
  
- **`src/online/Round.ts`** - Game state management with lodash
  - Uses `_.map()`, `_.concat()`, `_.last()`, `_.initial()` throughout
  - All functions are pure (no mutations)
  
- **`src/online/functional-utils.ts`** - Higher-order functions
  - compose(), pipe(), curry() implementations

---

## 🎯 Exam Answer Templates

### **"Explain one-way data flow in our application"**
```
1. User clicks button in OnlineBoard.vue
2. GraphQL mutation sent to server (playCardOnline())
3. Server updates Firestore database
4. Firestore triggers snapshot event
5. RxJS Observable emits new data (createDocumentObservable)
6. Observable subscription dispatches Redux action (store.dispatch(setRoom()))
7. Redux reducer updates state immutably (gameSlice)
8. Vue useSelector detects change via computed()
9. Component re-renders with new data

Code: See src/store/streams.ts line 77-85
```

### **"What is a reducer in Redux?"**
```
A pure function that takes (state, action) and returns new state.
- Must be pure (no side effects)
- Must return new state (immutable)
- Handles specific action types

Example: src/store/gameSlice.ts line 20-22
setRoom: (state, action) => {
  state.room = action.payload; // Redux Toolkit uses Immer for immutability
}
```

### **"What is an Observable in RxJS?"**
```
A lazy stream that emits values over time.
- Lazy: doesn't execute until subscribed
- Can emit multiple values (unlike Promises)
- Supports operators for transformation
- Requires cleanup (unsubscribe)

Example: src/store/streams.ts line 15-36 (createDocumentObservable)
```

### **"Explain merge vs concat in RxJS"**
```
merge(): Subscribes to all Observables simultaneously (parallel)
- Interleaves emissions from multiple sources
- All streams run at the same time
- Use when order doesn't matter

concat(): Subscribes to Observables sequentially (one after another)
- Waits for previous Observable to complete
- Then subscribes to next
- Use when order matters

Our implementation: Uses merge-like pattern with parallel subscriptions
Code: src/store/streams.ts line 75-115
```

### **"What is a slice in Redux Toolkit?"**
```
A collection of reducer logic and actions for a specific feature.
- Automatically generates action creators
- Reduces boilerplate code
- Uses Immer for immutable updates
- Organized by domain/feature

Example: src/store/gameSlice.ts
- name: "game" (action namespace)
- initialState: { room, players, myHand }
- reducers: { setRoom, setPlayers, setMyHand, resetGame }
```

### **"What is a thunk in Redux?"**
```
A function returned by an action creator for async logic.
- Receives dispatch and getState as arguments
- Used for API calls, delays, conditional logic
- Can dispatch multiple actions

Our implementation: We use RxJS Observables instead
Code: src/store/streams.ts (Observables handle async, dispatch synchronously)
```

### **"How does Vue connect to Redux?"**
```
Custom hooks bridge Vue reactivity with Redux:

1. useSelector():
   - Wraps selector in Vue computed()
   - Returns reactive reference
   - Auto-updates when Redux state changes
   
2. useDispatch():
   - Returns Redux dispatch function
   - Used to send actions to store

Code: src/store/vue.ts lines 5-21
Usage: src/services/OnlineBoard.vue lines 199-202
```

---

## 🎯 Quick Reference for Exam

### **Redux Pattern**
```typescript
// 1. Define action
const setRoom = createAction<RoomData>("game/setRoom");

// 2. Define reducer
const reducer = (state, action) => ({ ...state, room: action.payload });

// 3. Dispatch action
store.dispatch(setRoom(data));

// 4. Read state
const room = useSelector(state => state.game.room);
```

### **RxJS Pattern**
```typescript
// 1. Create Observable
const obs = new Observable(subscriber => {
  subscriber.next(value);
  return () => cleanup();
});

// 2. Subscribe
const sub = obs.subscribe({
  next: (val) => handle(val),
  error: (err) => handleError(err)
});

// 3. Unsubscribe
sub.unsubscribe();
```

### **Integration Pattern**
```typescript
// Observable → Redux → Vue
observable.subscribe({
  next: (data) => store.dispatch(setData(data))
});

const data = useSelector(state => state.game.data);
```

---

## ✅ Core Functional Programming Requirements (Assignment 4 Retained)

### 1. **Immutability - No Mutations Allowed**

**What it means:** Once data is created, it cannot be changed. Instead of modifying existing data, we create new copies with the desired changes.

**Why it matters:** Prevents bugs from unexpected side effects, makes code predictable and easier to test.

**Traditional OOP (BAD ❌):**
```typescript
class Deck {
  private cards: Card[] = [];
  
  draw(n: number): Card[] {
    return this.cards.splice(0, n);  // ❌ MUTATES the array!
  }
}
```

**Functional Programming (GOOD ✅):**
```typescript
// File: src/online/Deck.ts
export const drawFromDeck = (
  deck: readonly Card[],  // ✅ 'readonly' prevents mutation
  count: number
): { readonly newDeck: readonly Card[]; readonly drawnCards: readonly Card[] } => {
  const actualCount = Math.min(count, deck.length);
  return {
    drawnCards: deck.slice(0, actualCount),  // ✅ Returns NEW array
    newDeck: deck.slice(actualCount)         // ✅ Returns NEW array
  };
};
// Original 'deck' is NEVER modified!
```

**Complete Game State Example:**
```typescript
// File: src/online/Round.ts
export interface GameState {
  readonly deck: readonly Card[];           // ✅ Cannot reassign, cannot mutate
  readonly discard: readonly Card[];        // ✅ Immutable array
  readonly players: readonly PlayerState[]; // ✅ Immutable array of immutable objects
  readonly currentIndex: number;            // ✅ Primitive values are immutable
  readonly direction: 1 | -1;
  readonly winner?: string;
  // ... ALL properties are readonly
}
```

**How State Updates Work (Key Exam Concept):**
```typescript
// File: src/online/Round.ts, line ~280
export const playCard = (state: GameState, ...) => {
  // ✅ Spread operator creates NEW object
  return {
    ...state,  // Copy all existing properties
    players: updatedPlayers,  // Replace with NEW array
    discard: [...state.discard, card],  // Create NEW array with added card
    currentIndex: advanceIndex(state)   // New value
  };
  // Original 'state' is UNCHANGED - a completely new GameState is returned
};
```

**Exam Tip:** When asked "How does functional programming handle state changes?", explain that instead of mutating existing state, we create and return NEW versions with the changes applied.

---

### 2. **Pure Functions - No Side Effects**

**What it means:** A pure function:
1. **Always returns the same output for the same input** (deterministic)
2. **Has no side effects** (doesn't modify external state, no I/O, no mutations)
3. **Depends only on its parameters** (no hidden dependencies)

**Why it matters:** Pure functions are predictable, testable, and can be safely called anywhere without worrying about breaking things.

**Impure Function (BAD ❌):**
```typescript
let totalCards = 0;  // External state

function drawCard() {
  totalCards--;  // ❌ Modifies external state (side effect)
  console.log("Drew a card");  // ❌ I/O is a side effect
  return Math.random();  // ❌ Non-deterministic (random output)
}
```

**Pure Function (GOOD ✅):**
```typescript
// File: src/online/Hand.ts, line ~10
export const addCard = (hand: readonly Card[], card: Card): readonly Card[] => {
  return [...hand, card];  // ✅ Only uses parameters, returns new array
};
// Same inputs ALWAYS produce same output
// No external state modified
// No side effects
```

**Complex Pure Function Example:**
```typescript
// File: src/online/Round.ts, line ~280
export const playCard = (
  state: GameState,      // ✅ Input
  playerId: string,      // ✅ Input
  handIndex: number,     // ✅ Input
  chosenColor?: Color    // ✅ Input
): GameState => {        // ✅ Output (NEW state)
  
  // Validation (pure - only checks inputs)
  if (getCurrentPlayer(state).id !== playerId) {
    throw new Error("Not your turn");  // ✅ Errors are OK in pure functions
  }
  
  // All operations create NEW data
  const { newHand, removedCard } = removeCardAt(player.hand, handIndex);
  
  const updatedPlayers = state.players.map(p =>  // ✅ map returns NEW array
    p.id === playerId ? { ...p, hand: newHand } : p
  );
  
  // Return completely NEW state
  return {
    ...state,
    players: updatedPlayers,
    discard: [...state.discard, cardToDiscard],
    // ... all new values
  };
  
  // ✅ Original state is NEVER modified
  // ✅ Same inputs always produce same output
  // ✅ No external dependencies
};
```

**All Pure Functions in the Project:**

1. **Deck Operations** (`src/online/Deck.ts`):
   - `createStandardDeck()` - Always creates same deck
   - `shuffle(array)` - Returns NEW shuffled array
   - `drawFromDeck(deck, count)` - Returns NEW deck and drawn cards

2. **Hand Operations** (`src/online/Hand.ts`):
   - `addCard(hand, card)` - Returns NEW hand with card added
   - `removeCardAt(hand, index)` - Returns NEW hand without card
   - `findPlayableIndex(hand, predicate)` - Returns index, no mutation

3. **Game Operations** (`src/online/Round.ts`):
   - `createInitialState(playerIds)` - Creates initial game state
   - `playCard(state, ...)` - Returns NEW state after playing
   - `drawCards(state, ...)` - Returns NEW state after drawing
   - `endTurn(state, ...)` - Returns NEW state after ending turn

**Exam Tip:** Pure functions are the foundation of functional programming. Be able to identify if a function is pure by checking: (1) Does it modify anything outside itself? (2) Does it depend on anything outside its parameters? (3) Does it always return the same output for same inputs?

---

### 3. **Higher-Order Functions - Functions as First-Class Citizens**

**What it means:** Functions that:
1. **Take other functions as parameters** (callbacks, predicates)
2. **Return functions as results**
3. Treat functions like any other value (can be assigned, passed around)

**Why it matters:** Enables code reuse, abstraction, and powerful composition patterns. Core to functional programming.

---

#### **3A. Map - Transform Every Element**

**Concept:** Apply a function to each element in an array, returning a NEW array with transformed values.

```typescript
// File: src/online/Round.ts, line ~156
export const createSnapshot = (state: GameState): RoundSnapshot => {
  return {
    // ✅ map transforms player objects into simplified form
    players: state.players.map(p => ({ 
      id: p.id, 
      handCount: p.hand.length  // Extract just what we need
    })),
    topCard: getTopCard(state),
    // ...
  };
};
```

**How it works:**
1. `map` takes a function `(p) => ({ id: p.id, handCount: p.hand.length })`
2. Applies it to EVERY player in the array
3. Returns a NEW array with transformed objects
4. Original array is unchanged

**Another Map Example:**
```typescript
// File: src/online/Round.ts, line ~355
const updatedPlayers = state.players.map(p =>
  p.id === playerId 
    ? { ...p, hand: newHand }  // Transform this player
    : p                        // Keep others unchanged
);
// ✅ Creates NEW array where one player is updated
```

---

#### **3B. Filter - Select Elements That Match**

**Concept:** Keep only elements that satisfy a condition (predicate function returns true).

```typescript
// File: src/online/Hand.ts, line ~55
export const getPlayableCards = (
  hand: readonly Card[],
  predicate: (card: Card) => boolean  // ✅ Function as parameter!
): readonly { card: Card; index: number }[] => {
  return hand
    .map((card, index) => ({ card, index }))
    .filter(({ card }) => predicate(card));  // ✅ Keep only cards where predicate returns true
};
```

**How it works:**
1. `filter` takes a predicate function
2. Calls it on each element
3. Keeps elements where function returns `true`
4. Returns NEW array with matching elements

**Filter with Type Narrowing:**
```typescript
// File: src/online/Round.ts, line ~490
const counts = currentPlayer.hand
  .filter((c): c is Exclude<Card, { kind: "wild" }> => c.kind !== "wild")
  // ✅ Filter returns NEW array with only non-wild cards
  .reduce((acc, c) => {
    acc[c.color] = (acc[c.color] || 0) + 1;
    return acc;
  }, {} as Record<Color, number>);
```

---

#### **3C. Reduce - Aggregate to Single Value**

**Concept:** Process array elements sequentially to build up a single result (sum, object, array, etc.).

**Signature:** `array.reduce((accumulator, currentElement) => newAccumulator, initialValue)`

```typescript
// File: src/online/Round.ts, line ~100
const { players, remainingDeck } = playerIds.reduce(
  (acc, id) => {
    // ✅ acc is the accumulator (running result)
    // ✅ id is the current element
    
    let playerDeck = acc.remainingDeck;
    const hand: Card[] = [];
    
    // Deal cards to this player
    for (let i = 0; i < dealCount; i++) {
      const { drawnCards, newDeck } = drawFromDeck(playerDeck, 1);
      if (drawnCards.length > 0) {
        hand.push(drawnCards[0]);
        playerDeck = newDeck;
      }
    }
    
    // Return NEW accumulator with this player added
    return {
      players: [...acc.players, { id, hand }],  // Add player
      remainingDeck: playerDeck                 // Update deck
    };
  },
  { players: [] as PlayerState[], remainingDeck: deck }  // ✅ Initial accumulator
);
```

**What happens:**
1. Start with `{ players: [], remainingDeck: deck }`
2. For each playerID: deal cards, add player to array, update deck
3. Return updated accumulator
4. Final result has all players dealt their cards

**Simpler Reduce Example:**
```typescript
// File: src/online/functional-utils.ts, line ~95
export const reduceCards = <R>(
  cards: readonly Card[],
  reducer: (acc: R, card: Card, index: number) => R,  // ✅ Reducer function
  initialValue: R
): R => cards.reduce(reducer, initialValue);

// Usage: Count cards by color
const colorCounts = reduceCards(
  myHand,
  (counts, card) => {
    if (card.kind !== "wild") {
      counts[card.color] = (counts[card.color] || 0) + 1;
    }
    return counts;
  },
  { red: 0, yellow: 0, green: 0, blue: 0 }
);
```

---

#### **3D. FlatMap - Transform and Flatten**

**Concept:** Like `map`, but if the transformation returns arrays, flatten them into a single array.

```typescript
// File: src/online/Deck.ts, line ~15
const numberCards = colors.flatMap(color => [
  { kind: "number" as const, color, value: 0 } as Card,
  // ✅ For each value 1-9, create TWO cards (flatMap flattens the nested arrays)
  ...Array.from({ length: 9 }, (_, i) => i + 1).flatMap(value => [
    { kind: "number" as const, color, value } as Card,
    { kind: "number" as const, color, value } as Card
  ])
]);
```

**What happens:**
- For each color: `["red", "yellow", "green", "blue"]`
- Create an array of cards for that color
- `flatMap` combines all arrays into ONE flat array
- Result: All number cards in a single array

**Regular Map vs FlatMap:**
```typescript
// map: [[cards for red], [cards for yellow], ...]  // Nested arrays
// flatMap: [red card, red card, yellow card, ...]  // Flat array
```

---

#### **3E. FindIndex - Search with Predicate**

**Concept:** Find the first element that matches a condition, return its index.

```typescript
// File: src/online/Hand.ts, line ~48
export const findPlayableIndex = (
  hand: readonly Card[],
  predicate: (card: Card) => boolean  // ✅ Function as parameter
): number => {
  return hand.findIndex(predicate);  // ✅ Returns index or -1
};

// Usage:
const playableIdx = findPlayableIndex(myHand, (card) => {
  return card.kind === "number" && card.value === 7;
});
```

---

#### **3F. Some/Every - Test Conditions**

**Concept:** 
- `some`: Returns `true` if ANY element matches
- `every`: Returns `true` if ALL elements match

```typescript
// File: src/online/functional-utils.ts, line ~130
export const createValidator = <T>(
  ...rules: Array<(value: T) => boolean>  // ✅ Array of functions
) => {
  return (value: T): boolean => {
    return rules.every(rule => rule(value));  // ✅ ALL rules must pass
  };
};

// Usage:
const isValidCard = createValidator(
  (c) => c.kind === "number",
  (c) => c.value > 0,
  (c) => c.value < 10
);
```

**Exam Tip:** Know the difference between `map` (transform), `filter` (select), `reduce` (aggregate), `flatMap` (transform and flatten), `some` (any match), `every` (all match). Be able to write examples of each.

---

### 4. **Closures - Functions That Remember**

**What it means:** A closure is a function that has access to variables from its outer (enclosing) scope, even after the outer function has finished executing.

**Why it matters:** Enables encapsulation, private state, and factory patterns without using classes.

**Key Concept:** Inner function "closes over" (captures) variables from outer scope.

---

#### **4A. Basic Closure - Capturing Variables**

```typescript
// File: src/online/functional-utils.ts, line ~37
export const createCounter = (initialValue: number = 0) => {
  let count = initialValue;  // ✅ 'count' is in outer scope
  
  // ✅ These functions are closures - they capture 'count'
  return {
    increment: () => ++count,     // ✅ Accesses 'count' from outer scope
    decrement: () => --count,     // ✅ 'count' is still accessible
    getValue: () => count,        // ✅ Even after createCounter returns
    reset: () => { count = initialValue; return count; }
  };
};

// Usage:
const counter1 = createCounter(10);
counter1.increment();  // 11
counter1.increment();  // 12
counter1.getValue();   // 12

const counter2 = createCounter(0);
counter2.increment();  // 1
// Each counter has its OWN private 'count' variable!
```

**What's happening:**
1. `createCounter` creates a `count` variable
2. Returns an object with functions
3. Those functions "remember" the `count` variable
4. `count` is **private** - can only be accessed through the returned functions
5. Each call to `createCounter` creates a NEW closure with its own `count`

---

#### **4B. Closure for Encapsulation - Private State**

```typescript
// File: src/online/functional-utils.ts, line ~100
export const createCardMatcher = (criteria: {
  kind?: Card["kind"];
  color?: Color;
  value?: number;
  action?: string;
}) => {
  // ✅ 'criteria' is captured by the closure
  return (card: Card): boolean => {
    // ✅ This function has access to 'criteria' even after createCardMatcher returns
    if (criteria.kind && card.kind !== criteria.kind) return false;
    if (criteria.color && "color" in card && card.color !== criteria.color) return false;
    if (criteria.value !== undefined && card.kind === "number" && card.value !== criteria.value) return false;
    if (criteria.action && "action" in card && card.action !== criteria.action) return false;
    return true;
  };
};

// Usage:
const isRedSeven = createCardMatcher({ kind: "number", color: "red", value: 7 });
// ✅ isRedSeven "remembers" the criteria { kind: "number", color: "red", value: 7 }

const myCards = [
  { kind: "number", color: "red", value: 7 },
  { kind: "number", color: "blue", value: 5 },
  { kind: "wild", action: "wild" }
];

myCards.filter(isRedSeven);  // Only returns the red 7
// ✅ The returned function still has access to the criteria!
```

---

#### **4C. Closure with Memoization - Caching Results**

```typescript
// File: src/online/functional-utils.ts, line ~52
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();  // ✅ Captured by closure
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    // ✅ This function accesses 'cache' from outer scope
    if (cache.has(key)) {
      return cache.get(key)!;  // Return cached result
    }
    
    const result = fn(...args);
    cache.set(key, result);  // Store in cache
    return result;
  }) as T;
};

// Usage:
const expensiveCalculation = (n: number): number => {
  console.log("Computing...");
  return n * n;
};

const memoized = memoize(expensiveCalculation);

memoized(5);  // Logs "Computing...", returns 25
memoized(5);  // Returns 25 immediately (from cache), no log!
memoized(10); // Logs "Computing...", returns 100
memoized(5);  // Returns 25 from cache
```

**What's happening:**
1. `memoize` creates a `cache` Map
2. Returns a NEW function that wraps the original
3. The wrapper function "remembers" the `cache`
4. Each call checks cache first, avoiding redundant computation
5. `cache` is **private** - only accessible to the wrapper function

---

#### **4D. Closure with Timing - Debounce/Throttle**

```typescript
// File: src/online/functional-utils.ts, line ~157
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;  // ✅ Captured
  
  return (...args: Parameters<T>) => {
    // ✅ This function accesses 'timeoutId' from outer scope
    if (timeoutId) {
      clearTimeout(timeoutId);  // Cancel previous timeout
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

// Usage in search box:
const handleSearch = debounce((query: string) => {
  console.log("Searching for:", query);
}, 300);

handleSearch("a");    // Wait 300ms
handleSearch("ab");   // Previous timeout cancelled, wait 300ms
handleSearch("abc");  // Previous timeout cancelled, wait 300ms
// Only logs "Searching for: abc" after 300ms of inactivity
```

---

#### **4E. Closure Factory Pattern**

```typescript
// File: src/online/functional-utils.ts, line ~118
export const createCardCounter = <K extends keyof Card>(property: K) => {
  // ✅ 'property' is captured by the closure
  return (cards: readonly Card[]): Map<Card[K], number> => {
    return cards.reduce((acc, card) => {
      const key = card[property];  // ✅ Uses captured 'property'
      acc.set(key, (acc.get(key) || 0) + 1);
      return acc;
    }, new Map<Card[K], number>());
  };
};

// Usage:
const countByKind = createCardCounter("kind");
const countByColor = createCardCounter("color");

const hand = [
  { kind: "number", color: "red", value: 5 },
  { kind: "number", color: "blue", value: 7 },
  { kind: "wild", action: "wild" }
];

countByKind(hand);   // Map { "number" => 2, "wild" => 1 }
countByColor(hand);  // Map { "red" => 1, "blue" => 1 }
```

**Exam Tip:** Closures are functions that "remember" variables from their creation context. Be able to:
1. Identify when a function is a closure (does it access outer scope variables?)
2. Explain why closures are useful (encapsulation, private state, factories)
3. Write a simple closure example (counter, memoization)

---

### 5. **Function Composition - Building Complex from Simple**

**What it means:** Combining multiple simple functions to create more complex behavior. Instead of writing one big function, write small focused functions and combine them.

**Why it matters:** Promotes code reuse, readability, and testability. Each small function is easy to understand and test.

---

#### **5A. Compose - Right to Left**

**Concept:** Apply functions from **right to left**: `compose(f, g, h)(x)` = `f(g(h(x)))`

```typescript
// File: src/online/functional-utils.ts, line ~10
export const compose = <T>(...fns: Array<(arg: T) => T>) => 
  (value: T): T => fns.reduceRight((acc, fn) => fn(acc), value);
  //                  ✅ reduceRight applies functions right-to-left

// Example:
const double = (n: number) => n * 2;
const addTen = (n: number) => n + 10;
const square = (n: number) => n * n;

const complexCalc = compose(double, addTen, square);
complexCalc(3);
// Step by step:
// 1. square(3) = 9      (rightmost function first)
// 2. addTen(9) = 19     (middle function)
// 3. double(19) = 38    (leftmost function last)
// Result: 38
```

**Card Processing Example:**
```typescript
const removeWilds = (cards: Card[]) => cards.filter(c => c.kind !== "wild");
const sortByValue = (cards: Card[]) => cards.sort((a, b) => 
  a.kind === "number" && b.kind === "number" ? a.value - b.value : 0
);
const takeFive = (cards: Card[]) => cards.slice(0, 5);

const processHand = compose(takeFive, sortByValue, removeWilds);
// Applies: removeWilds → sortByValue → takeFive
```

---

#### **5B. Pipe - Left to Right**

**Concept:** Apply functions from **left to right**: `pipe(f, g, h)(x)` = `h(g(f(x)))`

```typescript
// File: src/online/functional-utils.ts, line ~18
export const pipe = <T>(...fns: Array<(arg: T) => T>) => 
  (value: T): T => fns.reduce((acc, fn) => fn(acc), value);
  //                  ✅ reduce applies functions left-to-right

// Example:
const processCard = pipe(
  removeWilds,     // 1. First
  sortByValue,     // 2. Second
  takeFive         // 3. Third
);
// More intuitive - reads like a pipeline
```

**When to use:**
- `compose`: Mathematical style, right-to-left (like function notation)
- `pipe`: More intuitive, left-to-right (like Unix pipes: `cat file | sort | head`)

---

#### **5C. Practical Composition in Game Logic**

```typescript
// File: src/online/Round.ts
// Complex operation built from simple functions

// Simple pure functions:
const getCurrentPlayer = (state: GameState) => state.players[state.currentIndex];
const getTopCard = (state: GameState) => state.discard[state.discard.length - 1];
const getPlayerHand = (state: GameState, id: string) => 
  state.players.find(p => p.id === id)?.hand ?? [];

// Compose them for complex checks:
const canPlayerPlay = (state: GameState, playerId: string, card: Card): boolean => {
  const currentPlayer = getCurrentPlayer(state);  // ✅ Reusable function
  const topCard = getTopCard(state);              // ✅ Reusable function
  
  if (currentPlayer.id !== playerId) return false;
  
  return matches(topCard, card);  // ✅ Another pure function
};
```

---

#### **5D. Currying - Transform Multi-Arg Functions**

**What it means:** Transform a function with multiple parameters into a sequence of functions, each taking one parameter.

```typescript
// File: src/online/functional-utils.ts, line ~26
export const curry = <A, B, R>(fn: (a: A, b: B) => R) => 
  (a: A) => (b: B): R => fn(a, b);

// Normal function:
const add = (a: number, b: number) => a + b;
add(2, 3);  // 5

// Curried version:
const curriedAdd = curry(add);
curriedAdd(2)(3);  // 5

// Power of currying - partial application:
const addTwo = curriedAdd(2);  // ✅ Function that adds 2 to its argument
addTwo(3);  // 5
addTwo(10); // 12
addTwo(99); // 101
```

**Practical Example:**
```typescript
const matchesCard = curry((topCard: Card, candidateCard: Card) => 
  matches(topCard, candidateCard)
);

// Partially apply with current top card:
const canPlayOnTop = matchesCard(currentTopCard);

// Use it to filter:
const playableCards = hand.filter(canPlayOnTop);
```

---

#### **5E. Partial Application - Pre-fill Arguments**

```typescript
// File: src/online/functional-utils.ts, line ~33
export const partial = <A extends any[], R>(
  fn: (...args: A) => R,
  ...partialArgs: Partial<A>
) => (...restArgs: any[]): R => fn(...[...partialArgs, ...restArgs] as A);

// Example:
const greet = (greeting: string, name: string, punctuation: string) =>
  `${greeting} ${name}${punctuation}`;

const sayHello = partial(greet, "Hello");
sayHello("Alice", "!");  // "Hello Alice!"
sayHello("Bob", ".");    // "Hello Bob."

const exclaim = partial(greet, "Hello", undefined, "!");
// Can skip middle arguments
```

---

#### **5F. Method Chaining - Functional Pipeline**

**Concept:** Chain array methods to create data transformation pipelines.

```typescript
// File: src/online/Hand.ts, line ~55
export const getPlayableCards = (
  hand: readonly Card[],
  predicate: (card: Card) => boolean
): readonly { card: Card; index: number }[] => {
  return hand
    .map((card, index) => ({ card, index }))      // ✅ Step 1: Transform
    .filter(({ card }) => predicate(card));       // ✅ Step 2: Filter
};

// Each step:
// 1. map: Transform cards into {card, index} objects
// 2. filter: Keep only cards matching predicate
// Result: Array of playable cards with their indices
```

**Complex Pipeline:**
```typescript
// File: src/online/Round.ts, line ~490
const counts = currentPlayer.hand
  .filter((c): c is Exclude<Card, { kind: "wild" }> => c.kind !== "wild")  // Step 1
  .reduce((acc, c) => {                                                     // Step 2
    acc[c.color] = (acc[c.color] || 0) + 1;
    return acc;
  }, {} as Record<Color, number>);

// Reads like: "Take hand → filter out wilds → count by color"
```

**Exam Tip:** Function composition is about building complex behavior from simple, reusable pieces. Know the difference between `compose` (right-to-left) and `pipe` (left-to-right). Be able to chain array methods (`map`, `filter`, `reduce`) to create pipelines.

---

### 6. **Modern JavaScript - `const` and `let` Only, No `var`**

**What it means:** Use block-scoped declarations (`const`/`let`) instead of function-scoped `var`.

**Why it matters:**
- **`const`**: Prevents reassignment, encourages immutability
- **`let`**: Block-scoped, predictable
- **`var`**: Function-scoped, hoisted, causes bugs (NEVER USE)

---

#### **6A. Using `const` - Prefer Immutable Bindings**

**Rule:** Use `const` by default for everything. Only use `let` when you absolutely need reassignment.

```typescript
// ✅ GOOD - Use const
const deck = createStandardDeck();
const players = ["Alice", "Bob", "Charlie"];
const initialState = createInitialState(players);

// ❌ BAD - Unnecessary let
let deck = createStandardDeck();  // Never reassigned, should be const!
```

**Important:** `const` means the **binding** is constant, not the value!

```typescript
const numbers = [1, 2, 3];
numbers.push(4);  // ✅ This works! Array is mutated (bad in FP, but const allows it)
numbers = [5, 6]; // ❌ ERROR - Can't reassign the binding

// In functional programming, we avoid mutation:
const numbers = [1, 2, 3];
const newNumbers = [...numbers, 4];  // ✅ Create new array instead
```

---

#### **6B. Using `let` - Only When Reassignment Needed**

```typescript
// ✅ Appropriate use of let - value changes in loop
for (let i = 0; i < 10; i++) {
  console.log(i);
}

// ✅ Appropriate use of let - accumulating value
let count = 0;
while (deck.length > 0) {
  count++;
  deck = drawFromDeck(deck, 1).newDeck;
}
```

---

#### **6C. Never Use `var` - Why It's Problematic**

```typescript
// ❌ BAD - var is function-scoped and hoisted
function problemWithVar() {
  console.log(x);  // undefined (hoisted!)
  var x = 5;
  
  if (true) {
    var x = 10;  // ❌ Same variable! Not block-scoped
  }
  console.log(x);  // 10 (unexpected!)
}

// ✅ GOOD - let is block-scoped
function goodWithLet() {
  let x = 5;
  
  if (true) {
    let x = 10;  // ✅ Different variable (block scope)
    console.log(x);  // 10
  }
  console.log(x);  // 5
}
```

---

#### **6D. Project Examples**

**Every file uses `const`/`let` only:**

```typescript
// File: src/online/Deck.ts
export const createStandardDeck = (): readonly Card[] => {
  const colors = ["red", "yellow", "green", "blue"] as const;  // ✅ const
  
  const numberCards = colors.flatMap(/* ... */);  // ✅ const
  const actionCards = colors.flatMap(/* ... */);  // ✅ const
  const wildCards = Array.from(/* ... */);        // ✅ const
  
  return shuffle([...numberCards, ...actionCards, ...wildCards]);
};
```

```typescript
// File: src/online/Round.ts
export const drawCards = (state: GameState, playerId: string, count?: number) => {
  const amount = count ?? (state.pendingDraw > 0 ? state.pendingDraw : 1);  // ✅ const
  const player = getCurrentPlayer(state);  // ✅ const
  
  const { newDeck, newDiscard, drawnCards } = drawWithReshuffle(/* ... */);  // ✅ const
  
  const updatedPlayers = state.players.map(/* ... */);  // ✅ const
  
  let newState: GameState;  // ✅ let only when needed (reassigned below)
  
  if (state.pendingDraw > 0) {
    newState = { /* ... */ };
  } else {
    newState = { /* ... */ };
  }
  
  return newState;
};
```

**Exam Tip:** Always prefer `const`. Only use `let` when the variable will be reassigned. Never use `var` in modern JavaScript.

---

## 📚 Complete Category Breakdown for Exam

### **Category: Immutability**
| Concept | File | Line | Example |
|---------|------|------|---------|
| `readonly` types | `Round.ts` | 8-25 | `readonly deck: readonly Card[]` |
| Spread operator for objects | `Round.ts` | 355 | `{ ...state, players: newPlayers }` |
| Spread operator for arrays | `Round.ts` | 372 | `[...state.discard, card]` |
| No mutations | `Deck.ts` | 60 | Returns new array, doesn't modify original |

### **Category: Pure Functions**
| Concept | File | Example |
|---------|------|---------|
| No side effects | `Deck.ts` | All functions return new data |
| Deterministic | `Hand.ts` | Same inputs → same outputs |
| Only uses parameters | `Round.ts` | All functions depend only on arguments |

### **Category: Higher-Order Functions**
| Method | File | Line | Purpose |
|--------|------|------|---------|
| `map` | `Round.ts` | 156, 355 | Transform arrays |
| `filter` | `Hand.ts` | 62 | Select matching elements |
| `reduce` | `Round.ts` | 100, 495 | Aggregate to single value |
| `flatMap` | `Deck.ts` | 15-28 | Transform and flatten |
| `findIndex` | `Hand.ts` | 51 | Find by predicate |
| `some`/`every` | `functional-utils.ts` | 133 | Test conditions |

### **Category: Closures**
| Pattern | File | Example |
|---------|------|---------|
| Private state | `functional-utils.ts` | `createCounter` |
| Memoization | `functional-utils.ts` | `memoize` |
| Factory pattern | `functional-utils.ts` | `createCardMatcher` |
| Debounce/Throttle | `functional-utils.ts` | `debounce`, `throttle` |

### **Category: Function Composition**
| Concept | File | Example |
|---------|------|---------|
| Compose | `functional-utils.ts` | Right-to-left composition |
| Pipe | `functional-utils.ts` | Left-to-right composition |
| Curry | `functional-utils.ts` | Multi-arg → sequence of functions |
| Method chaining | `Hand.ts` | `map().filter()` |

---

## 🎯 Exam Strategy

### **Question Types to Expect:**

1. **"Is this a pure function?"**
   - Check: Does it mutate anything? Depend on external state? Have side effects?
   
2. **"Convert this OOP code to functional"**
   - Remove classes, use pure functions, make data immutable
   
3. **"What does this higher-order function do?"**
   - Identify: `map` (transform), `filter` (select), `reduce` (aggregate)
   
4. **"Write a closure that..."**
   - Create outer function with variable, return inner function that uses it
   
5. **"Demonstrate immutability"**
   - Show spread operator, `readonly` types, return new objects

### **Quick Reference Card:**

```typescript
// IMMUTABILITY
const new = { ...old, changed: value };     // Object
const new = [...old, item];                 // Array add
const new = old.slice(0, i).concat(old.slice(i+1)); // Array remove

// PURE FUNCTION
(input) => { return output; }  // No mutations, no side effects

// HIGHER-ORDER
array.map(fn)      // Transform each
array.filter(fn)   // Keep matching
array.reduce(fn,i) // Aggregate

// CLOSURE
const outer = (x) => {
  let private = x;
  return (y) => private + y;  // Captures 'private'
};

// COMPOSITION
pipe(f, g, h)      // f → g → h
compose(f, g, h)   // h → g → f
```

---

## ✅ Compliance Checklist

- ✅ No classes (only functions and interfaces)
- ✅ All data is `readonly` (immutable)
- ✅ All functions are pure (no side effects)
- ✅ Uses `map`, `filter`, `reduce`, `flatMap`
- ✅ Uses closures for encapsulation
- ✅ Uses function composition
- ✅ Only `const` and `let`, no `var`
- ✅ No mutations anywhere in core logic
- ✅ All state updates return new objects

**Your UNO game is fully compliant with functional programming principles! 🎉**
