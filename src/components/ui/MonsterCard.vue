<template>
  <div
    v-glow
    class="bg-parchment p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-all hover:-translate-y-1 h-full relative"
  >

    <router-link :to="{ name: 'monster-detail', params: { id: monster.id } }" class="flex flex-col items-center cursor-pointer group w-full">
      <img
        :src="monster.image"
        :alt="monster.name"
        class="w-24 h-24 rounded-full object-cover mb-4 border-4 border-white shadow-sm group-hover:ring-4 ring-arcane-pink/30 transition-all"
      />
      <h3 class="text-xl font-bold text-arcane-text mb-1 group-hover:text-arcane-pink transition-colors">
        {{ monster.name }}
      </h3>
    </router-link>

    <TypeBadge :type="monster.type" class="mb-4 mt-1" />

    <div class="flex justify-between w-full mt-2 pt-4 border-t border-gray-200">
      <div class="flex flex-col items-center">
        <font-awesome-icon icon="fa-solid fa-heart" class="text-arcane-pink mb-1" />
        <span class="text-sm font-semibold">{{ monster.hp }}</span>
      </div>
      <div class="flex flex-col items-center">
        <font-awesome-icon icon="fa-solid fa-shield-halved" class="text-arcane-mint mb-1" />
        <span class="text-sm font-semibold">{{ monster.ac }}</span>
      </div>
      <div class="flex flex-col items-center">
        <font-awesome-icon icon="fa-solid fa-skull" class="text-gray-400 mb-1" />
        <span class="text-sm font-semibold">CR {{ monster.cr }}</span>
      </div>
    </div>

    <button
      @click.stop="$emit('open-grimoire', monster)"
      class="mt-auto w-full py-2 bg-white/50 hover:bg-arcane-pink hover:text-white text-gray-400 rounded-xl transition-all flex items-center justify-center gap-2 border border-gray-100 mt-4"
    >
      <font-awesome-icon icon="fa-solid fa-book" />
      <span class="text-xs font-bold uppercase">Consultar Grimorio</span>
    </button>

  </div>
</template>

<script setup>
import TypeBadge from './TypeBadge.vue';

// Definición de eventos para el componente padre
defineEmits(['open-grimoire']);

// Props
defineProps({
  monster: {
    type: Object,
    required: true
  }
});
</script>
