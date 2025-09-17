import {
  writeBatch, doc, getDoc, getDocs, collection, serverTimestamp,
  onSnapshot
} from "firebase/firestore";

import { auth, db, ensureAnonAuth } from "../firebase";
import type { Card } from "../cards/Card";
import { buildDeck, shuffle } from "../cards/Deck";

/** Listen to room core state + your hand + players list */
export function subscribeOnlineGame(
  roomId: string,
  handlers: {
    onRoom: (room: any) => void,
    onPlayers: (players: any[]) => void,
    onMyHand: (hand: Card[]) => void
  }
) {
  const unsubRoom = onSnapshot(doc(db, "rooms", roomId), s => handlers.onRoom({ id: s.id, ...s.data() }));
  const unsubPlayers = onSnapshot(collection(db, "rooms", roomId, "players"), s =>
    handlers.onPlayers(s.docs.map(d => ({ id: d.id, ...d.data() })))
  );
  const myId = auth.currentUser?.uid;
  const unsubHand = myId
    ? onSnapshot(doc(db, "rooms", roomId, "hands", myId), s => handlers.onMyHand((s.data()?.cards ?? []) as Card[]))
    : () => {};

  return () => { unsubRoom(); unsubPlayers(); unsubHand(); };
}

/** TEMP: Start game on client (MVP). Later move to Cloud Functions */
export async function startGameClient(roomId: string) {
  await ensureAnonAuth();
  const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
  const playerIds = playersSnap.docs.map(d => d.id);
  if (playerIds.length < 2) throw new Error("Need at least 2 players");

  // build & shuffle deck
  const deck = shuffle(buildDeck());

  // deal 7 each
  const hands: Record<string, Card[]> = {};
  for (const id of playerIds) hands[id] = deck.splice(0, 7);

  // find first non-wild top card
  let top = deck.pop()!;
  // @ts-ignore (same shape as your Card type)
  while (top.kind === "wild") { deck.unshift(top); top = deck.pop()!; }

  const batch = writeBatch(db);

  // room core state
  batch.set(doc(db, "rooms", roomId), {
    status: "playing",
    currentTurn: playerIds[0],
    direction: 1,
    topCard: top,
    drawPile: deck,            // simple for MVP
    discardPile: [top],
    updatedAt: serverTimestamp()
  }, { merge: true });

  // hands + public handCount
  for (const id of playerIds) {
    batch.set(doc(db, "rooms", roomId, "hands", id), { cards: hands[id] });
    batch.set(doc(db, "rooms", roomId, "players", id), { handCount: hands[id].length }, { merge: true });
  }

  await batch.commit();
}

/** Play a card (MVP: no server validation yet) */
export async function playCardOnline(roomId: string, card: Card) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;

  // Read your current hand
  // (We’re using set with array filter to keep it simple client-side.)
  const handRef = doc(db, "rooms", roomId, "hands", uid);
  const roomRef = doc(db, "rooms", roomId);

  // Pull current state
  const [handSnap, roomSnap] = await Promise.all([
  getDoc(handRef),
  getDoc(roomRef)
]);


  const myCards = (handSnap?.data()?.cards ?? []) as Card[];
  const idx = myCards.findIndex(c =>
    JSON.stringify(c) === JSON.stringify(card)
  );
  if (idx < 0) throw new Error("Card not in hand");

  myCards.splice(idx, 1);

  const discard = (roomSnap?.data()?.discardPile ?? []) as Card[];
  discard.push(card);

  const batch = writeBatch(db);
  batch.set(handRef, { cards: myCards }, { merge: true });
  batch.set(doc(db, "rooms", roomId, "players", uid), { handCount: myCards.length }, { merge: true });
  batch.set(roomRef, { topCard: card, discardPile: discard, updatedAt: serverTimestamp() }, { merge: true });
  await batch.commit();
}

/** Draw one (MVP) */
export async function drawOneOnline(roomId: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;

  const handRef = doc(db, "rooms", roomId, "hands", uid);
  const roomRef = doc(db, "rooms", roomId);

const [handSnap, roomSnap] = await Promise.all([
  getDoc(handRef),
  getDoc(roomRef)
]);


  const myCards = (handSnap?.data()?.cards ?? []) as Card[];
  const drawPile = (roomSnap?.data()?.drawPile ?? []) as Card[];

  if (!drawPile.length) throw new Error("No cards to draw");

  const card = drawPile.pop();

  const batch = writeBatch(db);
  batch.set(handRef, { cards: [...myCards, card] }, { merge: true });
  batch.set(doc(db, "rooms", roomId, "players", uid), { handCount: myCards.length + 1 }, { merge: true });
  batch.set(roomRef, { drawPile, updatedAt: serverTimestamp() }, { merge: true });
  await batch.commit();
}
