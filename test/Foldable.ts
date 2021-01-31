import * as assert from 'assert'
import * as RA from '../src/ReadonlyArray'
import * as I from '../src/IO'
import * as O from '../src/Option'
import * as T from '../src/Tree'
import * as _ from '../src/Foldable'
import { pipe } from '../src/function'
import * as S from '../src/string'

export const ArrayOptionURI = 'ArrayOption'

export type ArrayOptionURI = typeof ArrayOptionURI

describe('Foldable', () => {
  it('getFoldableComposition', () => {
    // tslint:disable-next-line: deprecation
    const F = _.getFoldableComposition(RA.Foldable, O.Foldable)
    // reduce
    assert.deepStrictEqual(F.reduce([O.some('a'), O.some('b'), O.some('c')], '', S.Semigroup.concat), 'abc')
    assert.deepStrictEqual(F.reduce([O.none, O.some('b'), O.none], '', S.Semigroup.concat), 'b')
    assert.deepStrictEqual(F.reduce([O.none, O.none, O.none], '', S.Semigroup.concat), '')
    assert.deepStrictEqual(F.reduce([], '', S.Semigroup.concat), '')
    // foldMap
    assert.deepStrictEqual(
      F.foldMap(S.Monoid)([O.some('a'), O.some('b'), O.some('c')], (a) => a),
      'abc'
    )
    assert.deepStrictEqual(
      F.foldMap(S.Monoid)([O.none, O.some('b'), O.none], (a) => a),
      'b'
    )
    assert.deepStrictEqual(
      F.foldMap(S.Monoid)([O.none, O.none, O.none], (a) => a),
      ''
    )
    assert.deepStrictEqual(
      F.foldMap(S.Monoid)([], (a: string) => a),
      ''
    )
    // reduceRight
    assert.deepStrictEqual(F.reduceRight([O.some('a'), O.some('b'), O.some('c')], '', S.Semigroup.concat), 'abc')
    assert.deepStrictEqual(F.reduceRight([O.none, O.some('b'), O.none], '', S.Semigroup.concat), 'b')
    assert.deepStrictEqual(F.reduceRight([O.none, O.none, O.none], '', S.Semigroup.concat), '')
    assert.deepStrictEqual(F.reduceRight([], '', S.Semigroup.concat), '')
  })

  it('intercalate', () => {
    assert.deepStrictEqual(_.intercalate(S.Monoid, RA.Foldable)(',', ['a', 'b', 'c']), 'a,b,c')
  })

  it('toReadonlyArray', () => {
    // Option
    const optionToArray = _.toReadonlyArray(O.Foldable)
    assert.deepStrictEqual(optionToArray(O.some(1)), [1])
    assert.deepStrictEqual(optionToArray(O.none), [])

    // Tree
    const treeToArray = _.toReadonlyArray(T.Foldable)
    assert.deepStrictEqual(treeToArray(T.make(1, [T.make(2, []), T.make(3, []), T.make(4, [])])), [1, 2, 3, 4])
  })

  it('traverse_', () => {
    let log = ''
    const append = (s: String) => () => (log += s)
    _.traverse_(I.Applicative, RA.Foldable)(['a', 'b', 'c'], append)()
    assert.deepStrictEqual(log, 'abc')
  })

  it('foldM', () => {
    assert.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.foldM(O.Monad, RA.Foldable)([], 1, () => O.none),
      O.some(1)
    )
    assert.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.foldM(O.Monad, RA.Foldable)([2], 1, () => O.none),
      O.none
    )
    assert.deepStrictEqual(
      // tslint:disable-next-line: deprecation
      _.foldM(O.Monad, RA.Foldable)([2], 1, (b, a) => O.some(b + a)),
      O.some(3)
    )
  })

  it('reduceM', () => {
    assert.deepStrictEqual(
      pipe(
        [],
        _.reduceM(O.Monad, RA.Foldable)(1, () => O.none)
      ),
      O.some(1)
    )
    assert.deepStrictEqual(
      pipe(
        [2],
        _.reduceM(O.Monad, RA.Foldable)(1, () => O.none)
      ),
      O.none
    )
    assert.deepStrictEqual(
      pipe(
        [2],
        _.reduceM(O.Monad, RA.Foldable)(1, (b, a) => O.some(b + a))
      ),
      O.some(3)
    )
  })
})
