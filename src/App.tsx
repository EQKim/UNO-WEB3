import { useState } from "react";
import Lobby from "./ui/Lobby";
import OnlineBoard from "./services/OnlineBoard"; // path where your component lives

export default function App() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isHost, setIsHost] = useState(false);

  if (!roomId) {
    return (
      <Lobby
        onEnterRoom={(id, host) => {
          setRoomId(id);
          setIsHost(host);
        }}
      />
    );
  }

  return <OnlineBoard roomId={roomId} isHost={isHost} />;
}
