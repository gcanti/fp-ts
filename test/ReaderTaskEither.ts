import * as assert from 'assert'
import { array } from '../src/Array'
import * as E from '../src/Either'
import { io } from '../src/IO'
import * as IE from '../src/IOEither'
import { monoidSum } from '../src/Monoid'
import { none, some } from '../src/Option'
import { pipe } from '../src/pipeable'
import { reader } from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as _ from '../src/ReaderTaskEither'
import { semigroupString, semigroupSum } from '../src/Semigroup'
import { task } from '../src/Task'
import * as TE from '../src/TaskEither'
import { readerTask } from '../src'

describe('ReaderTaskEither', () => {
  describe('Monad', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await _.run(_.readerTaskEither.map(_.right(1), double), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const mab = _.right(double)
      const ma = _.right(1)
      const x = await _.run(_.readerTaskEither.ap(mab, ma), {})
      assert.deepStrictEqual(x, E.right(2))
    })

    it('chain', async () => {
      const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
      const e1 = await _.run(_.readerTaskEither.chain(_.right('foo'), f), {})
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await _.run(_.readerTaskEither.chain(_.right('a'), f), {})
      assert.deepStrictEqual(e2, E.left('foo'))
    })
  })

  describe('Bifunctor', () => {
    it('bimap', async () => {
      const bimap = _.readerTaskEither.bimap
      const f = (s: string): number => s.length
      const g = (n: number): boolean => n > 2
      const e1 = await _.run(bimap(_.right(1), f, g), {})
      assert.deepStrictEqual(e1, E.right(false))
      const e2 = await _.run(bimap(_.left('error'), f, g), {})
      assert.deepStrictEqual(e2, E.left(5))
    })

    it('mapLeft', async () => {
      const len = (s: string): number => s.length
      const e1 = await _.run(_.readerTaskEither.mapLeft(_.right(1), len), {})
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.run(_.readerTaskEither.mapLeft(_.left('err'), len), {})
      assert.deepStrictEqual(e2, E.left(3))
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
    const e = await _.run(_.rightReader(reader.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReader', async () => {
    const e = await _.run(_.leftReader(reader.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.run(_.fromTaskEither(TE.taskEither.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.run(_.leftIO(io.of(1)), {})
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
      (l: string) => reader.of(task.of(l.length)),
      (a: number) => reader.of(task.of(a * 2))
    )
    const e1 = await fold(_.right(1))({})()
    assert.deepStrictEqual(e1, 2)
    const e2 = await fold(_.left('err'))({})()
    assert.deepStrictEqual(e2, 3)
  })

  it('getOrElse', async () => {
    const e1 = await pipe(
      _.right(1),
      _.getOrElse((l: string) => reader.of(task.of(l.length)))
    )({})()
    assert.deepStrictEqual(e1, 1)
    const e2 = await pipe(
      _.left('err'),
      _.getOrElse((l: string) => reader.of(task.of(l.length)))
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
        _.orElse(s => _.right(s.length))
      ),
      {}
    )
    assert.deepStrictEqual(e2, E.right(5))
  })

  it('alt', async () => {
    const e1 = await _.run(
      _.readerTaskEither.alt(_.right(1), () => _.right(2)),
      {}
    )
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(
      _.readerTaskEither.alt(_.left('a'), () => _.right(2)),
      {}
    )
    assert.deepStrictEqual(e2, E.right(2))
    const e3 = await _.run(
      _.readerTaskEither.alt(_.left('a'), () => _.left('b')),
      {}
    )
    assert.deepStrictEqual(e3, E.left('b'))
  })

  it('fromPredicate', async () => {
    const predicate = (n: number) => n >= 2
    const gt2 = _.fromPredicate(predicate, n => `Invalid number ${n}`)

    const refinement = (u: string | number): u is number => typeof u === 'number'
    const isNumber = _.fromPredicate(refinement, u => `Invalid number ${String(u)}`)

    const e1 = await _.run(gt2(3), {})
    const e2 = await _.run(gt2(1), {})
    const e3 = await _.run(isNumber(4), {})
    assert.deepStrictEqual(e1, E.right(3))
    assert.deepStrictEqual(e2, E.left('Invalid number 1'))
    assert.deepStrictEqual(e3, E.right(4))
  })

  it('sequence parallel', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTaskEither<{}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = _.readerTaskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = _.readerTaskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(_.readerTaskEither)
    const ns = await _.run(sequenceParallel([t1, t2]), {})
    assert.deepStrictEqual(ns, E.right([3, 4]))
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('sequence series', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTaskEither<{}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = _.readerTaskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = _.readerTaskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(_.readerTaskEitherSeq)
    const ns = await _.run(sequenceSeries([t1, t2]), {})
    assert.deepStrictEqual(ns, E.right([2, 4]))
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.run(
        _.readerTaskEither.fromIO(() => 1),
        {}
      )
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('fromOption', async () => {
    const e1 = await _.run(_.fromOption(() => 'none')(none), {})
    assert.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.run(_.fromOption(() => 'none')(some(1)), {})
    assert.deepStrictEqual(e2, E.right(1))
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

  it('filterOrElse', async () => {
    const e1 = await _.run(
      pipe(
        _.right(12),
        _.filterOrElse(
          n => n > 10,
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
          n => n > 10,
          () => 'a'
        )
      ),
      {}
    )
    assert.deepStrictEqual(e2, E.left('a'))
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

    it('map', async () => {
      const double = (n: number): number => n * 2
      const e1 = await RTV.map(RTV.of(1), double)({})()
      assert.deepStrictEqual(e1, E.right(2))
      const e2 = await RTV.map(_.left('a'), double)({})()
      assert.deepStrictEqual(e2, E.left('a'))
    })

    it('ap', async () => {
      const fab = _.left('a')
      const fa = _.left('b')
      const e1 = await RTV.ap(fab, fa)({})()
      assert.deepStrictEqual(e1, E.left('ab'))
    })

    it('chain', async () => {
      const e1 = await RTV.chain(_.right(3), a => (a > 2 ? _.right(a) : _.left('b')))({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await RTV.chain(_.right(1), a => (a > 2 ? _.right(a) : _.left('b')))({})()
      assert.deepStrictEqual(e2, E.left('b'))
      const e3 = await RTV.chain(_.left('a'), a => (a > 2 ? _.right(a) : _.left('b')))({})()
      assert.deepStrictEqual(e3, E.left('a'))
    })

    it('bimap', async () => {
      const e1 = await RTV.bimap(
        _.right(3),
        e => e,
        v => v
      )({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await RTV.bimap(
        _.left('3'),
        e => e,
        v => v
      )({})()
      assert.deepStrictEqual(e2, E.left('3'))
    })

    it('mapLeft', async () => {
      const e1 = await RTV.mapLeft(_.right(3), a => `x${a}`)({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await RTV.mapLeft(_.left('3'), a => `x${a}`)({})()
      assert.deepStrictEqual(e2, E.left('x3'))
    })

    it('alt', async () => {
      const e1 = await RTV.alt(_.right(1), () => _.right(2))({})()
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await RTV.alt(_.left('a'), () => _.right(2))({})()
      assert.deepStrictEqual(e2, E.right(2))
      const e3 = await RTV.alt(_.right(1), () => _.left('b'))({})()
      assert.deepStrictEqual(e3, E.right(1))
      const e4 = await RTV.alt(_.left('a'), () => _.left('b'))({})()
      assert.deepStrictEqual(e4, E.left('ab'))
    })

    it('traverse', async () => {
      const e1 = await array.traverse(RTV)([1, 2, 3], RTV.of)({})()
      assert.deepStrictEqual(e1, E.right([1, 2, 3]))
      const e2 = await array.traverse(RTV)([1, 2, 3], v => RTV.throwError(`${v}`))({})()
      assert.deepStrictEqual(e2, E.left('123'))
      const e3 = await array.traverse(RTV)([1, 2, 3], v => (v % 2 === 1 ? RTV.throwError(`${v}`) : RTV.of(v)))({})()
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
      _.readerTaskEither.fromIO(() => {
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
