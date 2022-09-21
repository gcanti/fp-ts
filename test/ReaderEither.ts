import * as E from '../src/Either'
import { flow, identity, pipe } from '../src/function'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderEither'
import * as RA from '../src/ReadonlyArray'
import * as Sep from '../src/Separated'
import * as S from '../src/string'
import * as U from './util'
import * as FilterableModule from '../src/Filterable'

describe('ReaderEither', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.right(1), _.map(U.double))({}), E.right(2))
    })

    it('combineK', () => {
      const assertSemigroupK = (
        a: _.ReaderEither<null, string, number>,
        b: _.ReaderEither<null, string, number>,
        expected: E.Either<string, number>
      ) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.combineK(() => b)
          )(null),
          expected
        )
      }
      assertSemigroupK(_.right(1), _.right(2), E.right(1))
      assertSemigroupK(_.right(1), _.left('b'), E.right(1))
      assertSemigroupK(_.left('a'), _.right(2), E.right(2))
      assertSemigroupK(_.left('a'), _.left('b'), E.left('b'))
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.right(U.double), _.ap(_.right(1)))({}), E.right(2))
    })

    it('apFirst', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apFirst(_.right('b')))({}), E.right('a'))
    })

    it('apSecond', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.apSecond(_.right('b')))({}), E.right('b'))
    })

    it('flatMapFirst', () => {
      const f = flow(U.double, _.of)
      U.deepStrictEqual(pipe(_.right(1), _.flatMapFirst(f))({}), E.right(1))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten)({}), E.right('a'))
    })

    it('bimap', () => {
      const f = _.bimap(S.size, U.double)
      U.deepStrictEqual(pipe(_.right(1), f)({}), E.right(2))
      U.deepStrictEqual(pipe(_.left('aaa'), f)({}), E.left(3))
    })

    it('mapLeft', () => {
      const f = _.mapLeft(S.size)
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

    it('fromPredicateOrElse', () => {
      const f = _.fromPredicateOrElse((n: number) => n >= 2, identity)
      U.deepStrictEqual(f(3)({}), E.right(3))
      U.deepStrictEqual(f(1)({}), E.left(1))
    })

    it('fromRefinementOrElse', () => {
      const f = _.fromRefinementOrElse(S.isString, identity)
      U.deepStrictEqual(f('a')({}), E.right('a'))
      U.deepStrictEqual(f(1)({}), E.left(1))
    })

    it('filterOrElse', () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(
        pipe(
          _.right(12),
          _.filterOrElse(predicate, () => -1)
        )({}),
        E.right(12)
      )
      U.deepStrictEqual(
        pipe(
          _.right(7),
          _.filterOrElse(predicate, () => -1)
        )({}),
        E.left(-1)
      )
      U.deepStrictEqual(
        pipe(
          _.left(12),
          _.filterOrElse(predicate, () => -1)
        )({}),
        E.left(12)
      )
      U.deepStrictEqual(
        pipe(
          _.right(7),
          _.filterOrElse(predicate, (n) => `invalid ${n}`)
        )({}),
        E.left('invalid 7')
      )
    })

    it('refineOrElse', () => {
      const refinement = (s: string): s is 'a' => s === 'a'
      const onFalse = (s: string) => `invalid string ${s}`

      U.deepStrictEqual(pipe(_.right('a'), _.refineOrElse(refinement, onFalse))({}), E.right('a'))
      U.deepStrictEqual(pipe(_.right('b'), _.refineOrElse(refinement, onFalse))({}), E.left('invalid string b'))
      U.deepStrictEqual(pipe(_.left(-1), _.refineOrElse(refinement, onFalse))({}), E.left(-1))
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

  it('matchE', () => {
    const f = _.matchE(
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

  it('getOrElseE', () => {
    const f = _.getOrElseE(() => R.of(2))
    U.deepStrictEqual(f(_.right(1))({}), 1)
    U.deepStrictEqual(f(_.left('a'))({}), 2)
  })

  it('orElse', () => {
    const orElse = _.orElse((s: string) => (s.length > 2 ? _.right(1) : _.left(2)))
    U.deepStrictEqual(orElse(_.right(1))({}), E.right(1))
  })

  it('ask', () => {
    U.deepStrictEqual(_.ask()({}), E.right({}))
  })

  it('asks', () => {
    U.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.right(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getApplicativeReaderValidation(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.left('a'), A.map(tuple), A.ap(_.left('b')))(null), E.left('ab'))
  })

  it('getSemigroupKReaderValidation', () => {
    const A = _.getSemigroupKReaderValidation(S.Monoid)
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        A.combineK(() => _.left('b'))
      )(null),
      E.left('ab')
    )
  })

  it('flatMapEitherK', () => {
    const f = (s: string) => (s.length === 1 ? E.right(s.length) : E.left('b'))
    U.deepStrictEqual(pipe(_.right('a'), _.flatMapEitherK(f))({}), E.right(1))
    U.deepStrictEqual(pipe(_.right('aa'), _.flatMapEitherK(f))({}), E.left('b'))
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right<number, void, string>(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b'))
      )(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.right<number, void, string>(1), _.bindTo('a'), _.apS('b', _.right('b')))(undefined),
      E.right({ a: 1, b: 'b' })
    )
  })

  it('apT', () => {
    U.deepStrictEqual(
      pipe(_.right<number, {}, string>(1), _.tupled, _.apT(_.right('b')))({}),
      E.right([1, 'b'] as const)
    )
  })

  it('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)
    U.deepStrictEqual(C.compact(_.of(O.some('a')))({}), E.right('a'))
  })

  it('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)
    const fa: _.ReaderEither<unknown, string, string> = _.of('a')
    const filter = FilterableModule.filter(F)
    U.deepStrictEqual(
      pipe(
        fa,
        filter((s) => s.length > 0)
      )({}),
      E.right('a')
    )
    U.deepStrictEqual(
      pipe(
        fa,
        F.filterMap((s) => (s.length > 0 ? O.some(s.length) : O.none))
      )({}),
      E.right(1)
    )
    const partition = FilterableModule.partition(F)
    const s1 = pipe(
      fa,
      partition((s) => s.length > 0)
    )
    U.deepStrictEqual(Sep.left(s1)({}), E.left(''))
    U.deepStrictEqual(Sep.right(s1)({}), E.right('a'))
    const s2 = pipe(
      fa,
      F.partitionMap((s) => (s.length > 0 ? E.right(s.length) : E.left(s)))
    )
    U.deepStrictEqual(Sep.left(s2)({}), E.left(''))
    U.deepStrictEqual(Sep.right(s2)({}), E.right(1))
  })

  it('fromReaderK', () => {
    const ma = _.fromReaderK(
      (n: number): R.Reader<number, number> =>
        (c) =>
          n * c
    )
    U.deepStrictEqual(ma(3)(2), E.right(6))
  })

  it('flatMapReaderK', () => {
    const f = _.flatMapReaderK((): R.Reader<unknown, number> => () => 2)
    U.deepStrictEqual(pipe(_.right<number, {}>(3), f)({}), E.right(2))
  })

  it('flatMapFirstReaderK', () => {
    const f = _.flatMapFirstReaderK(
      (n: number): R.Reader<number, number> =>
        (c) =>
          n * c
    )
    U.deepStrictEqual(pipe(_.right(3), f)(2), E.right(3))
    U.deepStrictEqual(pipe(_.left('a'), f)(2), E.left('a'))
  })

  it('flatMapFirstEitherK', async () => {
    const f = (s: string) => E.right(s.length)
    U.deepStrictEqual(pipe(_.right('a'), _.flatMapFirstEitherK(f))({}), E.right('a'))
    const g = (s: string) => E.left(s.length)
    U.deepStrictEqual(pipe(_.right('a'), _.flatMapFirstEitherK(g))({}), E.left(1))
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
