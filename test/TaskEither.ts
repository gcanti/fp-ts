import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { IO } from '../src/IO'
import { Task, task, delay } from '../src/Task'
import {
  TaskEither,
  fromIO,
  fromLeft,
  left,
  right,
  taskEither,
  taskify,
  tryCatch,
  fromIOEither,
  fromPredicate,
  getApplyMonoid,
  getSemigroup
} from '../src/TaskEither'
import { IOEither } from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'

describe('TaskEither', () => {
  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = taskEither.of(double)
    const fa = taskEither.of(1)
    return Promise.all([fa.ap(fab).run(), fab.ap_(fa).run(), taskEither.ap(fab, fa).run()]).then(([e1, e2, e3]) => {
      assert.deepEqual(e1, eitherRight(2))
      assert.deepEqual(e1, e2)
      assert.deepEqual(e1, e3)
    })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return taskEither
      .map(taskEither.of(1), double)
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
      })
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = fromLeft(1)
    return fa
      .mapLeft(double)
      .run()
      .then(e => {
        assert.deepEqual(e, eitherLeft(2))
      })
  })

  it('chain', () => {
    const te1 = taskEither.chain(
      taskEither.of<string, string>('foo'),
      a => (a.length > 2 ? taskEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    const te2 = taskEither.chain(
      taskEither.of<string, string>('a'),
      a => (a.length > 2 ? taskEither.of<string, number>(a.length) : fromLeft<string, number>('foo'))
    )
    return Promise.all([te1.run(), te2.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(3))
      assert.deepEqual(e2, eitherLeft('foo'))
    })
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const te1 = taskEither.of<string, number>(1).fold(f, g)
    const te2 = fromLeft<string, number>('foo').fold(f, g)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      assert.strictEqual(b1, false)
      assert.strictEqual(b2, true)
    })
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = taskEither.of<string, number>(1)
    const teLeft = fromLeft<string, number>('foo')
    return Promise.all([
      teRight.bimap(f, g).run(),
      teLeft.bimap(f, g).run(),
      taskEither.bimap(teRight, f, g).run()
    ]).then(([e1, e2, e3]) => {
      assert.deepEqual(e1, eitherRight(false))
      assert.deepEqual(e2, eitherLeft(3))
      assert.deepEqual(e1, e3)
    })
  })

  it('orElse', () => {
    const l = fromLeft<string, number>('foo')
    const r = taskEither.of<string, number>(1)
    const tl = l.orElse(l => taskEither.of<number, number>(l.length))
    const tr = r.orElse(() => taskEither.of<number, number>(2))
    return Promise.all([tl.run(), tr.run()]).then(([el, er]) => {
      assert.deepEqual(el, eitherRight(3))
      assert.deepEqual(er, eitherRight(1))
    })
  })

  it('left', () => {
    return left(task.of(1))
      .run()
      .then(e => {
        assert.deepEqual(e, eitherLeft(1))
      })
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<string, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    return append('a')
      .applySecond(append('b'))
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
        assert.deepEqual(log, ['a', 'b'])
      })
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => Promise.resolve(1), () => 'error')
    const ko = tryCatch(() => Promise.reject(undefined), () => 'error')
    return Promise.all([ok.run(), ko.run()]).then(([eok, eko]) => {
      assert.deepEqual(eok, eitherRight(1))
      assert.deepEqual(eko, eitherLeft('error'))
    })
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const fa = fromIO(io)
    return fa.run().then(e => {
      assert.deepEqual(e, eitherRight(1))
    })
  })

  it('taskify', () => {
    const api1 = (path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    return Promise.all([taskify(api1)('foo').run(), taskify(api2)('foo').run(), taskify(api3)('foo').run()]).then(
      ([e1, e2, e3]) => {
        assert.deepEqual(e1, eitherRight('ok'))
        assert.deepEqual(e2, eitherRight('ok'))
        assert.deepEqual(e3, eitherLeft(new Error('ko')))
      }
    )
  })

  it('alt', () => {
    const l1 = fromLeft<string, number>('foo')
    const l2 = fromLeft<string, number>('bar')
    const r1 = taskEither.of<string, number>(1)
    const r2 = taskEither.of<string, number>(2)
    const x1 = l1.alt(l2)
    const x2 = l1.alt(r1)
    const x3 = r1.alt(l1)
    const x4 = r1.alt(r2)
    const x5 = taskEither.alt(r1, r2)
    return Promise.all([x1.run(), x2.run(), x3.run(), x4.run(), x5.run()]).then(([e1, e2, e3, e4, e5]) => {
      assert.deepEqual(e1, eitherLeft('bar'))
      assert.deepEqual(e2, eitherRight(1))
      assert.deepEqual(e3, eitherRight(1))
      assert.deepEqual(e4, eitherRight(1))
      assert.deepEqual(e4, e5)
    })
  })

  it('fromIOEither', () => {
    const x1 = fromIOEither(new IOEither(new IO(() => eitherRight(1))))
    const x2 = fromIOEither(new IOEither(new IO(() => eitherLeft('foo'))))
    return Promise.all([x1.run(), x2.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(1))
      assert.deepEqual(e2, eitherLeft('foo'))
    })
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<string, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    return append('a')
      .applyFirst(append('b'))
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
        assert.deepEqual(log, ['a', 'b'])
      })
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    const x1 = gt2(3)
    const x2 = gt2(1)
    return Promise.all([x1.run(), x2.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight(3))
      assert.deepEqual(e2, eitherLeft('Invalid number 1'))
    })
  })

  it('getSemigroup', () => {
    const S = getSemigroup<string, number>(semigroupSum)
    return Promise.all([
      S.concat(left(delay(10, 'a')), left(delay(10, 'b')))
        .run()
        .then(x => assert.deepEqual(x, eitherLeft('a'))),
      S.concat(left(delay(10, 'a')), right(delay(10, 2)))
        .run()
        .then(x => assert.deepEqual(x, eitherRight(2))),
      S.concat(right(delay(10, 1)), left(delay(10, 'b')))
        .run()
        .then(x => assert.deepEqual(x, eitherRight(1))),
      S.concat(right(delay(10, 1)), right(delay(10, 2)))
        .run()
        .then(x => assert.deepEqual(x, eitherRight(3)))
    ])
  })

  describe('getApplyMonoid', () => {
    const M = getApplyMonoid(monoidString)

    it('concat (right)', () => {
      return M.concat(right(delay(10, 'a')), right(delay(10, 'b')))
        .run()
        .then(x => assert.deepEqual(x, eitherRight('ab')))
    })
    it('concat (left)', () => {
      return M.concat(right(delay(10, 'a')), left(delay(10, 'b')))
        .run()
        .then(x => assert.deepEqual(x, eitherLeft('b')))
    })
    it('empty (right)', () => {
      return M.concat(right(delay(10, 'a')), M.empty)
        .run()
        .then(x => assert.deepEqual(x, eitherRight('a')))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, right(delay(10, 'a')))
        .run()
        .then(x => assert.deepEqual(x, eitherRight('a')))
    })
  })

  it('attempt', () => {
    return Promise.all([
      taskEither
        .of(1)
        .attempt()
        .run(),
      fromLeft('foo')
        .attempt()
        .run()
    ]).then(([x, y]) => {
      assert.deepEqual(x, eitherRight(eitherRight(1)))
      assert.deepEqual(y, eitherRight(eitherLeft('foo')))
    })
  })
})
