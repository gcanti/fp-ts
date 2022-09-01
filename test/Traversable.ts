import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import * as O from '../src/Option'
import * as _ from '../src/Traversable'
import * as E from '../src/Either'
import { identity, pipe } from '../src/function'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Traversable', () => {
  it('getTraversableComposition', () => {
    const T = _.getTraversableComposition(RA.Traversable, O.Traversable)
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

  it('traverse', () => {
    const traverse = _.traverse(RA.Traversable, RA.Traversable)(E.Applicative)
    U.deepStrictEqual(pipe([[E.right(1)]], traverse(identity)), E.right([[1]]))
  })

  it('sequence', () => {
    const sequence = _.sequence(RA.Traversable, RA.Traversable)(E.Applicative)
    U.deepStrictEqual(pipe([[E.right(1)]], sequence), E.right([[1]]))
  })
})
