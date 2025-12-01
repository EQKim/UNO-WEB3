'use client'

import type { Card } from '@/src/cards/Card'
import { useState } from 'react'

interface CardViewProps {
  card: Card
  onPlay?: (c: Card) => void
  size?: 'sm' | 'md' | 'lg'
}

function filenameFor(card: Card): string {
  if (card.kind === 'number') return `${card.color}_${card.value}.png`
  if (card.kind === 'action') return `${card.color}_${card.action}.png`
  return card.action === 'wildDraw4' ? 'wildDraw4.png' : 'wild.png'
}

function labelFor(card: Card) {
  if (card.kind === 'number') return `${card.color} ${card.value}`
  if (card.kind === 'action') return `${card.color} ${card.action}`
  return card.action === 'wildDraw4' ? '+4' : 'wild'
}

export default function CardView({ card, onPlay, size = 'md' }: CardViewProps) {
  const [imgError, setImgError] = useState(false)

  const url = `/cards/${filenameFor(card)}`
  
  const dims = 
    size === 'lg' ? { w: 96, h: 144 } :
    size === 'sm' ? { w: 48, h: 72 } :
    { w: 64, h: 96 }

  function handleClick() {
    onPlay?.(card)
  }

  return (
    <div
      title={JSON.stringify(card)}
      className="m-1 p-0 rounded-lg border border-slate-400 overflow-hidden bg-white hover:shadow transition"
      style={{ width: `${dims.w}px`, height: `${dims.h}px`, cursor: onPlay ? 'pointer' : 'inherit' }}
      onClick={handleClick}
    >
      {!imgError ? (
        <img
          src={url}
          alt={labelFor(card)}
          className="w-full h-full object-contain"
          onError={() => setImgError(true)}
          style={{ pointerEvents: 'none' }}
        />
      ) : (
        <div className="w-full h-full flex items-center justify-center text-xs px-1">
          {labelFor(card)}
        </div>
      )}
    </div>
  )
}
