// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, signInAnonymously } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBewBUk6Oj4PjB6rVr8iVfZ6Zcyqm7CbXs",
  authDomain: "uno-game-e3329.firebaseapp.com",
  projectId: "uno-game-e3329",
  storageBucket: "uno-game-e3329.appspot.com",
  messagingSenderId: "793495202186",
  appId: "1:793495202186:web:705f97f5e200bf41120073",
  measurementId: "G-6PuJ7DGC39"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Auth + Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);

// Helper: sign in anonymously
export async function ensureAnonAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}
