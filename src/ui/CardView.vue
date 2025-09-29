<template>
  <button
    @click="handleClick"
    :title="JSON.stringify(card)"
    class="m-1 p-0 rounded-lg border border-slate-400 overflow-hidden bg-white hover:shadow transition disabled:opacity-100"
    :style="{ width: `${dims.w}px`, height: `${dims.h}px`, cursor: onPlay ? 'pointer' : 'default' }"
    :disabled="!onPlay"
  >
    <img
      v-if="!imgError"
      :src="url"
      :alt="labelFor(card)"
      class="w-full h-full object-contain"
      @error="imgError = true"
    />
    <div v-else class="w-full h-full flex items-center justify-center text-xs px-1">
      {{ labelFor(card) }}
    </div>
  </button>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import type { Card } from "../cards/Card";

type Props = {
  card: Card;
  onPlay?: (c: Card) => void;
  size?: "sm" | "md" | "lg";
};
const props = withDefaults(defineProps<Props>(), {
  size: "md"
});

const imgError = ref(false);

function filenameFor(card: Card): string {
  if (card.kind === "number") return `${card.color}_${card.value}.png`;
  if (card.kind === "action") return `${card.color}_${card.action}.png`; // skip|reverse|draw2
  return card.action === "wildDraw4" ? "wildDraw4.png" : "wild.png";
}

function labelFor(card: Card) {
  if (card.kind === "number") return `${card.color} ${card.value}`;
  if (card.kind === "action") return `${card.color} ${card.action}`;
  return card.action === "wildDraw4" ? "+4" : "wild";
}

// ✅ Works with Vite base (e.g. /UNO-WEB3/) and dev
const url = computed(() => `${import.meta.env.BASE_URL}cards/${filenameFor(props.card)}`);

const dims = computed(() =>
  props.size === "lg"
    ? { w: 96, h: 144 }
    : props.size === "sm"
    ? { w: 48, h: 72 }
    : { w: 64, h: 96 }
);

function handleClick() {
  props.onPlay?.(props.card);
}
</script>
