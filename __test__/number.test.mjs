import { describe, test, expect } from 'vitest';
import {
  isNumberString,
  createNumberObject,
  toFixed,
  calculate,
} from '../src/number.mjs';

describe('fix.mjs', () => {
  test('isNumberString', () => {
    expect(isNumberString()).toBe(false);
    expect(isNumberString('')).toBe(false);
    expect(isNumberString('1x')).toBe(false);
    expect(isNumberString('x1')).toBe(false);
    expect(isNumberString('12')).toBe(true);
    expect(isNumberString('.1')).toBe(true);
    expect(isNumberString('-12')).toBe(true);
    expect(isNumberString('-.1')).toBe(true);
    expect(isNumberString('12.5')).toBe(true);
    expect(isNumberString('2e2')).toBe(true);
    expect(isNumberString('0.2e2')).toBe(true);
    expect(isNumberString('.2e2')).toBe(true);
    expect(isNumberString('-.2e2')).toBe(true);
    expect(isNumberString('2e2')).toBe(true);
    expect(isNumberString('2e-2')).toBe(true);
  });

  test('createNumberObject', () => {
    expect(createNumberObject(1)).toStrictEqual({n:'1',negative:1,decimal:0});
    expect(createNumberObject(-1)).toStrictEqual({n:'1',negative:-1,decimal:0});
    expect(createNumberObject(1e-8)).toStrictEqual({n:'1',negative:1,decimal:8});
    expect(createNumberObject(1e21)).toStrictEqual({n:'1000000000000000000000',negative:1,decimal:0});
    expect(createNumberObject(0.01)).toStrictEqual({n:'1',negative:1,decimal:2});
    expect(createNumberObject(-.12)).toStrictEqual({n:'12',negative:-1,decimal:2});
    expect(createNumberObject(.1e2)).toStrictEqual({n:'10',negative:1,decimal:0});
  });

  test('toFixed', () => {
    expect(toFixed(1)).toBe(1);
    expect(toFixed(1.1)).toBe(1.1);
    expect(toFixed(7.665)).toBe(7.67);
    expect(toFixed(8.665)).toBe(8.67);
    expect(toFixed(1.661, 2, 'ceil')).toBe(1.67);
    expect(toFixed(1.669, 2, 'floor')).toBe(1.66);
    expect(toFixed(1.6665, 3)).toBe(1.667);
  });

  test('calculate', () => {
    expect(calculate('+', 0.1, 0.2)).toBe(0.3);
    expect(calculate('-', 0.8, 0.7)).toBe(0.1);
    expect(calculate('*', 1.1, 100)).toBe(110);
    expect(calculate('/', 6.1, 0.1)).toBe(61);
  });
});
