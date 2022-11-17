
/**
 * 判断类型
 * @param {Any} obj 任何数据
 * @returns string
 */
export const typeOf = obj => Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();

/**
 * 补零
 * @param {Number} num 数字
 * @param {Number} len 长度
 * @returns number
 */
export const addZero = (num, len = 2) => {
  if (isNaN(num)) return '';
  let result = num + '';
  let numLen = result.length;
  while (numLen++ < len) result = '0' + result;
  return result;
};

/**
 * 驼峰转连字符
 * 比如 fontSize 返回 font-size
 * @param {String} str 驼峰字符串
 * @returns string
 */
export function hyphenate(str) {
  if (!str || typeof str !== 'string') return '';
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}

/**
 * 连字符转驼峰
 * 比如 font-size 返回 fontSize
 * @param {String} str 连字符字符串
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


/**
 * 获取某范围内的随机数
 * @param {Number} n 范围值1
 * @param {Number} m 范围值2
 * @returns number
 */
export const random = (n, m = 0) => {
  const min = Math.min(n, m);
  const max = Math.max(n, m);
  return min + Math.random() * (max - min);
};

/**
 * 延迟
 * @param {Number} wait 延时时长
 * @returns promise<void 0>
 */
export const sleep = wait => new Promise(resolve => setTimeout(resolve, wait));
