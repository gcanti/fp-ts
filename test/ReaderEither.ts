import * as E from '../src/Either'
import { flow, identity, pipe } from '../src/Function'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderEither'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'

describe('ReaderEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.right(1), _.map(U.double))({}), E.right(2))
    })

    it('orElse', () => {
      const assertSemigroupKind = (
        a: _.ReaderEither<null, string, number>,
        b: _.ReaderEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        U.deepStrictEqual(pipe(a, _.orElse(b))(null), expected)
      }
      assertSemigroupKind(_.right(1), _.right(2), E.right(1))
      assertSemigroupKind(_.right(1), _.left('b'), E.right(1))
      assertSemigroupKind(_.left('a'), _.right(2), E.right(2))
      assertSemigroupKind(_.left('a'), _.left('b'), E.left('b'))
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.right(U.double), _.ap(_.right(1)))({}), E.right(2))
    })

    it('tap', () => {
      const f = flow(U.double, _.of)
      U.deepStrictEqual(pipe(_.right(1), _.tap(f))({}), E.right(1))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)({}), E.right('a'))
    })

    it('mapBoth', () => {
      const f = _.mapBoth(S.size, U.double)
      U.deepStrictEqual(pipe(_.right(1), f)({}), E.right(2))
      U.deepStrictEqual(pipe(_.left('aaa'), f)({}), E.left(3))
    })

    it('mapError', () => {
      const f = _.mapError(S.size)
      U.deepStrictEqual(pipe(_.right(1), f)({}), E.right(1))
      U.deepStrictEqual(pipe(_.left('aa'), f)({}), E.left(2))
    })

    it('fromOption', () => {
      U.deepStrictEqual(
        pipe(
          O.none,
          _.fromOption(() => 'none')
        )({}),
        E.left('none')
      )
      U.deepStrictEqual(
        pipe(
          O.some(1),
          _.fromOption(() => 'none')
        )({}),
        E.right(1)
      )
    })

    it('fromPredicate', () => {
      const f = _.liftPredicate((n: number) => n >= 2, identity<number>)
      U.deepStrictEqual(f(3)({}), E.right(3))
      U.deepStrictEqual(f(1)({}), E.left(1))
    })

    it('filter', () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(
        pipe(
          _.right(12),
          _.filter(predicate, () => -1)
        )({}),
        E.right(12)
      )
      U.deepStrictEqual(
        pipe(
          _.right(7),
          _.filter(predicate, () => -1)
        )({}),
        E.left(-1)
      )
      U.deepStrictEqual(
        pipe(
          _.left(12),
          _.filter(predicate, () => -1)
        )({}),
        E.left(12)
      )
      U.deepStrictEqual(
        pipe(
          _.right(7),
          _.filter(predicate, (n) => `invalid ${n}`)
        )({}),
        E.left('invalid 7')
      )
    })
  })

  it('match', () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(f(_.right(1))({}), 'right')
    U.deepStrictEqual(f(_.left('a'))({}), 'left')
  })

  it('matchReader', () => {
    const f = _.matchReader(
      () => R.of('left'),
      () => R.of('right')
    )
    U.deepStrictEqual(f(_.right(1))({}), 'right')
    U.deepStrictEqual(f(_.left('a'))({}), 'left')
  })

  it('getOrElse', () => {
    const f = _.getOrElse(() => 2)
    U.deepStrictEqual(f(_.right(1))({}), 1)
    U.deepStrictEqual(f(_.left('a'))({}), 2)
  })

  it('getOrElseReader', () => {
    const f = _.getOrElseReader(() => R.of(2))
    U.deepStrictEqual(f(_.right(1))({}), 1)
    U.deepStrictEqual(f(_.left('a'))({}), 2)
  })

  it('catchAll', () => {
    const catchAll = _.catchAll((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    U.deepStrictEqual(catchAll(_.right(1))({}), E.right(1))
  })

  it('ask', () => {
    U.deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    U.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null), E.left('ab'))
  })

  it('getSemigroupKReaderValidation', () => {
    const A = _.getValidatedSemigroupKind(S.Monoid)
    U.deepStrictEqual(pipe(_.left('a'), A.combineKind(_.left('b')))(null), E.left('ab'))
  })

  it('flatMapEither', () => {
    const f = (s: string) => (s.length === 1 ? E.right(s.length) : E.left('b'))
    U.deepStrictEqual(pipe(_.right('a'), _.flatMapEither(f))({}), E.right(1))
    U.deepStrictEqual(pipe(_.right('aa'), _.flatMapEither(f))({}), E.left('b'))
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right(1), _.bindTo('a'), _.bindRight('b', _.right('b')))(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.right(1), _.tupled, _.zipFlatten(_.right('b')))({}), E.right([1, 'b'] as const))
  })

  it('getCompactable', () => {
    const C = _.getCompactable(() => S.Monoid.empty)
    U.deepStrictEqual(C.compact(_.of(O.some('a')))({}), E.right('a'))
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)

    it('partitionMap', async () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))

      const assertPartition = <E, B, C>(
        [feb, fec]: readonly [_.ReaderEither<null, E, B>, _.ReaderEither<null, E, C>],
        [eb, ec]: readonly [E.Either<E, B>, E.Either<E, C>]
      ) => {
        U.deepStrictEqual(feb(null), eb)
        U.deepStrictEqual(fec(null), ec)
      }

      assertPartition(pipe(_.left('123'), F.partitionMap(f)), [E.left('123'), E.left('123')])
      assertPartition(pipe(_.right(1), F.partitionMap(f)), [E.right(0), E.left(S.Monoid.empty)])
      assertPartition(pipe(_.right(3), F.partitionMap(f)), [E.left(S.Monoid.empty), E.right(4)])
    })

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.left('123'), F.filterMap(f))(null), E.left('123'))
      U.deepStrictEqual(pipe(_.right(1), F.filterMap(f))(null), E.left(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.right(3), F.filterMap(f))(null), E.right(4))
    })
  })

  it('liftReader', () => {
    const ma = _.liftReader(
      (n: number): R.Reader<number, number> =>
        (c) =>
          n * c
    )
    U.deepStrictEqual(ma(3)(2), E.right(6))
  })

  it('flatMapReader', () => {
    const f = _.flatMapReader((): R.Reader<unknown, number> => () => 2)
    U.deepStrictEqual(pipe(_.right(3), f)({}), E.right(2))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.left('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(null), E.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.right(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.left('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.right('a'), _.right('b')], _.sequenceReadonlyArray)(null), E.right(['a', 'b']))
    U.deepStrictEqual(pipe([_.right('a'), _.left('e')], _.sequenceReadonlyArray)(null), E.left('e'))
  })
})
