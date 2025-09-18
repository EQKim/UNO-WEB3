import { useEffect, useMemo, useState } from "react";
import type { Card } from "../cards/Card";
import { CardView } from "../ui/CardView";
import {
  subscribeOnlineGame,
  startGameClient,
  playCardOnline,
  drawOneOnline,
  endTurnOnline
} from "../services/OnlineGame";
import { matches } from "../cards/Rules";
import { auth } from "../firebase";

type Props = { roomId: string; isHost: boolean };

export default function OnlineBoard({ roomId, isHost }: Props) {
  const [room, setRoom] = useState<any | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [myHand, setMyHand] = useState<Card[]>([]);
  const [pendingWild, setPendingWild] = useState<{ index: number; card: Card } | null>(null);

  useEffect(() => {
    const stop = subscribeOnlineGame(roomId, {
      onRoom: setRoom,
      onPlayers: setPlayers,
      onMyHand: setMyHand
    });
    return () => stop();
  }, [roomId]);

  const top: Card | null = room?.topCard ?? null;
  const myUid = auth.currentUser?.uid ?? null;
  const isMyTurn = room?.currentTurn === myUid && room?.status === "playing";

  // Host fallback: prop OR explicit host in room OR first joined player
  const computedIsHost =
    isHost || room?.hostUid === myUid || (players.length > 0 && players[0]?.id === myUid);

  const youHavePlayable = useMemo(
    () => !!top && myHand.some(c => matches(top, c)),
    [myHand, top]
  );

  if (!room) return <div className="p-6">Loading room…</div>;

  const winner =
    room?.winnerUid
      ? players.find(p => p.id === room.winnerUid)?.displayName ?? room.winnerUid
      : null;

  const topChosenColor = (top && (top as any).kind === "wild")
    ? ((top as any).chosenColor ?? null)
    : null;

  const playChosenWild = async (color: "red" | "yellow" | "green" | "blue") => {
    const pw = pendingWild;
    if (!pw) return;
    const toPlay: any = { ...pw.card, chosenColor: color };
    try {
      await playCardOnline(roomId, toPlay);
    } catch (e: any) {
      alert(e.message ?? String(e));
    } finally {
      setPendingWild(null);
    }
  };

  const chainingActive = room?.chainPlayer === myUid && room?.chainValue !== null;
  const pendingDrawInfo = room?.pendingDraw ? { n: room.pendingDraw as number, type: room.pendingType as "draw2" | "draw4" | null } : null;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-3xl font-extrabold">UNO (Online)</h1>

      <div><b>Room:</b> {roomId}</div>
      <div className="flex items-center gap-2">
        <div><b>Code:</b> <code>{room.code ?? "—"}</code></div>
        {room.code && (
          <button
            onClick={() => navigator.clipboard.writeText(room.code).catch(() => {})}
            className="px-2 py-1 text-sm rounded border"
          >
            Copy
          </button>
        )}
      </div>

      <div><b>Status:</b> {room.status}</div>
      <div><b>Turn:</b> {room.status === "finished" ? "—" : (isMyTurn ? "You" : (room.currentTurn ?? "—"))}</div>
      <div><b>Players:</b> {players.map(p => p.displayName).join(", ")}</div>

      {/* Lobby or finished → Start button for host */}
      {(room.status === "lobby" || room.status === "finished") && (
        <div className="mt-2">
          {computedIsHost ? (
            <button
              className="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
              onClick={() => startGameClient(roomId)}
              disabled={players.length < 2}
              title={players.length < 2 ? "Need at least 2 players" : "Start game"}
            >
              Start game
            </button>
          ) : (
            <div>Waiting for host to start…</div>
          )}
        </div>
      )}

      {room.status === "playing" && (
        <>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-sm font-semibold">Top card:</div>
            {top && <CardView card={top} size="lg" />}

            {/* Current color badge (for wild / +4) */}
            {topChosenColor && (
              <div
                className="ml-2 px-2 py-1 rounded text-sm font-semibold border"
                title="Current color chosen for wild"
                style={{
                  background:
                    topChosenColor === "red" ? "#fee2e2" :
                    topChosenColor === "yellow" ? "#fef9c3" :
                    topChosenColor === "green" ? "#dcfce7" :
                    "#dbeafe"
                }}
              >
                Current color: {topChosenColor}
              </div>
            )}

            {/* Pending draw info (stacking) */}
            {pendingDrawInfo && (
              <div className="ml-2 px-2 py-1 rounded text-sm font-semibold border">
                {pendingDrawInfo.type === "draw4" ? "+4" : "+2"} stack: draw {pendingDrawInfo.n}
              </div>
            )}
          </div>

          <div className="mt-3 flex items-center gap-2">
            <button
              onClick={async () => {
                try { await drawOneOnline(roomId); }
                catch (e: any) { alert(e.message ?? String(e)); }
              }}
              disabled={!isMyTurn}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              title={
                pendingDrawInfo
                  ? `Draw ${pendingDrawInfo.n} and pass`
                  : (youHavePlayable ? "You already have a playable card" : "Draw one")
              }
            >
              {pendingDrawInfo ? `Draw ${pendingDrawInfo.n}` : "Draw"}
            </button>

            {/* End turn shows only during number-chaining */}
            {chainingActive && (
              <button
                onClick={async () => {
                  try { await endTurnOnline(roomId); }
                  catch (e: any) { alert(e.message ?? String(e)); }
                }}
                className="px-4 py-2 rounded bg-gray-700 text-white"
                title="Finish your number chain and pass the turn"
              >
                End turn
              </button>
            )}
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Your hand ({myHand.length})</h3>

            {/* Inline wild picker */}
            {pendingWild && (
              <div className="mb-2 flex items-center gap-2">
                <span className="text-sm">Pick color:</span>
                <button type="button" onClick={() => playChosenWild("red")}
                        className="px-3 py-1 rounded border" style={{ background: "#ef4444", color: "white" }}>red</button>
                <button type="button" onClick={() => playChosenWild("yellow")}
                        className="px-3 py-1 rounded border" style={{ background: "#eab308" }}>yellow</button>
                <button type="button" onClick={() => playChosenWild("green")}
                        className="px-3 py-1 rounded border" style={{ background: "#22c55e", color: "white" }}>green</button>
                <button type="button" onClick={() => playChosenWild("blue")}
                        className="px-3 py-1 rounded border" style={{ background: "#3b82f6", color: "white" }}>blue</button>
                <button type="button" onClick={() => setPendingWild(null)}
                        className="px-2 py-1 rounded border" title="Cancel">Cancel</button>
              </div>
            )}

            <div className="flex flex-wrap gap-1.5">
              {myHand.map((c, i) => {
                const looksPlayable = !!top && matches(top, c);
                const canClick = isMyTurn && looksPlayable;

                return (
                  <button
                    key={i}
                    type="button"
                    onClick={async () => {
                      if (!canClick) return;

                      if (c.kind === "wild" && !(c as any).chosenColor) {
                        setPendingWild({ index: i, card: c });
                        return;
                      }

                      try {
                        await playCardOnline(roomId, c);
                      } catch (e: any) {
                        alert(e.message ?? String(e));
                      }
                    }}
                    disabled={!canClick}
                    className={[
                      "relative inline-block p-0 border-0 bg-transparent",
                      canClick ? "cursor-pointer" : "opacity-60 cursor-default"
                    ].join(" ")}
                    aria-disabled={!canClick}
                  >
                    <CardView card={c} size="md" />
                    <span className="absolute inset-0" />
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Win Screen */}
      {room.status === "finished" && (
        <div className="mt-4 p-4 rounded-xl border bg-white/70 backdrop-blur">
          <div className="text-xl font-bold mb-1">🎉 {winner ?? "A player"} won!</div>
          <div className="text-sm text-gray-600 mb-3">
            Game over{topChosenColor ? ` — final color: ${topChosenColor}` : ""}.
          </div>
          {computedIsHost ? (
            <button
              className="px-4 py-2 rounded bg-emerald-600 text-white"
              onClick={() => startGameClient(roomId)}
            >
              Start new game
            </button>
          ) : (
            <div>Waiting for host to start a new game…</div>
          )}
        </div>
      )}
    </div>
  );
}
