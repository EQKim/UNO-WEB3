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
  // wild: ignore chosenColor when comparing (hand copy usually has none)
  // @ts-expect-error 'action' exists on wild
  return a.action === (b as any).action;
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

  // room core state (clear any winner/flow fields)
  batch.set(doc(db, "rooms", roomId), {
    status: "playing",
    currentTurn: playerIds[0],
    direction: 1,
    topCard: top,
    drawPile: deck,            // simple for MVP
    discardPile: [top],
    // stacking & chaining state
    pendingDraw: 0,            // total to draw for the current victim
    pendingType: null,         // "draw2" | "draw4" | null
    chainValue: null,          // number value the current player may continue to play
    chainPlayer: null,         // uid who is chaining number cards
    winnerUid: null,
    finishedAt: null,
    updatedAt: serverTimestamp()
  }, { merge: true });

  // hands + public handCount
  for (const id of playerIds) {
    batch.set(doc(db, "rooms", roomId, "hands", id), { cards: hands[id] });
    batch.set(doc(db, "rooms", roomId, "players", id), { handCount: hands[id].length }, { merge: true });
  }

  await batch.commit();
}

/** Helpers */
function nextIndex(ids: string[], idx: number, dir: number) {
  return (idx + dir + ids.length) % ids.length;
}

/** Play a card with:
 * - Stacking +2/+4: only same type stacks
 * - Number chaining: same number (any color) lets you keep playing; player may call endTurnOnline() to pass
 */
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

    // Players order and direction
    const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
    const ids = playersSnap.docs.map(d => d.id);
    let dir: number = room.direction ?? 1;
    const curIdx = ids.indexOf(uid);
    const nIdx = nextIndex(ids, curIdx, dir);

    // Piles
    const drawPile: Card[] = [ ...(room.drawPile ?? []) ];
    const discard: Card[] = [ ...(room.discardPile ?? []) ];

    // ---------- LEGALITY CHECK ----------
    const pendingDraw: number = room.pendingDraw ?? 0;
    const pendingType: "draw2" | "draw4" | null = room.pendingType ?? null;
    const chainValue: number | null = room.chainValue ?? null;
    const chainPlayer: string | null = room.chainPlayer ?? null;

    if (pendingDraw > 0) {
      // Only allowed to play same-type stack
      const isDraw2 = card.kind === "action" && card.action === "draw2";
      // @ts-ignore
      const isDraw4 = card.kind === "wild" && card.action === "draw4";
      if (!((pendingType === "draw2" && isDraw2) || (pendingType === "draw4" && isDraw4))) {
        throw new Error(`You must draw ${pendingDraw} or stack another ${pendingType === "draw2" ? "+2" : "+4"}`);
      }
      // color match is ignored for stacking +2; +4 is wild anyway
    } else if (chainValue !== null) {
      // Only the chaining player can act, and only with the same number
      if (chainPlayer !== uid) throw new Error("Other player must end their chain");
      if (!(card.kind === "number" && card.value === chainValue)) {
        throw new Error(`You can only play another ${chainValue} or end your turn`);
      }
    } else {
      // Normal legality
      if (!matches(room.topCard as Card, card)) throw new Error("Illegal play");
    }

    // ---------- APPLY: remove from hand ----------
    const idx = myHand.findIndex(c => equalCard(c, card));
    if (idx < 0) throw new Error("Card not in hand");
    myHand.splice(idx, 1);
    discard.push(card);

    // ---------- WIN CHECK ----------
    if (myHand.length === 0) {
      tx.set(myHandRef, { cards: [] }, { merge: true });
      tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: 0 }, { merge: true });
      tx.set(roomRef, {
        topCard: card,
        discardPile: discard,
        status: "finished",
        winnerUid: uid,
        // clear flow fields
        pendingDraw: 0,
        pendingType: null,
        chainValue: null,
        chainPlayer: null,
        finishedAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      }, { merge: true });
      return;
    }

    // ---------- EFFECTS & TURN LOGIC ----------
    let turnIdx = nIdx; // default: pass to next
    let nextPendingDraw = pendingDraw;
    let nextPendingType: "draw2" | "draw4" | null = pendingType;
    let nextChainValue: number | null = null;
    let nextChainPlayer: string | null = null;

    if (pendingDraw > 0) {
      // We already validated it's a same-type stack
      if (pendingType === "draw2") nextPendingDraw += 2;
      if (pendingType === "draw4") nextPendingDraw += 4;
      // After stacking, pass burden to the next player
      turnIdx = nIdx;
      // keep same pendingType
    } else if (chainValue !== null) {
      // Continue number chain; keep turn if you still have same number
      const stillHasSame = myHand.some(c => c.kind === "number" && c.value === chainValue);
      if (stillHasSame) {
        // player keeps turn
        turnIdx = curIdx;
        nextChainValue = chainValue;
        nextChainPlayer = uid;
      } else {
        // pass turn
        turnIdx = nIdx;
      }
    } else {
      // No pending, no chain: resolve based on card
      if (card.kind === "action") {
        if (card.action === "skip") {
          turnIdx = nextIndex(ids, nIdx, dir); // skip one
        } else if (card.action === "reverse") {
          dir = -dir;
          // with 2 players, reverse behaves like skip
          if (ids.length === 2) {
            turnIdx = nextIndex(ids, nIdx, dir);
          } else {
            // after reversing, the next player is the previous player in the new direction
            turnIdx = nextIndex(ids, curIdx, dir);
          }
        } else if (card.action === "draw2") {
          nextPendingDraw = 2;
          nextPendingType = "draw2";
          turnIdx = nIdx; // victim's turn to respond
        }
      } else if (card.kind === "wild") {
        // @ts-ignore
        if (card.action === "draw4") {
          nextPendingDraw = 4;
          nextPendingType = "draw4";
          turnIdx = nIdx; // victim's turn to respond
        } else {
          // plain wild color change: normal advance
          turnIdx = nIdx;
        }
      } else if (card.kind === "number") {
        // Offer number-chaining: keep turn if you still have same number
        const val = card.value;
        const stillHasSame = myHand.some(c => c.kind === "number" && c.value === val);
        if (stillHasSame) {
          turnIdx = curIdx;             // keep turn
          nextChainValue = val;
          nextChainPlayer = uid;
        } else {
          turnIdx = nIdx;
        }
      }
    }

    const nextUid = ids[turnIdx];

    // ---------- WRITE STATE ----------
    tx.set(myHandRef, { cards: myHand }, { merge: true });
    tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: myHand.length }, { merge: true });

    tx.set(roomRef, {
      topCard: card,
      discardPile: discard,
      drawPile,
      currentTurn: nextUid,
      direction: dir,
      pendingDraw: nextPendingDraw,
      pendingType: nextPendingType,
      chainValue: nextChainValue,
      chainPlayer: nextChainPlayer,
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

/** Draw action:
 * - If there's a pending stack against you, draw ALL pending and end turn.
 * - Otherwise draw ONE and end turn.
 */
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

    // players
    const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
    const ids = playersSnap.docs.map(d => d.id);
    const dir = room.direction ?? 1;
    const curIdx = ids.indexOf(uid);
    const nextUid = ids[nextIndex(ids, curIdx, dir)];

    const pendingDraw: number = room.pendingDraw ?? 0;

    if (pendingDraw > 0) {
      // Draw ALL pending, clear, and pass
      for (let i = 0; i < pendingDraw; i++) {
        if (!drawPile.length) throw new Error("No cards to draw"); // MVP: no reshuffle
        myHand.push(drawPile.pop()!);
      }

      tx.set(myHandRef, { cards: myHand }, { merge: true });
      tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: myHand.length }, { merge: true });
      tx.set(roomRef, {
        drawPile,
        currentTurn: nextUid,
        pendingDraw: 0,
        pendingType: null,
        chainValue: null,
        chainPlayer: null,
        updatedAt: serverTimestamp()
      }, { merge: true });
      return;
    }

    // Normal draw ONE, end turn
    if (!drawPile.length) throw new Error("No cards to draw");
    const drawn = drawPile.pop()!;
    myHand.push(drawn);

    tx.set(myHandRef, { cards: myHand }, { merge: true });
    tx.set(doc(db, "rooms", roomId, "players", uid), { handCount: myHand.length }, { merge: true });
    tx.set(roomRef, {
      drawPile,
      currentTurn: nextUid,
      chainValue: null,
      chainPlayer: null,
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

/** End the current player's voluntary number-chain turn (no draw). */
export async function endTurnOnline(roomId: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;
  const roomRef = doc(db, "rooms", roomId);

  await runTransaction(db, async (tx) => {
    const roomSnap = await tx.get(roomRef);
    if (!roomSnap.exists()) throw new Error("Room missing");
    const room = roomSnap.data() as any;

    if (room.currentTurn !== uid) throw new Error("Not your turn");
    if (room.chainPlayer !== uid || room.chainValue === null) {
      throw new Error("You have nothing to end");
    }

    const playersSnap = await getDocs(collection(db, "rooms", roomId, "players"));
    const ids = playersSnap.docs.map(d => d.id);
    const dir = room.direction ?? 1;
    const curIdx = ids.indexOf(uid);
    const nextUid = ids[nextIndex(ids, curIdx, dir)];

    tx.set(roomRef, {
      currentTurn: nextUid,
      chainValue: null,
      chainPlayer: null,
      updatedAt: serverTimestamp()
    }, { merge: true });
  });
}

//HELLO JUST TO TEST
