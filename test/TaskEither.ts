import * as E from '../src/Either'
import { identity, pipe, SK } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as S from '../src/string'
import { none, some } from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as T from '../src/Task'
import * as _ from '../src/TaskEither'
import { assertTask } from './Task'
import * as U from './util'
import * as Sep from '../src/Separated'
import { ReadonlyNonEmptyArray } from '../src/ReadonlyNonEmptyArray'

const a: _.TaskEither<string, string> = pipe(_.of<string, string>('a'), T.delay(100))
const b: _.TaskEither<string, string> = _.of('b')

const assertPar = assertTask(a, b, [E.right('b'), E.right('a')])
const assertSeq = assertTask(a, b, [E.right('a'), E.right('b')])

describe('TaskEither', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('alt', async () => {
    const assertAlt = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.alt(() => b)
        )(),
        expected
      )
    }
    await assertAlt(_.right(1), _.right(2), E.right(1))
    await assertAlt(_.right(1), _.left('b'), E.right(1))
    await assertAlt(_.left('a'), _.right(2), E.right(2))
    await assertAlt(_.left('a'), _.left('b'), E.left('b'))
  })

  it('map', async () => {
    const assertMap = async (a: _.TaskEither<string, number>, expected: E.Either<string, number>) => {
      U.deepStrictEqual(await pipe(a, _.map(U.double))(), expected)
    }
    await assertMap(_.right(1), E.right(2))
    await assertMap(_.left('a'), E.left('a'))
  })

  it('ap', async () => {
    const assertAp = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, _.map(U.tuple2), _.ap(b))(), expected)
    }

    await assertAp(_.right(1), _.right(2), E.right([1, 2]))
    await assertAp(_.right(1), _.left('b'), E.left('b'))
    await assertAp(_.left('a'), _.right(2), E.left('a'))
    await assertAp(_.left('a'), _.left('b'), E.left('a'))

    // the default ap should be parallel
    await assertPar((a, b) => pipe(a, _.map(U.add), _.ap(b)), E.right('ab'))
  })

  it('apFirst', async () => {
    await assertPar((a, b) => pipe(a, _.apFirst(b)), E.right('a'))
  })

  it('apSecond', async () => {
    await assertPar((a, b) => pipe(a, _.apSecond(b)), E.right('b'))
  })

  it('chain', async () => {
    const assertChain = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.chain(() => b)
        )(),
        expected
      )
    }

    await assertChain(_.right(1), _.right(2), E.right(2))
    await assertChain(_.right(1), _.left('b'), E.left('b'))
    await assertChain(_.left('a'), _.right(2), E.left('a'))
    await assertChain(_.left('a'), _.left('b'), E.left('a'))
  })

  it('chainFirst', async () => {
    const assertChainFirst = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.chainFirst(() => b)
        )(),
        expected
      )
    }

    await assertChainFirst(_.right(1), _.right(2), E.right(1))
    await assertChainFirst(_.right(1), _.left('b'), E.left('b'))
    await assertChainFirst(_.left('a'), _.right(2), E.left('a'))
    await assertChainFirst(_.left('a'), _.left('b'), E.left('a'))
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.right(_.right(1)), _.flatten)(), E.right(1))
    U.deepStrictEqual(await pipe(_.right(_.left('b')), _.flatten)(), E.left('b'))
    U.deepStrictEqual(await pipe(_.left('a'), _.flatten)(), E.left('a'))
  })

  it('bimap', async () => {
    const f = (s: string): number => s.length
    const g = (n: number): boolean => n > 2

    U.deepStrictEqual(await pipe(_.right(1), _.bimap(f, g))(), E.right(false))
    U.deepStrictEqual(await pipe(_.left('a'), _.bimap(f, g))(), E.left(1))
  })

  it('mapLeft', async () => {
    const f = (s: string): number => s.length

    U.deepStrictEqual(await pipe(_.right(1), _.mapLeft(f))(), E.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), _.mapLeft(f))(), E.left(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicativeTaskValidation', async () => {
    const A = _.getApplicativeTaskValidation(T.ApplyPar, S.Semigroup)
    const assertAp = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, A.map(U.tuple2), A.ap(b))(), expected)
    }

    await assertAp(_.right(1), _.right(2), E.right([1, 2]))
    await assertAp(_.right(1), _.left('b'), E.left('b'))
    await assertAp(_.left('a'), _.right(2), E.left('a'))
    await assertAp(_.left('a'), _.left('b'), E.left('ab'))

    await assertPar((a, b) => pipe(a, A.map(U.add), A.ap(b)), E.right('ab'))
  })

  it('getAltTaskValidation', async () => {
    const A = _.getAltTaskValidation(S.Semigroup)
    const assertAlt = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          A.alt(() => b)
        )(),
        expected
      )
    }
    await assertAlt(_.right(1), _.right(2), E.right(1))
    await assertAlt(_.right(1), _.left('b'), E.right(1))
    await assertAlt(_.left('a'), _.right(2), E.right(2))
    await assertAlt(_.left('a'), _.left('b'), E.left('ab'))
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)

    it('compact', async () => {
      U.deepStrictEqual(await C.compact(_.right(some(1)))(), E.right(1))
    })

    it('separate', async () => {
      const assertSeparate = async (
        a: _.TaskEither<string, E.Either<string, number>>,
        expectedLeft: E.Either<string, string>,
        expectedRight: E.Either<string, number>
      ) => {
        const s = C.separate(a)
        U.deepStrictEqual(await Sep.left(s)(), expectedLeft)
        U.deepStrictEqual(await Sep.right(s)(), expectedRight)
      }

      await assertSeparate(_.right(E.right(1)), E.left(''), E.right(1))
      await assertSeparate(_.right(E.left('a')), E.right('a'), E.left(S.Monoid.empty))
      await assertSeparate(_.left('a'), E.left('a'), E.left('a'))
    })
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(RA.getMonoid<string>())

    it('partition', async () => {
      const s = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        F.partition((s) => s.length > 2)
      )
      U.deepStrictEqual(await Sep.left(s)(), E.right('a'))
      U.deepStrictEqual(await Sep.right(s)(), E.left([]))
    })

    it('partitionMap', async () => {
      const s = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        F.partitionMap((s) => (s.length > 2 ? E.right(s.length) : E.left(false)))
      )
      U.deepStrictEqual(await Sep.left(s)(), E.right(false))
      U.deepStrictEqual(await Sep.right(s)(), E.left([]))
    })
  })

  it('ApplicativeSeq', async () => {
    await assertSeq((a, b) => pipe(a, _.ApplySeq.map(U.add), _.ApplySeq.ap(b)), E.right('ab'))
    await assertSeq((a, b) => pipe(a, _.ApplicativeSeq.map(U.add), _.ApplicativeSeq.ap(b)), E.right('ab'))
  })

  it('ApplicativePar', async () => {
    await assertPar((a, b) => pipe(a, _.ApplyPar.map(U.add), _.ApplyPar.ap(b)), E.right('ab'))
    await assertPar((a, b) => pipe(a, _.ApplicativePar.map(U.add), _.ApplicativePar.ap(b)), E.right('ab'))
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  it('taskify', async () => {
    const api1 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const api2 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(undefined, 'ok')
    }
    const api3 = (_path: string, callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(new Error('ko'))
    }
    U.deepStrictEqual(await _.taskify(api1)('foo')(), E.right('ok'))
    U.deepStrictEqual(await _.taskify(api2)('foo')(), E.right('ok'))
    U.deepStrictEqual(await _.taskify(api3)('foo')(), E.left(new Error('ko')))
  })

  it('composed taskify', async () => {
    const api = (callback: (err: Error | null | undefined, result?: string) => void): void => {
      callback(null, 'ok')
    }
    const taskApi = _.taskify(api)()

    U.deepStrictEqual(await taskApi(), E.right('ok'))
    U.deepStrictEqual(await taskApi(), E.right('ok'))
  })

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.left('acquire failure')
    const acquireSuccess = _.right({ res: 'acquire success' })
    const useSuccess = () => _.right('use success')
    const useFailure = () => _.left('use failure')
    const releaseSuccess = () =>
      _.rightIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.left('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireFailure, useSuccess, releaseSuccess)(), E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', async () => {
      await _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseSuccess)(), E.left('use failure'))
    })

    it('should return the release error if both use and release fail', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useFailure, releaseFailure)(), E.left('release failure'))
    })

    it('release must be called if the body returns', async () => {
      await _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', async () => {
      await _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', async () => {
      U.deepStrictEqual(await _.bracket(acquireSuccess, useSuccess, releaseFailure)(), E.left('release failure'))
    })
  })

  it('do notation', async () => {
    await assertSeq(
      (a, b) =>
        pipe(
          a,
          _.bindTo('a'),
          _.bind('b', () => b)
        ),
      E.right({ a: 'a', b: 'b' })
    )
  })

  it('apS', async () => {
    await assertPar((a, b) => pipe(a, _.bindTo('a'), _.apS('b', b)), E.right({ a: 'a', b: 'b' }))
  })

  it('apT', async () => {
    await assertPar(
      (a, b) => pipe(a, _.tupled, _.apT(b)),
      E.right<ReadonlyArray<string>, string>(['a', 'b'])
    )
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('filterOrElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.right(12),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )(),
      E.right(12)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(7),
        _.filterOrElse(
          (n) => n > 10,
          () => 'a'
        )
      )(),
      E.left('a')
    )
  })

  it('orElse', async () => {
    U.deepStrictEqual(
      await pipe(
        _.left('foo'),
        _.orElse((l) => _.right(l.length))
      )(),
      E.right(3)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(1),
        _.orElse(() => _.right(2))
      )(),
      E.right(1)
    )
  })

  it('swap', async () => {
    U.deepStrictEqual(await _.swap(_.right(1))(), E.left(1))
    U.deepStrictEqual(await _.swap(_.left('a'))(), E.right('a'))
  })

  it('chainEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainEitherK(f))(), E.right(1))
  })

  it('chainIOEitherK', async () => {
    const f = (s: string) => IE.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.chainIOEitherK(f))(), E.right(1))
  })

  it('tryCatchK', async () => {
    const f = (n: number) => {
      if (n > 0) {
        return Promise.resolve(n * 2)
      }
      return Promise.reject('negative')
    }
    const g = _.tryCatchK(f, identity)
    U.deepStrictEqual(await g(1)(), E.right(2))
    U.deepStrictEqual(await g(-1)(), E.left('negative'))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('rightIO', async () => {
    const io = () => 1
    const fa = _.rightIO(io)
    U.deepStrictEqual(await fa(), E.right(1))
  })

  it('leftIO', async () => {
    U.deepStrictEqual(await _.leftIO(I.of(1))(), E.left(1))
  })

  it('tryCatch', async () => {
    U.deepStrictEqual(await _.tryCatch(() => Promise.resolve(1))(), E.right(1))
    U.deepStrictEqual(await _.tryCatch(() => Promise.reject('a'))(), E.left('a'))
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.right(1))(), E.right(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('a'))(), E.left('a'))
  })

  it('fromOption', async () => {
    U.deepStrictEqual(
      await pipe(
        none,
        _.fromOption(() => 'none')
      )(),
      E.left('none')
    )
    U.deepStrictEqual(
      await pipe(
        some(1),
        _.fromOption(() => 'none')
      )(),
      E.right(1)
    )
  })

  it('fromPredicate', async () => {
    const f = _.fromPredicate((n: number) => n >= 2)
    U.deepStrictEqual(await f(3)(), E.right(3))
    U.deepStrictEqual(await f(1)(), E.left(1))
  })

  describe('array utils', () => {
    const input: ReadonlyNonEmptyArray<string> = ['a', 'b']

    it('traverseReadonlyArrayWithIndex', async () => {
      const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
      U.deepStrictEqual(await pipe(RA.empty, f)(), E.right(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(), E.right(['a0', 'b1']))
      U.deepStrictEqual(await pipe(['a', ''], f)(), E.left('e'))
    })

    it('traverseReadonlyArrayWithIndexSeq', async () => {
      const f = _.traverseReadonlyArrayWithIndexSeq((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
      U.deepStrictEqual(await pipe(RA.empty, f)(), E.right(RA.empty))
      U.deepStrictEqual(await pipe(input, f)(), E.right(['a0', 'b1']))
      U.deepStrictEqual(await pipe(['a', ''], f)(), E.left('e'))
    })

    it('sequenceReadonlyArray', async () => {
      const log: Array<number | string> = []
      const right = (n: number): _.TaskEither<string, number> =>
        _.rightIO(() => {
          log.push(n)
          return n
        })
      const left = (s: string): _.TaskEither<string, number> =>
        _.leftIO(() => {
          log.push(s)
          return s
        })
      U.deepStrictEqual(await pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndex(SK))(), E.right([1, 2]))
      U.deepStrictEqual(await pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndex(SK))(), E.left('a'))
      U.deepStrictEqual(await pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndex(SK))(), E.left('b'))
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
    })

    it('sequenceReadonlyArraySeq', async () => {
      const log: Array<number | string> = []
      const right = (n: number): _.TaskEither<string, number> =>
        _.rightIO(() => {
          log.push(n)
          return n
        })
      const left = (s: string): _.TaskEither<string, number> =>
        _.leftIO(() => {
          log.push(s)
          return s
        })
      U.deepStrictEqual(await pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.right([1, 2]))
      U.deepStrictEqual(await pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.left('a'))
      U.deepStrictEqual(await pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.left('b'))
      U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
    })
  })
})
