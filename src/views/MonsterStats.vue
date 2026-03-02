<template>
  <div>
    <h3 class="text-lg font-bold text-center text-gray-700 mb-4 uppercase tracking-tighter">Estadísticas de Rol</h3>
    <div class="grid grid-cols-3 md:grid-cols-6 gap-4 text-center">
      <div v-for="(val, stat) in monster.stats" :key="stat" class="bg-gray-50 p-3 rounded-xl border border-gray-100">
        <span class="block font-bold text-lg">{{ val }}</span>
        <span class="text-xs text-gray-500 uppercase">{{ stat }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  monster: Object
});
</script>
