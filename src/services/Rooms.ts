// src/services/rooms.ts
import { onSnapshot, collection, doc } from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "../firebase";

// GraphQL endpoint - your UNO-GRAPHQL-WEB3 server
// For local dev: run your GraphQL server separately, it will be on a different port (e.g., 3000, 4000)
// For production: use your deployed Vercel URL
const GRAPHQL_ENDPOINT = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT || 'http://localhost:3000/api/graphql';

async function callGraphQL(query: string, variables?: Record<string, any>) {
  await ensureAnonAuth();
  const token = await auth.currentUser!.getIdToken();

  const response = await fetch(GRAPHQL_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ query, variables }),
  });

  const result = await response.json();
  
  if (result.errors) {
    throw new Error(result.errors[0]?.message || 'GraphQL Error');
  }
  
  return result.data;
}

export async function createRoom(displayName: string) {
  const query = `
    mutation CreateRoom($displayName: String!) {
      createRoom(displayName: $displayName) {
        roomId
        code
      }
    }
  `;

  const data = await callGraphQL(query, { displayName });
  return { roomId: data.createRoom.roomId, code: data.createRoom.code };
}

export async function joinRoomByCode(code: string, displayName: string) {
  const query = `
    mutation JoinRoom($code: String!, $displayName: String!) {
      joinRoom(code: $code, displayName: $displayName) {
        roomId
      }
    }
  `;

  const data = await callGraphQL(query, { code, displayName });
  return { roomId: data.joinRoom.roomId };
}

export function listenRoom(roomId: string, onRoom: (room:any)=>void, onPlayers:(players:any[])=>void) {
  const unsub1 = onSnapshot(doc(db, "rooms", roomId), s => onRoom({ id: s.id, ...s.data() }));
  const unsub2 = onSnapshot(collection(db, "rooms", roomId, "players"), s =>
    onPlayers(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  return () => { unsub1(); unsub2(); };
}
