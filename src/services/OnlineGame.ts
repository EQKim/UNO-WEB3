// src/services/OnlineGame.ts
import { auth, ensureAnonAuth } from "../firebase";
import type { Card } from "../cards/Card";

/**
 * GraphQL endpoint
 * 
 * For development: You need to run the GraphQL server separately
 * Options:
 * 1. Deploy api-graphql-FIXED.ts to Vercel
 * 2. Run GraphQL server locally and use: http://localhost:3001/api/graphql
 * 3. Use the deployed endpoint (if available): https://uno-graphql-web-3.vercel.app/api/graphql
 * 
 * NOTE: If you get "Failed to fetch" errors, the GraphQL server is not running.
 * For Assignment 6 demo purposes, you can test the lobby/room creation which only uses Firebase.
 * Game actions (start game, play card, draw) require the GraphQL server.
 */
const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || "https://uno-graphql-web-3.vercel.app/api/graphql";

/** Tiny helper to call GraphQL with Firebase ID token */
async function gql<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  await ensureAnonAuth();
  const token = await auth.currentUser?.getIdToken();

  let res: Response;
  try {
    res = await fetch(GRAPHQL_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        ...(token ? { authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify({ query, variables }),
    });
  } catch (error) {
    console.error("Failed to fetch GraphQL endpoint:", GRAPHQL_URL, error);
    throw new Error(
      `❌ GraphQL Server Not Available\n\n` +
      `Cannot reach: ${GRAPHQL_URL}\n\n` +
      `The GraphQL server is required for game actions (start game, play cards, draw).\n` +
      `Lobby and room creation work without it (Firebase only).\n\n` +
      `To fix this:\n` +
      `1. Deploy api-graphql-FIXED.ts to Vercel, OR\n` +
      `2. Run GraphQL server locally and set NEXT_PUBLIC_GRAPHQL_URL\n\n` +
      `For Assignment 6 demo, the Next.js SSR architecture is complete even without the GraphQL backend.`
    );
  }

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
