// src/store/gameSlice.ts
// Redux slice for UNO game state management

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GameState, RoomData, PlayerData } from "./types";
import type { Card } from "../cards/Card";

const initialState: GameState = {
  room: null,
  players: [],
  myHand: []
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setRoom(state, action: PayloadAction<RoomData>) {
      state.room = action.payload;
    },
    setPlayers(state, action: PayloadAction<PlayerData[]>) {
      state.players = action.payload;
    },
    setMyHand(state, action: PayloadAction<Card[]>) {
      state.myHand = action.payload;
    },
    resetGame(state) {
      state.room = null;
      state.players = [];
      state.myHand = [];
    }
  }
});

export const { setRoom, setPlayers, setMyHand, resetGame } = gameSlice.actions;
export default gameSlice.reducer;
