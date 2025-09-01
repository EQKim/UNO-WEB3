import type { Card, Color } from "./Card"
const COLORS: Color[] = ["red", "yellow", "green", "blue"]

// Build a standard UNO deck (no blanks): 108 cards
export function buildDeck(): Card[] {
  const deck: Card[] = []

  // Number cards: each color → one 0, two of 1–9
  for (const color of COLORS) {
    deck.push({ kind: "number", color, value: 0 })
    for (let v = 1 as const; v <= 9; v++) {
      deck.push({ kind: "number", color, value: v as any })
      deck.push({ kind: "number", color, value: v as any })
    }
  }

  // Action cards: each color → two of skip, reverse, draw2
  for (const color of COLORS) {
    for (let i = 0; i < 2; i++) {
      deck.push({ kind: "action", color, action: "skip" })
      deck.push({ kind: "action", color, action: "reverse" })
      deck.push({ kind: "action", color, action: "draw2", drawAmount: 2 })
    }
  }

  // Wilds: 4 wild, 4 wildDraw4
  for (let i = 0; i < 4; i++) deck.push({ kind: "wild", action: "wild" })
  for (let i = 0; i < 4; i++) deck.push({ kind: "wild", action: "wildDraw4", drawAmount: 4 })

  return deck
}

export function shuffle<T>(a: T[]): T[] {
  // Fisher–Yates (in place)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function drawOne(drawPile: Card[], discardPile: Card[]): Card {
  if (drawPile.length === 0) {
    // reshuffle discard (leave top card)
    const top = discardPile.pop()!
    const toShuffle = discardPile.splice(0)
    shuffle(toShuffle)
    drawPile.push(...toShuffle)
    discardPile.push(top)
  }
  return drawPile.pop()!
}
