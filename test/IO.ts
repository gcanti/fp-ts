import { pipe } from '../src/function'
import * as _ from '../src/IO'
import * as U from './util'
import * as E from '../src/Either'
import * as RA from '../src/ReadonlyArray'

describe('IO', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.of(1), _.map(U.double))(), 2)
    })

    it('ap', () => {
      const assertAp = (a: _.IO<number>, b: _.IO<number>, expected: number) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.map((a) => (b: number) => a + b),
            _.ap(b)
          )(),
          expected
        )
      }
      assertAp(_.of(1), _.of(2), 3)
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

  it('apT', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.apT(_.of('b')))(), [1, 'b'])
  })

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: number) => _.of(a))
    U.deepStrictEqual(pipe([1, 2], f)(), [1, 2])
  })

  it('traverseReadonlyArray', () => {
    const f = _.traverseReadonlyArray((a: number) => _.of(a))
    U.strictEqual(pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(pipe([1, 2], f)(), [1, 2])
    U.deepStrictEqual(pipe([1, 2], f)(), [1, 2])
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: number) => _.of(a + i))
    U.strictEqual(pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(pipe([1, 2], f)(), [1, 3])
  })

  it('chainRec', () => {
    const f = (n: number) => (n < 15000 ? _.of(E.left(n + 1)) : _.of(E.right('ok ' + n)))
    U.deepStrictEqual(_.ChainRec.chainRec(f)(0)(), 'ok 15000')
  })
})
