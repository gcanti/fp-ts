import * as assert from 'assert'
import { array } from '../src/Array'
import { left as eitherLeft, right as eitherRight } from '../src/Either'
import { monoidString } from '../src/Monoid'
import { none, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'

const delay = <A>(millis: number, a: A): T.Task<A> => T.delay(millis, T.task.of(a))

describe('TaskEither', () => {
  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = TE.fromLeft('acquire failure')
    const acquireSuccess = TE.fromRight({ res: 'acquire success' })
    const useSuccess = () => TE.fromRight('use success')
    const useFailure = () => TE.fromLeft('use failure')
    const releaseSuccess = () =>
      TE.taskEither.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => TE.fromLeft('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      return TE.bracket(acquireFailure, useSuccess, releaseSuccess)().then(e => {
        assert.deepStrictEqual(e, eitherLeft('acquire failure'))
      })
    })
    it('body and release must not be called if acquire fails', () => {
      return TE.bracket(acquireFailure, useSuccess, releaseSuccess)().then(() => {
        assert.deepStrictEqual(log, [])
      })
    })
    it('should return the use error if use fails and release does not', () => {
      return TE.bracket(acquireSuccess, useFailure, releaseSuccess)().then(e => {
        assert.deepStrictEqual(e, eitherLeft('use failure'))
      })
    })
    it('should return the release error if both use and release fail', () => {
      return TE.bracket(acquireSuccess, useFailure, releaseFailure)().then(e => {
        assert.deepStrictEqual(e, eitherLeft('release failure'))
      })
    })
    it('release must be called if the body returns', () => {
      return TE.bracket(acquireSuccess, useSuccess, releaseSuccess)().then(() => {
        assert.deepStrictEqual(log, ['release success'])
      })
    })
    it('release must be called if the body throws', () => {
      return TE.bracket(acquireSuccess, useFailure, releaseSuccess)().then(() => {
        assert.deepStrictEqual(log, ['release success'])
      })
    })
    it('should return the release error if release fails', () => {
      return TE.bracket(acquireSuccess, useSuccess, releaseFailure)().then(e => {
        assert.deepStrictEqual(e, eitherLeft('release failure'))
      })
    })
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = TE.fromRight(double)
    const fa = TE.fromRight(1)
    return TE.taskEither
      .ap(fab, fa)()
      .then(x => {
        assert.deepStrictEqual(x, eitherRight(2))
      })
  })

  it('map', () => {
    const double = (n: number): number => n * 2
    return TE.taskEither
      .map(TE.fromRight(1), double)()
      .then(e => {
        assert.deepStrictEqual(e, eitherRight(2))
      })
  })

  it('mapLeft', () => {
    const double = (n: number): number => n * 2
    const fa = TE.fromLeft(1)
    return TE.mapLeft(fa, double)().then(e => {
      assert.deepStrictEqual(e, eitherLeft(2))
    })
  })

  it('chain', () => {
    const te1 = TE.taskEither.chain(TE.fromRight('foo'), a =>
      a.length > 2 ? TE.fromRight(a.length) : TE.fromLeft('foo')
    )
    const te2 = TE.taskEither.chain(TE.fromRight('a'), a =>
      a.length > 2 ? TE.fromRight(a.length) : TE.fromLeft('foo')
    )
    return Promise.all([te1(), te2()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight(3))
      assert.deepStrictEqual(e2, eitherLeft('foo'))
    })
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const te1 = TE.fold(TE.fromRight(1), f, g)
    const te2 = TE.fold(TE.fromLeft('foo'), f, g)
    return Promise.all([te1(), te2()]).then(([b1, b2]) => {
      assert.strictEqual(b1, false)
      assert.strictEqual(b2, true)
    })
  })

  it('getOrElse', () => {
    const te1 = TE.getOrElse(TE.fromRight(1), () => 42)
    const te2 = TE.getOrElse(TE.fromLeft('foo'), () => 42)
    return Promise.all([te1(), te2()]).then(([b1, b2]) => {
      assert.strictEqual(b1, 1)
      assert.strictEqual(b2, 42)
    })
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const teRight = TE.fromRight(1)
    const teLeft = TE.fromLeft('foo')
    return Promise.all([
      TE.taskEither.bimap(teRight, f, g)(),
      TE.taskEither.bimap(teLeft, f, g)(),
      TE.taskEither.bimap(teRight, f, g)()
    ]).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, eitherRight(false))
      assert.deepStrictEqual(e2, eitherLeft(3))
      assert.deepStrictEqual(e1, e3)
    })
  })

  it('orElse', () => {
    const l: TE.TaskEither<string, number> = TE.fromLeft('foo')
    const r = TE.fromRight(1)
    const tl = TE.orElse(l, l => TE.fromRight(l.length))
    const tr = TE.orElse(r, () => TE.fromRight(2))
    return Promise.all([tl(), tr()]).then(([el, er]) => {
      assert.deepStrictEqual(el, eitherRight(3))
      assert.deepStrictEqual(er, eitherRight(1))
    })
  })

  it('left', () => {
    return TE.left(T.task.of(1))().then(e => {
      assert.deepStrictEqual(e, eitherLeft(1))
    })
  })

  it('tryCatch', () => {
    const ok = TE.tryCatch(() => Promise.resolve(1), () => 'error')
    const ko = TE.tryCatch(() => Promise.reject(undefined), () => 'error')
    return Promise.all([ok(), ko()]).then(([eok, eko]) => {
      assert.deepStrictEqual(eok, eitherRight(1))
      assert.deepStrictEqual(eko, eitherLeft('error'))
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
    return Promise.all([TE.taskify(api1)('foo')(), TE.taskify(api2)('foo')(), TE.taskify(api3)('foo')()]).then(
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
    const taskApi = TE.taskify(api)()

    return Promise.all([taskApi(), taskApi()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight('ok'))
      assert.deepStrictEqual(e2, eitherRight('ok'))
    })
  })

  it('fromIOEither', () => {
    const x1 = TE.fromIOEither(() => eitherRight(1))
    const x2 = TE.fromIOEither(() => eitherLeft('foo'))
    return Promise.all([x1(), x2()]).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, eitherRight(1))
      assert.deepStrictEqual(e2, eitherLeft('foo'))
    })
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const handleError = (n: number) => `Invalid number ${n}`
    const gt2 = TE.fromPredicate(predicate, handleError)
    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const is = TE.fromPredicate(isNumber, () => 'not a number')
    const actual = is(4)
    return Promise.all([gt2(3)(), gt2(1)(), actual()]).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, eitherRight(3))
      assert.deepStrictEqual(e2, eitherLeft('Invalid number 1'))
      assert.deepStrictEqual(e3, eitherRight(4))
    })
  })

  it('getSemigroup', () => {
    const S = TE.getSemigroup<string, number>(semigroupSum)
    return Promise.all([
      S.concat(TE.left(delay(10, 'a')), TE.left(delay(10, 'b')))().then(x =>
        assert.deepStrictEqual(x, eitherLeft('a'))
      ),
      S.concat(TE.left(delay(10, 'a')), TE.right(delay(10, 2)))().then(x => assert.deepStrictEqual(x, eitherRight(2))),
      S.concat(TE.right(delay(10, 1)), TE.left(delay(10, 'b')))().then(x => assert.deepStrictEqual(x, eitherRight(1))),
      S.concat(TE.right(delay(10, 1)), TE.right(delay(10, 2)))().then(x => assert.deepStrictEqual(x, eitherRight(3)))
    ])
  })

  describe('getApplyMonoid', () => {
    const M = TE.getApplyMonoid(monoidString)

    it('concat (right)', () => {
      return M.concat(TE.right(delay(10, 'a')), TE.right(delay(10, 'b')))().then(x =>
        assert.deepStrictEqual(x, eitherRight('ab'))
      )
    })
    it('concat (left)', () => {
      return M.concat(TE.right(delay(10, 'a')), TE.left(delay(10, 'b')))().then(x =>
        assert.deepStrictEqual(x, eitherLeft('b'))
      )
    })
    it('empty (right)', () => {
      return M.concat(TE.right(delay(10, 'a')), M.empty)().then(x => assert.deepStrictEqual(x, eitherRight('a')))
    })
    it('empty (left)', () => {
      return M.concat(M.empty, TE.right(delay(10, 'a')))().then(x => assert.deepStrictEqual(x, eitherRight('a')))
    })
  })

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): TE.TaskEither<void, number> => TE.right(() => Promise.resolve(log.push(message)))
    const t1 = TE.taskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = TE.taskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(TE.taskEither)
    return sequenceParallel([t1, t2])().then(ns => {
      assert.deepStrictEqual(ns, eitherRight([3, 4]))
      assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
    })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): TE.TaskEither<void, number> => TE.right(() => Promise.resolve(log.push(message)))
    const t1 = TE.taskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = TE.taskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(TE.taskEitherSeq)
    return sequenceSeries([t1, t2])().then(ns => {
      assert.deepStrictEqual(ns, eitherRight([2, 4]))
      assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
    })
  })

  it('foldTask', () => {
    const whenLeft = () => T.task.of('left')
    const whenRight = () => T.task.of('right')

    const tasks = [
      TE.foldTask(TE.fromLeft('a'), whenLeft, whenRight)(),
      TE.foldTask(TE.fromRight(1), whenLeft, whenRight)()
    ]
    return Promise.all(tasks).then(([r1, r2]) => {
      assert.deepStrictEqual(r1, 'left')
      assert.deepStrictEqual(r2, 'right')
    })
  })

  it('filterOrElse', () => {
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const tasks: Array<TE.TaskEither<string, number>> = [
      TE.filterOrElse(TE.fromRight(12), n => n > 10, () => 'bar'),
      TE.filterOrElse(TE.fromRight(7), n => n > 10, () => 'bar'),
      TE.filterOrElse(TE.fromLeft('foo'), n => n > 10, () => 'bar'),
      TE.filterOrElse(TE.fromRight(7), n => n > 10, n => `invalid ${n}`),
      TE.filterOrElse(TE.fromRight(12), isNumber, () => 'not a number')
    ]
    return Promise.all(tasks.map(te => te())).then(([r1, r2, r3, r4, r5]) => {
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
        TE.taskEither.chain(TE.taskEither.throwError('error'), a => TE.fromRight(a))(),
        TE.taskEither.throwError('error')()
      ]).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, e2)
      })
    })

    it('fromOption', () => {
      return Promise.all([
        TE.taskEither.fromOption(none, () => 'error')(),
        TE.taskEither.fromOption(some(1), () => 'error')()
      ]).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, eitherLeft('error'))
        assert.deepStrictEqual(e2, eitherRight(1))
      })
    })
  })

  describe('MonadIO', () => {
    it('fromIO', () => {
      const io = () => 1
      const fa = TE.taskEither.fromIO(io)
      return fa().then(e => {
        assert.deepStrictEqual(e, eitherRight(1))
      })
    })
  })
})
