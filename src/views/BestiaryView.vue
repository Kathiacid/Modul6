<template>
  <div>
    <h1 class="text-3xl font-bold mb-8 text-arcane-text text-pretty">Explorador del Bestiario</h1>

    <div class="mb-8">
      <MonsterSearch />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-[400px]">
      <template v-if="isLoading">
        <MonsterSkeleton v-for="i in 8" :key="'skel-' + i" />
      </template>

      <template v-else-if="monsterList.length > 0">
        <MonsterCard
          v-for="monster in monsterList"
          :key="monster.slug"
          :monster="mapMonster(monster)"
          @open-grimoire="selectedMonster = $event"
        />
      </template>

      <div v-else class="col-span-full text-center py-20 bg-white rounded-3xl border-2 border-dashed border-gray-200">
        <font-awesome-icon icon="fa-solid fa-wand-sparkles" class="text-4xl text-gray-300 mb-4" />
        <p class="text-xl text-gray-500 font-medium px-4">
          El conjuro de búsqueda falló: No hay monstruos que coincidan en este plano.
        </p>
      </div>
    </div>

    <div class="mt-12 flex flex-col items-center gap-4">
      <div class="flex items-center gap-4">
        <button
          @click="changePage(currentPage - 1)"
          :disabled="!prevUrl || isLoading"
          class="px-6 py-2 bg-white border-2 border-arcane-pink text-arcane-pink rounded-xl font-bold disabled:opacity-30 disabled:border-gray-200 disabled:text-gray-400 transition-all hover:bg-arcane-pink hover:text-white"
        >
          Anterior
        </button>

        <span class="font-mono font-bold text-gray-600">
          Página {{ currentPage }} de {{ totalPages }}
        </span>

        <button
          @click="changePage(currentPage + 1)"
          :disabled="!nextUrl || isLoading"
          class="px-6 py-2 bg-white border-2 border-arcane-pink text-arcane-pink rounded-xl font-bold disabled:opacity-30 disabled:border-gray-200 disabled:text-gray-400 transition-all hover:bg-arcane-pink hover:text-white"
        >
          Siguiente
        </button>
      </div>
      <p class="text-xs text-gray-400 uppercase tracking-widest">
        Total de criaturas descubiertas: {{ totalCount }}
      </p>
    </div>

    <GrimoireModal
      :monster="selectedMonster ? mapMonster(selectedMonster) : null"
      @close="selectedMonster = null"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useMonsters } from '../composables/useMonsters';
import { monsterService } from '../services/monsterService';

// Importación de componentes necesarios
import MonsterCard from '../components/ui/MonsterCard.vue';
import MonsterSkeleton from '../components/ui/MonsterSkeleton.vue';
import MonsterSearch from '../components/ui/MonsterSearch.vue';
import GrimoireModal from '../components/ui/GrimoireModal.vue';

const {
  monsterList,
  searchQuery,
  currentPage,
  totalPages,
  nextUrl,
  prevUrl,
  updateMonsterData
} = useMonsters();

const isLoading = ref(true);
const totalCount = ref(0);
const selectedMonster = ref(null);

// Función orquestadora de carga (Parte 8 y 9)
const fetchMonsters = async () => {
  try {
    isLoading.value = true;
    const data = await monsterService.getMonsters(searchQuery.value, currentPage.value);

    // Actualizamos el estado global en el composable
    updateMonsterData(data);
    totalCount.value = data.count;
  } catch (error) {
    console.error("Fallo en la invocación remota:", error);
  } finally {
    isLoading.value = false;
  }
};

const changePage = (newPage) => {
  currentPage.value = newPage;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

// Mapeo para mantener compatibilidad con las propiedades de MonsterCard y Detail
const mapMonster = (m) => {
  if (!m) return null;
  return {
    id: m.slug,
    name: m.name,
    type: m.type || 'Desconocido',
    hp: m.hit_points,
    ac: m.armor_class,
    cr: m.challenge_rating,
    image: `https://api.dicebear.com/7.x/bottts/svg?seed=${m.name}`,
    stats: {
      fue: m.strength,
      des: m.dexterity,
      con: m.constitution,
      int: m.intelligence,
      sab: m.wisdom,
      car: m.charisma
    },
    lore: m.flavor || m.description || "Este espécimen no posee registros históricos detallados en el archivo actual."
  };
};

// Vigilamos cambios en la búsqueda para resetear a página 1 (Parte 9)
watch(searchQuery, () => {
  currentPage.value = 1;
  fetchMonsters();
});

// Vigilamos cambios en la página (Parte 9)
watch(currentPage, fetchMonsters);

onMounted(fetchMonsters);
</script>
