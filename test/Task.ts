import * as assert from 'assert'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import { pipe } from '../src/function'
import * as _ from '../src/Task'
import * as RA from '../src/ReadonlyArray'
import { assertSeq, assertPar } from './util'

const delayReject = <A>(n: number, a: A): _.Task<A> => () =>
  new Promise<A>((_, reject) => {
    setTimeout(() => reject(a), n)
  })

const delay = <A>(millis: number, a: A): _.Task<A> => _.delay(millis)(_.of(a))

describe('Task', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(delay(1, 2), _.map(double))(), 4)
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(delay(1, double), _.ap(delay(0, 2)))(), 4)
  })

  it('apFirst', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))(), 'a')
  })

  it('apSecond', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))(), 'b')
  })

  it('chain', async () => {
    const f = (n: number): _.Task<number> => () => Promise.resolve(n * 2)
    return assert.deepStrictEqual(await pipe(delay(1, 2), _.chain(f))(), 4)
  })

  it('chainFirst', async () => {
    const f = (n: number): _.Task<number> => () => Promise.resolve(n * 2)
    return assert.deepStrictEqual(await pipe(delay(1, 2), _.chainFirst(f))(), 2)
  })

  it('flatten', async () => {
    return assert.deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)(), 'a')
  })

  it('fromIO', async () => {
    const io = () => 1
    const t = _.fromIO(io)
    assert.deepStrictEqual(await t(), 1)
  })

  it('fromTask', async () => {
    const io = () => 1
    const t = _.fromIO(io)
    assert.deepStrictEqual(_.fromTask(t), t)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('applicativeTaskSeq', async () => {
    await assertSeq(_.ApplicativeSeq, { fromTask: _.fromTask }, (fa) => fa())
  })

  it('applicativeTaskPar', async () => {
    await assertPar(_.ApplicativePar, { fromTask: _.fromTask }, (fa) => fa())
  })

  describe('getRaceMonoid', () => {
    const M = _.getRaceMonoid<number>()

    it('concat', async () => {
      assert.deepStrictEqual(await M.concat(delay(10, 1), delay(10, 2))(), 1)
    })

    it('empty (right)', async () => {
      assert.deepStrictEqual(await M.concat(delay(10, 1), M.empty)(), 1)
    })

    it('empty (left)', async () => {
      assert.deepStrictEqual(await M.concat(M.empty, delay(10, 1))(), 1)
    })

    it('concat (rejected)', async () => {
      try {
        await M.concat(delayReject(10, 1), delayReject(10, 2))()
      } catch (actual) {
        return assert.deepStrictEqual(actual, 1)
      }
    })
  })

  describe('getMonoid', () => {
    const M = _.getMonoid(monoidString)

    it('concat', async () => {
      assert.deepStrictEqual(await M.concat(delay(10, 'a'), delay(10, 'b'))(), 'ab')
    })

    it('empty (right)', async () => {
      assert.deepStrictEqual(await M.concat(delay(10, 'a'), M.empty)(), 'a')
    })

    it('empty (left)', async () => {
      assert.deepStrictEqual(await M.concat(M.empty, delay(10, 'a'))(), 'a')
    })
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    assert.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(), 1)
  })

  it('do notation', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', async () => {
    assert.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    it('sequenceArray', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, RA.map(_.of), _.sequenceArray)(), arr)
    })

    it('traverseArray', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, _.traverseArray(_.of))(), arr)
    })

    it('traverseArrayWithIndex', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseArrayWithIndex((index, _data) => _.of(index))
        )(),
        arr
      )
    })

    it('sequenceSeqArray', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, RA.map(_.of), _.sequenceSeqArray)(), arr)
    })

    it('traverseSeqArray', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, _.traverseSeqArray(_.of))(), arr)
    })

    it('traverseSeqArrayWithIndex', async () => {
      const arr = RA.range(0, 10)
      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseSeqArrayWithIndex((index, _data) => _.of(index))
        )(),
        arr
      )
    })
  })
})
