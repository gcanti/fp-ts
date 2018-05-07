import * as assert from 'assert'
import { left, right } from '../src/Either'
import { IO } from '../src/IO'
import { monoidString } from '../src/Monoid'
import { Task, fromIO, getMonoid, getRaceMonoid, tryCatch } from '../src/Task'

const delay = <A>(n: number, a: A): Task<A> =>
  new Task<A>(
    () =>
      new Promise<A>(resolve => {
        setTimeout(() => resolve(a), n)
      })
  )

describe('Task', () => {
  describe('getRaceMonoid', () => {
    const M = getRaceMonoid<number>()
    it('concat', () => {
      return M.concat(delay(10, 1), delay(10, 2))
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
    it('empty (right)', () => {
      return M.concat(delay(10, 1), M.empty)
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay(10, 1))
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
  })

  describe('getMonoid', () => {
    const M = getMonoid(monoidString)
    it('concat', () => {
      return M.concat(delay(10, 'a'), delay(10, 'b'))
        .run()
        .then(x => assert.strictEqual(x, 'ab'))
    })
    it('empty (right)', () => {
      return M.concat(delay(10, 'a'), M.empty)
        .run()
        .then(x => assert.strictEqual(x, 'a'))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay(10, 'a'))
        .run()
        .then(x => assert.strictEqual(x, 'a'))
    })
  })

  it('map', () => {
    const t1 = delay(0, 1)
    const double = (n: number): number => n * 2
    return t1
      .map(double)
      .run()
      .then(x => assert.strictEqual(x, 2))
  })

  it('chain', () => {
    const t1 = delay(0, 1)
    const f = (n: number): Task<number> => new Task(() => Promise.resolve(n * 2))
    return t1
      .chain(f)
      .run()
      .then(x => assert.strictEqual(x, 2))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const t1 = delay(0, 1)
    const t2 = delay(0, double)
    return t1
      .ap(t2)
      .run()
      .then(x => assert.strictEqual(x, 2))
  })

  it('tryCatch', () => {
    const onrejected = (e: any) => `Error is: ${String(e)}`
    const t1 = tryCatch(() => Promise.resolve(1), onrejected)
    const t2 = tryCatch(() => Promise.reject('ouch!'), onrejected)
    return Promise.all([t1.run(), t2.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, right(1))
      assert.deepEqual(e2, left('Error is: ouch!'))
    })
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const task = fromIO(io)
    return task.run().then(a => {
      assert.strictEqual(a, 1)
    })
  })
})
