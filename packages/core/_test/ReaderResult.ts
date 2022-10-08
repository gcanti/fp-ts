import { flow, pipe } from '@fp-ts/core/Function'
import * as O from '@fp-ts/core/Option'
import * as R from '@fp-ts/core/Reader'
import * as _ from '@fp-ts/core/ReaderResult'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as E from '@fp-ts/core/Result'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'

describe('ReaderResult', () => {
  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.succeed(1), _.map(U.double))({}), E.succeed(2))
    })

    it('orElse', () => {
      const assertAlt = (
        a: _.ReaderResult<null, string, number>,
        b: _.ReaderResult<null, string, number>,
        expected: E.Result<string, number>
      ) => {
        U.deepStrictEqual(pipe(a, _.orElse(b))(null), expected)
      }
      assertAlt(_.succeed(1), _.succeed(2), E.succeed(1))
      assertAlt(_.succeed(1), _.fail('b'), E.succeed(1))
      assertAlt(_.fail('a'), _.succeed(2), E.succeed(2))
      assertAlt(_.fail('a'), _.fail('b'), E.fail('b'))
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.succeed(U.double), _.ap(_.succeed(1)))({}), E.succeed(2))
    })

    it('tap', () => {
      const f = flow(U.double, _.succeed)
      U.deepStrictEqual(pipe(_.succeed(1), _.tap(f))({}), E.succeed(1))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.succeed(_.succeed('a')), _.flatten)({}), E.succeed('a'))
    })

    it('mapBoth', () => {
      const f = _.mapBoth(S.size, U.double)
      U.deepStrictEqual(pipe(_.succeed(1), f)({}), E.succeed(2))
      U.deepStrictEqual(pipe(_.fail('aaa'), f)({}), E.fail(3))
    })

    it('mapError', () => {
      const f = _.mapError(S.size)
      U.deepStrictEqual(pipe(_.succeed(1), f)({}), E.succeed(1))
      U.deepStrictEqual(pipe(_.fail('aa'), f)({}), E.fail(2))
    })

    it('fromOption', () => {
      U.deepStrictEqual(pipe(O.none, _.fromOption('none'))({}), E.fail('none'))
      U.deepStrictEqual(
        pipe(
          O.some(1),
          _.fromOption(() => 'none')
        )({}),
        E.succeed(1)
      )
    })

    it('fromPredicate', () => {
      const f = _.liftPredicate((n: number) => n >= 2, 'e')
      U.deepStrictEqual(f(3)({}), E.succeed(3))
      U.deepStrictEqual(f(1)({}), E.fail('e'))
    })

    it('filter', () => {
      const predicate = (n: number) => n > 10
      U.deepStrictEqual(pipe(_.succeed(12), _.filter(predicate, -1))({}), E.succeed(12))
      U.deepStrictEqual(pipe(_.succeed(7), _.filter(predicate, -1))({}), E.fail(-1))
      U.deepStrictEqual(pipe(_.fail(12), _.filter(predicate, -1))({}), E.fail(12))
    })
  })

  it('match', () => {
    const f = _.match(
      () => 'left',
      () => 'right'
    )
    U.deepStrictEqual(f(_.succeed(1))({}), 'right')
    U.deepStrictEqual(f(_.fail('a'))({}), 'left')
  })

  it('matchReader', () => {
    const f = _.matchReader(
      () => R.of('left'),
      () => R.of('right')
    )
    U.deepStrictEqual(f(_.succeed(1))({}), 'right')
    U.deepStrictEqual(f(_.fail('a'))({}), 'left')
  })

  it('getOrElse', () => {
    const f = _.getOrElse(2)
    U.deepStrictEqual(f(_.succeed(1))({}), 1)
    U.deepStrictEqual(f(_.fail('a'))({}), 2)
  })

  it('getOrElseReader', () => {
    const f = _.getOrElseReader(R.of(2))
    U.deepStrictEqual(f(_.succeed(1))({}), 1)
    U.deepStrictEqual(f(_.fail('a'))({}), 2)
  })

  it('catchAll', () => {
    const catchAll = _.catchAll((s: string) => (s.length > 2 ? _.succeed(1) : _.fail(2)))
    U.deepStrictEqual(catchAll(_.succeed(1))({}), E.succeed(1))
  })

  it('ask', () => {
    U.deepStrictEqual(_.ask()({}), E.succeed({}))
  })

  it('asks', () => {
    U.deepStrictEqual(_.asks((r: { readonly a: number }) => r.a)({ a: 1 }), E.succeed(1))
  })

  it('getApplicativeReaderValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)
    const tuple = <A>(a: A) => <B>(b: B): readonly [A, B] => [a, b]
    U.deepStrictEqual(pipe(_.fail('a'), A.map(tuple), A.ap(_.fail('b')))(null), E.fail('ab'))
  })

  it('getSemigroupKReaderValidation', () => {
    const A = _.getValidatedAlt(S.Monoid)
    U.deepStrictEqual(pipe(_.fail('a'), A.orElse(_.fail('b')))(null), E.fail('ab'))
  })

  it('flatMapResult', () => {
    const f = (s: string) => (s.length === 1 ? E.succeed(s.length) : E.fail('b'))
    U.deepStrictEqual(pipe(_.succeed('a'), _.flatMapResult(f))({}), E.succeed(1))
    U.deepStrictEqual(pipe(_.succeed('aa'), _.flatMapResult(f))({}), E.fail('b'))
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.succeed(1),
        _.bindTo('a'),
        _.bind('b', () => _.succeed('b'))
      )(undefined),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(
      pipe(_.succeed(1), _.bindTo('a'), _.bindRight('b', _.succeed('b')))(undefined),
      E.succeed({ a: 1, b: 'b' })
    )
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.succeed(1), _.tupled, _.zipFlatten(_.succeed('b')))({}), E.succeed([1, 'b'] as const))
  })

  it('getCompactable', () => {
    const C = _.getCompactable(() => S.Monoid.empty)
    U.deepStrictEqual(C.compact(_.succeed(O.some('a')))({}), E.succeed('a'))
  })

  it('partitionMap', async () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? E.succeed(n + 1) : E.fail(n - 1))

    const assertPartition = <E, B, C>(
      [feb, fec]: readonly [_.ReaderResult<null, E, B>, _.ReaderResult<null, E, C>],
      [eb, ec]: readonly [E.Result<E, B>, E.Result<E, C>]
    ) => {
      U.deepStrictEqual(feb(null), eb)
      U.deepStrictEqual(fec(null), ec)
    }

    assertPartition(pipe(_.fail('123'), _.partitionMap(f, S.Monoid.empty)), [E.fail('123'), E.fail('123')])
    assertPartition(pipe(_.succeed(1), _.partitionMap(f, S.Monoid.empty)), [E.succeed(0), E.fail(S.Monoid.empty)])
    assertPartition(pipe(_.succeed(3), _.partitionMap(f, S.Monoid.empty)), [E.fail(S.Monoid.empty), E.succeed(4)])
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid.empty)

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.fail('123'), F.filterMap(f))(null), E.fail('123'))
      U.deepStrictEqual(pipe(_.succeed(1), F.filterMap(f))(null), E.fail(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.succeed(3), F.filterMap(f))(null), E.succeed(4))
    })
  })

  it('liftReader', () => {
    const ma = _.liftReader(
      (n: number): R.Reader<number, number> => (c) => n * c
    )
    U.deepStrictEqual(ma(3)(2), E.succeed(6))
  })

  it('flatMapReader', () => {
    const f = _.flatMapReader((): R.Reader<unknown, number> => () => 2)
    U.deepStrictEqual(pipe(_.succeed(3), f)({}), E.succeed(2))
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.succeed(a) : _.fail('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.succeed(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.fail('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.succeed(a + i) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f)(null), E.succeed(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f)(null), E.succeed(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f)(null), E.fail('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.succeed('a'), _.succeed('b')], _.sequenceReadonlyArray)(null), E.succeed(['a', 'b']))
    U.deepStrictEqual(pipe([_.succeed('a'), _.fail('e')], _.sequenceReadonlyArray)(null), E.fail('e'))
  })
})
