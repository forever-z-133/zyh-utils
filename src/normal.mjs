
/**
 * 判断类型
 * @param {Any} obj 任何数据
 * @returns string
 */
export const typeOf = obj => {
  const typeStr = Object.prototype.toString.call(obj).split(' ')[1];
  return typeStr.slice(0, typeStr.length - 1).toLowerCase();
};

/**
 * 判断是否为数字字符串
 * @param {String} str 字符串
 * @returns boolean
 */
export const isNumberString = str => {
  return parseFloat(str) == str;
};

/**
 * 补零
 * @param {Number} num 数字
 * @param {Number} len 长度
 * @returns number
 */
export const addZero = (num, len = 2) => {
  let result = isNaN(num) ? '' : (num + '');
  let numLen = result.length;
  while (numLen++ < len) result = '0' + result;
  return result;
};

/**
 * 连字符转驼峰
 * 比如 font-size 返回 fontSize
 * @param {String} str 字符串
 * @returns string
 */
export const camelize = str => {
  if (!str || typeof str !== 'string') return '';
  return str.toLowerCase().replace(/-(\w)/g, (_, s) => s.toUpperCase());
};

/**
 * 对象中的 key 转为驼峰
 * 比如 {'font-size':1} 返回 {fontSize:1}
 * @param {Object} obj
 * @returns object
 */
export const camelizeKeys = obj => {
  const result = {};
  if (!obj) return result;
  Object.keys(obj).forEach(k => {
    const key = camelize(k);
    result[key] = obj[k];
  });
  return result;
};
