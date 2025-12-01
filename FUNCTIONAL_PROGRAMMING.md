# Functional Programming Compliance - Exam Study Guide

This document demonstrates how the UNO Online project follows functional programming principles as required by Assignment 4. Each section includes detailed explanations for exam preparation.

---

## ✅ Core Functional Programming Requirements

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
