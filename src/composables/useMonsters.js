import { ref, computed } from 'vue';

// Variables globales del estado (compartidas entre componentes)
const monsterList = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalMonsters = ref(0);
const nextUrl = ref(null);
const prevUrl = ref(null);

export function useMonsters() {

  // Requerimiento Parte 9: Calcular páginas totales (50 monstruos por página)
  const totalPages = computed(() => Math.ceil(totalMonsters.value / 50));

  // Requerimiento Parte 9: Actualizar el estado con datos de la API
  const updateMonsterData = (data) => {
    monsterList.value = data.results; //
    totalMonsters.value = data.count;
    nextUrl.value = data.next;
    prevUrl.value = data.previous;
  };

  // Requerimiento Parte 3 y 8: Encontrar un monstruo específico por su ID o Slug
  // Esto soluciona el error "getMonsterById is not a function"
  const getMonsterById = (id) => {
    return monsterList.value.find(m => m.slug === id || m.id === id);
  };

  return {
    searchQuery,
    currentPage,
    monsterList,
    totalPages,
    nextUrl,
    prevUrl,
    updateMonsterData,
    getMonsterById // <--- Exportación esencial para MonsterDetail.vue
  };
}
