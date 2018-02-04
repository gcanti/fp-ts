import * as assert from 'assert'
import {
  some,
  member,
  union,
  intersection,
  filter,
  toArray,
  difference,
  every,
  subset,
  getSetoid,
  getUnionMonoid,
  getIntersectionSemigroup,
  reduce,
  singleton,
  insert,
  remove
} from '../src/Set'
import { setoidNumber } from '../src/Setoid'
import { ordNumber } from '../src/Ord'

const gte2 = (n: number) => n >= 2

describe('Set', () => {
  it('toArray', () => {
    assert.deepEqual(toArray(ordNumber)(new Set()), [])
    assert.deepEqual(toArray(ordNumber)(new Set([1, 2, 3])), [1, 2, 3])
    assert.deepEqual(toArray(ordNumber)(new Set([3, 2, 1])), [1, 2, 3])
  })

  it('getSetoid', () => {
    const S = getSetoid(setoidNumber)
    assert.strictEqual(S.equals(new Set([1, 2, 3]), new Set([1, 2, 3])), true)
    assert.strictEqual(S.equals(new Set([1, 2, 3]), new Set([1, 2])), false)
    assert.strictEqual(S.equals(new Set([1, 2]), new Set([1, 2, 3])), false)
  })

  it('some', () => {
    assert.strictEqual(some(new Set(), (s: string) => s.trim() === ''), false)
    assert.strictEqual(some(new Set([1, 2, 3]), gte2), true)
    assert.strictEqual(some(new Set([1]), gte2), false)
  })

  it('every', () => {
    assert.strictEqual(every(new Set([1, 2, 3]), gte2), false)
    assert.strictEqual(every(new Set([2, 3]), gte2), true)
  })

  it('subset', () => {
    assert.strictEqual(subset(setoidNumber)(new Set([1, 2]), new Set([1, 2, 3])), true)
    assert.strictEqual(subset(setoidNumber)(new Set([1, 2, 4]), new Set([1, 2, 3])), false)
  })

  it('filter', () => {
    assert.deepEqual(filter(new Set([1, 2, 3]), gte2), new Set([2, 3]))
  })

  it('member', () => {
    assert.strictEqual(member(setoidNumber)(new Set([1, 2, 3]))(1), true)
    assert.strictEqual(member(setoidNumber)(new Set([1, 2, 3]))(4), false)
    assert.strictEqual(member(setoidNumber)(new Set<number>([]))(4), false)
  })

  it('union', () => {
    assert.deepEqual(union(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
  })

  it('intersection', () => {
    assert.deepEqual(intersection(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([1]))
  })

  it('getUnionMonoid', () => {
    const M = getUnionMonoid(setoidNumber)
    assert.deepEqual(M.concat(new Set([1, 2]), new Set([1, 3])), new Set([1, 2, 3]))
    assert.deepEqual(M.concat(new Set([1, 2]), M.empty), new Set([1, 2]))
    assert.deepEqual(M.concat(M.empty, new Set([1, 3])), new Set([1, 3]))
  })

  it('getIntersectionSemigroup', () => {
    const S = getIntersectionSemigroup(setoidNumber)
    assert.deepEqual(S.concat(new Set([1, 2]), new Set([1, 3])), new Set([1]))
  })

  it('difference', () => {
    assert.deepEqual(difference(setoidNumber)(new Set([1, 2]), new Set([1, 3])), new Set([3]))
  })

  it('reduce', () => {
    assert.deepEqual(reduce(ordNumber)(new Set([1, 2, 3]), '', (b, a) => b + a), '123')
    assert.deepEqual(reduce(ordNumber)(new Set([3, 2, 1]), '', (b, a) => b + a), '123')
  })

  it('singleton', () => {
    assert.deepEqual(singleton(1), new Set([1]))
  })

  it('insert', () => {
    assert.deepEqual(insert(setoidNumber)(3)(new Set([1, 2])), new Set([1, 2, 3]))
  })

  it('remove', () => {
    assert.deepEqual(remove(setoidNumber)(3)(new Set([1, 2])), new Set([1, 2]))
    assert.deepEqual(remove(setoidNumber)(1)(new Set([1, 2])), new Set([2]))
  })
})
