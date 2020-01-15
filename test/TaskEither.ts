import * as assert from 'assert'
import { array, getMonoid } from '../src/Array'
import * as E from '../src/Either'
import { io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipe, pipeable } from '../src/pipeable'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import * as _ from '../src/TaskEither'
import { ioEither } from '../src/IOEither'

describe('TaskEither', () => {
  describe('Monad', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await _.taskEither.map(_.right(1), double)()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const mab = _.right(double)
      const ma = _.right(1)
      const x = await _.taskEither.ap(mab, ma)()
      assert.deepStrictEqual(x, E.right(2))
    })

    it('chain', async () => {
      const e1 = await _.taskEither.chain(_.right('foo'), a => (a.length > 2 ? _.right(a.length) : _.left('foo')))()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await _.taskEither.chain(_.right('a'), a => (a.length > 2 ? _.right(a.length) : _.left('foo')))()
      assert.deepStrictEqual(e2, E.left('foo'))
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
      _.taskEither.fromIO(() => {
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

  describe('Bifunctor', () => {
    it('bimap', async () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2

      const e1 = await _.taskEither.bimap(_.right(1), f, g)()
      assert.deepStrictEqual(e1, E.right(false))
      const e2 = await _.taskEither.bimap(_.left('foo'), f, g)()
      assert.deepStrictEqual(e2, E.left(3))
    })

    it('mapLeft', async () => {
      const double = (n: number): number => n * 2
      const e = await _.taskEither.mapLeft(_.left(1), double)()
      assert.deepStrictEqual(e, E.left(2))
    })
  })

  it('orElse', async () => {
    const e1 = await pipe(
      _.left('foo'),
      _.orElse(l => _.right(l.length))
    )()
    assert.deepStrictEqual(e1, E.right(3))
    const e2 = await pipe(
      _.right(1),
      _.orElse(() => _.right(2))
    )()
    assert.deepStrictEqual(e2, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(io.of(1))()
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

  it('fromPredicate', async () => {
    const gt2 = _.fromPredicate(
      (n: number) => n >= 2,
      n => `Invalid number ${n}`
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

  it('sequence parallel', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.TaskEither<void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = _.taskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = _.taskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(_.taskEither)
    const x = await sequenceParallel([t1, t2])()
    assert.deepStrictEqual(x, E.right([3, 4]))
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('sequence series', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.TaskEither<void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = _.taskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = _.taskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(_.taskEitherSeq)
    const x = await sequenceSeries([t1, t2])()
    assert.deepStrictEqual(x, E.right([2, 4]))
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('filterOrElse', async () => {
    const e1 = await pipe(
      _.right(12),
      _.filterOrElse(
        n => n > 10,
        () => 'a'
      )
    )()
    assert.deepStrictEqual(e1, E.right(12))
    const e2 = await pipe(
      _.right(7),
      _.filterOrElse(
        n => n > 10,
        () => 'a'
      )
    )()
    assert.deepStrictEqual(e2, E.left('a'))
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const io = () => 1
      const fa = _.taskEither.fromIO(io)
      const e = await fa()
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('swap', async () => {
    const e1 = await _.swap(_.right(1))()
    assert.deepStrictEqual(e1, E.left(1))
    const e2 = await _.swap(_.left('a'))()
    assert.deepStrictEqual(e2, E.right('a'))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'none')(none)()
    assert.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.fromOption(() => 'none')(some(1))()
    assert.deepStrictEqual(e2, E.right(1))
  })

  describe('getTaskValidation', () => {
    const TV = _.getTaskValidation(semigroupString)
    it('of', async () => {
      const e = await TV.of(1)()
      assert.deepStrictEqual(e, E.right(1))
    })

    it('map', async () => {
      const double = (n: number): number => n * 2
      const e1 = await TV.map(TV.of(1), double)()
      assert.deepStrictEqual(e1, E.right(2))
      const e2 = await TV.map(_.left('a'), double)()
      assert.deepStrictEqual(e2, E.left('a'))
    })

    it('ap', async () => {
      const fab = _.left('a')
      const fa = _.left('b')
      const e1 = await TV.ap(fab, fa)()
      assert.deepStrictEqual(e1, E.left('ab'))
    })

    it('chain', async () => {
      const e1 = await TV.chain(_.right(3), a => (a > 2 ? _.right(a) : _.left('b')))()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await TV.chain(_.right(1), a => (a > 2 ? _.right(a) : _.left('b')))()
      assert.deepStrictEqual(e2, E.left('b'))
      const e3 = await TV.chain(_.left('a'), a => (a > 2 ? _.right(a) : _.left('b')))()
      assert.deepStrictEqual(e3, E.left('a'))
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
    const F_ = {
      ..._.taskEither,
      ..._.getFilterable(getMonoid<string>())
    }
    const { filter } = pipeable(F_)

    it('filter', async () => {
      const r1 = pipe(
        _.right(1),
        filter(n => n > 0)
      )
      assert.deepStrictEqual(await r1(), await _.right(1)())
      const r2 = pipe(
        _.right(-1),
        filter(n => n > 0)
      )
      assert.deepStrictEqual(await r2(), await _.left([])())
      const r3 = pipe(
        _.left(['a']),
        filter(n => n > 0)
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
    const f = (s: string) => ioEither.of(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))()
    assert.deepStrictEqual(x, E.right(1))
  })
})
