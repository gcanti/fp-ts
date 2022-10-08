import * as T from '@fp-ts/core/Async'
import { flow, pipe } from '@fp-ts/core/Function'
import * as R from '@fp-ts/core/Reader'
import * as _ from '@fp-ts/core/ReaderAsync'
import * as RIO from '@fp-ts/core/ReaderSync'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as S from '@fp-ts/core/string'
import * as I from '@fp-ts/core/Sync'
import * as U from '@fp-ts/core/test/util'

describe('ReaderAsync', () => {
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
    U.deepStrictEqual(await _.fromAsync(T.of(1))({})(), 1)
  })

  it('fromReader', async () => {
    U.deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  it('fromReaderSync', async () => {
    U.deepStrictEqual(await _.fromReaderSync(RIO.of(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('flatMapIO', async () => {
    const f = flow(S.size, I.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapSync(f))(undefined)(), 1)
  })

  it('flatMapAsync', async () => {
    const f = flow(S.size, T.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapAsync(f))(undefined)(), 1)
  })

  it('liftIO', async () => {
    const f = _.liftSync(flow(S.size, I.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMap(f))({})(), 1)
  })

  it('liftAsync', async () => {
    const f = _.liftAsync(flow(S.size, T.of))
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMap(f))({})(), 1)
  })

  it('liftReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await _.liftReaderSync(f)('a')(undefined)(), 1)
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapReaderSync(f))({})(), 1)
  })

  it('flatMapReaderSync', async () => {
    const f = (s: string) => RIO.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapReaderSync(f))(undefined)(), 1)
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
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('bindRight', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b')))(undefined)(), {
      a: 1,
      b: 'b'
    })
  })

  it('zipFlatten', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b')))({})(), [1, 'b'])
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

  it('traverseNonEmptyReadonlyArrayPar', async () => {
    const f = _.traverseNonEmptyReadonlyArrayPar((a: string) => _.of(a))
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

  it('traverseNonEmptyReadonlyArray', async () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => _.of(a))
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
