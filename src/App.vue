<template>
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
import OnlineBoard from "./services/OnlineBoard.vue"; // ensure this path matches your file

const roomId = ref<string | null>(null);
const isHost = ref(false);

function handleEnterRoom(payload: { id: string; host: boolean }) {
  roomId.value = payload.id;
  isHost.value = payload.host;
}
</script>
