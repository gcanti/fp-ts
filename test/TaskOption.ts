import * as E from '../src/Either'
import { pipe } from '../src/Function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as _ from '../src/TaskOption'
import { assertTask } from './Task'
import * as U from './util'

const a: _.TaskOption<string> = pipe(_.succeed<string>('a'), T.delay(100))
const b: _.TaskOption<string> = _.succeed('b')

const assertSeq = assertTask(a, b, [O.some('a'), O.some('b')])

describe('TaskOption', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.some(1), _.map(U.double))(), O.some(2))
  })

  it('ap', async () => {
    await assertSeq((a, b) => pipe(a, _.map(S.Semigroup.combine), _.ap(b)), O.some('ba'))
  })

  it('flatMap', async () => {
    const f = (n: number) => _.some(n * 2)
    const g = () => _.none
    U.deepStrictEqual(await pipe(_.some(1), _.flatMap(f))(), O.some(2))
    U.deepStrictEqual(await pipe(_.none, _.flatMap(f))(), O.none)
    U.deepStrictEqual(await pipe(_.some(1), _.flatMap(g))(), O.none)
    U.deepStrictEqual(await pipe(_.none, _.flatMap(g))(), O.none)
  })

  it('orElse', async () => {
    const assertSemigroupKind = async (
      a: _.TaskOption<number>,
      b: _.TaskOption<number>,
      expected: O.Option<number>
    ) => {
      U.deepStrictEqual(await pipe(a, _.orElse(b))(), expected)
    }
    await assertSemigroupKind(_.some(1), _.some(2), O.some(1))
    await assertSemigroupKind(_.some(1), _.none, O.some(1))
    await assertSemigroupKind(_.none, _.some(2), O.some(2))
    await assertSemigroupKind(_.none, _.none, O.none)
  })

  it('emptyKind', async () => {
    U.deepStrictEqual(await _.emptyKind()(), O.none)
  })

  it('fromIO', async () => {
    U.deepStrictEqual(await _.fromIO(() => 1)(), O.some(1))
  })

  // -------------------------------------------------------------------------------------
  // natural transformations
  // -------------------------------------------------------------------------------------

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.succeed(1))(), O.some(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('a'))(), O.none)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', async () => {
    await assertSeq((a, b) => pipe(a, _.Apply.map(S.Semigroup.combine), _.Apply.ap(b)), O.some('ba'))
    await assertSeq((a, b) => pipe(a, _.Applicative.map(S.Semigroup.combine), _.Applicative.ap(b)), O.some('ba'))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  describe('tryCatch', () => {
    test('with a resolving promise', async () => {
      U.deepStrictEqual(await _.fromRejectable(() => Promise.resolve(1))(), O.some(1))
    })

    test('with a rejected promise', async () => {
      U.deepStrictEqual(await _.fromRejectable(() => Promise.reject(1))(), O.none)
    })

    test('with a thrown error', async () => {
      U.deepStrictEqual(
        await _.fromRejectable(() => {
          throw new Error('Some error')
        })(),
        O.none
      )
    })
  })

  describe('liftRejectable', () => {
    test('with a resolved promise', async () => {
      const g = _.liftRejectable((a: number) => Promise.resolve(a))
      U.deepStrictEqual(await g(1)(), O.some(1))
    })

    test('with a rejected promise', async () => {
      const g = _.liftRejectable((a: number) => Promise.reject(a))
      U.deepStrictEqual(await g(-1)(), O.none)
    })

    test('with a thrown error', async () => {
      const g = _.liftRejectable((_: number) => {
        throw new Error('Some error')
      })
      U.deepStrictEqual(await g(-1)(), O.none)
    })
  })

  it('fromNullable', async () => {
    U.deepStrictEqual(await _.fromNullable(2)(), O.some(2))
    U.deepStrictEqual(await _.fromNullable(null)(), O.none)
    U.deepStrictEqual(await _.fromNullable(undefined)(), O.none)
  })

  it('liftNullable', async () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(1)(), O.some(1))
    U.deepStrictEqual(await f(0)(), O.none)
    U.deepStrictEqual(await f(-1)(), O.none)
  })

  it('flatMapNullable', async () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(_.succeed(1))(), O.some(1))
    U.deepStrictEqual(await f(_.succeed(0))(), O.none)
    U.deepStrictEqual(await f(_.succeed(-1))(), O.none)
  })

  it('fromPredicate', async () => {
    const p = (n: number): boolean => n > 2
    const f = _.liftPredicate(p)
    U.deepStrictEqual(await f(1)(), O.none)
    U.deepStrictEqual(await f(3)(), O.some(3))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', async () => {
    const f = _.match(
      () => 'none',
      (a) => `some(${a})`
    )
    U.deepStrictEqual(await pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(await pipe(_.none, f)(), 'none')
  })

  it('matchTask', async () => {
    const f = _.matchTask(
      () => T.succeed('none'),
      (a) => T.succeed(`some(${a})`)
    )
    U.deepStrictEqual(await pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(await pipe(_.none, f)(), 'none')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(await pipe(_.some(1), f)(), 1)
    U.deepStrictEqual(await pipe(_.none, f)(), 2)
  })

  it('getOrElseTask', async () => {
    const f = _.getOrElseTask(T.succeed(2))
    U.deepStrictEqual(await pipe(_.some(1), f)(), 1)
    U.deepStrictEqual(await pipe(_.none, f)(), 2)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('liftOption', async () => {
    const f = (s: string) => (s.length > 0 ? O.some(s.length) : O.none)
    const g = _.liftOption(f)
    U.deepStrictEqual(await g('a')(), O.some(1))
    U.deepStrictEqual(await g('')(), O.none)
  })

  it('liftRejectable', async () => {
    const f = (n: number) => (n > 0 ? Promise.resolve(n) : Promise.reject(n))
    const g = _.liftRejectable(f)
    U.deepStrictEqual(await g(1)(), O.some(1))
    U.deepStrictEqual(await g(-1)(), O.none)
  })

  it('flatMapTaskEither', async () => {
    const f = _.flatMapTaskEither((n: number) => (n > 0 ? TE.succeed(n * 2) : TE.left('a')))
    U.deepStrictEqual(await pipe(_.some(1), f)(), O.some(2))
    U.deepStrictEqual(await pipe(_.some(-1), f)(), O.none)
    U.deepStrictEqual(await pipe(_.none, f)(), O.none)
  })

  it('liftEither', async () => {
    const f = (s: string) => (s.length <= 2 ? E.succeed(s + '!') : E.left(s.length))
    const g = _.liftEither(f)
    U.deepStrictEqual(await g('')(), O.some('!'))
    U.deepStrictEqual(await g('a')(), O.some('a!'))
    U.deepStrictEqual(await g('aa')(), O.some('aa!'))
    U.deepStrictEqual(await g('aaa')(), O.none)
  })

  it('flatMapEither', async () => {
    const f = (s: string) => (s.length <= 2 ? E.succeed(s + '!') : E.left(s.length))
    const g = _.flatMapEither(f)
    U.deepStrictEqual(await g(_.succeed(''))(), O.some('!'))
    U.deepStrictEqual(await g(_.succeed('a'))(), O.some('a!'))
    U.deepStrictEqual(await g(_.succeed('aa'))(), O.some('aa!'))
    U.deepStrictEqual(await g(_.succeed('aaa'))(), O.none)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndexPar', async () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
    U.deepStrictEqual(await pipe(RA.empty, f)(), O.some(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), O.some(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), O.none)
  })

  it('traverseReadonlyNonEmptyArrayPar', async () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => (a.length > 0 ? _.some(a) : _.none))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), O.some(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(), O.none)
  })

  it('sequenceReadonlyArrayPar', async () => {
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
    U.deepStrictEqual(await pipe([some(1), some(2)], _.sequenceReadonlyArrayPar)(), O.some([1, 2]))
    U.deepStrictEqual(await pipe([some(3), none('a')], _.sequenceReadonlyArrayPar)(), O.none)
    U.deepStrictEqual(await pipe([none('b'), some(4)], _.sequenceReadonlyArrayPar)(), O.none)
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
    U.deepStrictEqual(await pipe(RA.empty, f)(), O.some(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), O.some(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), O.none)
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.some(a) : _.none))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), O.some(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(), O.none)
  })

  it('sequenceReadonlyArray', async () => {
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
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
