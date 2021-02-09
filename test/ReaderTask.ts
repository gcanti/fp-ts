import * as U from './util'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as R from '../src/Reader'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReaderTask'
import { semigroupString } from '../src/Semigroup'
import * as T from '../src/Task'

describe('ReaderTask', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.of(1), _.map(double))({})(), 2)
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(_.of(double), _.ap(_.of(1)))({})(), 2)
  })

  it('apFirst', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', async () => {
    U.deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('chain', async () => {
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
    U.deepStrictEqual(await _.Monad.chain(_.of('foo'), f)({})(), 3)
  })

  it('chainFirst', async () => {
    const f = (a: string) => _.of(a.length)
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

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('local', async () => {
    const len = (s: string): number => s.length
    U.deepStrictEqual(
      await pipe(
        _.asks((n: number) => n + 1),
        // tslint:disable-next-line: deprecation
        _.local(len)
      )('aaa')(),
      4
    )
  })

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('chainTaskK', async () => {
    const f = (s: string) => T.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainTaskK(f))(undefined)(), 1)
  })

  it('fromIOK', async () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    U.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK((s: string) => T.of(s.length))
    U.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getSemigroup', async () => {
    // tslint:disable-next-line: deprecation
    const M = _.getSemigroup(semigroupString)
    U.deepStrictEqual(await M.concat(_.of('a'), _.of('b'))({})(), 'ab')
  })

  it('getMonoid', async () => {
    // tslint:disable-next-line: deprecation
    const M = _.getMonoid(monoidString)
    U.deepStrictEqual(await M.concat(_.of('a'), M.empty)({})(), 'a')
    U.deepStrictEqual(await M.concat(M.empty, _.of('b'))({})(), 'b')
    U.deepStrictEqual(await M.concat(_.of('a'), _.of('b'))({})(), 'ab')
  })

  it('applicativeTaskEitherSeq', async () => {
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('applicativeTaskEitherPar', async () => {
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

  it('sequenceArray', async () => {
    // tslint:disable-next-line: readonly-array
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
    const as = RA.makeBy(4, append)
    U.deepStrictEqual(await pipe(as, _.sequenceArray)(undefined)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 2, 1, 3])
  })

  it('sequenceSeqArray', async () => {
    // tslint:disable-next-line: readonly-array
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
    const as = RA.makeBy(4, append)
    U.deepStrictEqual(await pipe(as, _.sequenceSeqArray)(undefined)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 1, 2, 3])
  })
})
