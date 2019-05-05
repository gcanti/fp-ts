import * as assert from 'assert'
import { array } from '../src/Array'
import * as E from '../src/Either'
import { none, some } from '../src/Option'
import { reader } from '../src/Reader'
import * as _ from '../src/ReaderTaskEither'
import { task } from '../src/Task'
import { taskEither } from '../src/TaskEither'
import { io } from '../src/IO'

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
      const e1 = await _.run(_.mapLeft(_.right(1), len), {})
      assert.deepStrictEqual(e1, E.right(1))
      const e2 = await _.run(_.mapLeft(_.left('err'), len), {})
      assert.deepStrictEqual(e2, E.left(3))
    })
  })

  it('fold', async () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const b1 = await _.fold(_.right(1), f, g)({})()
    assert.strictEqual(b1, false)
    const b2 = await _.fold(_.left('foo'), f, g)({})()
    assert.strictEqual(b2, true)
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
    const rte = _.local(_.asks((n: number) => n + 1), len)
    const e_1 = await _.run(rte, 'foo')
    assert.deepStrictEqual(e_1, E.right(4))
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

  it('orElse', async () => {
    const e1 = await _.run(_.orElse(_.right(1), (s: string) => _.right(s.length)), {})
    assert.deepStrictEqual(e1, E.right(1))
    const e2 = await _.run(_.orElse(_.left('error'), s => _.right(s.length)), {})
    assert.deepStrictEqual(e2, E.right(5))
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

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      const rtes = [
        _.readerTaskEither.chain(_.readerTaskEither.throwError('error'), a => _.right(a)),
        _.readerTaskEither.throwError('error')
      ]
      return Promise.all(rtes.map(rte => _.run(rte, {}))).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, e2)
      })
    })

    it('fromEither', async () => {
      const e = await _.run(_.fromEither(E.right(1)), {})
      assert.deepStrictEqual(e, E.right(1))
    })

    it('fromOption', async () => {
      const e1 = await _.run(_.fromOption(none, () => 'error'), {})
      const e2 = await _.run(_.fromOption(some(1), () => 'error'), {})
      assert.deepStrictEqual(e1, E.left('error'))
      assert.deepStrictEqual(e2, E.right(1))
    })
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.run(_.readerTaskEither.fromIO(() => 1), {})
      assert.deepStrictEqual(e, E.right(1))
    })
  })
})
