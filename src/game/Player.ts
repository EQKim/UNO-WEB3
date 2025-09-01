import type { Card } from "../cards/Card"

export type PlayerId = string
export type Player = {
  id: PlayerId
  name: string
  hand: Card[]
  isAI?: boolean
}
