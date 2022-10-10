import * as E from '../src/Result'
import { flow, pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as IE from '../src/SyncResult'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/typeclasses/Ord'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderResult'
import * as RIO from '../src/ReaderSync'
import * as RT from '../src/ReaderAsync'
import * as _ from '../src/ReaderAsyncResult'
import * as RA from '../src/ReadonlyArray'
import * as writer from '../src/Writer'
import * as S from '../src/string'
import * as T from '../src/Async'
import * as TE from '../src/AsyncResult'
import * as U from './util'
import * as filterable from '../src/typeclasses/Filterable'

describe('ReaderAsyncResult', () => {
  describe('pipeables', () => {
    it('map', async () => {
      U.deepStrictEqual(await pipe(_.succeed(1), _.map(U.double))({})(), E.succeed(2))
    })

    it('ap', async () => {
      U.deepStrictEqual(await pipe(_.succeed(U.double), _.ap(_.succeed(1)))({})(), E.succeed(2))
    })

    it('flatMap', async () => {
      const f = (a: string) => (a.length > 2 ? _.succeed(a.length) : _.fail('b'))
      U.deepStrictEqual(await pipe(_.succeed('aaa'), _.flatMap(f))({})(), E.succeed(3))
      U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMap(f))({})(), E.fail('b'))
    })

    it('tap', async () => {
      const f = (a: string): _.ReaderAsyncResult<unknown, string, number> =>
        a.length > 2 ? _.succeed(a.length) : _.fail('b')
      U.deepStrictEqual(await pipe(_.succeed('aaa'), _.tap(f))({})(), E.succeed('aaa'))
    })

    it('flatten', async () => {
      U.deepStrictEqual(await pipe(_.succeed(_.succeed('a')), _.flatten)({})(), E.succeed('a'))
    })

    it('mapBoth', async () => {
      const f = _.mapBoth(S.size, gt(N.Ord)(2))
      U.deepStrictEqual(await pipe(_.succeed(1), f)({})(), E.succeed(false))
      U.deepStrictEqual(await pipe(_.fail('error'), f)({})(), E.fail(5))
    })

    it('mapError', async () => {
      const f = _.mapError(S.size)
      U.deepStrictEqual(await pipe(_.succeed(1), f)({})(), E.succeed(1))
      U.deepStrictEqual(await pipe(_.fail('err'), f)({})(), E.fail(3))
    })

    it('orElse', async () => {
      const assertAlt = async (
        a: _.ReaderAsyncResult<null, string, number>,
        b: _.ReaderAsyncResult<null, string, number>,
        expected: E.Result<string, number>
      ) => {
        U.deepStrictEqual(await pipe(a, _.orElse(b))(null)(), expected)
      }
      await assertAlt(_.succeed(1), _.succeed(2), E.succeed(1))
      await assertAlt(_.succeed(1), _.fail('b'), E.succeed(1))
      await assertAlt(_.fail('a'), _.succeed(2), E.succeed(2))
      await assertAlt(_.fail('a'), _.fail('b'), E.fail('b'))
    })

    it('fromPredicate', async () => {
      const f = _.liftPredicate((n: number) => n >= 2, 'e')
      U.deepStrictEqual(await f(3)({})(), E.succeed(3))
      U.deepStrictEqual(await f(1)({})(), E.fail('e'))
    })

    it('filter', async () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(await pipe(_.succeed(12), _.filter(predicate, -1))({})(), E.succeed(12))
      U.deepStrictEqual(await pipe(_.succeed(7), _.filter(predicate, -1))({})(), E.fail(-1))
      U.deepStrictEqual(await pipe(_.fail(12), _.filter(predicate, -1))({})(), E.fail(12))
    })

    it('fromResult', async () => {
      U.deepStrictEqual(await _.fromResult(E.succeed(1))({})(), E.succeed(1))
      U.deepStrictEqual(await _.fromResult(E.fail('a'))({})(), E.fail('a'))
    })

    it('fromOption', async () => {
      U.deepStrictEqual(await _.fromOption('none')(O.none)({})(), E.fail('none'))
      U.deepStrictEqual(await _.fromOption('none')(O.some(1))({})(), E.succeed(1))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromAsync, (fa) => fa(null)())
    await U.assertSeq(_.Applicative, _.FromAsync, (fa) => fa(null)())
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

  it('leftAsync', async () => {
    U.deepStrictEqual(await _.failAsync(T.of(1))({})(), E.fail(1))
  })

  it('fromAsync', async () => {
    U.deepStrictEqual(await _.fromAsync(T.of(1))({})(), E.succeed(1))
  })

  it('leftReaderAsync', async () => {
    U.deepStrictEqual(await _.failReaderAsync(RT.of(1))({})(), E.fail(1))
  })

  it('fromReaderAsync', async () => {
    U.deepStrictEqual(await _.fromReaderAsync(RT.of(1))({})(), E.succeed(1))
  })

  it('fromReader', async () => {
    U.deepStrictEqual(await _.fromReader(R.of(1))({})(), E.succeed(1))
  })

  it('leftReader', async () => {
    U.deepStrictEqual(await _.failReader(R.of(1))({})(), E.fail(1))
  })

  it('fromAsyncResult', async () => {
    U.deepStrictEqual(await _.fromAsyncResult(TE.succeed(1))({})(), E.succeed(1))
  })

  it('failSync', async () => {
    U.deepStrictEqual(await _.failSync(I.of(1))({})(), E.fail(1))
  })

  it('fromReaderSync', async () => {
    U.deepStrictEqual(await _.fromReaderSync(RIO.of(1))({})(), E.succeed(1))
  })

  it('leftReaderSync', async () => {
    U.deepStrictEqual(await _.failReaderSync(RIO.of(1))({})(), E.fail(1))
  })

  it('fromSyncResult', async () => {
    U.deepStrictEqual(await _.fromSyncResult(() => E.succeed(1))({})(), E.succeed(1))
    U.deepStrictEqual(await _.fromSyncResult(() => E.fail('error'))({})(), E.fail('error'))
  })

  it('match', async () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(await f(_.succeed(1))({})(), 'right')
    U.deepStrictEqual(await f(_.fail(''))({})(), 'left')
  })

  it('matchReaderAsync', async () => {
    const f = _.matchReaderAsync(
      () => RT.of('left'),
      () => RT.of('right')
    )
    U.deepStrictEqual(await f(_.succeed(1))({})(), 'right')
    U.deepStrictEqual(await f(_.fail(''))({})(), 'left')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(await f(_.succeed(1))({})(), 1)
    U.deepStrictEqual(await f(_.fail('a'))({})(), 2)
  })

  it('getOrElseReaderAsync', async () => {
    const f = _.getOrElseReaderAsync(RT.of(2))
    U.deepStrictEqual(await f(_.succeed(1))({})(), 1)
    U.deepStrictEqual(await f(_.fail('a'))({})(), 2)
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
        _.fail('error'),
        _.catchAll((s) => _.succeed(s.length))
      )({})(),
      E.succeed(5)
    )
  })

  describe('FromSync', () => {
    it('fromSync', async () => {
      U.deepStrictEqual(await _.fromSync(() => 1)({})(), E.succeed(1))
    })
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.reverse(_.succeed(1))({})(), E.fail(1))
    U.deepStrictEqual(await _.reverse(_.fail('a'))({})(), E.succeed('a'))
  })

  it('fromReaderResult', async () => {
    U.deepStrictEqual(await _.fromReaderResult(RE.fail('a'))({})(), E.fail('a'))
    U.deepStrictEqual(await _.fromReaderResult(RE.succeed(1))({})(), E.succeed(1))
  })

  it('getApplicativeReaderAsyncValidation', async () => {
    const A = _.getValidatedApplicative(T.ApplicativePar, S.Semigroup)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(await pipe(_.fail('a'), A.map(tuple), A.ap(_.fail('b')))(null)(), E.fail('ab'))
  })

  it('getSemigroupKReaderAsyncValidation', async () => {
    const A = _.getValidatedAlt(S.Semigroup)
    U.deepStrictEqual(await pipe(_.fail('a'), A.orElse(_.fail('b')))(null)(), E.fail('ab'))
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.fail('acquire failure')
    const acquireSuccess = _.succeed({ res: 'acquire success' })
    const useSuccess = () => _.succeed('use success')
    const useFailure = () => _.fail('use failure')
    const releaseSuccess = () =>
      _.fromSync(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.fail('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)(),
        E.fail('acquire failure')
      )
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)(), E.fail('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(
        await _.bracket(acquireSuccess, useFailure, releaseFailure)(undefined)(),
        E.fail('release failure')
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
        E.fail('release failure')
      )
    })
  })

  it('flatMapResult', async () => {
    const f = flow(S.size, E.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapResult(f))(undefined)(), E.succeed(1))
  })

  it('flatMapSyncResult', async () => {
    const f = flow(S.size, IE.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapSyncResult(f))(undefined)(), E.succeed(1))
  })

  it('flatMapAsyncResult', async () => {
    const f = flow(S.size, TE.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapAsyncResult(f))(undefined)(), E.succeed(1))
  })

  it('flatMapReaderAsync', async () => {
    const f = flow(S.size, RT.of)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderAsync(f))(undefined)(), E.succeed(1))
  })

  it('flatMapReaderAsync', async () => {
    const f = flow(S.size, RT.of)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderAsync(f))({})(), E.succeed(1))
  })

  it('flatMapReaderResult', async () => {
    const f = (s: string) => RE.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderResult(f))({})(), E.succeed(1))
  })

  it('liftReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await _.liftReaderSync(f)('a')(undefined)(), E.succeed(1))
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderSync(f))({})(), E.succeed(1))
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderSync(f))(undefined)(), E.succeed(1))
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
    const fa: _.ReaderAsyncResult<unknown, string, string> = _.succeed('a')

    const filter = filterable.filter(F)

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

    const partition = filterable.partition(F)

    const s1 = pipe(
      fa,
      partition((s: string) => s.length > 0)
    )
    U.deepStrictEqual(await writer.left(s1)({})(), E.fail(''))
    U.deepStrictEqual(await writer.right(s1)({})(), E.succeed('a'))

    const partitionMap = filterable.partitionMap(F)
    const s2 = pipe(
      fa,
      partitionMap((s) => (s.length > 0 ? E.succeed(s.length) : E.fail(s)))
    )
    U.deepStrictEqual(await writer.left(s2)({})(), E.fail(''))
    U.deepStrictEqual(await writer.right(s2)({})(), E.succeed(1))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.fail('e'))
  })

  it('traverseNonEmptyReadonlyArrayPar', async () => {
    const f = _.traverseNonEmptyReadonlyArrayPar((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.fail('e'))
  })

  it('sequenceReadonlyArrayPar', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderAsyncResult<undefined, string, number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderAsyncResult<undefined, string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArrayPar)(undefined)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArrayPar)(undefined)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArrayPar)(undefined)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), E.succeed(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.fail('e'))
  })

  it('traverseNonEmptyReadonlyArray', async () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(), E.fail('e'))
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderAsyncResult<undefined, string, number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderAsyncResult<undefined, string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArray)(undefined)(), E.succeed([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(undefined)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(undefined)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
