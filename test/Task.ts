import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/Task'
import { deepStrictEqual } from './util'

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
  deepStrictEqual(c, expected)
  deepStrictEqual(log, expectedLog as any)
}

const a = pipe(_.of('a'), _.delay(100))
const b = _.of('b')

const assertParOp = async <C>(f: (a: _.Task<string>, b: _.Task<string>) => _.Task<C>, expected: C) =>
  assertOp(f)(a, b, expected, ['b', 'a'])

const assertSeqOp = <C>(f: (a: _.Task<string>, b: _.Task<string>) => _.Task<C>, expected: C) =>
  assertOp(f)(a, b, expected, ['a', 'b'])

describe('Task', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    const double = (n: number): number => n * 2
    deepStrictEqual(await pipe(_.of(1), _.map(double))(), 2)
  })

  it('ap', async () => {
    await assertParOp(
      (a, b) =>
        pipe(
          _.of((a: string) => (b: string) => a + b),
          _.ap(a),
          _.ap(b)
        ),
      'ab'
    )
  })

  it('apFirst', async () => {
    await assertParOp((a, b) => pipe(a, _.apFirst(b)), 'a')
  })

  it('apSecond', async () => {
    await assertParOp((a, b) => pipe(a, _.apSecond(b)), 'b')
  })

  it('chain', async () => {
    await assertSeqOp(
      (a, b) =>
        pipe(
          a,
          _.chain((a) =>
            pipe(
              b,
              _.map((b) => a + b)
            )
          )
        ),
      'ab'
    )
  })

  it('chainFirst', async () => {
    await assertSeqOp(
      (a, b) =>
        pipe(
          a,
          _.chainFirst((a) =>
            pipe(
              b,
              _.map((b) => a + b)
            )
          )
        ),
      'a'
    )
  })

  it('flatten', async () => {
    return deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)(), 'a')
  })

  it('fromIO', async () => {
    deepStrictEqual(await _.fromIO(() => 1)(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await assertSeqOp(
      (a, b) =>
        pipe(
          _.of((a: string) => (b: string) => a + b),
          _.ApplySeq.ap(a),
          _.ApplySeq.ap(b)
        ),
      'ab'
    )
    await assertSeqOp(
      (a, b) =>
        pipe(
          _.of((a: string) => (b: string) => a + b),
          _.ApplicativeSeq.ap(a),
          _.ApplicativeSeq.ap(b)
        ),
      'ab'
    )
  })

  it('ApplicativePar', async () => {
    await assertParOp(
      (a, b) =>
        pipe(
          _.of((a: string) => (b: string) => a + b),
          _.ApplyPar.ap(a),
          _.ApplyPar.ap(b)
        ),
      'ab'
    )
    await assertParOp(
      (a, b) =>
        pipe(
          _.of((a: string) => (b: string) => a + b),
          _.ApplicativePar.ap(a),
          _.ApplicativePar.ap(b)
        ),
      'ab'
    )
  })

  it('getRaceMonoid', async () => {
    const M = _.getRaceMonoid<number>()

    deepStrictEqual(await pipe(delay(10, 1), M.concat(delay(10, 2)))(), 1)
    deepStrictEqual(await pipe(delay(10, 1), M.concat(M.empty))(), 1)
    deepStrictEqual(await pipe(M.empty, M.concat(delay(10, 1)))(), 1)
    try {
      await pipe(delayReject(10, 1), M.concat(delayReject(10, 2)))()
    } catch (actual) {
      deepStrictEqual(actual, 1)
    }
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(), 1)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    deepStrictEqual(
      await pipe(
        a,
        _.bindTo('a'),
        _.bind('b', () => b)
      )(),
      { a: 'a', b: 'b' }
    )
  })

  it('apS', async () => {
    await assertParOp((a, b) => pipe(a, _.bindTo('a'), _.apS('b', b)), { a: 'a', b: 'b' })
  })

  it('apT', async () => {
    await assertParOp((a, b) => pipe(a, _.tupled, _.apT(b)), ['a', 'b'])
  })

  describe('array utils', () => {
    const range = RA.range(0, 10)

    it('sequenceReadonlyArray', async () => {
      deepStrictEqual(await pipe(range, RA.map(_.of), _.sequenceReadonlyArray)(), range)
    })

    it('traverseReadonlyArray', async () => {
      deepStrictEqual(await pipe(range, _.traverseReadonlyArray(_.of))(), range)
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(),
        range
      )
    })

    it('sequenceReadonlyArraySeq', async () => {
      deepStrictEqual(await pipe(range, RA.map(_.of), _.sequenceReadonlyArraySeq)(), range)
    })

    it('traverseReadonlyArraySeq', async () => {
      deepStrictEqual(await pipe(range, _.traverseReadonlyArraySeq(_.of))(), range)
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) => _.of(index))
        )(),
        range
      )
    })
  })
})
