import * as assert from 'assert'
import { array } from '../src/Array'
import { pipe } from '../src/pipeable'
import { reader } from '../src/Reader'
import * as _ from '../src/ReaderTask'
import * as T from '../src/Task'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import { semigroupString } from '../src/Semigroup'

describe('ReaderTask', () => {
  describe('Monad', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2

      const x = await _.readerTask.map(_.of(1), double)({})()
      assert.deepStrictEqual(x, 2)
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const mab = _.of(double)
      const ma = _.of(1)
      const x = await _.readerTask.ap(mab, ma)({})()
      assert.deepStrictEqual(x, 2)
    })

    it('chain', async () => {
      const f = (a: string) => _.of(a.length)
      const e1 = await _.readerTask.chain(_.of('foo'), f)({})()
      assert.deepStrictEqual(e1, 3)
    })

    describe('readerTaskSeq', () => {
      it('chain ', async () => {
        const f = (a: string) => _.of(a.length)
        const e1 = await _.readerTaskSeq.chain(_.of('foo'), f)({})()
        assert.deepStrictEqual(e1, 3)
      })
    })
  })

  it('ask', async () => {
    const e = await _.ask<number>()(1)()
    return assert.deepStrictEqual(e, 1)
  })

  it('asks', async () => {
    const e = await _.asks((s: string) => s.length)('foo')()
    return assert.deepStrictEqual(e, 3)
  })

  it('local', async () => {
    const len = (s: string): number => s.length
    const e = await pipe(
      _.asks((n: number) => n + 1),
      _.local(len)
    )('aaa')()
    assert.deepStrictEqual(e, 4)
  })

  it('fromTask', async () => {
    const e = await _.fromTask(T.of(1))({})()
    assert.deepStrictEqual(e, 1)
  })

  it('fromReader', async () => {
    const e = await _.fromReader(reader.of(1))({})()
    assert.deepStrictEqual(e, 1)
  })

  it('getSemigroup', async () => {
    const M = _.getSemigroup(semigroupString)
    const e = await M.concat(_.of('a'), _.of('b'))({})()
    assert.deepStrictEqual(e, 'ab')
  })

  it('getMonoid', async () => {
    const M = _.getMonoid(monoidString)
    const e = await M.concat(_.of('a'), M.empty)({})()
    assert.deepStrictEqual(e, 'a')
    const e2 = await M.concat(M.empty, _.of('b'))({})()
    assert.deepStrictEqual(e2, 'b')
    const e3 = await M.concat(_.of('a'), _.of('b'))({})()
    assert.deepStrictEqual(e3, 'ab')
  })

  it('reader', async () => {
    const e = await _.fromReader(reader.of(1))({})()
    assert.deepStrictEqual(e, 1)
  })

  it('sequence parallel', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTask<{}, number> => _.fromTask(() => Promise.resolve(log.push(message)))
    const t1 = _.readerTask.chain(append('start 1'), () => append('end 1'))
    const t2 = _.readerTask.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(_.readerTask)
    const ns = await sequenceParallel([t1, t2])({})()
    assert.deepStrictEqual(ns, [3, 4])
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('sequence series', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTask<{}, number> => _.fromTask(() => Promise.resolve(log.push(message)))
    const t1 = _.readerTask.chain(append('start 1'), () => append('end 1'))
    const t2 = _.readerTask.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(_.readerTaskSeq)
    const ns = await sequenceSeries([t1, t2])({})()
    assert.deepStrictEqual(ns, [2, 4])
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.readerTask.fromIO(() => 1)({})()
      assert.deepStrictEqual(e, 1)
    })
  })

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    const x = await _.run(pipe(_.of('a'), _.chainIOK(f)), undefined)
    assert.deepStrictEqual(x, 1)
  })

  it('chainTaskK', async () => {
    const f = (s: string) => T.of(s.length)
    const x = await _.run(pipe(_.of('a'), _.chainTaskK(f)), undefined)
    assert.deepStrictEqual(x, 1)
  })
})
