// src/ui/CardView.tsx
import { useState } from "react";
import type { Card } from "../cards/Card";

type Props = {
  card: Card;
  onPlay?: (c: Card) => void;
  size?: "sm" | "md" | "lg";   // 👈 new
};

function filenameFor(card: Card): string {
  if (card.kind === "number") return `${card.color}_${card.value}.png`;
  if (card.kind === "action") return `${card.color}_${card.action}.png`;
  return `${card.action}.png`; // wild / wildDraw4
}

function labelFor(card: Card) {
  if (card.kind === "number") return `${card.color} ${card.value}`;
  if (card.kind === "action") return `${card.color} ${card.action}`;
  return card.action;
}

export function CardView({ card, onPlay, size = "md" }: Props) {
  const [imgError, setImgError] = useState(false);
  const url = `/cards/${filenameFor(card)}`;

  const dims =
    size === "lg"
      ? { w: 96, h: 144 }
      : size === "sm"
      ? { w: 48, h: 72 }
      : { w: 64, h: 96 };

  return (
    <button
      onClick={() => onPlay?.(card)}
      title={JSON.stringify(card)}
      className="m-1 p-0 rounded-lg border border-slate-400 overflow-hidden bg-white hover:shadow transition disabled:opacity-100"
      style={{ width: dims.w, height: dims.h, cursor: onPlay ? "pointer" : "default" }}
      disabled={!onPlay}
    >
      {!imgError ? (
        <img
          src={url}
          alt={labelFor(card)}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs px-1">
          {labelFor(card)}
        </div>
      )}
    </button>
  );
}
