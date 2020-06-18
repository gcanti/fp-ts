import * as assert from 'assert'
import * as A from '../src/Array'
import * as E from '../src/Either'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipeable } from '../src/pipeable'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import * as _ from '../src/TaskEither'
import * as IE from '../src/IOEither'
import { pipe } from '../src/function'

describe('TaskEither', () => {
  describe('pipeables', () => {
    it('alt', async () => {
      const x = await pipe(
        _.left('a'),
        _.alt(() => _.right(1))
      )()
      assert.deepStrictEqual(x, E.right(1))
    })

    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.right(1), _.map(double))()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.right(double), _.ap(_.right(1)))()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('apFirst', async () => {
      const x = await pipe(_.right('a'), _.apFirst(_.right('b')))()
      assert.deepStrictEqual(x, E.right('a'))
    })

    it('apSecond', async () => {
      const x = await pipe(_.right('a'), _.apSecond(_.right('b')))()
      assert.deepStrictEqual(x, E.right('b'))
    })

    it('chain', async () => {
      const e1 = await pipe(
        _.right('foo'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await pipe(
        _.right('a'),
        _.chain((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )()
      assert.deepStrictEqual(e2, E.left('foo'))
    })

    it('chainFirst', async () => {
      const e1 = await pipe(
        _.right('foo'),
        _.chainFirst((a) => (a.length > 2 ? _.right(a.length) : _.left('foo')))
      )()
      assert.deepStrictEqual(e1, E.right('foo'))
    })

    it('flatten', async () => {
      const e1 = await pipe(_.right(_.right('a')), _.flatten)()
      assert.deepStrictEqual(e1, E.right('a'))
    })

    it('bimap', async () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2

      const e1 = await pipe(_.right(1), _.bimap(f, g))()
      assert.deepStrictEqual(e1, E.right(false))
      const e2 = await pipe(_.left('foo'), _.bimap(f, g))()
      assert.deepStrictEqual(e2, E.left(3))
    })

    it('mapLeft', async () => {
      const double = (n: number): number => n * 2
      const e = await pipe(_.left(1), _.mapLeft(double))()
      assert.deepStrictEqual(e, E.left(2))
    })

    it('fromPredicate', async () => {
      const gt2 = _.fromPredicate(
        (n: number) => n >= 2,
        (n) => `Invalid number ${n}`
      )
      const e1 = await gt2(3)()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await gt2(1)()
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const e3 = await _.fromPredicate(isNumber, () => 'not a number')(4)()
      assert.deepStrictEqual(e3, E.right(4))
    })

    it('filterOrElse', async () => {
      const e1 = await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )()
      assert.deepStrictEqual(e1, E.right(12))
      const e2 = await pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )()
      assert.deepStrictEqual(e2, E.left('a'))
    })

    it('fromOption', async () => {
      const e1 = await pipe(
        none,
        _.fromOption(() => 'none')
      )()
      assert.deepStrictEqual(e1, E.left('none'))
      const e2 = await pipe(
        some(1),
        _.fromOption(() => 'none')
      )()
      assert.deepStrictEqual(e2, E.right(1))
    })
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
      const e = await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      assert.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
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
      const e = await _.bracket(acquireSuccess, useSuccess, releaseFailure)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('orElse', async () => {
    const e1 = await pipe(
      _.left('foo'),
      _.orElse((l) => _.right(l.length))
    )()
    assert.deepStrictEqual(e1, E.right(3))
    const e2 = await pipe(
      _.right(1),
      _.orElse(() => _.right(2))
    )()
    assert.deepStrictEqual(e2, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.of(1))()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('tryCatch', async () => {
    const e1 = await _.tryCatch(
      () => Promise.resolve(1),
      () => 'error'
    )()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.tryCatch(
      () => Promise.reject(undefined),
      () => 'error'
    )()
    assert.deepStrictEqual(e2, E.left('error'))
  })

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
    const e1 = await _.taskify(api1)('foo')()
    assert.deepStrictEqual(e1, E.right('ok'))
    const e2 = await _.taskify(api2)('foo')()
    assert.deepStrictEqual(e2, E.right('ok'))
    const e3 = await _.taskify(api3)('foo')()
    assert.deepStrictEqual(e3, E.left(new Error('ko')))
  })

  it('composed taskify', async () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = _.taskify(api)()

    const e1 = await taskApi()
    assert.deepStrictEqual(e1, E.right('ok'))
    const e2 = await taskApi()
    assert.deepStrictEqual(e2, E.right('ok'))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(() => E.right(1))()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.fromIOEither(() => E.left('foo'))()
    assert.deepStrictEqual(e2, E.left('foo'))
  })

  describe('getSemigroup', () => {
    it('concat', async () => {
      const S = _.getSemigroup<string, number>(semigroupSum)
      const e1 = await S.concat(_.left('a'), _.left('b'))()
      assert.deepStrictEqual(e1, E.left('a'))

      const e2 = await S.concat(_.left('a'), _.right(2))()
      assert.deepStrictEqual(e2, E.right(2))

      const e3 = await S.concat(_.right(1), _.left('b'))()
      assert.deepStrictEqual(e3, E.right(1))

      const e4 = await S.concat(_.right(1), _.right(2))()
      assert.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidString)

    it('concat (right)', async () => {
      const x = await M.concat(_.right('a'), _.right('b'))()
      return assert.deepStrictEqual(x, E.right('ab'))
    })

    it('concat (left)', async () => {
      const x = await M.concat(_.right('a'), _.left('b'))()
      return assert.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', async () => {
      const x = await M.concat(_.right('a'), M.empty)()
      return assert.deepStrictEqual(x, E.right('a'))
    })

    it('empty (left)', async () => {
      const x = await M.concat(M.empty, _.right('a'))()
      return assert.deepStrictEqual(x, E.right('a'))
    })
  })

  it('applicativeTaskEitherPar', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.TaskEither<void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceParallel = A.sequence(_.applicativeTaskEitherPar)
    const x = await sequenceParallel([t1, t2])()
    assert.deepStrictEqual(x, E.right([3, 4]))
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('applicativeTaskEitherSeq', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.TaskEither<void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceSeries = A.sequence(_.applicativeTaskEitherSeq)
    const x = await sequenceSeries([t1, t2])()
    assert.deepStrictEqual(x, E.right([2, 4]))
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('rightIO', async () => {
    const io = () => 1
    const fa = _.rightIO(io)
    const e = await fa()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('swap', async () => {
    const e1 = await _.swap(_.right(1))()
    assert.deepStrictEqual(e1, E.left(1))
    const e2 = await _.swap(_.left('a'))()
    assert.deepStrictEqual(e2, E.right('a'))
  })

  describe('getTaskValidation', () => {
    const TV = _.getTaskValidation(semigroupString)

    it('ap', async () => {
      const fab = _.left('a')
      const fa = _.left('b')
      const e1 = await TV.ap(fab, fa)()
      assert.deepStrictEqual(e1, E.left('ab'))
    })

    it('alt', async () => {
      const e1 = await TV.alt(_.right(1), () => _.right(2))()
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await TV.alt(_.left('a'), () => _.right(2))()
      assert.deepStrictEqual(e2, E.right(2))
      const e3 = await TV.alt(_.right(1), () => _.left('b'))()
      assert.deepStrictEqual(e3, E.right(1))
      const e4 = await TV.alt(_.left('a'), () => _.left('b'))()
      assert.deepStrictEqual(e4, E.left('ab'))
    })
  })

  describe('getFilterable', () => {
    const F_ = _.getFilterable(A.getMonoid<string>())
    const { filter } = pipeable(F_)

    it('filter', async () => {
      const r1 = pipe(
        _.right(1),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(await r1(), await _.right(1)())
      const r2 = pipe(
        _.right(-1),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(await r2(), await _.left([])())
      const r3 = pipe(
        _.left(['a']),
        filter((n) => n > 0)
      )
      assert.deepStrictEqual(await r3(), await _.left(['a'])())
    })
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await pipe(_.right('a'), _.chainEitherK(f))()
    assert.deepStrictEqual(x, E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))()
    assert.deepStrictEqual(x, E.right(1))
  })

  describe('tryCatchK', () => {
    const handleRejection = () => 'rejected'

    it('resolving', () => {
      const fOk = (n: number, s: string) => Promise.resolve(n + s.length)
      return _.tryCatchK(fOk, handleRejection)(2, '1')().then((x) => assert.deepStrictEqual(x, E.right(3)))
    })

    it('rejecting', () => {
      const fReject = () => Promise.reject()
      return _.tryCatchK(fReject, handleRejection)()().then((x) => assert.deepStrictEqual(x, E.left('rejected')))
    })
  })
})
