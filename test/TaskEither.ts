import * as E from '../src/Either'
import { flow, identity, pipe } from '../src/function'
import * as I from '../src/IO'
import * as IE from '../src/IOEither'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as Sep from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as _ from '../src/TaskEither'
import * as TO from '../src/TaskOption'
import { assertTask } from './Task'
import * as U from './util'
import * as FilterableModule from '../src/Filterable'

const a: _.TaskEither<string, string> = pipe(_.of<string, string>('a'), T.delay(100))
const b: _.TaskEither<string, string> = _.of('b')

const assertPar = assertTask(a, b, [E.right('b'), E.right('a')])
const assertSeq = assertTask(a, b, [E.right('a'), E.right('b')])

describe('TaskEither', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('combineK', async () => {
    const assertSemigroupK = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.combineK(() => b)
        )(),
        expected
      )
    }
    await assertSemigroupK(_.right(1), _.right(2), E.right(1))
    await assertSemigroupK(_.right(1), _.left('b'), E.right(1))
    await assertSemigroupK(_.left('a'), _.right(2), E.right(2))
    await assertSemigroupK(_.left('a'), _.left('b'), E.left('b'))
  })

  it('map', async () => {
    const assertMap = async (a: _.TaskEither<string, number>, expected: E.Either<string, number>) => {
      U.deepStrictEqual(await pipe(a, _.map(U.double))(), expected)
    }
    await assertMap(_.right(1), E.right(2))
    await assertMap(_.left('a'), E.left('a'))
  })

  it('ap', async () => {
    const tuple2 =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    const assertAp = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, _.map(tuple2), _.ap(b))(), expected)
    }

    await assertAp(_.right(1), _.right(2), E.right([1, 2]))
    await assertAp(_.right(1), _.left('b'), E.left('b'))
    await assertAp(_.left('a'), _.right(2), E.left('a'))
    await assertAp(_.left('a'), _.left('b'), E.left('a'))

    // the default ap should be parallel
    await assertPar((a, b) => pipe(a, _.map(S.Semigroup.combine), _.ap(b)), E.right('ba'))
  })

  it('apFirst', async () => {
    await assertPar((a, b) => pipe(a, _.apFirst(b)), E.right('a'))
  })

  it('apSecond', async () => {
    await assertPar((a, b) => pipe(a, _.apSecond(b)), E.right('b'))
  })

  it('flatMap', async () => {
    const assertFlat = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.flatMap(() => b)
        )(),
        expected
      )
    }

    await assertFlat(_.right(1), _.right(2), E.right(2))
    await assertFlat(_.right(1), _.left('b'), E.left('b'))
    await assertFlat(_.left('a'), _.right(2), E.left('a'))
    await assertFlat(_.left('a'), _.left('b'), E.left('a'))
  })

  it('tap', async () => {
    const assertFlatFirst = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          _.tap(() => b)
        )(),
        expected
      )
    }

    await assertFlatFirst(_.right(1), _.right(2), E.right(1))
    await assertFlatFirst(_.right(1), _.left('b'), E.left('b'))
    await assertFlatFirst(_.left('a'), _.right(2), E.left('a'))
    await assertFlatFirst(_.left('a'), _.left('b'), E.left('a'))
  })

  it('flatten', async () => {
    U.deepStrictEqual(await pipe(_.right(_.right(1)), _.flatten)(), E.right(1))
    U.deepStrictEqual(await pipe(_.right(_.left('b')), _.flatten)(), E.left('b'))
    U.deepStrictEqual(await pipe(_.left('a'), _.flatten)(), E.left('a'))
  })

  it('bimap', async () => {
    const f = _.bimap(S.size, gt(N.Ord)(2))
    U.deepStrictEqual(await pipe(_.right(1), f)(), E.right(false))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), E.left(1))
  })

  it('mapLeft', async () => {
    const f = _.mapLeft(S.size)
    U.deepStrictEqual(await pipe(_.right(1), f)(), E.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), E.left(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getApplicativeTaskValidation', async () => {
    const tuple2 =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    const A = _.getApplicativeTaskValidation(T.ApplyPar, S.Semigroup)
    const assertAp = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, readonly [number, number]>
    ) => {
      U.deepStrictEqual(await pipe(a, A.map(tuple2), A.ap(b))(), expected)
    }

    await assertAp(_.right(1), _.right(2), E.right([1, 2]))
    await assertAp(_.right(1), _.left('b'), E.left('b'))
    await assertAp(_.left('a'), _.right(2), E.left('a'))
    await assertAp(_.left('a'), _.left('b'), E.left('ab'))

    // await assertPar((a, b) => pipe(a, A.map(S.Semigroup.combine), A.ap(b)), E.right('ba'))
  })

  it('getSemigroupKTaskValidation', async () => {
    const A = _.getSemigroupKTaskValidation(S.Semigroup)
    const assertSemigroupK = async (
      a: _.TaskEither<string, number>,
      b: _.TaskEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        await pipe(
          a,
          A.combineK(() => b)
        )(),
        expected
      )
    }
    await assertSemigroupK(_.right(1), _.right(2), E.right(1))
    await assertSemigroupK(_.right(1), _.left('b'), E.right(1))
    await assertSemigroupK(_.left('a'), _.right(2), E.right(2))
    await assertSemigroupK(_.left('a'), _.left('b'), E.left('ab'))
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)

    it('compact', async () => {
      U.deepStrictEqual(await C.compact(_.right(O.some(1)))(), E.right(1))
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
      const partition = FilterableModule.partition(F)

      const s = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        partition((s: string) => s.length > 2)
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
    await assertSeq((a, b) => pipe(a, _.ApplySeq.map(S.Semigroup.combine), _.ApplySeq.ap(b)), E.right('ba'))
    await assertSeq((a, b) => pipe(a, _.ApplicativeSeq.map(S.Semigroup.combine), _.ApplicativeSeq.ap(b)), E.right('ba'))
  })

  it('ApplicativePar', async () => {
    await assertPar((a, b) => pipe(a, _.ApplyPar.map(S.Semigroup.combine), _.ApplyPar.ap(b)), E.right('ba'))
    await assertPar((a, b) => pipe(a, _.ApplicativePar.map(S.Semigroup.combine), _.ApplicativePar.ap(b)), E.right('ba'))
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

  // TODO
  // it('do notation ensuring proper param passthrough', async () => {
  //   const c = (p: { readonly a: number }) => _.right<number, string>(p.a)
  //   const d = (p: { readonly b: string }) => _.right<string, string>(p.b)
  //   U.deepStrictEqual(
  //     await pipe(
  //       _.right<number, string>(1),
  //       _.bindTo('a'),
  //       _.bind('b', () => _.right('b')),
  //       _.bind('c', c),
  //       _.bind('d', d),
  //       _.bind(
  //         'e',
  //         _.fromOptionKOrElse((p: { readonly c: number }) => O.some(p.c), () => 'err')
  //       ),
  //       _.bind(
  //         'f',
  //         _.fromOptionKOrElse((p) => O.some(p.b), () => 'err')
  //       )
  //     )(),
  //     E.right({ a: 1, b: 'b', c: 1, d: 'b', e: 1, f: 'b' })
  //   )
  // })

  it('apS', async () => {
    await assertPar((a, b) => pipe(a, _.bindTo('a'), _.apS('b', b)), E.right({ a: 'a', b: 'b' }))
  })

  it('apT', async () => {
    await assertPar((a, b) => pipe(a, _.tupled, _.apT(b)), E.right<ReadonlyArray<string>, string>(['a', 'b']))
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

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

  it('flatMapEitherK', async () => {
    const f = flow(S.size, E.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.flatMapEitherK(f))(), E.right(1))
  })

  it('tapEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.tapEitherK(f))(), E.right('a'))
    U.deepStrictEqual(await pipe(_.right<string, string>('a'), _.tapEitherK(f))(), E.right('a'))

    const g = (s: string) => E.left(s.length)
    U.deepStrictEqual(await pipe(_.right('a'), _.tapEitherK(g))(), E.left(1))
    U.deepStrictEqual(await pipe(_.right<string, string>('a'), _.tapEitherK(g))(), E.left(1))
  })

  it('flatMapIOEitherK', async () => {
    const f = flow(S.size, IE.of)
    U.deepStrictEqual(await pipe(_.right('a'), _.flatMapIOEitherK(f))(), E.right(1))
  })

  describe('tryCatch', () => {
    test('with a resolving promise', async () => {
      U.deepStrictEqual(await _.tryCatch(() => Promise.resolve(1), identity)(), E.right(1))
    })

    test('with a rejected promise', async () => {
      U.deepStrictEqual(await _.tryCatch(() => Promise.reject(1), identity)(), E.left(1))
    })

    test('with a thrown error', async () => {
      U.deepStrictEqual(
        await _.tryCatch(() => {
          throw new Error('Some error')
        }, identity)(),
        E.left(new Error('Some error'))
      )
    })
  })

  describe('tryCatchK', () => {
    test('with a resolved promise', async () => {
      const g = _.tryCatchK((a: number) => Promise.resolve(a), identity)
      U.deepStrictEqual(await g(1)(), E.right(1))
    })

    test('with a rejected promise', async () => {
      const g = _.tryCatchK((a: number) => Promise.reject(a), identity)
      U.deepStrictEqual(await g(-1)(), E.left(-1))
    })

    test('with a thrown error', async () => {
      const g = _.tryCatchK((_: number) => {
        throw new Error('Some error')
      }, identity)
      U.deepStrictEqual(await g(-1)(), E.left(new Error('Some error')))
    })
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
    U.deepStrictEqual(await _.tryCatch(() => Promise.resolve(1), identity)(), E.right(1))
    U.deepStrictEqual(await _.tryCatch(() => Promise.reject('a'), identity)(), E.left('a'))
  })

  it('fromIOEither', async () => {
    U.deepStrictEqual(await _.fromIOEither(() => E.right(1))(), E.right(1))
    U.deepStrictEqual(await _.fromIOEither(() => E.left('a'))(), E.left('a'))
  })

  it('fromOption', async () => {
    U.deepStrictEqual(
      await pipe(
        O.none,
        _.fromOption(() => 'none')
      )(),
      E.left('none')
    )
    U.deepStrictEqual(
      await pipe(
        O.some(1),
        _.fromOption(() => 'none')
      )(),
      E.right(1)
    )
  })

  it('fromPredicateOrElse', async () => {
    const f = _.fromPredicateOrElse(
      (n: number) => n >= 2,
      (a) => a
    )
    U.deepStrictEqual(await f(3)(), E.right(3))
    U.deepStrictEqual(await f(1)(), E.left(1))
  })

  it('fromRefinementOrElse', async () => {
    const f = _.fromRefinementOrElse(S.isString, identity)
    U.deepStrictEqual(await f('a')(), E.right('a'))
    U.deepStrictEqual(await f(1)(), E.left(1))
  })

  it('filterOrElse', async () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(
      await pipe(
        _.right(12),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.right(12)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(7),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.left(-1)
    )
    U.deepStrictEqual(
      await pipe(
        _.left(12),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.left(12)
    )
    U.deepStrictEqual(
      await pipe(
        _.right(7),
        _.filterOrElse(predicate, (n) => `invalid ${n}`)
      )(),
      E.left('invalid 7')
    )
  })

  it('refineOrElse', async () => {
    const refinement = (s: string): s is 'a' => s === 'a'
    const onFalse = (s: string) => `invalid string ${s}`

    U.deepStrictEqual(await pipe(_.right('a'), _.refineOrElse(refinement, onFalse))(), E.right('a'))
    U.deepStrictEqual(await pipe(_.right('b'), _.refineOrElse(refinement, onFalse))(), E.left('invalid string b'))
    U.deepStrictEqual(await pipe(_.left(-1), _.refineOrElse(refinement, onFalse))(), E.left(-1))
  })

  it('flatMapTaskOptionK', async () => {
    const f = _.flatMapTaskOptionK(() => 'a')((n: number) => (n > 0 ? TO.some(n * 2) : TO.none))
    U.deepStrictEqual(await pipe(_.right(1), f)(), E.right(2))
    U.deepStrictEqual(await pipe(_.right(-1), f)(), E.left('a'))
    U.deepStrictEqual(await pipe(_.left('b'), f)(), E.left('b'))
  })

  it('match', async () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(await f(_.right(1))(), 'right')
    U.deepStrictEqual(await f(_.left(''))(), 'left')
  })

  it('matchE', async () => {
    const f = _.matchE(
      () => T.of('left'),
      () => T.of('right')
    )
    U.deepStrictEqual(await f(_.right(1))(), 'right')
    U.deepStrictEqual(await f(_.left(''))(), 'left')
  })

  it('getOrElse', async () => {
    const f = _.getOrElse(() => 2)
    U.deepStrictEqual(await f(_.right(1))(), 1)
    U.deepStrictEqual(await f(_.left('a'))(), 2)
  })

  it('getOrElseE', async () => {
    const f = _.getOrElseE(() => T.of(2))
    U.deepStrictEqual(await f(_.right(1))(), 1)
    U.deepStrictEqual(await f(_.left('a'))(), 2)
  })

  it('fromNullableOrElse', async () => {
    const testNullable = _.fromNullableOrElse(() => 'foo')
    U.deepStrictEqual(await testNullable(1)(), E.right(1))
    U.deepStrictEqual(await testNullable(null)(), E.left('foo'))
    U.deepStrictEqual(await testNullable(undefined)(), E.left('foo'))
  })

  it('fromNullableKOrElse', async () => {
    const f = _.fromNullableKOrElse(() => 'foo')((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(1)(), E.right(1))
    U.deepStrictEqual(await f(0)(), E.left('foo'))
    U.deepStrictEqual(await f(-1)(), E.left('foo'))
  })

  it('flatMapNullableKOrElse', async () => {
    const f = _.flatMapNullableKOrElse(() => 'foo')((n: number) => (n > 0 ? n : n === 0 ? null : undefined))
    U.deepStrictEqual(await f(_.of(1))(), E.right(1))
    U.deepStrictEqual(await f(_.of(0))(), E.left('foo'))
    U.deepStrictEqual(await f(_.of(-1))(), E.left('foo'))
  })

  it('tapErrorIOK', async () => {
    const f = _.tapErrorIOK((e: string) => I.of(e.length))
    U.deepStrictEqual(await pipe(_.right(1), f)(), E.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), E.left('a'))
  })

  it('tapErrorTaskK', async () => {
    const f = _.tapErrorTaskK((e: string) => T.of(e.length))
    U.deepStrictEqual(await pipe(_.right(1), f)(), E.right(1))
    U.deepStrictEqual(await pipe(_.left('a'), f)(), E.left('a'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyArrayWithIndex', async () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.right(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyNonEmptyArray', async () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
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
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArray)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArray)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArray)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyArrayWithIndexSeq', async () => {
    const f = _.traverseReadonlyArrayWithIndexSeq((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(await pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.right(['a0', 'b1']))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyNonEmptyArraySeq', async () => {
    const f = _.traverseReadonlyNonEmptyArraySeq((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(await pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(await pipe(['a', ''], f)(), E.left('e'))
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
    U.deepStrictEqual(await pipe([right(1), right(2)], _.sequenceReadonlyArraySeq)(), E.right([1, 2]))
    U.deepStrictEqual(await pipe([right(3), left('a')], _.sequenceReadonlyArraySeq)(), E.left('a'))
    U.deepStrictEqual(await pipe([left('b'), right(4)], _.sequenceReadonlyArraySeq)(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
