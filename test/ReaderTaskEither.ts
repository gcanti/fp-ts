import * as assert from 'assert'
import * as A from '../src/Array'
import * as E from '../src/Either'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidSum } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipe } from '../src/function'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as _ from '../src/ReaderTaskEither'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import { task } from '../src/Task'
import * as TE from '../src/TaskEither'
import { readerTask } from '../src'

describe('ReaderTaskEither', () => {
  describe('pipeables', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await _.run(pipe(_.right(1), _.map(double)), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const x = await _.run(pipe(_.right(double), _.ap(_.right(1))), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('apFirst', async () => {
      const x = await _.run(pipe(_.right('a'), _.apFirst(_.right('b'))), {})
      assert.deepStrictEqual(x, E.right('a'))
    })

    it('apSecond', async () => {
      const x = await _.run(pipe(_.right('a'), _.apSecond(_.right('b'))), {})
      assert.deepStrictEqual(x, E.right('b'))
    })

    it('chain', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      const e1 = await _.run(pipe(_.right('aaa'), _.chain(f)), {})
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await _.run(pipe(_.right('a'), _.chain(f)), {})
      assert.deepStrictEqual(e2, E.left('b'))
    })

    it('chainFirst', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('b'))
      const e = await _.run(pipe(_.right('aaa'), _.chainFirst(f)), {})
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('flatten', async () => {
      const e = await _.run(pipe(_.right(_.right('a')), _.flatten), {})
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      const e1 = await _.run(pipe(_.right(1), _.bimap(f, g)), {})
      assert.deepStrictEqual(e1, E.right(false))
      const e2 = await _.run(pipe(_.left('error'), _.bimap(f, g)), {})
      assert.deepStrictEqual(e2, E.left(5))
    })

    it('mapLeft', async () => {
      const len = (s: string): number => s.length
      const e1 = await _.run(pipe(_.right(1), _.mapLeft(len)), {})
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.run(pipe(_.left('err'), _.mapLeft(len)), {})
      assert.deepStrictEqual(e2, E.left(3))
    })

    it('alt', async () => {
      const e1 = await _.run(
        pipe(
          _.right(1),
          _.alt(() => _.right(2))
        ),
        {}
      )
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.run(
        pipe(
          _.left('a'),
          _.alt(() => _.right(2))
        ),
        {}
      )
      assert.deepStrictEqual(e2, E.right(2))
      const e3 = await _.run(
        pipe(
          _.left('a'),
          _.alt(() => _.left('b'))
        ),
        {}
      )
      assert.deepStrictEqual(e3, E.left('b'))
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      const e1 = await _.run(gt2(3), {})
      const e2 = await _.run(gt2(1), {})
      const e3 = await _.run(isNumber(4), {})
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
    })

    it('fromEither', async () => {
      const e1 = await _.run(_.fromEither(E.right(1)), {})
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.run(_.fromEither(E.left('a')), {})
      assert.deepStrictEqual(e2, E.left('a'))
    })

    it('fromOption', async () => {
      const e1 = await _.run(_.fromOption(() => 'none')(none), {})
      assert.deepStrictEqual(e1, E.left('none'))
      const e2 = await _.run(_.fromOption(() => 'none')(some(1)), {})
      assert.deepStrictEqual(e2, E.right(1))
    })

    it('filterOrElse', async () => {
      const e1 = await _.run(
        pipe(
          _.right(12),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        ),
        {}
      )
      assert.deepStrictEqual(e1, E.right(12))

      const e2 = await _.run(
        pipe(
          _.right(8),
          _.filterOrElse(
            (n) => n > 10,
            () => 'a'
          )
        ),
        {}
      )
      assert.deepStrictEqual(e2, E.left('a'))
    })
  })

  it('ask', async () => {
    const e = await _.run(_.ask<number>(), 1)
    return assert.deepStrictEqual(e, E.right(1))
  })

  it('asks', async () => {
    const e = await _.run(
      _.asks((s: string) => s.length),
      'foo'
    )
    return assert.deepStrictEqual(e, E.right(3))
  })

  it('local', async () => {
    const len = (s: string): number => s.length
    const e = await _.run(
      pipe(
        _.asks((n: number) => n + 1),
        _.local(len)
      ),
      'aaa'
    )
    assert.deepStrictEqual(e, E.right(4))
  })

  it('leftTask', async () => {
    const e = await _.run(_.leftTask(task.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.run(_.rightTask(task.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReaderTask', async () => {
    const e = await _.run(_.leftReaderTask(readerTask.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightReaderTask', async () => {
    const e = await _.run(_.rightReaderTask(readerTask.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('rightReader', async () => {
    const e = await _.run(_.rightReader(R.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReader', async () => {
    const e = await _.run(_.leftReader(R.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.run(_.fromTaskEither(TE.taskEither.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.run(_.leftIO(I.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.run(
      _.fromIOEither(() => E.right(1)),
      {}
    )
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(
      _.fromIOEither(() => E.left('error')),
      {}
    )
    assert.deepStrictEqual(e2, E.left('error'))
  })

  it('fold', async () => {
    const fold = _.fold(
      (l: string) => R.of(task.of(l.length)),
      (a: number) => R.of(task.of(a * 2))
    )
    const e1 = await fold(_.right(1))({})()
    assert.deepStrictEqual(e1, 2)
    const e2 = await fold(_.left('err'))({})()
    assert.deepStrictEqual(e2, 3)
  })

  it('getOrElse', async () => {
    const e1 = await pipe(
      _.right(1),
      _.getOrElse((l: string) => R.of(task.of(l.length)))
    )({})()
    assert.deepStrictEqual(e1, 1)
    const e2 = await pipe(
      _.left('err'),
      _.getOrElse((l: string) => R.of(task.of(l.length)))
    )({})()
    assert.deepStrictEqual(e2, 3)
  })

  it('orElse', async () => {
    const e1 = await _.run(
      pipe(
        _.right(1),
        _.orElse((s: string) => _.right(s.length))
      ),
      {}
    )
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(
      pipe(
        _.left('error'),
        _.orElse((s) => _.right(s.length))
      ),
      {}
    )
    assert.deepStrictEqual(e2, E.right(5))
  })

  it('applicativeReaderTaskEitherPar', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTaskEither<{}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceParallel = A.sequence(_.applicativeReaderTaskEitherPar)
    const ns = await _.run(sequenceParallel([t1, t2]), {})
    assert.deepStrictEqual(ns, E.right([3, 4]))
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('applicativeReaderTaskEitherSeq', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTaskEither<{}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceSeries = A.sequence(_.applicativeReaderTaskEitherSeq)
    const ns = await _.run(sequenceSeries([t1, t2]), {})
    assert.deepStrictEqual(ns, E.right([2, 4]))
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.run(
        _.fromIO(() => 1),
        {}
      )
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('swap', async () => {
    const e1 = await _.run(_.swap(_.right(1)), {})
    assert.deepStrictEqual(e1, E.left(1))
    const e2 = await _.run(_.swap(_.left('a')), {})
    assert.deepStrictEqual(e2, E.right('a'))
  })

  describe('getSemigroup', () => {
    it('concat', async () => {
      const S = _.getSemigroup(semigroupSum)
      const e1 = await _.run(S.concat(_.left('a'), _.left('b')), {})
      assert.deepStrictEqual(e1, E.left('a'))

      const e2 = await _.run(S.concat(_.left('a'), _.right(2)), {})
      assert.deepStrictEqual(e2, E.right(2))

      const e3 = await _.run(S.concat(_.right(1), _.left('b')), {})
      assert.deepStrictEqual(e3, E.right(1))

      const e4 = await _.run(S.concat(_.right(1), _.right(2)), {})
      assert.deepStrictEqual(e4, E.right(3))
    })
  })

  describe('getApplyMonoid', () => {
    const M = _.getApplyMonoid(monoidSum)

    it('concat (right)', async () => {
      const x = await _.run(M.concat(_.right(1), _.right(2)), {})
      return assert.deepStrictEqual(x, E.right(3))
    })

    it('concat (left)', async () => {
      const x = await _.run(M.concat(_.right(1), _.left('b')), {})
      return assert.deepStrictEqual(x, E.left('b'))
    })

    it('empty (right)', async () => {
      const x = await _.run(M.concat(_.right(1), M.empty), {})
      return assert.deepStrictEqual(x, E.right(1))
    })

    it('empty (left)', async () => {
      const x = await _.run(M.concat(M.empty, _.right(1)), {})
      return assert.deepStrictEqual(x, E.right(1))
    })
  })

  it('fromReaderEither', async () => {
    const e1 = await _.run(_.fromReaderEither(RE.left('a')), {})
    assert.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.run(_.fromReaderEither(RE.right(1)), {})
    assert.deepStrictEqual(e2, E.right(1))
  })

  describe('getReaderTaskValidation', () => {
    const RTV = _.getReaderTaskValidation(semigroupString)
    it('of', async () => {
      const e = await RTV.of(1)({})()
      assert.deepStrictEqual(e, E.right(1))
    })

    it('throwError', async () => {
      const e = await RTV.throwError('error')({})()
      assert.deepStrictEqual(e, E.left('error'))
    })

    it('traverse', async () => {
      const e1 = await pipe([1, 2, 3], A.traverse(RTV)(RTV.of))({})()
      assert.deepStrictEqual(e1, E.right([1, 2, 3]))
      const e2 = await pipe(
        [1, 2, 3],
        A.traverse(RTV)((v) => RTV.throwError(`${v}`))
      )({})()
      assert.deepStrictEqual(e2, E.left('123'))
      const e3 = await pipe(
        [1, 2, 3],
        A.traverse(RTV)((v) => (v % 2 === 1 ? RTV.throwError(`${v}`) : RTV.of(v)))
      )({})()
      assert.deepStrictEqual(e3, E.left('13'))
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
      _.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      const e = await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      assert.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      const e = await _.bracket(acquireSuccess, useFailure, releaseFailure)(undefined)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)(undefined)()
      assert.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      const e = await _.bracket(acquireSuccess, useSuccess, releaseFailure)(undefined)()
      assert.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await _.run(pipe(_.right('a'), _.chainEitherK(f)), undefined)
    assert.deepStrictEqual(x, E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await _.run(pipe(_.right('a'), _.chainIOEitherK(f)), undefined)
    assert.deepStrictEqual(x, E.right(1))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    const x = await _.run(pipe(_.right('a'), _.chainTaskEitherK(f)), undefined)
    assert.deepStrictEqual(x, E.right(1))
  })
})
