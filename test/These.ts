import { identity, pipe } from '../src/Function'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import * as _ from '../src/These'
import * as U from './util'

describe('These', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    U.deepStrictEqual(pipe(_.left(2), _.map(U.double)), _.left(2))
    U.deepStrictEqual(pipe(_.succeed(2), _.map(U.double)), _.succeed(4))
    U.deepStrictEqual(pipe(_.both(1, 2), _.map(U.double)), _.both(1, 4))
  })

  it('mapBoth', () => {
    const f = _.mapBoth(S.size, U.double)
    U.deepStrictEqual(pipe(_.left('a'), f), _.left(1))
    U.deepStrictEqual(pipe(_.succeed(2), f), _.succeed(4))
    U.deepStrictEqual(pipe(_.both('foo', 1), f), _.both(3, 2))
  })

  it('mapError', () => {
    const f = _.mapError(S.size)
    U.deepStrictEqual(pipe(_.left('a'), f), _.left(1))
    U.deepStrictEqual(pipe(_.succeed(2), f), _.succeed(2))
    U.deepStrictEqual(pipe(_.both('foo', 1), f), _.both(3, 1))
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
        _.succeed('b'),
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
    U.deepStrictEqual(pipe(_.succeed('a'), _.foldMap(S.Monoid)(identity)), 'a')
    U.deepStrictEqual(pipe(_.left(1), _.foldMap(S.Monoid)(identity)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(S.Monoid)(identity)), 'a')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(_.succeed('a'), _.reduceRight('', f)), 'a')
    U.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
  })

  it('traverse', () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    U.deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
    U.deepStrictEqual(pipe(_.succeed(2), traverse), O.some(_.succeed(2)))
    U.deepStrictEqual(pipe(_.succeed(1), traverse), O.none)
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
    U.deepStrictEqual(sequence(_.succeed(O.some(1))), O.some(_.succeed(1)))
    U.deepStrictEqual(sequence(_.succeed(O.none)), O.none)
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

    U.deepStrictEqual(f(_.succeed(1), _.succeed(2)), _.succeed([1, 2] as const))
    U.deepStrictEqual(f(_.succeed(1), _.left('b')), _.left('b'))
    U.deepStrictEqual(f(_.succeed(1), _.both('b', 2)), _.both('b', [1, 2] as const))
    U.deepStrictEqual(f(_.left('a'), _.succeed(2)), _.left('a'))
    U.deepStrictEqual(f(_.left('a'), _.left('b')), _.left('ab'))
    U.deepStrictEqual(f(_.left('a'), _.both('b', 2)), _.left('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.succeed(2)), _.both('a', [1, 2] as const))
    U.deepStrictEqual(f(_.both('a', 1), _.left('b')), _.left('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.both('b', 2)), _.both('ab', [1, 2] as const))
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.succeed(n * 2) : _.both('bar', n)) : _.left('bar'))
    U.deepStrictEqual(pipe(_.left('foo'), M.flatMap(f)), _.left('foo'))
    U.deepStrictEqual(pipe(_.succeed(2), M.flatMap(f)), _.succeed(4))
    U.deepStrictEqual(pipe(_.succeed(1), M.flatMap(f)), _.left('bar'))
    U.deepStrictEqual(pipe(_.succeed(6), M.flatMap(f)), _.both('bar', 6))
    U.deepStrictEqual(pipe(_.both('foo', 2), M.flatMap(f)), _.both('foo', 4))
    U.deepStrictEqual(pipe(_.both('foo', 1), M.flatMap(f)), _.left('foobar'))
    U.deepStrictEqual(pipe(_.both('foo', 6), M.flatMap(f)), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(N.Eq, N.Eq)
    U.deepStrictEqual(equals(_.left(2))(_.left(2)), true)
    U.deepStrictEqual(equals(_.left(2))(_.left(3)), false)
    U.deepStrictEqual(equals(_.left(3))(_.left(2)), false)
    U.deepStrictEqual(equals(_.left(2))(_.succeed(2)), false)
    U.deepStrictEqual(equals(_.left(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.succeed(2))(_.succeed(2)), true)
    U.deepStrictEqual(equals(_.succeed(2))(_.succeed(3)), false)
    U.deepStrictEqual(equals(_.succeed(3))(_.succeed(2)), false)
    U.deepStrictEqual(equals(_.succeed(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.both(2, 2))(_.both(2, 2)), true)
    U.deepStrictEqual(equals(_.both(2, 3))(_.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const TS = _.getSemigroup(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(pipe(_.left('a'), TS.combine(_.left('b'))), _.left('ab'))
    U.deepStrictEqual(pipe(_.left('a'), TS.combine(_.succeed(2))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.succeed(2), TS.combine(_.left('a'))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.left('a'), TS.combine(_.both('b', 2))), _.both('ab', 2))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.combine(_.left('a'))), _.both('ba', 2))
    U.deepStrictEqual(pipe(_.succeed(3), TS.combine(_.succeed(2))), _.succeed(5))
    U.deepStrictEqual(pipe(_.succeed(3), TS.combine(_.both('b', 2))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.combine(_.succeed(3))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('a', 3), TS.combine(_.both('b', 2))), _.both('ab', 5))
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show, S.Show)
    U.deepStrictEqual(Sh.show(_.left('a')), `left("a")`)
    U.deepStrictEqual(Sh.show(_.succeed('a')), `succeed("a")`)
    U.deepStrictEqual(Sh.show(_.both('a', 'b')), `both("a", "b")`)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('leftOrBoth', () => {
    U.deepStrictEqual(_.leftOrBoth('a')(O.none), _.left('a'))
    U.deepStrictEqual(_.leftOrBoth('a')(O.some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    U.deepStrictEqual(_.successOrBoth(1)(O.none), _.succeed(1))
    U.deepStrictEqual(_.successOrBoth(1)(O.some('a')), _.both('a', 1))
  })

  it('fromOptions', () => {
    U.deepStrictEqual(_.fromOptions(O.none, O.none), O.none)
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.none), O.some(_.left('a')))
    U.deepStrictEqual(_.fromOptions(O.none, O.some(1)), O.some(_.succeed(1)))
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.some(1)), O.some(_.both('a', 1)))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', () => {
    const f = (s: string, n: number) => S.size(s) + U.double(n)
    const match = _.match(S.size, U.double, f)
    U.deepStrictEqual(match(_.left('foo')), 3)
    U.deepStrictEqual(match(_.succeed(1)), 2)
    U.deepStrictEqual(match(_.both('foo', 1)), 5)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toTuple2', () => {
    const f = _.toTuple2('a', 1)
    U.deepStrictEqual(pipe(_.left('b'), f), ['b', 1])
    U.deepStrictEqual(pipe(_.succeed(2), f), ['a', 2])
    U.deepStrictEqual(pipe(_.both('b', 2), f), ['b', 2])
  })

  it('getLeft', () => {
    U.deepStrictEqual(_.getLeft(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeft(_.succeed(1)), O.none)
    U.deepStrictEqual(_.getLeft(_.both('a', 1)), O.some('a'))
  })

  it('getRight', () => {
    U.deepStrictEqual(_.getSuccess(_.left('a')), O.none)
    U.deepStrictEqual(_.getSuccess(_.succeed(1)), O.some(1))
    U.deepStrictEqual(_.getSuccess(_.both('a', 1)), O.some(1))
  })

  it('getLeftOnly', () => {
    U.deepStrictEqual(_.getLeftOnly(_.left('a')), O.some('a'))
    U.deepStrictEqual(_.getLeftOnly(_.succeed(1)), O.none)
    U.deepStrictEqual(_.getLeftOnly(_.both('a', 1)), O.none)
  })

  it('getRightOnly', () => {
    U.deepStrictEqual(_.getSuccessOnly(_.left('a')), O.none)
    U.deepStrictEqual(_.getSuccessOnly(_.succeed(1)), O.some(1))
    U.deepStrictEqual(_.getSuccessOnly(_.both('a', 1)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // guards
  // -------------------------------------------------------------------------------------

  it('isLeft', () => {
    U.deepStrictEqual(_.isLeft(_.left(1)), true)
    U.deepStrictEqual(_.isLeft(_.succeed(1)), false)
    U.deepStrictEqual(_.isLeft(_.both('1', 1)), false)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isRight(_.left(1)), false)
    U.deepStrictEqual(_.isRight(_.succeed(1)), true)
    U.deepStrictEqual(_.isRight(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    U.deepStrictEqual(_.isBoth(_.left(1)), false)
    U.deepStrictEqual(_.isBoth(_.succeed(1)), false)
    U.deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.left('a')), _.succeed('a'))
    U.deepStrictEqual(_.swap(_.succeed('a')), _.left('a'))
    U.deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.left('a')), false)
    U.deepStrictEqual(gt2(_.succeed(1)), false)
    U.deepStrictEqual(gt2(_.succeed(3)), true)
    U.deepStrictEqual(gt2(_.both('a', 1)), false)
    U.deepStrictEqual(gt2(_.both('a', 3)), true)
  })

  it('elem', () => {
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.left('a')), false)
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.succeed(2)), true)
    U.deepStrictEqual(_.elem(N.Eq)(1)(_.succeed(2)), false)
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.both('a', 2)), true)
    U.deepStrictEqual(_.elem(N.Eq)(1)(_.both('a', 2)), false)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const f = (i: number, n: number) => (n > 0 ? _.succeed(n + i) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverseWithIndex(_.getApplicative(S.Semigroup))(f)
    const optimized = _.traverseReadonlyArrayWithIndex(S.Semigroup)(f)
    const assert = (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
    assert(RA.empty)
  })

  it('traverseReadonlyNonEmptyArray', () => {
    const f = (n: number) => (n > 0 ? _.succeed(n) : n === 0 ? _.both('a', 0) : _.left(String(n)))
    const standard = RA.traverse(_.getApplicative(S.Semigroup))(f)
    const optimized = _.traverseReadonlyNonEmptyArray(S.Semigroup)(f)
    const assert = (input: ReadonlyNonEmptyArray<number>) => {
      U.deepStrictEqual(standard(input), optimized(input))
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
  })

  it('sequenceReadonlyArray', () => {
    const sequenceReadonlyArray = _.sequenceReadonlyArray(S.Semigroup)
    U.deepStrictEqual(pipe([_.succeed('a'), _.succeed('b')], sequenceReadonlyArray), _.succeed(['a', 'b']))
    U.deepStrictEqual(pipe([_.succeed('a'), _.left('e')], sequenceReadonlyArray), _.left('e'))
    U.deepStrictEqual(pipe([_.left('e'), _.succeed('b')], sequenceReadonlyArray), _.left('e'))
  })
})
