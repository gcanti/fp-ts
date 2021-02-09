import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as O from '../src/Option'
import { getTraversableComposition } from '../src/Traversable'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    // tslint:disable-next-line: deprecation
    const T = getTraversableComposition(RA.Traversable, O.Traversable)
    U.deepStrictEqual(
      T.map([O.some(1), O.some(2), O.none], (n) => n * 2),
      [O.some(2), O.some(4), O.none]
    )
    U.deepStrictEqual(
      T.traverse(O.Applicative)([O.some(1), O.some(2)], (n: number) => (n <= 2 ? O.some(n * 2) : O.none)),
      O.some([O.some(2), O.some(4)])
    )
    U.deepStrictEqual(
      T.traverse(O.Applicative)([O.some(1), O.some(3)], (n: number) => (n <= 2 ? O.some(n * 2) : O.none)),
      O.none
    )
    U.deepStrictEqual(T.sequence(O.Applicative)([O.some(O.some(1)), O.some(O.some(2))]), O.some([O.some(1), O.some(2)]))
    U.deepStrictEqual(T.sequence(O.Applicative)([O.some(O.some(1)), O.none]), O.some([O.some(1), O.none]))
    U.deepStrictEqual(T.sequence(O.Applicative)([O.some(O.some(1)), O.some(O.none)]), O.none)
  })
})
