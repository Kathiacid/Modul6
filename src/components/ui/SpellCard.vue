<script setup>
import { useCharacterStore } from '../../stores/characterStore';
import { computed } from 'vue'; // <--- AGREGAR ESTA LÍNEA
const props = defineProps(['spell']);
const characterStore = useCharacterStore();

// Comprobamos si el hechizo está en el store persistente
const isPrepared = computed(() =>
  characterStore.preparedSpells.includes(props.spell.slug)
);
</script>

<template>
  <div class="border p-4 rounded-xl relative">
    <h3>{{ spell.name }}</h3>

    <button
      @click="characterStore.togglePreparedSpell(spell.slug)"
      :class="[
        'absolute top-2 right-2 p-2 rounded-full transition-all duration-500',
        isPrepared
          ? 'bg-purple-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.8)] scale-110'
          : 'bg-gray-100 text-gray-400'
      ]"
    >
      <font-awesome-icon :icon="isPrepared ? 'fa-solid fa-wand-sparkles' : 'fa-solid fa-book'" />
    </button>
  </div>
</template>
