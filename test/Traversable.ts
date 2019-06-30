import * as assert from 'assert'
import { array } from '../src/Array'
import { none, option, some } from '../src/Option'
import { getTraversableComposition } from '../src/Traversable'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const T = getTraversableComposition(array, option)
    assert.deepStrictEqual(
      T.traverse(option)([some(1), some(2)], (n: number) => (n <= 2 ? some(n * 2) : none)),
      some([some(2), some(4)])
    )
    assert.deepStrictEqual(T.traverse(option)([some(1), some(3)], (n: number) => (n <= 2 ? some(n * 2) : none)), none)
    assert.deepStrictEqual(T.sequence(option)([some(some(1)), some(some(2))]), some([some(1), some(2)]))
    assert.deepStrictEqual(T.sequence(option)([some(some(1)), none]), some([some(1), none]))
    assert.deepStrictEqual(T.sequence(option)([some(some(1)), some(none)]), none)
  })
})
