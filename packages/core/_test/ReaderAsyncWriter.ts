import * as T from '@fp-ts/core/Async'
import { pipe } from '@fp-ts/core/Function'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import * as R from '@fp-ts/core/Reader'
import * as RT from '@fp-ts/core/ReaderAsync'
import * as _ from '@fp-ts/core/ReaderAsyncWriter'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as string from '@fp-ts/core/string'
import * as IO from '@fp-ts/core/Sync'
import * as U from '@fp-ts/core/test/util'
import { tuple } from '@fp-ts/core/tuple'
import * as W from '@fp-ts/core/Writer'

const make = <W, A, R = unknown>(w: W, a: A): _.ReaderAsyncWriter<R, W, A> => RT.of([w, a])

describe('ReaderAsyncWriter', () => {
  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('fromReader', async () => {
    U.deepStrictEqual(await pipe(R.of(1), _.fromReader('a'))(undefined)(), ['a', 1])
  })

  it('fromReaderAsync', async () => {
    U.deepStrictEqual(await pipe(RT.of(1), _.fromReaderAsync('a'))(undefined)(), ['a', 1])
  })

  it('fromAsyncWriter', async () => {
    U.deepStrictEqual(await pipe(T.of(W.tell('a')), _.fromAsyncWriter)(undefined)(), ['a', undefined])
  })

  it('fromSync', async () => {
    U.deepStrictEqual(await pipe(IO.of(1), _.fromSync('a'))(undefined)(), ['a', 1])
  })

  it('fromAsync', async () => {
    U.deepStrictEqual(await pipe(T.of(1), _.fromAsync('a'))(undefined)(), ['a', 1])
  })

  it('tell', async () => {
    U.deepStrictEqual(await _.tell(1)(undefined)(), [1, undefined])
  })

  // -------------------------------------------------------------------------------------
  // natural transformations
  // -------------------------------------------------------------------------------------

  it('fromWriter', async () => {
    U.deepStrictEqual(await _.fromWriter([1, 'a'])(undefined)(), [1, 'a'])
  })

  it('fromReaderWriter', async () => {
    U.deepStrictEqual(await _.fromReaderWriter(R.of([1, 'a']))(undefined)(), [1, 'a'])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('swap', async () => {
    U.deepStrictEqual(await pipe(make('w', 'a'), _.swap)(undefined)(), ['a', 'w'])
  })

  it('listen', async () => {
    U.deepStrictEqual(await _.listen(make('w', 'a'))(undefined)(), ['w', ['w', 'a']])
  })

  it('pass', async () => {
    U.deepStrictEqual(
      await _.pass(
        make(
          'a',
          tuple(1, (w: string) => w + 'b')
        )
      )(undefined)(),
      ['ab', 1]
    )
  })

  it('listens', async () => {
    const fa: _.ReaderAsyncWriter<unknown, string, number> = make('w', 1)
    U.deepStrictEqual(
      await pipe(
        fa,
        _.listens((w) => w.length)
      )(undefined)(),
      ['w', [1, 1]]
    )
  })

  it('censor', async () => {
    const fa: _.ReaderAsyncWriter<unknown, ReadonlyArray<string>, number> = make(['a', 'b'], 1)
    U.deepStrictEqual(
      await pipe(
        fa,
        _.censor((w) => w.filter((a) => a !== 'a'))
      )(undefined)(),
      [['b'], 1]
    )
  })

  it('liftWriter', async () => {
    const sum = (a: number, b: number) => [a + b, 'sum'] as const
    U.deepStrictEqual(await _.liftWriter(sum)(1, 2)(undefined)(), [3, 'sum'])
  })

  it('liftAsyncWriter', async () => {
    const sum = (a: number, b: number) => T.of([a + b, 'sum'] as const)
    U.deepStrictEqual(await _.liftAsyncWriter(sum)(1, 2)(undefined)(), [3, 'sum'])
  })

  it('liftReaderWriter', async () => {
    const sum = (a: number, b: number) => R.of([a + b, 'sum'] as const)
    U.deepStrictEqual(await _.liftReaderWriter(sum)(1, 2)(undefined)(), [3, 'sum'])
  })

  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(make('a', 1), _.map(U.double))(undefined)(), ['a', 2])
  })

  it('mapError', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.mapError(U.double))(undefined)(), [2, 'a'])
  })

  it('mapBoth', async () => {
    U.deepStrictEqual(
      await pipe(
        make('w', 'a'),
        _.mapBoth(
          (s) => s + '1',
          (s) => s + '2'
        )
      )(undefined)(),
      ['w1', 'a2']
    )
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getFromIdentity', async () => {
    const P = _.getFromIdentity(string.Monoid)
    U.deepStrictEqual(await P.of(1)(undefined)(), ['', 1])
  })

  it('getApply', async () => {
    const A = _.getApply(RT.ApplyPar, string.Semigroup)
    const f = (s: string) => (n: number): boolean => s.length > n
    U.deepStrictEqual(await pipe(make('a', 'aa'), A.map(f), A.ap(make('b', 1)))(undefined)(), ['ab', true])
  })

  it('getApplicative', async () => {
    const A = _.getApplicative(RT.ApplyPar, string.Monoid)
    const f = (s: string) => (n: number): boolean => s.length > n
    U.deepStrictEqual(await pipe(A.of('aa'), A.map(f), A.ap(A.of(1)))(undefined)(), ['', true])
  })

  it('getFlattenable', async () => {
    const C = _.getFlattenable(string.Semigroup)
    const double = (n: number): _.ReaderAsyncWriter<unknown, string, number> => make('double', n * 2)
    U.deepStrictEqual(await pipe(make('start', 1), C.flatMap(double))(undefined)(), ['startdouble', 2])
  })

  it('getMonad', async () => {
    const M = _.getMonad(string.Monoid)
    const double = (n: number): _.ReaderAsyncWriter<unknown, string, number> => M.of(n * 2)
    U.deepStrictEqual(await pipe(make('start', 1), M.flatMap(double))(undefined)(), ['start', 2])
  })

  it('getFromSync', async () => {
    const F = _.getFromSync(string.Monoid)
    U.deepStrictEqual(await pipe(() => 1, F.fromSync)(undefined)(), ['', 1])
  })

  it('getFromAsync', async () => {
    const F = _.getFromAsync(string.Monoid)
    U.deepStrictEqual(await pipe(() => Promise.resolve(1), F.fromAsync)(undefined)(), ['', 1])
  })

  it('getFromReader', async () => {
    const F = _.getFromReader(string.Monoid)
    U.deepStrictEqual(await pipe((env: { readonly a: string }) => env.a, F.fromReader)({ a: 'a' })(), ['', 'a'])
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('fst', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.fst)(undefined)(), 1)
  })

  it('snd', async () => {
    U.deepStrictEqual(await pipe(make(1, 'a'), _.snd)(undefined)(), 'a')
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', async () => {
    const { of } = _.getFromIdentity(string.Monoid)
    const f = (i: number, n: number) => of(n + i)
    const standard = RA.traverseWithIndex(_.getApplicative(RT.ApplicativePar, string.Monoid))(f)
    const optimized = _.traverseReadonlyArrayWithIndex(RT.ApplicativePar, string.Monoid)(f)
    const assert = async (input: ReadonlyArray<number>) => {
      U.deepStrictEqual(await standard(input)(null)(), await optimized(input)(null)())
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
    assert(RA.empty)
  })

  it('traverseNonEmptyReadonlyArray', async () => {
    const { of } = _.getFromIdentity(string.Monoid)
    const f = (n: number) => of(n)
    const standard = RA.traverse(_.getApplicative(RT.ApplicativePar, string.Monoid))(f)
    const optimized = _.traverseNonEmptyReadonlyArray(RT.ApplicativePar, string.Monoid)(f)
    const assert = async (input: NonEmptyReadonlyArray<number>) => {
      U.deepStrictEqual(await standard(input)(null)(), await optimized(input)(null)())
    }
    assert([1, 2, 3])
    assert([0, 2, 3])
    assert([1, 0, 3])
    assert([0, 0, 3])
    assert([-1, 2, 3])
    assert([1, -2, 3])
  })

  it('sequenceReadonlyArray', async () => {
    const { of } = _.getFromIdentity(string.Monoid)
    const sequenceReadonlyArray = _.sequenceReadonlyArray(RT.ApplicativePar, string.Monoid)
    U.deepStrictEqual(await pipe([of('a'), of('b')], sequenceReadonlyArray)(null)(), ['', ['a', 'b']])
  })
})
