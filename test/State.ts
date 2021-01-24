import { pipe, tuple } from '../src/function'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/State'
import * as U from './util'

describe('State', () => {
  describe('pipeables', () => {
    it('map', () => {
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.map(U.double))(0), [-2, 1])
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))(0), [2, 0])
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(0), ['a', 0])
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(0), ['b', 0])
    })

    it('chain', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.chain(f))(0), [0, 2])
    })

    it('chainFirst', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.chainFirst(f))(0), [-1, 2])
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)(0), ['a', 0])
    })
  })

  it('evaluate', () => {
    U.deepStrictEqual(pipe(_.of<string, number>('a'), _.evaluate(0)), 'a')
  })

  it('execute', () => {
    U.deepStrictEqual(pipe(_.of<string, number>('a'), _.execute(0)), 0)
  })

  it('put', () => {
    U.deepStrictEqual(_.put(2)(1), [undefined, 2])
  })

  it('get', () => {
    U.deepStrictEqual(_.get()(1), [1, 1])
  })

  it('modify', () => {
    U.deepStrictEqual(_.modify(U.double)(1), [undefined, 2])
  })

  it('gets', () => {
    U.deepStrictEqual(_.gets(U.double)(1), [2, 1])
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )('state'),
      [{ a: 1, b: 'b' }, 'state']
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(undefined), [{ a: 1, b: 'b' }, undefined])
  })

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b')))({}), [[1, 'b'], {}])
  })

  describe('array utils', () => {
    const range = RA.range(0, 10)

    it('sequenceReadonlyArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      U.deepStrictEqual(pipe(range, RA.map(add), _.sequenceReadonlyArray)(0), [range, range.reduce((p, c) => p + c, 0)])
    })

    it('traverseReadonlyArray', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      U.deepStrictEqual(pipe(range, _.traverseReadonlyArray(add))(0), [range, range.reduce((p, c) => p + c, 0)])
    })
    it('traverseReadonlyArrayWithIndex', () => {
      const add = (n: number) => (s: number) => tuple(n, n + s)
      U.deepStrictEqual(
        pipe(
          range,
          _.traverseReadonlyArrayWithIndex((_i, data) => add(data))
        )(0),
        [range, range.reduce((p, c) => p + c, 0)]
      )
    })
  })
})
