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

  it('apPar', async () => {
    U.deepStrictEqual(await pipe(_.of(U.double), _.apPar(_.of(1)))({})(), 2)
  })

  it('zipLeftPar', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.zipLeftPar(_.of('b')))({})(), 'a')
  })

  it('zipRightPar', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.zipRightPar(_.of('b')))({})(), 'b')
  })

  it('flatMap', async () => {
    const f = flow(S.size, _.of)
    U.deepStrictEqual(await pipe(_.of('foo'), _.flatMap(f))({})(), 3)
  })

  it('tap', async () => {
    const f = flow(S.size, _.of)
    U.deepStrictEqual(await pipe(_.of('foo'), _.tap(f))({})(), 'foo')
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

  it('flatMapIOK', async () => {
    const f = flow(S.size, I.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapIOK(f))(undefined)(), 1)
  })

  it('flatMapTaskK', async () => {
    const f = flow(S.size, T.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapTaskK(f))(undefined)(), 1)
  })

  it('fromIOK', async () => {
    const f = _.fromIOK(flow(S.size, I.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMap(f))({})(), 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK(flow(S.size, T.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMap(f))({})(), 1)
  })

  it('fromReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await _.fromReaderIOK(f)('a')(undefined)(), 1)
  })

  it('flatMapReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapReaderIOK(f))({})(), 1)
  })

  it('flatMapReaderIOK', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapReaderIOK(f))(undefined)(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromTask, (fa) => fa(null)())
    await U.assertSeq(_.Applicative, _.FromTask, (fa) => fa(null)())
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
    U.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.bindPar('b', _.of('b')))(undefined)(), { a: 1, b: 'b' })
  })

  it('flatZipPar', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.tupled, _.flatZipPar(_.of('b')))({})(), [1, 'b'])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => _.of(a + i))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), RA.empty)
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a0', 'b1'])
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => _.of(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a', 'b'])
  })

  it('sequenceReadonlyArrayPar', async () => {
    U.deepStrictEqual(await pipe(RA.empty, _.sequenceReadonlyArrayPar)(undefined)(), RA.empty)
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
    U.deepStrictEqual(await pipe(as, _.sequenceReadonlyArrayPar)(undefined)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 2, 1, 3])
  })

  // --- Seq ---

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
    U.deepStrictEqual(log, [0, 1, 2, 3])
  })
})
