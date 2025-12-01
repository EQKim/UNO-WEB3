// src/store/store.ts
// Redux store configuration

import { configureStore } from "@reduxjs/toolkit";
import gameReducer from "./gameSlice";

export const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore Firestore Timestamp objects in actions/state
        ignoredActions: ["game/setRoom", "game/setPlayers"],
        ignoredPaths: ["game.room.createdAt", "game.room.updatedAt", "game.players"]
      }
    })
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
