import * as assert from 'assert'
import {
  toArray,
  foldMap,
  getCompositionStaticFoldable,
  intercalate,
  traverse_,
  sequence_
} from '../src/Foldable'
import * as array from '../src/Array'
import * as option from '../src/Option'
import * as io from '../src/IO'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

declare module '../src/HKT' {
  interface HKT<A> {
    ArrayOption: Array<option.Option<A>>
  }
}

describe('Foldable', () => {

  it('toArray', () => {
    assert.deepEqual(toArray(array)([1, 2, 3]), [1, 2, 3])
  })

  it('foldMap', () => {
    assert.deepEqual(foldMap(array, monoidString)(identity, ['a', 'b', 'c']), 'abc')
  })

  it('getStaticFoldableComposition', () => {
    const arrayOptionFoldable = getCompositionStaticFoldable(ArrayOptionURI, array, option)
    assert.strictEqual(arrayOptionFoldable.reduce((b, a) => b + a, 0, [option.some(1), option.some(2)]), 3)
    assert.strictEqual(arrayOptionFoldable.reduce((b, a) => b + a, 0, [option.none, option.some(2)]), 2)
  })

  it('intercalate', () => {
    const join = intercalate(getCompositionStaticFoldable('ArrayOption', array, option), monoidString)
    assert.strictEqual(join(' ', []), '')
    assert.strictEqual(join(' ', [option.some('a')]), 'a')
    assert.strictEqual(join(' ', [
      option.some('a'),
      option.none,
      option.some('b')
    ]), 'a b')
  })

  it('traverse_', () => {
    let counter = ''
    const x = traverse_(io, array)(a => new io.IO(() => counter += a), ['a', 'b', 'c'])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

  it('sequence_', () => {
    let counter = ''
    const x = sequence_(io, array)([
      new io.IO(() => counter += 'a'),
      new io.IO(() => counter += 'b'),
      new io.IO(() => counter += 'c')
    ])
    x.run()
    assert.strictEqual(counter, 'abc')
  })

})
