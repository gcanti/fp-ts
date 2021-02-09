import * as U from './util'
import { sequenceT } from '../src/Apply'
import * as RA from '../src/ReadonlyArray'
import * as E from '../src/Either'
import { identity, pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipeable } from '../src/pipeable'
import * as N from '../src/number'
import * as T from '../src/Task'
import * as _ from '../src/TaskEither'
import * as S from '../src/string'
import { left, right } from '../src/Separated'

describe('TaskEither', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('alt', async () => {
    U.deepStrictEqual(
      await pipe(
        _.left('a'),
        _.alt(() => _.right(1))
      )(),
      E.right(1)
    )
  })

  it('map', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.right(1), _.map(double))(), E.right(2))
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.right(double), _.ap(_.right(1)))(), E.right(2))
  })

  it('apFirst', async () => {
    U.deepStrictEqual(await pipe(_.right('a'), _.apFirst(_.right('b')))(), E.right('a'))
  })

  it('apSecond', async () => {
    U.deepStrictEqual(await pipe(_.right('a'), _.apSecond(_.right('b')))(), E.right('b'))
  })

  it('chain', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right('foo'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right(3)
    )
    U.deepStrictEqual(
      await pipe(
        _.right('a'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.left('foo')
    )
  })

  it('chainFirst', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right('foo'),
        _.chainFirst((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right('foo')
    )
  })

  it('chainFirstW', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<number, string>('foo'),
        _.chainFirstW((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right('foo')
    )
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.right(_.right('a')), _.flatten)(), E.right('a'))
  })

  it('bimap', async () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2

    U.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))(), E.right(false))
    U.deepStrictEqual(await pipe(_.left('foo'), _.bimap(f, g))(), E.left(3))
  })

  it('mapLeft', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.left(1), _.mapLeft(double))(), E.left(2))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicativeTaskValidation', async () => {
    const A = _.getApplicativeTaskValidation(T.ApplicativePar, S.Semigroup)
    U.deepStrictEqual(await sequenceT(A)(_.left('a'), _.left('b'))(), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getTaskValidation(S.Semigroup)
    U.deepStrictEqual(await sequenceT(AV)(_.left('a'), _.left('b'))(), E.left('ab'))
  })

  it('getAltTaskValidation', async () => {
    const A = _.getAltTaskValidation(S.Semigroup)
    U.deepStrictEqual(await A.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
    // tslint:disable-next-line: deprecation
    const AV = _.getTaskValidation(S.Semigroup)
    U.deepStrictEqual(await AV.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
  })

  describe('getTaskValidation', () => {
    // tslint:disable-next-line: deprecation
    const TV = _.getTaskValidation(S.Semigroup)

    it('ap', async () => {
      const fab = _.left('a')
      const fa = _.left('b')
      U.deepStrictEqual(await TV.ap(fab, fa)(), E.left('ab'))
    })

    it('alt', async () => {
      U.deepStrictEqual(await TV.alt(_.right(1), () => _.right(2))(), E.right(1))
      U.deepStrictEqual(await TV.alt(_.left('a'), () => _.right(2))(), E.right(2))
      U.deepStrictEqual(await TV.alt(_.right(1), () => _.left('b'))(), E.right(1))
      U.deepStrictEqual(await TV.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
    })
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)

    it('compact', async () => {
      U.deepStrictEqual(await C.compact(_.right(some(1)))(), E.right(1))
    })

    it('separate', async () => {
      const s1 = C.separate(_.left('a'))
      U.deepStrictEqual(await left(s1)(), E.left('a'))
      U.deepStrictEqual(await right(s1)(), E.left('a'))
      const s2 = C.separate(_.right(E.left('a')))
      U.deepStrictEqual(await left(s2)(), E.right('a'))
      U.deepStrictEqual(await right(s2)(), E.left(''))
      const s3 = C.separate(_.right(E.right(1)))
      U.deepStrictEqual(await left(s3)(), E.left(''))
      U.deepStrictEqual(await right(s3)(), E.right(1))
    })
  })

  describe('getFilterable', () => {
    const F_ = _.getFilterable(RA.getMonoid<string>())
    // tslint:disable-next-line: deprecation
    const { filter, filterMap, partition, partitionMap } = pipeable(F_)

    it('filter', async () => {
      U.deepStrictEqual(
        await pipe(
          _.right(1),
          filter((n) => n > 0)
        )(),
        await _.right(1)()
      )
      U.deepStrictEqual(
        await pipe(
          _.right(-1),
          filter((n) => n > 0)
        )(),
        await _.left([])()
      )
      U.deepStrictEqual(
        await pipe(
          _.left(['a']),
          filter((n) => n > 0)
        )(),
        await _.left(['a'])()
      )
    })

    it('filterMap', async () => {
      U.deepStrictEqual(
        await pipe(
          _.right('aaa'),
          filterMap((s) => (s.length > 1 ? some(s.length) : none))
        )(),
        E.right(3)
      )
      U.deepStrictEqual(
        await pipe(
          _.right('a'),
          filterMap((s) => (s.length > 1 ? some(s.length) : none))
        )(),
        E.left([])
      )
      U.deepStrictEqual(
        await pipe(
          _.left<ReadonlyArray<string>, string>(['e']),
          filterMap((s) => (s.length > 1 ? some(s.length) : none))
        )(),
        E.left(['e'])
      )
    })

    it('partition', async () => {
      const s = pipe(
        _.right('a'),
        partition((s) => s.length > 2)
      )
      U.deepStrictEqual(await left(s)(), E.right('a'))
      U.deepStrictEqual(await right(s)(), E.left([]))
    })

    it('partitionMap', async () => {
      const s = pipe(
        _.right('a'),
        partitionMap((s) => (s.length > 2 ? E.right(s.length) : E.left(false)))
      )
      U.deepStrictEqual(await left(s)(), E.right(false))
      U.deepStrictEqual(await right(s)(), E.left([]))
    })
  })

  describe('getSemigroup', () => {
    it('concat', async () => {
      // tslint:disable-next-line: deprecation
      const S = _.getSemigroup<string, number>(N.SemigroupSum)
      U.deepStrictEqual(await S.concat(_.left('a'), _.left('b'))(), E.left('a'))
      U.deepStrictEqual(await S.concat(_.left('a'), _.right(2))(), E.right(2))
      U.deepStrictEqual(await S.concat(_.right(1), _.left('b'))(), E.right(1))
      U.deepStrictEqual(await S.concat(_.right(1), _.right(2))(), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getApplyMonoid(monoidString)

    it('concat (right)', async () => {
      return U.deepStrictEqual(await M.concat(_.right('a'), _.right('b'))(), E.right('ab'))
    })

    it('concat (left)', async () => {
      return U.deepStrictEqual(await M.concat(_.right('a'), _.left('b'))(), E.left('b'))
    })

    it('empty (right)', async () => {
      return U.deepStrictEqual(await M.concat(_.right('a'), M.empty)(), E.right('a'))
    })

    it('empty (left)', async () => {
      return U.deepStrictEqual(await M.concat(M.empty, _.right('a'))(), E.right('a'))
    })
  })

  it('applicativeTaskEitherSeq', async () => {
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa())
  })

  it('applicativeTaskEitherPar', async () => {
    await U.assertPar(_.ApplicativePar, _.FromTask, (fa) => fa())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('taskify', async () => {
    const api1 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    U.deepStrictEqual(await _.taskify(api1)('foo')(), E.right('ok'))
    U.deepStrictEqual(await _.taskify(api2)('foo')(), E.right('ok'))
    U.deepStrictEqual(await _.taskify(api3)('foo')(), E.left(new Error('ko')))
  })

  it('composed taskify', async () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = _.taskify(api)()

    U.deepStrictEqual(await taskApi(), E.right('ok'))
    U.deepStrictEqual(await taskApi(), E.right('ok'))
  })

  describe('bracket', () => {
    // tslint:disable-next-line: readonly-array
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.rightIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireFailure, useSuccess, releaseSuccess)(), E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseFailure)(), E.left('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useSuccess, releaseFailure)(), E.left('release failure'))
    })
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('filterOrElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )(),
      E.right(12)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )(),
      E.left('a')
    )
  })

  it('orElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.left('foo'),
        _.orElse((l) => _.right(l.length))
      )(),
      E.right(3)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(1),
        _.orElse(() => _.right(2))
      )(),
      E.right(1)
    )
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))(), E.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))(), E.right('a'))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainEitherK(f))(), E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainIOEitherK(f))(), E.right(1))
  })

  it('tryCatchK', async () => {
    const f = (n: number) => {
      if (n > 0) {
        return Promise.resolve(n * 2)
      }
      return Promise.reject('negative')
    }
    const g = _.tryCatchK(f, identity)
    U.deepStrictEqual(await g(1)(), E.right(2))
    U.deepStrictEqual(await g(-1)(), E.left('negative'))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('rightIO', async () => {
    const io = () => 1
    const fa = _.rightIO(io)
    U.deepStrictEqual(await fa(), E.right(1))
  })

  it('leftIO', async () => {
    U.deepStrictEqual(await _.leftIO(I.of(1))(), E.left(1))
  })

  it('tryCatch', async () => {
    U.deepStrictEqual(
      await _.tryCatch(
        () => Promise.resolve(1),
        () => 'error'
      )(),
      E.right(1)
    )
    U.deepStrictEqual(
      await _.tryCatch(
        () => Promise.reject(undefined),
        () => 'error'
      )(),
      E.left('error')
    )
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.right(1))(), E.right(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('foo'))(), E.left('foo'))
  })

  it('fromOption', async () => {
    U.deepStrictEqual(
      await pipe(
        none,
        _.fromOption(() => 'none')
      )(),
      E.left('none')
    )
    U.deepStrictEqual(
      await pipe(
        some(1),
        _.fromOption(() => 'none')
      )(),
      E.right(1)
    )
  })

  it('fromPredicate', async () => {
    const gt2 = _.fromPredicate(
      (n: number) => n >= 2,
      (n) => `Invalid number ${n}`
    )
    U.deepStrictEqual(await gt2(3)(), E.right(3))
    U.deepStrictEqual(await gt2(1)(), E.left('Invalid number 1'))
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    U.deepStrictEqual(await _.fromPredicate(isNumber, () => 'not a number')(4)(), E.right(4))
  })

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('sequenceArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const right = (n: number): _.TaskEither<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskEither<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceArray)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceArray)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceArray)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  it('sequenceSeqArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const right = (n: number): _.TaskEither<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.TaskEither<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceSeqArray)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceSeqArray)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceSeqArray)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
