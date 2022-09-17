import { flow, pipe } from '../src/function'
import * as I from '../src/IO'
import * as R from '../src/Reader'
import * as RIO from '../src/ReaderIO'
import * as _ from '../src/ReaderTask'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

describe('ReaderTask', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.map(U.double))({})(), 2)
  })

  it('ap', async () => {
    U.deepStrictEqual(await pipe(_.of(U.double), _.ap(_.of(1)))({})(), 2)
  })

  it('apFirst', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('chain', async () => {
    const f = flow(S.size, _.of)
    U.deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
  })

  it('chainFirst', async () => {
    const f = flow(S.size, _.of)
    U.deepStrictEqual(await pipe(_.of('foo'), _.chainFirst(f))({})(), 'foo')
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)({})(), 'a')
  })

  it('of', async () => {
    U.deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  it('fromIO', async () => {
    U.deepStrictEqual(await _.fromIO(() => 1)({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return U.deepStrictEqual(await _.ask<number>()(1)(), 1)
  })

  it('asks', async () => {
    return U.deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), 3)
  })

  it('fromTask', async () => {
    U.deepStrictEqual(await _.fromTask(T.of(1))({})(), 1)
  })

  it('fromReader', async () => {
    U.deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  it('fromReaderIO', async () => {
    U.deepStrictEqual(await _.fromReaderIO(RIO.of(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = flow(S.size, I.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('chainTaskK', async () => {
    const f = flow(S.size, T.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainTaskK(f))(undefined)(), 1)
  })

  it('chainFirstTaskK', async () => {
    const f = flow(S.size, T.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainFirstTaskK(f))(undefined)(), 'a')
  })

  it('fromIOK', async () => {
    const f = _.fromIOK(flow(S.size, I.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK(flow(S.size, T.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await _.fromReaderIOK(f)('a')(undefined)(), 1)
  })

  it('chainReaderIOKW', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainReaderIOKW(f))({})(), 1)
  })

  it('chainReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainReaderIOK(f))(undefined)(), 1)
  })

  it('chainFirstReaderIOKW', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainFirstReaderIOKW(f))({})(), 'a')
  })

  it('chainFirstReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainFirstReaderIOK(f))({})(), 'a')
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await U.assertSeq(_.ApplySeq, _.FromTask, (fa) => fa(null)())
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.ApplyPar, _.FromTask, (fa) => fa(null)())
    await U.assertPar(_.ApplicativePar, _.FromTask, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined)(), { a: 1, b: 'b' })
  })

  it('apT', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.tupled, _.apT(_.of('b')))({})(), [1, 'b'])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), RA.empty)
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a0', 'b1'])
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a', 'b'])
  })

  it('sequenceReadonlyArray', async () => {
    U.deepStrictEqual(await pipe(RA.empty, _.sequenceReadonlyArray)(undefined)(), RA.empty)
    const log: Array<number> = []
    const append = (n: number): _.ReaderTask<undefined, number> =>
      _.fromTask(
        T.delay(n % 2 === 0 ? 50 : 100)(
          T.fromIO(() => {
            log.push(n)
            return n
          })
        )
      )
    const as = pipe(4, RA.makeBy(append))
    U.deepStrictEqual(await pipe(as, _.sequenceReadonlyArray)(undefined)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 2, 1, 3])
  })

  // --- Seq ---

  it('traverseReadonlyNonEmptyArraySeq', async () => {
    const f = _.traverseReadonlyNonEmptyArraySeq((a: string) => _.of(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a', 'b'])
  })

  it('sequenceReadonlyArraySeq', async () => {
    U.deepStrictEqual(await pipe(RA.empty, _.sequenceReadonlyArraySeq)(undefined)(), RA.empty)
    const log: Array<number> = []
    const append = (n: number): _.ReaderTask<undefined, number> =>
      _.fromTask(
        T.delay(n % 2 === 0 ? 50 : 100)(
          T.fromIO(() => {
            log.push(n)
            return n
          })
        )
      )
    const as = pipe(4, RA.makeBy(append))
    U.deepStrictEqual(await pipe(as, _.sequenceReadonlyArraySeq)(undefined)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 1, 2, 3])
  })
})
