import * as assert from 'assert'
import * as _ from '../src/IO'
import { semigroupSum } from '../src/Semigroup'
import { monoidSum } from '../src/Monoid'
import * as RA from '../src/ReadonlyArray'
import * as E from '../src/Either'
import { pipe } from '../src/function'

describe('IO', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.of(1), _.map(double))(), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      assert.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))(), 2)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(), 'a')
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(), 'b')
    })

    it('chain', () => {
      const f = (n: number) => _.of(n * 2)
      assert.deepStrictEqual(pipe(_.of(1), _.chain(f))(), 2)
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.of(_.of(1)), _.flatten)(), 1)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.of(n * 2)
      assert.deepStrictEqual(pipe(_.of(1), _.chainFirst(f))(), 1)
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(semigroupSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    assert.deepStrictEqual(S.concat(append('a'), append('b'))(), 3)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = _.getMonoid(monoidSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    assert.deepStrictEqual(M.concat(append('a'), M.empty)(), 1)
    assert.deepStrictEqual(M.concat(M.empty, append('b'))(), 2)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('chainRec', () => {
    const f = (n: number) => (n < 15000 ? _.of(E.left(n + 1)) : _.of(E.right('ok ' + n)))
    assert.deepStrictEqual(_.ChainRec.chainRec(0, f)(), 'ok 15000')
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    it('sequenceArray', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(pipe(arr, RA.map(_.of), _.sequenceArray)(), arr)
    })

    it('traverseArray', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(pipe(arr, _.traverseArray(_.of))(), arr)
    })

    it('traverseArrayWithIndex', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseArrayWithIndex((index, _data) => _.of(index))
        )(),
        arr
      )
    })
  })
})
