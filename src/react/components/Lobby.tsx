import React, { useEffect, useState } from "react";
import { ensureAnonAuth } from "../../firebase";
import { createRoom, joinRoomByCode, listenRoom } from "../../services/Rooms";

interface Player { id: string; displayName: string; isHost?: boolean; }
interface LobbyProps { onEnter(room: { id: string; host: boolean }): void; }

export const Lobby: React.FC<LobbyProps> = ({ onEnter }) => {
  const [displayName, setDisplayName] = useState("Player");
  const [inviteCode, setInviteCode] = useState("");
  const [roomId, setRoomId] = useState<string | null>(null);
  const [room, setRoom] = useState<any | null>(null);
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => { ensureAnonAuth(); }, []);

  useEffect(() => {
    let stop: null | (() => void) = null;
    if (roomId) {
      stop = listenRoom(roomId, (r) => setRoom(r), (ps) => setPlayers(ps as Player[]));
    }
    return () => { if (stop) stop(); };
  }, [roomId]);

  async function handleCreate() {
    const { roomId: id, code } = await createRoom(displayName || "Player");
    setRoomId(id);
    onEnter({ id, host: true });
    console.log("Invite code:", code);
  }

  async function handleJoin() {
    const code = inviteCode.trim();
    if (!code) return;
    const { roomId: id } = await joinRoomByCode(code.toUpperCase(), displayName || "Player");
    setRoomId(id);
    onEnter({ id, host: false });
  }

  return (
    <div style={box}>
      <div style={{ marginBottom: 8 }}>
        <label style={label}>Display name</label>
        <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} style={input} />
      </div>
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
        <button onClick={handleCreate} style={btnGreen}>Create room</button>
        <input
          value={inviteCode}
          onChange={(e) => setInviteCode(e.target.value)}
          placeholder="Enter code"
          style={input}
        />
        <button onClick={handleJoin} style={btnBlue}>Join</button>
      </div>
      {room && (
        <div style={{ fontSize: 12 }}>
          <div><b>Room</b> {roomId}</div>
          <div><b>Code</b> {room.code}</div>
          <div><b>Status</b> {room.status}</div>
          <div style={{ marginTop: 4 }}><b>Players</b></div>
          <ul style={{ marginLeft: 16 }}>
            {players.map(p => (
              <li key={p.id}>{p.displayName}{p.isHost ? " (host)" : ""}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const box: React.CSSProperties = { padding: 12, border: "1px solid #ccc", borderRadius: 6, marginBottom: 16 };
const input: React.CSSProperties = { padding: 6, border: "1px solid #ccc", borderRadius: 4, minWidth: 160 };
const label: React.CSSProperties = { display: "block", fontSize: 12, marginBottom: 4 };
const btnGreen: React.CSSProperties = { padding: "6px 12px", background: "#059669", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
const btnBlue: React.CSSProperties = { padding: "6px 12px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 4, cursor: "pointer" };
