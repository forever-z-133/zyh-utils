import { addZero } from './normal.mjs';

// 日期字符串转换相关配置
const DateFormatConfig = [
  {
    regexp: /[Yy]+/,
    get: date => date.getFullYear(),
    defaultValue: 1970,
  },
  {
    regexp: /M+/,
    get: date => date.getMonth() + 1,
    defaultValue: 0,
  },
  {
    regexp: /[Dd]+/,
    get: date => date.getDate(),
    defaultValue: 1,
  },
  {
    regexp: /[Hh]+/,
    get: date => date.getHours(),
    defaultValue: 0,
  },
  {
    regexp: /m+/,
    get: date => date.getMinutes(),
    defaultValue: 0,
  },
  {
    regexp: /[Ss]+/,
    get: date => date.getSeconds(),
    defaultValue: 0,
  }
];

/**
 * 时间字符串转为时间对象
 * WARNING: 仅支持双数的场景，比如字符串 05 与格式 MM，不支持字符串 5 和格式 M
 * @param {String} str 时间字符串
 * @param {String} format 时间字符串对应的格式
 * @returns date
 */
export const stringToDate = (str, format = 'yyyy-MM-dd') => {
  const dateArgs = [];

  DateFormatConfig.forEach(({ regexp, defaultValue }, index) => {
    const match = format.match(regexp);

    // 比如匹配不到 /yyyy+/ 则天数默认为 1970
    if (!match) {
      dateArgs.push(defaultValue);
      return;
    }

    // 比如匹配到 /MM+/ 则从 str 中取后面对应长度的数字
    const numMatch = str.slice(match.index, match.index + match[0].length);
    let num = Number(numMatch);

    // 月份比较特殊，需要 -1
    if (index === 1) num -= 1;

    dateArgs.push(num);
  });

  return new Date(...dateArgs);
};

/**
 * 时间对象转为时间字符串
 * @param {Number|Date} date 时间戳|时间对象
 * @param {String} format 时间字符串对应的格式
 * @returns string
 */
export const dateToString = (date, format = 'yyyy-MM-dd') => {
  const d = new Date(date);
  let result = format;

  DateFormatConfig.forEach(({ regexp, get }) => {
    // 比如匹配到 M+ 则，获取实际月份替换掉 MM 对应的字符串
    result = result.replace(regexp, str => {
      let num = get(d);
      num = addZero(num, str.length);
      return num;
    });
  });

  return result;
};
