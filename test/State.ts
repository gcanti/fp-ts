import { pipe } from '../src/Function'
import * as _ from '../src/State'
import * as U from './util'
import * as RA from '../src/ReadonlyArray'
import type { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import { tuple } from '../src/tuple'

describe('State', () => {
  it('unit', () => {
    U.deepStrictEqual(_.unit<number>()(0), [0, undefined])
  })

  describe('pipeables', () => {
    it('map', () => {
      const x = (s: number) => tuple(s - 1, s + 1)
      U.deepStrictEqual(pipe(x, _.map(U.double))(0), [-1, 2])
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))(0), [0, 2])
    })

    it('flatMap', () => {
      const f = (a: string) => (s: string) => tuple(s + 's2', s + 'a2' + a)
      const x = (s: string) => tuple(s + 's1', s + 'a1')
      U.deepStrictEqual(pipe(x, _.flatMap(f))(''), ['s1s2', 's1a2a1'])
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)(0), [0, 'a'])
    })
  })

  it('evaluate', () => {
    U.deepStrictEqual(pipe(_.of<string, number>('a'), _.evaluate(0)), 'a')
  })

  it('execute', () => {
    U.deepStrictEqual(pipe(_.of<string, number>('a'), _.execute(0)), 0)
  })

  it('put', () => {
    U.deepStrictEqual(_.put(2)(1), [2, undefined])
  })

  it('get', () => {
    U.deepStrictEqual(_.get()(1), [1, 1])
  })

  it('modify', () => {
    U.deepStrictEqual(_.modify(U.double)(1), [2, undefined])
  })

  it('gets', () => {
    U.deepStrictEqual(_.gets(U.double)(1), [1, 2])
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )('state'),
      ['state', { a: 1, b: 'b' }]
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b')))(undefined), [
      undefined,
      { a: 1, b: 'b' }
    ])
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b')))({}), [{}, [1, 'b']])
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.deepStrictEqual(pipe(RA.empty, f)({}), [{}, RA.empty])
      U.deepStrictEqual(pipe(input, f)({}), [{}, ['a0', 'b1']])
    })

    it('traverseReadonlyNonEmptyArray', () => {
      const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
      U.deepStrictEqual(pipe(input, f)({}), [{}, ['a', 'b']])
    })

    it('sequenceReadonlyArray', () => {
      const append =
        (n: number): _.State<ReadonlyArray<number>, number> =>
        (s) =>
          [[...s, n], n]
      U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceReadonlyArray)([]), [
        [1, 2],
        [1, 2]
      ])
    })
  })
})
