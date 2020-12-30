import * as assert from 'assert'
import { pipe } from '../src/function'
import * as _ from '../src/IO'
import { monoidSum } from '../src/Monoid'
import * as RA from '../src/ReadonlyArray'
import { semigroupSum } from '../src/Semigroup'

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
    assert.deepStrictEqual(pipe(append('a'), S.concat(append('b')))(), 3)
    assert.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = _.getMonoid(monoidSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    assert.deepStrictEqual(pipe(append('a'), M.concat(M.empty))(), 1)
    assert.deepStrictEqual(pipe(M.empty, M.concat(append('b')))(), 2)
    assert.deepStrictEqual(log, ['a', 'b'])
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

  it('apT', () => {
    assert.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b')))(), [1, 'b'])
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(pipe(arr, RA.map(_.of), _.sequenceReadonlyArray)(), arr)
    })

    it('traverseReadonlyArray', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.of))(), arr)
    })

    it('traverseReadonlyArrayWithIndex', () => {
      const arr = RA.range(0, 100)
      assert.deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(),
        arr
      )
    })
  })
})
