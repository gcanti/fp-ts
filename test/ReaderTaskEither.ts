import * as E from '../src/Either'
import { flow, pipe } from '../src/Function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RIO from '../src/ReaderIO'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskEither'
import * as RA from '../src/ReadonlyArray'
import * as writer from '../src/Writer'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as U from './util'
import * as FilterableModule from '../src/Filterable'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      U.deepStrictEqual(await pipe(_.succeed(1), _.map(U.double))({})(), E.succeed(2))
    })

    it('ap', async () => {
      U.deepStrictEqual(await pipe(_.succeed(U.double), _.ap(_.succeed(1)))({})(), E.succeed(2))
    })

    it('flatMap', async () => {
      const f = (a: string) => (a.length > 2 ? _.succeed(a.length) : _.left('b'))
      U.deepStrictEqual(await pipe(_.succeed('aaa'), _.flatMap(f))({})(), E.succeed(3))
      U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMap(f))({})(), E.left('b'))
    })

    it('tap', async () => {
      const f = (a: string): _.ReaderTaskEither<unknown, string, number> =>
        a.length > 2 ? _.succeed(a.length) : _.left('b')
      U.deepStrictEqual(await pipe(_.succeed('aaa'), _.tap(f))({})(), E.succeed('aaa'))
    })

    it('flatten', async () => {
      U.deepStrictEqual(await pipe(_.succeed(_.succeed('a')), _.flatten)({})(), E.succeed('a'))
    })

    it('mapBoth', async () => {
      const f = _.mapBoth(S.size, gt(N.Ord)(2))
      U.deepStrictEqual(await pipe(_.succeed(1), f)({})(), E.succeed(false))
      U.deepStrictEqual(await pipe(_.left('error'), f)({})(), E.left(5))
    })

    it('mapError', async () => {
      const f = _.mapError(S.size)
      U.deepStrictEqual(await pipe(_.succeed(1), f)({})(), E.succeed(1))
      U.deepStrictEqual(await pipe(_.left('err'), f)({})(), E.left(3))
    })

    it('orElse', async () => {
      const assertSemigroupKind = async (
        a: _.ReaderTaskEither<null, string, number>,
        b: _.ReaderTaskEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        U.deepStrictEqual(await pipe(a, _.orElse(b))(null)(), expected)
      }
      await assertSemigroupKind(_.succeed(1), _.succeed(2), E.succeed(1))
      await assertSemigroupKind(_.succeed(1), _.left('b'), E.succeed(1))
      await assertSemigroupKind(_.left('a'), _.succeed(2), E.succeed(2))
      await assertSemigroupKind(_.left('a'), _.left('b'), E.left('b'))
    })

    it('fromPredicate', async () => {
      const f = _.liftPredicate((n: number) => n >= 2, 'e')
      U.deepStrictEqual(await f(3)({})(), E.succeed(3))
      U.deepStrictEqual(await f(1)({})(), E.left('e'))
    })

    it('filter', async () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(await pipe(_.succeed(12), _.filter(predicate, -1))({})(), E.succeed(12))
      U.deepStrictEqual(await pipe(_.succeed(7), _.filter(predicate, -1))({})(), E.left(-1))
      U.deepStrictEqual(await pipe(_.left(12), _.filter(predicate, -1))({})(), E.left(12))
    })

    it('fromEither', async () => {
      U.deepStrictEqual(await _.fromEither(E.succeed(1))({})(), E.succeed(1))
      U.deepStrictEqual(await _.fromEither(E.left('a'))({})(), E.left('a'))
    })

    it('fromOption', async () => {
      U.deepStrictEqual(await _.fromOption('none')(O.none)({})(), E.left('none'))
      U.deepStrictEqual(await _.fromOption('none')(O.some(1))({})(), E.succeed(1))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromTask, (fa) => fa(null)())
    await U.assertSeq(_.Applicative, _.FromTask, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return U.deepStrictEqual(await _.ask<number>()(1)(), E.succeed(1))
  })

  it('asks', async () => {
    return U.deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), E.succeed(3))
  })

  it('leftTask', async () => {
    U.deepStrictEqual(await _.leftTask(T.succeed(1))({})(), E.left(1))
  })

  it('fromTask', async () => {
    U.deepStrictEqual(await _.fromTask(T.succeed(1))({})(), E.succeed(1))
  })

  it('leftReaderTask', async () => {
    U.deepStrictEqual(await _.leftReaderTask(RT.succeed(1))({})(), E.left(1))
  })

  it('fromReaderTask', async () => {
    U.deepStrictEqual(await _.fromReaderTask(RT.succeed(1))({})(), E.succeed(1))
  })

  it('fromReader', async () => {
    U.deepStrictEqual(await _.fromReader(R.succeed(1))({})(), E.succeed(1))
  })

  it('leftReader', async () => {
    U.deepStrictEqual(await _.leftReader(R.succeed(1))({})(), E.left(1))
  })

  it('fromTaskEither', async () => {
    U.deepStrictEqual(await _.fromTaskEither(TE.succeed(1))({})(), E.succeed(1))
  })

  it('leftIO', async () => {
    U.deepStrictEqual(await _.leftIO(I.succeed(1))({})(), E.left(1))
  })

  it('fromReaderIO', async () => {
    U.deepStrictEqual(await _.fromReaderIO(RIO.succeed(1))({})(), E.succeed(1))
  })

  it('leftReaderIO', async () => {
    U.deepStrictEqual(await _.leftReaderIO(RIO.succeed(1))({})(), E.left(1))
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.succeed(1))({})(), E.succeed(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('error'))({})(), E.left('error'))
  })

  it('match', async () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(await f(_.succeed(1))({})(), 'right')
    U.deepStrictEqual(await f(_.left(''))({})(), 'left')
  })

  it('matchReaderTask', async () => {
    const f = _.matchReaderTask(
      () => RT.succeed('left'),
      () => RT.succeed('right')
    )
    U.deepStrictEqual(await f(_.succeed(1))({})(), 'right')
    U.deepStrictEqual(await f(_.left(''))({})(), 'left')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(await f(_.succeed(1))({})(), 1)
    U.deepStrictEqual(await f(_.left('a'))({})(), 2)
  })

  it('getOrElseReaderTask', async () => {
    const f = _.getOrElseReaderTask(RT.succeed(2))
    U.deepStrictEqual(await f(_.succeed(1))({})(), 1)
    U.deepStrictEqual(await f(_.left('a'))({})(), 2)
  })

  it('catchAll', async () => {
    U.deepStrictEqual(
      await pipe(
        _.succeed(1),
        _.catchAll((s: string) => _.succeed(s.length))
      )({})(),
      E.succeed(1)
    )
    U.deepStrictEqual(
      await pipe(
        _.left('error'),
        _.catchAll((s) => _.succeed(s.length))
      )({})(),
      E.succeed(5)
    )
  })

  describe('FromIO', () => {
    it('fromIO', async () => {
      U.deepStrictEqual(await _.fromIO(() => 1)({})(), E.succeed(1))
    })
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.succeed(1))({})(), E.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))({})(), E.succeed('a'))
  })

  it('fromReaderEither', async () => {
    U.deepStrictEqual(await _.fromReaderEither(RE.left('a'))({})(), E.left('a'))
    U.deepStrictEqual(await _.fromReaderEither(RE.succeed(1))({})(), E.succeed(1))
  })

  it('getApplicativeReaderTaskValidation', async () => {
    const A = _.getValidatedApplicative(T.ApplicativePar, S.Semigroup)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(await pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null)(), E.left('ab'))
  })

  it('getSemigroupKReaderTaskValidation', async () => {
    const A = _.getValidatedSemigroupKind(S.Semigroup)
    U.deepStrictEqual(await pipe(_.left('a'), A.combineKind(_.left('b')))(null)(), E.left('ab'))
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.succeed({ res: 'acquire success' })
    const useSuccess = () => _.succeed('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)(),
        E.left('acquire failure')
      )
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireSuccess, useFailure, releaseFailure)(undefined)(),
        E.left('release failure')
      )
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireSuccess, useSuccess, releaseFailure)(undefined)(),
        E.left('release failure')
      )
    })
  })

  it('flatMapEither', async () => {
    const f = flow(S.size, E.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapEither(f))(undefined)(), E.succeed(1))
  })

  it('flatMapIOEither', async () => {
    const f = flow(S.size, IE.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapIOEither(f))(undefined)(), E.succeed(1))
  })

  it('flatMapTaskEither', async () => {
    const f = flow(S.size, TE.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapTaskEither(f))(undefined)(), E.succeed(1))
  })

  it('flatMapReaderTask', async () => {
    const f = flow(S.size, RT.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderTask(f))(undefined)(), E.succeed(1))
  })

  it('flatMapReaderTask', async () => {
    const f = flow(S.size, RT.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderTask(f))({})(), E.succeed(1))
  })

  it('flatMapReaderEither', async () => {
    const f = (s: string) => RE.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderEither(f))({})(), E.succeed(1))
  })

  it('liftReaderIO', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await _.liftReaderIO(f)('a')(undefined)(), E.succeed(1))
  })

  it('flatMapReaderIO', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderIO(f))({})(), E.succeed(1))
  })

  it('flatMapReaderIO', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderIO(f))(undefined)(), E.succeed(1))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(undefined)(),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(undefined)(),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('zipFlatten', async () => {
    U.deepStrictEqual(
      await pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))({})(),
      E.succeed([1, 'b'] as const)
    )
  })

  it('getCompactable', async () => {
    const C = _.getCompactable(() => S.Monoid.empty)
    U.deepStrictEqual(await C.compact(_.succeed(O.some('a')))({})(), E.succeed('a'))
  })

  it('getFilterable', async () => {
    const F = _.getFilterable(S.Monoid.empty)
    const fa: _.ReaderTaskEither<unknown, string, string> = _.succeed('a')

    const filter = FilterableModule.filter(F)

    U.deepStrictEqual(
      await pipe(
        fa,
        filter((s: string) => s.length > 0)
      )({})(),
      E.succeed('a')
    )
    U.deepStrictEqual(
      await pipe(
        fa,
        F.filterMap((s) => (s.length > 0 ? O.some(s.length) : O.none))
      )({})(),
      E.succeed(1)
    )

    const partition = FilterableModule.partition(F)

    const s1 = pipe(
      fa,
      partition((s: string) => s.length > 0)
    )
    U.deepStrictEqual(await writer.fst(s1)({})(), E.left(''))
    U.deepStrictEqual(await writer.snd(s1)({})(), E.succeed('a'))
    const s2 = pipe(
      fa,
      F.partitionMap((s) => (s.length > 0 ? E.succeed(s.length) : E.left(s)))
    )
    U.deepStrictEqual(await writer.fst(s2)({})(), E.left(''))
    U.deepStrictEqual(await writer.snd(s2)({})(), E.succeed(1))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.left('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => (a.length > 0 ? _.succeed(a) : _.left('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
  })

  it('sequenceReadonlyArrayPar', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArrayPar)(undefined)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArrayPar)(undefined)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArrayPar)(undefined)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.left('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.left('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.left('e'))
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArray)(undefined)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(undefined)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(undefined)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
