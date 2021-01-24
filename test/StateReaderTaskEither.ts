import * as E from '../src/Either'
import { pipe, tuple } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RTE from '../src/ReaderTaskEither'
import * as A from '../src/ReadonlyArray'
import { State } from '../src/State'
import * as _ from '../src/StateReaderTaskEither'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as U from './util'

const state: unknown = {}

describe('StateReaderTaskEither', () => {
  describe('pipeables', () => {
    it('alt', async () => {
      const assertAlt = async (
        a: _.StateReaderTaskEither<undefined, null, string, number>,
        b: _.StateReaderTaskEither<undefined, null, string, number>,
        expected: E.Either<string, readonly [number, undefined]>
      ) => {
        U.deepStrictEqual(
          await pipe(
            a,
            _.alt(() => b)
          )(undefined)(null)(),
          expected
        )
      }
      await assertAlt(_.right(1), _.right(2), E.right([1, undefined]))
      await assertAlt(_.right(1), _.left('b'), E.right([1, undefined]))
      await assertAlt(_.left('a'), _.right(2), E.right([2, undefined]))
      await assertAlt(_.left('a'), _.left('b'), E.left('b'))
    })

    it('map', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right('aaa'), _.map(len), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right(len), _.ap(_.right('aaa')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('apFirst', async () => {
      const e = await pipe(_.right('a'), _.apFirst(_.right('b')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('a'))
    })

    it('apSecond', async () => {
      const e = await pipe(_.right('a'), _.apSecond(_.right('b')), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('b'))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chain(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right(3))
    })

    it('chainFirst', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chainFirst(f), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('aaa'))
    })

    it('chainFirst', async () => {
      const e = await pipe(_.right(_.right('a')), _.flatten, _.evaluate(state))({})()
      U.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const gt2 = (n: number): boolean => n > 2
      const len = (s: string): number => s.length
      const e1 = await pipe(_.right('aaa'), _.bimap(gt2, len), _.evaluate(state))({})()
      U.deepStrictEqual(e1, E.right(3))
      const e2 = await pipe(_.left(3), _.bimap(gt2, len), _.evaluate(state))({})()
      U.deepStrictEqual(e2, E.left(true))
    })

    it('mapLeft', async () => {
      const gt2 = (n: number): boolean => n > 2
      const e = await pipe(_.left(3), _.mapLeft(gt2), _.evaluate(state))({})()
      U.deepStrictEqual(e, E.left(true))
    })

    it('fromPredicate', async () => {
      const f = _.fromPredicate((n: number) => n >= 2)
      U.deepStrictEqual(await pipe(f(3), _.evaluate(state))({})(), E.right(3))
      U.deepStrictEqual(await pipe(f(1), _.evaluate(state))({})(), E.left(1))
    })

    it('filterOrElse', async () => {
      const e1 = await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        ),
        _.evaluate(state)
      )({})()
      U.deepStrictEqual(e1, E.right(12))

      const e2 = await pipe(
        _.right(8),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        ),
        _.evaluate(state)
      )({})()
      U.deepStrictEqual(e2, E.left('a'))
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
    U.deepStrictEqual(e, E.right(['aaa', {}] as const))
  })

  it('applicativeReaderTaskEitherSeq', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.StateReaderTaskEither<{}, {}, void, number> =>
      _.rightTask(() => Promise.resolve(log.push(message)))
    const t1 = pipe(
      append('start 1'),
      _.chain(() => append('end 1'))
    )
    const t2 = pipe(
      append('start 2'),
      _.chain(() => append('end 2'))
    )
    const sequence = A.sequence(_.Applicative)
    U.deepStrictEqual(await sequence([t1, t2])({})({})(), E.right([[2, 4], {}] as const))
    U.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('execute', async () => {
    const ma = _.right('a')
    const e = await pipe(ma, _.execute(state))({})()
    U.deepStrictEqual(e, E.right({}))
  })

  it('rightState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = await pipe(_.rightState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = await pipe(_.leftState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.right(1)
    const e = await pipe(_.fromReaderTaskEither(rte), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('fromState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = await pipe(_.fromState(s), _.evaluate(state))({})()
    U.deepStrictEqual(e, E.right(1))
  })

  it('left', async () => {
    const e = await _.left(1)({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.rightTask(T.of(1))({})({})()
    U.deepStrictEqual(e, E.right([1, {}] as const))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.fromTaskEither(TE.of(1))({})({})()
    U.deepStrictEqual(e, E.right([1, {}] as const))
  })

  it('rightReader', async () => {
    const e = await _.rightReader(R.of(1))({})({})()
    U.deepStrictEqual(e, E.right([1, {}] as const))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(IE.right(1))({})({})()
    U.deepStrictEqual(e1, E.right([1, {}] as const))
    const e2 = await _.fromIOEither(IE.left(1))({})({})()
    U.deepStrictEqual(e2, E.left(1))
  })

  it('fromEither', async () => {
    const e1 = await _.fromEither(E.right(1))({})({})()
    U.deepStrictEqual(e1, E.right([1, {}] as const))
    const e2 = await _.fromEither(E.left(1))({})({})()
    U.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'err')(O.some(1))({})({})()
    U.deepStrictEqual(e1, E.right([1, {}] as const))
    const e2 = await _.fromOption(() => 'err')(O.none)({})({})()
    U.deepStrictEqual(e2, E.left('err'))
  })

  it('rightIO', async () => {
    const e = await _.rightIO(I.of(1))({})({})()
    U.deepStrictEqual(e, E.right([1, {}] as const))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.of(1))({})({})()
    U.deepStrictEqual(e, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'none')(O.none)({})({})()
    U.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.fromOption(() => 'none')(O.some(1))({})({})()
    U.deepStrictEqual(e2, E.right([1, {}] as const))
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.left('a'))({})({})()
    U.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.fromReaderEither(RE.right(1))({})({})()
    U.deepStrictEqual(e2, E.right([1, {}] as const))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await pipe(_.right('a'), _.chainEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([1, undefined] as const))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([1, undefined] as const))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    const x = await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([1, undefined] as const))
  })

  it('chainReaderTaskEitherK', async () => {
    const f = (s: string) => RTE.right(s.length)
    const x = await pipe(_.right('a'), _.chainReaderTaskEitherK(f))(undefined)(undefined)()
    U.deepStrictEqual(x, E.right([1, undefined] as const))
  })

  it('put', async () => {
    U.deepStrictEqual(await _.put(2)(1)({})(), E.right([undefined, 2] as const))
  })

  it('get', async () => {
    U.deepStrictEqual(await _.get()(1)({})(), E.right([1, 1] as const))
  })

  it('modify', async () => {
    U.deepStrictEqual(await _.modify(U.double)(1)({})(), E.right([undefined, 2] as const))
  })

  it('gets', async () => {
    U.deepStrictEqual(await _.gets(U.double)(1)({})(), E.right([2, 1] as const))
  })

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right<number, void, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(undefined)(),
      E.right([{ a: 1, b: 'b' }, undefined] as const)
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, void, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(
        undefined
      )(),
      E.right([{ a: 1, b: 'b' }, undefined] as const)
    )
  })

  it('apT', async () => {
    U.deepStrictEqual(
      await pipe(_.right<number, {}, {}, string>(1), _.tupled, _.apT(_.right('b')))({})({})(),
      E.right([[1, 'b'], {}] as const)
    )
  })

  describe('array utils', () => {
    const range = A.range(0, 10)

    it('sequenceReadonlyArray', async () => {
      const add = (n: number) => (s: number) => (_r: {}) => () => Promise.resolve(E.right(tuple(n, n + s)))

      U.deepStrictEqual(
        await pipe(range, A.map(add), _.sequenceReadonlyArray)(0)({})(),
        E.right([range, range.reduce((p, c) => p + c, 0)] as const)
      )
    })

    it('traverseReadonlyArray', async () => {
      const add = (n: number) => (s: number) => (_r: {}) => () => Promise.resolve(E.right(tuple(n, n + s)))

      U.deepStrictEqual(
        await pipe(range, _.traverseReadonlyArray(add))(0)({})(),
        E.right([range, range.reduce((p, c) => p + c, 0)] as const)
      )
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      const add = (n: number) => _.rightState((s: number) => tuple(n, n + s))

      U.deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndex((_index, a) =>
            pipe(
              a,
              _.fromPredicate((a) => a > 5)
            )
          )
        )(0)({})(),
        E.left(0)
      )

      U.deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndex((_, a) => add(a))
        )(0)({})(),
        E.right([range, range.reduce((p, c) => p + c, 0)] as const)
      )
    })
  })
})
