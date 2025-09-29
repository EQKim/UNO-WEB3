<template>
  <div class="p-3 rounded border border-slate-300 mb-4">
    <div class="mb-2">
      <label class="block text-sm mb-1">Display name</label>
      <input v-model="displayName" class="border px-2 py-1 rounded w-full" />
    </div>

    <div class="flex gap-2">
      <button @click="onCreate" class="px-3 py-2 rounded bg-emerald-600 text-white">Create room</button>
      <input v-model="inviteCode" placeholder="Enter code" class="border px-2 py-1 rounded" />
      <button @click="onJoin" class="px-3 py-2 rounded bg-blue-600 text-white">Join</button>
    </div>

    <div v-if="room" class="mt-3 text-sm">
      <div><b>Room</b> {{ roomId }}</div>
      <div><b>Code</b> {{ room.code }}</div>
      <div><b>Status</b> {{ room.status }}</div>
      <div class="mt-1"><b>Players</b></div>
      <ul class="list-disc ml-6">
        <li v-for="p in players" :key="p.id">
          {{ p.displayName }}{{ p.isHost ? " (host)" : "" }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { ensureAnonAuth } from "../firebase";
import { createRoom, joinRoomByCode, listenRoom } from "../services/Rooms";

type Player = { id: string; displayName: string; isHost?: boolean };

const emit = defineEmits<{
  (e: "enter-room", payload: { id: string; host: boolean }): void
}>();

const displayName = ref("Player");
const roomId = ref<string | null>(null);
const inviteCode = ref("");
const room = ref<any | null>(null);
const players = ref<Player[]>([]);

let stopListen: null | (() => void) = null;

onMounted(async () => { await ensureAnonAuth(); });
onUnmounted(() => { if (stopListen) stopListen(); });

function startListening(id: string) {
  if (stopListen) stopListen();
  stopListen = listenRoom(id, (r: any) => (room.value = r), (ps: Player[]) => (players.value = ps));
}

async function onCreate() {
  const { roomId: id, code } = await createRoom(displayName.value || "Player");
  roomId.value = id;
  startListening(id);
  emit("enter-room", { id, host: true });
  console.log("Invite code:", code);
}

async function onJoin() {
  const code = inviteCode.value.trim();
  if (!code) return;
  const { roomId: id } = await joinRoomByCode(code.toUpperCase(), displayName.value || "Player");
  roomId.value = id;
  startListening(id);
  emit("enter-room", { id, host: false });
}
</script>
