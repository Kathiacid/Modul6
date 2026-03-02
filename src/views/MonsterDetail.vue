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

      <div class="flex justify-center gap-4 mb-8">
        <router-link
          :to="{ name: 'monster-detail', params: { id: props.id } }"
          class="px-4 py-2 rounded-lg font-bold transition-colors"
          active-class="bg-arcane-pink text-white"
          inactive-class="bg-gray-100 text-gray-600"
        >
          Atributos
        </router-link>
        <router-link
          :to="{ name: 'monster-lore', params: { id: props.id } }"
          class="px-4 py-2 rounded-lg font-bold transition-colors"
          active-class="bg-arcane-pink text-white"
          inactive-class="bg-gray-100 text-gray-600"
        >
          Historia
        </router-link>
      </div>

      <router-view :monster="monster" />
    </div>
  </div>

  <div v-else class="text-center py-20">
    <font-awesome-icon icon="fa-solid fa-skull-crossbones" class="text-6xl text-gray-200 mb-4" />
    <h2 class="text-2xl font-bold text-gray-400">Criatura no invocada</h2>
    <p class="text-gray-500 mb-6">Debes seleccionarla desde el Bestiario para cargar su esencia.</p>
    <router-link to="/bestiary" class="text-arcane-pink font-bold hover:underline">
      Volver al Bestiario
    </router-link>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useMonsters } from '../composables/useMonsters';

const props = defineProps({
  id: { type: String, required: true }
});

const { getMonsterById } = useMonsters();

// Mapeamos el monstruo para que MonsterStats y MonsterLore reciban los campos correctos
const monster = computed(() => {
  const rawMonster = getMonsterById(props.id);
  if (!rawMonster) return null;

  return {
    ...rawMonster,
    // Aseguramos que hp y ac existan independientemente de si vienen de la API o local
    hp: rawMonster.hit_points || rawMonster.hp,
    ac: rawMonster.armor_class || rawMonster.ac,
    image: rawMonster.image || `https://api.dicebear.com/7.x/bottts/svg?seed=${rawMonster.name}`,
    // Mapeamos los stats de la API a nuestro formato de 3 letras
    stats: rawMonster.stats || {
      fue: rawMonster.strength,
      des: rawMonster.dexterity,
      con: rawMonster.constitution,
      int: rawMonster.intelligence,
      sab: rawMonster.wisdom,
      car: rawMonster.charisma
    },
    // El lore puede venir de diferentes campos según la versión de la API
    lore: rawMonster.flavor || rawMonster.description || "Sin registros en el grimorio."
  };
});

const borderClass = computed(() => {
  if (!monster.value) return 'border-transparent';
  const typeColors = {
    'Bestia': 'border-green-500',
    'No-muerto': 'border-purple-500',
    'Dragón': 'border-red-500'
  };
  return typeColors[monster.value.type] || 'border-gray-200';
});
</script>
