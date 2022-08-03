import { describe, test, expect } from 'vitest';
import {
  divideArray,
  stringToObject,
  objectToString,
  addDataToUrl,
  jsonToObject,
} from '../src/data.mjs';


describe('data.mjs', () => {
  test('divideArray', () => {
    const array = [1, 2, 3, 4, 5];
    const result1 = [1, 2];
    const result2 = [3, 4, 5];
    const forEachCallback = item => item < 3;
    const [r1, r2] = divideArray(array, forEachCallback);
    expect(divideArray(array)).toStrictEqual([[], []]);
    expect(r1).toStrictEqual(result1);
    expect(r2).toStrictEqual(result2);
  });

  test('stringToObject', () => {
    expect(stringToObject('')).toStrictEqual({});
    expect(stringToObject('a=1')).toStrictEqual({a:'1'});
    expect(stringToObject('a=1&b=2')).toStrictEqual({a:'1',b:'2'});
    expect(stringToObject('a=&b=2')).toStrictEqual({a:'',b:'2'});
    expect(stringToObject('a=undefined&b=2')).toStrictEqual({a:undefined,b:'2'});
    expect(stringToObject('a=null&b=2')).toStrictEqual({a:undefined,b:'2'});
    expect(stringToObject('a=true&b=2')).toStrictEqual({a:true,b:'2'});
    expect(stringToObject('a=false&b=2')).toStrictEqual({a:false,b:'2'});
    expect(stringToObject('a:1;b:2',';',':')).toStrictEqual({a:'1',b:'2'});
    expect(stringToObject('a=1=1&b=2')).toStrictEqual({a:'1=1',b:'2'});
    expect(stringToObject('&b=2')).toStrictEqual({b:'2'});
    expect(stringToObject('=1&b=2')).toStrictEqual({b:'2'});
  });

  test('objectToString', () => {
    expect(objectToString()).toStrictEqual('');
    expect(objectToString({})).toStrictEqual('');
    expect(objectToString({a:1})).toStrictEqual('a=1');
    expect(objectToString({a:1,b:2})).toStrictEqual('a=1&b=2');
    expect(objectToString({a:null,b:true})).toStrictEqual('a=null&b=true');
  });

  test('addDataToUrl', () => {
    expect(addDataToUrl('index.html')).toStrictEqual('index.html');
    expect(addDataToUrl('index.html?')).toStrictEqual('index.html');
    expect(addDataToUrl('index.html#')).toStrictEqual('index.html');
    expect(addDataToUrl('index.html', 'a=1')).toStrictEqual('index.html?a=1');
    expect(addDataToUrl('index.html', { a: 1 })).toStrictEqual('index.html?a=1');
    expect(addDataToUrl('index.html?x=0', 'a=1')).toStrictEqual('index.html?x=0&a=1');
    expect(addDataToUrl('index.html?x=0', { a: 1 })).toStrictEqual('index.html?x=0&a=1');
    expect(addDataToUrl('index.html', 1000)).toStrictEqual('index.html');
  });

  test('jsonToObject', () => {
    expect(jsonToObject(['a','b'])).toStrictEqual({a:0,b:1});
    expect(jsonToObject([{name:'a'},{name:'b'}], 'name')).toStrictEqual({a:{name:'a'},b:{name:'b'}});
    expect(jsonToObject([{name:'a',value:1},{name:'b',value:2}], 'name', 'value')).toStrictEqual({a:1,b:2});
  });
});

