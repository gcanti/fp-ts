import { flow, pipe } from '../src/Function'
import * as I from '../src/Sync'
import * as R from '../src/Reader'
import * as RIO from '../src/ReaderSync'
import * as _ from '../src/ReaderAsync'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Async'
import * as U from './util'

describe('ReaderAsync', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.succeed(1), _.map(U.double))({})(), 2)
  })

  it('apPar', async () => {
    U.deepStrictEqual(await pipe(_.succeed(U.double), _.apPar(_.succeed(1)))({})(), 2)
  })

  it('zipLeftPar', async () => {
    U.deepStrictEqual(await pipe(_.succeed('a'), _.zipLeftPar(_.succeed('b')))({})(), 'a')
  })

  it('zipRightPar', async () => {
    U.deepStrictEqual(await pipe(_.succeed('a'), _.zipRightPar(_.succeed('b')))({})(), 'b')
  })

  it('flatMap', async () => {
    const f = flow(S.size, _.succeed)
    U.deepStrictEqual(await pipe(_.succeed('foo'), _.flatMap(f))({})(), 3)
  })

  it('tap', async () => {
    const f = flow(S.size, _.succeed)
    U.deepStrictEqual(await pipe(_.succeed('foo'), _.tap(f))({})(), 'foo')
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.succeed(_.succeed('a')), _.flatten)({})(), 'a')
  })

  it('succeed', async () => {
    U.deepStrictEqual(await _.fromReader(R.succeed(1))({})(), 1)
  })

  it('fromSync', async () => {
    U.deepStrictEqual(await _.fromSync(() => 1)({})(), 1)
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

  it('fromAsync', async () => {
    U.deepStrictEqual(await _.fromAsync(T.succeed(1))({})(), 1)
  })

  it('fromReader', async () => {
    U.deepStrictEqual(await _.fromReader(R.succeed(1))({})(), 1)
  })

  it('fromReaderSync', async () => {
    U.deepStrictEqual(await _.fromReaderSync(RIO.succeed(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('flatMapIO', async () => {
    const f = flow(S.size, I.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapSync(f))(undefined)(), 1)
  })

  it('flatMapAsync', async () => {
    const f = flow(S.size, T.succeed)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapAsync(f))(undefined)(), 1)
  })

  it('liftIO', async () => {
    const f = _.liftSync(flow(S.size, I.succeed))
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMap(f))({})(), 1)
  })

  it('liftAsync', async () => {
    const f = _.liftAsync(flow(S.size, T.succeed))
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMap(f))({})(), 1)
  })

  it('liftReaderSync', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await _.liftReaderSync(f)('a')(undefined)(), 1)
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderSync(f))({})(), 1)
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.succeed(s.length)
    U.deepStrictEqual(await pipe(_.succeed('a'), _.flatMapReaderSync(f))(undefined)(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await U.assertSeq(_.Apply, _.FromAsync, (fa) => fa(null)())
    await U.assertSeq(_.Applicative, _.FromAsync, (fa) => fa(null)())
  })

  it('ApplicativePar', async () => {
    await U.assertPar(_.ApplyPar, _.FromAsync, (fa) => fa(null)())
    await U.assertPar(_.ApplicativePar, _.FromAsync, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('bindRight', async () => {
    U.deepStrictEqual(await pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(undefined)(), {
      a: 1,
      b: 'b'
    })
  })

  it('zipFlatten', async () => {
    U.deepStrictEqual(await pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))({})(), [1, 'b'])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => _.succeed(a + i))
    U.deepStrictEqual(await pipe(RA.empty, f)(undefined)(), RA.empty)
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a0', 'b1'])
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => _.succeed(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a', 'b'])
  })

  it('sequenceReadonlyArrayPar', async () => {
    U.deepStrictEqual(await pipe(RA.empty, _.sequenceReadonlyArrayPar)(undefined)(), RA.empty)
    const log: Array<number> = []
    const append = (n: number): _.ReaderAsync<undefined, number> =>
      _.fromAsync(
        T.delay(n % 2 === 0 ? 50 : 100)(
          T.fromSync(() => {
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
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.succeed(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(undefined)(), ['a', 'b'])
  })

  it('sequenceReadonlyArray', async () => {
    U.deepStrictEqual(await pipe(RA.empty, _.sequenceReadonlyArray)(undefined)(), RA.empty)
    const log: Array<number> = []
    const append = (n: number): _.ReaderAsync<undefined, number> =>
      _.fromAsync(
        T.delay(n % 2 === 0 ? 50 : 100)(
          T.fromSync(() => {
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
