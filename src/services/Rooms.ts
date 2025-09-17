// src/services/rooms.ts
import {
  addDoc, collection, doc, getDocs, onSnapshot, query, serverTimestamp, setDoc, where
} from "firebase/firestore";
import { auth, db, ensureAnonAuth } from "../firebase";

export async function createRoom(displayName: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();

  const roomRef = await addDoc(collection(db, "rooms"), {
    code, hostUid: uid, status: "lobby", createdAt: serverTimestamp()
  });

  await setDoc(doc(db, "rooms", roomRef.id, "players", uid), {
    displayName, joinedAt: serverTimestamp(), isReady: false, isHost: true, handCount: 0
  });

  return { roomId: roomRef.id, code };
}

export async function joinRoomByCode(code: string, displayName: string) {
  await ensureAnonAuth();
  const uid = auth.currentUser!.uid;

  const q = query(collection(db, "rooms"), where("code", "==", code));
  const snap = await getDocs(q);
  if (snap.empty) throw new Error("Room not found");

  const roomId = snap.docs[0].id;
  await setDoc(doc(db, "rooms", roomId, "players", uid), {
    displayName, joinedAt: serverTimestamp(), isReady: false, isHost: false, handCount: 0
  }, { merge: true });

  return { roomId };
}

export function listenRoom(roomId: string, onRoom: (room:any)=>void, onPlayers:(players:any[])=>void) {
  const unsub1 = onSnapshot(doc(db, "rooms", roomId), s => onRoom({ id: s.id, ...s.data() }));
  const unsub2 = onSnapshot(collection(db, "rooms", roomId, "players"), s =>
    onPlayers(s.docs.map(d => ({ id: d.id, ...d.data() }))));
  return () => { unsub1(); unsub2(); };
}
