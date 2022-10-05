import * as E from '../src/Either'
import { flow, pipe } from '../src/Function'
import * as _ from '../src/IO'
import * as RA from '../src/ReadonlyArray'
import * as U from './util'

describe('IO', () => {
  it('log', () => {
    const log_ = console.log
    const logger: Array<any> = []

    console.log = (a: any) => {
      logger.push(a)
    }
    _.log('log')()
    U.deepStrictEqual(logger, ['log'])

    console.log = log_
  })

  it('logError', () => {
    const error_ = console.error
    const logger: Array<any> = []

    console.error = (a: any) => {
      logger.push(a)
    }
    _.logError('error')()
    U.deepStrictEqual(logger, ['error'])

    console.error = error_
  })

  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.succeed(1), _.map(U.double))(), 2)
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
      assertAp(_.succeed(1), _.succeed(2), 3)
    })

    it('flatMap', () => {
      const f = flow(U.double, _.succeed)
      U.deepStrictEqual(pipe(_.succeed(1), _.flatMap(f))(), 2)
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.succeed(_.succeed(1)), _.flatten)(), 1)
    })

    it('tap', () => {
      const f = flow(U.double, _.succeed)
      U.deepStrictEqual(pipe(_.succeed(1), _.tap(f))(), 1)
    })
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(), { a: 1, b: 'b' })
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))(), [1, 'b'])
  })

  it('flatMapRec', () => {
    const f = (n: number) => (n < 15000 ? _.succeed(E.left(n + 1)) : _.succeed(E.succeed('ok ' + n)))
    U.deepStrictEqual(_.FlattenableRec.flatMapRec(f)(0)(), 'ok 15000')
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.succeed(a))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), ['a', 'b'])
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.succeed(a + i))
    U.deepStrictEqual(pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(pipe(['a', 'b'], f)(), ['a0', 'b1'])
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.succeed('a'), _.succeed('b')], _.sequenceReadonlyArray)(), ['a', 'b'])
  })
})
