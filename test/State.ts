import * as U from './util'
import { pipe, tuple } from '../src/function'
import * as _ from '../src/State'

describe('State', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.map(double))(0), [-2, 1])
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      U.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))(0), [2, 0])
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

  it('evalState', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.evalState(_.of<number, string>('a'), 0), 'a')
  })

  it('execState', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.execState(_.of<number, string>('a'), 0), 0)
  })

  it('evaluate', () => {
    U.deepStrictEqual(pipe(_.of<number, string>('a'), _.evaluate(0)), 'a')
  })

  it('execute', () => {
    U.deepStrictEqual(pipe(_.of<number, string>('a'), _.execute(0)), 0)
  })

  it('put', () => {
    U.deepStrictEqual(_.put(2)(1), [undefined, 2])
  })

  it('get', () => {
    U.deepStrictEqual(_.get()(1), [1, 1])
  })

  it('modify', () => {
    const double = (n: number) => n * 2
    U.deepStrictEqual(_.modify(double)(1), [undefined, 2])
  })

  it('gets', () => {
    const double = (n: number) => n * 2
    U.deepStrictEqual(_.gets(double)(1), [2, 1])
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

  it('sequenceArray', () => {
    const append = (n: number): _.State<ReadonlyArray<number>, number> => (s) => [n, [...s, n]]
    U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceArray)([]), [
      [1, 2],
      [1, 2]
    ])
  })
})
