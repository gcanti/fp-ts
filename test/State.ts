import { pipe } from '../src/function'
import * as _ from '../src/State'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import { tuple } from '../src/tuple'

describe('State', () => {
  describe('pipeables', () => {
    it('map', () => {
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.map(U.double))(0), [-2, 1])
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))(0), [2, 0])
    })

    it('zipLeftPar', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.zipLeftPar(_.of('b')))(0), ['a', 0])
    })

    it('zipRightPar', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.zipRightPar(_.of('b')))(0), ['b', 0])
    })

    it('flatMap', () => {
      const f = (_n: number) => (s: number) => tuple(s - 1, s + 1)
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.flatMap(f))(0), [0, 2])
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
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.deepStrictEqual(pipe(RA.empty, f)({}), [RA.empty, {}])
      U.deepStrictEqual(pipe(input, f)({}), [['a0', 'b1'], {}])
    })

    it('traverseReadonlyNonEmptyArray', () => {
      const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
      U.deepStrictEqual(pipe(input, f)({}), [['a', 'b'], {}])
    })

    it('sequenceReadonlyArray', () => {
      const append =
        (n: number): _.State<ReadonlyArray<number>, number> =>
        (s) =>
          [n, [...s, n]]
      U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceReadonlyArray)([]), [
        [1, 2],
        [1, 2]
      ])
    })
  })
})
