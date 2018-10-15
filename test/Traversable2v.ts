import * as assert from 'assert'
import { Applicative } from '../src/Applicative'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition } from '../src/Traversable2v'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable2v', () => {
  it('getTraversableComposition', () => {
    const o: Applicative<'Option'> = option as any
    const arrayOptionTraversable = getTraversableComposition(array, option)
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepEqual(
      arrayOptionTraversable.traverse(o)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      none
    )
    assert.deepEqual(arrayOptionTraversable.sequence(o)([some(some(1)), some(some(2))]), some([some(1), some(2)]))
    assert.deepEqual(arrayOptionTraversable.sequence(o)([some(some(1)), none]), some([some(1), none]))
    assert.deepEqual(arrayOptionTraversable.sequence(o)([some(some(1)), some(none)]), none)
  })
})
