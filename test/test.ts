import { describe, it, expect } from "vitest";
import u from '../source';

describe('test utility-is', () => {
  it('should be a string', () => {
    expect(u.isString('yellowryan')).toBe(true)
  })

  it('should be a thenable', () => {
    expect(u.isPromise({then: () => {
      return Promise.resolve(1);
    }})).toBe(true)
  })

  it('should be a primitive', () => {
    expect(u.isPrimitive(null)).toBe(true);
  })

  it('should be a class', () => {
    expect(u.isClass(class Foo{})).toBe(true);
  })

  it('should be a plain object', () => {
    expect(u.isPlainObject(new Object({}))).toBe(true);
    expect(u.isPlainObject(Object.create(null))).toBe(true);
  })
})

describe('u.isIterable', () => {
  it('should have [Symbol.iterator] by default', () => {
    expect(u.isIterable([1,2,3])).toBe(true);
    expect(u.isIterable(new Set(['a', ]))).toBe(true);
  })

  it('should not have [Symbol.iterator] by default', () => {
    expect(u.isIterable({foo: 'bar'})).not.toBe(true);
    expect(u.isIterable(Object.create(null))).toBe(false);
  })

})
