<template>
  <div v-if="monster" class="max-w-3xl mx-auto">
    <router-link to="/bestiary" class="inline-flex items-center text-gray-500 hover:text-arcane-pink mb-6 transition-colors font-medium">
      <font-awesome-icon icon="fa-solid fa-book" class="mr-2" />
      Volver al Bestiario
    </router-link>

    <div :class="['bg-white p-8 rounded-3xl shadow-lg border-4 transition-colors duration-300', borderClass]">

      <div class="flex flex-col items-center text-center mb-8">
        <img :src="monster.image" :alt="monster.name" class="w-32 h-32 rounded-full object-cover mb-4 shadow-md" />
        <h1 class="text-4xl font-bold text-arcane-text mb-2">{{ monster.name }}</h1>
        <span class="text-gray-500 uppercase tracking-widest font-semibold">{{ monster.type }}</span>
      </div>

      <div class="flex justify-center gap-8 mb-8 pb-8 border-b border-gray-100">
        <div class="text-center">
          <span class="block text-2xl font-bold text-arcane-pink">{{ monster.hp }}</span>
          <span class="text-xs text-gray-400 uppercase">HP</span>
        </div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-arcane-mint">{{ monster.ac }}</span>
          <span class="text-xs text-gray-400 uppercase">AC</span>
        </div>
        <div class="text-center">
          <span class="block text-2xl font-bold text-gray-600">{{ monster.cr }}</span>
          <span class="text-xs text-gray-400 uppercase">CR</span>
        </div>
      </div>

      <h3 class="text-lg font-bold text-center text-gray-700 mb-4">Estadísticas de Rol</h3>
      <div class="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.fue || '-' }}</span>
          <span class="text-xs text-gray-500">FUE</span>
        </div>
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.des || '-' }}</span>
          <span class="text-xs text-gray-500">DES</span>
        </div>
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.con || '-' }}</span>
          <span class="text-xs text-gray-500">CON</span>
        </div>
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.int || '-' }}</span>
          <span class="text-xs text-gray-500">INT</span>
        </div>
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.sab || '-' }}</span>
          <span class="text-xs text-gray-500">SAB</span>
        </div>
        <div class="bg-gray-50 p-3 rounded-xl border border-gray-100">
          <span class="block font-bold text-lg">{{ monster.stats?.car || '-' }}</span>
          <span class="text-xs text-gray-500">CAR</span>
        </div>
      </div>

    </div>
  </div>

  <div v-else class="text-center py-20 flex flex-col items-center">
    <font-awesome-icon icon="fa-solid fa-skull" class="text-6xl text-gray-200 mb-4" />
    <h2 class="text-2xl font-bold text-gray-400">Monstruo no encontrado</h2>
    <router-link to="/bestiary" class="mt-4 text-arcane-pink hover:underline font-medium">
      Volver al Bestiario
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMonsters } from '../composables/useMonsters';

// 1. Recibe el id como prop (configurado en el router)
const props = defineProps({
  id: {
    type: [String, Number],
    required: true
  }
});

const { getMonsterById } = useMonsters();

// 2. Busca el monstruo específico usando el composable
const monster = computed(() => getMonsterById(props.id));

// 3. Calcula el color del borde según el requerimiento
const borderClass = computed(() => {
  if (!monster.value) return 'border-transparent';

  // Mapeo de colores exactos pedidos en el requerimiento
  const typeColors = {
    'Bestia': 'border-green-500',
    'No-muerto': 'border-purple-500',
    'Dragón': 'border-red-500'
  };

  // Devuelve el color correspondiente, o gris si no coincide
  return typeColors[monster.value.type] || 'border-gray-200';
});
</script>
