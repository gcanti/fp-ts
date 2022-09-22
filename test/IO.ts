import * as E from '../src/Either'
import { flow, pipe } from '../src/function'
import * as _ from '../src/IO'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

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

    it('zipRightPar', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.zipRightPar(_.of('b')))(), 'b')
    })

    it('flatMap', () => {
      const f = flow(U.double, _.of)
      U.deepStrictEqual(pipe(_.of(1), _.flatMap(f))(), 2)
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of(1)), _.flatten)(), 1)
    })

    it('tap', () => {
      const f = flow(U.double, _.of)
      U.deepStrictEqual(pipe(_.of(1), _.tap(f))(), 1)
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

  it('flatMapRec', () => {
    const f = (n: number) => (n < 15000 ? _.of(E.left(n + 1)) : _.of(E.right('ok ' + n)))
    U.deepStrictEqual(_.FlatRec.flatMapRec(f)(0)(), 'ok 15000')
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), ['a', 'b'])
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
    U.deepStrictEqual(pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(pipe(['a', 'b'], f)(), ['a0', 'b1'])
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], _.sequenceReadonlyArray)(), ['a', 'b'])
  })
})
