import * as E from '../src/Result'
import { flow, identity, pipe, SK } from '../src/Function'
import * as I from '../src/Sync'
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

  it('orElse', () => {
    const assertSemigroupKind = (
      a: _.IOEither<string, number>,
      b: _.IOEither<string, number>,
      expected: E.Result<string, number>
    ) => {
      U.deepStrictEqual(pipe(a, _.orElse(b))(), expected)
    }
    assertSemigroupKind(_.succeed(1), _.succeed(2), E.succeed(1))
    assertSemigroupKind(_.succeed(1), _.fail('b'), E.succeed(1))
    assertSemigroupKind(_.fail('a'), _.succeed(2), E.succeed(2))
    assertSemigroupKind(_.fail('a'), _.fail('b'), E.fail('b'))
  })

  it('map', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.map(U.double))(), E.succeed(2))
  })

  it('flatMap', () => {
    const f = (a: string) => (a.length > 2 ? _.succeed(a.length) : _.fail('foo'))
    U.deepStrictEqual(pipe(_.succeed('foo'), _.flatMap(f))(), E.succeed(3))
    U.deepStrictEqual(pipe(_.succeed('a'), _.flatMap(f))(), E.fail('foo'))
  })

  it('tap', () => {
    const f = (a: string): _.IOEither<string, number> => (a.length > 2 ? _.succeed(a.length) : _.fail('foo'))
    U.deepStrictEqual(pipe(_.succeed('foo'), _.tap(f))(), E.succeed('foo'))
    U.deepStrictEqual(pipe(_.succeed('a'), _.tap(f))(), E.fail('foo'))
  })

  it('flatten', () => {
    U.deepStrictEqual(pipe(_.succeed(_.succeed('a')), _.flatten)(), E.succeed('a'))
  })

  it('mapBoth', () => {
    const f = _.mapBoth(S.size, gt(N.Ord)(2))
    U.deepStrictEqual(pipe(_.succeed(1), f)(), E.succeed(false))
    U.deepStrictEqual(pipe(_.fail('aaa'), f)(), E.fail(3))
  })

  it('mapError', () => {
    const f = _.mapError(U.double)
    U.deepStrictEqual(pipe(_.succeed('a'), f)(), E.succeed('a'))
    U.deepStrictEqual(pipe(_.fail(1), f)(), E.fail(2))
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('tryCatch', () => {
    U.deepStrictEqual(_.fromThrowable(() => 1, identity)(), E.succeed(1))
    U.deepStrictEqual(
      _.fromThrowable(() => {
        throw new Error('error')
      }, identity)(),
      E.fail(new Error('error'))
    )
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption('err')(O.none)(), E.fail('err'))
    U.deepStrictEqual(_.fromOption('err')(O.some(1))(), E.succeed(1))
  })

  it('liftOption', () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none), 'a')
    U.deepStrictEqual(f(1)(), E.succeed(1))
    U.deepStrictEqual(f(-1)(), E.fail('a'))
  })

  it('flatMapOption', () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none), 'a')
    U.deepStrictEqual(f(_.succeed(1))(), E.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1))(), E.fail('a'))
    U.deepStrictEqual(f(_.fail('b'))(), E.fail('b'))
  })

  it('flatMapEither', () => {
    const f = _.flatMapEither((n: number) => (n > 0 ? E.succeed(n) : E.fail('a')))
    U.deepStrictEqual(f(_.succeed(1))(), E.succeed(1))
    U.deepStrictEqual(f(_.succeed(-1))(), E.fail('a'))
    U.deepStrictEqual(f(_.fail('b'))(), E.fail('b'))
  })

  it('fromResult', () => {
    U.deepStrictEqual(_.fromResult(E.succeed('a'))(), E.succeed('a'))
    U.deepStrictEqual(_.fromResult(E.fail('a'))(), E.fail('a'))
  })

  it('fromPredicate', () => {
    const f = _.liftPredicate((n: number) => n >= 2, 'e')
    U.deepStrictEqual(f(3)(), E.succeed(3))
    U.deepStrictEqual(f(1)(), E.fail('e'))
  })

  it('filter', () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(pipe(_.succeed(12), _.filter(predicate, -1))(), E.succeed(12))
    U.deepStrictEqual(pipe(_.succeed(7), _.filter(predicate, -1))(), E.fail(-1))
    U.deepStrictEqual(pipe(_.fail(12), _.filter(predicate, -1))(), E.fail(12))
  })

  // -------------------------------------------------------------------------------------
  // destructors
  // -------------------------------------------------------------------------------------

  it('match', () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(f(_.succeed(1))(), 'right')
    U.deepStrictEqual(f(_.fail(1))(), 'left')
  })

  it('matchIO', () => {
    const f = _.matchIO(
      () => I.succeed('left'),
      () => I.succeed('right')
    )
    U.deepStrictEqual(f(_.succeed(1))(), 'right')
    U.deepStrictEqual(f(_.fail(1))(), 'left')
  })

  it('getOrElse', () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(f(_.succeed(1))(), 1)
    U.deepStrictEqual(f(_.fail('a'))(), 2)
  })

  it('getOrElseIO', () => {
    const f = _.getOrElseIO(I.succeed(2))
    U.deepStrictEqual(f(_.succeed(1))(), 1)
    U.deepStrictEqual(f(_.fail('a'))(), 2)
  })

  // -------------------------------------------------------------------------------------
  // combinators
  // -------------------------------------------------------------------------------------

  it('catchAll', () => {
    U.deepStrictEqual(_.catchAll(() => _.succeed(2))(_.succeed(1))(), E.succeed(1))
  })

  it('flatMapEither', () => {
    const f = flow(S.size, E.succeed)
    const x = pipe(_.succeed('a'), _.flatMapEither(f))()
    U.deepStrictEqual(x, E.succeed(1))
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('Applicative', () => {
    const log: Array<string> = []
    const tuple =
      <A>(a: A) =>
      <B>(b: B) =>
      <C>(c: C): readonly [A, B, C] =>
        [a, b, c]
    const a = _.fromIO(() => log.push('a'))
    const b = _.failSync(() => {
      log.push('b')
      return 'error'
    })
    const c = _.fromIO(() => log.push('c'))
    const A = _.Applicative
    U.deepStrictEqual(pipe(a, A.map(tuple), A.ap(b), A.ap(c))(), E.fail('error'))
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('getApplicativeIOValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.fail('a'), A.map(tuple), A.ap(_.fail('b')))(), E.fail('ab'))
    U.deepStrictEqual(pipe(_.fail('a'), A.map(tuple), A.ap(_.succeed(1)))(), E.fail('a'))
  })

  it('getSemigroupKIOValidation', () => {
    const A = _.getValidatedSemigroupKind(S.Monoid)
    U.deepStrictEqual(pipe(_.fail('a'), A.combineKind(_.fail('b')))(), E.fail('ab'))
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(() => S.Monoid.empty)

    it('compact', () => {
      U.deepStrictEqual(C.compact(_.succeed(O.some(1)))(), E.succeed(1))
    })
  })

  it('separate', () => {
    const s1 = _.separate(S.Monoid.empty)(_.fail('a'))
    U.deepStrictEqual(writer.fst(s1)(), E.fail('a'))
    U.deepStrictEqual(writer.snd(s1)(), E.fail('a'))
    const s2 = _.separate(S.Monoid.empty)(_.succeed(E.fail('a')))
    U.deepStrictEqual(writer.fst(s2)(), E.succeed('a'))
    U.deepStrictEqual(writer.snd(s2)(), E.fail(''))
    const s3 = _.separate(S.Monoid.empty)(_.succeed(E.succeed(1)))
    U.deepStrictEqual(writer.fst(s3)(), E.fail(''))
    U.deepStrictEqual(writer.snd(s3)(), E.succeed(1))
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid.empty)

    it('partitionMap', async () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? E.succeed(n + 1) : E.fail(n - 1))

      const assertPartition = <E, B, C>(
        [feb, fec]: readonly [_.IOEither<E, B>, _.IOEither<E, C>],
        [eb, ec]: readonly [E.Result<E, B>, E.Result<E, C>]
      ) => {
        U.deepStrictEqual(feb(), eb)
        U.deepStrictEqual(fec(), ec)
      }

      assertPartition(pipe(_.fail('123'), F.partitionMap(f)), [E.fail('123'), E.fail('123')])
      assertPartition(pipe(_.succeed(1), F.partitionMap(f)), [E.succeed(0), E.fail(S.Monoid.empty)])
      assertPartition(pipe(_.succeed(3), F.partitionMap(f)), [E.fail(S.Monoid.empty), E.succeed(4)])
    })

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.fail('123'), F.filterMap(f))(), E.fail('123'))
      U.deepStrictEqual(pipe(_.succeed(1), F.filterMap(f))(), E.fail(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.succeed(3), F.filterMap(f))(), E.succeed(4))
    })
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

  describe('bracket', () => {
    let log: Array<string> = []

    const acquireFailure = _.fail('acquire failure')
    const acquireSuccess = _.succeed({ res: 'acquire success' })
    const useSuccess = () => _.succeed('use success')
    const useFailure = () => _.fail('use failure')
    const releaseSuccess = () =>
      _.fromIO(() => {
        log.push('release success')
      })
    const releaseFailure = () => _.fail('release failure')

    beforeEach(() => {
      log = []
    })

    it('should return the acquire error if acquire fails', () => {
      const e = _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(e, E.fail('acquire failure'))
    })

    it('body and release must not be called if acquire fails', () => {
      _.bracket(acquireFailure, useSuccess, releaseSuccess)()
      U.deepStrictEqual(log, [])
    })

    it('should return the use error if use fails and release does not', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseSuccess)()
      U.deepStrictEqual(e, E.fail('use failure'))
    })

    it('should return the release error if both use and release fail', () => {
      const e = _.bracket(acquireSuccess, useFailure, releaseFailure)()
      U.deepStrictEqual(e, E.fail('release failure'))
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
      U.deepStrictEqual(e, E.fail('release failure'))
    })
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))(), E.succeed([1, 'b'] as const))
  })

  it('liftThrowable', () => {
    const f = (n: number) => {
      if (n > 0) {
        return n * 2
      }
      throw new Error('negative')
    }
    const g = _.liftThrowable(f, identity)
    U.deepStrictEqual(g(1)(), E.succeed(2))
    U.deepStrictEqual(g(-1)(), E.fail(new Error('negative')))
  })

  it('toUnion', () => {
    U.deepStrictEqual(_.toUnion(_.succeed(1))(), 1)
    U.deepStrictEqual(_.toUnion(_.fail('a'))(), 'a')
  })

  it('tapError', () => {
    const f = _.tapError((e: string) => (e.length <= 1 ? _.succeed(void 0) : _.fail(e + '!')))
    U.deepStrictEqual(pipe(_.succeed(1), f)(), E.succeed(1))
    U.deepStrictEqual(pipe(_.fail('a'), f)(), E.fail('a'))
    U.deepStrictEqual(pipe(_.fail('aa'), f)(), E.fail('aa!'))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  // --- Par ---

  it('traverseReadonlyNonEmptyArrayPar', () => {
    const f = _.traverseReadonlyNonEmptyArrayPar((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyArrayWithIndexPar', () => {
    const f = _.traverseReadonlyArrayWithIndexPar((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.succeed(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyArrayPar', () => {
    const f = _.traverseReadonlyArrayPar((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.succeed(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.succeed(['a', 'b']))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyArrayWithIndexPar', () => {
    U.deepStrictEqual(pipe(RA.empty, _.traverseReadonlyArrayWithIndexPar(SK))(), E.succeed(RA.empty))

    const log: Array<number | string> = []
    const right = (n: number): _.IOEither<string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.IOEither<string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndexPar(SK))(), E.succeed([1, 2]))
    U.deepStrictEqual(pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndexPar(SK))(), E.fail('a'))
    U.deepStrictEqual(pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndexPar(SK))(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b', 4])
  })

  // --- Seq ---

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.fail('e'))
  })

  it('traverseReadonlyArray', () => {
    const f = _.traverseReadonlyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(), E.succeed(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(), E.fail('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe(RA.empty, _.traverseReadonlyArrayWithIndex(SK))(), E.succeed(RA.empty))

    const log: Array<number | string> = []
    const right = (n: number): _.IOEither<string, number> =>
      _.fromIO(() => {
        log.push(n)
        return n
      })
    const left = (s: string): _.IOEither<string, number> =>
      _.failSync(() => {
        log.push(s)
        return s
      })
    U.deepStrictEqual(pipe([right(1), right(2)], _.traverseReadonlyArrayWithIndex(SK))(), E.succeed([1, 2]))
    U.deepStrictEqual(pipe([right(3), left('a')], _.traverseReadonlyArrayWithIndex(SK))(), E.fail('a'))
    U.deepStrictEqual(pipe([left('b'), right(4)], _.traverseReadonlyArrayWithIndex(SK))(), E.fail('b'))
    U.deepStrictEqual(log, [1, 2, 3, 'a', 'b'])
  })
})
