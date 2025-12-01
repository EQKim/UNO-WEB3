'use client'

import { useEffect, useState, useMemo } from 'react'
import type { Card } from '@/src/cards/Card'
import CardView from './CardView'
import {
  startGameClient,
  playCardOnline,
  drawOneOnline,
  endTurnOnline
} from '@/src/services/OnlineGame'
import { matches } from '@/src/cards/Rules'
import { auth } from '@/src/firebase'
import { useAppSelector } from '@/src/store/hooks'
import { startListeningToRoom } from '@/src/store/streams'

interface OnlineBoardProps {
  roomId: string
  isHost: boolean
}

export default function OnlineBoard({ roomId, isHost }: OnlineBoardProps) {
  // Redux state via useAppSelector (Assignment 5 requirement)
  const room = useAppSelector((state) => state.game.room)
  const players = useAppSelector((state) => state.game.players)
  const myHand = useAppSelector((state) => state.game.myHand)

  // Local UI state (not domain state)
  const [pendingWild, setPendingWild] = useState<{ index: number; card: Card } | null>(null)
  const [hasDrawnThisTurn, setHasDrawnThisTurn] = useState(false)

  useEffect(() => {
    // RxJS streams handling Firestore snapshots (Assignment 5 requirement)
    const unsubscribe = startListeningToRoom(roomId)
    return () => unsubscribe?.()
  }, [roomId])

  const top = useMemo<Card | null>(() => room?.topCard ?? null, [room])
  const myUid = useMemo(() => auth.currentUser?.uid ?? null, [])
  const isMyTurn = useMemo(() => room?.currentTurn === myUid && room?.status === 'playing', [room, myUid])

  // Reset hasDrawnThisTurn when turn changes or when it's no longer your turn
  useEffect(() => {
    if (!isMyTurn) {
      setHasDrawnThisTurn(false)
    }
  }, [isMyTurn])

  // Also reset when the currentTurn in room changes (catches server-side turn changes)
  useEffect(() => {
    setHasDrawnThisTurn(false)
  }, [room?.currentTurn])

  const currentPlayerName = useMemo(() => {
    const currentTurn = room?.currentTurn
    if (!currentTurn) return '—'
    const player = players.find(p => p.id === currentTurn)
    return player?.displayName ?? currentTurn
  }, [room, players])

  // Host fallback: prop OR explicit host in room OR first joined player
  const computedIsHost = useMemo(
    () => isHost || room?.hostUid === myUid || (players.length > 0 && players[0]?.id === myUid),
    [isHost, room, myUid, players]
  )

  // Pending stack / chaining awareness
  const pendingType = useMemo<'draw2' | 'draw4' | null>(() => room?.pendingType ?? null, [room])
  const chainingActive = useMemo<boolean>(() => room?.chainPlayer === myUid && room?.chainValue !== null, [room, myUid])

  // Standard playable if no pending stack
  const youHavePlayable = useMemo<boolean>(() => {
    if (!top) return false
    
    // During pending draw, only specific counter cards are playable
    if (pendingType) {
      if (pendingType === 'draw2') {
        return myHand.some(c => c.kind === 'action' && c.action === 'draw2')
      }
      if (pendingType === 'draw4') {
        return myHand.some(c => c.kind === 'wild' && c.action === 'wildDraw4')
      }
      return false
    }
    
    // During chaining, only same number cards are playable
    if (chainingActive) {
      return myHand.some(c => c.kind === 'number' && c.value === room?.chainValue)
    }
    
    // Normal play: any matching card OR wild
    return myHand.some(c => c.kind === 'wild' || matches(top as Card, c))
  }, [top, pendingType, chainingActive, myHand, room])

  const winner = useMemo<string | null>(() => {
    const wuid = room?.winnerUid
    if (!wuid) return null
    return players.find(p => p.id === wuid)?.displayName ?? wuid
  }, [room, players])

  const topChosenColor = useMemo<'red' | 'yellow' | 'green' | 'blue' | null>(() => {
    const t = top as any
    return t && t.kind === 'wild' ? (t.chosenColor ?? null) : null
  }, [top])

  async function playChosenWild(color: 'red' | 'yellow' | 'green' | 'blue') {
    const pw = pendingWild
    if (!pw) return
    const toPlay: any = { ...pw.card, chosenColor: color }
    try {
      await playCardOnline(roomId, toPlay)
    } catch (e: any) {
      alert(e?.message ?? String(e))
    } finally {
      setPendingWild(null)
    }
  }

  // During a pending stack, ONLY allow stacking the same type.
  function canStackSame(c: Card) {
    if (pendingType === 'draw2') return c.kind === 'action' && c.action === 'draw2'
    if (pendingType === 'draw4') return c.kind === 'wild' && c.action === 'wildDraw4'
    return false
  }

  const pendingDrawInfo = useMemo<null | { n: number; type: 'draw2' | 'draw4' | null }>(() => {
    return room?.pendingDraw
      ? { n: room.pendingDraw as number, type: room.pendingType as any }
      : null
  }, [room])

  function cardClickable(c: Card) {
    if (!isMyTurn) return false
    if (pendingType) return canStackSame(c)
    
    // During chaining, only allow same numbers
    if (chainingActive) {
      return c.kind === 'number' && c.value === room?.chainValue
    }
    
    // Normal play: must match top card
    const looksPlayable = !!top && matches(top as Card, c)
    return looksPlayable
  }

  async function onPlayCard(c: Card, i: number) {
    if (!cardClickable(c)) return

    const anyCard = c as any
    if (c.kind === 'wild' && !anyCard.chosenColor) {
      setPendingWild({ index: i, card: c })
      return
    }

    try {
      await playCardOnline(roomId, c)
      setHasDrawnThisTurn(false) // Reset after successful play
    } catch (e: any) {
      alert(e?.message ?? String(e))
    }
  }

  async function onDraw() {
    try {
      await drawOneOnline(roomId)
      setHasDrawnThisTurn(true)
    } catch (e: any) {
      alert(e?.message ?? String(e))
    }
  }

  async function onEndTurn() {
    try {
      await endTurnOnline(roomId)
      setHasDrawnThisTurn(false)
    } catch (e: any) {
      alert(e?.message ?? String(e))
    }
  }

  async function copyCode() {
    try {
      if (room?.code) await navigator.clipboard.writeText(room.code)
    } catch { /* no-op */ }
  }

  if (!room) {
    return <div style={{ padding: '2rem', textAlign: 'center', color: '#6b7280' }}>Loading room…</div>
  }

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial', padding: '1rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>UNO (Online)</h1>

      <div style={{ margin: '.5rem 0', display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
        <div><b>Room:</b> {roomId}</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <b>Code:</b> <code style={{ background: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '4px' }}>{room.code ?? '—'}</code>
          {room.code && (
            <button
              onClick={copyCode}
              style={{ padding: '.25rem .75rem', border: '1px solid #d1d5db', borderRadius: '4px', background: 'white', cursor: 'pointer' }}
            >
              Copy
            </button>
          )}
        </div>
        <div><b>Status:</b> {room.status}</div>
      </div>

      {/* Lobby or finished → Start button for host */}
      {(room.status === 'lobby' || room.status === 'finished') && (
        <div style={{ margin: '1rem 0' }}>
          {computedIsHost ? (
            <button
              onClick={() => startGameClient(roomId)}
              disabled={players.length < 2}
              style={{
                padding: '.5rem 1rem',
                background: '#10b981',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                fontWeight: 'bold',
                cursor: players.length < 2 ? 'not-allowed' : 'pointer',
                opacity: players.length < 2 ? '0.5' : '1'
              }}
              title={players.length < 2 ? 'Need at least 2 players' : 'Start game'}
            >
              Start game
            </button>
          ) : (
            <div style={{ color: '#6b7280' }}>Waiting for host to start…</div>
          )}
        </div>
      )}

      {room.status === 'playing' && (
        <>
          {/* Top Card Display */}
          <div style={{ background: '#2a2a2a', color: '#fff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 .5rem 0' }}>Top Card</h3>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              {top && <CardView card={top} size="lg" />}
              {topChosenColor && (
                <div
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    background: topChosenColor === 'red' ? '#ef4444' : topChosenColor === 'yellow' ? '#fbbf24' : topChosenColor === 'green' ? '#22c55e' : '#3b82f6',
                    color: topChosenColor === 'yellow' ? '#000' : '#fff',
                    padding: '4px 12px',
                    borderRadius: '12px',
                    fontWeight: 'bold',
                    fontSize: '0.85rem',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
                    border: '2px solid white'
                  }}
                >
                  {topChosenColor.toUpperCase()}
                </div>
              )}
            </div>
            <p style={{ marginTop: '.5rem', fontSize: '.9rem' }}>
              Current: <strong>{isMyTurn ? 'You' : currentPlayerName}</strong> |
              Direction: <strong>{room.direction === 1 ? '→' : '←'}</strong>
              {pendingDrawInfo && <span> | Pending: +{pendingDrawInfo.n} ({pendingDrawInfo.type})</span>}
            </p>
          </div>

          {/* Human Player Hand (You) */}
          {isMyTurn ? (
            <div
              style={{ background: '#f0f9ff', padding: '1rem', borderRadius: '8px', marginBottom: '1rem', border: '2px solid #3b82f6' }}
            >
              <h3 style={{ margin: '0 0 .5rem 0', color: '#1e40af' }}>Your Turn!</h3>
              <p style={{ marginBottom: '.5rem', fontSize: '.9rem' }}>Click a card to play it, or draw a card:</p>

              {/* Inline wild picker */}
              {pendingWild ? (
                <div style={{ marginBottom: '1rem', padding: '1rem', background: 'white', borderRadius: '8px', border: '2px solid #3b82f6' }}>
                  <h3 style={{ margin: '0 0 .75rem 0' }}>Choose a color:</h3>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <button onClick={() => playChosenWild('red')} style={{ width: '80px', height: '80px', background: '#ef4444', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>Red</button>
                    <button onClick={() => playChosenWild('yellow')} style={{ width: '80px', height: '80px', background: '#fbbf24', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#000' }}>Yellow</button>
                    <button onClick={() => playChosenWild('green')} style={{ width: '80px', height: '80px', background: '#22c55e', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>Green</button>
                    <button onClick={() => playChosenWild('blue')} style={{ width: '80px', height: '80px', background: '#3b82f6', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>Blue</button>
                    <button onClick={() => setPendingWild(null)} style={{ width: '80px', height: '80px', background: '#6b7280', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#fff' }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap', marginBottom: '.75rem' }}>
                  {myHand.map((c, i) => (
                    <div
                      key={i}
                      onClick={() => onPlayCard(c, i)}
                      className={`card-wrapper ${!cardClickable(c) ? 'disabled' : ''}`}
                      style={{
                        cursor: cardClickable(c) ? 'pointer' : 'not-allowed',
                        position: 'relative',
                        borderRadius: '8px',
                        transition: 'transform 0.2s ease',
                        display: 'inline-block',
                        userSelect: 'none',
                        opacity: cardClickable(c) ? 1 : 0.6
                      }}
                    >
                      <CardView card={c} size="md" />
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
                <button
                  onClick={onDraw}
                  disabled={!isMyTurn || (youHavePlayable && !pendingDrawInfo) || hasDrawnThisTurn}
                  style={{
                    padding: '.5rem 1rem',
                    background: pendingDrawInfo ? '#dc2626' : '#3b82f6',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: (isMyTurn && (pendingDrawInfo || !youHavePlayable) && !hasDrawnThisTurn) ? 'pointer' : 'not-allowed',
                    fontWeight: 'bold',
                    opacity: (isMyTurn && (pendingDrawInfo || !youHavePlayable) && !hasDrawnThisTurn) ? '1' : '0.5'
                  }}
                  title={hasDrawnThisTurn ? 'Already drew this turn' : (youHavePlayable && !pendingDrawInfo ? 'You must play a card' : '')}
                >
                  {pendingDrawInfo ? `Draw +${pendingDrawInfo.n}` : 'Draw Card'}
                </button>

                {((chainingActive || (hasDrawnThisTurn && !youHavePlayable)) && !pendingDrawInfo) && (
                  <button
                    onClick={onEndTurn}
                    style={{ padding: '.5rem 1rem', background: '#f59e0b', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
                    title={chainingActive ? 'End number chain' : 'End your turn (no playable cards)'}
                  >
                    End Turn
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{ background: '#f7f7f8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
              <h3 style={{ margin: '0 0 .5rem 0' }}>Your Hand ({myHand.length})</h3>
              <div style={{ display: 'flex', gap: '.5rem', flexWrap: 'wrap' }}>
                {myHand.map((c, i) => (
                  <div key={i} className="card-wrapper disabled" style={{ opacity: 0.6, cursor: 'not-allowed' }}>
                    <CardView card={c} size="md" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Other Players */}
          <div style={{ background: '#f7f7f8', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <h3 style={{ margin: '0 0 .5rem 0' }}>Players</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {players.map(p => (
                <div
                  key={p.id}
                  style={{
                    padding: '.5rem 1rem',
                    borderRadius: '6px',
                    background: p.id === room.currentTurn ? '#fef3c7' : '#fff',
                    border: p.id === room.currentTurn ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                    fontWeight: p.id === room.currentTurn ? 'bold' : 'normal'
                  }}
                >
                  {p.displayName} — {p.handCount} card{p.handCount === 1 ? '' : 's'}
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Win screen */}
      {room.status === 'finished' && (
        <div style={{ marginTop: '1rem', padding: '1.5rem', borderRadius: '12px', border: '2px solid #10b981', background: '#f0fdf4' }}>
          <p style={{ fontSize: '1.2rem', color: '#4ade80', margin: '0 0 .5rem 0' }}>
            🎉 <strong>{winner ?? 'A player'}</strong> wins!
          </p>
          {computedIsHost ? (
            <button
              onClick={() => startGameClient(roomId)}
              style={{ padding: '.5rem 1rem', background: '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
            >
              Start New Game
            </button>
          ) : (
            <div style={{ color: '#6b7280' }}>Waiting for host to start a new game…</div>
          )}
        </div>
      )}
    </div>
  )
}
