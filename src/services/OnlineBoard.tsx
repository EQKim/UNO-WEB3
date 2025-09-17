import { useEffect, useMemo, useState } from "react";
import type { Card } from "../cards/Card";
import { CardView } from "../ui/CardView";
import { subscribeOnlineGame, startGameClient, playCardOnline, drawOneOnline } from "../services/OnlineGame";
import { matches } from "../cards/Rules";
import { auth } from "../firebase";

type Props = { roomId: string; isHost: boolean };

export default function OnlineBoard({ roomId, isHost }: Props) {
  const [room, setRoom] = useState<any | null>(null);
  const [players, setPlayers] = useState<any[]>([]);
  const [myHand, setMyHand] = useState<Card[]>([]);

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
  const isMyTurn = room?.currentTurn === myUid;

  const youHavePlayable = useMemo(
    () => !!top && myHand.some(c => matches(top, c)),
    [myHand, top]
  );

  if (!room) return <div className="p-6">Loading room…</div>;

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
      <div><b>Turn:</b> {isMyTurn ? "You" : (room.currentTurn ?? "—")}</div>
      <div><b>Players:</b> {players.map(p => p.displayName).join(", ")}</div>

      {room.status !== "playing" && (
        <div className="mt-2">
          {isHost
            ? <button className="px-4 py-2 rounded bg-emerald-600 text-white" onClick={() => startGameClient(roomId)}>Start game</button>
            : <div>Waiting for host to start…</div>}
        </div>
      )}

      {room.status === "playing" && (
        <>
          <div className="mt-2 flex items-center gap-3">
            <div className="text-sm font-semibold">Top card:</div>
            {top && <CardView card={top} size="lg" />}
          </div>

          <div className="mt-3 flex gap-2">
            <button
              onClick={async () => {
                try { await drawOneOnline(roomId); } catch (e:any) { alert(e.message ?? String(e)); }
              }}
              disabled={!isMyTurn}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              title={youHavePlayable ? "You already have a playable card" : "Draw one"}
            >
              Draw
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Your hand ({myHand.length})</h3>
            <div className="flex flex-wrap gap-1.5">
              {myHand.map((c, i) => {
                const playable = !!top && matches(top, c) && isMyTurn;
                return (
                  <div
                    key={i}
                    onClick={async () => {
                      if (!playable) return;
                      // quick wild color prompt
                      const card = { ...c } as any;
                      if (card.kind === "wild" && !card.chosenColor) {
                        const pick = prompt("Pick color: red / yellow / green / blue")?.toLowerCase();
                        if (!pick || !["red","yellow","green","blue"].includes(pick)) return;
                        card.chosenColor = pick;
                      }
                      try { await playCardOnline(roomId, card); } catch (e:any) { alert(e.message ?? String(e)); }
                    }}
                    className={playable ? "cursor-pointer" : "opacity-60"}
                  >
                    <CardView card={c} size="md" />
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
