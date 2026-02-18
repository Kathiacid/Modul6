<template>
  <div class="bg-parchment p-6 rounded-2xl shadow-sm border border-gray-100 flex flex-col items-center text-center transition-transform hover:-translate-y-1">

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

  </div>
</template>

<script setup>
import TypeBadge from './TypeBadge.vue';

// Recibimos el objeto completo del monstruo como prop
defineProps({
  monster: {
    type: Object,
    required: true
  }
});
</script>
