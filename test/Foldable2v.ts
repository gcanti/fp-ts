import * as assert from 'assert'
import { array } from '../src/Array'
import { fieldNumber } from '../src/Field'
import {
  elem,
  find,
  fold,
  foldM,
  getFoldableComposition,
  intercalate,
  maximum,
  minimum,
  oneOf,
  product,
  sequence,
  sum,
  toArray,
  traverse
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
    assert.strictEqual(intercalate(array, monoidString)(',')(['a', 'b', 'c']), 'a,b,c')
  })

  it('traverse', () => {
    let counter = ''
    const x = traverse(io, array)(['a', 'b', 'c'], a => new IO(() => (counter += a)))
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('sequence', () => {
    let counter = ''
    const x = sequence(io, array)([
      new IO(() => (counter += 'a')),
      new IO(() => (counter += 'b')),
      new IO(() => (counter += 'c'))
    ])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('minimum', () => {
    assert.deepEqual(minimum(array, ordNumber)([]), option.none)
    assert.deepEqual(minimum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(1))
  })

  it('maximum', () => {
    assert.deepEqual(maximum(array, ordNumber)([]), option.none)
    assert.deepEqual(maximum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(5))
  })

  it('sum', () => {
    assert.strictEqual(sum(array, fieldNumber)([1, 2, 3, 4, 5]), 15)
  })

  it('product', () => {
    assert.strictEqual(product(array, fieldNumber)([1, 2, 3, 4, 5]), 120)
  })

  it('foldM', () => {
    assert.deepEqual(foldM(array, option.option)([], 1, (b, a) => option.none), option.some(1))
    assert.deepEqual(foldM(array, option.option)([2], 1, (b, a) => option.none), option.none)
    assert.deepEqual(foldM(array, option.option)([2], 1, (b, a) => option.some(b + a)), option.some(3))
  })

  it('oneOf', () => {
    assert.deepEqual(oneOf(array, option.option)([]), option.none)
    assert.deepEqual(oneOf(array, option.option)([option.none]), option.none)
    assert.deepEqual(oneOf(array, option.option)([option.none, option.some(1)]), option.some(1))
    assert.deepEqual(oneOf(array, option.option)([option.some(2), option.some(1)]), option.some(2))
  })

  it('elem', () => {
    assert.strictEqual(elem(array, setoidNumber)(1, [1, 2, 3]), true)
    assert.strictEqual(elem(array, setoidNumber)(4, [1, 2, 3]), false)
  })

  it('find', () => {
    assert.deepEqual(find(array)([1, 2, 3], a => a > 4), option.none)
    assert.deepEqual(find(array)([1, 2, 3, 5], a => a > 4), option.some(5))
  })

  it('fold', () => {
    assert.deepEqual(fold(array, monoidString)(['a', 'b', 'c']), 'abc')
  })
})
