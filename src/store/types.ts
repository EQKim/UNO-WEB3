import type { Card } from "../cards/Card";

export type RoomDoc = {
  id: string;
  code?: string;
  status: "lobby" | "playing" | "finished";
  currentTurn?: string | null;
  hostUid?: string | null;
  winnerUid?: string | null;
  topCard?: Card | null;
  // chaining/stacking extras
  chainPlayer?: string | null;
  chainValue?: number | null;
  pendingDraw?: number | null;
  pendingType?: "draw2" | "draw4" | null;
};

export interface GameState {
  room: RoomDoc | null;
  players: Array<{ id: string; displayName: string; handCount?: number; isHost?: boolean }>;
  myHand: Card[];
  status: "idle" | "subscribing" | "ready" | "error";
  error?: string | null;
}
