import * as assert from 'assert'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition } from '../src/Traversable2v'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable2v', () => {
  it('getTraversableComposition', () => {
    const T = getTraversableComposition(array, option)
    assert.deepEqual(
      T.traverse(option)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepEqual(T.traverse(option)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)), none)
    assert.deepEqual(T.sequence(option)([some(some(1)), some(some(2))]), some([some(1), some(2)]))
    assert.deepEqual(T.sequence(option)([some(some(1)), none]), some([some(1), none]))
    assert.deepEqual(T.sequence(option)([some(some(1)), some(none)]), none)
  })
})
