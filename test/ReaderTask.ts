import * as assert from 'assert'
import * as A from '../src/Array'
import { pipe } from '../src/function'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderTask'
import * as T from '../src/Task'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import { semigroupString } from '../src/Semigroup'

describe('ReaderTask', () => {
  describe('pipeable', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.of(1), _.map(double))({})()
      assert.deepStrictEqual(x, 2)
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const x = await pipe(_.of(double), _.ap(_.of(1)))({})()
      assert.deepStrictEqual(x, 2)
    })

    it('apFirst', async () => {
      const x = await pipe(_.of('a'), _.apFirst(_.of('b')))({})()
      assert.deepStrictEqual(x, 'a')
    })

    it('apSecond', async () => {
      const x = await pipe(_.of('a'), _.apSecond(_.of('b')))({})()
      assert.deepStrictEqual(x, 'b')
    })

    it('chain', async () => {
      const f = (a: string) => _.of(a.length)
      assert.deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
      assert.deepStrictEqual(await _.readerTask.chain(_.of('foo'), f)({})(), 3)
    })

    it('chainFirst', async () => {
      const f = (a: string) => _.of(a.length)
      const x = await pipe(_.of('foo'), _.chainFirst(f))({})()
      assert.deepStrictEqual(x, 'foo')
    })

    it('flatten', async () => {
      const x = await pipe(_.of(_.of('a')), _.flatten)({})()
      assert.deepStrictEqual(x, 'a')
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
    const e = await _.fromReader(R.of(1))({})()
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

  it('of', async () => {
    const e = await _.fromReader(R.of(1))({})()
    assert.deepStrictEqual(e, 1)
  })

  it('sequence parallel', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTask<{}, number> => _.fromTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceParallel = A.sequence(_.applicativeReaderTaskPar)
    const ns = await sequenceParallel([t1, t2])({})()
    assert.deepStrictEqual(ns, [3, 4])
    assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
  })

  it('sequence series', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.ReaderTask<{}, number> => _.fromTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequenceSeries = A.sequence(_.applicativeReaderTaskSeq)
    const ns = await sequenceSeries([t1, t2])({})()
    assert.deepStrictEqual(ns, [2, 4])
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const e = await _.fromIO(() => 1)({})()
      assert.deepStrictEqual(e, 1)
    })
  })

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    const x = await pipe(_.of('a'), _.chainIOK(f))(undefined)()
    assert.deepStrictEqual(x, 1)
  })

  it('chainTaskK', async () => {
    const f = (s: string) => T.of(s.length)
    const x = await pipe(_.of('a'), _.chainTaskK(f))(undefined)()
    assert.deepStrictEqual(x, 1)
  })

  it('fromIOK', async () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    const x = await pipe(_.of('a'), _.chain(f))({})()
    assert.deepStrictEqual(x, 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK((s: string) => T.of(s.length))
    const x = await pipe(_.of('a'), _.chain(f))({})()
    assert.deepStrictEqual(x, 1)
  })
})
