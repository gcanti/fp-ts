import * as assert from 'assert'
import { array } from '../src/Array'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import { pipe } from '../src/pipeable'
import * as _ from '../src/Task'

const delayReject = <A>(n: number, a: A): _.Task<A> => () =>
  new Promise<A>((_, reject) => {
    setTimeout(() => reject(a), n)
  })

const delay = <A>(millis: number, a: A): _.Task<A> => _.delay(millis)(_.task.of(a))

describe('Task', () => {
  describe('getRaceMonoid', () => {
    const M = _.getRaceMonoid<number>()

    it('concat', async () => {
      const x = await M.concat(delay(10, 1), delay(10, 2))()
      return assert.strictEqual(x, 1)
    })

    it('empty (right)', async () => {
      const x = await M.concat(delay(10, 1), M.empty)()
      return assert.strictEqual(x, 1)
    })

    it('empty (left)', async () => {
      const x = await M.concat(M.empty, delay(10, 1))()
      return assert.strictEqual(x, 1)
    })

    it('concat (rejected)', async () => {
      try {
        await M.concat(delayReject(10, 1), delayReject(10, 2))()
      } catch (actual) {
        return assert.strictEqual(actual, 1)
      }
    })
  })

  describe('getMonoid', () => {
    const M = _.getMonoid(monoidString)

    it('concat', async () => {
      const x = await M.concat(delay(10, 'a'), delay(10, 'b'))()
      return assert.strictEqual(x, 'ab')
    })

    it('empty (right)', async () => {
      const x = await M.concat(delay(10, 'a'), M.empty)()
      return assert.strictEqual(x, 'a')
    })

    it('empty (left)', async () => {
      const x = await M.concat(M.empty, delay(10, 'a'))()
      return assert.strictEqual(x, 'a')
    })
  })

  describe('Monad', () => {
    it('map', async () => {
      const double = (n: number): number => n * 2
      const x = await _.task.map(delay(0, 1), double)()
      assert.strictEqual(x, 2)
    })

    it('ap', async () => {
      const double = (n: number): number => n * 2
      const tab = delay(0, double)
      const ta = delay(0, 1)
      const x = await _.task.ap(tab, ta)()
      assert.strictEqual(x, 2)
    })

    it('chain', async () => {
      const f = (n: number): _.Task<number> => () => Promise.resolve(n * 2)
      const x = await _.task.chain(delay(0, 1), f)()
      return assert.strictEqual(x, 2)
    })
  })

  describe('Traversable', () => {
    it('sequence parallel', async () => {
      const log: Array<string> = []
      const append = (message: string): _.Task<number> => () => Promise.resolve(log.push(message))
      const t1 = _.task.chain(append('start 1'), () => append('end 1'))
      const t2 = _.task.chain(append('start 2'), () => append('end 2'))
      const sequenceParallel = array.sequence(_.task)
      const x = await sequenceParallel([t1, t2])()
      assert.deepStrictEqual(x, [3, 4])
      assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
    })

    it('sequence series', async () => {
      const log: Array<string> = []
      const append = (message: string): _.Task<number> => () => Promise.resolve(log.push(message))
      const t1 = _.task.chain(append('start 1'), () => append('end 1'))
      const t2 = _.task.chain(append('start 2'), () => append('end 2'))
      const sequenceSeries = array.sequence(_.taskSeq)
      const x = await sequenceSeries([t1, t2])()
      assert.deepStrictEqual(x, [2, 4])
      assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
    })
  })

  describe('MonadIO', () => {
    it('fromIO', async () => {
      const io = () => 1
      const task = _.task.fromIO(io)
      const x = await task()
      assert.strictEqual(x, 1)
    })
  })

  describe('MonadTask', () => {
    it('fromTask', async () => {
      const io = () => 1
      const t = _.task.fromIO(io)
      assert.strictEqual(_.task.fromTask(t), t)
    })
  })

  it('chainIO', async () => {
    const f = (s: string) => I.of(s.length)
    const x = await pipe(_.of('a'), _.chainIO(f))()
    assert.strictEqual(x, 1)
  })
})
