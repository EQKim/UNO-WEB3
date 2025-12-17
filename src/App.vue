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
        <div style="position: relative; display: inline-block;">
          <img :src="getCardImage(snapshot.topCard)" :alt="describeCard(snapshot.topCard)" style="height: 150px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.3);" />
          <div v-if="snapshot.topCard.kind === 'wild' && snapshot.chosenColor" :style="{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: getColorHex(snapshot.chosenColor), color: snapshot.chosenColor === 'yellow' ? '#000' : '#fff', padding: '4px 12px', borderRadius: '12px', fontWeight: 'bold', fontSize: '0.85rem', boxShadow: '0 2px 4px rgba(0,0,0,0.3)', border: '2px solid white' }">
            {{ snapshot.chosenColor.toUpperCase() }}
          </div>
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
               :class="['card-wrapper', { 'drawn-card': idx === drawnCardIndex }]">
            <img :src="getCardImage(card)" :alt="describeCard(card)" style="height: 120px; border-radius: 8px; box-shadow: 0 2px 6px rgba(0,0,0,0.2); display: block;" />
            <span v-if="idx === drawnCardIndex" style="position: absolute; bottom: -20px; left: 50%; transform: translateX(-50%); font-size: 0.7rem; white-space: nowrap; background: #10b981; color: white; padding: 2px 6px; border-radius: 3px;">Click to play!</span>
          </div>
        </div>
        <button @click="drawCard" 
                :disabled="(hasPlayableCard && !isPenaltyDraw) || (snapshot && snapshot.chainPlayerId === 'You') || drawnCardIndex !== null" 
                :class="{ 'penalty-draw-button': isPenaltyDraw }"
                :style="{ 
                  padding: '.5rem 1rem', 
                  background: ((hasPlayableCard && !isPenaltyDraw) || (snapshot && snapshot.chainPlayerId === 'You') || drawnCardIndex !== null) ? '#9ca3af' : (isPenaltyDraw ? '#dc2626' : '#3b82f6'), 
                  color: '#fff', 
                  border: 'none', 
                  borderRadius: '4px', 
                  cursor: ((hasPlayableCard && !isPenaltyDraw) || (snapshot && snapshot.chainPlayerId === 'You') || drawnCardIndex !== null) ? 'not-allowed' : 'pointer', 
                  fontWeight: 'bold' 
                }">
          {{ drawButtonText }}
        </button>
        <button v-if="snapshot.chainPlayerId === 'You'" @click="endTurn" style="padding: .5rem 1rem; background: #f59e0b; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-left: .5rem;">
          End Turn (Chain)
        </button>
        <button v-if="drawnCardIndex !== null" @click="passTurn" style="padding: .5rem 1rem; background: #ef4444; color: #fff; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; margin-left: .5rem;">
          Pass
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
import { ref, computed, onUnmounted } from "vue";
import { Round } from "./offline";
import type { RoundSnapshot } from "./offline/Round";
import { matches } from "./cards/Rules";
import type { Card, Color } from "./cards/Card";
import type { BotRequest, BotResponse } from "./bot-worker";

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
    let botWorkers: Worker[] = [];
    let botMoveResolvers = new Map<string, (response: BotResponse) => void>();

    const playerHand = computed(() => {
      if (!round.value || !snapshot.value) return [];
      return round.value.getHand("You");
    });

    const hasPlayableCard = computed(() => {
      if (!snapshot.value || playerHand.value.length === 0) return false;
      
      // Special case: if there's a pending draw (+2 or +4), you can only play matching counter cards
      if (snapshot.value.pendingType) {
        if (snapshot.value.pendingType === "draw2") {
          // Can only counter +2 with another +2
          return playerHand.value.some(card => 
            card.kind === "action" && card.action === "draw2"
          );
        }
        if (snapshot.value.pendingType === "draw4") {
          // Can only counter +4 with another +4
          return playerHand.value.some(card => 
            card.kind === "wild" && card.action === "wildDraw4"
          );
        }
      }
      
      // Normal matching rules
      const topCard = snapshot.value.topCard;
      return playerHand.value.some(card => matches(topCard, card));
    });

    const drawButtonText = computed(() => {
      if (!snapshot.value) return "Draw Card";
      if (snapshot.value.pendingDraw && snapshot.value.pendingDraw > 0) {
        return `Draw +${snapshot.value.pendingDraw}`;
      }
      return "Draw Card";
    });

    const isPenaltyDraw = computed(() => {
      return snapshot.value?.pendingDraw && snapshot.value.pendingDraw > 0;
    });

    function describeCard(c: Card) {
      if (!c) return "(none)";
      if (c.kind === "number") return `${c.color} ${c.value}`;
      if (c.kind === "action") return `${c.color} ${c.action}`;
      return `${c.action}${c.chosenColor ? `(${c.chosenColor})` : ""}`;
    }

    function getCardImage(c: Card): string {
      if (!c) return "";
      if (c.kind === "number") {
        return `/cards/${c.color}_${c.value}.png`;
      }
      if (c.kind === "action") {
        return `/cards/${c.color}_${c.action}.png`;
      }
      // wild cards
      if (c.action === "wildDraw4") {
        return `/cards/wildDraw4.png`;
      }
      return `/cards/wild.png`;
    }

    function getColorHex(color: Color): string {
      const colors: Record<Color, string> = {
        red: "#ef4444",
        yellow: "#fbbf24",
        green: "#22c55e",
        blue: "#3b82f6"
      };
      return colors[color] || "#6b7280";
    }

    function formatHistory(h: any) {
      switch (h.kind) {
        case "play": {
          const cardDesc = describeCard(h.card);
          if (h.chosenColor) {
            return `PLAY ${h.playerId} -> ${cardDesc} → chose ${h.chosenColor.toUpperCase()}`;
          }
          return `PLAY ${h.playerId} -> ${cardDesc}`;
        }
        case "draw": return `DRAW ${h.playerId} x${h.amount}`;
        case "penaltyDraw": return `PENALTY ${h.playerId} +${h.amount} (${h.reason})`;
        case "endTurn": return `END ${h.playerId}`;
      }
      return JSON.stringify(h);
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
          
          // After playing, check if turn is still ours (chaining) or advanced to next player
          if (snapshot.value.currentPlayer !== "You") {
            // Turn advanced - start bot loop
            if (!snapshot.value.winner) {
              setTimeout(() => botsLoop(currentRound), 300);
            }
          } else if (wasDrawnCard) {
            // If we played a drawn card and still our turn (chain started), 
            // we must end turn manually - can't play more cards
            // Actually, playing drawn card should auto-advance. Let's force end turn:
            if (snapshot.value.chainPlayerId === "You") {
              try {
                currentRound.endTurn("You");
                snapshot.value = currentRound.snapshot();
                if (!snapshot.value.winner && snapshot.value.currentPlayer !== "You") {
                  setTimeout(() => botsLoop(currentRound), 300);
                }
              } catch {
                // If can't end turn, then proceed to bots anyway
                if (!snapshot.value.winner && snapshot.value.currentPlayer !== "You") {
                  setTimeout(() => botsLoop(currentRound), 300);
                }
              }
            }
          }
          // else: chain started with regular card - stay on our turn, don't start bots
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
        
        // Check if turn advanced or stayed (wild cards usually advance)
        if (snapshot.value.currentPlayer !== "You") {
          // Turn advanced - start bot loop
          if (!snapshot.value.winner) {
            setTimeout(() => botsLoop(currentRound), 300);
          }
        }
        // Wild cards don't create chains, so no need to check chain status
      } catch (e: any) {
        alert(`Cannot play that card: ${e.message}`);
        showColorPicker.value = false;
        pendingCardIndex.value = null;
      }
    }

    function drawCard() {
      if (!round.value || snapshot.value?.currentPlayer !== "You") return;
      const currentRound = round.value as Round;
      const wasPenalty = snapshot.value.pendingDraw && snapshot.value.pendingDraw > 0;
      
      try {
        if (wasPenalty) {
          // Penalty draw - just draw the cards, turn auto-advances
          currentRound.draw("You");
          snapshot.value = currentRound.snapshot();
          
          if (!snapshot.value.winner && snapshot.value.currentPlayer !== "You") {
            setTimeout(() => botsLoop(currentRound), 300);
          }
        } else {
          // Normal draw - highlight the card briefly, then it can be played or turn ends
          const handSizeBefore = currentRound.getHand("You").length;
          currentRound.draw("You");
          snapshot.value = currentRound.snapshot();
          const handSizeAfter = currentRound.getHand("You").length;
          
          // Highlight the drawn card
          if (handSizeAfter > handSizeBefore) {
            drawnCardIndex.value = handSizeAfter - 1;
          }
          
          // After drawing, player can ONLY play the drawn card or pass
          // The drawn card is already highlighted - wait for player action
          // Note: Player can only click the drawn card or the turn will timeout/they must pass manually
        }
      } catch (e: any) {
        alert(`Error drawing: ${e.message}`);
      }
    }

    function passTurn() {
      if (!round.value || snapshot.value?.currentPlayer !== "You") return;
      const currentRound = round.value as Round;
      
      // Player drew a card and chooses not to play it (or can't play it)
      drawnCardIndex.value = null;
      
      try {
        currentRound.pass("You");
        snapshot.value = currentRound.snapshot();
        
        if (!snapshot.value.winner && snapshot.value.currentPlayer !== "You") {
          setTimeout(() => botsLoop(currentRound), 300);
        }
      } catch (e: any) {
        alert(`Error passing: ${e.message}`);
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

    // Request bot move via Web Worker
    function requestBotMove(playerId: string, hand: readonly Card[], snap: RoundSnapshot): Promise<BotResponse> {
      return new Promise((resolve) => {
        const botIndex = parseInt(playerId.replace('Bot', '')) - 1;
        
        if (botIndex < 0 || botIndex >= botWorkers.length) {
          resolve({ type: "moveReady", action: "draw" });
          return;
        }

        const worker = botWorkers[botIndex];
        botMoveResolvers.set(playerId, resolve);

        // Convert cards to plain objects for worker serialization
        const request: BotRequest = {
          type: "makeMove",
          hand: hand.map(c => JSON.parse(JSON.stringify(c))),
          topCard: JSON.parse(JSON.stringify(snap.topCard)),
          pendingDraw: snap.pendingDraw,
          pendingType: snap.pendingType,
          chainValue: snap.chainValue
        };

        worker.postMessage(request);
      });
    }

    async function botsLoop(r: Round) {
      if (loopCancel) return;
      let snap = r.snapshot();
      snapshot.value = snap;
      
      while (!loopCancel && !snap.winner && snap.currentPlayer !== "You") {
        await sleep(2000);
        const pid = snap.currentPlayer;
        const hand = r.getHand(pid);
        
        // Request move from Web Worker
        const response = await requestBotMove(pid, hand, snap);
        
        try {
          if (response.action === "draw") {
            r.drawAndMaybePlay(pid);
          } else if (response.action === "endTurn") {
            r.endTurn(pid);
          } else if (response.action === "play" && response.cardIndex !== undefined) {
            if (response.chosenColor) {
              r.play(pid, response.cardIndex, response.chosenColor);
            } else {
              r.play(pid, response.cardIndex);
            }
          }
        } catch (e) {
          // Fallback to draw on any error
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
      // Clean up old workers
      botWorkers.forEach(w => w.terminate());
      botWorkers = [];
      botMoveResolvers.clear();

      // Create Web Workers for each bot
      for (let i = 0; i < numBots.value; i++) {
        const worker = new Worker(new URL('./bot-worker.ts', import.meta.url), { type: 'module' });
        
        worker.onmessage = (e: MessageEvent<BotResponse>) => {
          const playerId = `Bot${i + 1}`;
          const resolver = botMoveResolvers.get(playerId);
          if (resolver) {
            resolver(e.data);
            botMoveResolvers.delete(playerId);
          }
        };

        worker.onerror = (error) => {
          const resolver = botMoveResolvers.get(`Bot${i + 1}`);
          if (resolver) {
            resolver({ type: "moveReady", action: "draw" });
            botMoveResolvers.delete(`Bot${i + 1}`);
          }
        };

        botWorkers.push(worker);
      }

      const names = ["You", ...Array.from({ length: numBots.value }, (_, i) => `Bot${i+1}`)];
      const r = new Round(names, { deal: 7 });
      round.value = r;
      snapshot.value = r.snapshot();
      running.value = true;
      loopCancel = false;
      drawnCardIndex.value = null;
      
      // Give workers a moment to initialize before starting bot loop
      setTimeout(() => {
        if (snapshot.value && snapshot.value.currentPlayer !== "You") {
          botsLoop(r);
        }
      }, 100);
    }

    function stopGame() { 
      loopCancel = true; 
      running.value = false;
      botWorkers.forEach(w => w.terminate());
      botWorkers = [];
      botMoveResolvers.clear();
    }

    // Clean up workers on component unmount
    onUnmounted(() => {
      botWorkers.forEach(w => w.terminate());
      botWorkers = [];
      botMoveResolvers.clear();
    });

    return { 
      numBots, running, snapshot, playerHand, showColorPicker, drawnCardIndex, hasPlayableCard, drawButtonText, isPenaltyDraw,
      startGame, stopGame, playCard, selectColor, drawCard, passTurn, endTurn,
      describeCard, formatHistory, getCardImage, getColorHex
    };
  }
};
</script>

<style scoped>
/* minimal styles */
h1 { margin: 0 0 .5rem 0; }

.card-wrapper {
  cursor: pointer;
  position: relative;
  border-radius: 8px;
  transition: transform 0.2s ease;
}

.card-wrapper:hover {
  transform: translateY(-8px);
}

.drawn-card img {
  animation: pulse 1s ease-in-out infinite;
  box-shadow: 0 0 20px 5px #10b981 !important;
  border: 3px solid #10b981 !important;
}

.penalty-draw-button {
  animation: pulse-red 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    box-shadow: 0 0 20px 5px #10b981;
  }
  50% {
    box-shadow: 0 0 30px 10px #10b981;
  }
}

@keyframes pulse-red {
  0%, 100% {
    box-shadow: 0 0 15px 3px #dc2626;
  }
  50% {
    box-shadow: 0 0 25px 8px #dc2626;
  }
}
</style>
