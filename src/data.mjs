/**
 * 将数组拆分为多个，符合的放前面
 * @param {Array} array 源数据
 * @param {Array} filterMethods 筛选函数
 * @returns array
 */
export const divideArray = (array, filterMethods = []) => {
  const length = filterMethods.length + 1;
  const result = new Array(length).fill().map(() => []);
  Array.from(array).forEach((item, ...args) => {
    const filterIndex = filterMethods.findIndex(method => method(item, ...args));
    if (filterIndex > -1) result[filterIndex].push(item);
    else result[length - 1].push(item);
  });
  return result;
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
    const key = decodeURIComponent(temp.shift());
    let value = decodeURIComponent(temp.join(concat));

    if (!key) return;

    if (value === 'null') value = null;
    else if (value === 'undefined') value = undefined;
    else if (value === 'true') value = true;
    else if (value === 'false') value = false;

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
const urlSearchUselessReg = /[?#]\B/g; // 单独的无用的 ? 和 # 符
export const addDataToUrl = (url, data) => {
  let result = url.replace(urlSearchUselessReg, '');
  if (!data) return result;

  let hash = '';
  const hashIndex = result.indexOf('#');
  if (hashIndex > -1) {
    hash = result.slice(hashIndex);
    result = result.slice(0, hashIndex);
  }

  const concat = result.includes('?') ? '&' : '?';

  if (typeof data === 'string') {
    return result + concat + data + hash;
  } else if (typeof data === 'object') {
    return result + concat + objectToString(data) + hash;
  }
  return result + hash;
};

/**
 * 将 json 中某个 key 转为 key map，通常用于后续查重
 * 例如： [{id:'a',value:1}] 转变为 { a:1 }
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
