import * as E from '../src/Result'
import { flow, pipe } from '../src/Function'
import * as O from '../src/Option'
import * as R from '../src/Reader'
import * as _ from '../src/ReaderResult'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as U from './util'

describe('ReaderResult', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.of(1), _.map(U.double))({}), E.of(2))
    })

    it('orElse', () => {
      const assertAlt = (
        a: _.ReaderResult<null, string, number>,
        b: _.ReaderResult<null, string, number>,
        expected: E.Result<string, number>
      ) => {
        U.deepStrictEqual(pipe(a, _.orElse(b))(null), expected)
      }
      assertAlt(_.of(1), _.of(2), E.of(1))
      assertAlt(_.of(1), _.fail('b'), E.of(1))
      assertAlt(_.fail('a'), _.of(2), E.of(2))
      assertAlt(_.fail('a'), _.fail('b'), E.fail('b'))
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.of(U.double), _.ap(_.of(1)))({}), E.of(2))
    })

    it('tap', () => {
      const f = flow(U.double, _.of)
      U.deepStrictEqual(pipe(_.of(1), _.tap(f))({}), E.of(1))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten)({}), E.of('a'))
    })

    it('mapBoth', () => {
      const f = _.mapBoth(S.size, U.double)
      U.deepStrictEqual(pipe(_.of(1), f)({}), E.of(2))
      U.deepStrictEqual(pipe(_.fail('aaa'), f)({}), E.fail(3))
    })

    it('mapError', () => {
      const f = _.mapError(S.size)
      U.deepStrictEqual(pipe(_.of(1), f)({}), E.of(1))
      U.deepStrictEqual(pipe(_.fail('aa'), f)({}), E.fail(2))
    })

    it('fromOption', () => {
      U.deepStrictEqual(pipe(O.none, _.fromOption('none'))({}), E.fail('none'))
      U.deepStrictEqual(
        pipe(
          O.some(1),
          _.fromOption(() => 'none')
        )({}),
        E.of(1)
      )
    })

    it('fromPredicate', () => {
      const f = _.liftPredicate((n: number) => n >= 2, 'e')
      U.deepStrictEqual(f(3)({}), E.of(3))
      U.deepStrictEqual(f(1)({}), E.fail('e'))
    })

    it('filter', () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(pipe(_.of(12), _.filter(predicate, -1))({}), E.of(12))
      U.deepStrictEqual(pipe(_.of(7), _.filter(predicate, -1))({}), E.fail(-1))
      U.deepStrictEqual(pipe(_.fail(12), _.filter(predicate, -1))({}), E.fail(12))
    })
  })

  it('match', () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(f(_.of(1))({}), 'right')
    U.deepStrictEqual(f(_.fail('a'))({}), 'left')
  })

  it('matchReader', () => {
    const f = _.matchReader(
      () => R.of('left'),
      () => R.of('right')
    )
    U.deepStrictEqual(f(_.of(1))({}), 'right')
    U.deepStrictEqual(f(_.fail('a'))({}), 'left')
  })

  it('getOrElse', () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(f(_.of(1))({}), 1)
    U.deepStrictEqual(f(_.fail('a'))({}), 2)
  })

  it('getOrElseReader', () => {
    const f = _.getOrElseReader(R.of(2))
    U.deepStrictEqual(f(_.of(1))({}), 1)
    U.deepStrictEqual(f(_.fail('a'))({}), 2)
  })

  it('catchAll', () => {
    const catchAll = _.catchAll((s: string) => (s.length > 2 ? _.of(1) : _.fail(2)))
    U.deepStrictEqual(catchAll(_.of(1))({}), E.of(1))
  })

  it('ask', () => {
    U.deepStrictEqual(_.ask()({}), E.of({}))
  })

  it('asks', () => {
    U.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.of(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)
    const tuple =
      <A>(a: A) =>
      <B>(b: B): readonly [A, B] =>
        [a, b]
    U.deepStrictEqual(pipe(_.fail('a'), A.map(tuple), A.ap(_.fail('b')))(null), E.fail('ab'))
  })

  it('getSemigroupKReaderValidation', () => {
    const A = _.getValidatedAlt(S.Monoid)
    U.deepStrictEqual(pipe(_.fail('a'), A.orElse(_.fail('b')))(null), E.fail('ab'))
  })

  it('flatMapResult', () => {
    const f = (s: string) => (s.length === 1 ? E.of(s.length) : E.fail('b'))
    U.deepStrictEqual(pipe(_.of('a'), _.flatMapResult(f))({}), E.of(1))
    U.deepStrictEqual(pipe(_.of('aa'), _.flatMapResult(f))({}), E.fail('b'))
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b'))
      )(undefined),
      E.of({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b')))(undefined), E.of({ a: 1, b: 'b' }))
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b')))({}), E.of([1, 'b'] as const))
  })

  it('getCompactable', () => {
    const C = _.getCompactable(() => S.Monoid.empty)
    U.deepStrictEqual(C.compact(_.of(O.some('a')))({}), E.of('a'))
  })

  it('partitionMap', async () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? E.of(n + 1) : E.fail(n - 1))

    const assertPartition = <E, B, C>(
      [feb, fec]: readonly [_.ReaderResult<null, E, B>, _.ReaderResult<null, E, C>],
      [eb, ec]: readonly [E.Result<E, B>, E.Result<E, C>]
    ) => {
      U.deepStrictEqual(feb(null), eb)
      U.deepStrictEqual(fec(null), ec)
    }

    assertPartition(pipe(_.fail('123'), _.partitionMap(f, S.Monoid.empty)), [E.fail('123'), E.fail('123')])
    assertPartition(pipe(_.of(1), _.partitionMap(f, S.Monoid.empty)), [E.of(0), E.fail(S.Monoid.empty)])
    assertPartition(pipe(_.of(3), _.partitionMap(f, S.Monoid.empty)), [E.fail(S.Monoid.empty), E.of(4)])
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid.empty)

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.fail('123'), F.filterMap(f))(null), E.fail('123'))
      U.deepStrictEqual(pipe(_.of(1), F.filterMap(f))(null), E.fail(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.of(3), F.filterMap(f))(null), E.of(4))
    })
  })

  it('liftReader', () => {
    const ma = _.liftReader(
      (n: number): R.Reader<number, number> =>
        (c) =>
          n * c
    )
    U.deepStrictEqual(ma(3)(2), E.of(6))
  })

  it('flatMapReader', () => {
    const f = _.flatMapReader((): R.Reader<unknown, number> => () => 2)
    U.deepStrictEqual(pipe(_.of(3), f)({}), E.of(2))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.of(a) : _.fail('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.of(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.fail('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.of(a + i) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(null), E.of(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.of(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.fail('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], _.sequenceReadonlyArray)(null), E.of(['a', 'b']))
    U.deepStrictEqual(pipe([_.of('a'), _.fail('e')], _.sequenceReadonlyArray)(null), E.fail('e'))
  })
})
