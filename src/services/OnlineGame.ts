import {
  runTransaction, writeBatch, doc, getDocs, collection,
  serverTimestamp, onSnapshot
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "../firebase";
import type { Card } from "../cards/Card";
import { buildDeck, shuffle } from "../cards/Deck";
import { matches } from "../cards/Rules";

/** Safe card equality that survives Firestore serialization. */
function equalCard(a: Card, b: Card): boolean {
  if (a.kind !== b.kind) return false;

  if (a.kind === "number" && b.kind === "number") {
    return a.color === b.color && a.value === b.value;
  }
  if (a.kind === "action" && b.kind === "action") {
    return a.color === b.color && a.action === b.action;
  }
  // wild
  const ac = (a as any).chosenColor ?? null;
  const bc = (b as any).chosenColor ?? null;
  return (a as any).action === (b as any).action && ac === bc;
}

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
  // @ts-ignore
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

/** Play a card (turn enforced; simple advance; no action effects yet) */
export async function playCardOnline(roomId: string, card: Card) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;
  const roomRef = doc(db, "rooms", roomId);
  const myHandRef = doc(db, "rooms", roomId, "hands", uid);

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    const handSnap = await tx.get(myHandRef);
    if (!roomSnap.exists()) throw new Error("Room missing");
    const room = roomSnap.data() as any;
    const myHand = (handSnap.data()?.cards ?? []) as Card[];

    if (room.status !== "playing") throw new Error("Game not started");
    if (room.currentTurn !== uid) throw new Error("Not your turn");
    if (!matches(room.topCard as Card, card)) throw new Error("Illegal play");

    // remove from hand (robust comparison)
    const idx = myHand.findIndex(c => equalCard(c, card));
    if (idx < 0) throw new Error("Card not in hand");
    myHand.splice(idx, 1);

    const discard: Card[] = [ ...(room.discardPile ?? []), card ];

    // next player (clockwise; 2+ players assumed)
    const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
    const ids = playersSnap.docs.map(d => d.id);

    const dir = room.direction ?? 1;
    const curIdx = ids.indexOf(uid);
    const nextUid = ids[(curIdx + dir + ids.length) % ids.length];

    tx.set(myHandRef, { cards: myHand }, { merge: true });
    tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: myHand.length }, { merge: true });
    tx.set(roomRef, {
      topCard: card,
      discardPile: discard,
      currentTurn: nextUid,
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

/** Draw one (turn enforced; drawing ends your turn) */
export async function drawOneOnline(roomId: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;
  const roomRef = doc(db, "rooms", roomId);
  const myHandRef = doc(db, "rooms", roomId, "hands", uid);

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    const handSnap = await tx.get(myHandRef);
    if (!roomSnap.exists()) throw new Error("Room missing");
    const room = roomSnap.data() as any;
    const myHand = (handSnap.data()?.cards ?? []) as Card[];

    if (room.currentTurn !== uid) throw new Error("Not your turn");

    const drawPile: Card[] = [ ...(room.drawPile ?? []) ];
    if (!drawPile.length) throw new Error("No cards to draw");

    const drawn = drawPile.pop()!;
    myHand.push(drawn);

    // end turn after draw (simple rule)
    const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
    const ids = playersSnap.docs.map(d => d.id);

    const dir = room.direction ?? 1;
    const curIdx = ids.indexOf(uid);
    const nextUid = ids[(curIdx + dir + ids.length) % ids.length];

    tx.set(myHandRef, { cards: myHand }, { merge: true });
    tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: myHand.length }, { merge: true });
    tx.set(roomRef, {
      drawPile,
      currentTurn: nextUid,
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}
