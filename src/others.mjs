
/**
 * 延时等待
 * @param {Number} delay 等待时长，单位 ms
 * @returns undefined
 */
export const sleep = (delay = 1000, cb) => new Promise(resolve => {
  setTimeout(() => {
    cb && cb();
    resolve();
  }, delay);
});
