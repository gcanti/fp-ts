import * as assert from 'assert'
import { array } from '../src/Array'
import * as E from '../src/Either'
import { io } from '../src/IO'
import { reader } from '../src/Reader'
import * as _ from '../src/ReaderTaskEither'
import { task } from '../src/Task'
import { taskEither } from '../src/TaskEither'
import { pipeOp as pipe } from '../src/function'

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
    const e = await _.run(_.asks((s: string) => s.length), 'foo')
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

  it('rightReader', async () => {
    const e = await _.run(_.rightReader(reader.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftReader', async () => {
    const e = await _.run(_.leftReader(reader.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.run(_.fromTaskEither(taskEither.of(1)), {})
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftIO', async () => {
    const e = await _.run(_.leftIO(io.of(1)), {})
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.run(_.fromIOEither(() => E.right(1)), {})
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(_.fromIOEither(() => E.left('error')), {})
    assert.deepStrictEqual(e2, E.left('error'))
  })

  it('fold', async () => {
    const fold = _.fold((l: string) => reader.of(task.of(l.length)), (a: number) => reader.of(task.of(a * 2)))
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
    const e1 = await _.run(_.readerTaskEither.alt(_.right(1), () => _.right(2)), {})
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(_.readerTaskEither.alt(_.left('a'), () => _.right(2)), {})
    assert.deepStrictEqual(e2, E.right(2))
    const e3 = await _.run(_.readerTaskEither.alt(_.left('a'), () => _.left('b')), {})
    assert.deepStrictEqual(e3, E.left('b'))
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const gt2 = _.fromPredicate(predicate, n => `Invalid number ${n}`)

    const refinement = (u: string | number): u is number => typeof u === 'number'
    const isNumber = _.fromPredicate(refinement, u => `Invalid number ${String(u)}`)

    const rtes = [gt2(3), gt2(1), isNumber(4)]
    return Promise.all(rtes.map(rte => _.run(rte, {}))).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
    })
  })

  it('sequence parallel', async () => {
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
      const e = await _.run(_.readerTaskEither.fromIO(() => 1), {})
      assert.deepStrictEqual(e, E.right(1))
    })
  })
})
