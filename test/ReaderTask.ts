import * as assert from 'assert'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as R from '../src/Reader'
import * as A from '../src/Array'
import * as _ from '../src/ReaderTask'
import { semigroupString } from '../src/Semigroup'
import * as T from '../src/Task'
import { assertPar, assertSeq } from './util'

describe('ReaderTask', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(_.of(1), _.map(double))({})(), 2)
  })

  it('ap', async () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(await pipe(_.of(double), _.ap(_.of(1)))({})(), 2)
  })

  it('apFirst', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apFirst(_.of('b')))({})(), 'a')
  })

  it('apSecond', async () => {
    assert.deepStrictEqual(await pipe(_.of('a'), _.apSecond(_.of('b')))({})(), 'b')
  })

  it('chain', async () => {
    const f = (a: string) => _.of(a.length)
    assert.deepStrictEqual(await pipe(_.of('foo'), _.chain(f))({})(), 3)
    assert.deepStrictEqual(await _.readerTask.chain(_.of('foo'), f)({})(), 3)
  })

  it('chainFirst', async () => {
    const f = (a: string) => _.of(a.length)
    assert.deepStrictEqual(await pipe(_.of('foo'), _.chainFirst(f))({})(), 'foo')
  })

  it('flatten', async () => {
    assert.deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)({})(), 'a')
  })

  it('of', async () => {
    assert.deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  it('fromIO', async () => {
    assert.deepStrictEqual(await _.fromIO(() => 1)({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('ask', async () => {
    return assert.deepStrictEqual(await _.ask<number>()(1)(), 1)
  })

  it('asks', async () => {
    return assert.deepStrictEqual(await _.asks((s: string) => s.length)('foo')(), 3)
  })

  it('fromTask', async () => {
    assert.deepStrictEqual(await _.fromTask(T.of(1))({})(), 1)
  })

  it('fromReader', async () => {
    assert.deepStrictEqual(await _.fromReader(R.of(1))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('local', async () => {
    const len = (s: string): number => s.length
    assert.deepStrictEqual(
      await pipe(
        _.asks((n: number) => n + 1),
        _.local(len)
      )('aaa')(),
      4
    )
  })

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    assert.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(undefined)(), 1)
  })

  it('chainTaskK', async () => {
    const f = (s: string) => T.of(s.length)
    assert.deepStrictEqual(await pipe(_.of('a'), _.chainTaskK(f))(undefined)(), 1)
  })

  it('fromIOK', async () => {
    const f = _.fromIOK((s: string) => I.of(s.length))
    assert.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  it('fromTaskK', async () => {
    const f = _.fromTaskK((s: string) => T.of(s.length))
    assert.deepStrictEqual(await pipe(_.of('a'), _.chain(f))({})(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getSemigroup', async () => {
    const M = _.getSemigroup(semigroupString)
    assert.deepStrictEqual(await M.concat(_.of('a'), _.of('b'))({})(), 'ab')
  })

  it('getMonoid', async () => {
    const M = _.getMonoid(monoidString)
    assert.deepStrictEqual(await M.concat(_.of('a'), M.empty)({})(), 'a')
    assert.deepStrictEqual(await M.concat(M.empty, _.of('b'))({})(), 'b')
    assert.deepStrictEqual(await M.concat(_.of('a'), _.of('b'))({})(), 'ab')
  })

  it('applicativeTaskEitherSeq', async () => {
    await assertSeq(_.ApplicativeSeq, { fromTask: _.fromTask }, (fa) => fa(null)())
  })

  it('applicativeTaskEitherPar', async () => {
    await assertPar(_.ApplicativePar, { fromTask: _.fromTask }, (fa) => fa(null)())
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    assert.deepStrictEqual(
      await pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined)(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', async () => {
    assert.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined)(), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    it('sequenceArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, A.map(_.of), _.sequenceArray)(undefined)(), arr)
    })
    it('traverseArray', async () => {
      const arr = A.range(0, 10)
      assert.deepStrictEqual(await pipe(arr, _.traverseArray(_.of))(undefined)(), arr)
    })

    it('traverseArrayWithIndex', async () => {
      const arr = A.replicate(3, 1)
      assert.deepStrictEqual(
        await pipe(
          arr,
          _.traverseArrayWithIndex((index, _data) => _.of(index))
        )(undefined)(),
        [0, 1, 2]
      )
    })
  })
})
