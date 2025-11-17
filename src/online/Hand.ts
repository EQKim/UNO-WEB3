import type { Card } from "../cards/Card";

export interface Hand {
  add(card: Card): void;
  removeAt(index: number): Card | undefined;
  getAt(index: number): Card | undefined;
  cards(): readonly Card[];
  size(): number;
  findPlayable(top: Card, predicate: (card: Card) => boolean): number;
}

export class PlayerHand implements Hand {
  private hand: Card[] = [];

  add(card: Card): void {
    this.hand.push(card);
  }

  removeAt(index: number): Card | undefined {
    if (index < 0 || index >= this.hand.length) return undefined;
    return this.hand.splice(index, 1)[0];
  }

  getAt(index: number): Card | undefined {
    return this.hand[index];
  }

  cards(): readonly Card[] {
    return this.hand;
  }

  size(): number {
    return this.hand.length;
  }

  findPlayable(top: Card, predicate: (card: Card) => boolean): number {
    return this.hand.findIndex(predicate);
  }
}