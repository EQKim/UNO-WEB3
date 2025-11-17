<template>
  <div style="font-family: system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; padding: 1rem; max-width: 1200px; margin: 0 auto;">
    <h1>UNO — Play vs Bots</h1>

    <div style="margin: .5rem 0; display: flex; gap: 1rem; align-items: center;">
      <div>
        <label>Number of bots: </label>
        <input type="number" v-model.number="numBots" min="1" max="3" style="width: 60px;" />
      </div>
      <button @click="startGame" :disabled="running" style="padding: .5rem 1rem;">Start Game</button>
      <button @click="stopGame" :disabled="!running" style="padding: .5rem 1rem;">Stop</button>
    </div>

    <div v-if="snapshot && running" style="margin-top: 1rem;">
      <!-- Top Card Display -->
      <div style="background: #2a2a2a; color: #fff; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h3 style="margin: 0 0 .5rem 0;">Top Card</h3>
        <div :style="cardStyle(snapshot.topCard)" style="display: inline-block; padding: 1.5rem 2rem; border-radius: 8px; font-size: 1.5rem; font-weight: bold;">
          {{ describeCard(snapshot.topCard) }}
        </div>
        <p style="margin-top: .5rem; font-size: .9rem;">
          Current: <strong>{{ snapshot.currentPlayer }}</strong> | 
          Direction: <strong>{{ snapshot.direction === 1 ? '→' : '←' }}</strong>
          <span v-if="snapshot.pendingDraw"> | Pending: +{{ snapshot.pendingDraw }} ({{ snapshot.pendingType }})</span>
        </p>
        <p v-if="snapshot.winner" style="font-size: 1.2rem; color: #4ade80; margin-top: .5rem;">
          🎉 <strong>{{ snapshot.winner }}</strong> wins!
        </p>
      </div>

      <!-- Human Player Hand (You) -->
      <div v-if="snapshot.currentPlayer === 'You'" style="background: #f0f9ff; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; border: 2px solid #3b82f6;">
        <h3 style="margin: 0 0 .5rem 0; color: #1e40af;">Your Turn!</h3>
        <p style="margin-bottom: .5rem; font-size: .9rem;">Click a card to play it, or draw a card:</p>
        <div style="display: flex; gap: .5rem; flex-wrap: wrap; margin-bottom: .5rem;">
          <div v-for="(card, idx) of playerHand" :key="idx" 
               @click="playCard(idx, card)"
               :style="cardStyle(card)"
               :class="{ 'drawn-card': idx === drawnCardIndex }"
               style="cursor: pointer; padding: 1rem 1.5rem; border-radius: 8px; font-weight: bold; transition: transform 0.1s; border: 2px solid #000; position: relative;"
               @mouseover="(e: any) => e.target.style.transform = 'translateY(-4px)'"
               @mouseleave="(e: any) => e.target.style.transform = 'translateY(0)'">
            {{ describeCard(card) }}
            <span v-if="idx === drawnCardIndex" style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; white-space: nowrap; background: #10b981; color: white; padding: 2px 6px; border-radius: 3px;">Click to play!</span>
          </div>
        </div>
        <button @click="drawCard" :disabled="hasPlayableCard" :style="{ padding: '.5rem 1rem', background: hasPlayableCard ? '#9ca3af' : '#3b82f6', color: '#fff', border: 'none', borderRadius: '4px', cursor: hasPlayableCard ? 'not-allowed' : 'pointer', fontWeight: 'bold' }">
          Draw Card
        </button>
        <button v-if="snapshot.chainPlayerId === 'You'" @click="endTurn" style="padding: .5rem 1rem; background: #f59e0b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-left: .5rem;">
          End Turn
        </button>
      </div>

      <!-- Other Players -->
      <div style="background: #f7f7f8; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
        <h3 style="margin: 0 0 .5rem 0;">Players</h3>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
          <div v-for="p of snapshot.players" :key="p.id" 
               :style="{ 
                 padding: '.5rem 1rem', 
                 borderRadius: '6px', 
                 background: p.id === snapshot.currentPlayer ? '#fef3c7' : '#fff',
                 border: p.id === snapshot.currentPlayer ? '2px solid #f59e0b' : '1px solid #e5e7eb',
                 fontWeight: p.id === snapshot.currentPlayer ? 'bold' : 'normal'
               }">
            {{ p.id }} — {{ p.handCount }} card{{ p.handCount === 1 ? '' : 's' }}
          </div>
        </div>
      </div>

      <!-- History -->
      <div style="margin-top: 1rem;">
        <h3>History</h3>
        <div style="max-height: 200px; overflow:auto; background:#fff; padding:.5rem; border-radius:6px; border: 1px solid #e5e7eb; font-size: .85rem;">
          <div v-for="(h, idx) of snapshot.history ?? []" :key="idx" style="padding: .2rem 0;">{{ formatHistory(h) }}</div>
        </div>
      </div>
    </div>

    <div v-else-if="!running" style="margin-top: 2rem; text-align: center; color: #6b7280;">
      <p>Configure settings and click "Start Game" to play!</p>
    </div>

    <!-- Color Picker Modal for Wild Cards -->
    <div v-if="showColorPicker" style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
      <div style="background: #fff; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.3);">
        <h3 style="margin: 0 0 1rem 0;">Choose a color:</h3>
        <div style="display: flex; gap: 1rem;">
          <button @click="selectColor('red')" style="width: 80px; height: 80px; background: #ef4444; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Red</button>
          <button @click="selectColor('yellow')" style="width: 80px; height: 80px; background: #fbbf24; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #000;">Yellow</button>
          <button @click="selectColor('green')" style="width: 80px; height: 80px; background: #22c55e; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Green</button>
          <button @click="selectColor('blue')" style="width: 80px; height: 80px; background: #3b82f6; border: none; border-radius: 8px; cursor: pointer; font-weight: bold; color: #fff;">Blue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from "vue";
import { Round } from "./offline";
import type { RoundSnapshot } from "./offline/Round";
import { chooseForAI, matches } from "./cards/Rules";
import type { Card, Color } from "./cards/Card";

function sleep(ms: number) { return new Promise(r => setTimeout(r, ms)); }

export default {
  setup() {
    const numBots = ref(3);
    const running = ref(false);
    const round = ref<Round | null>(null);
    const snapshot = ref<RoundSnapshot | null>(null);
    const showColorPicker = ref(false);
    const pendingCardIndex = ref<number | null>(null);
    const drawnCardIndex = ref<number | null>(null);
    let loopCancel = false;

    const playerHand = computed(() => {
      if (!round.value || !snapshot.value) return [];
      return round.value.getHand("You");
    });

    const hasPlayableCard = computed(() => {
      if (!snapshot.value || playerHand.value.length === 0) return false;
      const topCard = snapshot.value.topCard;
      return playerHand.value.some(card => matches(topCard, card));
    });

    function describeCard(c: Card) {
      if (!c) return "(none)";
      if (c.kind === "number") return `${c.color} ${c.value}`;
      if (c.kind === "action") return `${c.color} ${c.action}`;
      return `${c.action}${c.chosenColor ? `(${c.chosenColor})` : ""}`;
    }

    function cardStyle(c: Card) {
      const colors: Record<string, string> = {
        red: "#ef4444",
        yellow: "#fbbf24",
        green: "#22c55e",
        blue: "#3b82f6"
      };
      if (c.kind === "wild") return { background: "#6b7280", color: "#fff" };
      return { background: colors[c.color] || "#ccc", color: c.color === "yellow" ? "#000" : "#fff" };
    }

    function formatHistory(h: any) {
      switch (h.kind) {
        case "play": return `PLAY ${h.playerId} -> ${describeCard(h.card)}${h.chosenColor ? ` as ${h.chosenColor}` : ""}`;
        case "draw": return `DRAW ${h.playerId} x${h.amount}`;
        case "penaltyDraw": return `PENALTY ${h.playerId} +${h.amount} (${h.reason})`;
        case "endTurn": return `END ${h.playerId}`;
      }
      return JSON.stringify(h);
    }

    function pickColor(hand: readonly Card[]): Color {
      const counts: Record<Color, number> = { red: 0, yellow: 0, green: 0, blue: 0 };
      hand.forEach(c => { if (c.kind !== "wild") counts[c.color]++; });
      const entries = Object.entries(counts).sort((a,b)=>b[1]-a[1]);
      return (entries[0]?.[0] as Color) || "red";
    }

    function playCard(idx: number, card: Card) {
      if (!round.value || snapshot.value?.currentPlayer !== "You") return;
      const currentRound = round.value as Round;
      const wasDrawnCard = drawnCardIndex.value === idx;
      if (card.kind === "wild") {
        pendingCardIndex.value = idx;
        showColorPicker.value = true;
      } else {
        try {
          currentRound.play("You", idx);
          snapshot.value = currentRound.snapshot();
          drawnCardIndex.value = null;
          
          // If this was a drawn card, end turn automatically
          if (wasDrawnCard && snapshot.value.currentPlayer === "You") {
            setTimeout(() => {
              if (round.value && snapshot.value?.currentPlayer === "You") {
                try {
                  currentRound.endTurn("You");
                  snapshot.value = currentRound.snapshot();
                  if (!snapshot.value.winner) {
                    setTimeout(() => botsLoop(currentRound), 300);
                  }
                } catch {
                  // Chain already ended, just continue
                  if (!snapshot.value.winner) {
                    setTimeout(() => botsLoop(currentRound), 300);
                  }
                }
              }
            }, 100);
          } else if (!snapshot.value.winner) {
            setTimeout(() => botsLoop(currentRound), 300);
          }
        } catch (e: any) {
          alert(`Cannot play that card: ${e.message}`);
        }
      }
    }

    function selectColor(color: Color) {
      if (!round.value || pendingCardIndex.value === null) return;
      const currentRound = round.value as Round;
      const wasDrawnCard = drawnCardIndex.value === pendingCardIndex.value;
      try {
        currentRound.play("You", pendingCardIndex.value, color);
        snapshot.value = currentRound.snapshot();
        showColorPicker.value = false;
        pendingCardIndex.value = null;
        drawnCardIndex.value = null;
        
        // If this was a drawn wild card, end turn automatically
        if (wasDrawnCard && snapshot.value.currentPlayer === "You") {
          setTimeout(() => {
            if (round.value && snapshot.value?.currentPlayer === "You") {
              try {
                currentRound.endTurn("You");
                snapshot.value = currentRound.snapshot();
                if (!snapshot.value.winner) {
                  setTimeout(() => botsLoop(currentRound), 300);
                }
              } catch {
                if (!snapshot.value.winner) {
                  setTimeout(() => botsLoop(currentRound), 300);
                }
              }
            }
          }, 100);
        } else if (!snapshot.value.winner) {
          setTimeout(() => botsLoop(currentRound), 300);
        }
      } catch (e: any) {
        alert(`Cannot play that card: ${e.message}`);
        showColorPicker.value = false;
        pendingCardIndex.value = null;
      }
    }

    function drawCard() {
      if (!round.value || snapshot.value?.currentPlayer !== "You") return;
      const currentRound = round.value as Round;
      const handSizeBefore = round.value.getHand("You").length;
      try {
        currentRound.draw("You");
        snapshot.value = currentRound.snapshot();
        const handSizeAfter = round.value.getHand("You").length;
        
        // Highlight the drawn card (it's the last one in hand)
        if (handSizeAfter > handSizeBefore) {
          drawnCardIndex.value = handSizeAfter - 1;
        }
      } catch (e: any) {
        alert(`Error drawing: ${e.message}`);
      }
    }

    function endTurn() {
      if (!round.value || snapshot.value?.currentPlayer !== "You") return;
      const currentRound = round.value as Round;
      try {
        drawnCardIndex.value = null;
        currentRound.endTurn("You");
        snapshot.value = currentRound.snapshot();
        if (!snapshot.value.winner) {
          setTimeout(() => botsLoop(currentRound), 300);
        }
      } catch (e: any) {
        alert(`Cannot end turn: ${e.message}`);
      }
    }

    async function botsLoop(r: Round) {
      if (loopCancel) return;
      let snap = r.snapshot();
      snapshot.value = snap;
      while (!loopCancel && !snap.winner && snap.currentPlayer !== "You") {
        await sleep(400);
        const pid = snap.currentPlayer;
        const hand = r.getHand(pid);
        const choice = chooseForAI([...hand], snap.topCard);
        try {
          if (choice === "draw") {
            r.drawAndMaybePlay(pid);
          } else {
            const idx = hand.findIndex(c => c === choice);
            if (idx >= 0) {
              if (choice.kind === "wild") {
                r.play(pid, idx, pickColor(hand));
              } else {
                r.play(pid, idx);
              }
            } else {
              r.drawAndMaybePlay(pid);
            }
          }
        } catch (e) {
          try { r.drawAndMaybePlay(pid); } catch { /* ignore */ }
        }
        snap = r.snapshot();
        snapshot.value = snap;
        await sleep(200);
      }
      if (snap.winner) {
        running.value = false;
      }
    }

    function startGame() {
      const names = ["You", ...Array.from({ length: numBots.value }, (_, i) => `Bot${i+1}`)];
      const r = new Round(names, { deal: 7 });
      round.value = r;
      snapshot.value = r.snapshot();
      running.value = true;
      loopCancel = false;
      drawnCardIndex.value = null;
      if (snapshot.value.currentPlayer !== "You") {
        botsLoop(r);
      }
    }

    function stopGame() { 
      loopCancel = true; 
      running.value = false; 
    }

    return { 
      numBots, running, snapshot, playerHand, showColorPicker, drawnCardIndex, hasPlayableCard,
      startGame, stopGame, playCard, selectColor, drawCard, endTurn,
      describeCard, cardStyle, formatHistory
    };
  }
};
</script>

<style scoped>
/* minimal styles */
h1 { margin: 0 0 .5rem 0; }

.drawn-card {
  animation: pulse 1s ease-in-out infinite;
  box-shadow: 0 0 20px 5px #10b981 !important;
  border: 3px solid #10b981 !important;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px 5px #10b981;
  }
  50% {
    box-shadow: 0 0 30px 10px #10b981;
  }
}
</style>
