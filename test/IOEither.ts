import * as E from '../src/Either'
import { flow, identity, pipe, SK } from '../src/function'
import * as I from '../src/IO'
import * as _ from '../src/IOEither'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'
import * as writer from '../src/Writer'

describe('IOEither', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('combineK', () => {
    const assertSemigroupK = (
      a: _.IOEither<string, number>,
      b: _.IOEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        pipe(
          a,
          _.combineK(() => b)
        )(),
        expected
      )
    }
    assertSemigroupK(_.right(1), _.right(2), E.right(1))
    assertSemigroupK(_.right(1), _.left('b'), E.right(1))
    assertSemigroupK(_.left('a'), _.right(2), E.right(2))
    assertSemigroupK(_.left('a'), _.left('b'), E.left('b'))
  })

  it('map', () => {
    U.deepStrictEqual(pipe(_.right(1), _.map(U.double))(), E.right(2))
  })

  it('apPar', () => {
    const assertAp = (
      a: _.IOEither<string, number>,
      b: _.IOEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        pipe(
          a,
          _.map((a) => (b: number) => a + b),
          _.apPar(b)
        )(),
        expected
      )
    }
    assertAp(_.right(1), _.right(2), E.right(3))
    assertAp(_.right(1), _.left('b'), E.left('b'))
    assertAp(_.left('a'), _.right(2), E.left('a'))
    assertAp(_.left('a'), _.left('b'), E.left('a'))
  })

  it('zipRightPar', () => {
    U.deepStrictEqual(pipe(_.right('a'), _.zipRightPar(_.right('b')))(), E.right('b'))
  })

  it('flatMap', () => {
    const f = (a: string) => (a.length > 2 ? _.right(a.length) : _.left('foo'))
    U.deepStrictEqual(pipe(_.right('foo'), _.flatMap(f))(), E.right(3))
    U.deepStrictEqual(pipe(_.right('a'), _.flatMap(f))(), E.left('foo'))
  })

  it('tap', () => {
    const f = (a: string): _.IOEither<string, number> => (a.length > 2 ? _.right(a.length) : _.left('foo'))
    U.deepStrictEqual(pipe(_.right('foo'), _.tap(f))(), E.right('foo'))
    U.deepStrictEqual(pipe(_.right('a'), _.tap(f))(), E.left('foo'))
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)(), E.right('a'))
  })

  it('mapBoth', () => {
    const f = _.mapBoth(S.size, gt(N.Ord)(2))
    U.deepStrictEqual(pipe(_.right(1), f)(), E.right(false))
    U.deepStrictEqual(pipe(_.left('aaa'), f)(), E.left(3))
  })

  it('mapError', () => {
    const f = _.mapError(U.double)
    U.deepStrictEqual(pipe(_.right('a'), f)(), E.right('a'))
    U.deepStrictEqual(pipe(_.left(1), f)(), E.left(2))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tryCatch', () => {
    U.deepStrictEqual(_.tryCatch(() => 1, identity)(), E.right(1))
    U.deepStrictEqual(
      _.tryCatch(() => {
        throw new Error('error')
      }, identity)(),
      E.left(new Error('error'))
    )
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption(() => 'err')(O.none)(), E.left('err'))
    U.deepStrictEqual(_.fromOption(() => 'err')(O.some(1))(), E.right(1))
  })

  it('fromOptionK', () => {
    const f = _.fromOptionK(
      (n: number) => (n > 0 ? O.some(n) : O.none),
      () => 'a'
    )
    U.deepStrictEqual(f(1)(), E.right(1))
    U.deepStrictEqual(f(-1)(), E.left('a'))
  })

  it('flatMapOptionK', () => {
    const f = _.flatMapOptionK(
      (n: number) => (n > 0 ? O.some(n) : O.none),
      () => 'a'
    )
    U.deepStrictEqual(f(_.right(1))(), E.right(1))
    U.deepStrictEqual(f(_.right(-1))(), E.left('a'))
    U.deepStrictEqual(f(_.left('b'))(), E.left('b'))
  })

  it('flatMapEitherK', () => {
    const f = _.flatMapEitherK((n: number) => (n > 0 ? E.right(n) : E.left('a')))
    U.deepStrictEqual(f(_.right(1))(), E.right(1))
    U.deepStrictEqual(f(_.right(-1))(), E.left('a'))
    U.deepStrictEqual(f(_.left('b'))(), E.left('b'))
  })

  it('fromEither', () => {
    U.deepStrictEqual(_.fromEither(E.right('a'))(), E.right('a'))
    U.deepStrictEqual(_.fromEither(E.left('a'))(), E.left('a'))
  })

  it('fromPredicate', () => {
    const f = _.fromPredicate(
      (n: number) => n >= 2,
      (a) => a
    )
    U.deepStrictEqual(f(3)(), E.right(3))
    U.deepStrictEqual(f(1)(), E.left(1))
  })

  it('filter', () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.filter(predicate, () => -1)
      )(),
      E.right(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filter(predicate, () => -1)
      )(),
      E.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        _.left(12),
        _.filter(predicate, () => -1)
      )(),
      E.left(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filter(predicate, (n) => `invalid ${n}`)
      )(),
      E.left('invalid 7')
    )
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(f(_.right(1))(), 'right')
    U.deepStrictEqual(f(_.left(1))(), 'left')
  })

  it('matchWithEffect', () => {
    const f = _.matchWithEffect(
      () => I.of('left'),
      () => I.of('right')
    )
    U.deepStrictEqual(f(_.right(1))(), 'right')
    U.deepStrictEqual(f(_.left(1))(), 'left')
  })

  it('getOrElse', () => {
    const f = _.getOrElse(() => 2)
    U.deepStrictEqual(f(_.right(1))(), 1)
    U.deepStrictEqual(f(_.left('a'))(), 2)
  })

  it('getOrElseWithEffect', () => {
    const f = _.getOrElseWithEffect(() => I.of(2))
    U.deepStrictEqual(f(_.right(1))(), 1)
    U.deepStrictEqual(f(_.left('a'))(), 2)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('orElse', () => {
    U.deepStrictEqual(_.orElse(() => _.right(2))(_.right(1))(), E.right(1))
  })

  it('flatMapEitherK', () => {
    const f = flow(S.size, E.of)
    const x = pipe(_.right('a'), _.flatMapEitherK(f))()
    U.deepStrictEqual(x, E.right(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('ApplicativePar', () => {
    const log: Array<string> = []
    const tuple =
      <A>(a: A) =>
      <B>(b: B) =>
      <C>(c: C): readonly [A, B, C] =>
        [a, b, c]
    const a = _.rightIO(() => log.push('a'))
    const b = _.leftIO(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO(() => log.push('c'))
    const A = _.ApplicativePar
    U.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    U.deepStrictEqual(log, ['a', 'b', 'c'])
  })

  it('Applicative', () => {
    const log: Array<string> = []
    const tuple =
      <A>(a: A) =>
      <B>(b: B) =>
      <C>(c: C): readonly [A, B, C] =>
        [a, b, c]
    const a = _.rightIO(() => log.push('a'))
    const b = _.leftIO(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO(() => log.push('c'))
    const A = _.Applicative
    U.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getApplicativeIOValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(), E.left('ab'))
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.right(1)))(), E.left('a'))
  })

  it('getSemigroupKIOValidation', () => {
    const A = _.getValidatedSemigroupK(S.Monoid)
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        A.combineK(() => _.left('b'))
      )(),
      E.left('ab')
    )
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)

    it('compact', () => {
      U.deepStrictEqual(C.compact(_.right(O.some(1)))(), E.right(1))
    })

    it('separate', () => {
      const s1 = C.separate(_.left('a'))
      U.deepStrictEqual(writer.fst(s1)(), E.left('a'))
      U.deepStrictEqual(writer.snd(s1)(), E.left('a'))
      const s2 = C.separate(_.right(E.left('a')))
      U.deepStrictEqual(writer.fst(s2)(), E.right('a'))
      U.deepStrictEqual(writer.snd(s2)(), E.left(''))
      const s3 = C.separate(_.right(E.right(1)))
      U.deepStrictEqual(writer.fst(s3)(), E.left(''))
      U.deepStrictEqual(writer.snd(s3)(), E.right(1))
    })
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)

    it('partitionMap', async () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))

      const assertPartition = <E, B, C>(
        [feb, fec]: readonly [_.IOEither<E, B>, _.IOEither<E, C>],
        [eb, ec]: readonly [E.Either<E, B>, E.Either<E, C>]
      ) => {
        U.deepStrictEqual(feb(), eb)
        U.deepStrictEqual(fec(), ec)
      }

      assertPartition(pipe(_.left('123'), F.partitionMap(f)), [E.left('123'), E.left('123')])
      assertPartition(pipe(_.right(1), F.partitionMap(f)), [E.right(0), E.left(S.Monoid.empty)])
      assertPartition(pipe(_.right(3), F.partitionMap(f)), [E.left(S.Monoid.empty), E.right(4)])
    })

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.left('123'), F.filterMap(f))(), E.left('123'))
      U.deepStrictEqual(pipe(_.right(1), F.filterMap(f))(), E.left(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.right(3), F.filterMap(f))(), E.right(4))
    })
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

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

    it('should return the acquire error if acquire fails', () => {
      const e = _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(e, E.left('acquire failure'))
    })

    it('body and release must not be called if acquire fails', () => {
      _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(e, E.left('use failure'))
    })

    it('should return the release error if both use and release fail', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseFailure)()
      U.deepStrictEqual(e, E.left('release failure'))
    })

    it('release must be called if the body returns', () => {
      _.bracket(acquireSuccess, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('release must be called if the body throws', () => {
      _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(log, ['release success'])
    })

    it('should return the release error if release fails', () => {
      const e = _.bracket(acquireSuccess, useSuccess, releaseFailure)()
      U.deepStrictEqual(e, E.left('release failure'))
    })
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.right(1), _.bindTo('a'), _.bindPar('b', _.right('b')))(), E.right({ a: 1, b: 'b' }))
  })

  it('bindTPar', () => {
    U.deepStrictEqual(pipe(_.right(1), _.tupled, _.bindTPar(_.right('b')))(), E.right([1, 'b'] as const))
  })

  it('tryCatchK', () => {
    const f = (n: number) => {
      if (n > 0) {
        return n * 2
      }
      throw new Error('negative')
    }
    const g = _.tryCatchK(f, identity)
    U.deepStrictEqual(g(1)(), E.right(2))
    U.deepStrictEqual(g(-1)(), E.left(new Error('negative')))
  })

  it('toUnion', () => {
    U.deepStrictEqual(_.toUnion(_.right(1))(), 1)
    U.deepStrictEqual(_.toUnion(_.left('a'))(), 'a')
  })

  it('tapError', () => {
    const f = _.tapError((e: string) => (e.length <= 1 ? _.right(void 0) : _.left(e + '!')))
    U.deepStrictEqual(pipe(_.right(1), f)(), E.right(1))
    U.deepStrictEqual(pipe(_.left('a'), f)(), E.left('a'))
    U.deepStrictEqual(pipe(_.left('aa'), f)(), E.left('aa!'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyNonEmptyArrayPar', () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArrayWithIndexPar', () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArrayPar', () => {
    const f = _.traverseReadonlyArrayPar((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b']))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArrayWithIndexPar', () => {
    U.deepStrictEqual(pipe(RA.empty, _.traverseReadonlyArrayWithIndexPar(SK))(), E.right(RA.empty))

    const log: Array<number | string> = []
    const right = (n: number): _.IOEither<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.IOEither<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndexPar(SK))(), E.right([1, 2]))
    U.deepStrictEqual(pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndexPar(SK))(), E.left('a'))
    U.deepStrictEqual(pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndexPar(SK))(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArray', () => {
    const f = _.traverseReadonlyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe(RA.empty, _.traverseReadonlyArrayWithIndex(SK))(), E.right(RA.empty))

    const log: Array<number | string> = []
    const right = (n: number): _.IOEither<string, number> =>
      _.rightIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.IOEither<string, number> =>
      _.leftIO(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndex(SK))(), E.right([1, 2]))
    U.deepStrictEqual(pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndex(SK))(), E.left('a'))
    U.deepStrictEqual(pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndex(SK))(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
