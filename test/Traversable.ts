import * as assert from 'assert'
import { getTraversableComposition } from '../src/Traversable'
import * as array from '../src/Array'
import * as option from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getCompositionTraversable', () => {
    const arrayOptionTraversable = getTraversableComposition(array, option)
    assert.deepEqual(
      arrayOptionTraversable.traverse(option)(n => (n <= 2 ? option.some(n * 2) : option.none), [
        option.some(1),
        option.some(2)
      ]),
      option.some([option.some(2), option.some(4)])
    )
    assert.deepEqual(
      arrayOptionTraversable.traverse(option)(n => (n <= 2 ? option.some(n * 2) : option.none), [
        option.some(1),
        option.some(3)
      ]),
      option.none
    )
  })
})
