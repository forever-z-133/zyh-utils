
/**
 * 时间字符串转为时间对象
 * @param {String} str 时间字符串
 * @param {String} format 时间字符串对应的格式
 * @returns date
 */
export const stringToDate = (str, format = 'yyyy-MM-dd') => {
  let args = [/y+/, /M+/, /d+/, /h+/, /m+/, /s+/];
  args = args.reduce((re, reg, index) => {
    const match = format.match(reg);
    const defaultValue = [1970, 0, 1, 0, 0, 0][index];
    if (!match) return re.concat([defaultValue]);
    let temp = match.index;
    const num = Number(str.slice(temp).match(/\d+/));
    return re.concat([num]);
  }, []);
  args.unshift(null);
  return new(Date.bind.apply(Date, args));
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
  const _config = {
    'y+': d.getFullYear(),
    'M+': d.getMonth() + 1, // 月
    'd+': d.getDate(), // 日
    'h+': d.getHours(), // 小时
    'm+': d.getMinutes(), // 分
    's+': d.getSeconds(), // 秒
  };

  for (const reg in _config) {
    if (!(new RegExp(`(${reg})`).test(result))) continue;
    const match = RegExp.$1;
    let num = `${_config[reg]}`;
    while (num.length < match.length) { num = `0${num}`; }
    result = result.replace(match, num);
  }

  return result;
};
