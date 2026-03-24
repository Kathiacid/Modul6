<template>
  <span
class="px-3 py-1 text-xs font-bold rounded-full uppercase tracking-wider border"
    :class="{
      'bg-green-100 text-green-700 border-green-300': type.toLowerCase().includes('beast'),
      'bg-purple-100 text-purple-700 border-purple-300': type.toLowerCase().includes('undead'),
      'bg-red-100 text-red-700 border-red-300': type.toLowerCase().includes('dragon'),
      'bg-yellow-100 text-yellow-700 border-yellow-300': type.toLowerCase().includes('monstrosity'),
      'bg-pink-100 text-pink-700 border-pink-300': type.toLowerCase().includes('aberration'),
      'bg-blue-100 text-blue-700 border-blue-300': type.toLowerCase().includes('giant'),
      'bg-orange-100 text-orange-700 border-orange-300': type.toLowerCase().includes('celestial'),
      'bg-indigo-100 text-indigo-700 border-indigo-300': type.toLowerCase().includes('humanoid'),
      'bg-amber-100 text-amber-700 border-amber-300': type.toLowerCase().includes('fey'),
      'bg-cyan-100 text-cyan-700 border-cyan-300': type.toLowerCase().includes('elemental'),
      'bg-slate-100 text-slate-700 border-slate-300': type.toLowerCase().includes('construct'),
      'bg-rose-100 text-rose-700 border-rose-300': type.toLowerCase().includes('fiend'),
      'bg-lime-100 text-lime-700 border-lime-300': type.toLowerCase().includes('ooze'),
    }"
  >
    {{ type }}
  </span>
</template>

<script setup>
defineProps({
  type: { type: String, required: true }
});
</script>
