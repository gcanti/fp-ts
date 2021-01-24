import { pipe } from '../src/function'
import * as I from '../src/IO'
import * as A from '../src/ReadonlyArray'
import * as _ from '../src/Task'
import * as U from './util'

export const assertTask = <A, B>(a: _.Task<A>, b: _.Task<B>, expectedLog: ReadonlyArray<A | B>) => async <C>(
  f: (a: _.Task<A>, b: _.Task<B>) => _.Task<C>,
  expected: C
) => {
  // tslint:disable-next-line: readonly-array
  const log: Array<A | B> = []
  const withLog: <X extends A | B>(ma: _.Task<X>) => _.Task<X> = _.chainFirst((x) =>
    _.fromIO(() => {
      log.push(x)
    })
  )
  const c = await pipe(f(pipe(a, withLog), pipe(b, withLog)))()
  U.deepStrictEqual(c, expected)
  U.deepStrictEqual(log, expectedLog)
}

const a = pipe(_.of('a'), _.delay(100))
const b = _.of('b')

const assertPar = assertTask(a, b, ['b', 'a'])
const assertSeq = assertTask(a, b, ['a', 'b'])

describe('Task', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.map(U.double))(), 2)
  })

  it('ap', async () => {
    await assertPar((a, b) => pipe(_.of(U.add), _.ap(a), _.ap(b)), 'ab')
  })

  it('apFirst', async () => {
    await assertPar((a, b) => pipe(a, _.apFirst(b)), 'a')
  })

  it('apSecond', async () => {
    await assertPar((a, b) => pipe(a, _.apSecond(b)), 'b')
  })

  it('chain', async () => {
    U.deepStrictEqual(
      await pipe(
        a,
        _.chain(() => b)
      )(),
      'b'
    )
  })

  it('chainFirst', async () => {
    U.deepStrictEqual(
      await pipe(
        a,
        _.chainFirst(() => b)
      )(),
      'a'
    )
  })

  it('flatten', async () => {
    return U.deepStrictEqual(await pipe(_.of(_.of('a')), _.flatten)(), 'a')
  })

  it('fromIO', async () => {
    U.deepStrictEqual(await _.fromIO(() => 1)(), 1)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await assertSeq((a, b) => pipe(a, _.ApplySeq.map(U.add), _.ApplySeq.ap(b)), 'ab')
    await assertSeq((a, b) => pipe(a, _.ApplicativeSeq.map(U.add), _.ApplicativeSeq.ap(b)), 'ab')
  })

  it('ApplicativePar', async () => {
    await assertPar((a, b) => pipe(a, _.ApplyPar.map(U.add), _.ApplyPar.ap(b)), 'ab')
    await assertPar((a, b) => pipe(a, _.ApplicativePar.map(U.add), _.ApplicativePar.ap(b)), 'ab')
  })

  it('getRaceMonoid', async () => {
    const M = _.getRaceMonoid<string>()

    U.deepStrictEqual(await pipe(a, M.concat(b))(), 'b')
    U.deepStrictEqual(await pipe(a, M.concat(M.empty))(), 'a')
    U.deepStrictEqual(await pipe(M.empty, M.concat(a))(), 'a')
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('chainIOK', async () => {
    const f = (s: string) => I.of(s.length)
    U.deepStrictEqual(await pipe(_.of('a'), _.chainIOK(f))(), 1)
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('do notation', async () => {
    await assertSeq(
      (a, b) =>
        pipe(
          a,
          _.bindTo('a'),
          _.bind('b', () => b)
        ),
      { a: 'a', b: 'b' }
    )
  })

  it('apS', async () => {
    await assertPar((a, b) => pipe(a, _.bindTo('a'), _.apS('b', b)), { a: 'a', b: 'b' })
  })

  it('apT', async () => {
    await assertPar((a, b) => pipe(a, _.tupled, _.apT(b)), ['a', 'b'])
  })

  describe('array utils', () => {
    const range = A.range(0, 10)

    it('sequenceReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, A.map(_.of), _.sequenceReadonlyArray)(), range)
    })

    it('traverseReadonlyArray', async () => {
      U.deepStrictEqual(await pipe(range, _.traverseReadonlyArray(_.of))(), range)
    })

    it('traverseReadonlyArrayWithIndex', async () => {
      U.deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndex((index, _data) => _.of(index))
        )(),
        range
      )
    })

    it('sequenceReadonlyArraySeq', async () => {
      U.deepStrictEqual(await pipe(range, A.map(_.of), _.sequenceReadonlyArraySeq)(), range)
    })

    it('traverseReadonlyArraySeq', async () => {
      U.deepStrictEqual(await pipe(range, _.traverseReadonlyArraySeq(_.of))(), range)
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      U.deepStrictEqual(
        await pipe(
          range,
          _.traverseReadonlyArrayWithIndexSeq((index, _data) => _.of(index))
        )(),
        range
      )
    })
  })
})
