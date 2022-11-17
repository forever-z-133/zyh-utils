import { describe, test, expect, vi } from 'vitest';
import {
  typeOf,
  addZero,
  hyphenate,
  camelize,
  camelizeKeys,
  random,
  sleep,
} from '../src/normal.mjs';

describe('normal.mjs', () => {
  test('typeOf', () => {
    expect(typeOf()).toBe('undefined');
    expect(typeOf(0)).toBe('number');
    expect(typeOf(NaN)).toBe('number');
    expect(typeOf('')).toBe('string');
    expect(typeOf(undefined)).toBe('undefined');
    expect(typeOf(null)).toBe('null');
    expect(typeOf([])).toBe('array');
    expect(typeOf({})).toBe('object');
    expect(typeOf(test)).toBe('function');
    expect(typeOf(() => {})).toBe('function');
    expect(typeOf(/x/)).toBe('regexp');
    expect(typeOf(new Date())).toBe('date');
  });

  test('addZero', () => {
    expect(addZero()).toBe('');
    expect(addZero(0)).toBe('00');
    expect(addZero(1)).toBe('01');
    expect(addZero(10)).toBe('10');
    expect(addZero(120, 2)).toBe('120');
    expect(addZero(10, 4)).toBe('0010');
  });

  test('hyphenate', () => {
    expect(hyphenate()).toBe('');
    expect(hyphenate('abc')).toBe('abc');
    expect(hyphenate('Font')).toBe('font');
    expect(hyphenate('fonT')).toBe('fon-t');
    expect(hyphenate('fontSize')).toBe('font-size');
    expect(hyphenate('FontSize')).toBe('font-size');
  });

  test('camelize', () => {
    expect(camelize()).toBe('');
    expect(camelize('abc')).toBe('abc');
    expect(camelize('font-')).toBe('font-');
    expect(camelize('-font')).toBe('Font');
    expect(camelize('font-size')).toBe('fontSize');
  });

  test('camelizeKeys', () => {
    expect(camelizeKeys()).toStrictEqual({});
    expect(camelizeKeys({'font-size':'10px'})).toStrictEqual({fontSize:'10px'});
  });

  test('random', () => {
    const checkData1 = new Array(100).fill().map(() => random(5, 8));
    const check1 = data => data.every(n => n > 5 && n < 8);
    const checkData2 = new Array(100).fill().map(() => random(2));
    const check2 = data => data.every(n => n > 0 && n < 2);
    const checkData3 = new Array(100).fill().map(() => random(1, -2));
    const check3 = data => data.every(n => n > -2 && n < 1);

    expect(checkData1).toSatisfy(check1);
    expect(checkData2).toSatisfy(check2);
    expect(checkData3).toSatisfy(check3);
  });

  test('sleep', () => {
    vi.useFakeTimers();
    const callback = vi.fn();
    const promise = sleep(1000);
    setTimeout(() => {
      expect(callback).not.toBeCalled();
    }, 500);
    vi.runAllTimers();
    expect(promise.then(callback)).resolves.toBeUndefined();
    vi.useRealTimers();
  });
});
