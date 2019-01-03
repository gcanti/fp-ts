import * as assert from 'assert'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { IO } from '../src/IO'
import { Task, task, delay } from '../src/Task'
import {
  bracket,
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
  getSemigroup,
  taskEitherSeq
} from '../src/TaskEither'
import { IOEither } from '../src/IOEither'
import { monoidString } from '../src/Monoid'
import { semigroupSum } from '../src/Semigroup'
import { sequence } from '../src/Traversable'
import { array } from '../src/Array'

describe('TaskEither', () => {
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

  describe('bracket', () => {
    let log: Array<string> = []

    interface Resource {
      res: string
    }
    const acquireFailure = fromLeft<string, Resource>('acquire failure')
    const acquireSuccess = taskEither.of<string, Resource>({ res: 'acquire success' })
    const useSuccess = () => taskEither.of<string, string>('use success')
    const useFailure = () => fromLeft<string, string>('use failure')
    const releaseSuccess = () =>
      fromIO<string, void>(
        new IO(() => {
          log.push('release success')
        })
      )
    const releaseFailure = () => fromLeft<string, void>('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      return bracket(acquireFailure, useSuccess, releaseSuccess)
        .run()
        .then(e => {
          assert.deepEqual(e, eitherLeft('acquire failure'))
        })
    })
    it('body and release must not be called if acquire fails', () => {
      return bracket(acquireFailure, useSuccess, releaseSuccess)
        .run()
        .then(() => {
          assert.deepEqual(log, [])
        })
    })
    it('should return the use error if use fails and release does not', () => {
      return bracket(acquireSuccess, useFailure, releaseSuccess)
        .run()
        .then(e => {
          assert.deepEqual(e, eitherLeft('use failure'))
        })
    })
    it('should return the release error if both use and release fail', () => {
      return bracket(acquireSuccess, useFailure, releaseFailure)
        .run()
        .then(e => {
          assert.deepEqual(e, eitherLeft('release failure'))
        })
    })
    it('release must be called if the body returns', () => {
      return bracket(acquireSuccess, useSuccess, releaseSuccess)
        .run()
        .then(() => {
          assert.deepEqual(log, ['release success'])
        })
    })
    it('release must be called if the body throws', () => {
      return bracket(acquireSuccess, useFailure, releaseSuccess)
        .run()
        .then(() => {
          assert.deepEqual(log, ['release success'])
        })
    })
    it('should return the release error if release fails', () => {
      return bracket(acquireSuccess, useSuccess, releaseFailure)
        .run()
        .then(e => {
          assert.deepEqual(e, eitherLeft('release failure'))
        })
    })
  })

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
    const append = (message: string, millis: number): TaskEither<string, number> =>
      right(delay(millis, undefined).map(() => log.push(message)))
    return append('a', 10)
      .applySecond(append('b', 0))
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(1))
        assert.deepEqual(log, ['b', 'a'])
      })
  })

  it('ChainSecond', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      right(delay(millis, undefined).map(() => log.push(message)))
    return append('a', 10)
      .chainSecond(append('b', 0))
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
        assert.deepEqual(e1, eitherRight('ok'))
        assert.deepEqual(e2, eitherRight('ok'))
        assert.deepEqual(e3, eitherLeft(new Error('ko')))
      }
    )
  })

  it('composed taskify', () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = taskify(api)()

    return Promise.all([taskApi.run(), taskApi.run()]).then(([e1, e2]) => {
      assert.deepEqual(e1, eitherRight('ok'))
      assert.deepEqual(e2, eitherRight('ok'))
    })
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
    const append = (message: string, millis: number): TaskEither<string, number> =>
      right(delay(millis, undefined).map(() => log.push(message)))
    return append('a', 10)
      .applyFirst(append('b', 0))
      .run()
      .then(e => {
        assert.deepEqual(e, eitherRight(2))
        assert.deepEqual(log, ['b', 'a'])
      })
  })

  it('chainFirst', () => {
    const log: Array<string> = []
    const append = (message: string, millis: number): TaskEither<string, number> =>
      right(delay(millis, undefined).map(() => log.push(message)))
    return append('a', 10)
      .chainFirst(append('b', 0))
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
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const is = fromPredicate(isNumber, () => 'not a number')
    const actual = is(4)
    return Promise.all([gt2(3).run(), gt2(1).run(), actual.run()]).then(([e1, e2, e3]) => {
      assert.deepEqual(e1, eitherRight(3))
      assert.deepEqual(e2, eitherLeft('Invalid number 1'))
      assert.deepEqual(e3, eitherRight(4))
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

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<void, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceParallel = sequence(taskEither, array)
    return sequenceParallel([t1, t2])
      .run()
      .then(ns => {
        assert.deepEqual(ns, eitherRight([3, 4]))
        assert.deepEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
      })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): TaskEither<void, number> =>
      right(new Task(() => Promise.resolve(log.push(message))))
    const t1 = append('start 1').chain(() => append('end 1'))
    const t2 = append('start 2').chain(() => append('end 2'))
    const sequenceSeries = sequence(taskEitherSeq, array)
    return sequenceSeries([t1, t2])
      .run()
      .then(ns => {
        assert.deepEqual(ns, eitherRight([2, 4]))
        assert.deepEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
      })
  })

  it('foldTaskEither', () => {
    const whenLeft = (s: string) =>
      s.length >= 2 ? taskEither.of<boolean, string>('okleft') : fromLeft<boolean, string>(false)
    const whenRight = (n: number) =>
      n >= 2 ? taskEither.of<boolean, string>('okright') : fromLeft<boolean, string>(true)

    const tasks = [
      fromLeft<string, number>('a')
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      fromLeft<string, number>('aa')
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      taskEither
        .of<string, number>(1)
        .foldTaskEither(whenLeft, whenRight)
        .run(),
      taskEither
        .of<string, number>(2)
        .foldTaskEither(whenLeft, whenRight)
        .run()
    ]
    return Promise.all(tasks).then(([r1, r2, r3, r4]) => {
      assert.deepEqual(r1, eitherLeft(false))
      assert.deepEqual(r2, eitherRight('okleft'))
      assert.deepEqual(r3, eitherLeft(true))
      assert.deepEqual(r4, eitherRight('okright'))
    })
  })

  it('foldTask', () => {
    const whenLeft = () => task.of('left')
    const whenRight = () => task.of('right')

    const tasks = [
      fromLeft<string, number>('a')
        .foldTask(whenLeft, whenRight)
        .run(),
      taskEither
        .of<string, number>(1)
        .foldTask(whenLeft, whenRight)
        .run()
    ]
    return Promise.all(tasks).then(([r1, r2]) => {
      assert.deepEqual(r1, 'left')
      assert.deepEqual(r2, 'right')
    })
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = taskEither.of<string, string | number>(12).filterOrElse(isNumber, 'not a number')
    const tasks = [
      taskEither.of<string, string | number>(12).filterOrElse(n => n > 10, 'bar'),
      taskEither.of<string, string | number>(7).filterOrElse(n => n > 10, 'bar'),
      fromLeft<string, string | number>('foo').filterOrElse(n => n > 10, 'bar'),
      actual
    ]
    return Promise.all(tasks.map(te => te.run())).then(([r1, r2, r3, r4]) => {
      assert.deepEqual(r1, eitherRight(12))
      assert.deepEqual(r2, eitherLeft('bar'))
      assert.deepEqual(r3, eitherLeft('foo'))
      assert.deepEqual(r4, eitherRight(12))
    })
  })

  it('filterOrElseL', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = taskEither.of<string, string | number>(12).filterOrElseL(isNumber, () => 'not a number')
    const tasks = [
      taskEither.of<string, number>(12).filterOrElseL(n => n > 10, () => 'bar'),
      taskEither.of<string, number>(7).filterOrElseL(n => n > 10, () => 'bar'),
      fromLeft<string, number>('foo').filterOrElseL(n => n > 10, () => 'bar'),
      taskEither.of<string, number>(7).filterOrElseL(n => n > 10, n => `invalid ${n}`),
      actual
    ]
    return Promise.all(tasks.map(te => te.run())).then(([r1, r2, r3, r4, r5]) => {
      assert.deepEqual(r1, eitherRight(12))
      assert.deepEqual(r2, eitherLeft('bar'))
      assert.deepEqual(r3, eitherLeft('foo'))
      assert.deepEqual(r4, eitherLeft('invalid 7'))
      assert.deepEqual(r5, eitherRight(12))
    })
  })
})
