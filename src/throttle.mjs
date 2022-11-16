
export function throttle(func, wait, options) {
  const { leading = false, trailing = false } = options || {};
  let startTime;
  let lastCallTimer;
  return function loop(...args) {
    if (!startTime) {
      startTime = Date.now();
      if (leading) {
        func.apply(this, args);
      }
      return;
    }

    const now = Date.now();
    if (now - startTime > wait) {
      func.apply(this, args);
      startTime = now;
    }

    lastCallTimer && clearTimeout(lastCallTimer);
    lastCallTimer = setTimeout(() => {
      startTime = void 0;
      if (trailing) {
        func.apply(this, args);
      }
    }, wait);
  };
}
