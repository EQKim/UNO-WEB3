// src/ui/GameBoard.tsx
import { useEffect, useMemo, useRef, useState } from "react"
import { ensureAnonAuth } from "../firebase"; 
import type { Card } from "../cards/Card"
import { HandView } from "./HandView"
import type { Player } from "../game/Player"
import {
  makeRound,
  currentPlayer,
  advanceTurn,
  topCard,
  playToDiscard,
} from "../game/Round"
import { buildDeck, shuffle, drawOne } from "../cards/Deck"
import { matches } from "../cards/Rules"
import { CardView } from "./CardView";

const MY_ID = "p1"
const AI_ID = "ai1"

/* -------------------- helpers -------------------- */
function initRound() {
  const deck = shuffle(buildDeck())
  const me: Player = { id: MY_ID, name: "You", hand: [] }
  const ai: Player = { id: AI_ID, name: "AI 1", hand: [], isAI: true }
  for (let i = 0; i < 7; i++) {
    me.hand.push(deck.pop()!)
    ai.hand.push(deck.pop()!)
  }
  let first = deck.pop()!
  while (first.kind === "wild") first = deck.pop()!
  return makeRound([me, ai], deck, first)
}

function getPlayerById(players: Player[], id: string) {
  const p = players.find(p => p.id === id)
  if (!p) throw new Error(`Player ${id} not found`)
  return p
}

function chooseColorForWild(hand: Card[]): "red" | "yellow" | "green" | "blue" {
  const counts: Record<string, number> = { red: 0, yellow: 0, green: 0, blue: 0 }
  for (const c of hand) if (c.kind !== "wild") counts[c.color]++
  return (Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] as any) || "red"
}

function cardToText(c: Card) {
  if (c.kind === "number") return `${c.color} ${c.value}`
  if (c.kind === "action") return `${c.color} ${c.action}`
  const suffix = c.action === "wildDraw4" ? "+4" : "wild"
  return c.chosenColor ? `${suffix} (${c.chosenColor})` : suffix
}

/** Apply action effects to NEXT player and return extra skips. */
function applyEffectsAfterPlay(
  round: ReturnType<typeof initRound>,
  played: Card
): number {
  const nextIndex = (round.current + 1) % round.players.length
  const nextPlayer = round.players[nextIndex]
  let extraSkips = 0

  if (played.kind === "action") {
    if (played.action === "skip") {
      extraSkips = 1
    } else if (played.action === "reverse") {
      if (round.players.length === 2) extraSkips = 1
    } else if (played.action === "draw2") {
      for (let i = 0; i < 2; i++) nextPlayer.hand.push(drawOne(round.drawPile, round.discardPile))
      extraSkips = 1
    }
  } else if (played.kind === "wild" && played.action === "wildDraw4") {
    for (let i = 0; i < 4; i++) nextPlayer.hand.push(drawOne(round.drawPile, round.discardPile))
    extraSkips = 1
  }

  return extraSkips
}

/* -------------------- component -------------------- */
export default function GameBoard() {

 // Sign in to Firebase once on mount
  useEffect(() => {
    ensureAnonAuth().then(() => console.log("Firebase anon auth OK"));
  }, []);

  const [round, setRound] = useState(initRound)
  const [winner, setWinner] = useState<string | null>(null)

  // your wild waiting for color
  const [pendingWild, setPendingWild] = useState<Card | null>(null)

  // action log (chronological: old → new)
  const [log, setLog] = useState<string[]>([])
  const logBoxRef = useRef<HTMLDivElement | null>(null)
  const bootLogged = useRef(false)   // avoid double “new round” (StrictMode)
  const aiBusy = useRef(false)       // avoid double AI runs (StrictMode)
  const thinking = useRef(false)     // quick flag for “AI is thinking…”

  function addLog(msg: string) {
    setLog(prev => {
      const next = [...prev, msg]
      return next.length > 200 ? next.slice(next.length - 200) : next
    })
  }

  // auto-scroll log to bottom on change
  useEffect(() => {
    const el = logBoxRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  const me = getPlayerById(round.players, MY_ID)
  const ai = getPlayerById(round.players, AI_ID)
  const cur = currentPlayer(round)
  const top = topCard(round)

  const youHavePlayable = useMemo(
    () => me.hand.some(c => matches(top, c)),
    [me.hand, top]
  )

  function commit() { setRound({ ...round }) }

  function endIfWinner(playerName: string, hand: Card[]) {
    if (hand.length === 0) {
      setWinner(playerName)
      addLog(`${playerName} wins!`)
      return true
    }
    return false
  }

  // log once at boot
  useEffect(() => {
    if (bootLogged.current) return
    bootLogged.current = true
    addLog(`New round. Top: ${cardToText(topCard(round))}. Current: ${currentPlayer(round).name}`)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // core play + effects + logging
  function actuallyPlayCard(c: Card) {
    const playerNow = currentPlayer(round)
    const name = playerNow.name

    const hand = playerNow.hand
    const idx = hand.indexOf(c)
    if (idx >= 0) hand.splice(idx, 1)

    playToDiscard(round, c)
    addLog(`${name} played ${cardToText(c)}`)

    if (endIfWinner(name, playerNow.hand)) { commit(); return }

    // describe effects for next player
    const nextIndex = (round.current + 1) % round.players.length
    const nextPlayer = round.players[nextIndex]

    if (c.kind === "action") {
      if (c.action === "skip") addLog(`${nextPlayer.name} is skipped`)
      if (c.action === "reverse" && round.players.length === 2) addLog(`Reverse acts as skip → ${nextPlayer.name} is skipped`)
      if (c.action === "draw2") addLog(`${nextPlayer.name} draws 2 and is skipped`)
    } else if (c.kind === "wild" && c.action === "wildDraw4") {
      addLog(`${nextPlayer.name} draws 4 and is skipped`)
    }

    const extraSkips = applyEffectsAfterPlay(round as any, c)
    for (let i = 0; i < 1 + extraSkips; i++) advanceTurn(round)

    addLog(`Top now: ${cardToText(topCard(round))}. Current: ${currentPlayer(round).name}`)
    commit()
  }

  /* ----- your actions ----- */
  function playCard(c: Card) {
    if (winner || cur.id !== MY_ID || pendingWild) return
    if (!matches(top, c)) return

    if (c.kind === "wild") {
      setPendingWild(c)
      return
    }
    actuallyPlayCard(c)
  }

  // “draw until playable” for you (auto-plays the drawn playable)
  function draw() {
    if (winner || cur.id !== MY_ID || pendingWild) return
    if (youHavePlayable) return

    let drew = 0
    for (let tries = 0; tries < 200; tries++) {
      const d = drawOne(round.drawPile, round.discardPile)
      me.hand.push(d)
      drew++
      if (matches(topCard(round), d)) {
        if (d.kind === "wild") {
          addLog(`You drew ${drew} and got a playable WILD`)
          setPendingWild(d) // picker will play it
          commit()
          return
        } else {
          addLog(`You drew ${drew} and auto-played ${cardToText(d)}`)
          commit()
          actuallyPlayCard(d)
          return
        }
      }
    }
    // safety (should never hit with a real deck)
    addLog("You drew many cards but couldn't play (fallback pass)")
    advanceTurn(round)
    commit()
  }

  /* ----- AI turn: single-run, draw-until-playable, robust ----- */
  useEffect(() => {
    if (winner) return
    const cp = currentPlayer(round)
    if (!cp.isAI) return
    if (aiBusy.current) return
    aiBusy.current = true
    thinking.current = true

    let cancelled = false

    const run = async () => {
      // tiny delay so you see “AI is thinking…”
      await new Promise(r => setTimeout(r, 1500))
      if (cancelled) { aiBusy.current = false; thinking.current = false; return }

      let drew = 0
      // up to 200 iterations is overkill, but guarantees progress in dev
      for (let i = 0; i < 200; i++) {
        const playable = cp.hand.find(c => matches(topCard(round), c))
        if (playable) {
          cp.hand.splice(cp.hand.indexOf(playable), 1)
          if (playable.kind === "wild") {
            playable.chosenColor = chooseColorForWild(cp.hand)
            addLog(`${cp.name} chose ${playable.chosenColor!.toUpperCase()} for wild`)
          }
          if (drew > 0) addLog(`${cp.name} drew ${drew} then played ${cardToText(playable)}`)
          else addLog(`${cp.name} played ${cardToText(playable)}`)

          playToDiscard(round, playable)
          if (endIfWinner(cp.name, cp.hand)) { commit(); aiBusy.current = false; thinking.current = false; return }

          const extraSkips = applyEffectsAfterPlay(round as any, playable)
          for (let j = 0; j < 1 + extraSkips; j++) advanceTurn(round)

          addLog(`Top now: ${cardToText(topCard(round))}. Current: ${currentPlayer(round).name}`)
          commit()
          aiBusy.current = false
          thinking.current = false
          return
        }

        // draw one and keep trying
        cp.hand.push(drawOne(round.drawPile, round.discardPile))
        drew++
      }

      // safety fallback
      addLog(`${cp.name} couldn't find a play after many draws (fallback pass)`)
      advanceTurn(round)
      commit()
      aiBusy.current = false
      thinking.current = false
    }

    run()
    return () => { cancelled = true }
  }, [round.current,round.discardPile.length, winner])

  function restart() {
    setWinner(null)
    setPendingWild(null)
    aiBusy.current = false
    thinking.current = false
    const r = initRound()
    setRound(r)
    setLog([`New round. Top: ${cardToText(r.discardPile[r.discardPile.length - 1])}. Current: ${r.players[r.current].name}`])
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="p-6 relative space-y-3">
      <h1 className="text-3xl font-extrabold">UNO</h1>

      <div><b>Current:</b> {currentPlayer(round).name}</div>
      {currentPlayer(round).isAI && !winner && thinking.current && (
        <div className="text-sm text-slate-500">AI is thinking…</div>
      )}

      <div className="mt-2 flex items-center gap-3">
  <div className="text-sm font-semibold">Top card:</div>
  <CardView card={top} size="lg" />   {/* read-only, no onPlay */}
  {top.kind === "wild" && top.chosenColor && (
    <span className="text-slate-500 text-sm">({top.chosenColor})</span>
  )}
</div>

      <div className="mt-3 flex gap-2">
        <button
          onClick={draw}
          disabled={!!winner || currentPlayer(round).id !== MY_ID || !!pendingWild || youHavePlayable}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-sm hover:bg-blue-700 active:scale-[.99] disabled:opacity-50 disabled:cursor-not-allowed transition"
          title={youHavePlayable ? "You already have a playable card" : "Draw until you can play"}
        >
          Draw
        </button>
      </div>

      <HandView hand={me.hand} onPlay={playCard} title="Your hand" />

      {/* Opponent */}
      <div className="mt-4">
        <h3 className="mb-1 font-semibold">
          AI 1 <span className="text-slate-500">({ai.hand.length} cards)</span>
        </h3>
        <div className="flex gap-1.5">
          {Array.from({ length: ai.hand.length }).map((_, i) => (
            <div key={i} className="h-16 w-10 rounded-lg bg-slate-900 border border-slate-600" />
          ))}
        </div>
      </div>

      <div className="text-slate-500">Draw pile: {round.drawPile.length}</div>

      {/* Action Log (chronological: old → new) */}
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Action Log</h3>
        <div
          ref={logBoxRef}
          className="max-h-48 overflow-auto rounded border border-slate-300 bg-white"
        >
          <ul className="text-sm divide-y divide-slate-200">
            {log.map((line, i) => (
              <li key={i} className="px-3 py-2">{line}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Winner overlay */}
      {winner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white text-black p-6 rounded-xl shadow-2xl min-w-[280px] text-center">
            <h2 className="text-xl font-extrabold mb-2">Game Over</h2>
            <p className="mb-4"><b>{winner}</b> win!</p>
            <button
              onClick={restart}
              className="px-4 py-2 rounded-lg border border-neutral-800 hover:bg-neutral-100 active:scale-[.99]"
            >
              Play again
            </button>
          </div>
        </div>
      )}

      {/* Color picker for YOUR wilds */}
      {pendingWild && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-60">
          <div className="bg-white text-black p-5 rounded-xl shadow-2xl min-w-[260px] text-center">
            <h3 className="font-bold mb-3">Choose a color</h3>
            <div className="flex gap-2 justify-center">
              {(["red", "yellow", "green", "blue"] as const).map(color => (
                <button
                  key={color}
                  onClick={() => {
                    if (!pendingWild || pendingWild.kind !== "wild") return
                    pendingWild.chosenColor = color
                    addLog(`You chose ${color.toUpperCase()} for wild`)
                    setPendingWild(null)
                    actuallyPlayCard(pendingWild)
                  }}
                  className={[
                    "px-4 py-2 rounded-lg text-white border border-neutral-800",
                    color === "red"    ? "bg-red-500 hover:bg-red-600" :
                    color === "yellow" ? "bg-yellow-500 hover:bg-yellow-600" :
                    color === "green"  ? "bg-green-500 hover:bg-green-600" :
                                         "bg-blue-500 hover:bg-blue-600"
                  ].join(" ")}
                >
                  {color.toUpperCase()}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
