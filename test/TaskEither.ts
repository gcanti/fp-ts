import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { IO } from '../src/IO'
import { Task, task, delay2v } from '../src/Task'
import {
  bracket,
  TaskEither,
  taskEither,
  taskify,
  tryCatch,
  fromIOEither,
  fromPredicate,
  getApplyMonoid,
  getSemigroup,
  taskEitherSeq,
  left2v,
  rightIO,
  leftTask,
  rightTask,
  leftIO,
  right,
  fromIO,
  fromLeft,
  fold,
  right2v,
  orElse,
  alt,
  filterOrElse,
  getOrElse
} from '../src/TaskEither'
import { IOEither } from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'
import { sequence } from '../src/Traversable'
import { array } from '../src/Array'
import { none, some } from '../src/Option'
import { pipe } from '../src/pipeable'

const delay10 = delay2v(10)

describe('TaskEither', () => {
  it('attempt', () => {
    return Promise.all([
      right2v(1)
        .attempt()
        .run(),
      left2v('foo')
        .attempt()
        .run()
    ]).then(([x, y]) => {
      assert.deepStrictEqual(x, eitherRight(eitherRight(1)))
      assert.deepStrictEqual(y, eitherRight(eitherLeft('foo')))
    })
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = left2v('acquire failure')
    const acquireSuccess = right2v({ res: 'acquire success' })
    const useSuccess = () => right2v('use success')
    const useFailure = () => left2v('use failure')
    const releaseSuccess = () =>
      rightIO(
        new IO(() => {
          log.push('release success')
        })
      )
    const releaseFailure = () => left2v('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      return bracket(acquireFailure, useSuccess, releaseSuccess)
        .run()
        .then(e => {
          assert.deepStrictEqual(e, eitherLeft('acquire failure'))
        })
    })
    it('body and release must not be called if acquire fails', () => {
      return bracket(acquireFailure, useSuccess, releaseSuccess)
        .run()
        .then(() => {
          assert.deepStrictEqual(log, [])
        })
    })
    it('should return the use error if use fails and release does not', () => {
      return bracket(acquireSuccess, useFailure, releaseSuccess)
        .run()
        .then(e => {
          assert.deepStrictEqual(e, eitherLeft('use failure'))
        })
    })
    it('should return the release error if both use and release fail', () => {
      return bracket(acquireSuccess, useFailure, releaseFailure)
        .run()
        .then(e => {
          assert.deepStrictEqual(e, eitherLeft('release failure'))
        })
    })
    it('release must be called if the body returns', () => {
      return bracket(acquireSuccess, useSuccess, releaseSuccess)
        .run()
        .then(() => {
          assert.deepStrictEqual(log, ['release success'])
        })
    })
    it('release must be called if the body throws', () => {
      return bracket(acquireSuccess, useFailure, releaseSuccess)
        .run()
        .then(() => {
          assert.deepStrictEqual(log, ['release success'])
        })
    })
    it('should return the release error if release fails', () => {
      return bracket(acquireSuccess, useSuccess, releaseFailure)
        .run()
        .then(e => {
          assert.deepStrictEqual(e, eitherLeft('release failure'))
        })
    })
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = right2v(double)
    const fa = right2v(1)
    return Promise.all([fa.ap(fab).run(), fab.ap_(fa).run(), taskEither.ap(fab, fa).run()]).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, eitherRight(2))
      assert.deepStrictEqual(e1, e2)
      assert.deepStrictEqual(e1, e3)
    })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return taskEither
      .map(right2v(1), double)
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(2))
      })
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = left2v(1)
    return fa
      .mapLeft(double)
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherLeft(2))
      })
  })

  it('chain', () => {
    const te1 = taskEither.chain(right2v('foo'), a => (a.length > 2 ? right2v(a.length) : left2v('foo')))
    const te2 = taskEither.chain(right2v('a'), a => (a.length > 2 ? right2v(a.length) : left2v('foo')))
    return Promise.all([te1.run(), te2.run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight(3))
      assert.deepStrictEqual(e2, eitherLeft('foo'))
    })
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const te1 = right2v(1).fold(f, g)
    const te2 = left2v('foo').fold(f, g)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      assert.strictEqual(b1, false)
      assert.strictEqual(b2, true)
    })
  })

  it('getOrElse (method)', () => {
    const v: number = 42
    const te1 = right2v(1).getOrElse(v)
    const te2 = (left2v('foo') as TaskEither<string, number>).getOrElse(v)
    return Promise.all([te1.run(), te2.run()]).then(([b1, b2]) => {
      assert.strictEqual(b1, 1)
      assert.strictEqual(b2, 42)
    })
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = right2v(1)
    const teLeft = left2v('foo')
    return Promise.all([
      teRight.bimap(f, g).run(),
      teLeft.bimap(f, g).run(),
      taskEither.bimap(teRight, f, g).run()
    ]).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, eitherRight(false))
      assert.deepStrictEqual(e2, eitherLeft(3))
      assert.deepStrictEqual(e1, e3)
    })
  })

  it('orElse', () => {
    const tl = pipe(
      left2v('foo'),
      orElse(l => right2v(l.length))
    )
    const tr = pipe(
      right2v(1),
      orElse(() => right2v(2))
    )
    return Promise.all([tl.run(), tr.run()]).then(([el, er]) => {
      assert.deepStrictEqual(el, eitherRight(3))
      assert.deepStrictEqual(er, eitherRight(1))
    })
  })

  it('leftTask', () => {
    return leftTask(task.of(1))
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherLeft(1))
      })
  })

  it('applySecond', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      rightTask(delay2v(millis)(task.of(undefined)).map(() => log.push(message)))
    return append('a', 10)
      .applySecond(append('b', 0))
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(1))
        assert.deepStrictEqual(log, ['b', 'a'])
      })
  })

  it('ChainSecond', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      rightTask(delay2v(millis)(task.of(undefined)).map(() => log.push(message)))
    return append('a', 10)
      .chainSecond(append('b', 0))
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(2))
        assert.deepStrictEqual(log, ['a', 'b'])
      })
  })

  it('tryCatch', () => {
    const ok = tryCatch(() => Promise.resolve(1), () => 'error')
    const ko = tryCatch(() => Promise.reject(undefined), () => 'error')
    return Promise.all([ok.run(), ko.run()]).then(([eok, eko]) => {
      assert.deepStrictEqual(eok, eitherRight(1))
      assert.deepStrictEqual(eko, eitherLeft('error'))
    })
  })

  it('fromIO', () => {
    const io = new IO(() => 1)
    const fa = rightIO(io)
    return fa.run().then(e => {
      assert.deepStrictEqual(e, eitherRight(1))
    })
  })

  it('taskify', () => {
    const api1 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    return Promise.all([taskify(api1)('foo').run(), taskify(api2)('foo').run(), taskify(api3)('foo').run()]).then(
      ([e1, e2, e3]) => {
        assert.deepStrictEqual(e1, eitherRight('ok'))
        assert.deepStrictEqual(e2, eitherRight('ok'))
        assert.deepStrictEqual(e3, eitherLeft(new Error('ko')))
      }
    )
  })

  it('composed taskify', () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = taskify(api)()

    return Promise.all([taskApi.run(), taskApi.run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight('ok'))
      assert.deepStrictEqual(e2, eitherRight('ok'))
    })
  })

  it('alt', () => {
    const l1: TaskEither<string, number> = left2v('foo')
    const l2 = left2v('bar')
    const r1 = right2v(1)
    const r2 = right2v(2)
    const x1 = l1.alt(l2)
    const x2 = l1.alt(r1)
    const x3 = pipe(
      r1,
      alt(() => l1)
    )
    const x4 = r1.alt(r2)
    const x5 = taskEither.alt(r1, r2)
    return Promise.all([x1.run(), x2.run(), x3.run(), x4.run(), x5.run()]).then(([e1, e2, e3, e4, e5]) => {
      assert.deepStrictEqual(e1, eitherLeft('bar'))
      assert.deepStrictEqual(e2, eitherRight(1))
      assert.deepStrictEqual(e3, eitherRight(1))
      assert.deepStrictEqual(e4, eitherRight(1))
      assert.deepStrictEqual(e4, e5)
    })
  })

  it('fromIOEither', () => {
    const x1 = fromIOEither(new IOEither<string, number>(new IO(() => eitherRight(1))))
    const x2 = fromIOEither(new IOEither<string, number>(new IO(() => eitherLeft('foo'))))
    return Promise.all([x1.run(), x2.run()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight(1))
      assert.deepStrictEqual(e2, eitherLeft('foo'))
    })
  })

  it('applyFirst', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      rightTask(delay2v(millis)(task.of(undefined)).map(() => log.push(message)))
    return append('a', 10)
      .applyFirst(append('b', 0))
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(2))
        assert.deepStrictEqual(log, ['b', 'a'])
      })
  })

  it('chainFirst', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      rightTask(delay2v(millis)(task.of(undefined)).map(() => log.push(message)))
    return append('a', 10)
      .chainFirst(append('b', 0))
      .run()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(1))
        assert.deepStrictEqual(log, ['a', 'b'])
      })
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = fromPredicate(predicate, handleError)
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const is = fromPredicate(isNumber, () => 'not a number')
    const actual = is(4)
    return Promise.all([gt2(3).run(), gt2(1).run(), actual.run()]).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, eitherRight(3))
      assert.deepStrictEqual(e2, eitherLeft('Invalid number 1'))
      assert.deepStrictEqual(e3, eitherRight(4))
    })
  })

  it('getSemigroup', () => {
    const S = getSemigroup<string, number>(semigroupSum)
    return Promise.all([
      S.concat(leftTask(delay10(task.of('a'))), leftTask(delay10(task.of('b'))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherLeft('a'))),
      S.concat(leftTask(delay10(task.of('a'))), rightTask(delay10(task.of(2))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight(2))),
      S.concat(rightTask(delay10(task.of(1))), leftTask(delay10(task.of('b'))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight(1))),
      S.concat(rightTask(delay10(task.of(1))), rightTask(delay10(task.of(2))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight(3)))
    ])
  })

  describe('getApplyMonoid', () => {
    const M = getApplyMonoid(monoidString)

    it('concat (right)', () => {
      return M.concat(rightTask(delay10(task.of('a'))), rightTask(delay10(task.of('b'))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight('ab')))
    })
    it('concat (left)', () => {
      return M.concat(rightTask(delay10(task.of('a'))), leftTask(delay10(task.of('b'))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherLeft('b')))
    })
    it('empty (right)', () => {
      return M.concat(rightTask(delay10(task.of('a'))), M.empty)
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight('a')))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, rightTask(delay10(task.of('a'))))
        .run()
        .then(x => assert.deepStrictEqual(x, eitherRight('a')))
    })
  })

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<void, number> =>
      rightTask(new Task(() => Promise.resolve(log.push(message))))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceParallel = sequence(taskEither, array)
    return sequenceParallel([t1, t2])
      .run()
      .then(ns => {
        assert.deepStrictEqual(ns, eitherRight([3, 4]))
        assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
      })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<void, number> =>
      rightTask(new Task(() => Promise.resolve(log.push(message))))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceSeries = sequence(taskEitherSeq, array)
    return sequenceSeries([t1, t2])
      .run()
      .then(ns => {
        assert.deepStrictEqual(ns, eitherRight([2, 4]))
        assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
      })
  })

  it('foldTaskEither', () => {
    const whenLeft = (s: string) => (s.length >= 2 ? right2v('okleft') : left2v(false))
    const whenRight = (n: number) => (n >= 2 ? right2v('okright') : left2v(true))

    const tasks = [
      left2v('a')
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      left2v('aa')
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      right2v(1)
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      right2v(2)
        .foldTaskEither(whenLeft, whenRight)
        .run()
    ]
    return Promise.all(tasks).then(([r1, r2, r3, r4]) => {
      assert.deepStrictEqual(r1, eitherLeft(false))
      assert.deepStrictEqual(r2, eitherRight('okleft'))
      assert.deepStrictEqual(r3, eitherLeft(true))
      assert.deepStrictEqual(r4, eitherRight('okright'))
    })
  })

  it('foldTask', () => {
    const whenLeft = () => task.of('left')
    const whenRight = () => task.of('right')

    const tasks = [
      pipe(
        left2v('a'),
        fold(whenLeft, whenRight)
      ).run(),
      pipe(
        right2v(1),
        fold(whenLeft, whenRight)
      ).run()
    ]
    return Promise.all(tasks).then(([r1, r2]) => {
      assert.deepStrictEqual(r1, 'left')
      assert.deepStrictEqual(r2, 'right')
    })
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = taskEither.of<string, string | number>(12).filterOrElse(isNumber, 'not a number')
    const tasks = [
      taskEither.of<string, string | number>(12).filterOrElse(n => n > 10, 'bar'),
      taskEither.of<string, string | number>(7).filterOrElse(n => n > 10, 'bar'),
      left2v('foo').filterOrElse(n => n > 10, 'bar'),
      actual
    ]
    return Promise.all(tasks.map(te => te.run())).then(([r1, r2, r3, r4]) => {
      assert.deepStrictEqual(r1, eitherRight(12))
      assert.deepStrictEqual(r2, eitherLeft('bar'))
      assert.deepStrictEqual(r3, eitherLeft('foo'))
      assert.deepStrictEqual(r4, eitherRight(12))
    })
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = pipe(
      right2v(12),
      filterOrElse(isNumber, () => 'not a number')
    )
    const tasks = [
      pipe(
        right2v(12),
        filterOrElse(n => n > 10, () => 'bar')
      ),
      pipe(
        right2v(7),
        filterOrElse(n => n > 10, () => 'bar')
      ),
      pipe(
        left2v('foo'),
        filterOrElse(n => n > 10, () => 'bar')
      ),
      pipe(
        right2v(7),
        filterOrElse(n => n > 10, n => `invalid ${n}`)
      ),
      actual
    ]
    return Promise.all(tasks.map(te => te.run())).then(([r1, r2, r3, r4, r5]) => {
      assert.deepStrictEqual(r1, eitherRight(12))
      assert.deepStrictEqual(r2, eitherLeft('bar'))
      assert.deepStrictEqual(r3, eitherLeft('foo'))
      assert.deepStrictEqual(r4, eitherLeft('invalid 7'))
      assert.deepStrictEqual(r5, eitherRight(12))
    })
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      return Promise.all([
        taskEither.chain(taskEither.throwError('error'), a => right2v(a)).run(),
        taskEither.throwError('error').run()
      ]).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, e2)
      })
    })

    it('fromOption', () => {
      return Promise.all([
        taskEither.fromOption(none, 'error').run(),
        taskEither.fromOption(some(1), 'error').run()
      ]).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, eitherLeft('error'))
        assert.deepStrictEqual(e2, eitherRight(1))
      })
    })
  })

  it('leftIO', async () => {
    const e = await leftIO(new IO(() => 'e')).run()
    assert.deepStrictEqual(e, eitherLeft('e'))
  })

  it('right', async () => {
    // tslint:disable-next-line: deprecation
    const e = await right(task.of(1)).run()
    assert.deepStrictEqual(e, eitherRight(1))
  })

  it('fromIO', async () => {
    // tslint:disable-next-line: deprecation
    const e = await fromIO(new IO(() => 1)).run()
    assert.deepStrictEqual(e, eitherRight(1))
  })

  it('fromLeft', async () => {
    // tslint:disable-next-line: deprecation
    const e = await fromLeft('e').run()
    assert.deepStrictEqual(e, eitherLeft('e'))
  })

  it('getOrElse (top level function)', async () => {
    const e1 = await pipe(
      right2v(1),
      getOrElse(() => task.of(2))
    ).run()
    assert.deepStrictEqual(e1, 1)
    const e2 = await pipe(
      left2v('e'),
      getOrElse(() => task.of(2))
    ).run()
    assert.deepStrictEqual(e2, 2)
  })
})
