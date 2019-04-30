import * as assert from 'assert'
import { left, right } from '../src/Either'
import { monoidString } from '../src/Monoid'
import * as T from '../src/Task'
import { array } from '../src/Array'

const delayReject = <A>(n: number, a: A): T.Task<A> => () =>
  new Promise<A>((_, reject) => {
    setTimeout(() => reject(a), n)
  })

const delay = <A>(millis: number, a: A): T.Task<A> => T.delay(millis, T.task.of(a))

describe('Task', () => {
  describe('getRaceMonoid', () => {
    const M = T.getRaceMonoid<number>()
    it('concat', () => {
      return M.concat(delay(10, 1), delay(10, 2))().then(x => assert.strictEqual(x, 1))
    })
    it('empty (right)', () => {
      return M.concat(delay(10, 1), M.empty)().then(x => assert.strictEqual(x, 1))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay(10, 1))().then(x => assert.strictEqual(x, 1))
    })
    it('concat (rejected)', () => {
      return M.concat(delayReject(10, 1), delayReject(10, 2))().then(null, x => assert.strictEqual(x, 1))
    })
  })

  describe('getMonoid', () => {
    const M = T.getMonoid(monoidString)
    it('concat', () => {
      return M.concat(delay(10, 'a'), delay(10, 'b'))().then(x => assert.strictEqual(x, 'ab'))
    })
    it('empty (right)', () => {
      return M.concat(delay(10, 'a'), M.empty)().then(x => assert.strictEqual(x, 'a'))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay(10, 'a'))().then(x => assert.strictEqual(x, 'a'))
    })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return T.task
      .map(delay(0, 1), double)()
      .then(x1 => {
        assert.strictEqual(x1, 2)
      })
  })

  it('chain', () => {
    const f = (n: number): T.Task<number> => () => Promise.resolve(n * 2)
    return T.task
      .chain(delay(0, 1), f)()
      .then(x => assert.strictEqual(x, 2))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const tab = delay(0, double)
    const ta = delay(0, 1)
    return T.task
      .ap(tab, ta)()
      .then(x => {
        assert.strictEqual(x, 2)
      })
  })

  it('tryCatch', () => {
    const onrejected = (e: any) => `Error is: ${String(e)}`
    const t1 = T.tryCatch(() => Promise.resolve(1), onrejected)
    const t2 = T.tryCatch(() => Promise.reject('ouch!'), onrejected)
    return Promise.all([t1(), t2()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, right(1))
      assert.deepStrictEqual(e2, left('Error is: ouch!'))
    })
  })

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): T.Task<number> => () => Promise.resolve(log.push(message))
    const t1 = T.task.chain(append('start 1'), () => append('end 1'))
    const t2 = T.task.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(T.task)
    return sequenceParallel([t1, t2])().then(ns => {
      assert.deepStrictEqual(ns, [3, 4])
      assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
    })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): T.Task<number> => () => Promise.resolve(log.push(message))
    const t1 = T.task.chain(append('start 1'), () => append('end 1'))
    const t2 = T.task.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(T.taskSeq)
    return sequenceSeries([t1, t2])().then(ns => {
      assert.deepStrictEqual(ns, [2, 4])
      assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
    })
  })

  describe('MonadIO', () => {
    it('fromIO', () => {
      const io = () => 1
      const task = T.task.fromIO(io)
      return task().then(a => {
        assert.strictEqual(a, 1)
      })
    })
  })
})
