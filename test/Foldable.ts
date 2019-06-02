import * as assert from 'assert'
import { array } from '../src/Array'
import { fieldNumber } from '../src/Field'
import {
  elem,
  find,
  fold,
  foldM,
  foldMap,
  foldr,
  getFoldableComposition,
  intercalate,
  maximum,
  minimum,
  oneOf,
  product,
  sequence_,
  sum,
  toArray,
  traverse_,
  traverse
} from '../src/Foldable'
import { IO, io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as option from '../src/Option'
import { ordNumber } from '../src/Ord'
import { eqNumber } from '../src/Eq'
import { StrMap, strmap } from '../src/StrMap'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('toArray', () => {
    assert.deepStrictEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
    assert.deepStrictEqual(toArray(option.option)(option.some(1)), [1])
    assert.deepStrictEqual(toArray(option.option)(option.none), [])
    assert.deepStrictEqual(toArray(strmap)(new StrMap({ a: 1, b: 2 })), [1, 2])
  })

  it('foldMap', () => {
    assert.deepStrictEqual(foldMap(array, monoidString)(['a', 'b', 'c'], s => s), 'abc')
  })

  it('getFoldableComposition', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option.option)
    const sum = (b: number, a: number): number => b + a
    assert.strictEqual(arrayOptionFoldable.reduce([option.some(1), option.some(2)], 0, sum), 3)
    assert.strictEqual(arrayOptionFoldable.reduce([option.none, option.some(2)], 0, sum), 2)
  })

  it('intercalate', () => {
    assert.strictEqual(intercalate(array, monoidString)(',')(['a', 'b', 'c']), 'a,b,c')
  })

  it('traverse_', () => {
    let counter = ''
    const x = traverse_(io, array)(a => new IO(() => (counter += a)), ['a', 'b', 'c'])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('sequence_', () => {
    let counter = ''
    const x = sequence_(io, array)([
      new IO(() => (counter += 'a')),
      new IO(() => (counter += 'b')),
      new IO(() => (counter += 'c'))
    ])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('minimum', () => {
    assert.deepStrictEqual(minimum(array, ordNumber)([]), option.none)
    assert.deepStrictEqual(minimum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(1))
  })

  it('maximum', () => {
    assert.deepStrictEqual(maximum(array, ordNumber)([]), option.none)
    assert.deepStrictEqual(maximum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(5))
  })

  it('sum', () => {
    assert.strictEqual(sum(array, fieldNumber)([1, 2, 3, 4, 5]), 15)
  })

  it('product', () => {
    assert.strictEqual(product(array, fieldNumber)([1, 2, 3, 4, 5]), 120)
  })

  it('foldM', () => {
    assert.deepStrictEqual(foldM(array, option.option)(() => option.none, 1, []), option.some(1))
    assert.deepStrictEqual(foldM(array, option.option)(() => option.none, 1, [2]), option.none)
    assert.deepStrictEqual(foldM(array, option.option)((b, a) => option.some(b + a), 1, [2]), option.some(3))
  })

  it('oneOf', () => {
    assert.deepStrictEqual(oneOf(array, option.option)([]), option.none)
    assert.deepStrictEqual(oneOf(array, option.option)([option.none]), option.none)
    assert.deepStrictEqual(oneOf(array, option.option)([option.none, option.some(1)]), option.some(1))
    assert.deepStrictEqual(oneOf(array, option.option)([option.some(2), option.some(1)]), option.some(2))
  })

  it('elem', () => {
    assert.strictEqual(elem(array, eqNumber)(1, [1, 2, 3]), true)
    assert.strictEqual(elem(array, eqNumber)(4, [1, 2, 3]), false)
  })

  it('find', () => {
    assert.deepStrictEqual(find(array)([1, 2, 3], a => a > 4), option.none)
    assert.deepStrictEqual(find(array)([1, 2, 3, 5], a => a > 4), option.some(5))
  })

  it('fold', () => {
    assert.deepStrictEqual(fold(array, monoidString)(['a', 'b', 'c']), 'abc')
  })

  it('foldr', () => {
    assert.deepStrictEqual(foldr(array)(['a', 'b', 'c'], '', (a, acc) => acc + a), 'cba')
  })

  it('traverse', () => {
    let counter = ''
    const x = traverse(io, array)(['a', 'b', 'c'], a => new IO(() => (counter += a)))
    x.run()
    assert.strictEqual(counter, 'abc')
  })
})
