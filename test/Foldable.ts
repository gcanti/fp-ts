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
  length,
  maximum,
  minimum,
  oneOf,
  product,
  sequence_,
  sum,
  toArray,
  traverse_
} from '../src/Foldable'
import { IO, io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import { ordNumber } from '../src/Ord'
import { setoidNumber } from '../src/Setoid'
import { option, none, some } from '../src/Option'
import { either, left, right } from '../src/Either'
import { failure, success, validation } from '../src/Validation'
import { NonEmptyArray, nonEmptyArray } from '../src/NonEmptyArray'
import { Identity, identity } from '../src/Identity'
import { Pair, pair } from '../src/Pair'
import { StrMap, strmap } from '../src/StrMap'
import { Both, That, these, This } from '../src/These'
import { Tree, tree } from '../src/Tree'
import { Tuple, tuple } from '../src/Tuple'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('toArray', () => {
    assert.deepEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
  })

  it('foldMap', () => {
    assert.deepEqual(foldMap(array, monoidString)(['a', 'b', 'c'], s => s), 'abc')
  })

  it('getFoldableComposition', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option)
    const sum = (b: number, a: number): number => b + a
    assert.strictEqual(arrayOptionFoldable.reduce([some(1), some(2)], 0, sum), 3)
    assert.strictEqual(arrayOptionFoldable.reduce([none, some(2)], 0, sum), 2)
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
    assert.deepEqual(minimum(array, ordNumber)([]), none)
    assert.deepEqual(minimum(array, ordNumber)([1, 2, 3, 4, 5]), some(1))
  })

  it('maximum', () => {
    assert.deepEqual(maximum(array, ordNumber)([]), none)
    assert.deepEqual(maximum(array, ordNumber)([1, 2, 3, 4, 5]), some(5))
  })

  it('sum', () => {
    assert.strictEqual(sum(array, fieldNumber)([1, 2, 3, 4, 5]), 15)
  })

  it('product', () => {
    assert.strictEqual(product(array, fieldNumber)([1, 2, 3, 4, 5]), 120)
  })

  it('foldM', () => {
    assert.deepEqual(foldM(array, option)((b, a) => none, 1, []), some(1))
    assert.deepEqual(foldM(array, option)((b, a) => none, 1, [2]), none)
    assert.deepEqual(foldM(array, option)((b, a) => some(b + a), 1, [2]), some(3))
  })

  it('oneOf', () => {
    assert.deepEqual(oneOf(array, option)([]), none)
    assert.deepEqual(oneOf(array, option)([none]), none)
    assert.deepEqual(oneOf(array, option)([none, some(1)]), some(1))
    assert.deepEqual(oneOf(array, option)([some(2), some(1)]), some(2))
  })

  it('elem', () => {
    assert.strictEqual(elem(array, setoidNumber)(1, [1, 2, 3]), true)
    assert.strictEqual(elem(array, setoidNumber)(4, [1, 2, 3]), false)
  })

  it('find', () => {
    assert.deepEqual(find(array)([1, 2, 3], a => a > 4), none)
    assert.deepEqual(find(array)([1, 2, 3, 5], a => a > 4), some(5))
  })

  it('fold', () => {
    assert.deepEqual(fold(array, monoidString)(['a', 'b', 'c']), 'abc')
  })

  it('foldr', () => {
    assert.deepEqual(foldr(array)(['a', 'b', 'c'], '', (a, acc) => acc + a), 'cba')
  })

  it('length', () => {
    assert.deepEqual(length(array)([]), 0)
    assert.deepEqual(length(array)([1]), 1)
    assert.deepEqual(length(option)(none), 0)
    assert.deepEqual(length(option)(some(1)), 1)
    assert.deepEqual(length(either)(left(1)), 0)
    assert.deepEqual(length(either)(right(1)), 1)
    assert.deepEqual(length(validation)(failure(1)), 0)
    assert.deepEqual(length(validation)(success(1)), 1)
    assert.deepEqual(length(nonEmptyArray)(new NonEmptyArray(1, [])), 1)
    assert.deepEqual(length(identity)(new Identity(1)), 1)
    assert.deepEqual(length(pair)(new Pair(1, 2)), 2)
    assert.deepEqual(length(strmap)(new StrMap({})), 0)
    assert.deepEqual(length(strmap)(new StrMap({ a: 1 })), 1)
    assert.deepEqual(length(these)(new This(1)), 0)
    assert.deepEqual(length(these)(new That(1)), 1)
    assert.deepEqual(length(these)(new Both(1, 2)), 1)
    assert.deepEqual(length(tree)(new Tree(1, [])), 1)
    assert.deepEqual(length(tree)(new Tree(1, [new Tree(1, [])])), 2)
    assert.deepEqual(length(tree)(new Tree(1, [new Tree(1, []), new Tree(1, [])])), 3)
    assert.deepEqual(length(tree)(new Tree(1, [new Tree(1, [new Tree(1, [])]), new Tree(1, [new Tree(1, [])])])), 5)
    assert.deepEqual(length(tuple)(new Tuple(1, 2)), 1)
  })
})
