<template>
  <select
    v-model="model"
    class="px-4 py-2 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-arcane-mint outline-none"
  >
    <option value="">Todos los tipos</option>
    <option v-for="type in types" :key="type" :value="type">
      {{ type }}
    </option>
  </select>
</template>

<script setup>
// defineModel enlaza directamente con la variable del padre
const model = defineModel()

const types = ['Bestia', 'No-muerto', 'Dragón']
</script>
