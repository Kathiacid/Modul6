import api from './api';

export const monsterService = {
  async getMonsters(query = '', page = 1) {
    try {
      // Usamos params para que Axios construya la URL: /monsters/?search=...&page=...
      const response = await api.get('/monsters', {
        params: {
          search: query,
          page: page
        }
      });
      return response.data; // Devolvemos todo el objeto { count, next, previous, results }
    } catch (error) {
      console.error("Error en la biblioteca arcana:", error);
      throw error;
    }
  },
  async getSpellsCount() {
    const response = await api.get('/spells/?limit=1');
    return response.data.count;
  }
};
