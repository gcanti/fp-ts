import * as assert from 'assert'
import {
  Foldable,
  toArray,
  foldMap,
  getFoldableComposition,
  intercalate,
  traverse_,
  sequence_,
  minimum,
  maximum,
  sum,
  product,
  foldM,
  oneOf,
  elem,
  find
} from '../src/Foldable'
import * as array from '../src/Array'
import * as option from '../src/Option'
import * as io from '../src/IO'
import { monoidString } from '../src/Monoid'
import { ordNumber } from '../src/Ord'
import { fieldNumber } from '../src/Field'
import { setoidNumber } from '../src/Setoid'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('toArray', () => {
    assert.deepEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
  })

  it('foldMap', () => {
    assert.deepEqual(foldMap(array, monoidString)((s: string) => s)(['a', 'b', 'c']), 'abc')
  })

  it('getFoldableComposition', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option.option)
    const sum = (b: number, a: number): number => b + a
    assert.strictEqual(arrayOptionFoldable.reduce([option.some(1), option.some(2)], 0, sum), 3)
    assert.strictEqual(arrayOptionFoldable.reduce([option.none, option.some(2)], 0, sum), 2)
  })

  it('intercalate', () => {
    const arrayOptionFoldable = getFoldableComposition(array, option.option)
    const URI = 'ArrayOption'
    type URI = typeof URI
    class ArrayOption<A> {
      readonly '-A': A
      readonly '-URI': URI
      constructor(public readonly value: Array<option.Option<A>>) {}
    }
    const arrayOption: Foldable<URI> = {
      URI,
      reduce<A, B>(fa: ArrayOption<A>, b: B, f: (b: B, a: A) => B): B {
        return arrayOptionFoldable.reduce(fa.value, b, f)
      }
    }
    const join = intercalate(arrayOption, monoidString)(' ')
    assert.strictEqual(join(new ArrayOption([])), '')
    assert.strictEqual(join(new ArrayOption([option.some('a')])), 'a')
    assert.strictEqual(join(new ArrayOption([option.some('a'), option.none, option.some('b')])), 'a b')
  })

  it('traverse_', () => {
    let counter = ''
    const x = traverse_(io.io, array)(a => new io.IO(() => (counter += a)), ['a', 'b', 'c'])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('sequence_', () => {
    let counter = ''
    const x = sequence_(io.io, array)([
      new io.IO(() => (counter += 'a')),
      new io.IO(() => (counter += 'b')),
      new io.IO(() => (counter += 'c'))
    ])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('minimum', () => {
    assert.deepEqual(minimum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(1))
  })

  it('maximum', () => {
    assert.deepEqual(maximum(array, ordNumber)([1, 2, 3, 4, 5]), option.some(5))
  })

  it('sum', () => {
    assert.strictEqual(sum(array, fieldNumber)([1, 2, 3, 4, 5]), 15)
  })

  it('product', () => {
    assert.strictEqual(product(array, fieldNumber)([1, 2, 3, 4, 5]), 120)
  })

  it('foldM', () => {
    assert.deepEqual(foldM(array, option.option)((b, a) => option.none, 1, []), option.some(1))
    assert.deepEqual(foldM(array, option.option)((b, a) => option.none, 1, [2]), option.none)
    assert.deepEqual(foldM(array, option.option)((b, a) => option.some(b + a), 1, [2]), option.some(3))
  })

  it('oneOf', () => {
    assert.deepEqual(oneOf(array, option.option)([]), option.none)
    assert.deepEqual(oneOf(array, option.option)([option.none]), option.none)
    assert.deepEqual(oneOf(array, option.option)([option.none, option.some(1)]), option.some(1))
    assert.deepEqual(oneOf(array, option.option)([option.some(2), option.some(1)]), option.some(2))
  })

  it('elem', () => {
    assert.strictEqual(elem(array, setoidNumber)(1)([1, 2, 3]), true)
    assert.strictEqual(elem(array, setoidNumber)(4)([1, 2, 3]), false)
  })

  it('find', () => {
    assert.deepEqual(find(array)((a: number) => a > 4)([1, 2, 3]), option.none)
    assert.deepEqual(find(array)((a: number) => a > 4)([1, 2, 3, 5]), option.some(5))
  })
})
