<template>
  <div style="position:fixed;top:0;left:0;background:rgba(255,255,0,0.8);padding:2px 6px;font-size:10px;z-index:9999;">
    Build: {{ BUILD_TIME }}
  </div>
  <Lobby
    v-if="!roomId"
    @enter-room="handleEnterRoom"
  />
  <OnlineBoard
    v-else
    :roomId="roomId"
    :isHost="isHost"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Lobby from "./ui/Lobby.vue";
import OnlineBoard from "./services/OnlineBoard.vue"; 

// Expose build time injected by Vite so the bundle changes every deploy
const BUILD_TIME = __BUILD_TIME__;

const roomId = ref<string | null>(null);
const isHost = ref(false);

function handleEnterRoom(payload: { id: string; host: boolean }) {
  roomId.value = payload.id;
  isHost.value = payload.host;
}
</script>
