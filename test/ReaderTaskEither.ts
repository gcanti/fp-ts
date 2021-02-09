import * as U from './util'
import { sequenceT } from '../src/Apply'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RT from '../src/ReaderTask'
import * as _ from '../src/ReaderTaskEither'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { left, right } from '../src/Separated'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(await pipe(_.right(1), _.map(double))({})(), E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(await pipe(_.right(double), _.ap(_.right(1)))({})(), E.right(2))
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
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      U.deepStrictEqual(await pipe(_.right<object, number, string>('aaa'), _.chainFirstW(f))({})(), E.right('aaa'))
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
      U.deepStrictEqual(
        await pipe(
          _.right(1),
          _.alt(() => _.right(2))
        )({})(),
        E.right(1)
      )
      U.deepStrictEqual(
        await pipe(
          _.left('a'),
          _.alt(() => _.right(2))
        )({})(),
        E.right(2)
      )
      U.deepStrictEqual(
        await pipe(
          _.left('a'),
          _.alt(() => _.left('b'))
        )({})(),
        E.left('b')
      )
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      U.deepStrictEqual(await gt2(3)({})(), E.right(3))
      U.deepStrictEqual(await gt2(1)({})(), E.left('Invalid number 1'))
      U.deepStrictEqual(await isNumber(4)({})(), E.right(4))
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

  it('applicativeReaderTaskEitherSeq', async () => {
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('applicativeReaderTaskEitherPar', async () => {
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

  it('local', async () => {
    const len = (s: string): number => s.length
    U.deepStrictEqual(
      await pipe(
        _.asks((n: number) => n + 1),
        // tslint:disable-next-line: deprecation
        _.local(len)
      )('aaa')(),
      E.right(4)
    )
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

  describe('getSemigroup', () => {
    it('concat', async () => {
      // tslint:disable-next-line: deprecation
      const S = _.getSemigroup(N.SemigroupSum)
      U.deepStrictEqual(await S.concat(_.left('a'), _.left('b'))({})(), E.left('a'))
      U.deepStrictEqual(await S.concat(_.left('a'), _.right(2))({})(), E.right(2))
      U.deepStrictEqual(await S.concat(_.right(1), _.left('b'))({})(), E.right(1))
      U.deepStrictEqual(await S.concat(_.right(1), _.right(2))({})(), E.right(3))
    })
  })

  it('getApplyMonoid', async () => {
    // tslint:disable-next-line: deprecation
    const M = _.getApplyMonoid(N.MonoidSum)

    U.deepStrictEqual(await M.concat(_.right(1), _.right(2))({})(), E.right(3))
    U.deepStrictEqual(await M.concat(_.right(1), _.left('b'))({})(), E.left('b'))
    U.deepStrictEqual(await M.concat(_.right(1), M.empty)({})(), E.right(1))
    U.deepStrictEqual(await M.concat(M.empty, _.right(1))({})(), E.right(1))
  })

  it('fromReaderEither', async () => {
    U.deepStrictEqual(await _.fromReaderEither(RE.left('a'))({})(), E.left('a'))
    U.deepStrictEqual(await _.fromReaderEither(RE.right(1))({})(), E.right(1))
  })

  it('getApplicativeReaderTaskValidation', async () => {
    const A = _.getApplicativeReaderTaskValidation(T.ApplicativePar, S.Semigroup)
    U.deepStrictEqual(await sequenceT(A)(_.left('a'), _.left('b'))(null)(), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getReaderTaskValidation(S.Semigroup)
    U.deepStrictEqual(await sequenceT(AV)(_.left('a'), _.left('b'))(null)(), E.left('ab'))
  })

  it('getAltReaderTaskValidation', async () => {
    const A = _.getAltReaderTaskValidation(S.Semigroup)
    U.deepStrictEqual(await A.alt(_.left('a'), () => _.left('b'))(null)(), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getReaderTaskValidation(S.Semigroup)
    U.deepStrictEqual(await AV.alt(_.left('a'), () => _.left('b'))(null)(), E.left('ab'))
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
        _.right<void, string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<void, string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('sequenceArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceArray)(undefined)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceArray)(undefined)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceArray)(undefined)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  it('sequenceSeqArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const right = (n: number): _.ReaderTaskEither<undefined, string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.ReaderTaskEither<undefined, string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceSeqArray)(undefined)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceSeqArray)(undefined)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceSeqArray)(undefined)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })

  it('getCompactable', async () => {
    const C = _.getCompactable(S.Monoid)
    U.deepStrictEqual(await C.compact(_.of(O.some('a')))({})(), E.right('a'))
  })

  it('getFilterable', async () => {
    const F = _.getFilterable(S.Monoid)
    U.deepStrictEqual(await F.filter(_.of('a'), (s) => s.length > 0)({})(), E.right('a'))
    U.deepStrictEqual(await F.filterMap(_.of('a'), (s) => (s.length > 0 ? O.some(s.length) : O.none))({})(), E.right(1))
    const s1 = F.partition(_.of('a'), (s) => s.length > 0)
    U.deepStrictEqual(await left(s1)({})(), E.left(''))
    U.deepStrictEqual(await right(s1)({})(), E.right('a'))
    const s2 = F.partitionMap(_.of('a'), (s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    U.deepStrictEqual(await left(s2)({})(), E.left(''))
    U.deepStrictEqual(await right(s2)({})(), E.right(1))
  })
})
