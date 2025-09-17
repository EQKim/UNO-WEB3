import { useEffect, useMemo, useState } from "react";
import type { Card } from "../cards/Card";
import { CardView } from "../ui/CardView";
import { subscribeOnlineGame, startGameClient, playCardOnline, drawOneOnline } from "../services/onlineGame";
import { matches } from "../cards/Rules";

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

  const youHavePlayable = useMemo(
    () => !!top && myHand.some(c => matches(top, c)),
    [myHand, top]
  );

  if (!room) return <div className="p-6">Loading room…</div>;

  return (
    <div className="p-6 space-y-3">
      <h1 className="text-3xl font-extrabold">UNO (Online)</h1>

      <div><b>Room:</b> {roomId}</div>
      <div><b>Status:</b> {room.status}</div>
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
              onClick={() => drawOneOnline(roomId)}
              disabled={room.status !== "playing"}
              className="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
              title={youHavePlayable ? "You already have a playable card" : "Draw one"}
            >
              Draw
            </button>
          </div>

          <div className="mt-4">
            <h3 className="font-semibold mb-1">Your hand ({myHand.length})</h3>
            <div className="flex flex-wrap gap-1.5">
              {myHand.map((c, i) => (
                <div key={i} onClick={() => top && matches(top, c) && playCardOnline(roomId, c)} className="cursor-pointer">
                  <CardView card={c} size="md" />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
