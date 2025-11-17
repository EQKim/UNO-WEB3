import type { Card } from "../cards/Card";

export interface Deck {
  draw(n: number): Card[];
  refill(cards: Card[]): void;
}

export class StandardDeck implements Deck {
  private cards: Card[] = [];

  constructor() {
    this.cards = this.createStandardDeck();
    this.shuffle();
  }

  private createStandardDeck(): Card[] {
    const deck: Card[] = [];
    const colors = ["red", "yellow", "green", "blue"] as const;
    
    for (const color of colors) {
      deck.push({ kind: "number", color, value: 0 } as Card);
      for (let i = 1; i <= 9; i++) {
        deck.push({ kind: "number", color, value: i } as Card);
        deck.push({ kind: "number", color, value: i } as Card);
      }
    }
    
    for (const color of colors) {
      for (let i = 0; i < 2; i++) {
        deck.push({ kind: "action", color, action: "skip" } as Card);
        deck.push({ kind: "action", color, action: "reverse" } as Card);
        deck.push({ kind: "action", color, action: "draw2" } as Card);
      }
    }
    
    for (let i = 0; i < 4; i++) {
      deck.push({ kind: "wild", action: "wild" } as Card);
      deck.push({ kind: "wild", action: "wildDraw4" } as Card);
    }
    
    return deck;
  }

  private shuffle() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  draw(n: number): Card[] {
    return this.cards.splice(0, Math.min(n, this.cards.length));
  }

  refill(cards: Card[]): void {
    this.cards.push(...cards);
    this.shuffle();
  }
}