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
    if (index === 1) num = Math.max(0, num - 1);

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
  let result = format;

  DateFormatConfig.forEach(({ regexp, get }) => {
    // 比如匹配到 M+ 则，获取实际月份替换掉 MM 对应的字符串
    result = result.replace(regexp, str => {
      let num = get(date);
      num = addZero(num, str.length);
      return num;
    });
  });

  return result;
};

/**
 * 日期增加
 * 例如：增加1天 addDate(new Date(2019,5,19,10,40,0), 1); // Thu Jun 20 2019 10:40:00
 * @param {Date} date
 * @param {Number} offset
 * @param {String} dateType
 * @returns date
 */
export const addDate = (date, offset, dateType = 'date') => {
  const d = new Date(date);
  const _config = {
    year: 'FullYear',
    month: 'Month',
    date: 'Date',
    day: 'Date',
    hour: 'Hours',
    minute: 'Minutes',
    second: 'Seconds'
  };
  const _type = _config[dateType];
  const setFunc = date[`set${_type}`].bind(d);
  const getFunc = date[`get${_type}`].bind(d);
  return new Date(setFunc(getFunc() + offset));
};

/**
 * 获取清零后的时间
 * 例如：getInitialDate(new Date(2019,5,19,10,40,0), '111000'); // Wed Jun 19 2019 00:00:00
 * @param {Date} date
 * @param {string} format
 * @returns date
 */
export const getInitialDate = (date, format = '111000') => {
  const dateArgs = [];
  DateFormatConfig.forEach(({ defaultValue, get }, index) => {
    const needInitial = format[index] === '0';
    let num = needInitial ? defaultValue : get(date);
    if (index === 1) num = Math.max(0, num - 1); // 月份比较特殊，需要 -1
    dateArgs.push(num);
  });
  return new Date(...dateArgs);
};

/**
 * 获取该月份的总天数
 * @param {Number} month
 * @param {Number} year
 * @returns number
 */
export const getDaysInMonth = (month, year) => {
  if (month === 2) return (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) ? 29 : 28;
  if ([1, 3, 5, 7, 8, 10, 12].includes(month)) return 31;
  return 30;
};

/**
 * 获取本周第一天(星期一)
 * @param {Date} date
 * @returns date
 */
export const getFirstDayOfWeek = date => {
  const day = date.getDay();
  return addDate(date, -day);
};

/**
 * 获取已过去多久的字符串文案
 * @param {Date} date
 * @returns string
 */
export const getPastDateString = (date, baseDate = new Date()) => {
  const time = baseDate.getTime();
  const now = date.getTime();
  const diff = (now - time) / 1000;

  if (diff < 0) return ''; // 未知时间

  if (diff < 60) {
    return '刚刚';
  } else if (diff < 60*60) {
    return `${diff/60>>0}分钟前`;
  } else if (diff < 24*60*60) {
    return `${diff/3600>>0}小时前`;
  } else if (diff < 2*24*60*60) {
    return '一天前';
  } else if (diff < 3*24*60*60) {
    return '二天前';
  } else {
    return dateToString(time, 'yyyy-MM-dd');
  }
};
