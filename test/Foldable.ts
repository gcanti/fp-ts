import * as _ from '../src/Foldable'
import { identity, pipe } from '../src/f'
import * as S from '../src/string'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as T from '../src/Tree'
import { deepStrictEqual } from './util'

describe('Foldable', () => {
  it('intercalate', () => {
    const intercalate = _.intercalate(RA.Foldable)(S.Monoid)
    deepStrictEqual(pipe(['a', 'b', 'c'], intercalate(',')), 'a,b,c')
  })

  it('toReadonlyArray', () => {
    // Option
    deepStrictEqual(_.toReadonlyArray(O.Foldable)(O.some(1)), [1])
    deepStrictEqual(_.toReadonlyArray(O.Foldable)(O.none), [])

    // Tree
    deepStrictEqual(
      _.toReadonlyArray(T.Foldable)(T.make(1, [T.make(2, []), T.make(3, []), T.make(4, [])])),
      [1, 2, 3, 4]
    )
  })

  it('reduceKind', () => {
    const f = _.reduceKind(RA.Foldable)(O.Flattenable)
    deepStrictEqual(
      pipe(
        [],
        f(O.some(1), () => O.none)
      ),
      O.some(1)
    )
    deepStrictEqual(
      pipe(
        [2],
        f(O.some(1), () => O.none)
      ),
      O.none
    )
    deepStrictEqual(
      pipe(
        [2],
        f(O.some(1), (b, a) => O.some(b + a))
      ),
      O.some(3)
    )
  })

  it('reduce', () => {
    const reduce = _.getReduceComposition(RA.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduce('c', (b, a) => b + a)
      ),
      'cab'
    )
  })

  it('foldMap', () => {
    const foldMap = _.getFoldMapComposition(RA.Foldable, O.Foldable)
    deepStrictEqual(pipe([O.some('a'), O.none, O.some('b')], foldMap(S.Monoid)(identity)), 'ab')
  })

  it('reduceRight', () => {
    const reduceRight = _.getReduceRightComposition(RA.Foldable, O.Foldable)
    deepStrictEqual(
      pipe(
        [O.some('a'), O.none, O.some('b')],
        reduceRight('c', (b, a) => b + a)
      ),
      'abc'
    )
  })
})
