import * as _ from '../src/Foldable'
import { pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as A from '../src/ReadonlyArray'
import * as T from '../src/Tree'
import { deepStrictEqual } from './util'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('intercalate', () => {
    deepStrictEqual(pipe(['a', 'b', 'c'], _.intercalate(monoidString, A.Foldable)(',')), 'a,b,c')
  })

  it('toReadonlyArray', () => {
    // Option
    deepStrictEqual(_.toReadonlyArray(O.Foldable)(O.some(1)), [1])
    deepStrictEqual(_.toReadonlyArray(O.Foldable)(O.none), [])

    // Tree
    deepStrictEqual(_.toReadonlyArray(T.Foldable)(T.make(1, [T.make(2, []), T.make(3, []), T.make(4, [])])), [
      1,
      2,
      3,
      4
    ])
  })

  it('reduceM', () => {
    deepStrictEqual(
      pipe(
        [],
        _.reduceM(O.Monad, A.Foldable)(1, () => O.none)
      ),
      O.some(1)
    )
    deepStrictEqual(
      pipe(
        [2],
        _.reduceM(O.Monad, A.Foldable)(1, () => O.none)
      ),
      O.none
    )
    deepStrictEqual(
      pipe(
        [2],
        _.reduceM(O.Monad, A.Foldable)(1, (b, a) => O.some(b + a))
      ),
      O.some(3)
    )
  })
})
