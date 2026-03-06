<template>
  <div>
    <h1 class="text-3xl font-bold mb-4 text-arcane-text">Dashboard de Comandante</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      <CampaignClock />

      <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 text-sm">Monstruos Disponibles</p>
        <p v-if="loading" class="animate-pulse h-6 w-12 bg-gray-200 rounded mt-2"></p>
        <p v-else class="text-2xl font-bold text-arcane-pink">
          {{ bestiaryStore.monsters.length }}
        </p>
      </div>

      <div class="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
        <p class="text-gray-500 text-sm">Hechizos de Alto Nivel (5+)</p>
        <p v-if="loading" class="animate-pulse h-6 w-12 bg-gray-200 rounded mt-2"></p>
        <p v-else class="text-2xl font-bold text-arcane-mint">
          {{ spellStore.highLevelSpellsCount }}
        </p>
      </div>
    </div>

    <CombatLog />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useBestiaryStore } from '../stores/bestiaryStore';
import { useSpellStore } from '../stores/spellStore';
import CampaignClock from '../components/ui/CampaignClock.vue';
import CombatLog from '../components/ui/CombatLog.vue';

// Instanciamos los stores
const bestiaryStore = useBestiaryStore();
const spellStore = useSpellStore();

const loading = ref(true);

onMounted(async () => {
  try {
    loading.value = true;

    // REQUERIMIENTO: Consumir stores en paralelo usando Promise.all
    await Promise.all([
      bestiaryStore.fetchMonsters(),
      spellStore.fetchSpells()
    ]);

  } catch (error) {
    console.error("Fallo de conexión con las fuentes arcanas:", error);
  } finally {
    loading.value = false;
  }
});
</script>
