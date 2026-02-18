<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-arcane-text">Bestiario</h1>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <template v-if="isLoading">
        <MonsterSkeleton v-for="i in 4" :key="'skel-'+i" />
      </template>

      <template v-else>
        <MonsterCard
          v-for="monster in monsterList"
          :key="monster.id"
          :monster="monster"
        />
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { monsters } from '../data/monster';
import MonsterCard from '../components/ui/MonsterCard.vue';
import MonsterSkeleton from '../components/ui/MonsterSkeleton.vue';

const isLoading = ref(true);
const monsterList = ref([]);

onMounted(() => {
  // Simulamos una carga de API de 1.5 segundos para mostrar el skeleton
  setTimeout(() => {
    monsterList.value = monsters;
    isLoading.value = false;
  }, 1500);
});
</script>
