import * as _ from '../src/Foldable'
import { identity, pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as T from '../src/Tree'
import { deepStrictEqual } from './util'

describe('Foldable', () => {
  it('intercalate', () => {
    const intercalate = _.intercalate(RA.Foldable)(monoidString)
    deepStrictEqual(pipe(['a', 'b', 'c'], intercalate(',')), 'a,b,c')
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
    const f = _.reduceM(RA.Foldable)(O.Monad)
    deepStrictEqual(
      pipe(
        [],
        f(1, () => O.none)
      ),
      O.some(1)
    )
    deepStrictEqual(
      pipe(
        [2],
        f(1, () => O.none)
      ),
      O.none
    )
    deepStrictEqual(
      pipe(
        [2],
        f(1, (b, a) => O.some(b + a))
      ),
      O.some(3)
    )
  })

  it('reduce', () => {
    const reduce = _.reduce(RA.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduce('c', (b, a) => b + a)
      ),
      'cab'
    )
  })

  it('foldMap', () => {
    const foldMap = _.foldMap(RA.Foldable, O.Foldable)
    deepStrictEqual(pipe([O.some('a'), O.none, O.some('b')], foldMap(monoidString)(identity)), 'ab')
  })

  it('reduceRight', () => {
    const reduceRight = _.reduceRight(RA.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduceRight('c', (b, a) => b + a)
      ),
      'abc'
    )
  })
})
