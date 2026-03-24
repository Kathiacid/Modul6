import { describe, it, expect } from 'vitest';
import { calculateModifier } from '../../../utils/dndUtils';

describe('Utilidades de D&D', () => {
  it('calcula correctamente los modificadores de característica', () => {
    expect(calculateModifier(18)).toBe(4);
    expect(calculateModifier(8)).toBe(-1);
    expect(calculateModifier(10)).toBe(0);
  });
});
