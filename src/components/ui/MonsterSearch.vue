<template>
  <div class="relative w-full max-w-md">
    <span class="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
    </span>
    <input
      type="text"
      :value="searchQuery"
      @input="handleInput"
      placeholder="Buscar criatura por nombre..."
      class="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 focus:ring-2 focus:ring-arcane-pink focus:border-transparent outline-none transition-all bg-white"
    />
  </div>
</template>

<script setup>
import { useMonsters } from '../../composables/useMonsters';

const { searchQuery } = useMonsters();
let timeout = null;

const handleInput = (e) => {
  // Limpiamos el timer anterior si el usuario sigue escribiendo
  clearTimeout(timeout);

  // Seteamos un nuevo timer de 400ms
  timeout = setTimeout(() => {
    searchQuery.value = e.target.value;
  }, 400);
};
</script>
