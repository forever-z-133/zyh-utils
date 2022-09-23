import { describe, test, expect } from 'vitest';
import {
  toFixed,
  calculate,
} from '../src/fix.mjs';

describe('fix.mjs', () => {
  test('toFixed', () => {
    // expect(toFixed(1)).toBe(1);
    // expect(toFixed(1.1)).toBe(1.1);
    // expect(toFixed(7.665)).toBe(7.67);
    // expect(toFixed(8.665)).toBe(8.67);
    // expect(toFixed(1.661, 2, 'ceil')).toBe(1.67);
    // expect(toFixed(1.669, 2, 'floor')).toBe(1.66);
    // expect(toFixed(1.6665, 3)).toBe(1.667);
  });

  test('calculate', () => {
    // expect(calculate('+', 0.1, 0.2)).toBe(0.3);
    // expect(calculate('-', 0.8, 0.7)).toBe(0.1);
    // expect(calculate('*', 1.1, 100)).toBe(110);
    // expect(calculate('/', 6.1, 0.1)).toBe(61);
  });
});
