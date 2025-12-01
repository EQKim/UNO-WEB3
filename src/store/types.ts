// src/store/types.ts
// Shared TypeScript types for Redux state

import type { Card } from "../cards/Card";

export interface PlayerData {
  id: string;
  displayName: string;
  isHost?: boolean;
  handCount: number;
  isReady?: boolean;
  joinedAt?: any;
}

export interface RoomData {
  id?: string;
  code?: string;
  status: string;
  currentTurn?: string;
  hostUid?: string;
  winnerUid?: string;
  topCard?: Card;
  direction?: 1 | -1;
  pendingDraw?: number;
  pendingType?: "draw2" | "draw4" | null;
  chainPlayer?: string | null;
  chainValue?: number | null;
  pendingTargetId?: string | null;
  createdAt?: any;
  updatedAt?: any;
}

export interface GameState {
  room: RoomData | null;
  players: PlayerData[];
  myHand: Card[];
}
