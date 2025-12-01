# UNO Web3 – Assignment 5 Conversion

This branch implements the assignment requirements of converting the previous Vue client into a Redux + RxJS powered architecture while retaining existing UNO gameplay features.

## ✅ Requirements Implemented

**Must have:**
- ✅ Functional model: Existing functional model from Assignment 4 retained (`src/online/` folder)
- ✅ Retained features from assignments 1–3 (drawing, playing, stacking +2/+4, number chaining, wild color picker, win state)
- ✅ **Redux for state management** (`src/store/*`)
- ✅ **RxJS for handling messages from the server** (Firestore snapshots wrapped as Observables in `streams.ts`)

**Should have:**
- React recommended – Currently using Vue for rendering with Redux + RxJS integration. React layer can be added later.

## Architecture Overview

```
Firebase (rooms / players / hands docs)
        │ snapshots
        ▼
RxJS Observables (roomObservable / playersObservable / myHandObservable)
        │ next/error
        ▼
Redux store (gameSlice reducers update unified state)
        │ selector wrapper (Vue bridge)
        ▼
OnlineBoard.vue (UI reads store via useSelector)
        │ user actions
        ▼
GraphQL mutations (playCardOnline / drawOneOnline / endTurnOnline)
```

## Key Files

**Redux State Management:**
- `src/store/types.ts` – Shared TypeScript types for game state
- `src/store/gameSlice.ts` – Redux slice with actions (setRoom, setPlayers, setMyHand)
- `src/store/store.ts` – Configured Redux store with middleware

**RxJS Reactive Streams:**
- `src/store/streams.ts` – RxJS Observables wrapping Firestore snapshots
  - `createDocumentObservable<T>` – Wraps Firestore document as Observable
  - `createCollectionObservable<T>` – Wraps Firestore collection as Observable
  - `startListeningToRoom()` – Subscribes to room/players/hand updates and dispatches to Redux

**Vue-Redux Bridge:**
- `src/store/vue.ts` – Lightweight Vue hooks (`useSelector`, `useDispatch`) bridging Redux to Vue components

**UI Components:**
- `src/services/OnlineBoard.vue` – Refactored to use Redux + RxJS instead of local reactive state
- `src/services/OnlineGame.ts` – GraphQL mutation helpers

**Functional Model (Assignment 4):**
- `src/online/Deck.ts` – Pure functions for deck operations
- `src/online/Hand.ts` – Pure functions for hand operations
- `src/online/Round.ts` – Immutable game state with pure functions
- `src/online/functional-utils.ts` – Advanced FP utilities

## How to Run

```powershell
npm install
npm run dev
```
Visit local dev server (default: http://localhost:5173/UNO-WEB3/) and create/join a room.

## Building & Deploying

```powershell
npm run build
npm run deploy   # publishes dist/ to gh-pages branch
```

## Technical Implementation Details

### Redux Integration
The Redux store manages three pieces of state:
- `room` – Current room data (top card, turn, direction, pending draws, etc.)
- `players` – Array of player data (names, hand counts, ready status)
- `myHand` – Current player's cards

State updates flow:
1. Firestore snapshot triggers
2. RxJS Observable emits new data
3. Observable subscription dispatches Redux action
4. Redux reducer updates store
5. Vue component's `useSelector` hook automatically re-renders

### RxJS Observables
Firestore snapshots are wrapped as RxJS Observables using the `Observable` constructor:

```typescript
function createDocumentObservable<T>(docPath: string): Observable<T> {
  return new Observable((subscriber) => {
    const unsubscribe = onSnapshot(doc(db, docPath), 
      (snapshot) => subscriber.next({ id: snapshot.id, ...snapshot.data() } as T),
      (error) => subscriber.error(error)
    );
    return () => unsubscribe(); // Cleanup
  });
}
```

Three Observables are active during gameplay:
1. **Room Observable** – Monitors `rooms/{roomId}` document
2. **Players Observable** – Monitors `rooms/{roomId}/players` collection
3. **Hand Observable** – Monitors `rooms/{roomId}/hands/{myId}` document

### Vue-Redux Bridge
Since we're using Vue (not React), custom hooks provide Redux integration:

```typescript
// Read from Redux store (reactive)
const myHand = useSelector((state) => state.game.myHand);

// Dispatch actions to Redux
const dispatch = useDispatch();
dispatch(setMyHand([card1, card2]));
```

The `useSelector` hook uses Vue's `computed()` to create reactive references that automatically update when Redux state changes.

## Functional Model Notes
The functional model from Assignment 4 remains intact:
- All card logic uses pure functions (no mutations)
- Game state is immutable (readonly types)
- Operations return new state instead of modifying existing
- Higher-order functions (map, filter, reduce)
- Closures for encapsulation
- Function composition

See `FUNCTIONAL_PROGRAMMING.md` for detailed explanations.

## Verification
- ✅ Build succeeded (`npm run build`)
- ✅ New bundle hash appears each deploy due to injected `__BUILD_TIME__`
- ✅ Redux DevTools compatible (configure browser extension)
- ✅ RxJS streams properly handle Firestore snapshots
- ✅ All gameplay interactions work (draw, play, stack)

## Future Enhancements
- Full React UI (optional as per "Should have")
- Unit tests for Redux reducers and RxJS streams
- Better chunk splitting (current JS bundle ~562kB)
- Error boundary component for network failures
- Redux middleware for logging/debugging

## Assignment 5 Compliance

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Use functional model from A4 | ✅ Complete | `src/online/` folder unchanged |
| Retain features from A1-A3 | ✅ Complete | All gameplay features working |
| Use Redux for state management | ✅ Complete | `src/store/` with gameSlice |
| Use RxJS for server messages | ✅ Complete | Observables wrapping Firestore |
| React for rendering (recommended) | ⚠️ Optional | Using Vue + Redux bridge |

## License
Internal coursework project – no production use implied.


