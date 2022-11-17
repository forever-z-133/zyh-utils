
export function throttle(func, wait, options) {
  let startTime;
  let lastCallTimer;

  function trigger(...args) {
    const { leading = false, trailing = false } = options || {};

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
      lastCallTimer = void 0;
      if (trailing) {
        func.apply(this, args);
      }
    }, wait);
  }

  trigger.cancel = function() {
    lastCallTimer && clearTimeout(lastCallTimer);
    startTime = void 0;
    lastCallTimer = void 0;
  };

  return trigger;
}
