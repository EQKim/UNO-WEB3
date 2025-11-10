import React, { useEffect, useState, useMemo } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { startListeningToRoom } from "../../store/streams";
import { auth } from "../../firebase";
import { matches } from "../../cards/Rules";
import type { Card } from "../../cards/Card";
import { playCardOnline, drawOneOnline, endTurnOnline, startGameClient } from "../../services/OnlineGame";
import { CardView } from "./CardView";

interface Props { roomId: string; isHost: boolean; }

export const GameBoard: React.FC<Props> = ({ roomId, isHost }) => {
  const room = useSelector((s: RootState) => s.game.room);
  const players = useSelector((s: RootState) => s.game.players);
  const myHand = useSelector((s: RootState) => s.game.myHand);
  const [pendingWild, setPendingWild] = useState<{ index: number; card: Card } | null>(null);
  const [stop, setStop] = useState<null | (() => void)>(null);

  useEffect(() => {
    if (stop) stop();
    const unsub = startListeningToRoom(roomId);
    setStop(() => unsub);
    return () => { if (unsub) unsub(); };
  }, [roomId]);

  const myUid = auth.currentUser?.uid;
  const top = room?.topCard as Card | undefined;
  const isMyTurn = room?.currentTurn === myUid && room?.status === "playing";
  const computedIsHost = isHost || room?.hostUid === myUid || (players.length > 0 && players[0].id === myUid);

  const pendingType = room?.pendingType as ("draw2" | "draw4" | null);
  const chainingActive = room?.chainPlayer === myUid && room?.chainValue !== null;

  function canStackSame(c: Card) {
    if (pendingType === "draw2") return c.kind === "action" && c.action === "draw2";
    if (pendingType === "draw4") return c.kind === "wild" && c.action === "wildDraw4";
    return false;
  }
  function canChainNumber(c: Card) {
    return chainingActive && c.kind === "number" && c.value === room?.chainValue;
  }
  function cardClickable(c: Card) {
    if (!isMyTurn) return false;
    if (pendingType) return canStackSame(c);
    return (!!top && matches(top, c)) || canChainNumber(c);
  }

  const pendingDrawInfo = useMemo(() => {
    return room?.pendingDraw ? { n: room.pendingDraw as number, type: pendingType } : null;
  }, [room?.pendingDraw, pendingType]);

  const topChosenColor = useMemo(() => {
    if (top && top.kind === "wild") return (top as any).chosenColor ?? null;
    return null;
  }, [top]);

  async function playChosenWild(color: "red" | "yellow" | "green" | "blue") {
    const pw = pendingWild;
    if (!pw) return;
    const toPlay: any = { ...pw.card, chosenColor: color };
    try { await playCardOnline(roomId, toPlay); } catch (e:any) { alert(e.message ?? String(e)); }
    setPendingWild(null);
  }

  async function onPlayCard(c: Card, i: number) {
    if (!cardClickable(c)) return;
    if (c.kind === "wild" && !(c as any).chosenColor) {
      setPendingWild({ index: i, card: c });
      return;
    }
    try { await playCardOnline(roomId, c); } catch (e:any) { alert(e.message ?? String(e)); }
  }
  async function onDraw() { try { await drawOneOnline(roomId); } catch (e:any) { alert(e.message ?? String(e)); } }
  async function onEndTurn() { try { await endTurnOnline(roomId); } catch (e:any) { alert(e.message ?? String(e)); } }
  async function onStartGame() { try { await startGameClient(roomId); } catch (e:any) { alert(e.message ?? String(e)); } }

  const winnerUid = room?.winnerUid;
  const winnerName = winnerUid ? (players.find(p => p.id === winnerUid)?.displayName || winnerUid) : null;

  return (
    <div style={{ padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>UNO (React)</h1>
      <div><b>Room:</b> {roomId}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
        <div><b>Code:</b> <code>{room?.code ?? "—"}</code></div>
        {room?.code && (
          <button
            onClick={() => navigator.clipboard?.writeText(room.code as string).catch(() => {})}
            style={{ padding: "2px 8px", border: "1px solid #ccc", borderRadius: 4, fontSize: 12, cursor: "pointer" }}
            title="Copy invite code"
          >
            Copy
          </button>
        )}
      </div>
      <div><b>Status:</b> {room?.status}</div>
      <div><b>Turn:</b> {room?.status === "finished" ? "—" : (isMyTurn ? "You" : room?.currentTurn ?? "—")}</div>
      <div><b>Players:</b> {players.map(p => p.displayName).join(", ")}</div>

      {(room?.status === "lobby" || room?.status === "finished") && (
        <div style={{ marginTop: 12 }}>
          {computedIsHost ? (
            <button onClick={onStartGame} disabled={players.length < 2} style={btnPrimary}>
              Start game
            </button>
          ) : (
            <div>Waiting for host to start…</div>
          )}
        </div>
      )}

      {room?.status === "playing" && (
        <>
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontWeight: 600 }}>Top card:</div>
            {top && (
              <CardView card={top} size="md" disabled title="Top card" />
            )}
            {topChosenColor && (
              <div style={{ padding: "2px 6px", border: "1px solid #ccc", borderRadius: 4, fontSize: 12 }}>
                Current color: {topChosenColor}
              </div>
            )}
            {pendingDrawInfo && (
              <div style={{ padding: "2px 6px", border: "1px solid #ccc", borderRadius: 4, fontSize: 12 }}>
                {pendingDrawInfo.type === "draw4" ? "+4" : "+2"} stack: draw {pendingDrawInfo.n}
              </div>
            )}
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
            <button onClick={onDraw} disabled={!isMyTurn} style={btnBlue}>{pendingDrawInfo ? `Draw ${pendingDrawInfo.n}` : "Draw"}</button>
            {chainingActive && (
              <button onClick={onEndTurn} style={btnGray}>End Turn</button>
            )}
          </div>

            {pendingWild && (
              <div style={{ marginTop: 12, display: "flex", gap: 8, alignItems: "center" }}>
                <span style={{ fontSize: 12 }}>Pick color:</span>
                {(["red","yellow","green","blue"] as const).map(c => (
                  <button key={c} onClick={() => playChosenWild(c)} style={{ ...btnSmall, background: colorBg[c], color: c === "yellow" ? "#000" : "#fff" }}>{c}</button>
                ))}
                <button onClick={() => setPendingWild(null)} style={btnSmall}>Cancel</button>
              </div>
            )}

          <div style={{ marginTop: 16 }}>
            <h3 style={{ fontWeight: 600 }}>Your hand ({myHand.length})</h3>
            <div style={{ display: "flex", flexWrap: "wrap" }}>
              {myHand.map((c, i) => {
                const playable = cardClickable(c);
                return (
                  <CardView
                    key={i}
                    card={c}
                    size="lg"
                    disabled={!playable}
                    onPlay={() => onPlayCard(c, i)}
                    title={playable ? "Play" : "Not playable"}
                  />
                );
              })}
            </div>
          </div>
        </>
      )}

      {room?.status === "finished" && (
        <div style={{ marginTop: 20, padding: 12, border: "1px solid #ccc", borderRadius: 8 }}>
          <div style={{ fontSize: 20, fontWeight: 700 }}>🎉 {winnerName ?? "A player"} won!</div>
          <div style={{ fontSize: 12, marginTop: 4 }}>Game over{topChosenColor ? ` — final color: ${topChosenColor}` : ""}.</div>
          {computedIsHost ? (
            <button onClick={onStartGame} style={{ ...btnPrimary, marginTop: 8 }}>Start new game</button>
          ) : (
            <div style={{ marginTop: 8 }}>Waiting for host to start a new game…</div>
          )}
        </div>
      )}

      <div style={{ marginTop: 24, fontSize: 11, opacity: 0.6 }}>Build: {typeof __BUILD_TIME__ !== 'undefined' ? __BUILD_TIME__ : 'dev'}</div>
    </div>
  );
};

declare const __BUILD_TIME__: string | undefined;

const btnPrimary: React.CSSProperties = { padding: "6px 12px", background: "#059669", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
const btnBlue: React.CSSProperties = { padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
const btnGray: React.CSSProperties = { padding: "6px 12px", background: "#374151", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" };
const btnSmall: React.CSSProperties = { padding: "4px 8px", background: "#6b7280", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontSize: 12 };
const cardStyle: React.CSSProperties = { margin: 4, padding: 6, minWidth: 70, border: "1px solid #999", borderRadius: 6, background: "#fff" };
const colorBg: Record<string,string> = { red: "#ef4444", yellow: "#eab308", green: "#22c55e", blue: "#3b82f6" };
