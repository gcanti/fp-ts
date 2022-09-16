import { pipe, SK } from '../src/function'
import * as O from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'
import * as T from '../src/Task'
import * as TE from '../src/TaskEither'
import * as _ from '../src/TaskOption'
// import { assertTask } from './Task'
import * as U from './util'
// import * as S from '../src/string'
import * as E from '../src/Either'

// const a: _.TaskOption<string> = pipe(_.of<string>('a'), T.delay(100))
// const b: _.TaskOption<string> = _.of('b')

// const assertPar = assertTask(a, b, [O.some('b'), O.some('a')])
// const assertSeq = assertTask(a, b, [O.some('a'), O.some('b')])

describe('TaskOption', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', async () => {
    U.deepStrictEqual(await pipe(_.some(1), _.map(U.double))(), O.some(2))
  })

  // it('ap', async () => {
  //   await assertPar((a, b) => pipe(a, _.map(S.Semigroup.concat), _.ap(b)), O.some('ba'))
  // })

  // it('apFirst', async () => {
  //   await assertPar((a, b) => pipe(a, _.apFirst(b)), O.some('a'))
  // })

  // it('apSecond', async () => {
  //   await assertPar((a, b) => pipe(a, _.apSecond(b)), O.some('b'))
  // })

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

  // it('ApplicativeSeq', async () => {
  //   await assertSeq((a, b) => pipe(a, _.ApplySeq.map(S.Semigroup.concat), _.ApplySeq.ap(b)), O.some('ba'))
  //   await assertSeq((a, b) => pipe(a, _.ApplicativeSeq.map(S.Semigroup.concat), _.ApplicativeSeq.ap(b)), O.some('ba'))
  // })

  // it('ApplicativePar', async () => {
  //   await assertPar((a, b) => pipe(a, _.ApplyPar.map(S.Semigroup.concat), _.ApplyPar.ap(b)), O.some('ba'))
  //   await assertPar((a, b) => pipe(a, _.ApplicativePar.map(S.Semigroup.concat), _.ApplicativePar.ap(b)), O.some('ba'))
  // })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  describe('tryCatch', () => {
    test('with a resolving promise', async () => {
      U.deepStrictEqual(await _.tryCatch(() => Promise.resolve(1))(), O.some(1))
    })

    test('with a rejected promise', async () => {
      U.deepStrictEqual(await _.tryCatch(() => Promise.reject(1))(), O.none)
    })

    test('with a thrown error', async () => {
      U.deepStrictEqual(
        await _.tryCatch(() => {
          throw new Error('Some error')
        })(),
        O.none
      )
    })
  })

  describe('tryCatchK', () => {
    test('with a resolved promise', async () => {
      const g = _.tryCatchK((a: number) => Promise.resolve(a))
      U.deepStrictEqual(await g(1)(), O.some(1))
    })

    test('with a rejected promise', async () => {
      const g = _.tryCatchK((a: number) => Promise.reject(a))
      U.deepStrictEqual(await g(-1)(), O.none)
    })

    test('with a thrown error', async () => {
      const g = _.tryCatchK((_: number) => {
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
    const f = _.match(
      () => 'none',
      (a) => `some(${a})`
    )
    U.deepStrictEqual(await pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(await pipe(_.none, f)(), 'none')
  })

  it('matchE', async () => {
    const f = _.matchE(
      () => T.of('none'),
      (a) => T.of(`some(${a})`)
    )
    U.deepStrictEqual(await pipe(_.some(1), f)(), 'some(1)')
    U.deepStrictEqual(await pipe(_.none, f)(), 'none')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(() => 2)
    U.deepStrictEqual(await pipe(_.some(1), f)(), 1)
    U.deepStrictEqual(await pipe(_.none, f)(), 2)
  })

  it('getOrElseE', async () => {
    const f = _.getOrElseE(() => T.of(2))
    U.deepStrictEqual(await pipe(_.some(1), f)(), 1)
    U.deepStrictEqual(await pipe(_.none, f)(), 2)
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

  it('tryCatchK', async () => {
    const f = (n: number) => (n > 0 ? Promise.resolve(n) : Promise.reject(n))
    const g = _.tryCatchK(f)
    U.deepStrictEqual(await g(1)(), O.some(1))
    U.deepStrictEqual(await g(-1)(), O.none)
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', async () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
      U.deepStrictEqual(await pipe(RA.empty, f)(), O.some(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(), O.some(['a0', 'b1']))
      U.deepStrictEqual(await pipe(['a', ''], f)(), O.none)
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      const f = _.traverseReadonlyArrayWithIndexSeq((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
      U.deepStrictEqual(await pipe(RA.empty, f)(), O.some(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(), O.some(['a0', 'b1']))
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
      U.deepStrictEqual(await pipe([some(1), some(2)], _.traverseReadonlyArrayWithIndex(SK))(), O.some([1, 2]))
      U.deepStrictEqual(await pipe([some(3), none('a')], _.traverseReadonlyArrayWithIndex(SK))(), O.none)
      U.deepStrictEqual(await pipe([none('b'), some(4)], _.traverseReadonlyArrayWithIndex(SK))(), O.none)
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
    })

    it('sequenceReadonlyArraySeq', async () => {
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
      U.deepStrictEqual(await pipe([some(1), some(2)], _.traverseReadonlyArrayWithIndexSeq(SK))(), O.some([1, 2]))
      U.deepStrictEqual(await pipe([some(3), none('a')], _.traverseReadonlyArrayWithIndexSeq(SK))(), O.none)
      U.deepStrictEqual(await pipe([none('b'), some(4)], _.traverseReadonlyArrayWithIndexSeq(SK))(), O.none)
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
    })
  })

  it('chainTaskEitherK', async () => {
    const f = _.chainTaskEitherK((n: number) => (n > 0 ? TE.right(n * 2) : TE.left('a')))
    U.deepStrictEqual(await pipe(_.some(1), f)(), O.some(2))
    U.deepStrictEqual(await pipe(_.some(-1), f)(), O.none)
    U.deepStrictEqual(await pipe(_.none, f)(), O.none)
  })

  it('fromEitherK', async () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.fromEitherK(f)
    U.deepStrictEqual(await g('')(), O.some('!'))
    U.deepStrictEqual(await g('a')(), O.some('a!'))
    U.deepStrictEqual(await g('aa')(), O.some('aa!'))
    U.deepStrictEqual(await g('aaa')(), O.none)
  })

  it('chainEitherK', async () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.chainEitherK(f)
    U.deepStrictEqual(await g(_.of(''))(), O.some('!'))
    U.deepStrictEqual(await g(_.of('a'))(), O.some('a!'))
    U.deepStrictEqual(await g(_.of('aa'))(), O.some('aa!'))
    U.deepStrictEqual(await g(_.of('aaa'))(), O.none)
  })

  it('chainFirstEitherK', async () => {
    const f = (s: string) => (s.length <= 2 ? E.right(s + '!') : E.left(s.length))
    const g = _.chainFirstEitherK(f)
    U.deepStrictEqual(await g(_.of(''))(), O.some(''))
    U.deepStrictEqual(await g(_.of('a'))(), O.some('a'))
    U.deepStrictEqual(await g(_.of('aa'))(), O.some('aa'))
    U.deepStrictEqual(await g(_.of('aaa'))(), O.none)
  })
})
