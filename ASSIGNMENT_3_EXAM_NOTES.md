# Web3 Course - Assignment 3 Exam Notes

## 📚 Course Learning Objectives (From Assignment Description)

### **From the Course Description:**
- **"Implement a server using TypeScript"**
- **"Design and implement a web application using one or more of the techniques and technologies taught in the course"**

### **Exam Topics the Professor Will Ask About:**
- **GraphQL types and queries**
- **Resolvers**
- **GraphQL client**
- **Web sockets**
- **Server-sent events**
- **GraphQL subscriptions** (corrected from "descriptions")

---

## 🎯 Assignment 3 Overview

**Goal:** Convert single-player UNO game (Assignment 2) into multiplayer game where players compete through a server.

**Key Architecture Change:**
- **Assignment 2:** Client-side only (bots in Web Workers)
- **Assignment 3:** Client-server architecture (real players via network)

**Technologies:**
- **Client:** Vue.js 3 (Composition API)
- **Server:** GraphQL (GraphQL Yoga on Vercel)
- **Database:** Firebase Firestore
- **Real-time:** Firestore subscriptions
- **Auth:** Firebase Anonymous Authentication

---

## 📋 Assignment 3 Requirements Checklist

### **Must Have (70 points)**

#### ✅ 1. Play against 1-3 human opponents
**Implementation:**
- Lobby system for player matchmaking
- Room creation with unique invite codes
- Join room by code

**📁 Where to find:**
- **File:** `src/ui/Lobby.vue`
- **Lines 44-48:** `onCreate()` - Creates room via GraphQL
- **Lines 60-66:** `onJoin()` - Joins room by code
- **Lines 9-10:** UI inputs for display name and invite code

---

#### ✅ 2. Official UNO rules
**Implementation:**
- Same game logic as Assignment 2
- Number chaining (play multiple cards of same value)
- Draw stacking (+2 on +2, +4 on +4)
- Skip, Reverse, Wild cards

**📁 Where to find:**
- **File:** `src/online/Round.ts` (game logic reused from Assignment 2)
- **Server:** GraphQL server `api/graphql.ts` lines 94-148 (card matching logic)
- **Lines 19-48:** `matches()` function validates legal plays

---

#### ✅ 3. Same features as Assignment 2
**Features retained:**
- Card playing with mouse clicks
- Draw card button
- Visual card display with images
- Color picker for wild cards
- Game history
- Turn indicators

**📁 Where to find:**
- **File:** `src/services/OnlineBoard.vue`
- **Lines 67-91:** Player hand display with `CardView` components
- **Lines 73-81:** Inline wild card color picker
- **Lines 34-62:** Top card display with game state

---

#### ✅ 4. User identification
**Implementation:**
- Firebase Anonymous Authentication
- Display name input in lobby
- Each player gets unique Firebase UID

**📁 Where to find:**
- **File:** `src/firebase.ts`
- **Lines 24-28:** `ensureAnonAuth()` function
- **File:** `src/ui/Lobby.vue`
- **Lines 7-9:** Display name input
- **Server:** `api/graphql.ts` lines 156-160 (auth verification)

---

#### ✅ 5. Create a new game
**Implementation:**
- GraphQL `createRoom` mutation
- Generates random 6-character invite code
- Sets creator as host

**📁 Where to find:**
- **File:** `src/services/Rooms.ts`
- **Lines 33-48:** `createRoom()` function using GraphQL
- **GraphQL mutation:**
```graphql
mutation ($displayName: String!) {
  createRoom(displayName: $displayName) {
    roomId
    code
  }
}
```
- **Server:** `api/graphql.ts` lines 176-202 (createRoom resolver)

---

#### ✅ 6. Join existing game
**Implementation:**
- GraphQL `joinRoom` mutation
- Join by entering invite code
- Validates room exists and is in lobby

**📁 Where to find:**
- **File:** `src/services/Rooms.ts`
- **Lines 53-68:** `joinRoomByCode()` function using GraphQL
- **GraphQL mutation:**
```graphql
mutation ($code: String!, $displayName: String!) {
  joinRoom(code: $code, displayName: $displayName) {
    roomId
  }
}
```
- **Server:** `api/graphql.ts` lines 204-236 (joinRoom resolver)

---

#### ✅ 7. Server notifications
**Implementation:**
- Firestore real-time subscriptions (onSnapshot)
- Notifies all players when:
  - Room status changes (lobby → playing → finished)
  - Players join/leave
  - Cards are played
  - Turn changes
  - Hands update

**📁 Where to find:**
- **File:** `src/services/OnlineGame.ts`
- **Lines 42-70:** `subscribeOnlineGame()` function
  - Room subscription (line 50)
  - Players subscription (lines 53-56)
  - Hand subscription (lines 58-63)
- **File:** `src/services/Rooms.ts`
- **Lines 70-75:** `listenRoom()` for lobby updates

**How it works:**
```typescript
// Client subscribes to Firestore document
onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
  // Callback fires automatically when document changes
  const roomData = snapshot.data();
  // Update UI with new data
});
```

---

#### ✅ 8. GraphQL as communication protocol
**Implementation:**
- All mutations (writes) go through GraphQL server
- Queries for room data available
- Server validates all actions before updating Firestore

**Mutations implemented:**
1. `createRoom(displayName: String!): RoomCreated!`
2. `joinRoom(code: String!, displayName: String!): RoomJoined!`
3. `startGame(roomId: ID!): Boolean!`
4. `playCard(roomId: ID!, card: JSON!): Boolean!`
5. `drawOne(roomId: ID!): Boolean!`
6. `endTurn(roomId: ID!): Boolean!`

**📁 Where to find:**
- **Client calls:**
  - `src/services/Rooms.ts` lines 33-68 (room management)
  - `src/services/OnlineGame.ts` lines 76-107 (game actions)
- **Server implementation:**
  - `api/graphql.ts` lines 138-153 (GraphQL schema/typeDefs)
  - `api/graphql.ts` lines 170-550 (resolvers)

**GraphQL helper function:**
```typescript
// Lines 14-40 in OnlineGame.ts
async function gql<T>(query: string, variables?: Record<string, any>) {
  const token = await auth.currentUser?.getIdToken();
  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables })
  });
  // Parse and return data
}
```

---

### **Should Have (20 points)**

#### ⚠️ Database tracking of players/scores
**Status:** Partially implemented
- Players stored in Firestore during game
- No persistent score tracking across games
- No leaderboard

**What's there:**
- Room documents: `rooms/{roomId}`
- Player subcollections: `rooms/{roomId}/players/{userId}`
- Hand subcollections: `rooms/{roomId}/hands/{userId}`

**📁 Where to find:**
- **Server:** `api/graphql.ts` lines 192-201 (player document creation)

---

#### ⚠️ User registration and login
**Status:** Not implemented
- Only anonymous authentication
- No email/password registration
- No persistent user accounts

**What you could say in exam:**
"I used Firebase Anonymous Auth for quick prototyping. For production, I would add Firebase Email/Password authentication with user profiles."

---

### **Could Have (10 points)**

#### ⚠️ Full game with scoring
**Status:** Not implemented
- Only single round play
- No multi-round scoring system
- Winner determined but no points tracked

---

## 🔍 Exam Topics Deep Dive

### **1. GraphQL Types and Queries**

**Question:** "Explain GraphQL types in your project"

**Answer:**
"GraphQL uses a strongly-typed schema to define the shape of data. In my UNO server, I defined custom types in the typeDefs:

**Scalar types:**
- `ID!` - Unique identifier (non-nullable)
- `String!` - Text (non-nullable)
- `Boolean!` - True/false
- `Int` - Numbers
- `JSON` - Custom scalar for complex objects like cards

**Object types:**
```graphql
type Player {
  id: ID!
  displayName: String!
  isHost: Boolean
  handCount: Int
}

type Room {
  id: ID!
  code: String
  status: String!
  currentTurn: String
  topCard: JSON
  players: [Player!]!
}
```

**Return types for mutations:**
```graphql
type RoomCreated {
  roomId: ID!
  code: String!
}
```

The `!` means non-nullable - GraphQL guarantees these fields always have values."

**📁 Code references:**
- `api/graphql.ts` lines 138-168 (type definitions)

---

**Question:** "Show me a GraphQL query example"

**Answer:**
"Queries fetch data without side effects. My server exposes a `room` query:

```graphql
query GetRoom($id: ID!) {
  room(id: $id) {
    id
    code
    status
    currentTurn
    topCard
    players {
      id
      displayName
      isHost
      handCount
    }
  }
}
```

The resolver fetches the room from Firestore:
```typescript
async room(_: unknown, { id }: { id: string }, ctx: any) {
  const doc = await db.doc(`rooms/${id}`).get();
  if (!doc.exists) return null;
  
  const playersSnap = await db.collection(`rooms/${id}/players`).get();
  const players = playersSnap.docs.map(d => ({ id: d.id, ...d.data() }));
  
  return { id, ...doc.data(), players };
}
```

This demonstrates:
- **Type safety** - Return matches Room type
- **N+1 problem solution** - Fetches players in single query
- **Null handling** - Returns null if room doesn't exist"

**📁 Code references:**
- `api/graphql.ts` lines 173-187 (room query resolver)

---

### **2. GraphQL Resolvers**

**Question:** "What are resolvers and how do they work?"

**Answer:**
"Resolvers are functions that implement the business logic for GraphQL operations. Each field in the schema has a resolver that tells GraphQL how to fetch or compute that data.

**Resolver signature:**
```typescript
fieldName(parent, args, context, info) {
  // Return the value for this field
}
```

**In my project:**
1. **Parent** - Previous resolver's result (unused in root resolvers)
2. **Args** - Input variables from the query/mutation
3. **Context** - Shared data like authenticated user, database connection
4. **Info** - Metadata about the query (rarely used)

**Example - playCard mutation resolver:**
```typescript
async playCard(
  _: unknown,                           // parent (unused)
  { roomId, card }: { roomId: string; card: Card },  // args
  ctx: any                              // context with user
) {
  const uid = ctx.user?.uid;
  if (!uid) throw new Error('unauthorized');
  
  // Use Firestore transaction for atomic updates
  await db.runTransaction(async tx => {
    // 1. Fetch current game state
    const roomSnap = await tx.get(roomRef);
    const room = roomSnap.data();
    
    // 2. Validate move
    if (room.currentTurn !== uid) throw new Error('Not your turn');
    if (!matches(room.topCard, card)) throw new Error('Illegal play');
    
    // 3. Update game state
    tx.set(roomRef, { topCard: card, ... });
  });
  
  return true;
}
```

**Key concepts:**
- **Validation** - Check user authorization and game rules
- **Transactions** - Ensure atomic updates (no race conditions)
- **Error handling** - Throw descriptive errors for client"

**📁 Code references:**
- `api/graphql.ts` lines 304-434 (playCard resolver)
- `api/graphql.ts` lines 436-503 (drawOne resolver)
- `api/graphql.ts` lines 505-543 (endTurn resolver)

---

### **3. GraphQL Client**

**Question:** "How does the client interact with GraphQL?"

**Answer:**
"I implemented a lightweight GraphQL client using native `fetch` API instead of Apollo Client for simplicity.

**Client implementation:**
```typescript
// Helper function wraps fetch with auth
async function gql<T>(query: string, variables?: Record<string, any>) {
  // 1. Get Firebase auth token
  await ensureAnonAuth();
  const token = await auth.currentUser?.getIdToken();
  
  // 2. Send GraphQL request
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ query, variables })
  });
  
  // 3. Parse response
  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message);
  }
  return json.data as T;
}
```

**Usage in application:**
```typescript
// Create room mutation
const result = await gql<{ createRoom: { roomId: string; code: string } }>(
  `mutation ($displayName: String!) {
    createRoom(displayName: $displayName) {
      roomId
      code
    }
  }`,
  { displayName: 'Player1' }
);

console.log(result.createRoom.roomId);
console.log(result.createRoom.code);
```

**Why not Apollo Client?**
- Simpler for small projects
- Less bundle size
- Don't need advanced features (caching, optimistic UI)
- Easy to add auth tokens

**Apollo Client would be better for:**
- Normalized cache
- Automatic refetching
- Optimistic updates
- GraphQL subscriptions (we use Firestore instead)"

**📁 Code references:**
- `src/services/OnlineGame.ts` lines 14-40 (gql helper)
- `src/services/Rooms.ts` lines 16-30 (same pattern)
- All mutation calls in both files

---

### **4. Web Sockets**

**Question:** "Did you use WebSockets? If not, what alternative did you choose?"

**Answer:**
"I did not use raw WebSockets. Instead, I used **Firestore's real-time subscriptions** which use WebSockets under the hood.

**Why Firestore instead of custom WebSocket implementation?**

1. **Managed infrastructure** - No need to handle WebSocket server, reconnections, or heartbeats
2. **Built-in features**:
   - Automatic reconnection on network failure
   - Offline support with local cache
   - Efficient binary protocol
3. **Easier to scale** - Firebase handles load balancing
4. **Security rules** - Database-level access control

**How it works:**
```typescript
// Subscribe to room updates
const unsubscribe = onSnapshot(
  doc(db, 'rooms', roomId),
  (snapshot) => {
    // This callback fires every time the document changes
    const roomData = snapshot.data();
    updateUI(roomData);
  }
);

// Firestore internally:
// 1. Opens WebSocket connection to Firebase servers
// 2. Sends subscription request
// 3. Receives real-time updates over WebSocket
// 4. Caches data locally for offline access
```

**Custom WebSocket alternative:**
If I were to implement raw WebSockets, it would look like:

```typescript
// Server (Node.js with ws library)
import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    // Broadcast to all clients
    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});

// Client
const ws = new WebSocket('ws://localhost:8080');
ws.onmessage = (event) => {
  const update = JSON.parse(event.data);
  // Update UI
};
```

**Trade-off:**
- **Firestore:** Easier, more features, vendor lock-in
- **Raw WebSockets:** Full control, more complex, need to handle reconnection/auth"

**📁 Code references:**
- `src/services/OnlineGame.ts` lines 42-70 (Firestore subscriptions)
- `src/services/Rooms.ts` lines 70-75 (lobby subscriptions)

---

### **5. Server-Sent Events (SSE)**

**Question:** "What are Server-Sent Events and why didn't you use them?"

**Answer:**
"Server-Sent Events (SSE) is a browser API for receiving real-time updates from a server over HTTP. It's simpler than WebSockets but only supports server-to-client communication (one-way).

**SSE Example:**
```typescript
// Server (Node.js/Express)
app.get('/events', (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  
  // Send event every second
  const interval = setInterval(() => {
    res.write(`data: ${JSON.stringify({ time: Date.now() })}\n\n`);
  }, 1000);
  
  req.on('close', () => clearInterval(interval));
});

// Client
const eventSource = new EventSource('/events');
eventSource.onmessage = (event) => {
  const data = JSON.parse(event.data);
  console.log(data);
};
```

**Why I didn't use SSE:**

1. **One-way only** - SSE is server → client. For game actions (play card, draw), I need client → server too. Would need separate HTTP POST requests for actions.

2. **Firestore is better** - Firestore subscriptions give me:
   - Bidirectional updates (read + write)
   - Automatic state sync
   - Offline support
   - Less code to maintain

3. **SSE limitations:**
   - No binary data support (WebSockets can send binary)
   - Limited to 6 connections per domain in some browsers
   - Requires server to maintain open connections (not ideal for serverless)

**When SSE is good:**
- Live feeds (news, stock prices)
- One-way notifications
- Progress updates
- Server has persistent process (not serverless)

**Comparison:**

| Feature | WebSockets | SSE | Firestore |
|---------|-----------|-----|-----------|
| Direction | Bidirectional | Server→Client | Bidirectional |
| Protocol | WS/WSS | HTTP/HTTPS | WS (internal) |
| Reconnect | Manual | Automatic | Automatic |
| Binary | Yes | No | Yes |
| Browser Support | Excellent | Good (no IE) | Excellent |
| Complexity | High | Medium | Low |"

---

### **6. GraphQL Subscriptions**

**Question:** "Explain GraphQL subscriptions vs what you implemented"

**Answer:**
"GraphQL subscriptions are the third operation type (alongside queries and mutations) for real-time updates.

**How GraphQL subscriptions work:**

**1. Schema definition:**
```graphql
type Subscription {
  roomUpdated(roomId: ID!): Room!
  playerJoined(roomId: ID!): Player!
  cardPlayed(roomId: ID!): Card!
}
```

**2. Server implementation (Apollo Server):**
```typescript
import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();

const resolvers = {
  Mutation: {
    playCard: async (_, { roomId, card }) => {
      // Update game state
      await updateRoom(roomId, card);
      
      // Publish event to subscribers
      pubsub.publish('CARD_PLAYED', {
        cardPlayed: card,
        roomId
      });
      
      return true;
    }
  },
  Subscription: {
    cardPlayed: {
      subscribe: (_, { roomId }) => {
        return pubsub.asyncIterator(['CARD_PLAYED']);
      },
      resolve: (payload) => payload.cardPlayed
    }
  }
};
```

**3. Client implementation:**
```typescript
import { useSubscription } from '@apollo/client';

const CARD_PLAYED_SUBSCRIPTION = gql`
  subscription OnCardPlayed($roomId: ID!) {
    cardPlayed(roomId: $roomId) {
      kind
      color
      value
    }
  }
`;

function GameBoard() {
  const { data, loading } = useSubscription(CARD_PLAYED_SUBSCRIPTION, {
    variables: { roomId: 'abc123' }
  });
  
  // Automatically re-renders when new card played
}
```

**Why I used Firestore instead:**

**Pros of Firestore:**
- ✅ No GraphQL subscription server setup needed
- ✅ Works with serverless (Vercel Functions)
- ✅ Offline support built-in
- ✅ Less complex infrastructure

**Cons of Firestore:**
- ❌ Not using GraphQL for reads (hybrid approach)
- ❌ Security rules in Firestore, not in GraphQL layer
- ❌ Harder to do complex joins

**When to use GraphQL subscriptions:**
- Need unified GraphQL API for everything
- Complex authorization logic in resolvers
- Already have persistent server (not serverless)
- Want to avoid vendor lock-in

**My architecture justification:**
'I chose Firestore subscriptions because they're simpler for a serverless deployment on Vercel. GraphQL subscriptions require a persistent WebSocket server, which doesn't work well with Vercel's serverless functions that spin down after requests. This hybrid approach (GraphQL mutations + Firestore subscriptions) gives me the best of both worlds: validated writes through GraphQL and efficient real-time reads through Firestore.'"

**📁 Code references:**
- Current approach: `src/services/OnlineGame.ts` lines 42-70
- Why it works: Serverless functions can't maintain persistent connections

---

## 🏗️ Architecture Deep Dive

### **Client-Server Communication Flow**

**1. Room Creation Flow:**
```
User clicks "Create Room"
  ↓
Lobby.vue calls createRoom(displayName)
  ↓
Rooms.ts sends GraphQL mutation:
  mutation { createRoom(displayName: "Alice") { roomId, code } }
  ↓
GraphQL server (Yoga) receives request
  ↓
Resolver validates auth token (Firebase)
  ↓
Resolver writes to Firestore:
  rooms/{roomId} document
  rooms/{roomId}/players/{userId} document
  ↓
Returns { roomId, code } to client
  ↓
Client starts Firestore subscription
  ↓
UI updates with invite code
```

**📁 Code path:**
1. `src/ui/Lobby.vue` line 44 → `onCreate()`
2. `src/services/Rooms.ts` line 33 → `createRoom()`
3. `api/graphql.ts` line 176 → createRoom resolver
4. `src/services/Rooms.ts` line 72 → `listenRoom()`

---

**2. Play Card Flow:**
```
User clicks card in hand
  ↓
OnlineBoard.vue calls onPlayCard(card, index)
  ↓
Checks if wild card → shows color picker
  ↓
OnlineGame.ts sends GraphQL mutation:
  mutation { playCard(roomId: "xyz", card: {...}) }
  ↓
Server validates:
  - Is it player's turn?
  - Is card legal to play?
  - Does player have the card?
  ↓
Server updates Firestore in transaction:
  - Remove card from hand
  - Update room.topCard
  - Advance turn
  - Apply card effects (skip, reverse, draw)
  ↓
Firestore triggers subscriptions for all clients
  ↓
All players' UIs update simultaneously
```

**📁 Code path:**
1. `src/services/OnlineBoard.vue` line 157 → `onPlayCard()`
2. `src/services/OnlineBoard.vue` line 178 → Shows color picker for wild
3. `src/services/OnlineBoard.vue` line 183 → `playChosenWild()`
4. `src/services/OnlineGame.ts` line 82 → `playCardOnline()`
5. `api/graphql.ts` line 304 → playCard resolver
6. `src/services/OnlineGame.ts` line 50 → Room subscription fires
7. `src/services/OnlineBoard.vue` line 130 → UI re-renders

---

### **TypeScript Server Implementation**

**Question:** "How does TypeScript help in your server?"

**Answer:**
"TypeScript provides compile-time type safety for the server, catching errors before deployment.

**1. Type-safe GraphQL context:**
```typescript
type Context = {
  db: Firestore;
  user: { uid: string } | null;
};

const resolvers = {
  Mutation: {
    playCard: async (
      _: unknown,
      { roomId, card }: { roomId: string; card: Card },
      ctx: Context  // ← TypeScript ensures correct structure
    ) => {
      // ctx.user has autocomplete
      const uid = ctx.user?.uid;
      // ...
    }
  }
};
```

**2. Card type definitions:**
```typescript
type Color = 'red' | 'yellow' | 'green' | 'blue';

type NumberCard = {
  kind: 'number';
  color: Color;
  value: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
};

type ActionCard = {
  kind: 'action';
  color: Color;
  action: 'skip' | 'reverse' | 'draw2';
};

type WildCard = {
  kind: 'wild';
  action: 'wild' | 'wildDraw4';
  chosenColor?: Color;
};

type Card = NumberCard | ActionCard | WildCard;
```

**Benefits:**
- ✅ Autocomplete for card properties
- ✅ Can't assign invalid card types
- ✅ Exhaustive switch case checking
- ✅ Refactoring is safer

**3. Type-safe helper functions:**
```typescript
function isActionDraw2(card: Card): card is ActionCard {
  return card.kind === 'action' && card.action === 'draw2';
}

// Now TypeScript knows card is ActionCard in this block:
if (isActionDraw2(card)) {
  card.color  // ← Valid, card.color exists
  card.value  // ← Error: ActionCard doesn't have value
}
```

**4. Transaction types:**
```typescript
await db.runTransaction(async (tx: Transaction) => {
  const roomSnap = await tx.get(roomRef);
  const room = roomSnap.data() as {
    status: string;
    currentTurn: string;
    topCard: Card;
    direction: 1 | -1;
    // ...
  };
  
  // TypeScript validates all property access
});
```"

**📁 Code references:**
- `api/graphql.ts` lines 32-39 (Card type definitions)
- `api/graphql.ts` lines 41-52 (Type guard functions)
- `api/graphql.ts` lines 170 (Context type in resolvers)

---

## 🎯 Key Buzzwords and Concepts for Exam

### **GraphQL Terminology:**
- **Schema** - Type definitions for API
- **Query** - Read operation (no side effects)
- **Mutation** - Write operation (changes data)
- **Subscription** - Real-time updates
- **Resolver** - Function that implements a field
- **Type** - Structure of data
- **Scalar** - Primitive type (String, Int, Boolean, ID)
- **Object Type** - Custom composite type
- **Non-nullable** - Field must have value (!)
- **Arguments** - Input parameters
- **Context** - Shared data across resolvers

### **Server Concepts:**
- **Serverless** - Functions that run on-demand
- **Vercel Functions** - Serverless platform for hosting
- **GraphQL Yoga** - Modern GraphQL server
- **Apollo Server** - Popular GraphQL server (alternative)
- **Firebase Admin SDK** - Server-side Firebase access
- **Transaction** - Atomic database operation
- **Firestore** - NoSQL document database
- **Authentication** - Verifying user identity
- **Authorization** - Checking user permissions

### **Real-time Patterns:**
- **WebSocket** - Bidirectional real-time protocol
- **Server-Sent Events (SSE)** - One-way real-time HTTP
- **Polling** - Repeatedly checking for updates
- **Long Polling** - Keeping request open until update
- **Subscriptions** - Push-based updates
- **PubSub** - Publish-subscribe pattern

### **TypeScript Concepts:**
- **Type safety** - Compile-time error checking
- **Union types** - One of multiple types (A | B)
- **Type guards** - Runtime type checking
- **Generics** - Reusable type parameters
- **Interface** - Shape of object
- **Type inference** - Automatic type detection

---

## 📝 Sample Exam Answers

### **Question: "Explain your GraphQL schema"**

**Answer:**
"My GraphQL schema defines the contract between client and server. It's written in SDL (Schema Definition Language) and includes:

**Types:** I defined `Player`, `Room`, `RoomCreated`, and `RoomJoined` types to structure my data. The `Room` type is the core type representing a game session.

**Queries:** I exposed a `room(id: ID!): Room` query to fetch room data by ID. This is used less frequently since I rely on Firestore subscriptions for real-time data.

**Mutations:** Six mutations handle all game actions:
- `createRoom` - Initializes a new game room
- `joinRoom` - Adds player to existing room
- `startGame` - Begins the game (deals cards)
- `playCard` - Plays a card from hand
- `drawOne` - Draws a card from deck
- `endTurn` - Ends player's turn (for number chaining)

All mutations return either `Boolean!` for success/failure or custom types like `RoomCreated` with specific data.

I used the `JSON` scalar type for complex objects like cards since card structure varies by type (number, action, wild)."

**📁 Reference:** `api/graphql.ts` lines 138-168

---

### **Question: "How do you handle real-time updates?"**

**Answer:**
"I use Firestore's real-time subscriptions instead of GraphQL subscriptions for efficiency.

**How it works:**
When a player joins a room, the client calls `subscribeOnlineGame(roomId, handlers)` which sets up three Firestore subscriptions:

1. **Room subscription** - Listens to `rooms/{roomId}` document for game state changes (topCard, currentTurn, status)
2. **Players subscription** - Listens to `rooms/{roomId}/players` collection for player join/leave events
3. **Hand subscription** - Listens to `rooms/{roomId}/hands/{myId}` document for the player's card updates

These use Firestore's `onSnapshot()` API which opens a WebSocket connection under the hood. When any mutation updates Firestore, all subscribed clients receive the update within milliseconds.

**Advantages:**
- Automatic reconnection on network failure
- Offline caching
- Easier than maintaining WebSocket server
- Works with serverless deployment

**Trade-off:**
Not a pure GraphQL architecture since reads use Firestore, not GraphQL queries. But mutations still go through GraphQL for validation."

**📁 Reference:** `src/services/OnlineGame.ts` lines 42-70

---

### **Question: "Why TypeScript on the server?"**

**Answer:**
"TypeScript provides type safety, which catches bugs at compile-time instead of runtime.

**Key benefits in my server:**

1. **Type-safe card validation** - My `Card` type is a discriminated union of `NumberCard | ActionCard | WildCard`. TypeScript ensures I handle all cases:
```typescript
if (card.kind === 'number') {
  // TypeScript knows card.value exists
}
```

2. **Context typing** - The resolver context is typed, so I get autocomplete for `ctx.user.uid` and errors if I typo it.

3. **Firestore type safety** - I can type the data returned from Firestore:
```typescript
const room = roomSnap.data() as RoomData;
```

4. **Refactoring confidence** - If I change the `Card` type, TypeScript shows all places I need to update.

5. **IDE support** - Autocomplete for all functions, no need to memorize API.

The assignment required TypeScript, and it significantly improved code quality. I caught several bugs during development that would have been runtime errors in JavaScript."

**📁 Reference:** `api/graphql.ts` (entire file uses TypeScript)

---

## ✅ Final Exam Preparation Checklist

### **Understand Level:**
- [ ] Can explain what GraphQL is
- [ ] Can describe difference between Query, Mutation, Subscription
- [ ] Can explain what a resolver is
- [ ] Can describe how WebSockets work
- [ ] Can explain Server-Sent Events
- [ ] Can describe Firebase Firestore subscriptions

### **Application Level:**
- [ ] Can write a GraphQL mutation
- [ ] Can implement a resolver function
- [ ] Can set up Firestore subscription in client
- [ ] Can send GraphQL request with auth token
- [ ] Can explain your architecture diagram

### **Analysis Level:**
- [ ] Can argue for Firestore vs GraphQL subscriptions
- [ ] Can compare WebSockets vs SSE vs Polling
- [ ] Can justify using GraphQL Yoga vs Apollo Server
- [ ] Can discuss type safety benefits of TypeScript
- [ ] Can critique your own architecture

---

## 🎓 Architecture Summary for Exam

**"Describe your Assignment 3 architecture"**

**Answer:**

"My Assignment 3 implements a client-server multiplayer UNO game with a hybrid communication architecture.

**Client (Vue.js):**
- Vue 3 Composition API for reactive UI
- Firebase Anonymous Auth for user identity
- GraphQL client using native fetch for mutations
- Firestore subscriptions for real-time state sync

**Server (GraphQL Yoga on Vercel):**
- TypeScript for type safety
- GraphQL schema with 1 query and 6 mutations
- Firebase Admin SDK for database access
- Firestore transactions for atomic updates
- JWT validation via Firebase Auth

**Data Flow:**
1. **Writes (mutations)** - Client → GraphQL → Validation → Firestore
2. **Reads (subscriptions)** - Firestore → WebSocket → All clients

**Why this architecture:**
- GraphQL provides validated, type-safe writes
- Firestore provides efficient real-time reads
- Works with serverless (no persistent connections needed)
- Simpler than managing custom WebSocket server

**Trade-offs:**
- Not pure GraphQL (hybrid approach)
- Vendor lock-in to Firebase
- Security rules split between GraphQL resolvers and Firestore

**Scaling:**
- Firebase handles connection scaling automatically
- Vercel auto-scales serverless functions
- Could add caching layer with Redis if needed

This architecture meets all Assignment 3 requirements while being practical for a real production deployment."

---

## 📊 Assignment 3 Grade Estimate

### **Must Have (70 points):**
- ✅ Play against 1-3 humans: 10/10
- ✅ Official UNO rules: 10/10
- ✅ Same features as Assignment 2: 10/10
- ✅ User identification: 10/10
- ✅ Create new game: 5/5
- ✅ Join existing game: 5/5
- ✅ Server notifications: 10/10
- ✅ GraphQL communication: 10/10

### **Should Have (20 points):**
- ⚠️ Database tracking: 5/10 (stores during game, not persistent)
- ⚠️ User registration: 0/10 (only anonymous auth)

### **Could Have (10 points):**
- ⚠️ Full game scoring: 0/10

### **Estimated Total: 75-80/100**

**Strengths:**
- ✅ All critical requirements met
- ✅ Clean, type-safe code
- ✅ Proper GraphQL implementation
- ✅ Real-time updates working
- ✅ Good architecture choices

**To improve:**
- Add persistent user accounts
- Implement scoring system across rounds
- Add leaderboard

---

**Good luck on your exam! 🎓🎮**
