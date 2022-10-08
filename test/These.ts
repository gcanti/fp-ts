import { identity, pipe } from '../src/Function'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import type { NonEmptyReadonlyArray } from '../src/NonEmptyReadonlyArray'
import * as S from '../src/string'
import * as _ from '../src/These'
import * as U from './util'

describe('These', () => {
  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        _.fail('b'),
        _.reduce('a', (b, a) => b + a)
      ),
      'a'
    )
    U.deepStrictEqual(
      pipe(
        _.of('b'),
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
    U.deepStrictEqual(pipe(_.of('a'), _.foldMap(S.Monoid)(identity)), 'a')
    U.deepStrictEqual(pipe(_.fail(1), _.foldMap(S.Monoid)(identity)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.foldMap(S.Monoid)(identity)), 'a')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(_.of('a'), _.reduceRight('', f)), 'a')
    U.deepStrictEqual(pipe(_.fail(1), _.reduceRight('', f)), '')
    U.deepStrictEqual(pipe(_.both(1, 'a'), _.reduceRight('', f)), 'a')
  })

  it('map', () => {
    U.deepStrictEqual(pipe(_.fail(2), _.map(U.double)), _.fail(2))
    U.deepStrictEqual(pipe(_.of(2), _.map(U.double)), _.of(4))
    U.deepStrictEqual(pipe(_.both(1, 2), _.map(U.double)), _.both(1, 4))
  })

  it('mapBoth', () => {
    const f = _.mapBoth(S.size, U.double)
    U.deepStrictEqual(pipe(_.fail('a'), f), _.fail(1))
    U.deepStrictEqual(pipe(_.of(2), f), _.of(4))
    U.deepStrictEqual(pipe(_.both('foo', 1), f), _.both(3, 2))
  })

  it('mapError', () => {
    const f = _.mapError(S.size)
    U.deepStrictEqual(pipe(_.fail('a'), f), _.fail(1))
    U.deepStrictEqual(pipe(_.of(2), f), _.of(2))
    U.deepStrictEqual(pipe(_.both('foo', 1), f), _.both(3, 1))
  })

  it('traverse', () => {
    const traverse = _.traverse(O.Applicative)((n: number) => (n > 1 ? O.some(n) : O.none))
    U.deepStrictEqual(pipe(_.fail('a'), traverse), O.some(_.fail('a')))
    U.deepStrictEqual(pipe(_.of(2), traverse), O.some(_.of(2)))
    U.deepStrictEqual(pipe(_.of(1), traverse), O.none)
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
    U.deepStrictEqual(sequence(_.fail('a')), O.some(_.fail('a')))
    U.deepStrictEqual(sequence(_.of(O.some(1))), O.some(_.of(1)))
    U.deepStrictEqual(sequence(_.of(O.none)), O.none)
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

    U.deepStrictEqual(f(_.of(1), _.of(2)), _.of([1, 2] as const))
    U.deepStrictEqual(f(_.of(1), _.fail('b')), _.fail('b'))
    U.deepStrictEqual(f(_.of(1), _.both('b', 2)), _.both('b', [1, 2] as const))
    U.deepStrictEqual(f(_.fail('a'), _.of(2)), _.fail('a'))
    U.deepStrictEqual(f(_.fail('a'), _.fail('b')), _.fail('ab'))
    U.deepStrictEqual(f(_.fail('a'), _.both('b', 2)), _.fail('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.of(2)), _.both('a', [1, 2] as const))
    U.deepStrictEqual(f(_.both('a', 1), _.fail('b')), _.fail('ab'))
    U.deepStrictEqual(f(_.both('a', 1), _.both('b', 2)), _.both('ab', [1, 2] as const))
  })

  it('getMonad', () => {
    const M = _.getMonad(S.Monoid)
    const f = (n: number) => (n >= 2 ? (n <= 5 ? _.of(n * 2) : _.both('bar', n)) : _.fail('bar'))
    U.deepStrictEqual(pipe(_.fail('foo'), M.flatMap(f)), _.fail('foo'))
    U.deepStrictEqual(pipe(_.of(2), M.flatMap(f)), _.of(4))
    U.deepStrictEqual(pipe(_.of(1), M.flatMap(f)), _.fail('bar'))
    U.deepStrictEqual(pipe(_.of(6), M.flatMap(f)), _.both('bar', 6))
    U.deepStrictEqual(pipe(_.both('foo', 2), M.flatMap(f)), _.both('foo', 4))
    U.deepStrictEqual(pipe(_.both('foo', 1), M.flatMap(f)), _.fail('foobar'))
    U.deepStrictEqual(pipe(_.both('foo', 6), M.flatMap(f)), _.both('foobar', 6))
  })

  it('getEq', () => {
    const { equals } = _.getEq(N.Eq, N.Eq)
    U.deepStrictEqual(equals(_.fail(2))(_.fail(2)), true)
    U.deepStrictEqual(equals(_.fail(2))(_.fail(3)), false)
    U.deepStrictEqual(equals(_.fail(3))(_.fail(2)), false)
    U.deepStrictEqual(equals(_.fail(2))(_.of(2)), false)
    U.deepStrictEqual(equals(_.fail(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.of(2))(_.of(2)), true)
    U.deepStrictEqual(equals(_.of(2))(_.of(3)), false)
    U.deepStrictEqual(equals(_.of(3))(_.of(2)), false)
    U.deepStrictEqual(equals(_.of(2))(_.both(2, 2)), false)
    U.deepStrictEqual(equals(_.both(2, 2))(_.both(2, 2)), true)
    U.deepStrictEqual(equals(_.both(2, 3))(_.both(3, 2)), false)
  })

  it('getSemigroup', () => {
    const TS = _.getSemigroup(S.Semigroup, N.SemigroupSum)
    U.deepStrictEqual(pipe(_.fail('a'), TS.combine(_.fail('b'))), _.fail('ab'))
    U.deepStrictEqual(pipe(_.fail('a'), TS.combine(_.of(2))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.of(2), TS.combine(_.fail('a'))), _.both('a', 2))
    U.deepStrictEqual(pipe(_.fail('a'), TS.combine(_.both('b', 2))), _.both('ab', 2))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.combine(_.fail('a'))), _.both('ba', 2))
    U.deepStrictEqual(pipe(_.of(3), TS.combine(_.of(2))), _.of(5))
    U.deepStrictEqual(pipe(_.of(3), TS.combine(_.both('b', 2))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('b', 2), TS.combine(_.of(3))), _.both('b', 5))
    U.deepStrictEqual(pipe(_.both('a', 3), TS.combine(_.both('b', 2))), _.both('ab', 5))
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show, S.Show)
    U.deepStrictEqual(Sh.show(_.fail('a')), `fail("a")`)
    U.deepStrictEqual(Sh.show(_.of('a')), `of("a")`)
    U.deepStrictEqual(Sh.show(_.both('a', 'b')), `both("a", "b")`)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('leftOrBoth', () => {
    U.deepStrictEqual(_.failureOrBoth('a')(O.none), _.fail('a'))
    U.deepStrictEqual(_.failureOrBoth('a')(O.some(1)), _.both('a', 1))
  })

  it('rightOrBoth', () => {
    U.deepStrictEqual(_.successOrBoth(1)(O.none), _.of(1))
    U.deepStrictEqual(_.successOrBoth(1)(O.some('a')), _.both('a', 1))
  })

  it('fromOptions', () => {
    U.deepStrictEqual(_.fromOptions(O.none, O.none), O.none)
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.none), O.some(_.fail('a')))
    U.deepStrictEqual(_.fromOptions(O.none, O.some(1)), O.some(_.of(1)))
    U.deepStrictEqual(_.fromOptions(O.some('a'), O.some(1)), O.some(_.both('a', 1)))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', () => {
    const f = (s: string, n: number) => S.size(s) + U.double(n)
    const match = _.match(S.size, U.double, f)
    U.deepStrictEqual(match(_.fail('foo')), 3)
    U.deepStrictEqual(match(_.of(1)), 2)
    U.deepStrictEqual(match(_.both('foo', 1)), 5)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('toTuple2', () => {
    const f = _.toTuple2('a', 1)
    U.deepStrictEqual(pipe(_.fail('b'), f), ['b', 1])
    U.deepStrictEqual(pipe(_.of(2), f), ['a', 2])
    U.deepStrictEqual(pipe(_.both('b', 2), f), ['b', 2])
  })

  it('getLeft', () => {
    U.deepStrictEqual(_.getFailure(_.fail('a')), O.some('a'))
    U.deepStrictEqual(_.getFailure(_.of(1)), O.none)
    U.deepStrictEqual(_.getFailure(_.both('a', 1)), O.some('a'))
  })

  it('getRight', () => {
    U.deepStrictEqual(_.getSuccess(_.fail('a')), O.none)
    U.deepStrictEqual(_.getSuccess(_.of(1)), O.some(1))
    U.deepStrictEqual(_.getSuccess(_.both('a', 1)), O.some(1))
  })

  it('getLeftOnly', () => {
    U.deepStrictEqual(_.getFailureOnly(_.fail('a')), O.some('a'))
    U.deepStrictEqual(_.getFailureOnly(_.of(1)), O.none)
    U.deepStrictEqual(_.getFailureOnly(_.both('a', 1)), O.none)
  })

  it('getRightOnly', () => {
    U.deepStrictEqual(_.getSuccessOnly(_.fail('a')), O.none)
    U.deepStrictEqual(_.getSuccessOnly(_.of(1)), O.some(1))
    U.deepStrictEqual(_.getSuccessOnly(_.both('a', 1)), O.none)
  })

  // -------------------------------------------------------------------------------------
  // guards
  // -------------------------------------------------------------------------------------

  it('isLeft', () => {
    U.deepStrictEqual(_.isFailure(_.fail(1)), true)
    U.deepStrictEqual(_.isFailure(_.of(1)), false)
    U.deepStrictEqual(_.isFailure(_.both('1', 1)), false)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isSuccess(_.fail(1)), false)
    U.deepStrictEqual(_.isSuccess(_.of(1)), true)
    U.deepStrictEqual(_.isSuccess(_.both('1', 1)), false)
  })

  it('isBoth', () => {
    U.deepStrictEqual(_.isBoth(_.fail(1)), false)
    U.deepStrictEqual(_.isBoth(_.of(1)), false)
    U.deepStrictEqual(_.isBoth(_.both('1', 1)), true)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.fail('a')), _.of('a'))
    U.deepStrictEqual(_.swap(_.of('a')), _.fail('a'))
    U.deepStrictEqual(_.swap(_.both('a', 1)), _.both(1, 'a'))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.fail('a')), false)
    U.deepStrictEqual(gt2(_.of(1)), false)
    U.deepStrictEqual(gt2(_.of(3)), true)
    U.deepStrictEqual(gt2(_.both('a', 1)), false)
    U.deepStrictEqual(gt2(_.both('a', 3)), true)
  })

  it('elem', () => {
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.fail('a')), false)
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.of(2)), true)
    U.deepStrictEqual(_.elem(N.Eq)(1)(_.of(2)), false)
    U.deepStrictEqual(_.elem(N.Eq)(2)(_.both('a', 2)), true)
    U.deepStrictEqual(_.elem(N.Eq)(1)(_.both('a', 2)), false)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const f = (i: number, n: number) => (n > 0 ? _.of(n + i) : n === 0 ? _.both('a', 0) : _.fail(String(n)))
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

  it('traverseNonEmptyReadonlyArray', () => {
    const f = (n: number) => (n > 0 ? _.of(n) : n === 0 ? _.both('a', 0) : _.fail(String(n)))
    const standard = RA.traverse(_.getApplicative(S.Semigroup))(f)
    const optimized = _.traverseNonEmptyReadonlyArray(S.Semigroup)(f)
    const assert = (input: NonEmptyReadonlyArray<number>) => {
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
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], sequenceReadonlyArray), _.of(['a', 'b']))
    U.deepStrictEqual(pipe([_.of('a'), _.fail('e')], sequenceReadonlyArray), _.fail('e'))
    U.deepStrictEqual(pipe([_.fail('e'), _.of('b')], sequenceReadonlyArray), _.fail('e'))
  })
})
