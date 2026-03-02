<template>
  <div class="mt-6">
    <button @click="rollDice" class="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-black transition-colors mb-4">
      Tirar d20
    </button>

    <div ref="logContainer" class="h-40 overflow-y-auto bg-white border p-4 rounded-lg font-mono text-sm shadow-inner">
      <div v-for="(log, index) in logs" :key="index" class="border-b border-gray-50 py-1">
        {{ log }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

const logs = ref([]);
const logContainer = ref(null);

const rollDice = () => {
  const result = Math.floor(Math.random() * 20) + 1;
  logs.value.push(`Tirada de ataque: ${result}`);
};

// Autoscroll usando nextTick
watch(logs, async () => {
  await nextTick();
  if (logContainer.value) {
    logContainer.value.scrollTop = logContainer.value.scrollHeight;
  }
}, { deep: true });
</script>
