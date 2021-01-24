import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderTask'
import * as A from '../src/ReadonlyArray'
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
    const f = (a: string) => _.of(a.length)
    U.deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
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

  describe('array utils', () => {
    const range = A.range(0, 10)

    it('sequenceReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, A.map(_.of), _.sequenceReadonlyArray)(undefined)(), range)
    })
    it('traverseReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, _.traverseReadonlyArray(_.of))(undefined)(), range)
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      U.deepStrictEqual(
        await pipe(
          A.replicate(3, 1),
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(undefined)(),
        [0, 1, 2]
      )
    })
  })
})
