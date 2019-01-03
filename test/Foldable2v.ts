import * as assert from 'assert'
import { array } from '../src/Array'
import { fieldNumber } from '../src/Field'
import {
  member,
  findFirst,
  fold,
  foldM,
  getFoldableComposition,
  intercalate,
  max,
  min,
  oneOf,
  product,
  sequence_,
  sum,
  toArray,
  traverse_
} from '../src/Foldable2v'
import { IO, io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as option from '../src/Option'
import { ordNumber } from '../src/Ord'
import { setoidNumber } from '../src/Setoid'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable2v', () => {
  it('toArray', () => {
    assert.deepEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
  })

  it('getFoldableComposition', () => {
    const F = getFoldableComposition(array, option.option)
    // reduce
    assert.strictEqual(F.reduce([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat), 'abc')
    assert.strictEqual(F.reduce([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.strictEqual(F.reduce([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.strictEqual(F.reduce([], '', monoidString.concat), '')
    // foldMap
    assert.strictEqual(F.foldMap(monoidString)([option.some('a'), option.some('b'), option.some('c')], a => a), 'abc')
    assert.strictEqual(F.foldMap(monoidString)([option.none, option.some('b'), option.none], a => a), 'b')
    assert.strictEqual(F.foldMap(monoidString)([option.none, option.none, option.none], a => a), '')
    assert.strictEqual(F.foldMap(monoidString)([], (a: string) => a), '')
    // foldr
    assert.strictEqual(F.foldr([option.some('a'), option.some('b'), option.some('c')], '', monoidString.concat), 'abc')
    assert.strictEqual(F.foldr([option.none, option.some('b'), option.none], '', monoidString.concat), 'b')
    assert.strictEqual(F.foldr([option.none, option.none, option.none], '', monoidString.concat), '')
    assert.strictEqual(F.foldr([], '', monoidString.concat), '')
  })

  it('intercalate', () => {
    assert.strictEqual(intercalate(monoidString, array)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('traverse_', () => {
    let log = ''
    const append = (s: String) => new IO(() => (log += s))
    traverse_(io, array)(['a', 'b', 'c'], append).run()
    assert.strictEqual(log, 'abc')
  })

  it('sequence_', () => {
    let log = ''
    const append = (s: String) => new IO(() => (log += s))
    sequence_(io, array)([append('a'), append('b'), append('c')]).run()
    assert.strictEqual(log, 'abc')
  })

  it('min', () => {
    assert.deepEqual(min(ordNumber, array)([]), option.none)
    assert.deepEqual(min(ordNumber, array)([1, 2, 3, 4, 5]), option.some(1))
  })

  it('max', () => {
    assert.deepEqual(max(ordNumber, array)([]), option.none)
    assert.deepEqual(max(ordNumber, array)([1, 2, 3, 4, 5]), option.some(5))
  })

  it('sum', () => {
    assert.strictEqual(sum(fieldNumber, array)([1, 2, 3, 4, 5]), 15)
  })

  it('product', () => {
    assert.strictEqual(product(fieldNumber, array)([1, 2, 3, 4, 5]), 120)
  })

  it('foldM', () => {
    assert.deepEqual(foldM(option.option, array)([], 1, () => option.none), option.some(1))
    assert.deepEqual(foldM(option.option, array)([2], 1, () => option.none), option.none)
    assert.deepEqual(foldM(option.option, array)([2], 1, (b, a) => option.some(b + a)), option.some(3))
  })

  it('oneOf', () => {
    assert.deepEqual(oneOf(option.option, array)([]), option.none)
    assert.deepEqual(oneOf(option.option, array)([option.none]), option.none)
    assert.deepEqual(oneOf(option.option, array)([option.none, option.some(1)]), option.some(1))
    assert.deepEqual(oneOf(option.option, array)([option.some(2), option.some(1)]), option.some(2))
  })

  it('member', () => {
    assert.strictEqual(member(setoidNumber, array)(1, [1, 2, 3]), true)
    assert.strictEqual(member(setoidNumber, array)(4, [1, 2, 3]), false)
  })

  it('findFirst', () => {
    assert.deepEqual(findFirst(array)([1, 2, 3], a => a > 4), option.none)
    assert.deepEqual(findFirst(array)([1, 2, 3, 5], a => a > 4), option.some(5))
  })

  it('fold', () => {
    assert.deepEqual(fold(monoidString, array)(['a', 'b', 'c']), 'abc')
  })
})
