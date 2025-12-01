# UNO Web3 – Next.js + Redux + RxJS (Assignment 6)

This repository demonstrates a production-ready online multiplayer UNO game implementing three major assignments:
- **Assignment 4:** Functional Programming (immutable state, pure functions)
- **Assignment 5:** Redux + RxJS (reactive state management)
- **Assignment 6:** Next.js SSR (server-side rendering with React)

## 🎯 Assignment 6 Implementation

**Framework Migration:** Vue → Next.js + React while retaining all previous features.

### ✅ Requirements Implemented

- ✅ **Next.js App Router** with Server-Side Rendering
- ✅ **Server vs Client Components** properly distinguished
- ✅ **Works with `npm run dev`** (development mode)
- ✅ **Works with `npm run build` and `npm run start`** (production mode)
- ✅ **Redux + RxJS retained** from Assignment 5
- ✅ **Functional model retained** from Assignment 4
- ✅ **Firebase + GraphQL retained** from earlier assignments

### 🏗️ Architecture

```
Next.js App Router (Server Components)
        ├── app/layout.tsx (Root layout - Server Component)
        ├── app/page.tsx (Home page - Server Component)
        └── app/lobby/page.tsx (Lobby route - Client Component)

Redux Provider (Client Component)
        ├── app/components/ReduxProvider.tsx
        └── Wraps entire app in Redux context

React Components (Client Components)
        ├── app/components/Lobby.tsx
        ├── app/components/OnlineBoard.tsx
        └── app/components/CardView.tsx

Redux Store (from Assignment 5)
        ├── src/store/store.ts
        ├── src/store/gameSlice.ts
        ├── src/store/streams.ts (RxJS)
        └── src/store/hooks.ts (React hooks)

Functional Model (from Assignment 4)
        ├── src/online/Deck.ts
        ├── src/online/Hand.ts
        ├── src/online/Round.ts
        └── src/online/functional-utils.ts

Backend (unchanged)
        ├── src/firebase.ts (Firebase client)
        ├── src/services/OnlineGame.ts (GraphQL)
        └── src/services/Rooms.ts (Firestore)
```

## 🚀 Quick Start

### Development Mode
```bash
npm install
npm run dev
```
Visit http://localhost:3000

### Production Build
```bash
npm run build
npm run start
```

## 📋 Feature Branches

This project uses separate branches for each assignment:

- **`Assignment-4` branch:** Functional Programming implementation
- **`Assignment-5` branch:** Redux + RxJS with Vue
- **`Assignment-6` branch:** Next.js + React (current)

Each branch is a complete, working implementation of that assignment's requirements.

## 🎮 How to Play

1. **Enter Lobby:** Click "Enter Lobby" on home page
2. **Create Room:** Enter your display name and click "Create room"
3. **Share Code:** Copy the 4-letter room code
4. **Join Game:** Friends join using the code
5. **Start Game:** Host clicks "Start game" (needs 2+ players)
6. **Play Cards:** Click cards to play, draw if needed
7. **Win:** First to empty their hand wins!

### Game Rules
- Match color or number/action
- **Draw +2/+4 stacking:** Play another +2/+4 to stack the penalty
- **Number chaining:** Play multiple cards of the same number in one turn
- **Wild cards:** Choose any color after playing
- **Skip/Reverse:** Affect turn order

## 🔑 Key Technical Concepts

### Server vs Client Components

**Server Components** (default in Next.js):
```typescript
// app/page.tsx - No 'use client' directive
export default function HomePage() {
  return <main>...</main>  // Rendered on server
}
```

**Client Components** (interactive):
```typescript
// app/components/Lobby.tsx
'use client'  // ← Required for hooks/state

import { useState } from 'react'

export default function Lobby() {
  const [name, setName] = useState('')  // ✅ Can use hooks
  return <input value={name} onChange={...} />
}
```

### Redux Integration

**React hooks** (instead of Vue bridge):
```typescript
// src/store/hooks.ts
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// Usage in components
const room = useAppSelector(state => state.game.room)
const dispatch = useAppDispatch()
```

### RxJS Streams (unchanged from Assignment 5)

Firestore snapshots wrapped as Observables:
```typescript
// src/store/streams.ts
const roomObservable = createDocumentObservable<Room>(`rooms/${roomId}`)
roomObservable.subscribe(room => dispatch(setRoom(room)))
```

### Functional Model (unchanged from Assignment 4)

Pure functions with immutable state:
```typescript
// src/online/Round.ts
function playCard(state: GameState, card: Card): GameState {
  // Returns NEW state, never mutates
  return { ...state, topCard: card, ... }
}
```

## 📁 Project Structure

```
UNO-WEB3/
├── app/                      # Next.js App Router
│   ├── layout.tsx           # Root layout (Server Component)
│   ├── page.tsx             # Home page (Server Component)
│   ├── globals.css          # Global styles
│   ├── components/          # React components (Client)
│   │   ├── ReduxProvider.tsx
│   │   ├── Lobby.tsx
│   │   ├── OnlineBoard.tsx
│   │   └── CardView.tsx
│   └── lobby/
│       └── page.tsx         # Lobby route
├── src/
│   ├── store/               # Redux + RxJS (Assignment 5)
│   │   ├── store.ts
│   │   ├── gameSlice.ts
│   │   ├── streams.ts
│   │   ├── types.ts
│   │   └── hooks.ts         # React-Redux hooks
│   ├── online/              # Functional model (Assignment 4)
│   │   ├── Deck.ts
│   │   ├── Hand.ts
│   │   ├── Round.ts
│   │   └── functional-utils.ts
│   ├── cards/               # Card types and rules
│   ├── services/            # Firebase/GraphQL
│   └── firebase.ts
├── public/
│   └── cards/               # Card images
├── next.config.js           # Next.js configuration
├── tsconfig.json            # TypeScript config
├── package.json
└── EXAM_STUDY_GUIDE.md      # Comprehensive study guide
```

## 📚 Documentation

See **`EXAM_STUDY_GUIDE.md`** for comprehensive exam preparation covering:
- Assignment 4: Functional programming concepts
- Assignment 5: Redux + RxJS patterns
- Assignment 6: Next.js SSR architecture

## 🔧 Technical Stack

| Technology | Purpose | Assignment |
|------------|---------|------------|
| **Next.js 16** | Server-side rendering framework | Assignment 6 |
| **React 19** | UI library | Assignment 6 |
| **Redux Toolkit** | State management | Assignment 5 |
| **RxJS** | Reactive streams | Assignment 5 |
| **TypeScript** | Type safety | All |
| **Firebase** | Backend (Firestore + Auth) | All |
| **GraphQL** | API mutations | All |
| **Tailwind CSS** | Styling | All |

## ✅ Compliance Checklist

### Assignment 4 (Functional Programming)
- ✅ No classes (only functions and interfaces)
- ✅ All data is `readonly` (immutable)
- ✅ All functions are pure (no side effects in core logic)
- ✅ Uses `map`, `filter`, `reduce`, `flatMap`
- ✅ Uses closures for encapsulation
- ✅ Uses function composition

### Assignment 5 (Redux + RxJS)
- ✅ Redux for state management
- ✅ RxJS Observables for Firestore snapshots
- ✅ Functional model from A4 retained
- ✅ All features from A1-A3 retained

### Assignment 6 (Next.js SSR)
- ✅ Next.js App Router implemented
- ✅ Server Components (layout, pages)
- ✅ Client Components (interactive UI)
- ✅ `npm run dev` works
- ✅ `npm run build` succeeds
- ✅ `npm run start` works
- ✅ Redux/RxJS retained
- ✅ Functional model retained

## 🎓 Learning Outcomes

This project demonstrates:
1. **Functional Programming:** Immutable data structures, pure functions, higher-order functions
2. **Reactive Programming:** RxJS Observables for async data streams
3. **State Management:** Redux with TypeScript
4. **Server-Side Rendering:** Next.js App Router with Server/Client component split
5. **Modern React:** Hooks, composition, type safety
6. **Real-time Multiplayer:** Firebase Firestore with reactive updates
7. **GraphQL:** Mutations for game actions

## 🔍 Testing the Build

```bash
# Development (hot reload)
npm run dev

# Production build
npm run build

# Production server
npm run start
```

All three commands should work without errors. The production build creates optimized, statically pre-rendered pages where possible.

## 📝 Notes

- **Vue code preserved:** `src/services/OnlineBoard.vue` and `src/ui/*.vue` files still exist but are not used in Assignment 6
- **Vue-Redux bridge preserved:** `src/store/vue.ts` exists for reference but replaced by `src/store/hooks.ts`
- **Card images:** Must be in `public/cards/` directory for Next.js to serve them
- **Firebase config:** Ensure `.env` file has Firebase credentials (not committed to git)
- **GraphQL Server:** The game requires a separate GraphQL server for game actions (start game, play cards, draw). See [GraphQL Setup](#graphql-setup) below.

### GraphQL Setup

**Important:** The UNO game uses a GraphQL backend for game logic. You have these options:

1. **Use deployed endpoint** (if available):
   ```
   https://uno-graphql-web-3.vercel.app/api/graphql
   ```

2. **Deploy your own** to Vercel:
   - Uncomment `api-graphql-FIXED.ts`
   - Set up Firebase Admin SDK credentials
   - Deploy to Vercel
   - Update `NEXT_PUBLIC_GRAPHQL_URL` environment variable

3. **Run locally**:
   ```bash
   # Set environment variable
   export NEXT_PUBLIC_GRAPHQL_URL=http://localhost:3001/api/graphql
   # Then run your GraphQL server separately
   ```

**Without GraphQL server:**
- ✅ Lobby works (create/join rooms)
- ✅ Firebase real-time updates work
- ✅ Redux + RxJS state management works
- ✅ Next.js SSR architecture is fully demonstrated
- ❌ Game actions (start game, play cards, draw) will show error

**For Assignment 6 purposes**, the Next.js conversion is complete and functional even without the GraphQL backend running. The architecture, Server/Client component split, and build process all work correctly.

## 🎉 Success!

You've successfully completed a full-stack online multiplayer game with:
- ✅ Functional programming principles
- ✅ Reactive state management
- ✅ Server-side rendering
- ✅ Real-time multiplayer
- ✅ Production-ready architecture

Ready for deployment! 🚀

## License
Internal coursework project – no production use implied.
