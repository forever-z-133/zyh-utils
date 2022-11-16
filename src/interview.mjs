/*****************************************
 * 面试手写题集锦
 *****************************************/

// 手写 new 关键字
export function myNew(constructor, ...args) {
  if (typeof constructor !== 'object' && typeof constructor !== 'function') {
    throw new Error(`${constructor} is not a constructor`);
  }

  const obj = Object.create(constructor.prototype);
  const res = constructor.apply(obj, args);

  return typeof res === 'object' ? res : obj;
}

// 手写 call/apply 函数
export function myApply(func, context, args = []) {
  if (typeof func !== 'function') {
    throw new Error(`${func} is not a function`);
  }

  if (context === void 0 || context === null) {
    context = {}; // 依情况可改为 window
  }

  const fnSymbol = Symbol();
  context[fnSymbol] = func;
  const fn = context[fnSymbol](...args);
  delete context[fnSymbol];
  return fn;
}
export function myCall(func, context, ...args) {
  return myApply(func, context, args);
}

// 手写 bind 函数
export function myBind(func, context, ...args) {
  const fn = function(...args2) {
    return myCall(func, context, ...args, ...args2);
  };
  // fn.prototype = Object.create(func.prototype);
  return fn;
}

// 手写 instanceof 关键字
export function instanceOf(left, right) {
  let proto = left.__proto__;
  while (proto !== null) {
    if (proto === right.prototype) return true;
    proto = proto.__proto__;
  }
  return false;
}

// 手写 Promise 对象
export class myPromise {
  status = 'pending'; // pending | fulfilled | rejected
  result = undefined;
  error = undefined;
  onFulfilledCallbacks = [];
  onRejectedCallbacks = [];

  constructor(func) {
    const resolve = result => {
      this.status = 'fulfilled';
      this.result = result;
      this.onFulfilledCallbacks.forEach(callback => callback());
    };
    const reject = error => {
      this.status = 'rejected';
      this.error = error;
      this.onRejectedCallbacks.forEach(callback => callback());
    };

    try {
      func({ resolve, reject });
    } catch(err) {
      reject(err);
    }

    return this;
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v;
    onRejected = typeof onRejected === 'function' ? onRejected : err => err;
    this.onFulfilledCallbacks.push(onFulfilled);
    this.onRejectedCallbacks.push(onRejected);

    return new myPromise((resolve, reject) => {

    });
  }
}

// 不新建数组排除奇数
export function filter(arr) {
  let i = 0;
  let len = arr.length;
  while (i < len) {
    if (arr[i] % 2 == 0) {
      i++;
    } else {
      arr.splice(i, 1);
      len--;
    }
  }
  return arr;
}
