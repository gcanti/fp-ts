import * as assert from 'assert'
import { Applicative } from '../src/Applicative'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition, traverse } from '../src/Traversable'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const o: Applicative<'Option'> = option as any // TODO
    const arrayOptionTraversable = getTraversableComposition(array, option)
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      none
    )
  })

  it('traverse', () => {
    assert.deepEqual(traverse(option, array)([1, 2, 3], n => (n > 0 ? some(n) : none)), some([1, 2, 3]))
  })
})
