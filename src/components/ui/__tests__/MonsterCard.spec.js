import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import MonsterCard from '../MonsterCard.vue';

describe('MonsterCard.vue', () => {
  it('emite el evento open-grimoire con el objeto del monstruo al hacer clic', async () => {
    const monster = { id: 'goblin', name: 'Goblin' };
    const wrapper = mount(MonsterCard, {
      props: { monster },
      global: {
        stubs: ['font-awesome-icon'] // Ignoramos los iconos internos
      }
    });

    // Buscamos el botón "Ver Detalles" o similar
    const button = wrapper.find('button');
    await button.trigger('click');

    // Comprobamos que se emitió el evento 'open-grimoire'
    expect(wrapper.emitted()).toHaveProperty('open-grimoire');
    // Verificamos que el primer argumento del evento sea nuestro objeto monster
    expect(wrapper.emitted()['open-grimoire'][0]).toEqual([monster]);
  });
});
