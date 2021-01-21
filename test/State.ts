import { pipe, tuple } from '../src/function'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/State'
import { deepStrictEqual } from './util'

describe('State', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      const x = (s: number) => tuple(s - 1, s + 1)
      deepStrictEqual(pipe(x, _.map(double))(0), [-2, 1])
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))(0), [2, 0])
    })

    it('apFirst', () => {
      deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(0), ['a', 0])
    })

    it('apSecond', () => {
      deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(0), ['b', 0])
    })

    it('chain', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      deepStrictEqual(pipe(x, _.chain(f))(0), [0, 2])
    })

    it('chainFirst', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      deepStrictEqual(pipe(x, _.chainFirst(f))(0), [-1, 2])
    })

    it('flatten', () => {
      deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)(0), ['a', 0])
    })
  })

  it('evaluate', () => {
    deepStrictEqual(pipe(_.of<string, number>('a'), _.evaluate(0)), 'a')
  })

  it('execute', () => {
    deepStrictEqual(pipe(_.of<string, number>('a'), _.execute(0)), 0)
  })

  it('put', () => {
    deepStrictEqual(_.put(2)(1), [undefined, 2])
  })

  it('get', () => {
    deepStrictEqual(_.get()(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    deepStrictEqual(_.modify(double)(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    deepStrictEqual(_.gets(double)(1), [2, 1])
  })

  it('do notation', () => {
    deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )('state'),
      [{ a: 1, b: 'b' }, 'state']
    )
  })

  it('apS', () => {
    deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), [{ a: 1, b: 'b' }, undefined])
  })

  it('apT', () => {
    deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b')))({}), [[1, 'b'], {}])
  })

  describe('array utils', () => {
    it('sequenceReadonlyArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      deepStrictEqual(pipe(arr, RA.map(add), _.sequenceReadonlyArray)(0), [arr, arr.reduce((p, c) => p + c, 0)])
    })

    it('traverseReadonlyArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      deepStrictEqual(pipe(arr, _.traverseReadonlyArray(add))(0), [arr, arr.reduce((p, c) => p + c, 0)])
    })
    it('traverseReadonlyArrayWithIndex', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      const arr = RA.range(0, 10)
      deepStrictEqual(
        pipe(
          arr,
          _.traverseReadonlyArrayWithIndex((_i, data) => add(data))
        )(0),
        [arr, arr.reduce((p, c) => p + c, 0)]
      )
    })
  })
})
