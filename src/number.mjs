/**
 * 判断是否为数字字符串
 * @param {String} str 字符串
 * @returns boolean
 */
const numberRegexp = /^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/;
export const isNumberString = str => {
  return numberRegexp.test(str);
};

/**
 * 返回整数格式的数据，用于避免计算时的精度问题
 * 借鉴 https://github.com/MikeMcl/big.js/blob/master/big.js#L138
 * @param {Number} num 数字
 * @return object
 */
export const createNumberObject = num => {
  let n = String(num);
  let decimal = 0; // 小数位数

  // 处理正负号
  const negative = n.charAt(0) == '-' ? (n = n.slice(1), -1) : 1;

  // 处理科学计数法
  const e = n.indexOf('e');
  if (e > -1) {
    let neg = +n.slice(e + 1);
    n = n.slice(0, e);
    if (neg < 0) {
      decimal = -neg;
    } else {
      for (;neg > 0;neg--) n += '0';
    }
  }

  // 处理小数点
  let d = n.indexOf('.');
  if (d > -1) {
    for (;d++ < n.length - 1;) decimal++;
    n = n.replace('.', '');
    let z = 0;
    for (;z < n.length - 1 && n.charAt(z) === '0'; z++);
    n = n.slice(z);
  }

  return {
    n,
    decimal,
    negative,
  };
};

/**
 * TODO
 * 数字计算
 * BUG:
 *   0.1 + 0.2 // 0.30000000000000004
 *   0.8 - 0.7 // 0.10000000000000009
 *   1.1 * 100 // 110.00000000000001
 *   6.1 / 0.1 // 60.99999999999999
 * @param {String} type 运算规则 加减乘除
 * @param {Number} num1 数字1
 * @param {Number} num2 数字2
 * @returns number
 */
export const calculate = (type, num1, num2) => {
  return NaN;
};

/**
 * 小数取整
 * BUG:
 *   8.665.toFixed(2) // 8.66
 *   7.665.toFixed(2) // 7.67
 * @param {Number} num 数字
 * @param {Number} decimal 小数点后几位
 * @param {String} mathType 超出位数后的小数取整方案，ceil 向上取整， floor 向下取整，round 四舍五入
 * @returns number
 */
export const toFixed = (num, decimal = 2, mathType = 'round') => {
  const pow = Math.pow(10, decimal);
  const method = Math[mathType];
  return method(num * pow) / pow;
};
