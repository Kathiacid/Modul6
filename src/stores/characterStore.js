import { defineStore } from 'pinia';

export const useCharacterStore = defineStore('character', {
  state: () => ({
    preparedSpells: [] // Array de IDs
  }),
  actions: {
    togglePreparedSpell(spellId) {
      const index = this.preparedSpells.indexOf(spellId);
      if (index > -1) {
        this.preparedSpells.splice(index, 1);
      } else {
        this.preparedSpells.push(spellId);
      }
    }
  },
  persist: true // Requerimiento: Persistencia activada
});
