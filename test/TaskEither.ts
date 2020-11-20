import * as assert from 'assert'
import { sequenceT } from '../src/Apply'
import * as A from '../src/Array'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipeable } from '../src/pipeable'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import * as T from '../src/Task'
import * as _ from '../src/TaskEither'
import { assertPar, assertSeq } from './util'

describe('TaskEither', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('alt', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.left('a'),
        _.alt(() => _.right(1))
      )(),
      E.right(1)
    )
  })

  it('map', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(_.right(1), _.map(double))(), E.right(2))
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(_.right(double), _.ap(_.right(1)))(), E.right(2))
  })

  it('apFirst', async () => {
    assert.deepStrictEqual(await pipe(_.right('a'), _.apFirst(_.right('b')))(), E.right('a'))
  })

  it('apSecond', async () => {
    assert.deepStrictEqual(await pipe(_.right('a'), _.apSecond(_.right('b')))(), E.right('b'))
  })

  it('chain', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right('foo'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right(3)
    )
    assert.deepStrictEqual(
      await pipe(
        _.right('a'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.left('foo')
    )
  })

  it('chainFirst', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right('foo'),
        _.chainFirst((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right('foo')
    )
  })

  it('chainFirstW', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right<number, string>('foo'),
        _.chainFirstW((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )(),
      E.right('foo')
    )
  })

  it('flatten', async () => {
    assert.deepStrictEqual(await pipe(_.right(_.right('a')), _.flatten)(), E.right('a'))
  })

  it('bimap', async () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2

    assert.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))(), E.right(false))
    assert.deepStrictEqual(await pipe(_.left('foo'), _.bimap(f, g))(), E.left(3))
  })

  it('mapLeft', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(_.left(1), _.mapLeft(double))(), E.left(2))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicativeTaskValidation', async () => {
    const A = _.getApplicativeTaskValidation(T.ApplicativePar, semigroupString)
    assert.deepStrictEqual(await sequenceT(A)(_.left('a'), _.left('b'))(), E.left('ab'))
    const AV = _.getTaskValidation(semigroupString)
    assert.deepStrictEqual(await sequenceT(AV)(_.left('a'), _.left('b'))(), E.left('ab'))
  })

  it('getAltTaskValidation', async () => {
    const A = _.getAltTaskValidation(semigroupString)
    assert.deepStrictEqual(await A.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
    const AV = _.getTaskValidation(semigroupString)
    assert.deepStrictEqual(await AV.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
  })

  describe('getTaskValidation', () => {
    const TV = _.getTaskValidation(semigroupString)

    it('ap', async () => {
      const fab = _.left('a')
      const fa = _.left('b')
      assert.deepStrictEqual(await TV.ap(fab, fa)(), E.left('ab'))
    })

    it('alt', async () => {
      assert.deepStrictEqual(await TV.alt(_.right(1), () => _.right(2))(), E.right(1))
      assert.deepStrictEqual(await TV.alt(_.left('a'), () => _.right(2))(), E.right(2))
      assert.deepStrictEqual(await TV.alt(_.right(1), () => _.left('b'))(), E.right(1))
      assert.deepStrictEqual(await TV.alt(_.left('a'), () => _.left('b'))(), E.left('ab'))
    })
  })

  describe('getFilterable', () => {
    const F_ = _.getFilterable(A.getMonoid<string>())
    const { filter } = pipeable(F_)

    it('filter', async () => {
      assert.deepStrictEqual(
        await pipe(
          _.right(1),
          filter((n) => n > 0)
        )(),
        await _.right(1)()
      )
      assert.deepStrictEqual(
        await pipe(
          _.right(-1),
          filter((n) => n > 0)
        )(),
        await _.left([])()
      )
      assert.deepStrictEqual(
        await pipe(
          _.left(['a']),
          filter((n) => n > 0)
        )(),
        await _.left(['a'])()
      )
    })
  })

  describe('getSemigroup', () => {
    it('concat', async () => {
      const S = _.getSemigroup<string, number>(semigroupSum)
      assert.deepStrictEqual(await S.concat(_.left('a'), _.left('b'))(), E.left('a'))
      assert.deepStrictEqual(await S.concat(_.left('a'), _.right(2))(), E.right(2))
      assert.deepStrictEqual(await S.concat(_.right(1), _.left('b'))(), E.right(1))
      assert.deepStrictEqual(await S.concat(_.right(1), _.right(2))(), E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidString)

    it('concat (right)', async () => {
      return assert.deepStrictEqual(await M.concat(_.right('a'), _.right('b'))(), E.right('ab'))
    })

    it('concat (left)', async () => {
      return assert.deepStrictEqual(await M.concat(_.right('a'), _.left('b'))(), E.left('b'))
    })

    it('empty (right)', async () => {
      return assert.deepStrictEqual(await M.concat(_.right('a'), M.empty)(), E.right('a'))
    })

    it('empty (left)', async () => {
      return assert.deepStrictEqual(await M.concat(M.empty, _.right('a'))(), E.right('a'))
    })
  })

  it('applicativeTaskEitherSeq', async () => {
    await assertSeq(_.ApplicativeSeq, { fromTask: _.fromTask }, (fa) => fa())
  })

  it('applicativeTaskEitherPar', async () => {
    await assertPar(_.ApplicativePar, { fromTask: _.fromTask }, (fa) => fa())
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
    assert.deepStrictEqual(await _.taskify(api1)('foo')(), E.right('ok'))
    assert.deepStrictEqual(await _.taskify(api2)('foo')(), E.right('ok'))
    assert.deepStrictEqual(await _.taskify(api3)('foo')(), E.left(new Error('ko')))
  })

  it('composed taskify', async () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = _.taskify(api)()

    assert.deepStrictEqual(await taskApi(), E.right('ok'))
    assert.deepStrictEqual(await taskApi(), E.right('ok'))
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
      assert.deepStrictEqual(await _.bracket(acquireFailure, useSuccess, releaseSuccess)(), E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      assert.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      assert.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseFailure)(), E.left('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      assert.deepStrictEqual(await _.bracket(acquireSuccess, useSuccess, releaseFailure)(), E.left('release failure'))
    })
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('filterOrElse', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )(),
      E.right(12)
    )
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
      await pipe(
        _.left('foo'),
        _.orElse((l) => _.right(l.length))
      )(),
      E.right(3)
    )
    assert.deepStrictEqual(
      await pipe(
        _.right(1),
        _.orElse(() => _.right(2))
      )(),
      E.right(1)
    )
  })

  it('swap', async () => {
    assert.deepStrictEqual(await _.swap(_.right(1))(), E.left(1))
    assert.deepStrictEqual(await _.swap(_.left('a'))(), E.right('a'))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    assert.deepStrictEqual(await pipe(_.right('a'), _.chainEitherK(f))(), E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    assert.deepStrictEqual(await pipe(_.right('a'), _.chainIOEitherK(f))(), E.right(1))
  })

  describe('tryCatchK', () => {
    const handleRejection = () => 'rejected'

    it('resolving', async () => {
      const fOk = (n: number, s: string) => Promise.resolve(n + s.length)
      return assert.deepStrictEqual(await _.tryCatchK(fOk, handleRejection)(2, '1')(), E.right(3))
    })

    it('rejecting', async () => {
      const fReject = () => Promise.reject()
      return assert.deepStrictEqual(await _.tryCatchK(fReject, handleRejection)()(), E.left('rejected'))
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('rightIO', async () => {
    const io = () => 1
    const fa = _.rightIO(io)
    assert.deepStrictEqual(await fa(), E.right(1))
  })

  it('leftIO', async () => {
    assert.deepStrictEqual(await _.leftIO(I.of(1))(), E.left(1))
  })

  it('tryCatch', async () => {
    assert.deepStrictEqual(
      await _.tryCatch(
        () => Promise.resolve(1),
        () => 'error'
      )(),
      E.right(1)
    )
    assert.deepStrictEqual(
      await _.tryCatch(
        () => Promise.reject(undefined),
        () => 'error'
      )(),
      E.left('error')
    )
  })

  it('fromIOEither', async () => {
    assert.deepStrictEqual(await _.fromIOEither(() => E.right(1))(), E.right(1))
    assert.deepStrictEqual(await _.fromIOEither(() => E.left('foo'))(), E.left('foo'))
  })

  it('fromOption', async () => {
    assert.deepStrictEqual(
      await pipe(
        none,
        _.fromOption(() => 'none')
      )(),
      E.left('none')
    )
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(await gt2(3)(), E.right(3))
    assert.deepStrictEqual(await gt2(1)(), E.left('Invalid number 1'))
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    assert.deepStrictEqual(await _.fromPredicate(isNumber, () => 'not a number')(4)(), E.right(4))
  })

  it('do notation', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right<string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', async () => {
    assert.deepStrictEqual(
      await pipe(_.right<string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(),
      E.right({ a: 1, b: 'b' })
    )
  })

  describe('array utils', () => {
    it('sequenceArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceArray)(), E.right(arr))
      assert.deepStrictEqual(
        await pipe(
          arr,
          A.map(
            _.fromPredicate(
              (x) => x > 5,
              () => 'a'
            )
          ),
          _.sequenceArray
        )(),
        E.left('a')
      )
    })

    it('traverseArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, _.traverseArray(_.of))(), E.right(arr))
      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseArray(
            _.fromPredicate(
              (x) => x > 5,
              () => 'a'
            )
          )
        )(),
        E.left('a')
      )
    })

    it('sequenceSeqArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceSeqArray)(), E.right(arr))
      assert.deepStrictEqual(
        await pipe(
          arr,
          A.map(
            _.fromPredicate(
              (x) => x > 5,
              () => 'a'
            )
          ),
          _.sequenceSeqArray
        )(),
        E.left('a')
      )
    })

    it('traverseSeqArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, _.traverseSeqArray(_.of))(), E.right(arr))
      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseSeqArray(
            _.fromPredicate(
              (x) => x > 5,
              () => 'a'
            )
          )
        )(),
        E.left('a')
      )
    })
  })
})
