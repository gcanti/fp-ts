import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderTask'
import * as A from '../src/ReadonlyArray'
import * as T from '../src/Task'
import { assertPar, assertSeq, deepStrictEqual } from './util'

describe('ReaderTask', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    deepStrictEqual(await pipe(_.of(1), _.map(double))({})(), 2)
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    deepStrictEqual(await pipe(_.of(double), _.ap(_.of(1)))({})(), 2)
  })

  it('apFirst', async () => {
    deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', async () => {
    deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('chain', async () => {
    const f = (a: string) => _.of(a.length)
    deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
  })

  it('chainFirst', async () => {
    const f = (a: string) => _.of(a.length)
    deepStrictEqual(await pipe(_.of('foo'), _.chainFirst(f))({})(), 'foo')
  })

  it('flatten', async () => {
    deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)({})(), 'a')
  })

  it('of', async () => {
    deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  it('fromIO', async () => {
    deepStrictEqual(await _.fromIO(() => 1)({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return deepStrictEqual(await _.ask<number>()(1)(), 1)
  })

  it('asks', async () => {
    return deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), 3)
  })

  it('fromTask', async () => {
    deepStrictEqual(await _.fromTask(T.of(1))({})(), 1)
  })

  it('fromReader', async () => {
    deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('chainTaskK', async () => {
    const f = (s: string) => T.of(s.length)
    deepStrictEqual(await pipe(_.of('a'), _.chainTaskK(f))(undefined)(), 1)
  })

  it('fromIOK', async () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK((s: string) => T.of(s.length))
    deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await assertSeq(_.ApplySeq, _.FromTask, (fa) => fa(null)())
    await assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa(null)())
  })

  it('ApplicativePar', async () => {
    await assertPar(_.ApplyPar, _.FromTask, (fa) => fa(null)())
    await assertPar(_.ApplicativePar, _.FromTask, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    deepStrictEqual(
      await pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', async () => {
    deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined)(), { a: 1, b: 'b' })
  })

  it('apT', async () => {
    deepStrictEqual(await pipe(_.of(1), _.tupled, _.apT(_.of('b')))({})(), [1, 'b'])
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceReadonlyArray)(undefined)(), arr)
    })
    it('traverseReadonlyArray', async () => {
      const arr = A.range(0, 10)
      deepStrictEqual(await pipe(arr, _.traverseReadonlyArray(_.of))(undefined)(), arr)
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      const arr = A.replicate(3, 1)
      deepStrictEqual(
        await pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(undefined)(),
        [0, 1, 2]
      )
    })
  })
})
