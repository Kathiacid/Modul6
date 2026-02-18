<template>
  <span :class="['px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider', colorClass]">
    {{ type }}
  </span>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  type: { type: String, required: true }
});

const colorClass = computed(() => {
  const types = {
    'Bestia': 'bg-green-100 text-green-700',
    'No-muerto': 'bg-purple-100 text-purple-700',
    'Dragón': 'bg-red-100 text-red-700'
  };
  return types[props.type] || 'bg-gray-100 text-gray-700';
});
</script>
