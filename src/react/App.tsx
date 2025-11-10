import React from "react";
import { Lobby } from "./components/Lobby";
import { GameBoard } from "./components/GameBoard";

declare const __BUILD_TIME__: string | undefined;

export default function App() {
  const [roomInfo, setRoomInfo] = React.useState<{ id: string; host: boolean } | null>(null);
  return (
    <div style={{ fontFamily: "system-ui" }}>
      {!roomInfo && <Lobby onEnter={(r: { id: string; host: boolean }) => setRoomInfo(r)} />}
      {roomInfo && <GameBoard roomId={roomInfo.id} isHost={roomInfo.host} />}
      <div style={{ marginTop: 12, fontSize: 11, opacity: 0.5, padding: "0 12px" }}>Build: {__BUILD_TIME__}</div>
    </div>
  );
}

