import { describe, test, expect } from 'vitest';
import {
  dateToString,
  stringToDate,
  addDate,
  getInitialDate,
  getDaysInMonth,
  getFirstDayOfWeek,
  getPastDateString,
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
    const date = new Date(2022, 4, 20, 0, 0, 0); // 2022-5-20 00:00:00
    expect(stringToDate('2022-05-20')).toStrictEqual(date);
    expect(stringToDate('2022年05月20日', 'yyyy年MM月dd日')).toStrictEqual(date);
    expect(stringToDate('20220520', 'YYYYMMDD')).toStrictEqual(date);
    expect(stringToDate('19700101', 'YYYYMMDD')).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0));
  });

  test('addDate', () => {
    const date = new Date(2022, 4, 20, 0, 0, 0); // 2022-5-20 00:00:00
    expect(addDate(date, 1)).toStrictEqual(new Date(2022, 4, 21, 0, 0, 0));
    expect(addDate(date, 1, 'year')).toStrictEqual(new Date(2023, 4, 20, 0, 0, 0));
    expect(addDate(date, 1, 'month')).toStrictEqual(new Date(2022, 5, 20, 0, 0, 0));
    expect(addDate(date, 1, 'date')).toStrictEqual(new Date(2022, 4, 21, 0, 0, 0));
    expect(addDate(date, 1, 'hour')).toStrictEqual(new Date(2022, 4, 20, 1, 0, 0));
    expect(addDate(date, 1, 'minute')).toStrictEqual(new Date(2022, 4, 20, 0, 1, 0));
    expect(addDate(date, 1, 'second')).toStrictEqual(new Date(2022, 4, 20, 0, 0, 1));
    expect(addDate(date, -1, 'year')).toStrictEqual(new Date(2021, 4, 20, 0, 0, 0));
    expect(addDate(new Date(2022, 4, 20, 23, 59, 59), 2, 'second')).toStrictEqual(new Date(2022, 4, 21, 0, 0, 1));
    expect(addDate(new Date(2020, 1, 28, 0, 0, 0), 1, 'date')).toStrictEqual(new Date(2020, 1, 29, 0, 0, 0));
    expect(addDate(new Date(2023, 1, 28, 0, 0, 0), 1, 'date')).toStrictEqual(new Date(2023, 2, 1, 0, 0, 0));
    expect(addDate(new Date(2023, 11, 31, 0, 0, 0), 1, 'date')).toStrictEqual(new Date(2024, 0, 1, 0, 0, 0));
  });

  test('getInitialDate', () => {
    expect(getInitialDate(new Date(2022, 4, 20, 23, 59, 59))).toStrictEqual(new Date(2022, 4, 20, 0, 0, 0));
    expect(getInitialDate(new Date(2022, 4, 20, 23, 59, 59), '111100')).toStrictEqual(new Date(2022, 4, 20, 23, 0, 0));
    expect(getInitialDate(new Date(2022, 4, 20, 23, 59, 59), '111001')).toStrictEqual(new Date(2022, 4, 20, 0, 0, 59));
    expect(getInitialDate(new Date(2022, 4, 20, 23, 59, 59), '000000')).toStrictEqual(new Date(1970, 0, 1, 0, 0, 0));
  });

  test('getDaysInMonth', () => {
    expect(getDaysInMonth(1, 2023)).toBe(31);
    expect(getDaysInMonth(4, 2023)).toBe(30);
    expect(getDaysInMonth(2, 2023)).toBe(28);
    expect(getDaysInMonth(2, 2020)).toBe(29);
  });

  test('getFirstDayOfWeek', () => {
    expect(getFirstDayOfWeek(new Date(2023, 2, 18, 19, 15, 0))).toStrictEqual(new Date(2023, 2, 12, 19, 15, 0)); // 周六转周一
    expect(getFirstDayOfWeek(new Date(2023, 2, 12, 19, 15, 0))).toStrictEqual(new Date(2023, 2, 12, 19, 15, 0)); // 周一转周一
  });

  test('getPastDateString', () => {
    const baseDate = new Date(2022, 4, 20, 0, 0, 0); // 2022-5-20 00:00:00
    expect(getPastDateString(new Date(2022, 4, 20, 0, 0, 0, 50), baseDate)).toBe('刚刚');
    expect(getPastDateString(new Date(2022, 4, 20, 0, 0, 1), baseDate)).toBe('刚刚');
    expect(getPastDateString(new Date(2022, 4, 20, 0, 1, 0), baseDate)).toBe('1分钟前');
    expect(getPastDateString(new Date(2022, 4, 20, 0, 1, 30), baseDate)).toBe('1分钟前');
    expect(getPastDateString(new Date(2022, 4, 20, 0, 2, 0), baseDate)).toBe('2分钟前');
    expect(getPastDateString(new Date(2022, 4, 20, 1, 0, 0), baseDate)).toBe('1小时前');
    expect(getPastDateString(new Date(2022, 4, 21, 1, 0, 0), baseDate)).toBe('一天前');
    expect(getPastDateString(new Date(2022, 4, 21, 1, 0, 0), baseDate)).toBe('二天前');
    expect(getPastDateString(new Date(2022, 4, 23, 1, 0, 0), baseDate)).toBe('2022-05-23');
  });
});
