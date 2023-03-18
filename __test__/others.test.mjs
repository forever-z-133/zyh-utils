import { describe, test, expect } from 'vitest';
import { fileSize } from '../src/others.mjs';

describe('others.mjs', () => {
  test('转为内存值字符串', () => {
    expect(fileSize()).toBe('0.00KB');
    expect(fileSize(1)).toBe('0.00KB');
    expect(fileSize(1024)).toBe('1.00KB');
    expect(fileSize(1025)).toBe('1.00KB');
    expect(fileSize(1024*1024)).toBe('1.00M');
    expect(fileSize(1024*1024+1)).toBe('1.00M');
    expect(fileSize(1024*1024*1024-1)).toBe('1024.00M');
    expect(fileSize(1024*1024*1024)).toBe('1.00G');
  });
});
