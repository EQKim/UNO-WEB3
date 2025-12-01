/**
 * Functional Programming Utilities
 * Demonstrates closures, higher-order functions, and function composition
 * Required for Assignment 4 compliance
 */

import type { Card, Color } from "../cards/Card";

/**
 * Higher-order function: Function composition
 * Combines multiple functions into a single function
 * Example: compose(f, g, h)(x) === f(g(h(x)))
 */
export const compose = <T>(...fns: Array<(arg: T) => T>) => 
  (value: T): T => fns.reduceRight((acc, fn) => fn(acc), value);

/**
 * Higher-order function: Pipe (reverse composition)
 * Applies functions left-to-right
 * Example: pipe(f, g, h)(x) === h(g(f(x)))
 */
export const pipe = <T>(...fns: Array<(arg: T) => T>) => 
  (value: T): T => fns.reduce((acc, fn) => fn(acc), value);

/**
 * Higher-order function: Currying
 * Transforms a function with multiple arguments into a sequence of functions
 * Example usage: const add = curry((a, b) => a + b); add(1)(2) === 3
 */
export const curry = <A, B, R>(fn: (a: A, b: B) => R) => 
  (a: A) => (b: B): R => fn(a, b);

/**
 * Higher-order function: Partial application
 * Creates a new function with some arguments pre-filled
 */
export const partial = <A extends any[], R>(
  fn: (...args: A) => R,
  ...partialArgs: Partial<A>
) => (...restArgs: any[]): R => fn(...[...partialArgs, ...restArgs] as A);

/**
 * Closure example: Counter factory
 * Demonstrates encapsulation and private state using closures
 */
export const createCounter = (initialValue: number = 0) => {
  let count = initialValue; // Private variable enclosed in closure
  
  return {
    increment: () => ++count,
    decrement: () => --count,
    getValue: () => count,
    reset: () => { count = initialValue; return count; }
  };
};

/**
 * Closure example: Memoization
 * Caches function results using closure
 * Demonstrates higher-order function returning a function with private state
 */
export const memoize = <T extends (...args: any[]) => any>(fn: T): T => {
  const cache = new Map<string, ReturnType<T>>();
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      return cache.get(key)!;
    }
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  }) as T;
};

/**
 * Pure function: Filter cards by predicate
 * Uses higher-order function (predicate)
 */
export const filterCards = (
  cards: readonly Card[],
  predicate: (card: Card) => boolean
): readonly Card[] => cards.filter(predicate);

/**
 * Pure function: Map cards to a different structure
 * Demonstrates map (higher-order function)
 */
export const mapCards = <R>(
  cards: readonly Card[],
  mapper: (card: Card, index: number) => R
): readonly R[] => cards.map(mapper);

/**
 * Pure function: Reduce cards to a single value
 * Demonstrates reduce (higher-order function)
 */
export const reduceCards = <R>(
  cards: readonly Card[],
  reducer: (acc: R, card: Card, index: number) => R,
  initialValue: R
): R => cards.reduce(reducer, initialValue);

/**
 * Closure example: Create a predicate factory for card filtering
 * Returns a function that checks if a card matches criteria
 */
export const createCardMatcher = (criteria: {
  kind?: Card["kind"];
  color?: Color;
  value?: number;
  action?: string;
}) => {
  // Closure captures criteria
  return (card: Card): boolean => {
    if (criteria.kind && card.kind !== criteria.kind) return false;
    if (criteria.color && "color" in card && card.color !== criteria.color) return false;
    if (criteria.value !== undefined && card.kind === "number" && card.value !== criteria.value) return false;
    if (criteria.action && "action" in card && card.action !== criteria.action) return false;
    return true;
  };
};

/**
 * Higher-order function: Create a function that counts cards by property
 * Demonstrates currying and closures
 */
export const createCardCounter = <K extends keyof Card>(property: K) => {
  // Closure captures property
  return (cards: readonly Card[]): Map<Card[K], number> => {
    return cards.reduce((acc, card) => {
      const key = card[property];
      acc.set(key, (acc.get(key) || 0) + 1);
      return acc;
    }, new Map<Card[K], number>());
  };
};

/**
 * Pure function: Group cards by a property
 * Uses reduce to demonstrate functional aggregation
 */
export const groupCardsByColor = (
  cards: readonly Card[]
): Record<Color, readonly Card[]> => {
  const initial: Record<Color, Card[]> = {
    red: [],
    yellow: [],
    green: [],
    blue: []
  };
  
  return cards.reduce((acc, card) => {
    if (card.kind !== "wild") {
      acc[card.color].push(card);
    }
    return acc;
  }, initial);
};

/**
 * Higher-order function: Create a validator with custom rules
 * Demonstrates function composition and closures
 */
export const createValidator = <T>(
  ...rules: Array<(value: T) => boolean>
) => {
  // Closure captures all rules
  return (value: T): boolean => {
    return rules.every(rule => rule(value));
  };
};

/**
 * Pure function: Partition cards into two groups based on predicate
 * Demonstrates reduce with complex accumulator
 */
export const partitionCards = (
  cards: readonly Card[],
  predicate: (card: Card) => boolean
): { pass: readonly Card[]; fail: readonly Card[] } => {
  return cards.reduce(
    (acc, card) => {
      if (predicate(card)) {
        return { ...acc, pass: [...acc.pass, card] };
      }
      return { ...acc, fail: [...acc.fail, card] };
    },
    { pass: [] as Card[], fail: [] as Card[] }
  );
};

/**
 * Higher-order function: Debounce
 * Demonstrates closures with timing
 */
export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = setTimeout(() => {
      fn(...args);
      timeoutId = null;
    }, delay);
  };
};

/**
 * Higher-order function: Throttle
 * Demonstrates closures with timing and state
 */
export const throttle = <T extends (...args: any[]) => any>(
  fn: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let lastRun = 0;
  
  return (...args: Parameters<T>) => {
    const now = Date.now();
    
    if (now - lastRun >= limit) {
      fn(...args);
      lastRun = now;
    }
  };
};
