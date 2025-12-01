'use client'

import { useState } from 'react'
import Lobby from '../components/Lobby'
import OnlineBoard from '../components/OnlineBoard'

export default function LobbyPage() {
  const [roomInfo, setRoomInfo] = useState<{ id: string; host: boolean } | null>(null)

  if (roomInfo) {
    return <OnlineBoard roomId={roomInfo.id} isHost={roomInfo.host} />
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-8">UNO Lobby</h1>
      <div className="w-full max-w-md">
        <Lobby onEnterRoom={setRoomInfo} />
      </div>
      <div className="mt-8">
        <a href="/" className="text-blue-600 hover:underline">
          ← Back to Home
        </a>
      </div>
    </main>
  )
}
