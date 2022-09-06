import { describe, test, expect } from 'vitest';
import {
  dateToString,
  stringToDate,
} from '../src/date.mjs';


describe('date.mjs', () => {
  test('dateToString', () => {
    const date = new Date(2022, 4, 20, 23, 59, 59); // 2022-5-20 23:59:59
    expect(dateToString(date)).toBe('2022-05-20');
    expect(dateToString(date, 'yyyy-M-d')).toBe('2022-5-20');
    expect(dateToString(date, 'yyyy年M月d日')).toBe('2022年5月20日');
    expect(dateToString(date, 'YYYYMMDD')).toBe('20220520');
    expect(dateToString(date, 'MM-dd YYYY年')).toBe('05-20 2022年');
    expect(dateToString(date, 'hh:mm:ss')).toBe('23:59:59');
    expect(dateToString(date, 'hh:mm:ss yyyy-MM-dd')).toBe('23:59:59 2022-05-20');
  });

  test('stringToDate', () => {
    const date = new Date(2022, 4, 20, 0, 0, 0); // 2022-5-20 23:59:59
    expect(stringToDate('2022-05-20')).toStrictEqual(date);
    expect(stringToDate('2022年05月20日', 'yyyy年MM月dd日')).toStrictEqual(date);
    expect(stringToDate('20220520', 'YYYYMMDD')).toStrictEqual(date);
  });
});
