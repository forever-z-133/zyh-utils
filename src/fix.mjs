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
 * TODO
 * 小数乘以 10 的 n 次方
 * BUG:
 *   1.1 * 100 // 110.00000000000001
 *   1.15 * 100 // 114.99999999999999
 * @param {Number} num 基数
 * @param {Number} exponent 次幂
 * @returns number
 */
export const pow10 = (num, exponent = 0) => {
  const pow = Math.pow(10, exponent);
  return num * pow;
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
