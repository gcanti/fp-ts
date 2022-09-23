import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as _ from '../src/IO'
import * as N from '../src/number'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as U from './util'

describe('IO', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.of(1), _.map(U.double))(), 2)
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))(), 2)
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apFirst(_.of('b')))(), 'a')
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.apSecond(_.of('b')))(), 'b')
    })

    it('chain', () => {
      const f = (n: number) => _.of(n * 2)
      U.deepStrictEqual(pipe(_.of(1), _.chain(f))(), 2)
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of(1)), _.flatten)(), 1)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.of(n * 2)
      U.deepStrictEqual(pipe(_.of(1), _.chainFirst(f))(), 1)
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(N.SemigroupSum)
    const log: Array<string> = []
    const append =
      (message: string): _.IO<number> =>
      () =>
        log.push(message)
    U.deepStrictEqual(S.concat(append('a'), append('b'))(), 3)
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    const M = _.getMonoid(N.MonoidSum)
    const log: Array<string> = []
    const append =
      (message: string): _.IO<number> =>
      () =>
        log.push(message)
    U.deepStrictEqual(M.concat(append('a'), M.empty)(), 1)
    U.deepStrictEqual(M.concat(M.empty, append('b'))(), 2)
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('chainRec', () => {
    const f = (n: number) => (n < 15000 ? _.of(E.left(n + 1)) : _.of(E.right('ok ' + n)))
    U.deepStrictEqual(_.ChainRec.chainRec(0, f)(), 'ok 15000')
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b')),
        _.let('c', ({ a, b }) => [a, b])
      )(),
      { a: 1, b: 'b', c: [1, 'b'] }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
      U.strictEqual(pipe(RA.empty, f)(), RA.empty)
      U.deepStrictEqual(pipe(input, f)(), ['a0', 'b1'])
    })

    // old
    it('sequenceArray', () => {
      const log: Array<number | string> = []
      const append =
        (n: number): _.IO<number> =>
        () => {
          log.push(n)
          return n
        }
      U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceArray)(), [1, 2])
      U.deepStrictEqual(log, [1, 2])
    })
  })
})
