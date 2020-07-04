import * as assert from 'assert'
import * as A from '../src/ReadonlyArray'
import * as O from '../src/Option'
import { getTraversableComposition } from '../src/Traversable'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const T = getTraversableComposition(A.Traversable, O.Traversable)
    assert.deepStrictEqual(
      T.traverse(O.Applicative)([O.some(1), O.some(2)], (n: number) => (n <= 2 ? O.some(n * 2) : O.none)),
      O.some([O.some(2), O.some(4)])
    )
    assert.deepStrictEqual(
      T.traverse(O.Applicative)([O.some(1), O.some(3)], (n: number) => (n <= 2 ? O.some(n * 2) : O.none)),
      O.none
    )
    assert.deepStrictEqual(
      T.sequence(O.Applicative)([O.some(O.some(1)), O.some(O.some(2))]),
      O.some([O.some(1), O.some(2)])
    )
    assert.deepStrictEqual(T.sequence(O.Applicative)([O.some(O.some(1)), O.none]), O.some([O.some(1), O.none]))
    assert.deepStrictEqual(T.sequence(O.Applicative)([O.some(O.some(1)), O.some(O.none)]), O.none)
  })
})
