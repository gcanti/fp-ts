import * as E from '../src/Either'
import { flow, identity, pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
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
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import { tuple } from '../src/tuple'
import * as U from './util'

const state: unknown = {}

describe('StateReaderTaskEither', () => {
  describe('pipeables', () => {
    it('combineK', async () => {
      const assertSemigroupK = async (
        a: _.StateReaderTaskEither<undefined, null, string, number>,
        b: _.StateReaderTaskEither<undefined, null, string, number>,
        expected: E.Either<string, readonly [undefined, number]>
      ) => {
        U.deepStrictEqual(
          await pipe(
            a,
            _.combineK(() => b)
          )(undefined)(null)(),
          expected
        )
      }
      await assertSemigroupK(_.right(1), _.right(2), E.right([undefined, 1]))
      await assertSemigroupK(_.right(1), _.left('b'), E.right([undefined, 1]))
      await assertSemigroupK(_.left('a'), _.right(2), E.right([undefined, 2]))
      await assertSemigroupK(_.left('a'), _.left('b'), E.left('b'))
    })

    it('map', async () => {
      const e = await pipe(_.right('aaa'), _.map(S.size), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const e = await pipe(_.right(S.size), _.ap(_.right('aaa')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('zipLeftPar', async () => {
      const e = await pipe(_.right('a'), _.zipLeftPar(_.right('b')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('a'))
    })

    it('zipRightPar', async () => {
      const e = await pipe(_.right('a'), _.zipRightPar(_.right('b')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('b'))
    })

    it('flatMap', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.flatMap(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('tap', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.tap(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('aaa'))
    })

    it('tap', async () => {
      const e = await pipe(_.right(_.right('a')), _.flatten, _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('a'))
    })

    it('mapBoth', async () => {
      const f = _.mapBoth(gt(N.Ord)(2), S.size)
      U.deepStrictEqual(await pipe(_.right('aaa'), f, _.evaluate(state))({})(), E.right(3))
      U.deepStrictEqual(await pipe(_.left(3), f, _.evaluate(state))({})(), E.left(true))
    })

    it('mapError', async () => {
      const f = _.mapError(gt(N.Ord)(2))
      U.deepStrictEqual(await pipe(_.left(3), f, _.evaluate(state))({})(), E.left(true))
    })

    it('fromPredicate', async () => {
      const f = _.fromPredicate((n: number) => n >= 2, identity)
      U.deepStrictEqual(await pipe(f(3), _.evaluate(state))({})(), E.right(3))
      U.deepStrictEqual(await pipe(f(1), _.evaluate(state))({})(), E.left(1))
    })

    it('fromRefinement', async () => {
      const f = _.fromRefinement(S.isString, identity)
      U.deepStrictEqual(await pipe(f('a'), _.evaluate(state))({})(), E.right('a'))
      U.deepStrictEqual(await pipe(f(1), _.evaluate(state))({})(), E.left(1))
    })

    it('filter', async () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(
        await pipe(
          _.right(12),
          _.filter(predicate, () => -1),
          _.evaluate(state)
        )({})(),
        E.right(12)
      )
      U.deepStrictEqual(
        await pipe(
          _.right(7),
          _.filter(predicate, () => -1),
          _.evaluate(state)
        )({})(),
        E.left(-1)
      )
      U.deepStrictEqual(
        await pipe(
          _.left(12),
          _.filter(predicate, () => -1),
          _.evaluate(state)
        )({})(),
        E.left(12)
      )
      U.deepStrictEqual(
        await pipe(
          _.right(7),
          _.filter(predicate, (n) => `invalid ${n}`),
          _.evaluate(state)
        )({})(),
        E.left('invalid 7')
      )
    })

    it('refine', async () => {
      const refinement = (s: string): s is 'a' => s === 'a'
      const onFalse = (s: string) => `invalid string ${s}`

      U.deepStrictEqual(await pipe(_.right('a'), _.refine(refinement, onFalse), _.evaluate(state))({})(), E.right('a'))
      U.deepStrictEqual(
        await pipe(_.right('b'), _.refine(refinement, onFalse), _.evaluate(state))({})(),
        E.left('invalid string b')
      )
      U.deepStrictEqual(await pipe(_.left(-1), _.refine(refinement, onFalse), _.evaluate(state))({})(), E.left(-1))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromTask, (fa) => fa(null)(null)())
    await U.assertSeq(_.Applicative, _.FromTask, (fa) => fa(null)(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('run', async () => {
    const ma = _.right('aaa')
    const e = await ma({})({})()
    U.deepStrictEqual(e, E.right([{}, 'aaa'] as const))
  })

  it('applicativeReaderTaskEitherSeq', async () => {
    const log: Array<string> = []
    const append = (message: string): _.StateReaderTaskEither<{}, {}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.flatMap(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.flatMap(() => append('end 2'))
    )
    const sequence = RA.traverse(_.Applicative)(<S, R, E, A>(a: _.StateReaderTaskEither<S, R, E, A>) => a)
    U.deepStrictEqual(await sequence([t1, t2])({})({})(), E.right([{}, [2, 4]] as const))
    U.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('execute', async () => {
    const ma = _.right('a')
    const e = await pipe(ma, _.execute(state))({})()
    U.deepStrictEqual(e, E.right({}))
  })

  it('rightState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.rightState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.leftState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.right(1)
    const e = await pipe(_.fromReaderTaskEither(rte), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('fromState', async () => {
    const s: State<unknown, number> = (s) => [s, 1]
    const e = await pipe(_.fromState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('left', async () => {
    const e = await _.left(1)({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.rightTask(T.of(1))({})({})()
    U.deepStrictEqual(e, E.right([{}, 1] as const))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.fromTaskEither(TE.of(1))({})({})()
    U.deepStrictEqual(e, E.right([{}, 1] as const))
  })

  it('rightReader', async () => {
    const e = await _.rightReader(R.of(1))({})({})()
    U.deepStrictEqual(e, E.right([{}, 1] as const))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(IE.right(1))({})({})()
    U.deepStrictEqual(e1, E.right([{}, 1] as const))
    const e2 = await _.fromIOEither(IE.left(1))({})({})()
    U.deepStrictEqual(e2, E.left(1))
  })

  it('fromEither', async () => {
    const e1 = await _.fromEither(E.right(1))({})({})()
    U.deepStrictEqual(e1, E.right([{}, 1] as const))
    const e2 = await _.fromEither(E.left(1))({})({})()
    U.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'err')(O.some(1))({})({})()
    U.deepStrictEqual(e1, E.right([{}, 1] as const))
    const e2 = await _.fromOption(() => 'err')(O.none)({})({})()
    U.deepStrictEqual(e2, E.left('err'))
  })

  it('rightIO', async () => {
    const e = await _.rightIO(I.of(1))({})({})()
    U.deepStrictEqual(e, E.right([{}, 1] as const))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'none')(O.none)({})({})()
    U.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.fromOption(() => 'none')(O.some(1))({})({})()
    U.deepStrictEqual(e2, E.right([{}, 1] as const))
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.left('a'))({})({})()
    U.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.fromReaderEither(RE.right(1))({})({})()
    U.deepStrictEqual(e2, E.right([{}, 1] as const))
  })

  it('flatMapEitherK', async () => {
    const f = flow(S.size, E.of)
    const x = await pipe(_.right('a'), _.flatMapEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([undefined, 1] as const))
  })

  it('flatMapIOEitherK', async () => {
    const f = flow(S.size, IE.of)
    const x = await pipe(_.right('a'), _.flatMapIOEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([undefined, 1] as const))
  })

  it('flatMapTaskEitherK', async () => {
    const f = flow(S.size, TE.of)
    const x = await pipe(_.right('a'), _.flatMapTaskEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([undefined, 1] as const))
  })

  it('flatMapReaderTaskEitherK', async () => {
    const f = flow(S.size, RTE.of)
    const x = await pipe(_.right('a'), _.flatMapReaderTaskEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([undefined, 1] as const))
  })

  it('put', async () => {
    U.deepStrictEqual(await _.put(2)(1)({})(), E.right([2, undefined] as const))
  })

  it('get', async () => {
    U.deepStrictEqual(await _.get()(1)({})(), E.right([1, 1] as const))
  })

  it('modify', async () => {
    U.deepStrictEqual(await _.modify(U.double)(1)({})(), E.right([2, undefined] as const))
  })

  it('gets', async () => {
    U.deepStrictEqual(await _.gets(U.double)(1)({})(), E.right([1, 2] as const))
  })

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<number, void, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(undefined)(),
      E.right([undefined, { a: 1, b: 'b' }] as const)
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, void, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(
        undefined
      )(),
      E.right([undefined, { a: 1, b: 'b' }] as const)
    )
  })

  it('apT', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, {}, {}, string>(1), _.tupled, _.apT(_.right('b')))({})({})(),
      E.right([{}, [1, 'b']] as const)
    )
  })

  it('fromStateK', async () => {
    const ma = _.fromStateK(
      (n: number): State<number, number> =>
        (s) =>
          [s + 1, n * 2]
    )
    U.deepStrictEqual(await ma(3)(2)({})(), E.right([3, 6] as const))
  })

  it('flatMapStateK', async () => {
    const f = _.flatMapStateK(
      (n: number): State<number, number> =>
        (s) =>
          [s + 1, n * 2]
    )
    const right: _.StateReaderTaskEither<number, unknown, never, number> = _.right(3)
    U.deepStrictEqual(await pipe(right, f)(2)({})(), E.right([3, 6] as const))
    const left: _.StateReaderTaskEither<number, unknown, string, number> = _.left('a')
    U.deepStrictEqual(await pipe(left, f)(2)({})(), E.left('a'))
  })

  it('asksE', async () => {
    interface Env {
      readonly count: number
    }
    const e: Env = { count: 0 }
    const f = (e: Env) => _.of(e.count + 1)
    U.deepStrictEqual(await _.asksStateReaderTaskEither(f)({})(e)(), E.right(tuple({}, 1)))
  })

  it('local', async () => {
    U.deepStrictEqual(
      await pipe(
        _.asks((n: number) => n + 1),
        _.local(S.size)
      )({})('aaa')(),
      E.right(tuple({}, 4))
    )
  })

  it('tapError', async () => {
    const f = _.tapError<string, number, unknown, string, void>(() => _.modify((s) => s + 1))
    U.deepStrictEqual(await pipe(_.right<number, number, null, string>(1), f)(0)(null)(), E.right([0, 1] as const))
    U.deepStrictEqual(await pipe(_.left<string, number, null, number>('a'), f)(0)(null)(), E.left('a'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(undefined)(), E.right([undefined, RA.empty] as const))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(undefined)(), E.right([undefined, ['a0', 'b1']] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(undefined)(), E.left('e'))
    const append = (_i: number, n: number): _.StateReaderTaskEither<ReadonlyArray<number>, {}, Error, void> =>
      _.modify((a) => [...a, n])
    U.deepStrictEqual(
      await pipe(
        [1, 2, 3],
        _.traverseReadonlyArrayWithIndex(append),
        _.map(() => undefined)
      )([])({})(),
      E.right([[1, 2, 3], undefined] as const)
    )
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(undefined)(), E.right([undefined, ['a', 'b']] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(undefined)(undefined)(), E.left('e'))
    const append = (n: number): _.StateReaderTaskEither<ReadonlyArray<number>, {}, Error, void> =>
      _.modify((a) => [...a, n])
    U.deepStrictEqual(
      await pipe(
        [1, 2, 3],
        _.traverseReadonlyNonEmptyArray(append),
        _.map(() => undefined)
      )([])({})(),
      E.right([[1, 2, 3], undefined] as const)
    )
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number | string> = []
    const right = (n: number): _.StateReaderTaskEither<undefined, undefined, string, number> =>
      _.rightIO(() => {
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
      E.right([undefined, [1, 2]] as const)
    )
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(undefined)(undefined)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(undefined)(undefined)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
