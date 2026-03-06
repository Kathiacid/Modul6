<template>
  <div class="bg-amber-100/50 p-4 rounded-xl border border-amber-200 text-center shadow-inner">
    <span class="text-xs uppercase font-bold text-amber-800 tracking-widest">Tiempo de Aventura</span>
    <p class="text-2xl font-serif font-bold text-amber-900">Día {{ day }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const day = ref(1);
let timer = null;

onMounted(() => {
  // 300,000 ms = 5 minutos
  timer = setInterval(() => {
    day.value++;
    console.log("El tiempo fluye... Un nuevo día ha comenzado.");
  }, 300000);
});

onUnmounted(() => {
  if (timer) {
    clearInterval(timer);
    console.log("El tiempo se ha detenido.");
  }
});
</script>
