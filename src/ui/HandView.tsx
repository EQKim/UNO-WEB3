import type { Card } from "../cards/Card";
import { CardView } from "./CardView"

type Props = { hand: Card[]; onPlay: (c: Card) => void; title?: string }

export function HandView({ hand, onPlay, title = "Hand" }: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <h3>{title} ({hand.length})</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {hand.map((c, i) => <CardView key={i} card={c} onPlay={onPlay} />)}
      </div>
    </div>
  )
}
