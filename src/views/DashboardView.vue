<template>
  <div>
    <h1 class="text-3xl font-bold mb-4">Dashboard de Comandante</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <CampaignClock />

      <div class="bg-white p-4 rounded-xl border shadow-sm">
        <p class="text-gray-500 text-sm">Monstruos en la API</p>
        <p v-if="loading" class="animate-pulse h-6 w-12 bg-gray-200 rounded"></p>
        <p v-else class="text-2xl font-bold">{{ monsterCount }}</p>
      </div>

      <div class="bg-white p-4 rounded-xl border shadow-sm">
        <p class="text-gray-500 text-sm">Hechizos Totales</p>
        <p v-if="loading" class="animate-pulse h-6 w-12 bg-gray-200 rounded"></p>
        <p v-else class="text-2xl font-bold">{{ spellCount }}</p>
      </div>
    </div>

    <CombatLog />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { monsterService } from '../services/monsterService';
import CampaignClock from '../components/ui/CampaignClock.vue';
import CombatLog from '../components/ui/CombatLog.vue';

const monsterCount = ref(0);
const spellCount = ref(0);
const loading = ref(true);

onMounted(async () => {
  try {
    // Orquestación con Promise.all
    const [monsters, count] = await Promise.all([
      monsterService.getMonsters(),
      monsterService.getSpellsCount()
    ]);
    monsterCount.value = monsters.length; // O response.count si quieres el total real
    spellCount.value = count;
  } catch (error) {
    console.error("Fallo de conexión arcana", error);
  } finally {
    loading.value = false;
  }
});
</script>
