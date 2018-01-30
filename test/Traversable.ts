import * as assert from 'assert'
import { getTraversableComposition } from '../src/Traversable'
import * as array from '../src/Array'
import * as option from '../src/Option'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const arrayOptionTraversable = getTraversableComposition(array, option.option)
    assert.deepEqual(
      arrayOptionTraversable.traverse(option.option)(
        [option.some(1), option.some(2)],
        (n: number) => (n <= 2 ? option.some(n * 2) : option.none)
      ),
      option.some([option.some(2), option.some(4)])
    )
    assert.deepEqual(
      arrayOptionTraversable.traverse(option.option)(
        [option.some(1), option.some(3)],
        (n: number) => (n <= 2 ? option.some(n * 2) : option.none)
      ),
      option.none
    )
  })
})
