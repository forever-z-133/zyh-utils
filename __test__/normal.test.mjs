import { describe, test, expect } from 'vitest';
import {
  typeOf,
  isNumberString,
  addZero,
  camelize,
  camelizeKeys,
} from '../src/normal.mjs';

describe('normal.mjs', () => {
  test('typeOf', () => {
    expect(typeOf()).toBe('undefined');
    expect(typeOf(0)).toBe('number');
    expect(typeOf('')).toBe('string');
    expect(typeOf(true)).toBe('boolean');
    expect(typeOf([])).toBe('array');
    expect(typeOf({})).toBe('object');
    expect(typeOf(test)).toBe('function');
    expect(typeOf(() => {})).toBe('function');
    expect(typeOf(/x/)).toBe('regexp');
    expect(typeOf(new Date)).toBe('date');
  });

  test('isNumberString', () => {
    expect(isNumberString()).toBe(false);
    expect(isNumberString('')).toBe(false);
    expect(isNumberString('1x')).toBe(false);
    expect(isNumberString('x1')).toBe(false);
    expect(isNumberString('12')).toBe(true);
    expect(isNumberString('2e2')).toBe(true);
  });

  test('addZero', () => {
    expect(addZero()).toBe('00');
    expect(addZero(0)).toBe('00');
    expect(addZero(10)).toBe('10');
    expect(addZero(120)).toBe('120');
    expect(addZero(10, 4)).toBe('0010');
  });

  test('camelize', () => {
    expect(camelize()).toBe('');
    expect(camelize('abc')).toBe('abc');
    expect(camelize('font-')).toBe('font-');
    expect(camelize('font-size')).toBe('fontSize');
  });

  test('camelizeKeys', () => {
    expect(camelizeKeys()).toStrictEqual({});
    expect(camelizeKeys({'font-size':'10px'})).toStrictEqual({fontSize:'10px'});
  });
});
