// src/services/OnlineGame.ts
import { auth, ensureAnonAuth } from "../firebase";
import type { Card } from "../cards/Card";

/**
 * GraphQL endpoint
 * Using deployed Vercel endpoint
 * NOTE: If you get CORS errors, the server needs to allow your origin
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

/* -------------------- GraphQL mutations -------------------- */

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
