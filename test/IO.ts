import * as U from './util'
import * as E from '../src/Either'
import { pipe } from '../src/function'
import * as _ from '../src/IO'
import * as N from '../src/number'

describe('IO', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.of(1), _.map(double))(), 2)
    })

    it('ap', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(pipe(_.of(double), _.ap(_.of(1)))(), 2)
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
    // tslint:disable-next-line: deprecation
    const S = _.getSemigroup(N.SemigroupSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
    U.deepStrictEqual(S.concat(append('a'), append('b'))(), 3)
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getMonoid(N.MonoidSum)
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): _.IO<number> => () => log.push(message)
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
        _.bind('b', () => _.of('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  it('sequenceArray', () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const append = (n: number): _.IO<number> => () => {
      log.push(n)
      return n
    }
    U.deepStrictEqual(pipe([append(1), append(2)], _.sequenceArray)(), [1, 2])
    U.deepStrictEqual(log, [1, 2])
  })
})
