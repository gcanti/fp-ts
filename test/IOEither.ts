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
import * as FilterableModule from '../src/Filterable'
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

  it('ap', () => {
    const assertAp = (
      a: _.IOEither<string, number>,
      b: _.IOEither<string, number>,
      expected: E.Either<string, number>
    ) => {
      U.deepStrictEqual(
        pipe(
          a,
          _.map((a) => (b: number) => a + b),
          _.ap(b)
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
    U.deepStrictEqual(pipe(_.right<string, boolean>('foo'), _.tap(f))(), E.right('foo'))
    U.deepStrictEqual(pipe(_.right<string, boolean>('a'), _.tap(f))(), E.left('foo'))
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

  it('fromOptionKOrElse', () => {
    const f = _.fromOptionKOrElse(
      (n: number) => (n > 0 ? O.some(n) : O.none),
      () => 'a'
    )
    U.deepStrictEqual(f(1)(), E.right(1))
    U.deepStrictEqual(f(-1)(), E.left('a'))
  })

  it('flatMapOptionKOrElse', () => {
    const f = _.flatMapOptionKOrElse(
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

  it('fromPredicateOrElse', () => {
    const f = _.fromPredicateOrElse(
      (n: number) => n >= 2,
      (a) => a
    )
    U.deepStrictEqual(f(3)(), E.right(3))
    U.deepStrictEqual(f(1)(), E.left(1))
  })

  it('fromRefinementOrElse', () => {
    const f = _.fromRefinementOrElse(S.isString, identity)
    U.deepStrictEqual(f('a')(), E.right('a'))
    U.deepStrictEqual(f(1)(), E.left(1))
  })

  it('filterOrElse', () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.right(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        _.left(12),
        _.filterOrElse(predicate, () => -1)
      )(),
      E.left(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filterOrElse(predicate, (n) => `invalid ${n}`)
      )(),
      E.left('invalid 7')
    )
  })

  it('refineOrElse', () => {
    const refinement = (s: string): s is 'a' => s === 'a'
    const onFalse = (s: string) => `invalid string ${s}`

    U.deepStrictEqual(pipe(_.right('a'), _.refineOrElse(refinement, onFalse))(), E.right('a'))
    U.deepStrictEqual(pipe(_.right('b'), _.refineOrElse(refinement, onFalse))(), E.left('invalid string b'))
    U.deepStrictEqual(pipe(_.left(-1), _.refineOrElse(refinement, onFalse))(), E.left(-1))
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

  it('matchE', () => {
    const f = _.matchE(
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

  it('getOrElseE', () => {
    const f = _.getOrElseE(() => I.of(2))
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
    const a = _.rightIO<number, string>(() => log.push('a'))
    const b = _.leftIO<string, number>(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO<number, string>(() => log.push('c'))
    const A = _.ApplicativePar
    U.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    U.deepStrictEqual(log, ['a', 'b', 'c'])
  })

  it('ApplicativeSeq', () => {
    const log: Array<string> = []
    const tuple =
      <A>(a: A) =>
      <B>(b: B) =>
      <C>(c: C): readonly [A, B, C] =>
        [a, b, c]
    const a = _.rightIO<number, string>(() => log.push('a'))
    const b = _.leftIO<string, number>(() => {
      log.push('b')
      return 'error'
    })
    const c = _.rightIO<number, string>(() => log.push('c'))
    const A = _.ApplicativeSeq
    U.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.left('error'))
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getApplicativeIOValidation', () => {
    const A = _.getApplicativeIOValidation(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(), E.left('ab'))
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.right(1)))(), E.left('a'))
  })

  it('getSemigroupKIOValidation', () => {
    const A = _.getSemigroupKIOValidation(S.Monoid)
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
    const F = _.getFilterable(RA.getMonoid<string>())

    it('partition', () => {
      const partition = FilterableModule.partition(F)

      const s = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        partition((s: string) => s.length > 2)
      )
      U.deepStrictEqual(writer.fst(s)(), E.right('a'))
      U.deepStrictEqual(writer.snd(s)(), E.left([]))
    })

    it('partitionMap', () => {
      const s = pipe(
        _.of<string, ReadonlyArray<string>>('a'),
        F.partitionMap((s) => (s.length > 2 ? E.right(s.length) : E.left(false)))
      )
      U.deepStrictEqual(writer.fst(s)(), E.right(false))
      U.deepStrictEqual(writer.snd(s)(), E.left([]))
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
        _.right<number, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right<number, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    U.deepStrictEqual(pipe(_.right<number, string>(1), _.tupled, _.apT(_.right('b')))(), E.right([1, 'b'] as const))
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

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArray', () => {
    const f = _.traverseReadonlyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b']))
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
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyNonEmptyArraySeq', () => {
    const f = _.traverseReadonlyNonEmptyArraySeq((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('traverseReadonlyArraySeq', () => {
    const f = _.traverseReadonlyArraySeq((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.left('e'))
  })

  it('sequenceReadonlyArraySeq', () => {
    U.deepStrictEqual(pipe(RA.empty, _.traverseReadonlyArrayWithIndexSeq(SK))(), E.right(RA.empty))

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
    U.deepStrictEqual(pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.right([1, 2]))
    U.deepStrictEqual(pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.left('a'))
    U.deepStrictEqual(pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndexSeq(SK))(), E.left('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
