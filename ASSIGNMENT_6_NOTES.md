# Assignment 6 - SSR with Next.js
## Buzzword Reference & Code Examples

---

## **Server-Side Rendering (SSR)**

### What it is:
Rendering React components on the server and sending fully-rendered HTML to the client.

### Where it's implemented:
- **`app/layout.tsx`** (lines 10-24)
  - Root layout is a **Server Component** by default
  - Runs on server, generates HTML with metadata
  - No `'use client'` directive = server component

- **`app/page.tsx`** (entire file)
  - Home page is a **Server Component**
  - Pre-rendered on server
  - Static by default (no data fetching)

---

## **Client Components**

### What it is:
Components that run in the browser, can use React hooks and browser APIs.

### Where it's implemented:
- **`app/lobby/page.tsx`** (line 1)
  ```tsx
  'use client'
  ```
  - Uses `useState` hook
  - Manages client-side routing state

- **`app/components/Lobby.tsx`** (line 1)
  - Uses `useState`, `useEffect`
  - Handles user interactions

- **`app/components/OnlineBoard.tsx`** (line 1)
  - Uses Redux hooks (`useAppSelector`)
  - Manages game state client-side

- **`app/components/CardView.tsx`** (line 1)
  - Handles click events
  - Uses `useState` for image error handling

- **`app/components/ReduxProvider.tsx`** (line 1)
  - Wraps app with Redux Provider
  - Must be client component (Redux is client-side)

---

## **Static Pages**

### What it is:
Pages pre-rendered at build time, served as static HTML.

### Where it's implemented:
- **`app/page.tsx`**
  - Home page is fully static
  - No dynamic data fetching
  - Pre-generated at `npm run build`
  - Build output shows: `○ (Static)`

---

## **Dynamic Pages**

### What it is:
Pages that require server rendering on each request or have dynamic content.

### Where it's implemented:
- **`app/lobby/page.tsx`**
  - Marked as client component (`'use client'`)
  - Contains interactive state
  - Could be made dynamic with: `export const dynamic = 'force-dynamic'`

---

## **App Router**

### What it is:
Next.js's file-system based routing using the `app/` directory.

### Where it's implemented:
- **`app/layout.tsx`** - Root layout wrapper
- **`app/page.tsx`** - Home route `/`
- **`app/lobby/page.tsx`** - Lobby route `/lobby`
- **`app/components/`** - Shared components (not routes)

### Routing structure:
```
app/
├── layout.tsx       → Root layout (wraps all pages)
├── page.tsx         → / (home)
└── lobby/
    └── page.tsx     → /lobby
```

---

## **GraphQL API Integration**

### What it is:
Using GraphQL mutations to communicate with backend server instead of direct database calls.

### Where it's implemented:
- **`src/services/Rooms.ts`** (lines 8-52)
  - `callGraphQL()` function sends GraphQL mutations
  - `createRoom()` uses GraphQL `createRoom` mutation
  - `joinRoomByCode()` uses GraphQL `joinRoom` mutation
  
- **`.env.local`**
  ```
  NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://uno-graphql-web-3.vercel.app/api/graphql
  ```

### Flow:
```
Client → GraphQL Mutation → GraphQL Server → Firebase
```

### Example mutation in code:
```tsx
const query = `
  mutation CreateRoom($displayName: String!) {
    createRoom(displayName: $displayName) {
      roomId
      code
    }
  }
`;
```

---

## **State Management (Redux)**

### What it is:
Centralized state management using Redux Toolkit.

### Where it's implemented:
- **`src/store/store.ts`**
  - Redux store configuration
  - Uses `configureStore` from Redux Toolkit

- **`src/store/gameSlice.ts`**
  - Game state slice with reducers
  - Actions: `setRoom`, `setPlayers`, `setMyHand`, `resetGame`

- **`app/components/ReduxProvider.tsx`**
  - Wraps app with Redux `<Provider>`

- **`app/components/OnlineBoard.tsx`** (lines 24-26)
  - Uses `useAppSelector` to read Redux state:
  ```tsx
  const room = useAppSelector((state) => state.game.room)
  const players = useAppSelector((state) => state.game.players)
  const myHand = useAppSelector((state) => state.game.myHand)
  ```

---

## **RxJS Streams**

### What it is:
Reactive programming for handling Firestore real-time updates.

### Where it's implemented:
- **`src/store/streams.ts`** (lines 41-124)
  - `createDocumentObservable()` - Observable for single document
  - `createCollectionObservable()` - Observable for collections
  - `startListeningToRoom()` - Main function that sets up subscriptions

- **`app/components/OnlineBoard.tsx`** (lines 33-36)
  - Subscribes to room updates:
  ```tsx
  useEffect(() => {
    const unsubscribe = startListeningToRoom(roomId)
    return () => unsubscribe?.()
  }, [roomId])
  ```

---

## **Functional Programming**

### What it is:
Programming paradigm using pure functions, immutability, and composition.

### Where it's implemented:
- **`src/online/functional-utils.ts`**
  - Pure utility functions
  - `pipe()`, `compose()`, `curry()`
  - `filterCards()`, `mapCards()`

- **`src/online/Round.ts`**
  - Pure functions for game logic
  - `createInitialState()`, `playCard()`, `drawCards()`
  - All functions return new state (immutable)

- **`src/online/Hand.ts`**
  - `findPlayableCards()` - pure function
  - Uses `.map()`, `.filter()` for transformations

- **`src/online/Deck.ts`**
  - `createDeck()` - pure function
  - Uses `.flatMap()` for array operations

---

## **Hydration**

### What it is:
Process where React "hydrates" server-rendered HTML with client-side JavaScript.

### Where it happens:
- **`app/layout.tsx`** + **`app/components/ReduxProvider.tsx`**
  - Server renders initial HTML
  - Client-side React hydrates and attaches event listeners
  - Redux state initializes on client

### Avoiding hydration errors:
- Server and client components are properly separated
- `'use client'` directive used where needed
- No direct DOM manipulation during SSR

---

## **Firebase Integration**

### What it is:
Backend-as-a-Service for authentication and real-time database.

### Where it's implemented:
- **`src/firebase.ts`**
  - Firebase config and initialization
  - `ensureAnonAuth()` for anonymous authentication
  - `auth`, `db` exports

- **`src/services/Rooms.ts`** (line 53-58)
  - `listenRoom()` uses Firestore listeners for real-time updates
  - Still uses direct Firestore for subscriptions

---

## **Environment Variables**

### What it is:
Configuration values stored outside code for different environments.

### Where it's implemented:
- **`.env.local`**
  ```
  NEXT_PUBLIC_GRAPHQL_ENDPOINT=https://uno-graphql-web-3.vercel.app/api/graphql
  ```

- **`src/services/Rooms.ts`** (line 8)
  ```tsx
  const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || '...'
  ```

### Naming convention:
- `NEXT_PUBLIC_*` - Exposed to browser
- Without prefix - Server-side only

---

## **TypeScript**

### What it is:
Typed superset of JavaScript for type safety.

### Where it's implemented:
- **`src/cards/Card.ts`**
  - Type definitions for game cards
  ```tsx
  type NumberCard = { kind: "number"; color: Color; value: number };
  type Card = NumberCard | ActionCard | WildCard;
  ```

- **`src/store/types.ts`**
  - Interface definitions for game state
  ```tsx
  interface PlayerData { id: string; displayName: string; ... }
  interface RoomData { code: string; status: string; ... }
  ```

- **All `.tsx` and `.ts` files** use TypeScript

---

## **Tailwind CSS**

### What it is:
Utility-first CSS framework for styling.

### Where it's implemented:
- **`app/globals.css`** - Tailwind imports
- **All component files** use Tailwind classes:
  ```tsx
  className="min-h-screen flex flex-col items-center justify-center p-8"
  className="hover:shadow-lg hover:-translate-y-2 transition-all"
  ```

---

## **Build Tools**

### What they are:
- **Next.js** - React framework with SSR
- **Turbopack** - Fast build tool (Next.js 16+)

### Where configured:
- **`package.json`**
  ```json
  "scripts": {
    "dev": "next dev -p 5173",
    "build": "next build",
    "start": "next start -p 5173"
  }
  ```

- **`next.config.js`**
  ```js
  const nextConfig = {
    reactStrictMode: true,
  }
  ```

---

## Summary - Assignment 6 Compliance

### ✅ Must Have:
1. **Features from Assignment 5** - Redux, RxJS, Functional Programming ✓
2. **Next.js SSR** - Using App Router, server/client components ✓
3. **npm commands work** - `dev`, `build`, `start` all functional ✓

### ✅ Should Have:
1. **Server & Client Components** - Layout (server), game components (client) ✓
2. **Static vs Dynamic** - Home page is static, lobby is client-rendered ✓

### ✅ Could Have:
1. **API in Next.js** - Using external GraphQL API (deployed separately) ✓

---

## Interview Questions You Should Be Ready For:

1. **"Why did you use client components for the game logic?"**
   - Needs React hooks (useState, useEffect)
   - Requires Redux (client-side state)
   - Real-time interactions and WebSocket/Firestore listeners

2. **"Why is the home page a server component?"**
   - No dynamic data needed
   - Just static HTML
   - Better performance (pre-rendered)

3. **"How does GraphQL improve your architecture?"**
   - Decouples frontend from database
   - Centralized business logic on server
   - Better security (no direct database access from client)
   - Type-safe queries

4. **"What's the difference between static and dynamic rendering?"**
   - Static: Pre-rendered at build time, same for all users
   - Dynamic: Rendered per-request, can be personalized
   - Our home page: static, Lobby: client-side dynamic

5. **"How do you avoid hydration errors?"**
   - Proper use of 'use client' directive
   - Server and client render same initial HTML
   - Redux initialized after hydration

6. **"Why use RxJS for Firestore?"**
   - Reactive streams for real-time data
   - Easy to compose and transform data
   - Integrates well with Redux

7. **"What's functional programming in your code?"**
   - Pure functions (no side effects)
   - Immutable data (never mutate state)
   - Function composition (pipe, compose)
   - Examples in Round.ts, functional-utils.ts
