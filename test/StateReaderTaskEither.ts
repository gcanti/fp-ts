import * as E from '../src/Result'
import { flow, pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as IE from '../src/SyncResult'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RTE from '../src/ReaderTaskEither'
import * as RA from '../src/ReadonlyArray'
import type { State } from '../src/State'
import * as _ from '../src/StateReaderTaskEither'
import * as S from '../src/string'
import * as T from '../src/Async'
import * as TE from '../src/TaskEither'
import { tuple } from '../src/tuple'
import * as U from './util'

const state: unknown = {}

describe('StateReaderTaskEither', () => {
  describe('pipeables', () => {
    it('orElse', async () => {
      const assertSemigroupKind = async (
        a: _.StateReaderTaskEither<undefined, null, string, number>,
        b: _.StateReaderTaskEither<undefined, null, string, number>,
        expected: E.Result<string, readonly [undefined, number]>
      ) => {
        U.deepStrictEqual(await pipe(a, _.orElse(b))(undefined)(null)(), expected)
      }
      await assertSemigroupKind(_.succeed(1), _.succeed(2), E.succeed([undefined, 1]))
      await assertSemigroupKind(_.succeed(1), _.fail('b'), E.succeed([undefined, 1]))
      await assertSemigroupKind(_.fail('a'), _.succeed(2), E.succeed([undefined, 2]))
      await assertSemigroupKind(_.fail('a'), _.fail('b'), E.fail('b'))
    })

    it('map', async () => {
      const e = await pipe(_.succeed('aaa'), _.map(S.size), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.succeed(3))
    })

    it('ap', async () => {
      const e = await pipe(_.succeed(S.size), _.ap(_.succeed('aaa')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.succeed(3))
    })

    it('flatMap', async () => {
      const f = (s: string) => (s.length > 2 ? _.succeed(s.length) : _.succeed(0))
      const e = await pipe(_.succeed('aaa'), _.flatMap(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.succeed(3))
    })

    it('tap', async () => {
      const f = (s: string) => (s.length > 2 ? _.succeed(s.length) : _.succeed(0))
      const e = await pipe(_.succeed('aaa'), _.tap(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.succeed('aaa'))
    })

    it('tap', async () => {
      const e = await pipe(_.succeed(_.succeed('a')), _.flatten, _.evaluate(state))({})()
      U.deepStrictEqual(e, E.succeed('a'))
    })

    it('mapBoth', async () => {
      const f = _.mapBoth(gt(N.Ord)(2), S.size)
      U.deepStrictEqual(await pipe(_.succeed('aaa'), f, _.evaluate(state))({})(), E.succeed(3))
      U.deepStrictEqual(await pipe(_.fail(3), f, _.evaluate(state))({})(), E.fail(true))
    })

    it('mapError', async () => {
      const f = _.mapError(gt(N.Ord)(2))
      U.deepStrictEqual(await pipe(_.fail(3), f, _.evaluate(state))({})(), E.fail(true))
    })

    it('fromPredicate', async () => {
      const f = _.liftPredicate((n: number) => n >= 2, 'e')
      U.deepStrictEqual(await pipe(f(3), _.evaluate(state))({})(), E.succeed(3))
      U.deepStrictEqual(await pipe(f(1), _.evaluate(state))({})(), E.fail('e'))
    })

    it('filter', async () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(await pipe(_.succeed(12), _.filter(predicate, -1), _.evaluate(state))({})(), E.succeed(12))
      U.deepStrictEqual(await pipe(_.succeed(7), _.filter(predicate, -1), _.evaluate(state))({})(), E.fail(-1))
      U.deepStrictEqual(await pipe(_.fail(12), _.filter(predicate, -1), _.evaluate(state))({})(), E.fail(12))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromAsync, (fa) => fa(null)(null)())
    await U.assertSeq(_.Applicative, _.FromAsync, (fa) => fa(null)(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('run', async () => {
    const ma = _.succeed('aaa')
    const e = await ma({})({})()
    U.deepStrictEqual(e, E.succeed([{}, 'aaa'] as const))
  })

  it('applicativeReaderTaskEitherSeq', async () => {
    const log: Array<string> = []
    const append = (message: string): _.StateReaderTaskEither<{}, {}, void, number> =>
      _.fromAsync(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.flatMap(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.flatMap(() => append('end 2'))
    )
    const sequence = RA.traverse(_.Applicative)(<S, R, E, A>(a: _.StateReaderTaskEither<S, R, E, A>) => a)
    U.deepStrictEqual(await sequence([t1, t2])({})({})(), E.succeed([{}, [2, 4]] as const))
    U.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('execute', async () => {
    const ma = _.succeed('a')
    const e = await pipe(ma, _.execute(state))({})()
    U.deepStrictEqual(e, E.succeed({}))
  })

  it('fromState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.fromState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.succeed(1))
  })

  it('leftState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.leftState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.fail(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.succeed(1)
    const e = await pipe(_.fromReaderTaskEither(rte), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.succeed(1))
  })

  it('fromState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.fromState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.succeed(1))
  })

  it('left', async () => {
    const e = await _.fail(1)({})({})()
    U.deepStrictEqual(e, E.fail(1))
  })

  it('fromAsync', async () => {
    const e = await _.fromAsync(T.succeed(1))({})({})()
    U.deepStrictEqual(e, E.succeed([{}, 1] as const))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.succeed(1))({})({})()
    U.deepStrictEqual(e, E.fail(1))
  })

  it('fromAsyncEither', async () => {
    const e = await _.fromAsyncEither(TE.succeed(1))({})({})()
    U.deepStrictEqual(e, E.succeed([{}, 1] as const))
  })

  it('fromReader', async () => {
    const e = await _.fromReader(R.succeed(1))({})({})()
    U.deepStrictEqual(e, E.succeed([{}, 1] as const))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.succeed(1))({})({})()
    U.deepStrictEqual(e, E.fail(1))
  })

  it('fromSyncEither', async () => {
    const e1 = await _.fromSyncEither(IE.succeed(1))({})({})()
    U.deepStrictEqual(e1, E.succeed([{}, 1] as const))
    const e2 = await _.fromSyncEither(IE.fail(1))({})({})()
    U.deepStrictEqual(e2, E.fail(1))
  })

  it('fromResult', async () => {
    const e1 = await _.fromResult(E.succeed(1))({})({})()
    U.deepStrictEqual(e1, E.succeed([{}, 1] as const))
    const e2 = await _.fromResult(E.fail(1))({})({})()
    U.deepStrictEqual(e2, E.fail(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption('err')(O.some(1))({})({})()
    U.deepStrictEqual(e1, E.succeed([{}, 1] as const))
    const e2 = await _.fromOption('err')(O.none)({})({})()
    U.deepStrictEqual(e2, E.fail('err'))
  })

  it('fromSync', async () => {
    const e = await _.fromSync(I.succeed(1))({})({})()
    U.deepStrictEqual(e, E.succeed([{}, 1] as const))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.succeed(1))({})({})()
    U.deepStrictEqual(e, E.fail(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption('none')(O.none)({})({})()
    U.deepStrictEqual(e1, E.fail('none'))
    const e2 = await _.fromOption(() => 'none')(O.some(1))({})({})()
    U.deepStrictEqual(e2, E.succeed([{}, 1] as const))
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.fail('a'))({})({})()
    U.deepStrictEqual(e1, E.fail('a'))
    const e2 = await _.fromReaderEither(RE.succeed(1))({})({})()
    U.deepStrictEqual(e2, E.succeed([{}, 1] as const))
  })

  it('flatMapEither', async () => {
    const f = flow(S.size, E.succeed)
    const x = await pipe(_.succeed('a'), _.flatMapEither(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.succeed([undefined, 1] as const))
  })

  it('flatMapSyncResult', async () => {
    const f = flow(S.size, IE.succeed)
    const x = await pipe(_.succeed('a'), _.flatMapSyncResult(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.succeed([undefined, 1] as const))
  })

  it('flatMapTaskEither', async () => {
    const f = flow(S.size, TE.succeed)
    const x = await pipe(_.succeed('a'), _.flatMapTaskEither(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.succeed([undefined, 1] as const))
  })

  it('flatMapReaderTaskEither', async () => {
    const f = flow(S.size, RTE.succeed)
    const x = await pipe(_.succeed('a'), _.flatMapReaderTaskEither(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.succeed([undefined, 1] as const))
  })

  it('put', async () => {
    U.deepStrictEqual(await _.put(2)(1)({})(), E.succeed([2, undefined] as const))
  })

  it('get', async () => {
    U.deepStrictEqual(await _.get()(1)({})(), E.succeed([1, 1] as const))
  })

  it('modify', async () => {
    U.deepStrictEqual(await _.modify(U.double)(1)({})(), E.succeed([2, undefined] as const))
  })

  it('gets', async () => {
    U.deepStrictEqual(await _.gets(U.double)(1)({})(), E.succeed([1, 2] as const))
  })

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(undefined)(undefined)(),
      E.succeed([undefined, { a: 1, b: 'b' }] as const)
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(undefined)(undefined)(),
      E.succeed([undefined, { a: 1, b: 'b' }] as const)
    )
  })

  it('zipFlatten', async () => {
    U.deepStrictEqual(
      await pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))({})({})(),
      E.succeed([{}, [1, 'b']] as const)
    )
  })

  it('liftState', async () => {
    const ma = _.liftState(
      (n: number): State<number, number> =>
        (s) =>
          [s + 1, n * 2]
    )
    U.deepStrictEqual(await ma(3)(2)({})(), E.succeed([3, 6] as const))
  })

  it('flatMapState', async () => {
    const f = _.flatMapState(
      (n: number): State<number, number> =>
        (s) =>
          [s + 1, n * 2]
    )
    const right: _.StateReaderTaskEither<number, unknown, never, number> = _.succeed(3)
    U.deepStrictEqual(await pipe(right, f)(2)({})(), E.succeed([3, 6] as const))
    const left: _.StateReaderTaskEither<number, unknown, string, number> = _.fail('a')
    U.deepStrictEqual(await pipe(left, f)(2)({})(), E.fail('a'))
  })

  it('asksE', async () => {
    interface Env {
      readonly count: number
    }
    const e: Env = { count: 0 }
    const f = (e: Env) => _.succeed(e.count + 1)
    U.deepStrictEqual(await _.asksStateReaderTaskEither(f)({})(e)(), E.succeed(tuple({}, 1)))
  })

  it('local', async () => {
    U.deepStrictEqual(
      await pipe(
        _.asks((n: number) => n + 1),
        _.local(S.size)
      )({})('aaa')(),
      E.succeed(tuple({}, 4))
    )
  })

  it('tapError', async () => {
    const f = _.tapError(() => _.modify((s: number) => s + 1))
    U.deepStrictEqual(await pipe(_.succeed<number, number>(1), f)(0)(null)(), E.succeed([0, 1] as const))
    U.deepStrictEqual(await pipe(_.fail<string, number>('a'), f)(0)(null)(), E.fail('a'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(undefined)(), E.succeed([undefined, RA.empty] as const))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(undefined)(), E.succeed([undefined, ['a0', 'b1']] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(undefined)(), E.fail('e'))
    const append = (_i: number, n: number): _.StateReaderTaskEither<ReadonlyArray<number>, {}, Error, void> =>
      _.modify((a) => [...a, n])
    U.deepStrictEqual(
      await pipe(
        [1, 2, 3],
        _.traverseReadonlyArrayWithIndex(append),
        _.map(() => undefined)
      )([])({})(),
      E.succeed([[1, 2, 3], undefined] as const)
    )
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(undefined)(), E.succeed([undefined, ['a', 'b']] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(undefined)(), E.fail('e'))
    const append = (n: number): _.StateReaderTaskEither<ReadonlyArray<number>, {}, Error, void> =>
      _.modify((a) => [...a, n])
    U.deepStrictEqual(
      await pipe(
        [1, 2, 3],
        _.traverseReadonlyNonEmptyArray(append),
        _.map(() => undefined)
      )([])({})(),
      E.succeed([[1, 2, 3], undefined] as const)
    )
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.StateReaderTaskEither<undefined, undefined, string, number> =>
      _.fromSync(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.StateReaderTaskEither<undefined, undefined, string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(
      await pipe([right(1), right(2)], _.sequenceReadonlyArray)(undefined)(undefined)(),
      E.succeed([undefined, [1, 2]] as const)
    )
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(undefined)(undefined)(), E.fail('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(undefined)(undefined)(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
