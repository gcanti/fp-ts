import * as U from './util'
import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/Task'
import * as assert from 'assert'
import * as S from '../src/string'

const delayReject = <A>(n: number, a: A): _.Task<A> => () =>
  new Promise<A>((_, reject) => {
    setTimeout(() => reject(a), n)
  })

const delay = <A>(millis: number, a: A): _.Task<A> => _.delay(millis)(_.of(a))

const assertOp = <A, B, C>(f: (a: _.Task<A>, b: _.Task<B>) => _.Task<C>) => async (
  a: _.Task<A>,
  b: _.Task<B>,
  expected: C,
  expectedLog: ReadonlyArray<A | B>
) => {
  // tslint:disable-next-line: readonly-array
  const log: Array<unknown> = []
  const append: <A>(ma: _.Task<A>) => _.Task<A> = _.chainFirst((x) =>
    _.fromIO(() => {
      log.push(x)
    })
  )
  const c = await pipe(f(pipe(a, append), pipe(b, append)))()
  U.deepStrictEqual(c, expected)
  assert.deepStrictEqual(log, expectedLog)
}

describe('Task', () => {
  // -------------------------------------------------------------------------------------
  // pipeables
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    U.deepStrictEqual(await pipe(delay(1, 2), _.map(double))(), 4)
  })

  it('ap', async () => {
    const deepStrictEqual = assertOp<string, string, string>((a, b) =>
      pipe(
        _.of((a: string) => (b: string) => a + b),
        _.ap(a),
        _.ap(b)
      )
    )
    const a = pipe(_.of('a'), _.delay(100))
    const b = _.of('b')
    await deepStrictEqual(a, b, 'ab', ['b', 'a'])
  })

  it('apFirst', async () => {
    const deepStrictEqual = assertOp((a, b) => pipe(a, _.apFirst(b)))
    const a = pipe(_.of('a'), _.delay(100))
    const b = _.of('b')
    await deepStrictEqual(a, b, 'a', ['b', 'a'])
  })

  it('apSecond', async () => {
    const deepStrictEqual = assertOp((a, b) => pipe(a, _.apSecond(b)))
    const a = pipe(_.of('a'), _.delay(100))
    const b = _.of('b')
    await deepStrictEqual(a, b, 'b', ['b', 'a'])
  })

  it('chain', async () => {
    const f = (n: number): _.Task<number> => () => Promise.resolve(n * 2)
    return U.deepStrictEqual(await pipe(delay(1, 2), _.chain(f))(), 4)
  })

  it('chainFirst', async () => {
    const f = (n: number): _.Task<number> => () => Promise.resolve(n * 2)
    return U.deepStrictEqual(await pipe(delay(1, 2), _.chainFirst(f))(), 2)
  })

  it('flatten', async () => {
    return U.deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)(), 'a')
  })

  it('fromIO', async () => {
    const io = () => 1
    const t = _.fromIO(io)
    U.deepStrictEqual(await t(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('applicativeTaskSeq', async () => {
    await U.assertSeq(_.ApplicativeSeq, _.FromTask, (fa) => fa())
  })

  it('applicativeTaskPar', async () => {
    await U.assertPar(_.ApplicativePar, _.FromTask, (fa) => fa())
  })

  describe('getRaceMonoid', () => {
    const M = _.getRaceMonoid<number>()

    it('concat', async () => {
      U.deepStrictEqual(await M.concat(delay(10, 1), delay(10, 2))(), 1)
    })

    it('empty (right)', async () => {
      U.deepStrictEqual(await M.concat(delay(10, 1), M.empty)(), 1)
    })

    it('empty (left)', async () => {
      U.deepStrictEqual(await M.concat(M.empty, delay(10, 1))(), 1)
    })

    it('concat (rejected)', async () => {
      try {
        await M.concat(delayReject(10, 1), delayReject(10, 2))()
      } catch (actual) {
        return U.deepStrictEqual(actual, 1)
      }
    })
  })

  it('getMonoid', async () => {
    // tslint:disable-next-line: deprecation
    const M = _.getMonoid(S.Monoid)
    const deepStrictEqual = assertOp(M.concat)
    const a = pipe(_.of('a'), _.delay(100))
    const b = _.of('b')
    await deepStrictEqual(a, b, 'ab', ['a', 'b'])
    await deepStrictEqual(a, M.empty, 'a', ['a', ''])
    await deepStrictEqual(M.empty, b, 'b', ['', 'b'])
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(), 1)
  })

  it('do notation', async () => {
    U.deepStrictEqual(
      await pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(),
      { a: 1, b: 'b' }
    )
  })

  it('apS', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.bindTo('a'), _.apS('b', _.of('b')))(), { a: 1, b: 'b' })
  })

  it('sequenceArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number> = []
    const append = (n: number): _.Task<number> =>
      _.delay(n % 2 === 0 ? 50 : 100)(
        _.fromIO(() => {
          log.push(n)
          return n
        })
      )
    const as = RA.makeBy(4, append)
    U.deepStrictEqual(await pipe(as, _.sequenceArray)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 2, 1, 3])
  })

  it('sequenceSeqArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number> = []
    const append = (n: number): _.Task<number> =>
      _.delay(n % 2 === 0 ? 50 : 100)(
        _.fromIO(() => {
          log.push(n)
          return n
        })
      )
    const as = RA.makeBy(4, append)
    U.deepStrictEqual(await pipe(as, _.sequenceSeqArray)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 1, 2, 3])
  })
})
