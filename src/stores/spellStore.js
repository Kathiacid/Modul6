// src/stores/spellStore.js
import { defineStore } from 'pinia';
import { computed, ref } from 'vue'; // Asegúrate de que esté presente
import api from '../services/api';

export const useSpellStore = defineStore('spells', () => {
  const spells = ref([]);

  // Requerimiento Parte 12: Hechizos nivel 5 o superior
  const highLevelSpellsCount = computed(() => {
    return spells.value.filter(s => parseInt(s.level_int) >= 5).length;
  });

  async function fetchSpells() {
    const response = await api.get('/spells/?limit=50');
    spells.value = response.data.results;
  }

  return { spells, highLevelSpellsCount, fetchSpells };
});
