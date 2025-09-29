// src/services/OnlineGame.ts
import { onSnapshot, doc, collection } from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "../firebase";
import type { Card } from "../cards/Card";

/**
 * GraphQL endpoint
 * - dev: vercel dev (yoga at http://localhost:3000/api/graphql)
 * - prod: your deployed Vercel function
 */
const GRAPHQL_URL = "https://uno-graphql-web-3.vercel.app/api/graphql";

/** Tiny helper to call GraphQL with Firebase ID token */
async function gql<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
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

/* -------------------- subscriptions (unchanged, still Firestore) -------------------- */
export function subscribeOnlineGame(
  roomId: string,
  handlers: {
    onRoom: (room: any) => void;
    onPlayers: (players: any[]) => void;
    onMyHand: (hand: Card[]) => void;
  }
) {
  const unsubRoom = onSnapshot(doc(db, "rooms", roomId), (s) =>
    handlers.onRoom({ id: s.id, ...s.data() })
  );

  const unsubPlayers = onSnapshot(
    collection(db, "rooms", roomId, "players"),
    (s) => handlers.onPlayers(s.docs.map((d) => ({ id: d.id, ...d.data() })))
  );

  const myId = auth.currentUser?.uid;
  const unsubHand = myId
    ? onSnapshot(doc(db, "rooms", roomId, "hands", myId), (s) =>
        handlers.onMyHand((s.data()?.cards ?? []) as Card[])
      )
    : () => {};

  return () => {
    unsubRoom();
    unsubPlayers();
    unsubHand();
  };
}

/* -------------------- mutations (now go through GraphQL) -------------------- */

export async function startGameClient(roomId: string) {
  type R = { startGame: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { startGame(roomId: $roomId) }`,
    { roomId }
  );
}

export async function playCardOnline(roomId: string, card: Card) {
  type R = { playCard: boolean };
  await gql<R>(
    `mutation ($roomId: ID!, $card: JSON!) { playCard(roomId: $roomId, card: $card) }`,
    { roomId, card }
  );
}

export async function drawOneOnline(roomId: string) {
  type R = { drawOne: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { drawOne(roomId: $roomId) }`,
    { roomId }
  );
}

export async function endTurnOnline(roomId: string) {
  type R = { endTurn: boolean };
  await gql<R>(
    `mutation ($roomId: ID!) { endTurn(roomId: $roomId) }`,
    { roomId }
  );
}
