import * as assert from 'assert'
import { left, right } from '../src/Either'
import { IO } from '../src/IO'
import { monoidString } from '../src/Monoid'
import { Task, fromIO, getMonoid, getRaceMonoid, task, tryCatch, delay2v, taskSeq, of, delay } from '../src/Task'
import { sequence } from '../src/Traversable'
import { array } from '../src/Array'

const delayReject = <A>(n: number, a: A): Task<A> =>
  new Task<A>(
    () =>
      new Promise<A>((_, reject) => {
        setTimeout(() => reject(a), n)
      })
  )

const delay10 = delay2v(10)

describe('Task', () => {
  describe('getRaceMonoid', () => {
    const M = getRaceMonoid<number>()
    it('concat', () => {
      return M.concat(delay10(of(1)), delay10(of(2)))
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
    it('empty (right)', () => {
      return M.concat(delay10(of(1)), M.empty)
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay10(of(1)))
        .run()
        .then(x => assert.strictEqual(x, 1))
    })
    it('concat (rejected)', () => {
      return M.concat(delayReject(10, 1), delayReject(10, 2))
        .run()
        .then(null, x => assert.strictEqual(x, 1))
    })
  })

  describe('getMonoid', () => {
    const M = getMonoid(monoidString)
    it('concat', () => {
      return M.concat(delay10(of('a')), delay10(of('b')))
        .run()
        .then(x => assert.strictEqual(x, 'ab'))
    })
    it('empty (right)', () => {
      return M.concat(delay10(of('a')), M.empty)
        .run()
        .then(x => assert.strictEqual(x, 'a'))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, delay10(of('a')))
        .run()
        .then(x => assert.strictEqual(x, 'a'))
    })
  })

  it('delay', async () => {
    // tslint:disable-next-line: deprecation
    const a = await delay(10, 1).run()
    assert.strictEqual(a, 1)
  })

  it('map', () => {
    const t1 = delay10(of(1))
    const double = (n: number): number => n * 2
    return Promise.all([t1.map(double).run(), task.map(t1, double).run()]).then(([x1, x2]) => {
      assert.strictEqual(x1, 2)
      assert.strictEqual(x1, x2)
    })
  })

  it('chain', () => {
    const t1 = delay10(of(1))
    const f = (n: number): Task<number> => new Task(() => Promise.resolve(n * 2))
    return t1
      .chain(f)
      .run()
      .then(x => assert.strictEqual(x, 2))
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    // tslint:disable-next-line: deprecation
    const t1 = delay10(of(1))
    // tslint:disable-next-line: deprecation
    const t2 = delay10(of(double))
    return Promise.all([t1.ap(t2).run(), task.ap(t2, t1).run(), t2.ap_(t1).run()]).then(([x1, x2, x3]) => {
      assert.strictEqual(x1, 2)
      assert.strictEqual(x1, x2)
      assert.strictEqual(x1, x3)
    })
  })

  it('tryCatch', () => {
    const onrejected = (e: any) => `Error is: ${String(e)}`
    const t1 = tryCatch(() => Promise.resolve(1), onrejected)
    const t2 = tryCatch(() => Promise.reject('ouch!'), onrejected)
    return Promise.all([t1.run(), t2.run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, right(1))
      assert.deepStrictEqual(e2, left('Error is: ouch!'))
    })
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const task = fromIO(io)
    return task.run().then(a => {
      assert.strictEqual(a, 1)
    })
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): Task<number> => new Task(() => Promise.resolve(log.push(message)))
    return append('a')
      .applySecond(append('b'))
      .run()
      .then(n => {
        assert.strictEqual(n, 2)
        assert.deepStrictEqual(log, ['a', 'b'])
      })
  })

  it('toString', () => {
    assert.strictEqual(task.of(1).toString(), 'new Task(<function0>)')
    assert.strictEqual(task.of(1).inspect(), 'new Task(<function0>)')
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string): Task<number> => new Task(() => Promise.resolve(log.push(message)))
    return append('a')
      .applyFirst(append('b'))
      .run()
      .then(n => {
        assert.strictEqual(n, 1)
        assert.deepStrictEqual(log, ['a', 'b'])
      })
  })

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): Task<number> => new Task(() => Promise.resolve(log.push(message)))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceParallel = sequence(task, array)
    return sequenceParallel([t1, t2])
      .run()
      .then(ns => {
        assert.deepStrictEqual(ns, [3, 4])
        assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
      })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): Task<number> => new Task(() => Promise.resolve(log.push(message)))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceSeries = sequence(taskSeq, array)
    return sequenceSeries([t1, t2])
      .run()
      .then(ns => {
        assert.deepStrictEqual(ns, [2, 4])
        assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
      })
  })
})
