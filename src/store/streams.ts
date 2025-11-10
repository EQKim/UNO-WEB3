import { Observable, Subscription } from "rxjs";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { Card } from "../cards/Card";
import type { RoomDoc } from "./types";
import { store } from "./store";
import { setRoom, setPlayers, setMyHand, setStatus, setError } from "./gameSlice";

function roomObservable(roomId: string) {
  return new Observable<RoomDoc | null>((subscriber) => {
    const unsub = onSnapshot(
      doc(db, "rooms", roomId),
      (s) => subscriber.next({ id: s.id, ...(s.data() as any) } as RoomDoc),
      (err) => subscriber.error?.(err)
    );
    return () => unsub();
  });
}

function playersObservable(roomId: string) {
  return new Observable<Array<any>>((subscriber) => {
    const unsub = onSnapshot(
      collection(db, "rooms", roomId, "players"),
      (s) => subscriber.next(s.docs.map((d) => ({ id: d.id, ...d.data() }))),
      (err) => subscriber.error?.(err)
    );
    return () => unsub();
  });
}

function myHandObservable(roomId: string) {
  const uid = auth.currentUser?.uid;
  return new Observable<Card[]>((subscriber) => {
    if (!uid) {
      subscriber.next([]);
      subscriber.complete?.();
      return () => {};
    }
    const unsub = onSnapshot(
      doc(db, "rooms", roomId, "hands", uid),
      (s) => subscriber.next(((s.data()?.cards ?? []) as Card[])),
      (err) => subscriber.error?.(err)
    );
    return () => unsub();
  });
}

export function startListeningToRoom(roomId: string) {
  // Update status
  store.dispatch(setStatus("subscribing"));

  const subs = new Subscription();
  subs.add(
    roomObservable(roomId).subscribe({
      next: (r) => store.dispatch(setRoom(r)),
      error: (e) => store.dispatch(setError(e?.message ?? String(e)))
    })
  );
  subs.add(
    playersObservable(roomId).subscribe({
      next: (p) => store.dispatch(setPlayers(p)),
      error: (e) => store.dispatch(setError(e?.message ?? String(e)))
    })
  );
  subs.add(
    myHandObservable(roomId).subscribe({
      next: (h) => store.dispatch(setMyHand(h)),
      error: (e) => store.dispatch(setError(e?.message ?? String(e)))
    })
  );

  // Mark ready after first tick
  const readyTimeout = setTimeout(() => store.dispatch(setStatus("ready")), 0);

  return () => {
    clearTimeout(readyTimeout);
    subs.unsubscribe();
  };
}
