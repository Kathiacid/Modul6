import { defineStore } from 'pinia';
import { monsterService } from '../services/monsterService';

export const useBestiaryStore = defineStore('bestiary', {
  state: () => ({
    monsters: [],
    isFetched: false,
    loading: false
  }),
  actions: {
    async fetchMonsters() {
      if (this.isFetched) return;
      this.loading = true;
      try {
        const data = await monsterService.getMonsters();
        this.monsters = data.results || data;
        this.isFetched = true;
      } finally {
        this.loading = false;
      }
    }
  }
});
