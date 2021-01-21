import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import { monoidString, monoidSum } from '../src/Monoid'
import * as O from '../src/Option'
import { semigroupString } from '../src/Semigroup'
import { showString } from '../src/Show'
import * as _ from '../src/These'
import { deepStrictEqual } from './util'

describe('These', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    const double = (n: number) => n * 2
    deepStrictEqual(pipe(_.left(2), _.map(double)), _.left(2))
    deepStrictEqual(pipe(_.right(2), _.map(double)), _.right(4))
    deepStrictEqual(pipe(_.both(1, 2), _.map(double)), _.both(1, 4))
  })

  it('bimap', () => {
    const len = (s: string): number => s.length
    const double = (n: number): number => n * 2
    deepStrictEqual(pipe(_.left('a'), _.bimap(len, double)), _.left(1))
    deepStrictEqual(pipe(_.right(2), _.bimap(len, double)), _.right(4))
    deepStrictEqual(pipe(_.both('foo', 1), _.bimap(len, double)), _.both(3, 2))
  })

  it('mapLeft', () => {
    const len = (s: string): number => s.length
    deepStrictEqual(pipe(_.left('a'), _.mapLeft(len)), _.left(1))
    deepStrictEqual(pipe(_.right(2), _.mapLeft(len)), _.right(2))
    deepStrictEqual(pipe(_.both('foo', 1), _.mapLeft(len)), _.both(3, 1))
  })

  it('reduce', () => {
    deepStrictEqual(
      pipe(
        _.left('b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'a'
    )
    deepStrictEqual(
      pipe(
        _.right('b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'ab'
    )
    deepStrictEqual(
      pipe(
        _.both(1, 'b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'ab'
    )
  })

  it('foldMap', () => {
    deepStrictEqual(pipe(_.right('a'), _.foldMap(monoidString)(identity)), 'a')
    deepStrictEqual(pipe(_.left(1), _.foldMap(monoidString)(identity)), '')
    deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(monoidString)(identity)), 'a')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
    deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
    deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
  })

  it('traverse', () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
    deepStrictEqual(pipe(_.right(2), traverse), O.some(_.right(2)))
    deepStrictEqual(pipe(_.right(1), traverse), O.none)
    deepStrictEqual(pipe(_.both('a', 2), traverse), O.some(_.both('a', 2)))
    deepStrictEqual(
      pipe(
        _.both('a', 1),
        _.traverse(O.Applicative)((n) => (n >= 2 ? O.some(n) : O.none))
      ),
      O.none
    )
  })

  it('sequence', () => {
    const sequence = _.sequence(O.Applicative)
    deepStrictEqual(sequence(_.left('a')), O.some(_.left('a')))
    deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
    deepStrictEqual(sequence(_.right(O.none)), O.none)
    deepStrictEqual(sequence(_.both('a', O.some(1))), O.some(_.both('a', 1)))
    deepStrictEqual(sequence(_.both('a', O.none)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicative', () => {
    const A = _.getApplicative(semigroupString)
    const f = <A, B>(fa: _.These<string, A>, fb: _.These<string, B>): _.These<string, readonly [A, B]> =>
      pipe(
        fa,
        A.map((a: A) => (b: B): readonly [A, B] => [a, b]),
        A.ap(fb)
      )

    deepStrictEqual(f(_.right(1), _.right(2)), _.right([1, 2] as const))
    deepStrictEqual(f(_.right(1), _.left('b')), _.left('b'))
    deepStrictEqual(f(_.right(1), _.both('b', 2)), _.both('b', [1, 2] as const))
    deepStrictEqual(f(_.left('a'), _.right(2)), _.left('a'))
    deepStrictEqual(f(_.left('a'), _.left('b')), _.left('ab'))
    deepStrictEqual(f(_.left('a'), _.both('b', 2)), _.left('ab'))
    deepStrictEqual(f(_.both('a', 1), _.right(2)), _.both('a', [1, 2] as const))
    deepStrictEqual(f(_.both('a', 1), _.left('b')), _.left('ab'))
    deepStrictEqual(f(_.both('a', 1), _.both('b', 2)), _.both('ab', [1, 2] as const))
  })

  it('getMonad', () => {
    const M = _.getMonad(monoidString)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.right(n * 2) : _.both('bar', n)) : _.left('bar'))
    deepStrictEqual(pipe(_.left('foo'), M.chain(f)), _.left('foo'))
    deepStrictEqual(pipe(_.right(2), M.chain(f)), _.right(4))
    deepStrictEqual(pipe(_.right(1), M.chain(f)), _.left('bar'))
    deepStrictEqual(pipe(_.right(6), M.chain(f)), _.both('bar', 6))
    deepStrictEqual(pipe(_.both('foo', 2), M.chain(f)), _.both('foo', 4))
    deepStrictEqual(pipe(_.both('foo', 1), M.chain(f)), _.left('foobar'))
    deepStrictEqual(pipe(_.both('foo', 6), M.chain(f)), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(eqNumber, eqNumber)
    deepStrictEqual(equals(_.left(2))(_.left(2)), true)
    deepStrictEqual(equals(_.left(2))(_.left(3)), false)
    deepStrictEqual(equals(_.left(3))(_.left(2)), false)
    deepStrictEqual(equals(_.left(2))(_.right(2)), false)
    deepStrictEqual(equals(_.left(2))(_.both(2, 2)), false)
    deepStrictEqual(equals(_.right(2))(_.right(2)), true)
    deepStrictEqual(equals(_.right(2))(_.right(3)), false)
    deepStrictEqual(equals(_.right(3))(_.right(2)), false)
    deepStrictEqual(equals(_.right(2))(_.both(2, 2)), false)
    deepStrictEqual(equals(_.both(2, 2))(_.both(2, 2)), true)
    deepStrictEqual(equals(_.both(2, 3))(_.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(monoidString, monoidSum)
    deepStrictEqual(pipe(_.left('a'), S.concat(_.left('b'))), _.left('ab'))
    deepStrictEqual(pipe(_.left('a'), S.concat(_.right(2))), _.both('a', 2))
    deepStrictEqual(pipe(_.right(2), S.concat(_.left('a'))), _.both('a', 2))
    deepStrictEqual(pipe(_.left('a'), S.concat(_.both('b', 2))), _.both('ab', 2))
    deepStrictEqual(pipe(_.both('b', 2), S.concat(_.left('a'))), _.both('ba', 2))
    deepStrictEqual(pipe(_.right(3), S.concat(_.right(2))), _.right(5))
    deepStrictEqual(pipe(_.right(3), S.concat(_.both('b', 2))), _.both('b', 5))
    deepStrictEqual(pipe(_.both('b', 2), S.concat(_.right(3))), _.both('b', 5))
    deepStrictEqual(pipe(_.both('a', 3), S.concat(_.both('b', 2))), _.both('ab', 5))
  })

  it('getShow', () => {
    const S = _.getShow(showString, showString)
    deepStrictEqual(S.show(_.left('a')), `left("a")`)
    deepStrictEqual(S.show(_.right('a')), `right("a")`)
    deepStrictEqual(S.show(_.both('a', 'b')), `both("a", "b")`)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('leftOrBoth', () => {
    deepStrictEqual(_.leftOrBoth(() => 'a')(O.none), _.left('a'))
    deepStrictEqual(_.leftOrBoth(() => 'a')(O.some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    deepStrictEqual(_.rightOrBoth(() => 1)(O.none), _.right(1))
    deepStrictEqual(_.rightOrBoth(() => 1)(O.some('a')), _.both('a', 1))
  })

  it('fromOptions', () => {
    deepStrictEqual(_.fromOptions(O.none, O.none), O.none)
    deepStrictEqual(_.fromOptions(O.some('a'), O.none), O.some(_.left('a')))
    deepStrictEqual(_.fromOptions(O.none, O.some(1)), O.some(_.right(1)))
    deepStrictEqual(_.fromOptions(O.some('a'), O.some(1)), O.some(_.both('a', 1)))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('fold', () => {
    const double = (n: number) => n * 2
    const len = (s: string) => s.length
    const f = (s: string, n: number) => len(s) + double(n)
    const fold = _.fold(len, double, f)
    deepStrictEqual(fold(_.left('foo')), 3)
    deepStrictEqual(fold(_.right(1)), 2)
    deepStrictEqual(fold(_.both('foo', 1)), 5)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toReadonlyTuple2', () => {
    const f = _.toReadonlyTuple2(
      () => 'a',
      () => 1
    )
    deepStrictEqual(pipe(_.left('b'), f), ['b', 1])
    deepStrictEqual(pipe(_.right(2), f), ['a', 2])
    deepStrictEqual(pipe(_.both('b', 2), f), ['b', 2])
  })

  it('getLeft', () => {
    deepStrictEqual(_.getLeft(_.left('a')), O.some('a'))
    deepStrictEqual(_.getLeft(_.right(1)), O.none)
    deepStrictEqual(_.getLeft(_.both('a', 1)), O.some('a'))
  })

  it('getRight', () => {
    deepStrictEqual(_.getRight(_.left('a')), O.none)
    deepStrictEqual(_.getRight(_.right(1)), O.some(1))
    deepStrictEqual(_.getRight(_.both('a', 1)), O.some(1))
  })

  it('getLeftOnly', () => {
    deepStrictEqual(_.getLeftOnly(_.left('a')), O.some('a'))
    deepStrictEqual(_.getLeftOnly(_.right(1)), O.none)
    deepStrictEqual(_.getLeftOnly(_.both('a', 1)), O.none)
  })

  it('getRightOnly', () => {
    deepStrictEqual(_.getRightOnly(_.left('a')), O.none)
    deepStrictEqual(_.getRightOnly(_.right(1)), O.some(1))
    deepStrictEqual(_.getRightOnly(_.both('a', 1)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // guards
  // -------------------------------------------------------------------------------------

  it('isLeft', () => {
    deepStrictEqual(_.isLeft(_.left(1)), true)
    deepStrictEqual(_.isLeft(_.right(1)), false)
    deepStrictEqual(_.isLeft(_.both('1', 1)), false)
  })

  it('isRight', () => {
    deepStrictEqual(_.isRight(_.left(1)), false)
    deepStrictEqual(_.isRight(_.right(1)), true)
    deepStrictEqual(_.isRight(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    deepStrictEqual(_.isBoth(_.left(1)), false)
    deepStrictEqual(_.isBoth(_.right(1)), false)
    deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    deepStrictEqual(_.swap(_.left('a')), _.right('a'))
    deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })
})
