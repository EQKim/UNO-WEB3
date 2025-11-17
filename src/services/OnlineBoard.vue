<template>
  <div v-if="room" style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 1rem; max-width: 1200px; margin: 0 auto;">
    <h1>UNO (Online)</h1>

    <div style="margin: .5rem 0; display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
      <div><b>Room:</b> {{ roomId }}</div>
      <div style="display: flex; align-items: center; gap: 0.5rem;">
        <b>Code:</b> <code style="background: #f3f4f6; padding: 0.25rem 0.5rem; border-radius: 4px;">{{ room.code ?? "—" }}</code>
        <button
          v-if="room.code"
          @click="copyCode"
          style="padding: .25rem .75rem; border: 1px solid #d1d5db; border-radius: 4px; background: white; cursor: pointer;"
        >
          Copy
        </button>
      </div>
      <div><b>Status:</b> {{ room.status }}</div>
    </div>

    <!-- Lobby or finished → Start button for host -->
    <div style="margin: 1rem 0;" v-if="room.status === 'lobby' || room.status === 'finished'">
      <button
        v-if="computedIsHost"
        @click="startGameClient(roomId)"
        :disabled="players.length < 2"
        style="padding: .5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;"
        :style="{ opacity: players.length < 2 ? '0.5' : '1', cursor: players.length < 2 ? 'not-allowed' : 'pointer' }"
        :title="players.length < 2 ? 'Need at least 2 players' : 'Start game'"
      >
        Start game
      </button>
      <div v-else style="color: #6b7280;">Waiting for host to start…</div>
    </div>

    <template v-if="room.status === 'playing'">
      <!-- Top Card Display -->
      <div style="background: #2a2a2a; color: #fff; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h3 style="margin: 0 0 .5rem 0;">Top Card</h3>
        <div style="position: relative; display: inline-block;">
          <CardView v-if="top" :card="top" size="lg" />
          <div
            v-if="topChosenColor"
            :style="{
              position: 'absolute',
              bottom: '10px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: topChosenColor === 'red' ? '#ef4444' : topChosenColor === 'yellow' ? '#fbbf24' : topChosenColor === 'green' ? '#22c55e' : '#3b82f6',
              color: topChosenColor === 'yellow' ? '#000' : '#fff',
              padding: '4px 12px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '0.85rem',
              boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
              border: '2px solid white'
            }"
          >
            {{ topChosenColor.toUpperCase() }}
          </div>
        </div>
        <p style="margin-top: .5rem; font-size: .9rem;">
          Current: <strong>{{ isMyTurn ? 'You' : currentPlayerName }}</strong> |
          Direction: <strong>{{ room.direction === 1 ? '→' : '←' }}</strong>
          <span v-if="pendingDrawInfo"> | Pending: +{{ pendingDrawInfo.n }} ({{ pendingDrawInfo.type }})</span>
        </p>
      </div>

      <!-- Human Player Hand (You) -->
      <div
        v-if="isMyTurn"
        style="background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 2px solid #3b82f6;"
      >
        <h3 style="margin: 0 0 .5rem 0; color: #1e40af;">Your Turn!</h3>
        <p style="margin-bottom: .5rem; font-size: .9rem;">Click a card to play it, or draw a card:</p>

        <!-- Inline wild picker -->
        <div v-if="pendingWild" style="margin-bottom: 1rem; padding: 1rem; background: white; border-radius: 8px; border: 2px solid #3b82f6;">
          <h3 style="margin: 0 0 .75rem 0;">Choose a color:</h3>
          <div style="display: flex; gap: 1rem;">
            <button @click="playChosenWild('red')" style="width: 80px; height: 80px; background: #ef4444; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Red</button>
            <button @click="playChosenWild('yellow')" style="width: 80px; height: 80px; background: #fbbf24; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #000;">Yellow</button>
            <button @click="playChosenWild('green')" style="width: 80px; height: 80px; background: #22c55e; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Green</button>
            <button @click="playChosenWild('blue')" style="width: 80px; height: 80px; background: #3b82f6; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Blue</button>
            <button @click="pendingWild = null" style="width: 80px; height: 80px; background: #6b7280; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Cancel</button>
          </div>
        </div>

        <div v-else style="display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: .75rem;">
          <div
            v-for="(c, i) in myHand"
            :key="i"
            @click="onPlayCard(c, i)"
            :class="['card-wrapper', { 'disabled': !cardClickable(c) }]"
          >
            <CardView :card="c" size="md" />
          </div>
        </div>

        <div style="display: flex; gap: .5rem; align-items: center;">
          <button
            @click="onDraw"
            :disabled="!isMyTurn || (youHavePlayable && !pendingDrawInfo) || hasDrawnThisTurn"
            :style="{
              padding: '.5rem 1rem',
              background: pendingDrawInfo ? '#dc2626' : '#3b82f6',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: (isMyTurn && (!youHavePlayable || pendingDrawInfo) && !hasDrawnThisTurn) ? 'pointer' : 'not-allowed',
              fontWeight: 'bold',
              opacity: (isMyTurn && (!youHavePlayable || pendingDrawInfo) && !hasDrawnThisTurn) ? '1' : '0.5'
            }"
            :title="hasDrawnThisTurn ? 'Already drew this turn' : (youHavePlayable && !pendingDrawInfo ? 'You must play a card' : '')"
          >
            {{ pendingDrawInfo ? `Draw +${pendingDrawInfo.n}` : "Draw Card" }}
          </button>

          <button
            v-if="(chainingActive || (hasDrawnThisTurn && !youHavePlayable)) && !pendingDrawInfo"
            @click="onEndTurn"
            style="padding: .5rem 1rem; background: #f59e0b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
            :title="chainingActive ? 'End number chain' : 'End your turn (no playable cards)'"
          >
            End Turn
          </button>
        </div>
      </div>

      <!-- When NOT your turn -->
      <div v-else style="background: #f7f7f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h3 style="margin: 0 0 .5rem 0;">Your Hand ({{ myHand.length }})</h3>
        <div style="display: flex; gap: .5rem; flex-wrap: wrap;">
          <div v-for="(c, i) in myHand" :key="i" class="card-wrapper disabled">
            <CardView :card="c" size="md" />
          </div>
        </div>
      </div>

      <!-- Other Players -->
      <div style="background: #f7f7f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h3 style="margin: 0 0 .5rem 0;">Players</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div
            v-for="p of players"
            :key="p.id"
            :style="{
              padding: '.5rem 1rem',
              borderRadius: '6px',
              background: p.id === room.currentTurn ? '#fef3c7' : '#fff',
              border: p.id === room.currentTurn ? '2px solid #f59e0b' : '1px solid #e5e7eb',
              fontWeight: p.id === room.currentTurn ? 'bold' : 'normal'
            }"
          >
            {{ p.displayName }} — {{ p.handCount }} card{{ p.handCount === 1 ? '' : 's' }}
          </div>
        </div>
      </div>
    </template>

    <!-- Win screen -->
    <div v-if="room.status === 'finished'" style="margin-top: 1rem; padding: 1.5rem; border-radius: 12px; border: 2px solid #10b981; background: #f0fdf4;">
      <p style="font-size: 1.2rem; color: #4ade80; margin: 0 0 .5rem 0;">
        🎉 <strong>{{ winner ?? 'A player' }}</strong> wins!
      </p>
      <button
        v-if="computedIsHost"
        @click="startGameClient(roomId)"
        style="padding: .5rem 1rem; background: #10b981; color: white; border: none; border-radius: 4px; cursor: pointer; font-weight: bold;"
      >
        Start New Game
      </button>
      <div v-else style="color: #6b7280;">Waiting for host to start a new game…</div>
    </div>
  </div>

  <div v-else style="padding: 2rem; text-align: center; color: #6b7280;">Loading room…</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";
import type { Card } from "../cards/Card";
import CardView from "../ui/CardView.vue";
import {
  startGameClient,
  playCardOnline,
  drawOneOnline,
  endTurnOnline,
  subscribeOnlineGame
} from "./OnlineGame";
import { matches } from "../cards/Rules";
import { auth } from "../firebase";

type Props = { roomId: string; isHost: boolean };
const { roomId, isHost } = defineProps<Props>();

// Local reactive state instead of Redux
const room = ref<any | null>(null);
const players = ref<any[]>([]);
const myHand = ref<Card[]>([]);
const pendingWild = ref<{ index: number; card: Card } | null>(null);
const hasDrawnThisTurn = ref(false);

let unsubscribe: (() => void) | null = null;

onMounted(() => {
  unsubscribe = subscribeOnlineGame(roomId, {
    onRoom: (r) => {
      const wasMyTurn = room.value?.currentTurn === myUid.value;
      const isNowMyTurn = r?.currentTurn === myUid.value;
      if (!wasMyTurn && isNowMyTurn) {
        hasDrawnThisTurn.value = false;
      }
      room.value = r;
    },
    onPlayers: (ps) => (players.value = ps),
    onMyHand: (hand) => (myHand.value = hand)
  });
});

onUnmounted(() => {
  if (unsubscribe) unsubscribe();
});

const top = computed<Card | null>(() => room.value?.topCard ?? null);
const myUid = computed(() => auth.currentUser?.uid ?? null);
const isMyTurn = computed(() => room.value?.currentTurn === myUid.value && room.value?.status === "playing");

const currentPlayerName = computed(() => {
  const currentTurn = room.value?.currentTurn;
  if (!currentTurn) return '—';
  const player = players.value.find(p => p.id === currentTurn);
  return player?.displayName ?? currentTurn;
});

// Host fallback: prop OR explicit host in room OR first joined player
const computedIsHost = computed(() =>
  isHost || room.value?.hostUid === myUid.value || (players.value.length > 0 && players.value[0]?.id === myUid.value)
);

// Pending stack / chaining awareness
const pendingType = computed<"draw2" | "draw4" | null>(() => (room.value?.pendingType ?? null));
const chainingActive = computed<boolean>(() => room.value?.chainPlayer === myUid.value && room.value?.chainValue !== null);

// Standard playable if no pending stack
const youHavePlayable = computed<boolean>(() => {
  if (!top.value) return false;
  
  // During pending draw, only specific counter cards are playable
  if (pendingType.value) {
    if (pendingType.value === "draw2") {
      return myHand.value.some(c => c.kind === "action" && c.action === "draw2");
    }
    if (pendingType.value === "draw4") {
      return myHand.value.some(c => c.kind === "wild" && c.action === "wildDraw4");
    }
    return false;
  }
  
  // During chaining, only same number cards are playable
  if (chainingActive.value) {
    return myHand.value.some(c => c.kind === "number" && c.value === room.value?.chainValue);
  }
  
  // Normal play: any matching card OR wild
  return myHand.value.some(c => c.kind === "wild" || matches(top.value as Card, c));
});

const winner = computed<string | null>(() => {
  const wuid = room.value?.winnerUid;
  if (!wuid) return null;
  return players.value.find(p => p.id === wuid)?.displayName ?? wuid;
});

const topChosenColor = computed<"red" | "yellow" | "green" | "blue" | null>(() => {
  const t = top.value as any;
  return t && t.kind === "wild" ? (t.chosenColor ?? null) : null;
});

async function playChosenWild(color: "red" | "yellow" | "green" | "blue") {
  const pw = pendingWild.value;
  if (!pw) return;
  const toPlay: any = { ...pw.card, chosenColor: color };
  try {
    await playCardOnline(roomId, toPlay);
  } catch (e: any) {
    alert(e?.message ?? String(e));
  } finally {
    pendingWild.value = null;
  }
}

// During a pending stack, ONLY allow stacking the same type.
function canStackSame(c: Card) {
  if (pendingType.value === "draw2") return c.kind === "action" && c.action === "draw2";
  if (pendingType.value === "draw4") return c.kind === "wild" && c.action === "wildDraw4";
  return false;
}

// During number-chaining, allow same-number plays regardless of matches(top, c).
function canChainNumber(c: Card) {
  return chainingActive.value && c.kind === "number" && c.value === room.value?.chainValue;
}

const pendingDrawInfo = computed<null | { n: number; type: "draw2" | "draw4" | null }>(() => {
  return room.value?.pendingDraw
    ? { n: room.value.pendingDraw as number, type: room.value.pendingType as any }
    : null;
});

function cardClickable(c: Card) {
  if (!isMyTurn.value) return false;
  if (pendingType.value) return canStackSame(c);
  
  // During chaining, only allow same numbers
  if (chainingActive.value) {
    return c.kind === "number" && c.value === room.value?.chainValue;
  }
  
  // Normal play: must match top card
  const looksPlayable = !!top.value && matches(top.value as Card, c);
  return looksPlayable;
}

async function onPlayCard(c: Card, i: number) {
  if (!cardClickable(c)) return;

  const anyCard = c as any;
  if (c.kind === "wild" && !anyCard.chosenColor) {
    pendingWild.value = { index: i, card: c };
    return;
  }

  try {
    await playCardOnline(roomId, c);
  } catch (e: any) {
    alert(e?.message ?? String(e));
  }
}

async function onDraw() {
  try {
    await drawOneOnline(roomId);
    hasDrawnThisTurn.value = true;
  } catch (e: any) {
    alert(e?.message ?? String(e));
  }
}

async function onEndTurn() {
  try {
    await endTurnOnline(roomId);
    hasDrawnThisTurn.value = false;
  } catch (e: any) {
    alert(e?.message ?? String(e));
  }
}

async function copyCode() {
  try {
    if (room.value?.code) await navigator.clipboard.writeText(room.value.code);
  } catch { /* no-op */ }
}
</script>

<style scoped>
h1 {
  margin: 0 0 .5rem 0;
}

.card-wrapper {
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  transition: transform 0.2s ease;
  display: inline-block;
  user-select: none;
}

.card-wrapper:not(.disabled) {
  cursor: pointer;
}

.card-wrapper:not(.disabled):hover {
  transform: translateY(-8px);
}

.card-wrapper.disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>