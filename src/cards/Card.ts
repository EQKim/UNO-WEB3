export type Color = "red" | "yellow" | "green" | "blue"
export type NumberValue = 0|1|2|3|4|5|6|7|8|9
export type ActionKind = "skip" | "reverse" | "draw2"
export type WildKind = "wild" | "wildDraw4"

export type NumberCard = {
  kind: "number"
  color: Color
  value: NumberValue
}

export type ActionCard = {
  kind: "action"
  color: Color
  action: ActionKind
  drawAmount?: 2
}

export type WildCard = {
  kind: "wild"
  action: WildKind
  chosenColor?: Color
  drawAmount?: 4
}

export type Card = NumberCard | ActionCard | WildCard
export type TypedCard<K extends Card["kind"]> = Extract<Card, { kind: K }>

// Assignment-1 convenience aliases
export type Type = Card["kind"]; // "number" | "action" | "wild"
export type ColouredCard = NumberCard | ActionCard;
