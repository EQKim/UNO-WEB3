# Assignment 3: UNO Against Other Players - Complete Exam Study Guide

This comprehensive guide covers **Assignment 3** - implementing an online multiplayer UNO game using Firebase and GraphQL. It demonstrates how to build a real-time multiplayer game with Vue.js, Firebase, and a GraphQL server.

---

## 📋 Assignment 3 Overview

**Goal:** Implement an online UNO game that works in the browser, allowing players to play against each other through a server.

**Key Technologies:**
- **Frontend:** Vue.js 3 (Composition API)
- **Backend Services:** Firebase (Firestore + Authentication)
- **Communication:** GraphQL (Apollo Server on Vercel)
- **Real-time Updates:** Firestore snapshots (not WebSockets)
- **State Management:** Local reactive state (no Redux yet - that's Assignment 5)

---

## ✅ Assignment 3 Requirements

### **Must Have**
- ✅ Allow playing a round of UNO against 1-3 human opponents
- ✅ Play must proceed according to official UNO rules
- ✅ At least the same features as Assignment 2 (local game)
- ✅ Users can identify themselves (display name)
- ✅ Users can create a new game
- ✅ Users can join an existing game
- ✅ Server notifies participants every time something happens
- ✅ Server must use GraphQL as communication protocol

### **Should Have**
- ✅ Server keeps track of players and scores in database (Firestore)
- ✅ Application should implement user registration and login

### **Could Have**
- ⚠️ Allow playing entire game (with score) against 1-3 opponents
- ⚠️ If entire game, server could allow saving/resuming later

### **Implementation Details**
- **Client:** Vue.js (Options or Composition API - we use Composition)
- **Server:** GraphQL server using Apollo Server (deployed to Vercel)
- **Database:** Firestore (NoSQL document database)
- **Authentication:** Firebase Anonymous Authentication

---

## 🏗️ Architecture Overview

### **System Architecture**

```
┌─────────────┐         ┌──────────────┐         ┌────────────┐
│  Vue.js     │         │   GraphQL    │         │  Firebase  │
│  Frontend   │◄───────►│   Server     │◄───────►│  Firestore │
│             │  HTTP   │   (Vercel)   │   SDK   │            │
└─────────────┘         └──────────────┘         └────────────┘
       │                                                 │
       │                                                 │
       └────────────────────────────────────────────────┘
                   Firestore Snapshots
                   (Real-time updates)
```

### **Data Flow**

**Game Action (e.g., Play a Card):**
```
1. User clicks card in Vue component
   ↓
2. Component calls GraphQL mutation (playCard)
   ↓
3. GraphQL server receives mutation
   ↓
4. Server validates request (Firebase Auth token)
   ↓
5. Server updates Firestore using transaction
   ↓
6. Firestore emits snapshot event to all listeners
   ↓
7. Vue components receive updates via onSnapshot
   ↓
8. Components re-render with new data
```

**Why This Architecture:**
- **GraphQL for Mutations:** Type-safe, single endpoint, powerful validation
- **Firestore Snapshots for Queries:** Real-time updates without polling
- **Firestore Transactions:** Ensures data consistency in concurrent multiplayer
- **Anonymous Auth:** Simple user identification without complex login

---

## 🔐 Part 1: Firebase Authentication

### **1A. Firebase Setup**

**File: `src/firebase.ts`**

```typescript
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBewBUk6Oj4PjB6rVr8iVfZ6Zcyqm7CbXs",
  authDomain: "uno-game-e3329.firebaseapp.com",
  projectId: "uno-game-e3329",
  storageBucket: "uno-game-e3329.appspot.com",
  messagingSenderId: "793495202186",
  appId: "1:793495202186:web:705f97f5e200bf41120073"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper: sign in anonymously
export async function ensureAnonAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}
```

**Key Concepts:**

1. **initializeApp(config)** - Connects to Firebase project
2. **getAuth()** - Gets authentication instance
3. **getFirestore()** - Gets Firestore database instance
4. **signInAnonymously()** - Creates temporary user (no password needed)

**Why Anonymous Auth:**
- No registration required
- Each player gets unique ID
- Can send authenticated requests to GraphQL
- User lost on browser clear (acceptable for casual game)

**Exam Tip:** Know the difference between anonymous and email/password auth. Anonymous is perfect for games where you don't need to persist user data long-term.

---

### **1B. Authentication Flow**

**When does authentication happen:**

```typescript
// In Lobby component - onMounted
onMounted(async () => { 
  await ensureAnonAuth();  // ✅ Sign in before any Firebase operation
});

// Result:
// - auth.currentUser.uid is now available
// - Can use this UID to identify player
// - Can get ID token for GraphQL requests
```

**Using UID in the app:**

```typescript
// Get current user ID
const myUid = auth.currentUser?.uid;

// Check if I'm the current turn
const isMyTurn = room.currentTurn === myUid;

// Add player to room with their UID as document ID
await setDoc(doc(db, "rooms", roomId, "players", uid), {
  displayName: "Player 1",
  joinedAt: serverTimestamp()
});
```

**Exam Question:** *"Why use the UID as the document ID in Firestore?"*
- Ensures one player document per user (can't duplicate)
- Easy to query specific player: `rooms/{roomId}/players/{uid}`
- Natural relationship between auth and database

---

## 💾 Part 2: Firestore Database Structure

### **2A. Database Schema**

**Firestore is a NoSQL document database with collections and documents:**

```
Firestore
└── rooms (collection)
    ├── {roomId} (document)
    │   ├── code: "ABC123"
    │   ├── hostUid: "user1"
    │   ├── status: "playing"
    │   ├── currentTurn: "user2"
    │   ├── topCard: { kind: "number", color: "red", value: 5 }
    │   ├── direction: 1
    │   ├── pendingDraw: 2
    │   ├── pendingType: "draw2"
    │   ├── drawPile: [card1, card2, ...]
    │   ├── discardPile: [card1, card2, ...]
    │   ├── winnerUid: null
    │   │
    │   ├── players (subcollection)
    │   │   ├── {userId1} (document)
    │   │   │   ├── displayName: "Alice"
    │   │   │   ├── isHost: true
    │   │   │   ├── handCount: 5
    │   │   │   └── joinedAt: Timestamp
    │   │   └── {userId2} (document)
    │   │       ├── displayName: "Bob"
    │   │       ├── handCount: 7
    │   │       └── joinedAt: Timestamp
    │   │
    │   └── hands (subcollection)
    │       ├── {userId1} (document)
    │       │   └── cards: [card1, card2, ...]
    │       └── {userId2} (document)
    │           └── cards: [card1, card2, ...]
```

**Why This Structure:**
- **Nested Subcollections:** Organize related data (players, hands belong to room)
- **Separate Hands Collection:** Keep private data separate (only owner can read their hand)
- **Document IDs = User IDs:** Natural relationship, prevents duplicates
- **Server Timestamp:** Ensures consistent time across clients

---

### **2B. Firestore Operations**

**Create a Room:**

```typescript
// src/services/Rooms.ts
export async function createRoom(displayName: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();

  // ✅ Create room document
  const roomRef = await addDoc(collection(db, "rooms"), {
    code, 
    hostUid: uid, 
    status: "lobby", 
    createdAt: serverTimestamp()
  });

  // ✅ Add host as first player
  await setDoc(doc(db, "rooms", roomRef.id, "players", uid), {
    displayName, 
    joinedAt: serverTimestamp(), 
    isReady: false, 
    isHost: true, 
    handCount: 0
  });

  return { roomId: roomRef.id, code };
}
```

**Key Functions:**
- `addDoc(collection, data)` - Create document with auto-generated ID
- `setDoc(doc, data)` - Create/update document with specific ID
- `serverTimestamp()` - Use server time (not client time)

**Join a Room:**

```typescript
export async function joinRoomByCode(code: string, displayName: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;

  // ✅ Find room by invite code
  const q = query(collection(db, "rooms"), where("code", "==", code));
  const snap = await getDocs(q);
  if (snap.empty) throw new Error("Room not found");

  const roomId = snap.docs[0].id;
  
  // ✅ Add player to room
  await setDoc(doc(db, "rooms", roomId, "players", uid), {
    displayName, 
    joinedAt: serverTimestamp(), 
    isReady: false, 
    isHost: false, 
    handCount: 0
  }, { merge: true });

  return { roomId };
}
```

**Key Functions:**
- `query(collection, ...constraints)` - Build query
- `where(field, operator, value)` - Filter documents
- `getDocs(query)` - Execute query, get results
- `{ merge: true }` - Update existing fields, don't overwrite entire document

---

### **2C. Real-time Listeners (Snapshots)**

**Listen to Room Updates:**

```typescript
export function listenRoom(
  roomId: string, 
  onRoom: (room: any) => void, 
  onPlayers: (players: any[]) => void
) {
  // ✅ Listen to room document
  const unsub1 = onSnapshot(doc(db, "rooms", roomId), s => 
    onRoom({ id: s.id, ...s.data() })
  );
  
  // ✅ Listen to players subcollection
  const unsub2 = onSnapshot(collection(db, "rooms", roomId, "players"), s =>
    onPlayers(s.docs.map(d => ({ id: d.id, ...d.data() })))
  );
  
  // ✅ Return cleanup function
  return () => { 
    unsub1(); 
    unsub2(); 
  };
}
```

**How Snapshots Work:**
1. `onSnapshot(reference, callback)` - Register listener
2. Callback fires **immediately** with current data
3. Callback fires **every time** data changes
4. Returns unsubscribe function for cleanup

**In Vue Component:**

```typescript
import { onMounted, onUnmounted, ref } from "vue";

const room = ref(null);
const players = ref([]);
let stopListen: (() => void) | null = null;

onMounted(() => {
  stopListen = listenRoom(
    roomId, 
    (r) => room.value = r,        // ✅ Update reactive ref
    (ps) => players.value = ps    // ✅ Update reactive ref
  );
});

onUnmounted(() => {
  if (stopListen) stopListen();  // ✅ Clean up listener
});
```

**Exam Tip:** Always unsubscribe in `onUnmounted` to prevent memory leaks!

---

## 🔄 Part 3: GraphQL Integration

### **3A. What is GraphQL?**

GraphQL is a **query language** for APIs. Unlike REST (multiple endpoints), GraphQL uses a **single endpoint** with typed queries and mutations.

**Comparison:**

| REST | GraphQL |
|------|---------|
| Multiple endpoints (/rooms, /players, /cards) | Single endpoint (/api/graphql) |
| Over-fetching (get all fields) | Request exactly what you need |
| Multiple requests for related data | Single request with nested data |
| Versioning required (v1, v2) | Schema evolution (deprecated fields) |

**GraphQL Schema Example:**

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

type Mutation {
  startGame(roomId: ID!): Boolean!
  playCard(roomId: ID!, card: JSON!): Boolean!
  drawOne(roomId: ID!): Boolean!
  endTurn(roomId: ID!): Boolean!
}
```

**Key Concepts:**
- **Type:** Defines structure of data
- **Field:** Property on a type
- **!:** Non-nullable (required)
- **[Type!]!:** Non-null array of non-null items
- **Mutation:** Operation that changes data (like POST/PUT in REST)

---

### **3B. Making GraphQL Requests**

**File: `src/services/OnlineGame.ts`**

```typescript
const GRAPHQL_URL = "https://uno-graphql-web-3.vercel.app/api/graphql";

/** Helper to call GraphQL with Firebase ID token */
async function gql<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  await ensureAnonAuth();
  const token = await auth.currentUser?.getIdToken();  // ✅ Get Firebase token

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),  // ✅ Send token
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GraphQL HTTP ${res.status} ${res.statusText} ${text}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }
  
  return json.data as T;
}
```

**Key Points:**
- ✅ Always authenticate first (`ensureAnonAuth()`)
- ✅ Get Firebase ID token (`getIdToken()`)
- ✅ Send token in `Authorization` header
- ✅ POST to single endpoint with query + variables
- ✅ Check for HTTP errors AND GraphQL errors

---

### **3C. GraphQL Mutations**

**Start Game:**

```typescript
export async function startGameClient(roomId: string) {
  type R = { startGame: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { 
      startGame(roomId: $roomId) 
    }`,
    { roomId }
  );
}
```

**Play Card:**

```typescript
export async function playCardOnline(roomId: string, card: Card) {
  type R = { playCard: boolean };
  await gql<R>(
    `mutation ($roomId: ID!, $card: JSON!) { 
      playCard(roomId: $roomId, card: $card) 
    }`,
    { roomId, card }
  );
}
```

**Draw Card:**

```typescript
export async function drawOneOnline(roomId: string) {
  type R = { drawOne: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { 
      drawOne(roomId: $roomId) 
    }`,
    { roomId }
  );
}
```

**End Turn:**

```typescript
export async function endTurnOnline(roomId: string) {
  type R = { endTurn: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { 
      endTurn(roomId: $roomId) 
    }`,
    { roomId }
  );
}
```

**Exam Question:** *"Why use GraphQL variables instead of string interpolation?"*
- **Security:** Prevents injection attacks
- **Type Safety:** GraphQL validates variable types
- **Caching:** Same query with different variables can be cached separately
- **Clarity:** Separates query structure from data

---

### **3D. Server-Side GraphQL (Overview)**

**The GraphQL server (deployed to Vercel) handles:**

1. **Authentication:** Verify Firebase token
2. **Validation:** Check game rules (is it player's turn?)
3. **Transactions:** Update Firestore atomically
4. **Game Logic:** Calculate next turn, apply card effects

**Example Mutation Resolver:**

```typescript
async playCard(
  _: unknown, 
  { roomId, card }: { roomId: string; card: Card }, 
  ctx: any
) {
  const uid = ctx.user?.uid;  // ✅ From verified Firebase token
  if (!uid) throw new Error("unauthorized");

  await db.runTransaction(async tx => {
    // ✅ Read current state
    const roomSnap = await tx.get(roomRef);
    const room = roomSnap.data();
    
    // ✅ Validate
    if (room.currentTurn !== uid) throw new Error("Not your turn");
    if (!matches(room.topCard, card)) throw new Error("Illegal play");
    
    // ✅ Update state
    tx.set(roomRef, {
      topCard: card,
      currentTurn: nextPlayer,
      // ... other updates
    }, { merge: true });
  });
  
  return true;
}
```

**Why Transactions:**
- **Atomic:** All updates succeed or all fail
- **Consistent:** Read-modify-write without race conditions
- **Isolated:** Other clients can't see partial updates

---

## 🎮 Part 4: Game Logic

### **4A. Card Matching Rules**

**File: `src/cards/Rules.ts`**

```typescript
export function matches(top: Card, c: Card): boolean {
  // ✅ Wild cards can always be played
  if (c.kind === "wild") return true;

  // ✅ If top is wild with chosen color, match that color
  if (top.kind === "wild") {
    const chosen = top.chosenColor;
    if (!chosen) return true;  // Defensive
    return c.color === chosen;
  }

  // ✅ Number cards: match color OR value
  if (c.kind === "number" && top.kind === "number") {
    return c.color === top.color || c.value === top.value;
  }

  // ✅ Action cards: match color OR action type
  if (c.kind === "action" && top.kind === "action") {
    return c.color === top.color || c.action === top.action;
  }

  // ✅ Mixed kinds (number vs action): match by color
  return c.color === top.color;
}
```

**Official UNO Rules Implemented:**
- ✅ Match by color
- ✅ Match by number (number cards only)
- ✅ Match by action type (action cards only)
- ✅ Wild cards always playable
- ✅ Wild +4 always playable

---

### **4B. Special Card Effects**

**Skip Card:**
```typescript
if (isActionSkip(card)) {
  // Skip the next player
  turnIdx = nextIndex(ids, nIdx, dir);
}
```

**Reverse Card:**
```typescript
if (isActionReverse(card)) {
  dir = -dir;  // Reverse direction
  // With 2 players, reverse acts like skip
  turnIdx = ids.length === 2 ? curIdx : nextIndex(ids, curIdx, dir);
}
```

**Draw 2 Card:**
```typescript
if (isActionDraw2(card)) {
  nextPendingDraw = 2;
  nextPendingType = "draw2";
  turnIdx = nIdx;  // Next player must draw or stack
}
```

**Wild Draw 4 Card:**
```typescript
if (isWildDraw4(card)) {
  nextPendingDraw = 4;
  nextPendingType = "draw4";
  turnIdx = nIdx;  // Next player must draw or stack
}
```

**Number Chaining (Advanced Rule):**
```typescript
// If you play a number card and have another of same value, you can chain
if (card.kind === "number") {
  const val = card.value;
  const stillHasSame = myHand.some(c => c.kind === "number" && c.value === val);
  if (stillHasSame) {
    turnIdx = curIdx;  // Keep your turn
    nextChainValue = val;
    nextChainPlayer = uid;
  } else {
    turnIdx = nIdx;  // Pass turn
  }
}
```

---

### **4C. Draw Card Stacking**

**Stacking +2 cards:**
```typescript
// If pending draw is active, only allow stacking same type
if (pendingDraw > 0) {
  const ok =
    (pendingType === "draw2" && isActionDraw2(card)) ||
    (pendingType === "draw4" && isWildDraw4(card));
  if (!ok) {
    throw new Error(
      `You must draw ${pendingDraw} or stack another ${
        pendingType === "draw2" ? "+2" : "+4"
      }`
    );
  }
}

// When stacking, increase pending draw
if (pendingType === "draw2") nextPendingDraw += 2;
if (pendingType === "draw4") nextPendingDraw += 4;
```

**Drawing penalty cards:**
```typescript
if (pendingDraw > 0) {
  // Draw all penalty cards
  for (let i = 0; i < pendingDraw; i++) {
    myHand.push(drawPile.pop()!);
  }
  
  // Reset penalty and pass turn
  tx.set(roomRef, {
    drawPile,
    currentTurn: nextUid,
    pendingDraw: 0,
    pendingType: null
  }, { merge: true });
}
```

---

## 🎨 Part 5: Vue Components

### **5A. Lobby Component**

**File: `src/ui/Lobby.vue`**

**Responsibilities:**
- Display name input
- Create room button
- Join room by code
- Show room info and player list

**Key Code:**

```typescript
const displayName = ref("Player");
const inviteCode = ref("");
const room = ref(null);
const players = ref([]);

async function onCreate() {
  const { roomId: id, code } = await createRoom(displayName.value || "Player");
  roomId.value = id;
  startListening(id);  // ✅ Start listening to Firestore
  emit("enter-room", { id, host: true });  // ✅ Notify parent
}

async function onJoin() {
  const code = inviteCode.value.trim().toUpperCase();
  const { roomId: id } = await joinRoomByCode(code, displayName.value);
  roomId.value = id;
  startListening(id);
  emit("enter-room", { id, host: false });
}

function startListening(id: string) {
  if (stopListen) stopListen();  // ✅ Clean up old listener
  stopListen = listenRoom(
    id, 
    (r) => room.value = r,
    (ps) => players.value = ps
  );
}
```

**Exam Tip:** Always clean up old listeners before creating new ones to prevent memory leaks!

---

### **5B. OnlineBoard Component**

**File: `src/services/OnlineBoard.vue`**

**Responsibilities:**
- Display game state (top card, current turn, direction)
- Show player's hand
- Handle card clicks (play card)
- Handle draw button
- Handle end turn button
- Show other players

**Key Reactive State:**

```typescript
const room = ref(null);           // Room document
const players = ref([]);          // Players subcollection
const myHand = ref([]);           // My hand from hands subcollection
const pendingWild = ref(null);    // Wild color picker state
const hasDrawnThisTurn = ref(false);  // Client-side flag

// Computed values
const top = computed(() => room.value?.topCard ?? null);
const myUid = computed(() => auth.currentUser?.uid ?? null);
const isMyTurn = computed(() => 
  room.value?.currentTurn === myUid.value && room.value?.status === "playing"
);
```

**Subscription Setup:**

```typescript
onMounted(() => {
  unsubscribe = subscribeOnlineGame(roomId, {
    onRoom: (r) => {
      // ✅ Detect turn change
      const wasMyTurn = room.value?.currentTurn === myUid.value;
      const isNowMyTurn = r?.currentTurn === myUid.value;
      if (!wasMyTurn && isNowMyTurn) {
        hasDrawnThisTurn.value = false;  // Reset draw flag
      }
      room.value = r;
    },
    onPlayers: (ps) => players.value = ps,
    onMyHand: (hand) => myHand.value = hand
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});
```

**Play Card Logic:**

```typescript
async function onPlayCard(c: Card, i: number) {
  if (!cardClickable(c)) return;  // ✅ Check if playable

  // ✅ Wild cards need color choice
  if (c.kind === "wild" && !c.chosenColor) {
    pendingWild.value = { index: i, card: c };
    return;
  }

  try {
    await playCardOnline(roomId, c);  // ✅ GraphQL mutation
  } catch (e: any) {
    alert(e?.message ?? String(e));
  }
}

async function playChosenWild(color: Color) {
  const pw = pendingWild.value;
  if (!pw) return;
  
  const toPlay = { ...pw.card, chosenColor: color };  // ✅ Add chosen color
  await playCardOnline(roomId, toPlay);
  pendingWild.value = null;  // ✅ Close picker
}
```

**Card Clickable Logic:**

```typescript
function cardClickable(c: Card) {
  if (!isMyTurn.value) return false;
  
  // During pending draw, only allow stacking
  if (pendingType.value) return canStackSame(c);
  
  // During chaining, only allow same numbers
  if (chainingActive.value) {
    return c.kind === "number" && c.value === room.value?.chainValue;
  }
  
  // Normal play: must match top card
  return !!top.value && matches(top.value, c);
}
```

---

## 🔧 Part 6: Advanced Features

### **6A. Number Chaining**

**What it is:** If you play a number card and have another card with the same number, you can play it immediately (keep your turn).

**Implementation:**

**Server tracks:**
```typescript
chainValue: number | null      // The number being chained (e.g., 7)
chainPlayer: string | null     // Who is chaining
```

**When playing a number card:**
```typescript
if (card.kind === "number") {
  const val = card.value;
  const stillHasSame = myHand.some(c => c.kind === "number" && c.value === val);
  
  if (stillHasSame) {
    // ✅ Player can continue chaining
    turnIdx = curIdx;  // Keep current player's turn
    nextChainValue = val;
    nextChainPlayer = uid;
  } else {
    // ✅ No more of this number, end chain
    turnIdx = nIdx;  // Pass to next player
    nextChainValue = null;
    nextChainPlayer = null;
  }
}
```

**Client UI:**
```typescript
const chainingActive = computed(() => 
  room.value?.chainPlayer === myUid.value && 
  room.value?.chainValue !== null
);

// Show "End Turn" button during chain
<button v-if="chainingActive" @click="onEndTurn">
  End Turn
</button>
```

---

### **6B. Wild Card Color Picker**

**Challenge:** When player plays wild card, they must choose a color.

**Solution: Two-step process**

```typescript
// Step 1: User clicks wild card
const pendingWild = ref(null);

async function onPlayCard(c: Card, i: number) {
  if (c.kind === "wild" && !c.chosenColor) {
    pendingWild.value = { index: i, card: c };  // ✅ Show picker
    return;  // Don't send to server yet
  }
  // ... play card normally
}

// Step 2: User chooses color
async function playChosenWild(color: Color) {
  const pw = pendingWild.value;
  const toPlay = { ...pw.card, chosenColor: color };  // ✅ Add color
  await playCardOnline(roomId, toPlay);  // ✅ Now send to server
  pendingWild.value = null;  // ✅ Close picker
}
```

**UI:**
```vue
<div v-if="pendingWild">
  <h3>Choose a color:</h3>
  <button @click="playChosenWild('red')">Red</button>
  <button @click="playChosenWild('yellow')">Yellow</button>
  <button @click="playChosenWild('green')">Green</button>
  <button @click="playChosenWild('blue')">Blue</button>
  <button @click="pendingWild = null">Cancel</button>
</div>
```

---

### **6C. Draw Restrictions**

**Rules:**
1. If you have playable cards, you can't draw (must play)
2. After drawing, you can't draw again this turn
3. If you draw and still can't play, you can end turn

**Implementation:**

```typescript
const hasDrawnThisTurn = ref(false);  // Client-side flag

const youHavePlayable = computed(() => {
  if (!top.value) return false;
  
  // During pending draw, only counter cards are playable
  if (pendingType.value) {
    if (pendingType.value === "draw2") {
      return myHand.value.some(c => c.kind === "action" && c.action === "draw2");
    }
    if (pendingType.value === "draw4") {
      return myHand.value.some(c => c.kind === "wild" && c.action === "wildDraw4");
    }
    return false;
  }
  
  // Normal: any matching card OR wild
  return myHand.value.some(c => c.kind === "wild" || matches(top.value, c));
});

// Draw button disabled if:
// - Not your turn
// - You have playable cards (and no pending draw)
// - Already drew this turn
<button
  @click="onDraw"
  :disabled="!isMyTurn || (youHavePlayable && !pendingDrawInfo) || hasDrawnThisTurn"
>
  Draw Card
</button>

async function onDraw() {
  await drawOneOnline(roomId);
  hasDrawnThisTurn.value = true;  // ✅ Prevent drawing again
}

// Reset flag when turn changes
onMounted(() => {
  unsubscribe = subscribeOnlineGame(roomId, {
    onRoom: (r) => {
      const wasMyTurn = room.value?.currentTurn === myUid.value;
      const isNowMyTurn = r?.currentTurn === myUid.value;
      if (!wasMyTurn && isNowMyTurn) {
        hasDrawnThisTurn.value = false;  // ✅ Reset on new turn
      }
      room.value = r;
    },
    // ...
  });
});
```

---

## 🐛 Part 7: Common Issues & Solutions

### **Issue 1: CORS Errors**

**Problem:**
```
Access to fetch at 'https://...' from origin 'http://localhost:5173' 
has been blocked by CORS policy
```

**Cause:** GraphQL server doesn't allow your origin

**Solution:** Update server CORS configuration
```typescript
// In GraphQL server
cors: {
  origin: ["http://localhost:5173", "https://eqkim.github.io"],
  credentials: false
}
```

---

### **Issue 2: "Not your turn" error when it IS your turn**

**Problem:** Server says "Not your turn" even though UI shows it's your turn

**Cause:** Race condition - Firestore snapshot arrives before GraphQL response

**Solution:** Always check `isMyTurn` before allowing actions
```typescript
async function onPlayCard(c: Card) {
  if (!isMyTurn.value) return;  // ✅ Double-check
  await playCardOnline(roomId, c);
}
```

---

### **Issue 3: Player stuck after drawing penalty cards**

**Problem:** After drawing +2/+4 cards, player can't do anything

**Cause:** Server auto-advances turn, but client `hasDrawnThisTurn` flag still true

**Solution:** Reset flag when turn changes (see 6C above)

---

### **Issue 4: Memory leaks from Firestore listeners**

**Problem:** Browser slows down, memory usage increases

**Cause:** Not unsubscribing from Firestore snapshots

**Solution:** Always unsubscribe in `onUnmounted`
```typescript
let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = subscribeOnlineGame(roomId, { ... });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();  // ✅ Clean up
});
```

---

## 🎓 Exam Questions & Answers

### **Q1: What's the difference between Firestore and a traditional SQL database?**

**SQL:**
- Relational (tables with rows/columns)
- Strict schema
- Joins for related data
- ACID transactions
- Example: PostgreSQL, MySQL

**Firestore:**
- NoSQL (collections of documents)
- Flexible schema (each document can have different fields)
- Nested subcollections for related data
- Real-time snapshots
- Transactions available but different
- Example: Our UNO game database

**When to use Firestore:**
- Real-time updates required
- Flexible/evolving schema
- Mobile/web apps
- Offline support needed

---

### **Q2: Why use GraphQL instead of REST?**

**REST Limitations:**
- Multiple endpoints needed (/rooms, /players, /cards)
- Over-fetching (get all data even if you need one field)
- Under-fetching (need multiple requests for related data)
- Versioning complexity

**GraphQL Advantages:**
- Single endpoint
- Request exactly what you need
- Nested queries in one request
- Type system (schema)
- Better developer experience

**Our Implementation:**
- Mutations for writes (startGame, playCard, drawOne, endTurn)
- Firestore snapshots for reads (real-time updates)
- Best of both worlds!

---

### **Q3: Explain the Firebase authentication flow**

```
1. App loads
   ↓
2. Call ensureAnonAuth()
   ↓
3. Check if auth.currentUser exists
   ↓ (if not)
4. Call signInAnonymously(auth)
   ↓
5. Firebase creates temporary user
   ↓
6. auth.currentUser.uid now available
   ↓
7. Use UID for:
   - Player identification
   - Firestore security rules
   - GraphQL authentication
   ↓
8. Get ID token: auth.currentUser.getIdToken()
   ↓
9. Send token in GraphQL request header
   ↓
10. Server verifies token, extracts UID
```

---

### **Q4: How do Firestore snapshots provide real-time updates?**

**Traditional Polling (BAD):**
```typescript
// Check every 1 second for updates
setInterval(async () => {
  const room = await fetchRoom(roomId);
  updateUI(room);
}, 1000);
```
Problems: Wasteful, delayed updates, server load

**Firestore Snapshots (GOOD):**
```typescript
onSnapshot(doc(db, "rooms", roomId), (snapshot) => {
  const room = snapshot.data();
  updateUI(room);  // ✅ Called instantly when data changes
});
```
Benefits:
- Instant updates (< 1 second latency)
- No polling overhead
- Only sends deltas (changed fields)
- Works offline (local cache)

---

### **Q5: What are Firestore transactions and why use them?**

**Without Transaction (RACE CONDITION):**
```typescript
// Player A and B both try to play a card at same time

// Player A:
const room = await getDoc(roomRef);  // currentTurn: "A"
if (room.currentTurn === "A") {
  await updateDoc(roomRef, { currentTurn: "B" });  // ✅ Success
}

// Player B (at same time):
const room = await getDoc(roomRef);  // currentTurn: "A" (old data!)
if (room.currentTurn === "B") {
  await updateDoc(roomRef, { currentTurn: "C" });  // ❌ Should fail but doesn't!
}

// Result: Both think they succeeded!
```

**With Transaction (SAFE):**
```typescript
await runTransaction(db, async (tx) => {
  const room = await tx.get(roomRef);  // ✅ Locked read
  if (room.currentTurn === "A") {
    tx.update(roomRef, { currentTurn: "B" });  // ✅ Atomic update
  }
});
```

**How it works:**
1. Transaction starts
2. Read data (locked)
3. Validate + compute updates
4. Commit (all succeed or all fail)
5. If conflict, retry automatically

---

### **Q6: Explain the two-layer architecture (GraphQL + Firestore snapshots)**

**Writes (Mutations) → GraphQL:**
```
User clicks "Play Card"
    ↓
playCardOnline(roomId, card)  // GraphQL mutation
    ↓
GraphQL server
    ↓
Validates (is it your turn? is card legal?)
    ↓
Firestore transaction (atomic update)
```

**Reads (Queries) → Firestore Snapshots:**
```
Component mounts
    ↓
subscribeOnlineGame(roomId, handlers)
    ↓
onSnapshot listeners registered
    ↓
Firestore automatically sends updates
    ↓
Handlers update local state
    ↓
Vue reactivity updates UI
```

**Why not use GraphQL for reads too?**
- Firestore snapshots are more efficient for real-time data
- No need to poll
- Offline support
- Lower latency
- GraphQL subscriptions are complex to set up

---

## 📚 Quick Reference

### **Firestore Operations**

```typescript
// Create with auto ID
const ref = await addDoc(collection(db, "rooms"), { ... });

// Create/update with specific ID
await setDoc(doc(db, "rooms", "abc123"), { ... });

// Merge (update without overwriting)
await setDoc(doc(db, "rooms", "abc123"), { ... }, { merge: true });

// Query
const q = query(collection(db, "rooms"), where("status", "==", "playing"));
const snap = await getDocs(q);

// Real-time listener
const unsub = onSnapshot(doc(db, "rooms", "abc123"), (s) => {
  console.log(s.data());
});

// Cleanup
unsub();
```

### **GraphQL Mutations**

```typescript
const result = await gql<{ mutation: boolean }>(
  `mutation ($var: Type!) {
    mutation(arg: $var)
  }`,
  { var: value }
);
```

### **Vue Composition API**

```typescript
// Reactive state
const count = ref(0);
const obj = ref({ a: 1 });

// Computed value
const double = computed(() => count.value * 2);

// Lifecycle
onMounted(() => { ... });
onUnmounted(() => { ... });

// Watch
watch(() => count.value, (newVal, oldVal) => { ... });
```

---

## ✅ Assignment 3 Compliance Checklist

| Requirement | Status | Implementation |
|-------------|--------|----------------|
| Play UNO against 1-3 players | ✅ | Multiplayer lobby + game board |
| Official UNO rules | ✅ | `Rules.ts`, server validation |
| Features from Assignment 2 | ✅ | Card matching, special cards |
| User identification | ✅ | Display name + Firebase Anonymous Auth |
| Create new game | ✅ | `createRoom()` in Rooms.ts |
| Join existing game | ✅ | `joinRoomByCode()` with invite code |
| Server notifications | ✅ | Firestore snapshots (real-time) |
| GraphQL protocol | ✅ | All mutations use GraphQL |
| Database tracking | ✅ | Firestore stores rooms, players, hands |
| User registration/login | ⚠️ | Anonymous auth (simplified) |

---

## 🎯 Study Tips for Exam

### **Topics to Master:**

1. **Firebase Auth:**
   - Anonymous authentication flow
   - Getting ID tokens
   - Using UID for identification

2. **Firestore:**
   - Document/collection structure
   - CRUD operations (addDoc, setDoc, getDocs)
   - Queries (where, query)
   - Real-time listeners (onSnapshot)
   - Transactions (runTransaction)

3. **GraphQL:**
   - Schema (types, fields, mutations)
   - Making requests (query + variables)
   - Authentication (Bearer token)
   - Error handling

4. **Vue Composition API:**
   - ref, reactive, computed
   - onMounted, onUnmounted
   - Template syntax (v-if, v-for, @click)

5. **Game Architecture:**
   - Two-layer (GraphQL writes, Firestore reads)
   - Client-side state vs server state
   - Race conditions and transactions

### **Practice Questions:**

1. Write code to create a Firestore document
2. Write code to listen to real-time updates
3. Write a GraphQL mutation call
4. Explain why transactions are needed
5. Describe the authentication flow
6. Compare GraphQL vs REST

---

## 🎉 Summary

Your Assignment 3 implementation demonstrates:

- ✅ **Real-time Multiplayer:** Using Firestore snapshots
- ✅ **Modern API:** GraphQL for type-safe mutations
- ✅ **Secure Authentication:** Firebase Anonymous Auth
- ✅ **Reactive UI:** Vue.js Composition API
- ✅ **Data Consistency:** Firestore transactions
- ✅ **Official UNO Rules:** All special cards implemented
- ✅ **Advanced Features:** Number chaining, draw stacking

**You've built a production-ready multiplayer card game!** 🎮🔥

Good luck on your exam! 🍀
