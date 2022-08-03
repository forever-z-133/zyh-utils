import { typeOf } from './normal.mjs';

/**
 * 根据循环方法将数组拆为两份，符合的放前面
 * @param {*} array 数组
 * @param {*} callback 循环方法
 * @returns array
 */
export const divideArray = (array, callback) => {
  const template = [[], []];
  if (!callback || typeOf(callback) !== 'function') return template;
  return array.reduce((res, item, index) => {
    const match = callback(item, index);
    match ? res[0].push(item) : res[1].push(item);
    return res;
  }, template);
};

/**
 * 键值对字符串转为对象
 * a=1&b=2 转为 {a:'1',b:'2'}
 * @param {String} str 源字符串
 * @param {String} divide 键值对分割符
 * @param {String} concat 键值对赋值符
 * @returns object
 */
export const stringToObject = (str, divide = '&', concat = '=') => {
  if (!str || typeof str !== 'string') return {};

  const array = str.split(divide);
  const result = {};

  array.forEach(item => {
    if (!item) return;

    const temp = item.split(concat);
    const key = decodeURIComponent(temp.shift().trim());
    let value = decodeURIComponent(temp.join(concat).trim());

    if (!key) return;

    if (['null', 'undefined'].includes(value)) value = undefined;
    if (value === 'true') value = true;
    if (value === 'false') value = false;

    result[key] = value;
  });

  return result;
};

/**
 * 对象转为键值对字符串
 * {a:'1',b:'2'} 转为 a=1&b=2
 * @param {Object} obj 对象
 * @param {String} divide 键值对分割符
 * @param {String} concat 键值对赋值符
 * @returns string
 */
export const objectToString = (obj, divide = '&', concat = '=') => {
  if (!obj || typeof obj !== 'object') return '';
  const result = [];
  Object.keys(obj).forEach(key => {
    let val = obj[key];
    result.push(encodeURIComponent(key) + concat + encodeURIComponent(val));
  });
  return result.join(divide);
};

/**
 * 给链接加上参数
 * @param {String} url 链接
 * @param {String|Object} data 参数
 * @returns string
 */
const uselessUrlSearchReg = /[?#]\B/g; // 单独的无用的 ? 和 # 符
export const addDataToUrl = (url, data) => {
  const result = url.replace(uselessUrlSearchReg, '');
  if (!data) return result;

  const concat = result.includes('?') ? '&' : '?';

  if (typeof data === 'string') {
    return result + concat + data;
  } else if (typeOf(data) === 'object') {
    return result + concat + objectToString(data);
  }
  return result;
};

/**
 * 将 json 中某个 key 转为 key map，通常用于后续查重
 * @param {Array} array json
 * @param {String} key json 中的 key
 * @returns object
 */
export const jsonToObject = (json, keyName = '', valueName = '') => {
  const result = {};
  json.forEach((item, index) => {
    const name = keyName ? item[keyName] : item;
    const value = keyName ? (valueName ? item[valueName] : item) : index;
    result[name] = value;
  });
  return result;
};
