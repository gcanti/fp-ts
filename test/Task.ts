import { flow, pipe } from '../src/function'
import * as I from '../src/IO'
import * as RA from '../src/ReadonlyArray'
// import * as RNEA from '../src/ReadonlyNonEmptyArray'
import * as S from '../src/string'
import * as _ from '../src/Task'
import * as U from './util'

export const assertTask =
  <A, B>(a: _.Task<A>, b: _.Task<B>, expectedLog: ReadonlyArray<A | B>) =>
  async <C>(f: (a: _.Task<A>, b: _.Task<B>) => _.Task<C>, expected: C) => {
    const log: Array<A | B> = []
    const withLog: <X extends A | B>(ma: _.Task<X>) => _.Task<X> = _.tap((x) =>
      _.fromIO(() => {
        log.push(x)
      })
    )
    const c = await pipe(f(pipe(a, withLog), pipe(b, withLog)))()
    U.deepStrictEqual(c, expected)
    U.deepStrictEqual(log, expectedLog)
  }

const a = pipe(_.of('a'), _.delay(5))
const b = _.of('b')

const assertPar = assertTask(a, b, ['b', 'a'])
const assertSeq = assertTask(a, b, ['a', 'b'])

describe('Task', () => {
  // -------------------------------------------------------------------------------------
  // safety
  // -------------------------------------------------------------------------------------
  // it('stack-safe', async () => {
  //   const doProcessing = (number: number) => _.of(number * 2)
  //   const pipeline = pipe(_.of(RNEA.range(1, 55000)), _.flatMap(RNEA.traverse(_.Applicative)(doProcessing)))

  //   const res = await pipeline()

  //   expect(res.length).toBe(55000)
  // })

  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.of(1), _.map(U.double))(), 2)
  })

  it('apPar', async () => {
    await assertPar((a, b) => pipe(_.of(S.Semigroup.combine), _.apPar(a), _.apPar(b)), 'ba')
  })

  it('zipLeftPar', async () => {
    await assertPar((a, b) => pipe(a, _.zipLeftPar(b)), 'a')
  })

  it('zipRightPar', async () => {
    await assertPar((a, b) => pipe(a, _.zipRightPar(b)), 'b')
  })

  it('flatMap', async () => {
    U.deepStrictEqual(
      await pipe(
        a,
        _.flatMap(() => b)
      )(),
      'b'
    )
  })

  it('tap', async () => {
    U.deepStrictEqual(
      await pipe(
        a,
        _.tap(() => b)
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

  it('Applicative', async () => {
    await assertSeq((a, b) => pipe(a, _.Apply.map(S.Semigroup.combine), _.Apply.ap(b)), 'ba')
    await assertSeq((a, b) => pipe(a, _.Applicative.map(S.Semigroup.combine), _.Applicative.ap(b)), 'ba')
  })

  it('ApplicativePar', async () => {
    await assertPar((a, b) => pipe(a, _.ApplyPar.map(S.Semigroup.combine), _.ApplyPar.ap(b)), 'ba')
    await assertPar((a, b) => pipe(a, _.ApplicativePar.map(S.Semigroup.combine), _.ApplicativePar.ap(b)), 'ba')
  })

  it('getRaceMonoid', async () => {
    const M = _.getRaceMonoid<string>()

    U.deepStrictEqual(await pipe(a, M.combine(b))(), 'b')
    U.deepStrictEqual(await pipe(a, M.combine(M.empty))(), 'a')
    U.deepStrictEqual(await pipe(M.empty, M.combine(a))(), 'a')
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('flatMapIOK', async () => {
    const f = flow(S.size, I.of)
    U.deepStrictEqual(await pipe(_.of('a'), _.flatMapIOK(f))(), 1)
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

  it('bindRight', async () => {
    await assertSeq((a, b) => pipe(a, _.bindTo('a'), _.bindRight('b', b)), { a: 'a', b: 'b' })
  })

  it('bindTupleRight', async () => {
    await assertSeq((a, b) => pipe(a, _.tupled, _.bindTupleRight(b)), ['a', 'b'])
  })

  it('bindRightPar', async () => {
    await assertPar((a, b) => pipe(a, _.bindTo('a'), _.bindRightPar('b', b)), { a: 'a', b: 'b' })
  })

  it('bindTupleRightPar', async () => {
    await assertPar((a, b) => pipe(a, _.tupled, _.bindTupleRightPar(b)), ['a', 'b'])
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => _.of(a + i))
    U.deepStrictEqual(await pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), ['a0', 'b1'])
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => _.of(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), ['a', 'b'])
  })

  it('sequenceReadonlyArrayPar', async () => {
    const log: Array<number> = []
    const append = (n: number): _.Task<number> =>
      _.delay(n % 2 === 0 ? 5 : 10)(
        _.fromIO(() => {
          log.push(n)
          return n
        })
      )
    const as = pipe(4, RA.makeBy(append))
    U.deepStrictEqual(await pipe(as, _.sequenceReadonlyArrayPar)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 2, 1, 3])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => _.of(a + i))
    U.deepStrictEqual(await pipe(RA.empty, f)(), RA.empty)
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), ['a0', 'b1'])
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => _.of(a))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), ['a', 'b'])
  })

  it('sequenceReadonlyArray', async () => {
    const log: Array<number> = []
    const append = (n: number): _.Task<number> =>
      _.delay(n % 2 === 0 ? 1 : 2)(
        _.fromIO(() => {
          log.push(n)
          return n
        })
      )
    const as = pipe(4, RA.makeBy(append))
    U.deepStrictEqual(await pipe(as, _.sequenceReadonlyArray)(), [0, 1, 2, 3])
    U.deepStrictEqual(log, [0, 1, 2, 3])
  })
})
