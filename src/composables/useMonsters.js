// src/composables/useMonsters.js
import { monsters } from '../data/monster';

export function useMonsters() {
  const getMonsterById = (id) => {
    // Aseguramos que el id sea un número para que coincida con la data
    return monsters.find(monster => monster.id === parseInt(id));
  };

  return {
    getMonsterById
  };
}
