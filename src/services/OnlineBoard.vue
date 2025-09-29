<template>
  <div v-if="room" class="p-6 space-y-3">
    <h1 class="text-3xl font-extrabold">UNO (Online)</h1>

    <div><b>Room:</b> {{ roomId }}</div>

    <div class="flex items-center gap-2">
      <div><b>Code:</b> <code>{{ room.code ?? "—" }}</code></div>
      <button
        v-if="room.code"
        @click="copyCode"
        class="px-2 py-1 text-sm rounded border"
      >
        Copy
      </button>
    </div>

    <div><b>Status:</b> {{ room.status }}</div>
    <div>
      <b>Turn:</b>
      {{ room.status === "finished" ? "—" : (isMyTurn ? "You" : (room.currentTurn ?? "—")) }}
    </div>
    <div><b>Players:</b> {{ players.map(p => p.displayName).join(", ") }}</div>

    <!-- Lobby or finished → Start button for host -->
    <div class="mt-2" v-if="room.status === 'lobby' || room.status === 'finished'">
      <button
        v-if="computedIsHost"
        class="px-4 py-2 rounded bg-emerald-600 text-white disabled:opacity-50"
        :disabled="players.length < 2"
        :title="players.length < 2 ? 'Need at least 2 players' : 'Start game'"
        @click="startGameClient(roomId)"
      >
        Start game
      </button>
      <div v-else>Waiting for host to start…</div>
    </div>

    <template v-if="room.status === 'playing'">
      <div class="mt-2 flex items-center gap-3">
        <div class="text-sm font-semibold">Top card:</div>
        <CardView v-if="top" :card="top" size="lg" />

        <!-- Current color badge for wild -->
        <div
          v-if="topChosenColor"
          class="ml-2 px-2 py-1 rounded text-sm font-semibold border"
          title="Current color chosen for wild"
          :style="{
            background:
              topChosenColor === 'red' ? '#fee2e2' :
              topChosenColor === 'yellow' ? '#fef9c3' :
              topChosenColor === 'green' ? '#dcfce7' :
              '#dbeafe'
          }"
        >
          Current color: {{ topChosenColor }}
        </div>

        <!-- Pending draw info (stacking) -->
        <div
          v-if="pendingDrawInfo"
          class="ml-2 px-2 py-1 rounded text-sm font-semibold border"
        >
          {{ pendingDrawInfo.type === 'draw4' ? '+4' : '+2' }} stack: draw {{ pendingDrawInfo.n }}
        </div>
      </div>

      <div class="mt-3 flex items-center gap-2">
        <button
          @click="onDraw"
          :disabled="!isMyTurn"
          class="px-4 py-2 rounded bg-blue-600 text-white disabled:opacity-50"
          :title="pendingDrawInfo
            ? `Draw ${pendingDrawInfo.n} and pass`
            : (youHavePlayable ? 'You already have a playable card' : 'Draw one')"
        >
          {{ pendingDrawInfo ? `Draw ${pendingDrawInfo.n}` : "Draw" }}
        </button>

        <!-- End turn shows only during number-chaining -->
        <button
          v-if="chainingActive"
          @click="onEndTurn"
          class="px-4 py-2 rounded bg-gray-700 text-white"
          title="Finish your number chain and pass the turn"
        >
          End turn
        </button>
      </div>

      <div class="mt-4">
        <h3 class="font-semibold mb-1">Your hand ({{ myHand.length }})</h3>

        <!-- Inline wild picker -->
        <div v-if="pendingWild" class="mb-2 flex items-center gap-2">
          <span class="text-sm">Pick color:</span>
          <button type="button" @click="playChosenWild('red')" class="px-3 py-1 rounded border" style="background:#ef4444;color:white">red</button>
          <button type="button" @click="playChosenWild('yellow')" class="px-3 py-1 rounded border" style="background:#eab308">yellow</button>
          <button type="button" @click="playChosenWild('green')" class="px-3 py-1 rounded border" style="background:#22c55e;color:white">green</button>
          <button type="button" @click="playChosenWild('blue')" class="px-3 py-1 rounded border" style="background:#3b82f6;color:white">blue</button>
          <button type="button" @click="pendingWild = null" class="px-2 py-1 rounded border" title="Cancel">Cancel</button>
        </div>

        <div class="flex flex-wrap gap-1.5">
          <button
            v-for="(c, i) in myHand"
            :key="i"
            type="button"
            @click="onPlayCard(c, i)"
            :disabled="!cardClickable(c)"
            :aria-disabled="!cardClickable(c)"
            class="relative inline-block p-0 border-0 bg-transparent"
            :class="cardClickable(c) ? 'cursor-pointer' : 'opacity-60 cursor-not-allowed'"
            :title="!isMyTurn
              ? 'Not your turn'
              : pendingType
                ? (pendingType === 'draw4' ? 'Only +4 can be played (or Draw)' : 'Only +2 can be played (or Draw)')
                : undefined"
          >
            <CardView :card="c" size="md" />
            <span class="absolute inset-0" />
          </button>
        </div>
      </div>
    </template>

    <!-- Win screen -->
    <div v-if="room.status === 'finished'" class="mt-4 p-4 rounded-xl border bg-white/70 backdrop-blur">
      <div class="text-xl font-bold mb-1">🎉 {{ winner ?? 'A player' }} won!</div>
      <div class="text-sm text-gray-600 mb-3">
        Game over{{ topChosenColor ? ` — final color: ${topChosenColor}` : "" }}.
      </div>
      <button
        v-if="computedIsHost"
        class="px-4 py-2 rounded bg-emerald-600 text-white"
        @click="startGameClient(roomId)"
      >
        Start new game
      </button>
      <div v-else>Waiting for host to start a new game…</div>
    </div>
  </div>

  <div v-else class="p-6">Loading room…</div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from "vue";
import type { Card } from "../cards/Card";
import CardView from "../ui/CardView.vue";
import {
  subscribeOnlineGame,
  startGameClient,
  playCardOnline,
  drawOneOnline,
  endTurnOnline
} from "./OnlineGame";
import { matches } from "../cards/Rules";
import { auth } from "../firebase";

type Props = { roomId: string; isHost: boolean };
const { roomId, isHost } = defineProps<Props>();

const room = ref<any | null>(null);
const players = ref<any[]>([]);
const myHand = ref<Card[]>([]);
const pendingWild = ref<{ index: number; card: Card } | null>(null);

let stop: null | (() => void) = null;

function startSub(id: string) {
  if (stop) stop();
  stop = subscribeOnlineGame(id, {
    onRoom: (r: any) => (room.value = r),
    onPlayers: (p: any[]) => (players.value = p),
    onMyHand: (h: Card[]) => (myHand.value = h)
  });
}

onMounted(() => startSub(roomId));
onUnmounted(() => { if (stop) stop(); });
watch(() => roomId, (id) => { if (id) startSub(id); });

const top = computed<Card | null>(() => room.value?.topCard ?? null);
const myUid = computed(() => auth.currentUser?.uid ?? null);
const isMyTurn = computed(() => room.value?.currentTurn === myUid.value && room.value?.status === "playing");

// Host fallback: prop OR explicit host in room OR first joined player
const computedIsHost = computed(() =>
  isHost || room.value?.hostUid === myUid.value || (players.value.length > 0 && players.value[0]?.id === myUid.value)
);

// Pending stack / chaining awareness
const pendingType = computed<"draw2" | "draw4" | null>(() => (room.value?.pendingType ?? null));
const chainingActive = computed<boolean>(() => room.value?.chainPlayer === myUid.value && room.value?.chainValue !== null);

// Standard playable if no pending stack
const youHavePlayable = computed<boolean>(() => !!top.value && myHand.value.some(c => matches(top.value as Card, c)));

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
  const looksPlayable = !!top.value && matches(top.value as Card, c);
  return looksPlayable || canChainNumber(c);
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
  } catch (e: any) {
    alert(e?.message ?? String(e));
  }
}

async function onEndTurn() {
  try {
    await endTurnOnline(roomId);
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
