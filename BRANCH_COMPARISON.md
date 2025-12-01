# UNO-WEB3 Branch Comparison

This document compares the three assignment branches to help you understand what's implemented in each.

---

## 📊 Branch Overview

| Branch | Assignment | Tech Stack | State Management | Backend |
|--------|-----------|------------|------------------|---------|
| Assignment-3 | Online Multiplayer | Vue.js 3 + Vite | Local `ref()` | Firebase + GraphQL |
| Assignment-4 | Functional Programming | Vue.js 3 + Vite | Local `ref()` | Firebase + GraphQL |
| Assignment-5 | Redux + RxJS | Vue.js 3 + Vite | **Redux** + **RxJS** | Firebase + GraphQL |
| Assignment-6 | Next.js SSR | **Next.js + React** | Redux + RxJS | Firebase + GraphQL |

---

## 🔀 Assignment-3: Online Multiplayer (Current Branch)

### **Focus:** Real-time multiplayer game with Firebase and GraphQL

### **Key Features:**
- ✅ Vue.js 3 with Composition API
- ✅ Firebase Anonymous Authentication
- ✅ Firestore for real-time data
- ✅ GraphQL server (Vercel) for mutations
- ✅ Lobby system (create/join rooms)
- ✅ 1-4 player multiplayer
- ✅ All UNO rules (skip, reverse, +2, +4, wild, chaining)
- ✅ Real-time updates via Firestore snapshots

### **Architecture:**
```
Vue Components
    ↓
Local State (ref, reactive)
    ↓
GraphQL Mutations → Firestore
    ↑
Firestore Snapshots (Real-time)
```

### **Files Unique to This Branch:**
- None - this is the base implementation

### **Study Guide:**
- `ASSIGNMENT_3_EXAM_GUIDE.md` - Comprehensive exam help

---

## 🔀 Assignment-4: Functional Programming

### **Focus:** Convert game logic to pure functional programming

### **Changes from Assignment-3:**
- ✅ Created `src/online/` folder with functional game logic
  - `Deck.ts` - Pure functions for deck operations
  - `Hand.ts` - Pure functions for hand management
  - `Round.ts` - Pure functions for game state transitions
- ✅ All functions are pure (no side effects)
- ✅ All data is immutable (`readonly`)
- ✅ No classes, only functions and types
- ✅ Higher-order functions (map, filter, reduce, flatMap)
- ✅ Closures for encapsulation
- ✅ Function composition
- ✅ Only `const` and `let` (no `var`)

### **Architecture:**
```
Vue Components
    ↓
Local State (ref, reactive)
    ↓
Pure Functions (src/online/)
    ↓
GraphQL Mutations → Firestore
```

### **Example Functional Code:**
```typescript
// Pure function - no mutations
export const drawFromDeck = (
  deck: readonly Card[],
  count: number
): { readonly newDeck: readonly Card[]; readonly drawnCards: readonly Card[] } => {
  return {
    drawnCards: deck.slice(0, count),
    newDeck: deck.slice(count)
  };
};
```

### **Study Guide:**
- `EXAM_STUDY_GUIDE.md` - Covers Assignment 4 functional programming

---

## 🔀 Assignment-5: Redux + RxJS

### **Focus:** Add Redux state management and RxJS for reactive streams

### **Changes from Assignment-4:**
- ✅ Added Redux Toolkit for centralized state management
  - `src/store/store.ts` - Redux store configuration
  - `src/store/gameSlice.ts` - Game state slice
  - `src/store/types.ts` - TypeScript types
  - `src/store/vue.ts` - Vue-Redux bridge
- ✅ Added RxJS for reactive Firestore streams
  - `src/store/streams.ts` - Observable wrappers for Firestore
- ✅ All game state in Redux (room, players, myHand)
- ✅ Firestore updates flow through RxJS → Redux → Vue

### **Architecture:**
```
Vue Components
    ↓
Redux (useSelector, useDispatch)
    ↑
RxJS Observables
    ↑
Firestore Snapshots
```

### **Data Flow:**
```
Firestore snapshot
    ↓
RxJS Observable emits
    ↓
Subscription dispatches Redux action
    ↓
Redux reducer updates state
    ↓
Vue useSelector detects change
    ↓
Component re-renders
```

### **Key Code:**
```typescript
// RxJS Observable wrapping Firestore
export function createDocumentObservable<T>(docPath: string): Observable<T | null> {
  return new Observable((subscriber) => {
    const docRef = doc(db, docPath);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      subscriber.next({ id: snapshot.id, ...snapshot.data() } as T);
    });
    return () => unsubscribe();
  });
}

// Subscribe and dispatch to Redux
roomObservable.subscribe({
  next: (room) => store.dispatch(setRoom(room))
});
```

### **Study Guide:**
- `EXAM_STUDY_GUIDE.md` - Covers Assignment 5 Redux + RxJS

---

## 🔀 Assignment-6: Next.js SSR

### **Focus:** Convert from Vue to Next.js with React

### **Changes from Assignment-5:**
- ✅ Replaced Vue with React
- ✅ Replaced Vite with Next.js
- ✅ Added Server/Client Component distinction
- ✅ App Router structure
- ✅ React hooks instead of Vue Composition API
- ✅ React-Redux instead of custom Vue bridge
- ✅ Port changed to 5173 (for GraphQL CORS)

### **Architecture:**
```
Next.js App Router
    ↓
Server Components (layout, pages)
Client Components (game UI)
    ↓
Redux (useAppSelector, useAppDispatch)
    ↑
RxJS Observables
    ↑
Firestore Snapshots
```

### **File Structure:**
```
app/
  layout.tsx       # Server Component
  page.tsx         # Server Component (home)
  globals.css
  components/
    ReduxProvider.tsx    # Client Component
    Lobby.tsx            # Client Component
    CardView.tsx         # Client Component
    OnlineBoard.tsx      # Client Component
  lobby/
    page.tsx       # Route

src/
  store/
    hooks.ts       # React-Redux hooks (replaces vue.ts)
  [all other files unchanged]
```

### **Conversion Examples:**

| Vue | React |
|-----|-------|
| `ref(value)` | `useState(value)` |
| `computed(() => ...)` | `useMemo(() => ..., [deps])` |
| `watch(source, cb)` | `useEffect(() => { cb() }, [deps])` |
| `onMounted(() => ...)` | `useEffect(() => { ... }, [])` |
| `v-if="condition"` | `{condition && <div>...</div>}` |
| `v-for="item in items"` | `{items.map(item => <div key={item.id}>...</div>)}` |

### **Study Guide:**
- `EXAM_STUDY_GUIDE.md` - Covers Assignment 6 Next.js

---

## 🎯 Quick Decision Guide

**"Which branch should I study?"**

- **For Firebase + GraphQL exam** → Assignment-3
- **For functional programming exam** → Assignment-4
- **For Redux + RxJS exam** → Assignment-5
- **For Next.js/React exam** → Assignment-6

**"Which technologies are in which branch?"**

| Technology | A3 | A4 | A5 | A6 |
|------------|----|----|----|----|
| Vue.js | ✅ | ✅ | ✅ | ❌ |
| React | ❌ | ❌ | ❌ | ✅ |
| Vite | ✅ | ✅ | ✅ | ❌ |
| Next.js | ❌ | ❌ | ❌ | ✅ |
| Firebase | ✅ | ✅ | ✅ | ✅ |
| GraphQL | ✅ | ✅ | ✅ | ✅ |
| Firestore Snapshots | ✅ | ✅ | ✅ | ✅ |
| Functional Programming | ❌ | ✅ | ✅ | ✅ |
| Redux | ❌ | ❌ | ✅ | ✅ |
| RxJS | ❌ | ❌ | ✅ | ✅ |

---

## 📝 Assignment Requirements Summary

### **Assignment 3: Online Multiplayer**
- ✅ Play UNO against 1-3 human opponents
- ✅ Official UNO rules
- ✅ User identification (display name)
- ✅ Create/join games
- ✅ Server notifications (Firestore snapshots)
- ✅ GraphQL communication

### **Assignment 4: Functional Programming**
- ✅ Pure functions only
- ✅ Immutable data structures
- ✅ No classes
- ✅ Higher-order functions
- ✅ Closures
- ✅ Function composition

### **Assignment 5: Redux + RxJS**
- ✅ Convert to Redux state management
- ✅ Use RxJS for server messages
- ✅ Retain functional model from A4
- ✅ Retain features from A1-A3

### **Assignment 6: Next.js**
- ✅ Convert to Next.js with React
- ✅ Server/Client Component distinction
- ✅ Works with `npm run dev` and `npm run build`
- ✅ Retain Redux + RxJS from A5

---

## 🔧 Running Each Branch

### **Assignment-3, 4, 5:**
```bash
git checkout Assignment-3  # or Assignment-4, Assignment-5
npm install
npm run dev
# Open http://localhost:5173
```

### **Assignment-6:**
```bash
git checkout Assignment-6
npm install
npm run dev
# Open http://localhost:5173 (configured for GraphQL CORS)
```

---

## 📚 Study Guides

| Assignment | Study Guide File | Topics Covered |
|------------|-----------------|----------------|
| Assignment 3 | `ASSIGNMENT_3_EXAM_GUIDE.md` | Firebase, GraphQL, Firestore, Vue Composition API |
| Assignment 4 | `EXAM_STUDY_GUIDE.md` (Part 1) | Functional programming, pure functions, immutability |
| Assignment 5 | `EXAM_STUDY_GUIDE.md` (Part 2) | Redux, RxJS, Observables, state management |
| Assignment 6 | `EXAM_STUDY_GUIDE.md` (Part 3) | Next.js, React, SSR, Server/Client Components |

---

## ✅ Compliance Checklist

### **Assignment 3 ✅**
- ✅ Vue.js frontend
- ✅ Firebase authentication
- ✅ Firestore database
- ✅ GraphQL server
- ✅ Real-time multiplayer
- ✅ Official UNO rules

### **Assignment 4 ✅**
- ✅ All functions pure
- ✅ All data immutable
- ✅ No classes (only functions + types)
- ✅ Higher-order functions
- ✅ Closures
- ✅ Function composition
- ✅ Only `const` and `let`

### **Assignment 5 ✅**
- ✅ Redux store
- ✅ RxJS Observables
- ✅ Functional model retained
- ✅ All features retained

### **Assignment 6 ✅**
- ✅ Next.js App Router
- ✅ React components
- ✅ Server/Client distinction
- ✅ Redux + RxJS retained
- ✅ Build and production mode work
- ✅ GraphQL CORS configured

---

## 🎓 Exam Preparation Strategy

### **Week 1: Fundamentals**
- Day 1-2: Firebase + Firestore (Assignment 3 guide)
- Day 3-4: Functional Programming (Assignment 4 guide)
- Day 5-7: Practice writing pure functions

### **Week 2: Advanced Topics**
- Day 1-3: Redux + RxJS (Assignment 5 guide)
- Day 4-5: Next.js + React (Assignment 6 guide)
- Day 6-7: Review and practice

### **Key Topics to Master:**
1. **Firebase:**
   - Authentication flow
   - Firestore CRUD operations
   - Real-time snapshots
   - Transactions

2. **GraphQL:**
   - Schema definition
   - Mutations vs Queries
   - Variables
   - Error handling

3. **Functional Programming:**
   - Pure functions
   - Immutability
   - Higher-order functions (map, filter, reduce)
   - Closures

4. **Redux:**
   - Store, actions, reducers
   - Slices
   - Selectors
   - Middleware

5. **RxJS:**
   - Observables
   - Subscriptions
   - Operators
   - Integration with Redux

6. **Next.js:**
   - Server vs Client Components
   - App Router
   - `'use client'` directive
   - Build process

---

## 🎉 Summary

Your UNO-WEB3 repository demonstrates mastery of:
- 📱 Real-time multiplayer architecture
- 🔧 Modern web technologies (Vue, React, Next.js)
- 🎮 Complex game logic implementation
- 📊 State management patterns (Redux)
- 🌊 Reactive programming (RxJS)
- ⚡ Functional programming principles
- 🔐 Authentication and security
- 🚀 Production deployment

**You're well-prepared for all assignments! Good luck! 🍀**
