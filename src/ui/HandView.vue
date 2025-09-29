<template>
  <div class="mt-3">
    <h3>{{ title }} ({{ hand.length }})</h3>
    <div class="flex flex-wrap">
      <CardView
        v-for="(c, i) in hand"
        :key="i"
        :card="c"
        :onPlay="onPlay"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "../cards/Card";
import CardView from "./CardView.vue";

/**
 * Props are auto-exposed as top-level variables in <script setup>,
 * so we don't assign to a `props` const (avoids the 'never read' warning).
 */
interface Props {
  hand: Card[];
  onPlay: (c: Card) => void;
  title?: string;
}

withDefaults(defineProps<Props>(), {
  title: "Hand"
});
</script>
