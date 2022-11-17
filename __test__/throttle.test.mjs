import { throttle } from '../src/throttle.mjs';
import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';

vi.useFakeTimers();

describe('节流测试', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  // const cb = () => console.log('called');
  const cb = () => {};

  test('health', () => {
    const callback = vi.fn(cb);
    setTimeout(callback, 1e3);
    vi.runAllTimers();
    expect(callback).toBeCalledTimes(1);
  });

  test('基础防抖，频繁触发仅固定周期访问', () => {
    const callback = vi.fn(cb);
    const func = throttle(callback, 100);
    let count = 0;
    // 每隔 29ms 访问，但实际 100ms 触发，290ms 内应实际触发 2 次
    const timer = setInterval(() => {
      if (++count >= 10) clearInterval(timer);
      func();
    }, 29);

    setTimeout(() => {
      expect(callback).toBeCalledTimes(1);
    }, 150);
    vi.runAllTimers();
    expect(callback).toBeCalledTimes(2);
  });

  test('除了基础防抖，开启初始触发', () => {
    const callback = vi.fn(cb);
    const func = throttle(callback, 100, { leading: true });
    let count = 0;
    // 每隔 29ms 访问，但实际 100ms 触发，开启初始触发，290ms 内应实际触发 3 次
    const timer = setInterval(() => {
      if (++count >= 10) clearInterval(timer);
      func();
      if (count === 1) expect(callback).toBeCalledTimes(1);
    }, 29);

    vi.runAllTimers();
    expect(callback).toBeCalledTimes(3);
  });

  test('除了基础防抖，开启结尾触发', () => {
    const callback = vi.fn(cb);
    const func = throttle(callback, 100, { trailing: true });
    let count = 0;
    // 每隔 29ms 访问，但实际 100ms 触发，290ms 内应实际触发 2 次，开启结尾触发，过 100ms 再触发 1 次
    const timer = setInterval(() => {
      if (++count >= 10) clearInterval(timer);
      func();
    }, 29);

    setTimeout(() => {
      expect(callback).toBeCalledTimes(2);
    }, 300);
    vi.runAllTimers();
    expect(callback).toBeCalledTimes(3);
  });

  test('开启初始触发，一段时间后重新来一次', () => {
    const callback = vi.fn(cb);
    const func = throttle(callback, 100, { leading: true });
    let count = 0;
    // 同上，开启初始触发，290ms 内应实际触发 3 次
    const timer = setInterval(() => {
      if (++count >= 10) clearInterval(timer);
      func();
      if (count === 1) expect(callback).toBeCalledTimes(1);
    }, 29);
    // 间隔 500ms 后，重新触发一次
    setTimeout(() => {
      const timer = setInterval(() => {
        if (++count >= 20) clearInterval(timer);
        func();
        if (count === 1) expect(callback).toBeCalledTimes(4);
      }, 29);
    }, 500);

    vi.runAllTimers();
    expect(callback).toBeCalledTimes(6);
  });

  test('在中途时候，取消防抖', () => {
    const callback = vi.fn(cb);
    const func = throttle(callback, 100, { trailing: true });
    let count = 0;
    // 每隔 29ms 访问，但实际 100ms 触发，当 87ms 时取消，则不会有触发
    const timer = setInterval(() => {
      if (++count >= 3) {
        clearInterval(timer);
        func.cancel();
      }
      func();
    }, 29);

    vi.runAllTimers();
    expect(callback).toBeCalledTimes(0);
  });
});
