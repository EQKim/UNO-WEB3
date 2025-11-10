import React from "react";
import type { Card } from "../../cards/Card";

type Size = "sm" | "md" | "lg";

type Props = {
  card: Card;
  onPlay?: (c: Card) => void;
  size?: Size;
  disabled?: boolean;
  title?: string;
};

function filenameFor(card: Card): string {
  if (card.kind === "number") return `${card.color}_${card.value}.png`;
  if (card.kind === "action") return `${card.color}_${card.action}.png`;
  return card.action === "wildDraw4" ? "wildDraw4.png" : "wild.png";
}

function labelFor(card: Card) {
  if (card.kind === "number") return `${card.color} ${card.value}`;
  if (card.kind === "action") return `${card.color} ${card.action}`;
  return card.action === "wildDraw4" ? "+4" : "wild";
}

function dimsFor(size: Size) {
  switch (size) {
    case "lg":
      return { w: 96, h: 144 };
    case "sm":
      return { w: 48, h: 72 };
    case "md":
    default:
      return { w: 64, h: 96 };
  }
}

export const CardView: React.FC<Props> = ({ card, onPlay, size = "md", disabled = false, title }) => {
  const [imgError, setImgError] = React.useState(false);
  const url = `${import.meta.env.BASE_URL}cards/${filenameFor(card)}`;
  const dims = dimsFor(size);
  const label = labelFor(card);

  return (
    <button
      onClick={() => (disabled ? undefined : onPlay?.(card))}
      title={title ?? label}
      disabled={disabled}
      style={{
        margin: 4,
        padding: 0,
        width: dims.w,
        height: dims.h,
        borderRadius: 8,
        border: "1px solid #94a3b8",
        overflow: "hidden",
        background: "#fff",
        cursor: disabled ? "default" as const : "pointer" as const,
      }}
    >
      {!imgError ? (
        // Using img so public/ files work with BASE_URL
        <img
          src={url}
          alt={label}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
          onError={() => setImgError(true)}
        />
      ) : (
        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, padding: 4 }}>
          {label}
        </div>
      )}
    </button>
  );
};

export default CardView;
