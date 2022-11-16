import { describe, test, expect } from 'vitest';
import {
  myNew,
  myApply,
  myCall,
  myBind,
  instanceOf,
  myPromise,
  filter,
} from '../src/interview.mjs';

// 构造函数
function Person(name, age) {
  this.name = name;
  this.age = age;
}
Person.prototype.getName = function() {
  return this.name;
};

// 普通函数
function PersonFunction(name, age) {
  return {
    name,
    age,
    getName: () => name,
  };
}

const person = new Person('李四', 15);

describe('interview.mjs', () => {
  test('手写 new 关键字', () => {
    const p1 = myNew(Person, '张三', 28);
    const p2 = myNew(PersonFunction, '张三', 28);

    expect(() => myNew(undefined)).toThrowError('undefined is not a constructor');
    expect(p1.name).toBe('张三');
    expect(p1.age).toBe(28);
    expect(p1.getName()).toBe('张三');
    expect(p2.name).toBe('张三');
    expect(p2.age).toBe(28);
    expect(p2.getName()).toBe('张三');
  });

  test('手写 call/apply 函数', () => {
    const orig = { name: 'a', say(s1, s2) { return `${this.name} ${s1} ${s2}`; } };
    const obj = { name: 'b' };

    expect(() => myCall(undefined)).toThrowError('undefined is not a function');
    expect(myCall(orig.say, undefined, 'hello', 'world')).toBe('undefined hello world');
    expect(myCall(orig.say, null, 'hello', 'world')).toBe('undefined hello world');
    expect(myCall(orig.say, obj, 'hello', 'world')).toBe('b hello world');
    expect(myApply(orig.say, obj, ['hello', 'world'])).toBe('b hello world');
  });

  test('手写 bind 函数', () => {
    const orig = { name: 'a' };
    function say(s1, s2) { return `${this.name} ${s1} ${s2}`; }
    const say1 = myBind(say, orig, 'hello');

    expect(say1('world')).toBe('a hello world');
  });

  test('手写 instanceOf 关键字', () => {
    expect(instanceOf(new Date(), Object)).toBe(true);
    expect(instanceOf(person, Person)).toBe(true);
    expect(instanceOf({}, Function)).toBe(false);
  });

  test('手写 Promise 对象', () => {
    // const p1 = new myPromise((resolve, reject) => {

    // });
  });

  test('不新建数组排除奇数', () => {
    const arr = [1,2,3,3,4,4,5,5];
    const newArr = filter(arr);
    expect(newArr).toBe(arr);
    expect(newArr).toStrictEqual([2,4,4]);
  });
});
