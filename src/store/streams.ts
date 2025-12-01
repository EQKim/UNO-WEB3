// src/store/streams.ts
// RxJS Observables wrapping Firestore snapshots
// Assignment 5 requirement: Use RxJS for handling messages from the server

import { Observable, Subscription } from "rxjs";
import { onSnapshot, doc, collection } from "firebase/firestore";
import { auth, db } from "../firebase";
import type { Card } from "../cards/Card";
import { store } from "./store";
import { setRoom, setPlayers, setMyHand } from "./gameSlice";

/**
 * Sanitize Firestore data to be Redux-serializable
 * Converts Timestamps and other non-serializable objects to plain values
 */
function sanitize(data: any): any {
  if (!data) return data;
  if (typeof data !== 'object') return data;
  
  // Handle Firestore Timestamp
  if (data.toDate && typeof data.toDate === 'function') {
    return data.toDate().toISOString();
  }
  
  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => sanitize(item));
  }
  
  // Handle objects
  const sanitized: any = {};
  for (const key in data) {
    sanitized[key] = sanitize(data[key]);
  }
  return sanitized;
}

/**
 * Create an RxJS Observable from a Firestore document snapshot
 */
export function createDocumentObservable<T>(
  docPath: string
): Observable<T | null> {
  return new Observable((subscriber) => {
    const docRef = doc(db, docPath);
    
    const unsubscribe = onSnapshot(
      docRef,
      (snapshot) => {
        if (snapshot.exists()) {
          subscriber.next({ id: snapshot.id, ...snapshot.data() } as T);
        } else {
          subscriber.next(null);
        }
      },
      (error) => {
        subscriber.error(error);
      }
    );
    
    // Cleanup function
    return () => unsubscribe();
  });
}

/**
 * Create an RxJS Observable from a Firestore collection snapshot
 */
export function createCollectionObservable<T>(
  collectionPath: string
): Observable<T[]> {
  return new Observable((subscriber) => {
    const collectionRef = collection(db, collectionPath);
    
    const unsubscribe = onSnapshot(
      collectionRef,
      (snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        })) as T[];
        subscriber.next(docs);
      },
      (error) => {
        subscriber.error(error);
      }
    );
    
    // Cleanup function
    return () => unsubscribe();
  });
}

/**
 * Start listening to room, players, and hand updates using RxJS
 * Automatically dispatches to Redux store
 */
export function startListeningToRoom(roomId: string): () => void {
  console.log("[RxJS] Starting listeners for room:", roomId);
  const subscriptions: Subscription[] = [];
  
  // Room observable → Redux
  const roomObservable = createDocumentObservable<any>(`rooms/${roomId}`);
  subscriptions.push(
    roomObservable.subscribe({
      next: (room) => {
        console.log("[RxJS] Room update:", room);
        if (room) {
          store.dispatch(setRoom(sanitize(room)));
        }
      },
      error: (err) => console.error("Room stream error:", err)
    })
  );
  
  // Players observable → Redux
  const playersObservable = createCollectionObservable<any>(
    `rooms/${roomId}/players`
  );
  subscriptions.push(
    playersObservable.subscribe({
      next: (players) => {
        console.log("[RxJS] Players update:", players);
        store.dispatch(setPlayers(sanitize(players)));
      },
      error: (err) => console.error("Players stream error:", err)
    })
  );
  
  // My hand observable → Redux
  const myId = auth.currentUser?.uid;
  console.log("[RxJS] Current user ID:", myId);
  if (myId) {
    const handObservable = createDocumentObservable<{ cards: Card[] }>(
      `rooms/${roomId}/hands/${myId}`
    );
    subscriptions.push(
      handObservable.subscribe({
        next: (handDoc) => {
          console.log("[RxJS] Hand update:", handDoc);
          store.dispatch(setMyHand(sanitize(handDoc?.cards ?? [])));
        },
        error: (err) => console.error("Hand stream error:", err)
      })
    );
  }
  
  // Return cleanup function
  return () => {
    console.log("[RxJS] Cleaning up listeners for room:", roomId);
    subscriptions.forEach((sub) => sub.unsubscribe());
  };
}
