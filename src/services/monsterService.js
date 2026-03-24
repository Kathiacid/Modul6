import api from './api';

export const monsterService = {
  async getMonsters(query = '', page = 1) {
    try {
      const response = await api.get('/monsters', {
        params: {
          search: query,
          page: page,
          limit: 10
        }
      });

      return response.data;
    } catch (error) {
      console.error("Error en la biblioteca arcana:", error);
      throw error;
    }
  },

  async getSpellsCount() {
    const response = await api.get('/spells/', {
      params: { limit: 1 }
    });
    return response.data.count;
  }
};
