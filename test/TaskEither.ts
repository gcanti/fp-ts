import * as assert from 'assert'
import { array } from '../src/Array'
import * as E from '../src/Either'
import { io } from '../src/IO'
import { monoidString } from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'
import * as T from '../src/Task'
import * as _ from '../src/TaskEither'

const delay = <A>(millis: number, a: A): T.Task<A> => T.delay(millis, T.task.of(a))

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
    const e1 = await _.orElse(_.left('foo'), l => _.right(l.length))()
    const e2 = await _.orElse(_.right(1), () => _.right(2))()
    assert.deepStrictEqual(e1, E.right(3))
    assert.deepStrictEqual(e2, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(io.of(1))()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('tryCatch', async () => {
    const e1 = await _.tryCatch(() => Promise.resolve(1), () => 'error')()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.tryCatch(() => Promise.reject(undefined), () => 'error')()
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
    const gt2 = _.fromPredicate((n: number) => n >= 2, n => `Invalid number ${n}`)
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
      const e1 = await S.concat(_.leftTask(delay(10, 'a')), _.leftTask(delay(10, 'b')))()
      assert.deepStrictEqual(e1, E.left('a'))

      const e2 = await S.concat(_.leftTask(delay(10, 'a')), _.rightTask(delay(10, 2)))()
      assert.deepStrictEqual(e2, E.right(2))

      const e3 = await S.concat(_.rightTask(delay(10, 1)), _.leftTask(delay(10, 'b')))()
      assert.deepStrictEqual(e3, E.right(1))

      const e4 = await S.concat(_.rightTask(delay(10, 1)), _.rightTask(delay(10, 2)))()
      assert.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidString)

    it('concat (right)', async () => {
      const x = await M.concat(_.rightTask(delay(10, 'a')), _.rightTask(delay(10, 'b')))()
      return assert.deepStrictEqual(x, E.right('ab'))
    })

    it('concat (left)', async () => {
      const x = await M.concat(_.rightTask(delay(10, 'a')), _.leftTask(delay(10, 'b')))()
      return assert.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', async () => {
      const x = await M.concat(_.rightTask(delay(10, 'a')), M.empty)()
      return assert.deepStrictEqual(x, E.right('a'))
    })

    it('empty (left)', async () => {
      const x = await M.concat(M.empty, _.rightTask(delay(10, 'a')))()
      return assert.deepStrictEqual(x, E.right('a'))
    })
  })

  it('sequence parallel', async () => {
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
    const isNumber = (u: string | number): u is number => typeof u === 'number'

    const e1 = await _.filterOrElse(_.right(12), n => n > 10, () => 'bar')()
    assert.deepStrictEqual(e1, E.right(12))
    const e2 = await _.filterOrElse(_.right(7), n => n > 10, () => 'bar')()
    assert.deepStrictEqual(e2, E.left('bar'))
    const e3 = await _.filterOrElse(_.left('foo'), n => n > 10, () => 'bar')()
    assert.deepStrictEqual(e3, E.left('foo'))
    const e4 = await _.filterOrElse(_.right(7), n => n > 10, n => `invalid ${n}`)()
    assert.deepStrictEqual(e4, E.left('invalid 7'))
    const e5 = await _.filterOrElse(_.right(12), isNumber, () => 'not a number')()
    assert.deepStrictEqual(e5, E.right(12))
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

  it('tryCatch', async () => {
    const onrejected = (e: any) => `Error is: ${String(e)}`
    const e1 = await _.tryCatch(() => Promise.resolve(1), onrejected)()
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.tryCatch(() => Promise.reject('ouch!'), onrejected)()
    assert.deepStrictEqual(e2, E.left('Error is: ouch!'))
  })
})
