import { setActivePinia, createPinia } from 'pinia';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useBestiaryStore } from '../../../stores/bestiaryStore'; 
import { monsterService } from '../../../services/monsterService';

vi.mock('../../../services/monsterService', () => ({
  monsterService: {
    getMonsters: vi.fn()
  }
}));

describe('Bestiary Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
    vi.clearAllMocks();
  });

  it('llena el array de monstruos correctamente usando el servicio mockeado', async () => {
    const store = useBestiaryStore();
    const mockData = { results: [{ name: 'Beholder', slug: 'beholder' }] };


    monsterService.getMonsters.mockResolvedValue(mockData);

    await store.fetchMonsters();

    expect(store.monsters).toHaveLength(1);
    expect(store.monsters[0].name).toBe('Beholder');
    expect(store.isFetched).toBe(true);
  });
});
