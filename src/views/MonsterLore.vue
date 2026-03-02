<template>
  <div class="bg-parchment p-6 rounded-2xl border border-orange-100 italic text-gray-800 leading-relaxed shadow-inner">
    <h3 class="not-italic font-bold text-xl mb-3 text-sepia-900 font-serif">Relatos del Antiguo Grimorio</h3>
    <p>
      {{ monster.lore || 'No hay registros históricos sobre esta criatura en los archivos actuales.' }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  monster: Object
});
</script>
