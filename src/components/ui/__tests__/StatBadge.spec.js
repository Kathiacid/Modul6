import { mount } from '@vue/test-utils';
import { describe, it, expect } from 'vitest';
import StatBadge from '../MonsterStatsChart.vue';

describe('StatBadge.vue', () => {
  it('renderiza el valor correcto cuando se pasa como prop', () => {
    const wrapper = mount(StatBadge, {
      props: { value: 18, label: 'Fuerza' }
    });
    // Comprobamos que el texto "18" aparezca en el componente
    expect(wrapper.text()).toContain('18');
  });
});
