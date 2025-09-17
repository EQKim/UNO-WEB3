import { useEffect, useState } from "react";
import { ensureAnonAuth } from "../firebase";
import { createRoom, joinRoomByCode, listenRoom } from "../services/Rooms";

type Player = { id: string; displayName: string; isHost?: boolean };

type LobbyProps = {
  onEnterRoom: (id: string, host: boolean) => void;
};

export default function Lobby({ onEnterRoom }: LobbyProps) {
  const [displayName, setDisplayName] = useState("Player");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [inviteCode, setInviteCode] = useState("");
  const [room, setRoom] = useState<any | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => { ensureAnonAuth(); }, []);

  useEffect(() => {
    if (!roomId) return;
    const stop = listenRoom(roomId, setRoom, setPlayers);
    return () => stop();
  }, [roomId]);

  async function onCreate() {
    const { roomId: id, code } = await createRoom(displayName || "Player");
    setRoomId(id);
    onEnterRoom(id, true);     // ← tell App we entered the room as host
    // you can show the code in UI if you like
    console.log("Invite code:", code);
  }

  async function onJoin() {
    if (!inviteCode.trim()) return;
    const { roomId: id } = await joinRoomByCode(inviteCode.trim().toUpperCase(), displayName || "Player");
    setRoomId(id);
    onEnterRoom(id, false);    // ← tell App we joined as guest
  }

  return (
    <div className="p-3 rounded border border-slate-300 mb-4">
      <div className="mb-2">
        <label className="block text-sm mb-1">Display name</label>
        <input
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          className="border px-2 py-1 rounded w-full"
        />
      </div>

      <div className="flex gap-2">
        <button onClick={onCreate} className="px-3 py-2 rounded bg-emerald-600 text-white">Create room</button>
        <input
          value={inviteCode}
          onChange={e => setInviteCode(e.target.value)}
          placeholder="Enter code"
          className="border px-2 py-1 rounded"
        />
        <button onClick={onJoin} className="px-3 py-2 rounded bg-blue-600 text-white">Join</button>
      </div>

      {room && (
        <div className="mt-3 text-sm">
          <div><b>Room</b> {roomId}</div>
          <div><b>Code</b> {room.code}</div>
          <div><b>Status</b> {room.status}</div>
          <div className="mt-1"><b>Players</b></div>
          <ul className="list-disc ml-6">
            {players.map(p => <li key={p.id}>{p.displayName}{p.isHost ? " (host)" : ""}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
