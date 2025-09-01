import type { Card } from "../cards/Card"
import type { Player } from "./Player"

export type RoundState = {
  players: Player[]
  current: number          // index
  drawPile: Card[]
  discardPile: Card[]      // last element = top
}

export function makeRound(players: Player[], drawPile: Card[], firstCard: Card): RoundState {
  return { players, current: 0, drawPile, discardPile: [firstCard] }
}

export function currentPlayer(s: RoundState) {
  return s.players[s.current]
}

export function topCard(s: RoundState): Card {
  return s.discardPile[s.discardPile.length - 1]
}

export function playToDiscard(s: RoundState, c: Card) {
  s.discardPile.push(c)
}

export function advanceTurn(s: RoundState) {
  s.current = (s.current + 1) % s.players.length
}

export function getPlayerById(s: RoundState, id: string) {
  return s.players.find(p => p.id === id)!;
}

