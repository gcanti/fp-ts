import * as assert from 'assert'
import {
  toArray,
  getFoldableComposition
} from '../src/Foldable'
import * as array from '../src/Array'
import * as option from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

declare module '../src/HKT' {
  interface HKT<A> {
    ArrayOption: Array<option.Option<A>>
  }
}

describe('Foldable', () => {

  it('toArray', () => {
    assert.deepEqual(toArray(array, [1, 2, 3]), [3, 2, 1])
  })

  it('getFoldableComposition', () => {
    const arrayOptionFoldable = getFoldableComposition(ArrayOptionURI)(array, option)
    assert.strictEqual(arrayOptionFoldable.reduce((b, a) => b + a, 0, [option.some(1), option.some(2)]), 3)
    assert.strictEqual(arrayOptionFoldable.reduce((b, a) => b + a, 0, [option.none, option.some(2)]), 2)
  })

})
