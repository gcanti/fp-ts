import * as N from '../src/number'
import { identity, pipe } from '../src/function'
import * as O from '../src/Option'
import * as S from '../src/string'
import * as _ from '../src/These'
import * as U from './util'

describe('These', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(_.left(2), _.map(U.double)), _.left(2))
    U.deepStrictEqual(pipe(_.right(2), _.map(U.double)), _.right(4))
    U.deepStrictEqual(pipe(_.both(1, 2), _.map(U.double)), _.both(1, 4))
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    U.deepStrictEqual(pipe(_.left('a'), _.bimap(len, U.double)), _.left(1))
    U.deepStrictEqual(pipe(_.right(2), _.bimap(len, U.double)), _.right(4))
    U.deepStrictEqual(pipe(_.both('foo', 1), _.bimap(len, U.double)), _.both(3, 2))
  })

  it('mapLeft', () => {
    const len = (s: string): number => s.length
    U.deepStrictEqual(pipe(_.left('a'), _.mapLeft(len)), _.left(1))
    U.deepStrictEqual(pipe(_.right(2), _.mapLeft(len)), _.right(2))
    U.deepStrictEqual(pipe(_.both('foo', 1), _.mapLeft(len)), _.both(3, 1))
  })

  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        _.left('b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'a'
    )
    U.deepStrictEqual(
      pipe(
        _.right('b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'ab'
    )
    U.deepStrictEqual(
      pipe(
        _.both(1, 'b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(_.right('a'), _.foldMap(S.Monoid)(identity)), 'a')
    U.deepStrictEqual(pipe(_.left(1), _.foldMap(S.Monoid)(identity)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(S.Monoid)(identity)), 'a')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
    U.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
  })

  it('traverse', () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    U.deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
    U.deepStrictEqual(pipe(_.right(2), traverse), O.some(_.right(2)))
    U.deepStrictEqual(pipe(_.right(1), traverse), O.none)
    U.deepStrictEqual(pipe(_.both('a', 2), traverse), O.some(_.both('a', 2)))
    U.deepStrictEqual(
      pipe(
        _.both('a', 1),
        _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none))
      ),
      O.none
    )
  })

  it('sequence', () => {
    const sequence = _.sequence(O.Applicative)
    U.deepStrictEqual(sequence(_.left('a')), O.some(_.left('a')))
    U.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    U.deepStrictEqual(sequence(_.right(O.none)), O.none)
    U.deepStrictEqual(sequence(_.both('a', O.some(1))), O.some(_.both('a', 1)))
    U.deepStrictEqual(sequence(_.both('a', O.none)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicative', () => {
    const A = _.getApplicative(S.Semigroup)
    const f = <A, B>(fa: _.These<string, A>, fb: _.These<string, B>): _.These<string, readonly [A, B]> =>
      pipe(
        fa,
        A.map((a: A) => (b: B): readonly [A, B] => [a, b]),
        A.ap(fb)
      )

    U.deepStrictEqual(f(_.right(1), _.right(2)), _.right([1, 2] as const))
    U.deepStrictEqual(f(_.right(1), _.left('b')), _.left('b'))
    U.deepStrictEqual(f(_.right(1), _.both('b', 2)), _.both('b', [1, 2] as const))
    U.deepStrictEqual(f(_.left('a'), _.right(2)), _.left('a'))
    U.deepStrictEqual(f(_.left('a'), _.left('b')), _.left('ab'))
    U.deepStrictEqual(f(_.left('a'), _.both('b', 2)), _.left('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.right(2)), _.both('a', [1, 2] as const))
    U.deepStrictEqual(f(_.both('a', 1), _.left('b')), _.left('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.both('b', 2)), _.both('ab', [1, 2] as const))
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.right(n * 2) : _.both('bar', n)) : _.left('bar'))
    U.deepStrictEqual(pipe(_.left('foo'), M.chain(f)), _.left('foo'))
    U.deepStrictEqual(pipe(_.right(2), M.chain(f)), _.right(4))
    U.deepStrictEqual(pipe(_.right(1), M.chain(f)), _.left('bar'))
    U.deepStrictEqual(pipe(_.right(6), M.chain(f)), _.both('bar', 6))
    U.deepStrictEqual(pipe(_.both('foo', 2), M.chain(f)), _.both('foo', 4))
    U.deepStrictEqual(pipe(_.both('foo', 1), M.chain(f)), _.left('foobar'))
    U.deepStrictEqual(pipe(_.both('foo', 6), M.chain(f)), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(N.Eq, N.Eq)
    U.deepStrictEqual(equals(_.left(2))(_.left(2)), true)
    U.deepStrictEqual(equals(_.left(2))(_.left(3)), false)
    U.deepStrictEqual(equals(_.left(3))(_.left(2)), false)
    U.deepStrictEqual(equals(_.left(2))(_.right(2)), false)
    U.deepStrictEqual(equals(_.left(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.right(2))(_.right(2)), true)
    U.deepStrictEqual(equals(_.right(2))(_.right(3)), false)
    U.deepStrictEqual(equals(_.right(3))(_.right(2)), false)
    U.deepStrictEqual(equals(_.right(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.both(2, 2))(_.both(2, 2)), true)
    U.deepStrictEqual(equals(_.both(2, 3))(_.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const TS = _.getSemigroup(S.Monoid, N.MonoidSum)
    U.deepStrictEqual(pipe(_.left('a'), TS.concat(_.left('b'))), _.left('ab'))
    U.deepStrictEqual(pipe(_.left('a'), TS.concat(_.right(2))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.right(2), TS.concat(_.left('a'))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.left('a'), TS.concat(_.both('b', 2))), _.both('ab', 2))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.concat(_.left('a'))), _.both('ba', 2))
    U.deepStrictEqual(pipe(_.right(3), TS.concat(_.right(2))), _.right(5))
    U.deepStrictEqual(pipe(_.right(3), TS.concat(_.both('b', 2))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.concat(_.right(3))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('a', 3), TS.concat(_.both('b', 2))), _.both('ab', 5))
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show, S.Show)
    U.deepStrictEqual(Sh.show(_.left('a')), `left("a")`)
    U.deepStrictEqual(Sh.show(_.right('a')), `right("a")`)
    U.deepStrictEqual(Sh.show(_.both('a', 'b')), `both("a", "b")`)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('leftOrBoth', () => {
    U.deepStrictEqual(_.leftOrBoth(() => 'a')(O.none), _.left('a'))
    U.deepStrictEqual(_.leftOrBoth(() => 'a')(O.some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    U.deepStrictEqual(_.rightOrBoth(() => 1)(O.none), _.right(1))
    U.deepStrictEqual(_.rightOrBoth(() => 1)(O.some('a')), _.both('a', 1))
  })

  it('fromOptions', () => {
    U.deepStrictEqual(_.fromOptions(O.none, O.none), O.none)
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.none), O.some(_.left('a')))
    U.deepStrictEqual(_.fromOptions(O.none, O.some(1)), O.some(_.right(1)))
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.some(1)), O.some(_.both('a', 1)))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    const len = (s: string) => s.length
    const f = (s: string, n: number) => len(s) + U.double(n)
    const fold = _.fold(len, U.double, f)
    U.deepStrictEqual(fold(_.left('foo')), 3)
    U.deepStrictEqual(fold(_.right(1)), 2)
    U.deepStrictEqual(fold(_.both('foo', 1)), 5)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toTuple2', () => {
    const f = _.toTuple2(
      () => 'a',
      () => 1
    )
    U.deepStrictEqual(pipe(_.left('b'), f), ['b', 1])
    U.deepStrictEqual(pipe(_.right(2), f), ['a', 2])
    U.deepStrictEqual(pipe(_.both('b', 2), f), ['b', 2])
  })

  it('getLeft', () => {
    U.deepStrictEqual(_.getLeft(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeft(_.right(1)), O.none)
    U.deepStrictEqual(_.getLeft(_.both('a', 1)), O.some('a'))
  })

  it('getRight', () => {
    U.deepStrictEqual(_.getRight(_.left('a')), O.none)
    U.deepStrictEqual(_.getRight(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRight(_.both('a', 1)), O.some(1))
  })

  it('getLeftOnly', () => {
    U.deepStrictEqual(_.getLeftOnly(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeftOnly(_.right(1)), O.none)
    U.deepStrictEqual(_.getLeftOnly(_.both('a', 1)), O.none)
  })

  it('getRightOnly', () => {
    U.deepStrictEqual(_.getRightOnly(_.left('a')), O.none)
    U.deepStrictEqual(_.getRightOnly(_.right(1)), O.some(1))
    U.deepStrictEqual(_.getRightOnly(_.both('a', 1)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // guards
  // -------------------------------------------------------------------------------------

  it('isLeft', () => {
    U.deepStrictEqual(_.isLeft(_.left(1)), true)
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.both('1', 1)), false)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isRight(_.left(1)), false)
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    U.deepStrictEqual(_.isBoth(_.left(1)), false)
    U.deepStrictEqual(_.isBoth(_.right(1)), false)
    U.deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.left('a')), _.right('a'))
    U.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    U.deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })
})
