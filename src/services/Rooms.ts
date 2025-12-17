// src/services/rooms.ts
import { collection, doc, onSnapshot } from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "../firebase";

/**
 * GraphQL endpoint (same as OnlineGame.ts)
 */
const GRAPHQL_URL = "https://uno-graphql-web-3.vercel.app/api/graphql";

/** Helper to call GraphQL with Firebase auth */
async function gql<T>(query: string, variables?: Record<string, any>): Promise<T> {
  await ensureAnonAuth();
  const token = await auth.currentUser?.getIdToken();

  const res = await fetch(GRAPHQL_URL, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`GraphQL HTTP ${res.status} ${res.statusText} ${text}`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0]?.message ?? "GraphQL error");
  }
  return json.data as T;
}

/**
 * Create room via GraphQL mutation
 */
export async function createRoom(displayName: string) {
  type Response = { createRoom: { roomId: string; code: string } };
  
  const result = await gql<Response>(
    `mutation ($displayName: String!) {
      createRoom(displayName: $displayName) {
        roomId
        code
      }
    }`,
    { displayName }
  );

  return { roomId: result.createRoom.roomId, code: result.createRoom.code };
}

/**
 * Join room via GraphQL mutation
 */
export async function joinRoomByCode(code: string, displayName: string) {
  type Response = { joinRoom: { roomId: string } };
  
  const result = await gql<Response>(
    `mutation ($code: String!, $displayName: String!) {
      joinRoom(code: $code, displayName: $displayName) {
        roomId
      }
    }`,
    { code, displayName }
  );

  return { roomId: result.joinRoom.roomId };
}

export function listenRoom(roomId: string, onRoom: (room:any)=>void, onPlayers:(players:any[])=>void) {
  const unsub1 = onSnapshot(doc(db, "rooms", roomId), s => onRoom({ id: s.id, ...s.data() }));
  const unsub2 = onSnapshot(collection(db, "rooms", roomId, "players"), s =>
    onPlayers(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  return () => { unsub1(); unsub2(); };
}
