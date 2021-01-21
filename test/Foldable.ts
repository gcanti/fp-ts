import * as _ from '../src/Foldable'
import { identity, pipe } from '../src/function'
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

  it('reduce_', () => {
    const reduce = _.reduce_(A.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduce('c', (b, a) => b + a)
      ),
      'cab'
    )
  })

  it('foldMap_', () => {
    const foldMap = _.foldMap_(A.Foldable, O.Foldable)
    deepStrictEqual(pipe([O.some('a'), O.none, O.some('b')], foldMap(monoidString)(identity)), 'ab')
  })

  it('reduceRight_', () => {
    const reduceRight = _.reduceRight_(A.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduceRight('c', (b, a) => b + a)
      ),
      'abc'
    )
  })
})
