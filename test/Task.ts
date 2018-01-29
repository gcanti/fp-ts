import * as assert from 'assert'
import { Task, tryCatch, fromIO } from '../src/Task'
import { right, left } from '../src/Either'
import { IO } from '../src/IO'

const delay = <A>(n: number, a: A): Task<A> =>
  new Task<A>(
    () =>
      new Promise<A>(resolve => {
        setTimeout(() => resolve(a), n)
      })
  )

describe('Task', () => {
  it('concat', () => {
    const t1 = delay(10, 1)
    const t2 = delay(20, 2)
    return t1
      .concat(t2)
      .run()
      .then(x => assert.strictEqual(x, 1))
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
