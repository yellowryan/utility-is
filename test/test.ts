import { describe, it, expect } from "vitest";
import u from '../source/util-is';

describe('test utility-is', () => {
  it('should be a string', () => {
    expect(u.isString('yellowryan')).toBe(true)
  })


  it('should be a thenable', () => {
    expect(u.isPromise({then: () => {
      return Promise.resolve(1);
    }})).toBe(true)
  })
})
