import type { Card } from "../cards/Card";

export interface Hand {
  size(): number;
  cards(): readonly Card[];
  add(card: Card): void;
  getAt(index: number): Card | undefined;
  removeAt(index: number): Card | undefined; // undefined if index invalid
  findPlayable(top: Card, predicate: (c: Card) => boolean): number | -1; // first index matching predicate
}

export class PlayerHand implements Hand {
  private _cards: Card[] = [];
  size() { return this._cards.length; }
  cards() { return this._cards; }
  add(card: Card) { this._cards.push(card); }
  getAt(i: number) { if (i < 0 || i >= this._cards.length) return undefined; return this._cards[i]; }
  removeAt(i: number) { if (i < 0 || i >= this._cards.length) return undefined; return this._cards.splice(i,1)[0]; }
  findPlayable(top: Card, predicate: (c: Card) => boolean): number | -1 {
    return this._cards.findIndex(predicate);
  }
}
