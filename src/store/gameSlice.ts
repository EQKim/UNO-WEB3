import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { GameState, RoomDoc } from "./types";
import type { Card } from "../cards/Card";

const initialState: GameState = {
  room: null,
  players: [],
  myHand: [],
  status: "idle",
  error: null
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<GameState["status"]>) {
      state.status = action.payload;
    },
    setRoom(state, action: PayloadAction<RoomDoc | null>) {
      state.room = action.payload;
    },
    setPlayers(state, action: PayloadAction<GameState["players"]>) {
      state.players = action.payload;
    },
    setMyHand(state, action: PayloadAction<Card[]>) {
      state.myHand = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.status = "error";
      state.error = action.payload;
    },
    reset(state) {
      state.room = null;
      state.players = [];
      state.myHand = [];
      state.status = "idle";
      state.error = null;
    }
  }
});

export const { setStatus, setRoom, setPlayers, setMyHand, setError, reset } = gameSlice.actions;
export default gameSlice.reducer;
