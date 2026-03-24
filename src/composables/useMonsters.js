import { ref, computed } from 'vue';

const monsterList = ref([]);
const searchQuery = ref('');
const currentPage = ref(1);
const totalMonsters = ref(0);
const nextUrl = ref(null);
const prevUrl = ref(null);

export function useMonsters() {


  const totalPages = computed(() => Math.ceil(totalMonsters.value / 10));

  const updateMonsterData = (data) => {
    monsterList.value = data.results;
    totalMonsters.value = data.count;
    nextUrl.value = data.next;
    prevUrl.value = data.previous;
  };

  const getMonsterById = (id) => {
    return monsterList.value.find(m => m.slug === id || m.id === id);
  };

  const resetToFullList = () => {
    searchQuery.value = '';
    currentPage.value = 1;
  };

  return {
    searchQuery,
    currentPage,
    monsterList,
    totalPages,
    nextUrl,
    prevUrl,
    updateMonsterData,
    getMonsterById,
    resetToFullList
  };
}
