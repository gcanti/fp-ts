import * as assert from 'assert'
import * as E from '../src/Either'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as O from '../src/Option'
import { pipe, tuple } from '../src/function'
import * as R from '../src/Reader'
import * as RE from '../src/ReaderEither'
import * as RTE from '../src/ReaderTaskEither'
import { State } from '../src/State'
import * as _ from '../src/StateReaderTaskEither'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as A from '../src/Array'
import { assertSeq } from './util'

const state: unknown = {}

describe('StateReaderTaskEither', () => {
  describe('pipeables', () => {
    it('alt', async () => {
      const e1 = await pipe(
        _.right('a'),
        _.alt(() => _.left(1)),
        _.evaluate(state)
      )({})()
      assert.deepStrictEqual(e1, E.right('a'))
      const e2 = await pipe(
        pipe(
          _.left(1),
          _.alt(() => _.right('b')),
          _.evaluate(state)
        )
      )({})()
      assert.deepStrictEqual(e2, E.right('b'))
      const e3 = await pipe(
        pipe(
          _.left(1),
          _.alt(() => _.left(2)),
          _.evaluate(state)
        )
      )({})()
      assert.deepStrictEqual(e3, E.left(2))
    })

    it('map', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right('aaa'), _.map(len), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('ap', async () => {
      const len = (s: string): number => s.length
      const e = await pipe(_.right(len), _.ap(_.right('aaa')), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('apFirst', async () => {
      const e = await pipe(_.right('a'), _.apFirst(_.right('b')), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('apSecond', async () => {
      const e = await pipe(_.right('a'), _.apSecond(_.right('b')), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right('b'))
    })

    it('chain', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chain(f), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right(3))
    })

    it('chainFirst', async () => {
      const f = (s: string) => (s.length > 2 ? _.right(s.length) : _.right(0))
      const e = await pipe(_.right('aaa'), _.chainFirst(f), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right('aaa'))
    })

    it('chainFirst', async () => {
      const e = await pipe(_.right(_.right('a')), _.flatten, _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.right('a'))
    })

    it('bimap', async () => {
      const gt2 = (n: number): boolean => n > 2
      const len = (s: string): number => s.length
      const e1 = await pipe(_.right('aaa'), _.bimap(gt2, len), _.evaluate(state))({})()
      assert.deepStrictEqual(e1, E.right(3))
      const e2 = await pipe(_.left(3), _.bimap(gt2, len), _.evaluate(state))({})()
      assert.deepStrictEqual(e2, E.left(true))
    })

    it('mapLeft', async () => {
      const gt2 = (n: number): boolean => n > 2
      const e = await pipe(_.left(3), _.mapLeft(gt2), _.evaluate(state))({})()
      assert.deepStrictEqual(e, E.left(true))
    })

    it('fromPredicate', async () => {
      const predicate = (n: number) => n >= 2
      const gt2 = _.fromPredicate(predicate, (n) => `Invalid number ${n}`)

      const refinement = (u: string | number): u is number => typeof u === 'number'
      const isNumber = _.fromPredicate(refinement, (u) => `Invalid number ${String(u)}`)

      const e1 = await pipe(gt2(3), _.evaluate(state))({})()
      const e2 = await pipe(gt2(1), _.evaluate(state))({})()
      const e3 = await pipe(isNumber(4), _.evaluate(state))({})()
      assert.deepStrictEqual(e1, E.right(3))
      assert.deepStrictEqual(e2, E.left('Invalid number 1'))
      assert.deepStrictEqual(e3, E.right(4))
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
      assert.deepStrictEqual(e1, E.right(12))

      const e2 = await pipe(
        _.right(8),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        ),
        _.evaluate(state)
      )({})()
      assert.deepStrictEqual(e2, E.left('a'))
    })
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('applicativeStateReaderTaskEither', async () => {
    await assertSeq(_.Applicative, { fromTask: _.fromTask }, (fa) => fa(null)(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('run', async () => {
    const ma = _.right('aaa')
    const e = await ma({})({})()
    assert.deepStrictEqual(e, E.right(['aaa', {}]))
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
    assert.deepStrictEqual(await sequence([t1, t2])({})({})(), E.right([[2, 4], {}]))
    assert.deepStrictEqual(log, ['start 1', 'end 1', 'start 2', 'end 2'])
  })

  it('execute', async () => {
    const ma = _.right('a')
    const e = await pipe(ma, _.execute(state))({})()
    assert.deepStrictEqual(e, E.right({}))
  })

  it('rightState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = await pipe(_.rightState(s), _.evaluate(state))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('leftState', async () => {
    const s: State<unknown, number> = (s) => [1, s]
    const e = await pipe(_.leftState(s), _.evaluate(state))({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromReaderTaskEither', async () => {
    const rte: RTE.ReaderTaskEither<{}, string, number> = RTE.right(1)
    const e = await pipe(_.fromReaderTaskEither(rte), _.evaluate(state))({})()
    assert.deepStrictEqual(e, E.right(1))
  })

  it('left', async () => {
    const e = await _.left(1)({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('rightTask', async () => {
    const e = await _.rightTask(T.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftTask', async () => {
    const e = await _.leftTask(T.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromTaskEither', async () => {
    const e = await _.fromTaskEither(TE.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('rightReader', async () => {
    const e = await _.rightReader(R.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftReader', async () => {
    const e = await _.leftReader(R.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromIOEither', async () => {
    const e1 = await _.fromIOEither(IE.right(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromIOEither(IE.left(1))({})({})()
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromEither', async () => {
    const e1 = await _.fromEither(E.right(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromEither(E.left(1))({})({})()
    assert.deepStrictEqual(e2, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'err')(O.some(1))({})({})()
    assert.deepStrictEqual(e1, E.right([1, {}]))
    const e2 = await _.fromOption(() => 'err')(O.none)({})({})()
    assert.deepStrictEqual(e2, E.left('err'))
  })

  it('rightIO', async () => {
    const e = await _.rightIO(I.of(1))({})({})()
    assert.deepStrictEqual(e, E.right([1, {}]))
  })

  it('leftIO', async () => {
    const e = await _.leftIO(I.of(1))({})({})()
    assert.deepStrictEqual(e, E.left(1))
  })

  it('fromOption', async () => {
    const e1 = await _.fromOption(() => 'none')(O.none)({})({})()
    assert.deepStrictEqual(e1, E.left('none'))
    const e2 = await _.fromOption(() => 'none')(O.some(1))({})({})()
    assert.deepStrictEqual(e2, E.right([1, {}]))
  })

  it('fromReaderEither', async () => {
    const e1 = await _.fromReaderEither(RE.left('a'))({})({})()
    assert.deepStrictEqual(e1, E.left('a'))
    const e2 = await _.fromReaderEither(RE.right(1))({})({})()
    assert.deepStrictEqual(e2, E.right([1, {}]))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    const x = await pipe(_.right('a'), _.chainEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    const x = await pipe(_.right('a'), _.chainIOEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainTaskEitherK', async () => {
    const f = (s: string) => TE.right(s.length)
    const x = await pipe(_.right('a'), _.chainTaskEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('chainReaderTaskEitherK', async () => {
    const f = (s: string) => RTE.right(s.length)
    const x = await pipe(_.right('a'), _.chainReaderTaskEitherK(f))(undefined)(undefined)()
    assert.deepStrictEqual(x, E.right([1, undefined]))
  })

  it('put', async () => {
    assert.deepStrictEqual(await _.put(2)(1)({})(), E.right([undefined, 2]))
  })

  it('get', async () => {
    assert.deepStrictEqual(await _.get()(1)({})(), E.right([1, 1]))
  })

  it('modify', async () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(await _.modify(double)(1)({})(), E.right([undefined, 2]))
  })

  it('gets', async () => {
    const double = (n: number) => n * 2
    assert.deepStrictEqual(await _.gets(double)(1)({})(), E.right([2, 1]))
  })

  it('do notation', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.right<void, void, string, number>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined)(undefined)(),
      E.right([{ a: 1, b: 'b' }, undefined])
    )
  })

  it('apS', async () => {
    assert.deepStrictEqual(
      await pipe(_.right<void, void, string, number>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined)(
        undefined
      )(),
      E.right([{ a: 1, b: 'b' }, undefined])
    )
  })

  describe('array utils', () => {
    it('sequenceArray', async () => {
      const add = (n: number) => (s: number) => (_r: {}) => () => Promise.resolve(E.right(tuple(n, n + s)))
      const arr = A.range(0, 10)

      assert.deepStrictEqual(
        await pipe(arr, A.map(add), _.sequenceArray)(0)({})(),
        E.right([arr, arr.reduce((p, c) => p + c, 0)])
      )
    })

    it('traverseArray', async () => {
      const add = (n: number) => (s: number) => (_r: {}) => () => Promise.resolve(E.right(tuple(n, n + s)))
      const arr = A.range(0, 10)

      assert.deepStrictEqual(
        await pipe(arr, _.traverseArray(add))(0)({})(),
        E.right([arr, arr.reduce((p, c) => p + c, 0)])
      )
    })

    it('traverseArrayWithIndex', async () => {
      const add = (n: number) => _.rightState((s: number) => tuple(n, n + s))
      const arr = A.range(0, 10)

      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseArrayWithIndex((_index, a) =>
            pipe(
              a,
              _.fromPredicate(
                (a) => a > 5,
                () => 'ERROR'
              )
            )
          )
        )(0)({})(),
        E.left('ERROR')
      )

      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseArrayWithIndex((_, a) => add(a))
        )(0)({})(),
        E.right([arr, arr.reduce((p, c) => p + c, 0)])
      )
    })
  })
})
