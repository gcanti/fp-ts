import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskEither'
import * as A from '../src/ReadonlyArray'
import { semigroupString } from '../src/Semigroup'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as U from './util'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      U.deepStrictEqual(await pipe(_.right(1), _.map(U.double))({})(), E.right(2))
    })

    it('ap', async () => {
      U.deepStrictEqual(await pipe(_.right(U.double), _.ap(_.right(1)))({})(), E.right(2))
    })

    it('apFirst', async () => {
      U.deepStrictEqual(await pipe(_.right('a'), _.apFirst(_.right('b')))({})(), E.right('a'))
    })

    it('apSecond', async () => {
      U.deepStrictEqual(await pipe(_.right('a'), _.apSecond(_.right('b')))({})(), E.right('b'))
    })

    it('chain', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      U.deepStrictEqual(await pipe(_.right('aaa'), _.chain(f))({})(), E.right(3))
      U.deepStrictEqual(await pipe(_.right('a'), _.chain(f))({})(), E.left('b'))
    })

    it('chainFirst', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      U.deepStrictEqual(await pipe(_.right('aaa'), _.chainFirst(f))({})(), E.right('aaa'))
    })

    it('chainFirstW', async () => {
      const f = (a: string): _.ReaderTaskEither<unknown, string, number> =>
        a.length > 2 ? _.right(a.length) : _.left('b')
      U.deepStrictEqual(await pipe(_.right<string, object, number>('aaa'), _.chainFirstW(f))({})(), E.right('aaa'))
    })

    it('flatten', async () => {
      U.deepStrictEqual(await pipe(_.right(_.right('a')), _.flatten)({})(), E.right('a'))
    })

    it('bimap', async () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      U.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))({})(), E.right(false))
      U.deepStrictEqual(await pipe(_.left('error'), _.bimap(f, g))({})(), E.left(5))
    })

    it('mapLeft', async () => {
      const len = (s: string): number => s.length
      U.deepStrictEqual(await pipe(_.right(1), _.mapLeft(len))({})(), E.right(1))
      U.deepStrictEqual(await pipe(_.left('err'), _.mapLeft(len))({})(), E.left(3))
    })

    it('alt', async () => {
      const assertAlt = async (
        a: _.ReaderTaskEither<null, string, number>,
        b: _.ReaderTaskEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        U.deepStrictEqual(
          await pipe(
            a,
            _.alt(() => b)
          )(null)(),
          expected
        )
      }
      await assertAlt(_.right(1), _.right(2), E.right(1))
      await assertAlt(_.right(1), _.left('b'), E.right(1))
      await assertAlt(_.left('a'), _.right(2), E.right(2))
      await assertAlt(_.left('a'), _.left('b'), E.left('b'))
    })

    it('fromPredicate', async () => {
      const f = _.fromPredicate((n: number) => n >= 2)
      U.deepStrictEqual(await f(3)({})(), E.right(3))
      U.deepStrictEqual(await f(1)({})(), E.left(1))
    })

    it('fromEither', async () => {
      U.deepStrictEqual(await _.fromEither(E.right(1))({})(), E.right(1))
      U.deepStrictEqual(await _.fromEither(E.left('a'))({})(), E.left('a'))
    })

    it('fromOption', async () => {
      U.deepStrictEqual(await _.fromOption(() => 'none')(O.none)({})(), E.left('none'))
      U.deepStrictEqual(await _.fromOption(() => 'none')(O.some(1))({})(), E.right(1))
    })

    it('filterOrElse', async () => {
      U.deepStrictEqual(
        await pipe(
          _.right(12),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        )({})(),
        E.right(12)
      )
      U.deepStrictEqual(
        await pipe(
          _.right(8),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        )({})(),
        E.left('a')
      )
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await U.assertSeq(_.ApplySeq, _.FromTask, (fa) => fa(null)())
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.ApplyPar, _.FromTask, (fa) => fa(null)())
    await U.assertPar(_.ApplicativePar, _.FromTask, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return U.deepStrictEqual(await _.ask<number>()(1)(), E.right(1))
  })

  it('asks', async () => {
    return U.deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), E.right(3))
  })

  it('leftTask', async () => {
    U.deepStrictEqual(await _.leftTask(T.of(1))({})(), E.left(1))
  })

  it('rightTask', async () => {
    U.deepStrictEqual(await _.rightTask(T.of(1))({})(), E.right(1))
  })

  it('leftReaderTask', async () => {
    U.deepStrictEqual(await _.leftReaderTask(RT.of(1))({})(), E.left(1))
  })

  it('rightReaderTask', async () => {
    U.deepStrictEqual(await _.rightReaderTask(RT.of(1))({})(), E.right(1))
  })

  it('rightReader', async () => {
    U.deepStrictEqual(await _.rightReader(R.of(1))({})(), E.right(1))
  })

  it('leftReader', async () => {
    U.deepStrictEqual(await _.leftReader(R.of(1))({})(), E.left(1))
  })

  it('fromTaskEither', async () => {
    U.deepStrictEqual(await _.fromTaskEither(TE.of(1))({})(), E.right(1))
  })

  it('leftIO', async () => {
    U.deepStrictEqual(await _.leftIO(I.of(1))({})(), E.left(1))
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.right(1))({})(), E.right(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('error'))({})(), E.left('error'))
  })

  it('fold', async () => {
    const fold = _.fold(
      (l: string) => R.of(T.of(l.length)),
      (a: number) => R.of(T.of(a * 2))
    )
    U.deepStrictEqual(await fold(_.right(1))({})(), 2)
    U.deepStrictEqual(await fold(_.left('err'))({})(), 3)
  })

  it('getOrElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right(1),
        _.getOrElse((l: string) => R.of(T.of(l.length)))
      )({})(),
      1
    )
    U.deepStrictEqual(
      await pipe(
        _.left('err'),
        _.getOrElse((l: string) => R.of(T.of(l.length)))
      )({})(),
      3
    )
  })

  it('orElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right(1),
        _.orElse((s: string) => _.right(s.length))
      )({})(),
      E.right(1)
    )
    U.deepStrictEqual(
      await pipe(
        _.left('error'),
        _.orElse((s) => _.right(s.length))
      )({})(),
      E.right(5)
    )
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      U.deepStrictEqual(await _.fromIO(() => 1)({})(), E.right(1))
    })
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))({})(), E.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))({})(), E.right('a'))
  })

  it('fromReaderEither', async () => {
    U.deepStrictEqual(await _.fromReaderEither(RE.left('a'))({})(), E.left('a'))
    U.deepStrictEqual(await _.fromReaderEither(RE.right(1))({})(), E.right(1))
  })

  it('getApplicativeReaderTaskValidation', async () => {
    const A = _.getApplicativeReaderTaskValidation(T.ApplicativePar, semigroupString)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    U.deepStrictEqual(await pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null)(), E.left('ab'))
  })

  it('getAltReaderTaskValidation', async () => {
    const A = _.getAltReaderTaskValidation(semigroupString)
    U.deepStrictEqual(
      await pipe(
        _.left('a'),
        A.alt(() => _.left('b'))
      )(null)(),
      E.left('ab')
    )
  })

  describe('bracket', () => {
    // tslint:disable-next-line: readonly-array
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
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

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainEitherK(f))(undefined)(), E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)(), E.right(1))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)(), E.right(1))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<number, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, {}, string>(1), _.tupled, _.apT(_.right('b')))({})(),
      E.right([1, 'b'] as const)
    )
  })

  describe('array utils', () => {
    const range = A.range(0, 10)
    const replicate = A.replicate(3, 1)

    it('sequenceReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, A.map(_.of), _.sequenceReadonlyArray)(undefined)(), E.right(range))
      U.deepStrictEqual(
        await pipe(range, A.map(_.fromPredicate((x) => x < 5)), _.sequenceReadonlyArray)(undefined)(),
        E.left(5)
      )
    })

    it('traverseReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, _.traverseReadonlyArray(_.of))(undefined)(), E.right(range))
      U.deepStrictEqual(
        await pipe(range, _.traverseReadonlyArray(_.fromPredicate((x) => x < 5)))(undefined)(),
        E.left(5)
      )
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      U.deepStrictEqual(
        await pipe(
          replicate,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(undefined)(),
        E.right([0, 1, 2])
      )
      U.deepStrictEqual(
        await pipe(
          replicate,
          _.traverseReadonlyArrayWithIndex((index, _data) =>
            pipe(
              index,
              _.fromPredicate((x) => x < 1)
            )
          )
        )(undefined)(),
        E.left(1)
      )
    })

    it('sequenceReadonlyArraySeq', async () => {
      U.deepStrictEqual(await pipe(range, A.map(_.of), _.sequenceReadonlyArraySeq)(undefined)(), E.right(range))
      U.deepStrictEqual(
        await pipe(range, A.map(_.fromPredicate((x) => x < 5)), _.sequenceReadonlyArraySeq)(undefined)(),
        E.left(5)
      )
    })

    it('traverseReadonlyArraySeq', async () => {
      U.deepStrictEqual(await pipe(range, _.traverseReadonlyArraySeq(_.of))(undefined)(), E.right(range))
      U.deepStrictEqual(
        await pipe(range, _.traverseReadonlyArraySeq(_.fromPredicate((x) => x < 5)))(undefined)(),
        E.left(5)
      )
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      U.deepStrictEqual(
        await pipe(
          replicate,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) => _.of(index))
        )(undefined)(),
        E.right([0, 1, 2])
      )
      U.deepStrictEqual(
        await pipe(
          replicate,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) =>
            pipe(
              index,
              _.fromPredicate((x) => x < 1)
            )
          )
        )(undefined)(),
        E.left(1)
      )
    })
  })

  it('getCompactable', async () => {
    const C = _.getCompactable(monoidString)
    U.deepStrictEqual(await C.compact(_.of(O.some('a')))({})(), E.right('a'))
  })

  it('getFilterable', async () => {
    const F = _.getFilterable(monoidString)
    const fa: _.ReaderTaskEither<unknown, string, string> = _.of('a')
    U.deepStrictEqual(
      await pipe(
        fa,
        F.filter((s) => s.length > 0)
      )({})(),
      E.right('a')
    )
    U.deepStrictEqual(
      await pipe(
        fa,
        F.filterMap((s) => (s.length > 0 ? O.some(s.length) : O.none))
      )({})(),
      E.right(1)
    )
    const { left: left1, right: right1 } = pipe(
      fa,
      F.partition((s) => s.length > 0)
    )
    U.deepStrictEqual(await left1({})(), E.left(''))
    U.deepStrictEqual(await right1({})(), E.right('a'))
    const { left: left2, right: right2 } = pipe(
      fa,
      F.partitionMap((s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    )
    U.deepStrictEqual(await left2({})(), E.left(''))
    U.deepStrictEqual(await right2({})(), E.right(1))
  })
})
