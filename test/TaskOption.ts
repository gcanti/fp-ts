import { pipe } from '../src/function'
import * as O from '../src/Option'
import * as T from '../src/Task'
import * as _ from '../src/TaskOption'
import { assertTask } from './Task'
import * as U from './util'

const a: _.TaskOption<string> = pipe(_.of<string>('a'), T.delay(100))
const b: _.TaskOption<string> = _.of('b')

const assertPar = assertTask(a, b, [O.some('b'), O.some('a')])
const assertSeq = assertTask(a, b, [O.some('a'), O.some('b')])

describe('TaskOption', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.some(1), _.map(U.double))(), O.some(2))
  })

  it('ap', async () => {
    await assertPar((a, b) => pipe(a, _.map(U.add), _.ap(b)), O.some('ab'))
  })

  it('apFirst', async () => {
    await assertPar((a, b) => pipe(a, _.apFirst(b)), O.some('a'))
  })

  it('apSecond', async () => {
    await assertPar((a, b) => pipe(a, _.apSecond(b)), O.some('b'))
  })

  it('chain', async () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    U.deepStrictEqual(await pipe(_.some(1), _.chain(f))(), O.some(2))
    U.deepStrictEqual(await pipe(_.none, _.chain(f))(), O.none)
    U.deepStrictEqual(await pipe(_.some(1), _.chain(g))(), O.none)
    U.deepStrictEqual(await pipe(_.none, _.chain(g))(), O.none)
  })

  it('alt', async () => {
    const assertAlt = async (a: _.TaskOption<number>, b: _.TaskOption<number>, expected: O.Option<number>) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.alt(() => b)
        )(),
        expected
      )
    }
    await assertAlt(_.some(1), _.some(2), O.some(1))
    await assertAlt(_.some(1), _.none, O.some(1))
    await assertAlt(_.none, _.some(2), O.some(2))
    await assertAlt(_.none, _.none, O.none)
  })

  it('zero', async () => {
    U.deepStrictEqual(await _.zero()(), O.none)
  })

  it('fromIO', async () => {
    U.deepStrictEqual(await _.fromIO(() => 1)(), O.some(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativeSeq', async () => {
    await assertSeq((a, b) => pipe(a, _.ApplySeq.map(U.add), _.ApplySeq.ap(b)), O.some('ab'))
    await assertSeq((a, b) => pipe(a, _.ApplicativeSeq.map(U.add), _.ApplicativeSeq.ap(b)), O.some('ab'))
  })

  it('ApplicativePar', async () => {
    await assertPar((a, b) => pipe(a, _.ApplyPar.map(U.add), _.ApplyPar.ap(b)), O.some('ab'))
    await assertPar((a, b) => pipe(a, _.ApplicativePar.map(U.add), _.ApplicativePar.ap(b)), O.some('ab'))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tryCatch', async () => {
    U.deepStrictEqual(await _.tryCatch(() => Promise.resolve(1))(), O.some(1))
    U.deepStrictEqual(await _.tryCatch(() => Promise.reject())(), O.none)
  })

  it('fromNullable', async () => {
    U.deepStrictEqual(await _.fromNullable(2)(), O.some(2))
    U.deepStrictEqual(await _.fromNullable(null)(), O.none)
    U.deepStrictEqual(await _.fromNullable(undefined)(), O.none)
  })

  it('fromNullableK', async () => {
    const f = _.fromNullableK((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(1)(), O.some(1))
    U.deepStrictEqual(await f(0)(), O.none)
    U.deepStrictEqual(await f(-1)(), O.none)
  })

  it('chainNullableK', async () => {
    const f = _.chainNullableK((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(_.of(1))(), O.some(1))
    U.deepStrictEqual(await f(_.of(0))(), O.none)
    U.deepStrictEqual(await f(_.of(-1))(), O.none)
  })

  it('fromPredicate', async () => {
    const p = (n: number): boolean => n > 2
    const f = _.fromPredicate(p)
    U.deepStrictEqual(await f(1)(), O.none)
    U.deepStrictEqual(await f(3)(), O.some(3))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', async () => {
    const match = _.match(
      () => T.of('none'),
      (a) => T.of(`some(${a})`)
    )
    U.deepStrictEqual(await pipe(_.some(1), match)(), 'some(1)')
    U.deepStrictEqual(await pipe(_.none, match)(), 'none')
  })

  it('getOrElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.some(1),
        _.getOrElse(() => T.of(2))
      )(),
      1
    )
    U.deepStrictEqual(
      await pipe(
        _.none,
        _.getOrElse(() => T.of(2))
      )(),
      2
    )
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('fromOptionK', async () => {
    const f = (s: string) => (s.length > 0 ? O.some(s.length) : O.none)
    const g = _.fromOptionK(f)
    U.deepStrictEqual(await g('a')(), O.some(1))
    U.deepStrictEqual(await g('')(), O.none)
  })

  it('chainOptionK', async () => {
    const f = _.chainOptionK((n: number) => (n > 0 ? O.some(n) : O.none))
    U.deepStrictEqual(await f(_.some(1))(), O.some(1))
    U.deepStrictEqual(await f(_.some(-1))(), O.none)
    U.deepStrictEqual(await f(_.none)(), O.none)
  })

  it('sequenceReadonlyArray', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const some = (n: number): _.TaskOption<number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const none = (s: string): _.TaskOption<number> =>
      pipe(
        T.fromIO(() => {
          log.push(s)
          return s
        }),
        T.map(() => O.none)
      )
    U.deepStrictEqual(await pipe([some(1), some(2)], _.sequenceReadonlyArray)(), O.some([1, 2]))
    U.deepStrictEqual(await pipe([some(3), none('a')], _.sequenceReadonlyArray)(), O.none)
    U.deepStrictEqual(await pipe([none('b'), some(4)], _.sequenceReadonlyArray)(), O.none)
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  it('sequenceReadonlyArraySeq', async () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<number | string> = []
    const some = (n: number): _.TaskOption<number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const none = (s: string): _.TaskOption<number> =>
      pipe(
        T.fromIO(() => {
          log.push(s)
          return s
        }),
        T.map(() => O.none)
      )
    U.deepStrictEqual(await pipe([some(1), some(2)], _.sequenceReadonlyArraySeq)(), O.some([1, 2]))
    U.deepStrictEqual(await pipe([some(3), none('a')], _.sequenceReadonlyArraySeq)(), O.none)
    U.deepStrictEqual(await pipe([none('b'), some(4)], _.sequenceReadonlyArraySeq)(), O.none)
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })

  it('tryCatchK', async () => {
    const f = (n: number) => (n > 0 ? Promise.resolve(n) : Promise.reject(n))
    const g = _.tryCatchK(f)
    U.deepStrictEqual(await g(1)(), O.some(1))
    U.deepStrictEqual(await g(-1)(), O.none)
  })
})
