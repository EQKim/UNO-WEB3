# Assignment 1 - Exam Study Guide
**TypeScript Type System & OO Programming in UNO Implementation**

---

## 📚 Exam Topics Coverage

### 1️⃣ Elements of the TypeScript Type System

#### **Discriminated Unions**
Location: [`src/cards/Card.ts`](src/cards/Card.ts)

```typescript
export type Card = NumberCard | ActionCard | WildCard;
```

- Uses `kind` property as discriminant: `"number"`, `"action"`, `"wild"`
- Enables type narrowing with `if (card.kind === "number")`
- TypeScript knows exact shape after checking `kind`

**Example in action:**
```typescript
// In src/cards/Rules.ts - matches() function
if (card.kind === "wild") {
  // TypeScript knows: card is WildCard
  return card.chosenColor === top.color;
}
```

**Why discriminated unions are powerful:**
- Exhaustive checking: TypeScript ensures you handle all cases
- No runtime overhead: Pure compile-time type safety
- Better than enums + separate data structures

---

#### **Utility Types**
Location: [`src/cards/Card.ts`](src/cards/Card.ts)

```typescript
export type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;
```

- **`Extract<T, U>`**: Filters union to matching types
- **Generic constraint**: `K extends Card["kind"]` limits to valid kinds
- **Usage**: `TypedCard<"number">` returns only `NumberCard`

**Real usage in codebase:**
```typescript
// In src/core/Round.ts
const playableCards = hand.findPlayable(
  (c): c is TypedCard<"wild"> => c.kind === "wild"
);
```

**Other utility types demonstrated:**

1. **`Readonly<T>` and `readonly` modifier:**
```typescript
// In Hand.ts
cards(): readonly Card[] {
  return this._cards;
}
```

2. **`Record<K, V>` for type-safe objects:**
```typescript
// In Round.ts
export interface RoundSnapshot {
  playerHandSizes: Record<string, number>; // Maps player names to hand sizes
}
```

3. **Index access types:**
```typescript
// Extracting property types from existing types
type CardKind = Card["kind"]; // "number" | "action" | "wild"
type CardColor = NumberCard["color"]; // "red" | "blue" | "green" | "yellow"
```

---

#### **Type Narrowing & Type Guards**

**1. Built-in type narrowing (typeof, instanceof):**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
// typeof narrowing
if (typeof pendingDraw === "number" && pendingDraw > 0) {
  // TypeScript knows pendingDraw is number here
}
```

**2. Discriminated union narrowing:**
Location: [`src/cards/Rules.ts`](src/cards/Rules.ts)

```typescript
export function matches(card: Card, top: Card): boolean {
  if (card.kind === "wild") {
    // card is narrowed to WildCard
    if (card.action === "wildDraw4") {
      // Further narrowing to specific wild type
    }
  } else if (card.kind === "number") {
    // card is narrowed to NumberCard
    return card.color === topColor(top) || card.value === (top as NumberCard).value;
  }
}
```

**3. User-defined type guards:**
Location: [`src/core/Hand.ts`](src/core/Hand.ts)

```typescript
// Type predicate: (c): c is TypedCard<"wild">
findPlayable(predicate: (card: Card) => boolean): Card[] {
  return this._cards.filter(predicate);
}

// Usage with type guard
const wilds = hand.findPlayable(
  (c): c is TypedCard<"wild"> => c.kind === "wild"
);
// TypeScript knows wilds is WildCard[]
```

**4. Truthiness narrowing:**
```typescript
// In demo.ts
const cardToDraw = deck.peekTop();
if (cardToDraw) {
  // cardToDraw is narrowed from Card | undefined to Card
  console.log(`Drew: ${cardToDraw.kind}`);
}
```

---

#### **Immutability (Readonly)**

**1. Readonly modifier on return types:**
Location: [`src/core/Hand.ts`](src/core/Hand.ts)

```typescript
private _cards: Card[] = [];

cards(): readonly Card[] {
  return this._cards; // Returns readonly view
}
```

**Benefits:**
- Private mutable array `_cards`
- Public readonly accessor prevents external mutation
- Enforces encapsulation - callers cannot modify internal state

**2. Readonly properties:**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
export class Round {
  private readonly playerNames: string[];
  private readonly hands: Map<string, Hand>;
  
  constructor(playerNames: string[]) {
    this.playerNames = [...playerNames]; // Defensive copy
    this.hands = new Map(
      playerNames.map(name => [name, new PlayerHand()])
    );
  }
}
```

**3. Const assertions for literal types:**
Location: [`src/cards/Card.ts`](src/cards/Card.ts)

```typescript
export const COLORS = ["red", "blue", "green", "yellow"] as const;
export type Color = typeof COLORS[number]; // "red" | "blue" | "green" | "yellow"
```

---

#### **Type Casting & Narrowing**
Location: [`src/cards/Rules.ts`](src/cards/Rules.ts)

**Best practice: Avoid `as` casting, use narrowing:**
```typescript
export function matches(card: Card, top: Card): boolean {
  if (card.kind === "wild") {
    // TypeScript narrows card to WildCard here - no casting needed!
    if (card.action === "wildDraw4") {
      return top.kind === "wild" && top.action === "wildDraw4";
    }
    return card.chosenColor === undefined || card.chosenColor === topColor(top);
  }
  
  if (card.kind === "number" && top.kind === "number") {
    // Both narrowed to NumberCard
    return card.color === top.color || card.value === top.value;
  }
}
```

**When `as` casting is acceptable:**
```typescript
// Safe because we've already type-checked
const topCardColor = topColor(top); // Helper function uses 'as' internally
```

**Unsafe casting (avoid):**
```typescript
// ❌ Bad: Forces type without validation
const card = someValue as NumberCard;

// ✅ Good: Validate first
if (isNumberCard(someValue)) {
  const card = someValue; // TypeScript knows it's NumberCard
}
```

---

#### **Type Manipulations**
Location: [`src/cards/Card.ts`](src/cards/Card.ts)

**1. Union types:**
```typescript
export type Color = "red" | "blue" | "green" | "yellow";
export type NumberValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type ActionType = "skip" | "reverse" | "draw2";
export type WildAction = "wild" | "wildDraw4";
```

**2. Intersection types:**
```typescript
// Example: Card with metadata
type TrackedCard = Card & { playedBy: string; timestamp: number };
```

**3. Conditional types:**
```typescript
// Extract cards that have a color property
type ColoredCard = Extract<Card, { color: Color }>; // NumberCard | ActionCard
type ColorlessCard = Exclude<Card, { color: Color }>; // WildCard
```

**4. Mapped types:**
```typescript
// Create readonly version of an object
type ReadonlySnapshot = {
  readonly [K in keyof RoundSnapshot]: RoundSnapshot[K];
};
```

**5. Template literal types:**
```typescript
// Not used in this codebase, but exam-relevant:
type CardString = `${Color}_${NumberValue}`; // "red_0" | "blue_5" | etc.
```

**6. Index access types:**
```typescript
// Extracting type from union
export type Type = Card["kind"]; // "number" | "action" | "wild"

// Getting property types
type AllColors = NumberCard["color"]; // Color
type AllActions = ActionCard["action"] | WildCard["action"];
```

---

### 2️⃣ Function of TypeScript Utility Types

#### **Extract<T, U>**
Location: [`src/cards/Card.ts`](src/cards/Card.ts)

```typescript
export type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;

// Usage examples:
TypedCard<"number">  // → NumberCard
TypedCard<"action">  // → ActionCard
TypedCard<"wild">    // → WildCard
```

**How Extract works:**
```typescript
// Extract gets types from T that are assignable to U
type Example = Extract<"a" | "b" | "c", "a" | "c">; // "a" | "c"

// Our usage: Extract cards matching { kind: K }
type NumberCards = Extract<Card, { kind: "number" }>; // NumberCard
```

**Why it matters:**
- Filters a union type to matching members
- Type-safe card filtering without runtime overhead
- Compiler validates at build time

---

#### **Exclude<T, U>**

**Not used in codebase, but exam-relevant:**
```typescript
// Exclude removes types from T that are assignable to U
type NonWildCard = Exclude<Card, { kind: "wild" }>; // NumberCard | ActionCard
type NonNumberCard = Exclude<Card, { kind: "number" }>; // ActionCard | WildCard
```

---

#### **Pick<T, K>**

**Example usage for API responses:**
```typescript
// If we only want to send specific snapshot fields to frontend:
type PublicSnapshot = Pick<RoundSnapshot, "currentPlayer" | "topCard" | "playerHandSizes">;

// Excludes: history, deck state, internal counters
```

---

#### **Omit<T, K>**

**Example for data sanitization:**
```typescript
// Remove sensitive internal data before sending to client
type PublicRound = Omit<Round, "deck" | "hands">;

// Or create card without internal metadata
type PublicCard = Omit<NumberCard, "internalTrackingId">;
```

---

#### **Partial<T>**

**Making all properties optional:**
```typescript
// For update operations
type RoundUpdate = Partial<RoundSnapshot>;

// Allows updating only specific fields:
const update: RoundUpdate = {
  pendingDraw: 2, // Only update this field
  // Other fields remain unchanged
};
```

---

#### **Required<T>**

**Making all properties required:**
```typescript
// Ensure all fields are provided
type CompleteSnapshot = Required<RoundSnapshot>;

// Forces providing every field, even optional ones
```

---

#### **Readonly<T> (Built-in)**
Location: [`src/core/Hand.ts`](src/core/Hand.ts)

```typescript
cards(): readonly Card[] {
  return this._cards;
}

// Alternative: using Readonly<T> utility
type ImmutableHand = Readonly<Hand>;
```

**Deep readonly (not built-in, but exam-relevant):**
```typescript
type DeepReadonly<T> = {
  readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
```

Prevents:
```typescript
const myHand = new PlayerHand();
const cards = myHand.cards();
cards.push(someCard); // ❌ TypeScript Error: readonly
```

---

#### **Record<K, V>**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
export interface RoundSnapshot {
  playerHandSizes: Record<string, number>; // Maps player name → hand size
}

// Equivalent to:
// { [key: string]: number }

// But more expressive and type-safe
```

**Usage example:**
```typescript
const scores: Record<string, number> = {
  "Kim": 10,
  "Bob": 25,
  "Ada": 5
};
```

---

#### **ReturnType<T>**

**Extracting return type from functions:**
```typescript
// Get the return type of snapshot()
type SnapshotResult = ReturnType<typeof Round.prototype.snapshot>;
// → RoundSnapshot

// Useful when return type is complex or changes
```

---

#### **Parameters<T>**

**Extracting parameter types:**
```typescript
// Get the parameter types of takeTurn()
type TakeTurnParams = Parameters<typeof Round.prototype.takeTurn>;
// → [player: string, cardIndex?: number]
```

---

#### **NonNullable<T>**

**Removing null and undefined:**
```typescript
type CardOrNull = Card | null | undefined;
type DefiniteCard = NonNullable<CardOrNull>; // Card

// Used in array operations
const validCards: NonNullable<Card | undefined>[] = cards.filter(c => c !== undefined);
```

---

### 3️⃣ Apply OO Programming in TypeScript

#### **Interfaces & Implementations**
Location: [`src/core/Deck.ts`](src/core/Deck.ts)

```typescript
export interface Deck {
  draw(n: number): Card[];
  size(): number;
  refill(cards: Card[], shuffle?: boolean): void;
  peekTop(): Card | undefined;
}

export class StandardDeck implements Deck {
  private cards: Card[] = [];
  
  constructor() {
    this.cards = this.createFullDeck();
    this.shuffle();
  }
  
  draw(n: number): Card[] {
    return this.cards.splice(0, n);
  }
  
  size(): number {
    return this.cards.length;
  }
  
  refill(cards: Card[], shuffle = true): void {
    this.cards.push(...cards);
    if (shuffle) this.shuffle();
  }
  
  peekTop(): Card | undefined {
    return this.cards[0];
  }
  
  private shuffle(): void {
    // Fisher-Yates shuffle algorithm
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }
  
  private createFullDeck(): Card[] {
    // Creates standard 108-card UNO deck
    // ...
  }
}
```

**Benefits:**
- **Contract-based design**: Interface defines what, class defines how
- **Easy to mock for testing**: Create `MockDeck implements Deck`
- **Substitutability**: Can swap implementations without changing client code
- **Documentation**: Interface serves as clear API documentation

**Alternative implementations (exam examples):**
```typescript
class PredictableDeck implements Deck {
  // For testing: returns cards in specific order
}

class InfiniteDeck implements Deck {
  // Never runs out of cards
}

class CheatDeck implements Deck {
  // Always gives you perfect cards
}
```

---

#### **Encapsulation**
Location: [`src/core/Hand.ts`](src/core/Hand.ts)

```typescript
export class PlayerHand implements Hand {
  private _cards: Card[] = []; // Private state - cannot access from outside

  // Public readonly access
  cards(): readonly Card[] {
    return this._cards;
  }

  // Controlled mutation through public methods
  add(card: Card): void {
    this._cards.push(card);
  }

  removeAt(index: number): Card {
    if (index < 0 || index >= this._cards.length) {
      throw new Error(`Invalid card index: ${index}`);
    }
    const [removed] = this._cards.splice(index, 1);
    return removed;
  }
  
  size(): number {
    return this._cards.length;
  }
  
  isEmpty(): boolean {
    return this._cards.length === 0;
  }
  
  findPlayable(predicate: (card: Card) => boolean): Card[] {
    return this._cards.filter(predicate);
  }
}
```

**Encapsulation principles demonstrated:**
1. **Private state**: `private _cards` - internal implementation hidden
2. **Public interface**: Methods control how state is accessed/modified
3. **Validation**: `removeAt()` validates index before mutation
4. **Immutable reads**: `cards()` returns readonly view
5. **Controlled writes**: Only through `add()` and `removeAt()`

**Why encapsulation matters:**
```typescript
// ❌ Without encapsulation:
hand._cards.push(someCard); // Direct manipulation
hand._cards = []; // Could break invariants

// ✅ With encapsulation:
hand.add(someCard); // Controlled through public API
// hand._cards = []; // ❌ TypeScript error: private property
```

---

#### **Inheritance (Not used, but exam-relevant)**

**TypeScript supports class inheritance:**
```typescript
// Base class
abstract class GameEntity {
  protected id: string;
  protected createdAt: Date;
  
  constructor(id: string) {
    this.id = id;
    this.createdAt = new Date();
  }
  
  abstract validate(): boolean;
}

// Derived class
class Player extends GameEntity {
  private hand: Hand;
  
  constructor(id: string, name: string) {
    super(id); // Call parent constructor
    this.hand = new PlayerHand();
  }
  
  validate(): boolean {
    return this.hand.size() >= 0;
  }
}
```

**Why we prefer composition over inheritance in this codebase:**
- More flexible: Can mix behaviors from multiple sources
- Easier to test: Mock dependencies individually
- Avoids "diamond problem" and deep inheritance hierarchies
- Clearer dependencies: Explicit in constructor

---

#### **Class Composition**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
export class Round {
  // Composed objects - "has-a" relationships
  private deck: Deck;                    // Round has a Deck
  private hands: Map<string, Hand>;       // Round has Hands
  private discardPile: Card[] = [];
  private currentPlayerIndex: number = 0;
  private pendingDraw: number = 0;
  private direction: 1 | -1 = 1;
  private readonly playerNames: string[];
  private history: HistoryEntry[] = [];

  constructor(playerNames: string[]) {
    // Creates dependencies - composition happens here
    this.deck = new StandardDeck();       
    this.hands = new Map(
      playerNames.map(name => [name, new PlayerHand()])
    );
    this.playerNames = [...playerNames]; // Defensive copy
    this.dealInitialHands();
    this.startGame();
  }
  
  // Round orchestrates composed objects
  play(player: string, cardIndex: number, chosenColor?: Color): void {
    const hand = this.hands.get(player)!; // Access composed Hand
    const card = hand.removeAt(cardIndex); // Delegate to Hand
    this.discardPile.push(card); // Update own state
    this.applyCardEffect(card, chosenColor); // Orchestrate game logic
  }
  
  draw(player: string, count: number): Card[] {
    const hand = this.hands.get(player)!;
    const cards = this.drawWithReshuffle(count); // Use composed Deck
    cards.forEach(c => hand.add(c)); // Delegate to Hand
    return cards;
  }
  
  private drawWithReshuffle(count: number): Card[] {
    const drawn: Card[] = [];
    for (let i = 0; i < count; i++) {
      if (this.deck.size() === 0) {
        this.reshuffleDiscardIntoDeck(); // Orchestrate Deck behavior
      }
      const cards = this.deck.draw(1);
      if (cards.length > 0) drawn.push(cards[0]);
    }
    return drawn;
  }
}
```

**OO Principle:** "Has-a" relationship (composition) vs "Is-a" (inheritance)

**Benefits of composition:**
- **Flexibility**: Can swap out Deck or Hand implementations
- **Testability**: Mock `Deck` or `Hand` independently
- **Single Responsibility**: Each class focuses on one thing
- **Loose coupling**: Round depends on interfaces, not concrete classes

---

#### **Abstraction**
Location: [`src/core/Deck.ts`](src/core/Deck.ts) and [`src/core/Hand.ts`](src/core/Hand.ts)

```typescript
// Abstract interface - defines "what" not "how"
export interface Deck {
  draw(n: number): Card[];
  size(): number;
  refill(cards: Card[], shuffle?: boolean): void;
  peekTop(): Card | undefined;
}

// Concrete implementation - defines "how"
export class StandardDeck implements Deck {
  // Implementation details hidden behind interface
}
```

**Abstraction levels in codebase:**

1. **High level (Round)**: Game orchestration
   - Doesn't care HOW cards are drawn
   - Just calls `deck.draw(n)`

2. **Medium level (Deck/Hand)**: Data structure management
   - Doesn't care HOW cards are represented
   - Just stores and retrieves `Card` objects

3. **Low level (Card types)**: Data representation
   - Pure data structures
   - No behavior, just shape

---

#### **Polymorphism**

**Interface polymorphism:**
```typescript
// Different Deck implementations can be used interchangeably
function playGame(deck: Deck) {
  const cards = deck.draw(7); // Works with ANY Deck implementation
  // ...
}

const standardDeck = new StandardDeck();
const testDeck = new PredictableDeck();

playGame(standardDeck); // ✅ Works
playGame(testDeck);     // ✅ Also works
```

**Type polymorphism (generics):**
```typescript
// TypedCard is polymorphic over K
type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;

// Same type, different shapes depending on K
const numberCard: TypedCard<"number"> = { kind: "number", color: "red", value: 5 };
const wildCard: TypedCard<"wild"> = { kind: "wild", action: "wild" };
```

---

#### **Single Responsibility Principle (SRP)**

Each class has one clear job:

| Class | Responsibility | What it does | What it doesn't do |
|-------|----------------|--------------|-------------------|
| [`Card.ts`](src/cards/Card.ts) | Type definitions | Define card shapes | No validation or game logic |
| [`Rules.ts`](src/cards/Rules.ts) | Card matching logic | Determine if cards match | No game state management |
| [`Deck.ts`](src/core/Deck.ts) | Draw pile management | Store, shuffle, draw cards | No discard pile, no hands |
| [`Hand.ts`](src/core/Hand.ts) | Player hand management | Store player's cards | No game rules or effects |
| [`Round.ts`](src/core/Round.ts) | Game flow orchestration | Coordinate game state | No UI, no card definitions |
| [`demo.ts`](src/core/demo.ts) | Simulation & logging | Run AI games, display logs | No game logic |

**Example of SRP:**
```typescript
// ✅ Good: Each function has one job
function matches(card: Card, top: Card): boolean {
  // Only checks if cards match
}

function applyCardEffect(card: Card): void {
  // Only applies card effects to game state
}

// ❌ Bad: Function does too much
function playCardAndCheckWinnerAndLog(card: Card, player: string): void {
  // Plays card, checks winner, logs - violates SRP
}
```

---

#### **Dependency Injection (Exam concept)**

**Our codebase uses constructor injection:**
```typescript
export class Round {
  constructor(playerNames: string[]) {
    // Dependencies created internally (tight coupling)
    this.deck = new StandardDeck();
    this.hands = new Map(/*...*/);
  }
}
```

**Better approach for testing (dependency injection):**
```typescript
export class Round {
  constructor(
    playerNames: string[],
    deck: Deck = new StandardDeck(), // Inject dependency
    handFactory: () => Hand = () => new PlayerHand() // Inject factory
  ) {
    this.deck = deck;
    this.hands = new Map(
      playerNames.map(name => [name, handFactory()])
    );
  }
}

// Usage:
const mockDeck = new MockDeck();
const round = new Round(["Kim", "Bob"], mockDeck); // Inject for testing
```

---

### 4️⃣ Design & Implement Web Application

#### **Architecture Patterns**

**1. Model-View-Controller (MVC) Separation**
```
src/
├── cards/       ← Model: Data types & rules
│   ├── Card.ts      (Data definitions)
│   └── Rules.ts     (Business logic)
├── core/        ← Controller: Game engine
│   ├── Round.ts     (Game state management)
│   ├── Deck.ts      (Data management)
│   ├── Hand.ts      (Data management)
│   └── demo.ts      (Controller logic)
└── (future)
    ├── api/     ← Controller: HTTP/GraphQL layer
    └── ui/      ← View: React components
```

**Benefits:**
- **Separation of concerns**: Each layer has distinct responsibility
- **Testability**: Can test model without UI
- **Reusability**: Same model/controller for CLI, web, mobile
- **Maintainability**: Changes to UI don't affect game logic

---

#### **Technique 1: Type-Safe State Management**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
export interface RoundSnapshot {
  currentPlayer: string;
  topCard: Card;
  pendingDraw: number;
  direction: 1 | -1;
  playerHandSizes: Record<string, number>;
  deckSize: number;
  discardPileSize: number;
}

export class Round {
  snapshot(): RoundSnapshot {
    // Returns immutable view of game state
    return {
      currentPlayer: this.playerNames[this.currentPlayerIndex],
      topCard: this.topCard(),
      pendingDraw: this.pendingDraw,
      direction: this.direction,
      playerHandSizes: Object.fromEntries(
        Array.from(this.hands.entries()).map(([name, hand]) => [name, hand.size()])
      ),
      deckSize: this.deck.size(),
      discardPileSize: this.discardPile.length
    };
  }
}
```

**Web app usage:**
```typescript
// In React component
const [gameState, setGameState] = useState<RoundSnapshot>(round.snapshot());

// After player action
round.play(player, cardIndex);
setGameState(round.snapshot()); // Update UI with new state
```

**Benefits:**
- **Type safety**: TypeScript validates state shape
- **Immutability**: Snapshot is read-only, prevents accidental mutation
- **Predictability**: UI always reflects game state accurately
- **Debugging**: Can log/inspect snapshots at any point

---

#### **Technique 2: Command Pattern (Action History)**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
type HistoryEntry =
  | { type: "play"; player: string; card: Card; topBefore: Card }
  | { type: "draw"; player: string; count: number; reason: string }
  | { type: "penalty"; player: string; count: number; reason: string }
  | { type: "skip"; player: string; reason: string }
  | { type: "end"; winner: string; turns: number };

export class Round {
  private history: HistoryEntry[] = [];
  
  play(player: string, cardIndex: number, chosenColor?: Color): void {
    const topBefore = this.topCard();
    const card = hand.removeAt(cardIndex);
    
    // Record action in history
    this.history.push({
      type: "play",
      player,
      card,
      topBefore
    });
    
    // Execute action
    this.discardPile.push(card);
    this.applyCardEffect(card, chosenColor);
  }
  
  getHistory(): readonly HistoryEntry[] {
    return this.history;
  }
}
```

**Web app usage:**
```typescript
// Undo/Redo functionality
class GameController {
  private historyIndex = 0;
  
  undo() {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      this.replayHistory(this.historyIndex);
    }
  }
  
  redo() {
    if (this.historyIndex < this.history.length) {
      this.historyIndex++;
      this.replayHistory(this.historyIndex);
    }
  }
  
  private replayHistory(upToIndex: number) {
    const newRound = new Round(this.playerNames);
    for (let i = 0; i < upToIndex; i++) {
      const action = this.history[i];
      // Replay action
    }
  }
}

// Game replay/spectator mode
function replayGame(history: HistoryEntry[]) {
  history.forEach(entry => {
    console.log(`Turn ${i}: ${entry.player} plays ${entry.card}`);
  });
}

// Analytics
function analyzeGame(history: HistoryEntry[]) {
  const playActions = history.filter(h => h.type === "play");
  const avgCardsPlayed = playActions.length / uniquePlayers.length;
  // ...
}
```

**Benefits:**
- **Auditability**: Complete log of what happened
- **Debugging**: Trace exact sequence of events
- **Features**: Undo/redo, replay, spectator mode
- **Analytics**: Gather statistics from game history

---

#### **Technique 3: API Design (Future Web App Layer)**

**RESTful API design (example):**
```typescript
// src/api/routes.ts
import { Round } from '../core/Round';

const games = new Map<string, Round>();

app.post('/api/games', (req, res) => {
  const { playerNames } = req.body;
  const gameId = generateId();
  const round = new Round(playerNames);
  games.set(gameId, round);
  
  res.json({
    gameId,
    state: round.snapshot()
  });
});

app.post('/api/games/:id/play', (req, res) => {
  const { id } = req.params;
  const { player, cardIndex, chosenColor } = req.body;
  const round = games.get(id);
  
  if (!round) {
    return res.status(404).json({ error: 'Game not found' });
  }
  
  try {
    round.play(player, cardIndex, chosenColor);
    res.json({
      state: round.snapshot(),
      history: round.getHistory()
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
```

**GraphQL API design (example):**
```typescript
// src/api/graphql.ts
const typeDefs = `
  type Game {
    id: ID!
    currentPlayer: String!
    topCard: Card!
    players: [Player!]!
  }
  
  type Player {
    name: String!
    handSize: Int!
    cards: [Card!]! # Only visible to player
  }
  
  type Mutation {
    createGame(playerNames: [String!]!): Game!
    playCard(gameId: ID!, player: String!, cardIndex: Int!, chosenColor: String): Game!
    drawCard(gameId: ID!, player: String!): Game!
  }
  
  type Query {
    game(id: ID!): Game
  }
`;

const resolvers = {
  Mutation: {
    playCard: (_, { gameId, player, cardIndex, chosenColor }) => {
      const round = games.get(gameId);
      round.play(player, cardIndex, chosenColor);
      return {
        id: gameId,
        ...round.snapshot()
      };
    }
  }
};
```

---

#### **Technique 4: Error Handling**
Location: [`src/core/Round.ts`](src/core/Round.ts)

```typescript
export class Round {
  play(player: string, cardIndex: number, chosenColor?: Color): void {
    // Validation with clear error messages
    if (this.currentPlayer() !== player) {
      throw new Error(`Not your turn! Current player: ${this.currentPlayer()}`);
    }
    
    const hand = this.hands.get(player);
    if (!hand) {
      throw new Error(`Player ${player} not found in game`);
    }
    
    if (cardIndex < 0 || cardIndex >= hand.size()) {
      throw new Error(`Invalid card index: ${cardIndex}`);
    }
    
    const card = hand.cards()[cardIndex];
    const top = this.topCard();
    
    if (!matches(card, top)) {
      throw new Error(
        `Card ${JSON.stringify(card)} cannot be played on ${JSON.stringify(top)}`
      );
    }
    
    // Wild cards need color choice
    if (card.kind === "wild" && !chosenColor) {
      throw new Error("Wild card requires chosenColor parameter");
    }
    
    // Execute if all validations pass
    // ...
  }
}
```

**Web app error handling:**
```typescript
// In React component
async function playCard(cardIndex: number) {
  try {
    const response = await fetch(`/api/games/${gameId}/play`, {
      method: 'POST',
      body: JSON.stringify({ player, cardIndex, chosenColor })
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    
    const { state } = await response.json();
    setGameState(state);
  } catch (error) {
    setError(error.message); // Show user-friendly error
    console.error('Failed to play card:', error);
  }
}
```

---

#### **Technique 5: Separation of Concerns**

**Layer responsibilities:**

```
┌─────────────────────────────────────┐
│         Presentation Layer          │ ← React/Vue components
│  (UI rendering, user interaction)   │   State management (Redux/Context)
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│         API/Service Layer           │ ← REST/GraphQL endpoints
│  (HTTP handling, authentication)    │   Request validation, serialization
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│        Business Logic Layer         │ ← Round, Deck, Hand classes
│  (Game rules, state management)     │   src/core/**
└─────────────────┬───────────────────┘
                  │
┌─────────────────▼───────────────────┐
│          Data/Model Layer           │ ← Card types, Rules
│  (Type definitions, pure functions) │   src/cards/**
└─────────────────────────────────────┘
```

**Benefits:**
- **Independent testing**: Test each layer in isolation
- **Parallel development**: Different devs work on different layers
- **Technology flexibility**: Swap React for Vue without touching game logic
- **Reusability**: Use same business logic for web, mobile, CLI

---

#### **Technique 6: Defensive Programming**

**Immutable returns:**
```typescript
// Return readonly to prevent external mutation
cards(): readonly Card[] {
  return this._cards;
}

// Defensive copy for mutable data
constructor(playerNames: string[]) {
  this.playerNames = [...playerNames]; // Copy, don't reference
}
```

**Validation at boundaries:**
```typescript
play(player: string, cardIndex: number, chosenColor?: Color): void {
  // Validate ALL inputs before any state changes
  this.validatePlayer(player);
  this.validateCardIndex(cardIndex);
  this.validateCardPlayable(card, top);
  
  // Only mutate state after validation
  // ...
}
```

**Null safety:**
```typescript
// Use optional chaining and nullish coalescing
const hand = this.hands.get(player);
if (!hand) throw new Error('Player not found');

// Or with guards
const card = deck.peekTop();
if (!card) {
  throw new Error('Deck is empty');
}
```

---

## 🎯 Exam Question Examples & Detailed Answers

### Q1: "Explain discriminated unions with an example from your code"

**Answer:**
> In [`src/cards/Card.ts`](src/cards/Card.ts), we define `Card` as a discriminated union:
> 
> ```typescript
> export type Card = NumberCard | ActionCard | WildCard;
> ```
> 
> Each variant has a `kind` property that acts as the discriminant:
> - `NumberCard` has `kind: "number"`
> - `ActionCard` has `kind: "action"`
> - `WildCard` has `kind: "wild"`
> 
> TypeScript uses this discriminant to narrow types:
> ```typescript
> if (card.kind === "number") {
>   // TypeScript knows card is NumberCard here
>   console.log(card.value); // ✅ OK: NumberCard has value
>   // console.log(card.action); // ❌ Error: NumberCard has no action
> }
> ```
> 
> This is used extensively in [`Rules.ts`](src/cards/Rules.ts) for type-safe card matching without casting.

---

### Q2: "Show a utility type you created and explain how it works"

**Answer:**
> I created `TypedCard<K>` in [`src/cards/Card.ts`](src/cards/Card.ts):
> 
> ```typescript
> export type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;
> ```
> 
> **How it works:**
> 1. `K extends Card["kind"]` constrains K to `"number" | "action" | "wild"`
> 2. `Extract<Card, { kind: K }>` filters the Card union to only types with matching `kind`
> 3. Result is the specific card type
> 
> **Usage:**
> ```typescript
> const wilds: TypedCard<"wild">[] = hand.findPlayable(
>   (c): c is TypedCard<"wild"> => c.kind === "wild"
> );
> // wilds is typed as WildCard[]
> ```
> 
> This provides compile-time type safety without runtime overhead.

---

### Q3: "How do you ensure immutability in your code?"

**Answer:**
> I use multiple techniques for immutability:
> 
> **1. Readonly return types** ([`Hand.ts`](src/core/Hand.ts)):
> ```typescript
> private _cards: Card[] = [];
> 
> cards(): readonly Card[] {
>   return this._cards; // Callers cannot mutate
> }
> ```
> 
> **2. Readonly properties** ([`Round.ts`](src/core/Round.ts)):
> ```typescript
> private readonly playerNames: string[];
> ```
> 
> **3. Defensive copying**:
> ```typescript
> constructor(playerNames: string[]) {
>   this.playerNames = [...playerNames]; // Copy, don't reference
> }
> ```
> 
> **4. Immutable snapshots**:
> ```typescript
> snapshot(): RoundSnapshot {
>   return { /* new object, not reference */ };
> }
> ```
> 
> This prevents accidental state mutation and makes code more predictable.

---

### Q4: "Show OO principles in your code and explain each"

**Answer:**
> **1. Encapsulation** ([`PlayerHand`](src/core/Hand.ts)):
> ```typescript
> export class PlayerHand implements Hand {
>   private _cards: Card[] = []; // Hidden state
>   
>   cards(): readonly Card[] { return this._cards; } // Controlled access
>   add(card: Card): void { this._cards.push(card); } // Controlled mutation
> }
> ```
> Private state with public methods ensures internal consistency.
> 
> **2. Interfaces/Abstraction** ([`Deck.ts`](src/core/Deck.ts)):
> ```typescript
> export interface Deck {
>   draw(n: number): Card[];
>   // ...
> }
> 
> export class StandardDeck implements Deck { /* ... */ }
> ```
> Interface defines contract, class provides implementation. Enables substitutability.
> 
> **3. Composition** ([`Round.ts`](src/core/Round.ts)):
> ```typescript
> export class Round {
>   private deck: Deck; // Has-a Deck
>   private hands: Map<string, Hand>; // Has-a collection of Hands
>   
>   constructor(playerNames: string[]) {
>     this.deck = new StandardDeck();
>     this.hands = new Map(/* ... */);
>   }
> }
> ```
> Round delegates to composed objects rather than inheriting from them.
> 
> **4. Single Responsibility**:
> - `Card.ts`: Only type definitions
> - `Rules.ts`: Only matching logic
> - `Deck.ts`: Only deck management
> - `Hand.ts`: Only hand management
> - `Round.ts`: Only game orchestration
> 
> Each class has one reason to change.

---

### Q5: "Explain type narrowing with examples from your code"

**Answer:**
> Type narrowing is how TypeScript refines types based on runtime checks.
> 
> **1. Discriminated union narrowing** ([`Rules.ts`](src/cards/Rules.ts)):
> ```typescript
> if (card.kind === "wild") {
>   // card is narrowed to WildCard
>   return card.chosenColor === topColor(top);
> } else if (card.kind === "number") {
>   // card is narrowed to NumberCard
>   return card.value === top.value || card.color === top.color;
> }
> ```
> 
> **2. Truthiness narrowing**:
> ```typescript
> const card = deck.peekTop(); // Card | undefined
> if (card) {
>   // card is narrowed to Card (undefined eliminated)
>   console.log(card.kind);
> }
> ```
> 
> **3. User-defined type guards** ([`Hand.ts`](src/core/Hand.ts)):
> ```typescript
> const wilds = hand.findPlayable(
>   (c): c is TypedCard<"wild"> => c.kind === "wild"
> );
> // wilds is WildCard[], not Card[]
> ```
> 
> Type narrowing eliminates the need for unsafe `as` casting.

---

### Q6: "How would your code integrate into a web application?"

**Answer:**
> My code is designed with web app integration in mind:
> 
> **1. Stateless snapshots** ([`Round.ts`](src/core/Round.ts)):
> ```typescript
> export interface RoundSnapshot {
>   currentPlayer: string;
>   topCard: Card;
>   playerHandSizes: Record<string, number>;
> }
> ```
> Can be serialized to JSON and sent to frontend.
> 
> **2. Clear API surface**:
> ```typescript
> const round = new Round(["Kim", "Bob"]);
> round.play("Kim", 0); // Play first card
> const state = round.snapshot(); // Get current state
> ```
> 
> **3. Web API example**:
> ```typescript
> // Express.js route
> app.post('/api/games/:id/play', (req, res) => {
>   const round = games.get(req.params.id);
>   round.play(req.body.player, req.body.cardIndex);
>   res.json(round.snapshot());
> });
> 
> // React component
> function GameBoard() {
>   const [state, setState] = useState<RoundSnapshot>();
>   
>   async function playCard(index: number) {
>     const res = await fetch('/api/games/123/play', {
>       method: 'POST',
>       body: JSON.stringify({ player: 'Kim', cardIndex: index })
>     });
>     setState(await res.json());
>   }
> }
> ```
> 
> **4. History for features**:
> - Undo/redo
> - Replay mode
> - Game analytics
> - Spectator view

---

### Q7: "What utility types would you use for this scenario?"

**Scenario: Create a type for updating only some fields of RoundSnapshot**

**Answer:**
> I would use `Partial<T>`:
> ```typescript
> type RoundUpdate = Partial<RoundSnapshot>;
> 
> function updateGame(gameId: string, update: RoundUpdate) {
>   const current = games.get(gameId).snapshot();
>   const newState = { ...current, ...update }; // Merge
> }
> 
> // Usage:
> updateGame('123', { pendingDraw: 2 }); // Only update one field
> ```
> 
> **Alternative: Pick for specific fields:**
> ```typescript
> type PublicUpdate = Pick<RoundSnapshot, "topCard" | "currentPlayer">;
> ```
> 
> **Alternative: Omit for sensitive data:**
> ```typescript
> type PublicSnapshot = Omit<RoundSnapshot, "deckSize">;
> ```

---

### Q8: "How does your code demonstrate type safety?"

**Answer:**
> **1. Discriminated unions prevent invalid states**:
> ```typescript
> // ❌ Impossible to create invalid card:
> const bad: Card = { kind: "number", action: "skip" }; // Error!
> ```
> 
> **2. Readonly prevents mutation**:
> ```typescript
> const cards = hand.cards();
> cards.push(newCard); // ❌ TypeScript error
> ```
> 
> **3. Type guards ensure correct access**:
> ```typescript
> if (card.kind === "number") {
>   console.log(card.value); // ✅ Safe
> } else {
>   console.log(card.value); // ❌ Error: not all Cards have value
> }
> ```
> 
> **4. Interfaces enforce contracts**:
> ```typescript
> class MyDeck implements Deck {
>   // ❌ Error if missing draw(), size(), refill(), peekTop()
> }
> ```
> 
> **5. Generic constraints prevent misuse**:
> ```typescript
> type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;
> type Invalid = TypedCard<"invalid">; // ❌ Error: "invalid" not in union
> ```

---

## 🔍 Comprehensive Concept Location Guide

| Concept | File | Specific Location | Exam Relevance |
|---------|------|-------------------|----------------|
| **Discriminated Union** | [`Card.ts`](src/cards/Card.ts) | `type Card = NumberCard \| ActionCard \| WildCard` | ⭐⭐⭐ High |
| **Utility Type (Extract)** | [`Card.ts`](src/cards/Card.ts) | `TypedCard<K>` definition | ⭐⭐⭐ High |
| **Type Narrowing** | [`Rules.ts`](src/cards/Rules.ts) | `matches()` function | ⭐⭐⭐ High |
| **Readonly Modifier** | [`Hand.ts`](src/core/Hand.ts) | `cards(): readonly Card[]` | ⭐⭐⭐ High |
| **Interface** | [`Deck.ts`](src/core/Deck.ts) | `interface Deck` | ⭐⭐⭐ High |
| **Class Implementation** | [`Deck.ts`](src/core/Deck.ts) | `class StandardDeck implements Deck` | ⭐⭐⭐ High |
| **Encapsulation** | [`Hand.ts`](src/core/Hand.ts) | `private _cards` + public methods | ⭐⭐⭐ High |
| **Composition** | [`Round.ts`](src/core/Round.ts) | Constructor with Deck/Hand | ⭐⭐⭐ High |
| **Type Guard** | [`Hand.ts`](src/core/Hand.ts) | `findPlayable()` with predicates | ⭐⭐ Medium |
| **Literal Types** | [`Card.ts`](src/cards/Card.ts) | `Color = "red" \| "blue"...` | ⭐⭐ Medium |
| **Union Types** | [`Card.ts`](src/cards/Card.ts) | Multiple type unions | ⭐⭐ Medium |
| **Record Utility** | [`Round.ts`](src/core/Round.ts) | `Record<string, number>` in snapshot | ⭐⭐ Medium |
| **Type Alias** | [`Card.ts`](src/cards/Card.ts) | All type definitions | ⭐⭐ Medium |
| **Generic Types** | [`Card.ts`](src/cards/Card.ts) | `TypedCard<K>` | ⭐⭐ Medium |
| **Index Access** | [`Card.ts`](src/cards/Card.ts) | `Card["kind"]` | ⭐⭐ Medium |
| **Private Members** | All classes | `private` keyword usage | ⭐⭐ Medium |
| **Public Methods** | All classes | Method definitions | ⭐⭐ Medium |
| **Constructor** | All classes | `constructor()` pattern | ⭐⭐ Medium |
| **Array Methods** | [`Deck.ts`](src/core/Deck.ts) | `splice()`, `push()`, filter | ⭐ Low |
| **Map/Set** | [`Round.ts`](src/core/Round.ts) | `Map<string, Hand>` | ⭐ Low |
| **Optional Parameters** | [`Deck.ts`](src/core/Deck.ts) | `shuffle?: boolean` | ⭐ Low |

---

## 🚀 Quick Exam Prep Checklist

### Before the Exam:

- [ ] Run `npm run dev:verbose` to see game simulation
- [ ] Run `npm run dev:history` to see action history
- [ ] Run `npm run typecheck` to verify no type errors
- [ ] Read [`Card.ts`](src/cards/Card.ts) - all type definitions
- [ ] Read [`Rules.ts`](src/cards/Rules.ts) - type narrowing examples
- [ ] Skim [`Round.ts`](src/core/Round.ts) - OO composition pattern
- [ ] Review this guide's exam questions

### Key Code to Memorize:

```typescript
// 1. Discriminated union
type Card = NumberCard | ActionCard | WildCard;

// 2. Utility type
type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>;

// 3. Type narrowing
if (card.kind === "number") {
  // card is NumberCard here
}

// 4. Encapsulation
private _cards: Card[];
cards(): readonly Card[] { return this._cards; }

// 5. Composition
private deck: Deck;
constructor() { this.deck = new StandardDeck(); }
```

---

## 📝 Practice Questions

### Question 1:
**"Define a type for a card that can only be red or blue number cards with values 0-5"**

<details>
<summary>Answer</summary>

```typescript
type LimitedCard = Extract<
  NumberCard,
  { color: "red" | "blue"; value: 0 | 1 | 2 | 3 | 4 | 5 }
>;

// Alternative:
type LimitedCard = {
  kind: "number";
  color: "red" | "blue";
  value: 0 | 1 | 2 | 3 | 4 | 5;
};
```
</details>

---

### Question 2:
**"How would you make all properties of RoundSnapshot optional?"**

<details>
<summary>Answer</summary>

```typescript
type OptionalSnapshot = Partial<RoundSnapshot>;

// Manual implementation:
type OptionalSnapshot = {
  [K in keyof RoundSnapshot]?: RoundSnapshot[K];
};
```
</details>

---

### Question 3:
**"Create a type guard function to check if a card is a NumberCard"**

<details>
<summary>Answer</summary>

```typescript
function isNumberCard(card: Card): card is NumberCard {
  return card.kind === "number";
}

// Usage:
if (isNumberCard(card)) {
  console.log(card.value); // ✅ TypeScript knows card is NumberCard
}
```
</details>

---

### Question 4:
**"What's wrong with this code and how do you fix it?"**

```typescript
class Player {
  cards: Card[] = [];
  
  getCards() {
    return this.cards;
  }
}

const player = new Player();
const cards = player.getCards();
cards.push(someCard); // Shouldn't be allowed!
```

<details>
<summary>Answer</summary>

**Problem:** External code can mutate internal state.

**Fix: Use encapsulation and readonly:**
```typescript
class Player {
  private cards: Card[] = []; // Private!
  
  getCards(): readonly Card[] { // Readonly return!
    return this.cards;
  }
  
  addCard(card: Card): void { // Controlled mutation
    this.cards.push(card);
  }
}

const player = new Player();
const cards = player.getCards();
cards.push(someCard); // ❌ TypeScript error: readonly
player.addCard(someCard); // ✅ Correct way
```
</details>

---

### Question 5:
**"Design a type-safe event system for game actions"**

<details>
<summary>Answer</summary>

```typescript
// Discriminated union of events
type GameEvent =
  | { type: "cardPlayed"; player: string; card: Card }
  | { type: "cardDrawn"; player: string; count: number }
  | { type: "turnSkipped"; player: string; reason: string }
  | { type: "gameEnded"; winner: string };

// Type-safe event handler
type EventHandler<T extends GameEvent["type"]> = (
  event: Extract<GameEvent, { type: T }>
) => void;

// Event manager
class EventBus {
  private handlers = new Map<GameEvent["type"], EventHandler<any>[]>();
  
  on<T extends GameEvent["type"]>(
    type: T,
    handler: EventHandler<T>
  ): void {
    if (!this.handlers.has(type)) {
      this.handlers.set(type, []);
    }
    this.handlers.get(type)!.push(handler);
  }
  
  emit<T extends GameEvent["type"]>(
    event: Extract<GameEvent, { type: T }>
  ): void {
    const handlers = this.handlers.get(event.type) || [];
    handlers.forEach(handler => handler(event));
  }
}

// Usage:
const bus = new EventBus();

bus.on("cardPlayed", (event) => {
  // event is { type: "cardPlayed"; player: string; card: Card }
  console.log(`${event.player} played ${event.card.kind}`);
});

bus.emit({
  type: "cardPlayed",
  player: "Kim",
  card: { kind: "number", color: "red", value: 5 }
});
```
</details>

---

## 🎓 Final Exam Tips

1. **Explain with code**: Always provide concrete examples from your codebase
2. **Connect concepts**: Show how multiple concepts work together (e.g., discriminated unions + type narrowing)
3. **Mention benefits**: Explain WHY each pattern/technique is useful
4. **Reference files**: Use specific file paths to show you understand the architecture
5. **Discuss trade-offs**: Acknowledge when other approaches are valid

**Example answer structure:**
```
1. Define the concept
2. Show code example from your project
3. Explain how it works technically
4. Describe the benefits
5. Mention practical applications
```

---

## 📚 Additional Resources

- [TypeScript Handbook - Discriminated Unions](https://www.typescriptlang.org/docs/handbook/2/narrowing.html#discriminated-unions)
- [TypeScript Handbook - Utility Types](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [TypeScript Handbook - Type Narrowing](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)
- [TypeScript Handbook - Classes](https://www.typescriptlang.org/docs/handbook/2/classes.html)

---

**Good luck on your exam! 🎓**

*This guide covers all exam topics with concrete examples from your UNO game implementation.*
