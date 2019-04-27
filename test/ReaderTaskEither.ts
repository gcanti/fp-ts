import * as assert from 'assert'
import { array } from '../src/Array'
import * as E from '../src/Either'
import { none, some } from '../src/Option'
import { reader } from '../src/Reader'
import * as RTE from '../src/ReaderTaskEither'
import { task } from '../src/Task'
import { taskEither } from '../src/TaskEither'

describe('ReaderTaskEither', () => {
  it('map', () => {
    const double = (n: number): number => n * 2
    return RTE.run(RTE.readerTaskEither.map(RTE.fromRight(1), double), {}).then(x => {
      assert.deepStrictEqual(x, E.right(2))
    })
  })

  it('ap', () => {
    const double = (n: number): number => n * 2
    const fab = RTE.fromRight(double)
    const fa = RTE.fromRight(1)
    return RTE.run(RTE.readerTaskEither.ap(fab, fa), {}).then(x => {
      assert.deepStrictEqual(x, E.right(2))
    })
  })

  it('chain', () => {
    const f = (a: string) => (a.length > 2 ? RTE.fromRight(a.length) : RTE.fromLeft('foo'))
    const rtes = [
      RTE.readerTaskEither.chain(RTE.fromRight('foo'), f),
      RTE.readerTaskEither.chain(RTE.fromRight('a'), f)
    ]
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('foo'))
    })
  })

  it('mapLeft', () => {
    const len = (s: string): number => s.length
    const rtes = [RTE.fromRight(1), RTE.fromLeft('err')].map(rte => RTE.mapLeft(rte, len))
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(1))
      assert.deepStrictEqual(e2, E.left(3))
    })
  })

  it('fold', () => {
    const f = (s: string): boolean => s.length > 2
    const g = (n: number): boolean => n > 2
    const rtes = [RTE.fromRight(1), RTE.fromLeft('foo')].map(rte => RTE.fold(rte, f, g))
    return Promise.all(rtes.map(rte => rte({})())).then(([b1, b2]) => {
      assert.strictEqual(b1, false)
      assert.strictEqual(b2, true)
    })
  })

  it('make', () => {
    return RTE.run(RTE.fromRight(1), {}).then(e => assert.deepStrictEqual(e, E.right(1)))
  })

  it('ask', () => {
    return RTE.run(RTE.ask<number>(), 1).then(e => assert.deepStrictEqual(e, E.right(1)))
  })

  it('asks', () => {
    return RTE.run(RTE.asks((s: string) => s.length), 'foo').then(e => assert.deepStrictEqual(e, E.right(3)))
  })

  it('local', () => {
    const len = (s: string): number => s.length
    const rte = RTE.local(RTE.asks((n: number) => n + 1), len)
    return RTE.run(rte, 'foo').then(e => {
      assert.deepStrictEqual(e, E.right(4))
    })
  })

  it('left', () => {
    return RTE.run(RTE.left(task.of(1)), {}).then(e => {
      assert.deepStrictEqual(e, E.left(1))
    })
  })

  it('right', () => {
    return RTE.run(RTE.right(task.of(1)), {}).then(e => {
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('fromReader', () => {
    return RTE.run(RTE.fromReader(reader.of(1)), {}).then(e => {
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('fromTaskEither', () => {
    return RTE.run(RTE.fromTaskEither(taskEither.of(1)), {}).then(e => {
      assert.deepStrictEqual(e, E.right(1))
    })
  })

  it('tryCatch', () => {
    const toError = () => 'error'
    const rtes = [
      RTE.tryCatch(() => Promise.resolve(1), toError),
      RTE.tryCatch(() => Promise.reject(undefined), toError)
    ]
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(1))
      assert.deepStrictEqual(e2, E.left('error'))
    })
  })

  it('fromIOEither', () => {
    const rtes = [RTE.fromIOEither(() => E.right(1)), RTE.fromIOEither(() => E.left('error'))]
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(1))
      assert.deepStrictEqual(e2, E.left('error'))
    })
  })

  it('bimap', () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2
    const rtes = [RTE.fromRight(1), RTE.fromLeft('error')].map(rte => RTE.readerTaskEither.bimap(rte, f, g))
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(false))
      assert.deepStrictEqual(e2, E.left(5))
    })
  })

  it('orElse', () => {
    const rtes = [RTE.fromRight(1), RTE.fromLeft('error')].map(rte => RTE.orElse(rte, s => RTE.fromRight(s.length)))
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
      assert.deepStrictEqual(e1, E.right(1))
      assert.deepStrictEqual(e2, E.right(5))
    })
  })

  it('fromPredicate', () => {
    const predicate = (n: number) => n >= 2
    const gt2 = RTE.fromPredicate(predicate, n => `Invalid number ${n}`)

    const refinement = (u: string | number): u is number => typeof u === 'number'
    const isNumber = RTE.fromPredicate(refinement, u => `Invalid number ${String(u)}`)

    const rtes = [gt2(3), gt2(1), isNumber(4)]
    return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2, e3]) => {
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
    })
  })

  it('sequence parallel', () => {
    const log: Array<string> = []
    const append = (message: string): RTE.ReaderTaskEither<{}, void, number> =>
      RTE.right(() => Promise.resolve(log.push(message)))
    const t1 = RTE.readerTaskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = RTE.readerTaskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceParallel = array.sequence(RTE.readerTaskEither)
    return RTE.run(sequenceParallel([t1, t2]), {}).then(ns => {
      assert.deepStrictEqual(ns, E.right([3, 4]))
      assert.deepStrictEqual(log, ['start 1', 'start 2', 'end 1', 'end 2'])
    })
  })

  it('sequence series', () => {
    const log: Array<string> = []
    const append = (message: string): RTE.ReaderTaskEither<{}, void, number> =>
      RTE.right(() => Promise.resolve(log.push(message)))
    const t1 = RTE.readerTaskEither.chain(append('start 1'), () => append('end 1'))
    const t2 = RTE.readerTaskEither.chain(append('start 2'), () => append('end 2'))
    const sequenceSeries = array.sequence(RTE.readerTaskEitherSeq)
    return RTE.run(sequenceSeries([t1, t2]), {}).then(ns => {
      assert.deepStrictEqual(ns, E.right([2, 4]))
      assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
    })
  })

  describe('MonadThrow', () => {
    it('should obey the law', () => {
      const rtes = [
        RTE.readerTaskEither.chain(RTE.readerTaskEither.throwError('error'), a => RTE.fromRight(a)),
        RTE.readerTaskEither.throwError('error')
      ]
      return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, e2)
      })
    })

    it('fromEither', () => {
      return RTE.run(RTE.readerTaskEither.fromEither(E.right(1)), {}).then(e => {
        assert.deepStrictEqual(e, E.right(1))
      })
    })

    it('fromOption', () => {
      const rtes = [
        RTE.readerTaskEither.fromOption(none, () => 'error'),
        RTE.readerTaskEither.fromOption(some(1), () => 'error')
      ]
      return Promise.all(rtes.map(rte => RTE.run(rte, {}))).then(([e1, e2]) => {
        assert.deepStrictEqual(e1, E.left('error'))
        assert.deepStrictEqual(e2, E.right(1))
      })
    })
  })

  describe('MonadIO', () => {
    it('fromIO', () => {
      return RTE.run(RTE.readerTaskEither.fromIO(() => 1), {}).then(e => {
        assert.deepStrictEqual(e, E.right(1))
      })
    })
  })
})
