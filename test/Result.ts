import * as _ from '../src/Result'
import { flow, identity, pipe } from '../src/Function'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Async'
import * as U from './util'

describe('Result', () => {
  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        _.of('bar'),
        _.reduce('foo', (b, a) => b + a)
      ),
      'foobar'
    )
    U.deepStrictEqual(
      pipe(
        _.fail('bar'),
        _.reduce('foo', (b, a) => b + a)
      ),
      'foo'
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(_.of('a'), _.foldMap(S.Monoid)(identity)), 'a')
    U.deepStrictEqual(pipe(_.fail(1), _.foldMap(S.Monoid)(identity)), '')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(_.of('a'), _.reduceRight('', f)), 'a')
    U.deepStrictEqual(pipe(_.fail(1), _.reduceRight('', f)), '')
  })

  // -------------------------------------------------------------------------------------
  // conversions
  // -------------------------------------------------------------------------------------

  it('toOption', () => {
    U.deepStrictEqual(pipe(_.of(1), _.toOption), O.some(1))
    U.deepStrictEqual(pipe(_.fail('a'), _.toOption), O.none)
  })

  it('toNull', () => {
    U.deepStrictEqual(pipe(_.of(1), _.toNull), 1)
    U.deepStrictEqual(pipe(_.fail('a'), _.toNull), null)
  })

  it('toUndefined', () => {
    U.deepStrictEqual(pipe(_.of(1), _.toUndefined), 1)
    U.deepStrictEqual(pipe(_.fail('a'), _.toUndefined), undefined)
  })

  // -------------------------------------------------------------------------------------
  // filtering
  // -------------------------------------------------------------------------------------

  it('compact', () => {
    U.deepStrictEqual(
      pipe(
        _.of(O.some(1)),
        _.compact(() => 'e2')
      ),
      _.of(1)
    )
    U.deepStrictEqual(pipe(_.of(O.none), _.compact('e2')), _.fail('e2'))
    U.deepStrictEqual(pipe(_.fail('e1'), _.compact('e2')), _.fail('e1'))
  })

  it('separate', () => {
    U.deepStrictEqual(pipe(_.of(_.of(1)), _.separate('e2')), [_.fail('e2'), _.of(1)])
    U.deepStrictEqual(pipe(_.of(_.fail('e1')), _.separate('e2')), [_.of('e1'), _.fail('e2')])
    U.deepStrictEqual(pipe(_.fail('e1'), _.separate('e2')), [_.fail('e1'), _.fail('e1')])
  })

  it('tapError', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.tapError(() => _.of(2))
      ),
      _.of(1)
    )
    U.deepStrictEqual(
      pipe(
        _.fail('a'),
        _.tapError(() => _.of(2))
      ),
      _.fail('a')
    )
    U.deepStrictEqual(
      pipe(
        _.fail('a'),
        _.tapError(() => _.fail('b'))
      ),
      _.fail('b')
    )
  })

  it('zipLeft', () => {
    U.deepStrictEqual(pipe(_.of(1), _.zipLeft(_.of('a'))), _.of(1))
    U.deepStrictEqual(pipe(_.of(1), _.zipLeft(_.fail(true))), _.fail(true))
    U.deepStrictEqual(pipe(_.fail(1), _.zipLeft(_.of('a'))), _.fail(1))
    U.deepStrictEqual(pipe(_.fail(1), _.zipLeft(_.fail(true))), _.fail(1))
  })

  it('zipRight', () => {
    U.deepStrictEqual(pipe(_.of(1), _.zipRight(_.of('a'))), _.of('a'))
    U.deepStrictEqual(pipe(_.of(1), _.zipRight(_.fail(true))), _.fail(true))
    U.deepStrictEqual(pipe(_.fail(1), _.zipRight(_.of('a'))), _.fail(1))
    U.deepStrictEqual(pipe(_.fail(1), _.zipRight(_.fail(true))), _.fail(1))
  })

  describe('pipeables', () => {
    it('orElse', () => {
      const assertAlt = (
        a: _.Result<string, number>,
        b: _.Result<string, number>,
        expected: _.Result<string, number>
      ) => {
        U.deepStrictEqual(pipe(a, _.orElse(b)), expected)
      }
      assertAlt(_.of(1), _.of(2), _.of(1))
      assertAlt(_.of(1), _.fail('b'), _.of(1))
      assertAlt(_.fail('a'), _.of(2), _.of(2))
      assertAlt(_.fail('a'), _.fail('b'), _.fail('b'))
    })

    it('map', () => {
      const f = _.map(S.size)
      U.deepStrictEqual(pipe(_.of('abc'), f), _.of(3))
      U.deepStrictEqual(pipe(_.fail('s'), f), _.fail('s'))
    })

    it('ap', () => {
      const assertAp = (
        a: _.Result<string, number>,
        b: _.Result<string, number>,
        expected: _.Result<string, number>
      ) => {
        U.deepStrictEqual(
          pipe(
            a,
            _.map((a) => (b: number) => a + b),
            _.ap(b)
          ),
          expected
        )
      }
      assertAp(_.of(1), _.of(2), _.of(3))
      assertAp(_.of(1), _.fail('b'), _.fail('b'))
      assertAp(_.fail('a'), _.of(2), _.fail('a'))
      assertAp(_.fail('a'), _.fail('b'), _.fail('a'))
    })

    it('flatMap', () => {
      const f = _.flatMap<string, string, number>(flow(S.size, _.of))
      U.deepStrictEqual(pipe(_.of('abc'), f), _.of(3))
      U.deepStrictEqual(pipe(_.fail('maError'), f), _.fail('maError'))
    })

    it('tap', () => {
      const f = _.tap(flow(S.size, _.of))
      U.deepStrictEqual(pipe(_.of('abc'), f), _.of('abc'))
      U.deepStrictEqual(pipe(_.fail('maError'), f), _.fail('maError'))
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe(_.of('a'), _.duplicate), _.of(_.of('a')))
    })

    it('extend', () => {
      U.deepStrictEqual(
        pipe(
          _.of(1),
          _.extend(() => 2)
        ),
        _.of(2)
      )
      U.deepStrictEqual(
        pipe(
          _.fail('err'),
          _.extend(() => 2)
        ),
        _.fail('err')
      )
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.of(_.of('a')), _.flatten), _.of('a'))
    })

    it('mapBoth', () => {
      const f = _.mapBoth(S.size, gt(N.Ord)(2))
      U.deepStrictEqual(pipe(_.of(1), f), _.of(false))
    })

    it('mapError', () => {
      const f = _.mapError(U.double)
      U.deepStrictEqual(pipe(_.of('a'), f), _.of('a'))
      U.deepStrictEqual(pipe(_.fail(1), f), _.fail(2))
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))
      U.deepStrictEqual(pipe(_.fail('a'), traverse), O.some(_.fail('a')))
      U.deepStrictEqual(pipe(_.of(1), traverse), O.none)
      U.deepStrictEqual(pipe(_.of(3), traverse), O.some(_.of(3)))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence(_.of(O.some(1))), O.some(_.of(1)))
      U.deepStrictEqual(sequence(_.fail('a')), O.some(_.fail('a')))
      U.deepStrictEqual(sequence(_.of(O.none)), O.none)
    })
  })

  it('match', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = _.match(f, g)
    U.deepStrictEqual(match(_.fail('abc')), 'left3')
    U.deepStrictEqual(match(_.of('abc')), 'right3')
  })

  it('getOrElse', () => {
    U.deepStrictEqual(pipe(_.of(12), _.getOrElse(17)), 12)
    U.deepStrictEqual(pipe(_.fail('a'), _.getOrElse(17)), 17)
  })

  it('elem', () => {
    U.deepStrictEqual(pipe(_.fail('a'), _.elem(N.Eq)(2)), false)
    U.deepStrictEqual(pipe(_.of(2), _.elem(N.Eq)(2)), true)
    U.deepStrictEqual(pipe(_.of(2), _.elem(N.Eq)(1)), false)
  })

  it('filter', () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(pipe(_.of(12), _.filter(predicate, -1)), _.of(12))
    U.deepStrictEqual(pipe(_.of(7), _.filter(predicate, -1)), _.fail(-1))
    U.deepStrictEqual(pipe(_.fail(12), _.filter(predicate, -1)), _.fail(12))
  })

  it('isLeft', () => {
    U.deepStrictEqual(_.isFailure(_.of(1)), false)
    U.deepStrictEqual(_.isFailure(_.fail(1)), true)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isSuccess(_.of(1)), true)
    U.deepStrictEqual(_.isSuccess(_.fail(1)), false)
  })

  it('catchAll', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.catchAll(() => _.of(2))
      ),
      _.of(1)
    )
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.catchAll(() => _.fail('foo'))
      ),
      _.of(1)
    )
    U.deepStrictEqual(
      pipe(
        _.fail('a'),
        _.catchAll(() => _.of(1))
      ),
      _.of(1)
    )
    U.deepStrictEqual(
      pipe(
        _.fail('a'),
        _.catchAll(() => _.fail('b'))
      ),
      _.fail('b')
    )
  })

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.of('a')), _.fail('a'))
    U.deepStrictEqual(_.swap(_.fail('b')), _.of('b'))
  })

  it('fromPredicate', () => {
    const f = _.liftPredicate((n: number) => n >= 2, 'e')
    U.deepStrictEqual(f(3), _.of(3))
    U.deepStrictEqual(f(1), _.fail('e'))
  })

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable('default')(null), _.fail('default'))
    U.deepStrictEqual(_.fromNullable('default')(undefined), _.fail('default'))
    U.deepStrictEqual(_.fromNullable('default')(1), _.of(1))
  })

  it('tryCatch', () => {
    U.deepStrictEqual(
      _.fromThrowable(() => {
        return 1
      }, identity),
      _.of(1)
    )

    U.deepStrictEqual(
      _.fromThrowable(() => {
        // tslint:disable-next-line: no-string-throw
        throw 'string error'
      }, identity),
      _.fail('string error')
    )
  })

  describe('getEq', () => {
    it('equals', () => {
      const equals = _.getEq(S.Eq, N.Eq).equals
      U.deepStrictEqual(equals(_.of(1))(_.of(1)), true)
      U.deepStrictEqual(equals(_.of(1))(_.of(2)), false)
      U.deepStrictEqual(equals(_.of(1))(_.fail('foo')), false)
      U.deepStrictEqual(equals(_.fail('foo'))(_.fail('foo')), true)
      U.deepStrictEqual(equals(_.fail('foo'))(_.fail('bar')), false)
      U.deepStrictEqual(equals(_.fail('foo'))(_.of(1)), false)
    })
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid.empty)
    it('compact', () => {
      U.deepStrictEqual(C.compact(_.fail('1')), _.fail('1'))
      U.deepStrictEqual(C.compact(_.of(O.none)), _.fail(S.Monoid.empty))
      U.deepStrictEqual(C.compact(_.of(O.some(123))), _.of(123))
    })
  })

  it('partition', () => {
    const p = (n: number) => n > 2
    U.deepStrictEqual(pipe(_.fail('a'), _.partition(p, '')), [_.fail('a'), _.fail('a')])
    U.deepStrictEqual(pipe(_.of(1), _.partition(p, '')), [_.of(1), _.fail('')])
    U.deepStrictEqual(pipe(_.of(3), _.partition(p, '')), [_.fail(''), _.of(3)])
  })

  it('partitionMap', () => {
    const p = (n: number) => n > 2
    const f = (n: number) => (p(n) ? _.of(n + 1) : _.fail(n - 1))
    U.deepStrictEqual(pipe(_.fail('123'), _.partitionMap(f, S.Monoid.empty)), [_.fail('123'), _.fail('123')])
    U.deepStrictEqual(pipe(_.of(1), _.partitionMap(f, S.Monoid.empty)), [_.of(0), _.fail(S.Monoid.empty)])
    U.deepStrictEqual(pipe(_.of(3), _.partitionMap(f, S.Monoid.empty)), [_.fail(S.Monoid.empty), _.of(4)])
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid.empty)

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.fail('123'), F.filterMap(f)), _.fail('123'))
      U.deepStrictEqual(pipe(_.of(1), F.filterMap(f)), _.fail(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.of(3), F.filterMap(f)), _.of(4))
    })
  })

  describe('getFilterableKind', () => {
    const FilterableKind = _.getTraversableFilterable(S.Monoid.empty)
    const p = (n: number) => n > 2

    it('filterMapKind', async () => {
      const filterMapKind = FilterableKind.traverseFilterMap(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await pipe(_.fail('foo'), filterMapKind(f))(), _.fail('foo'))
      U.deepStrictEqual(await pipe(_.of(1), filterMapKind(f))(), _.fail(S.Monoid.empty))
      U.deepStrictEqual(await pipe(_.of(3), filterMapKind(f))(), _.of(4))
    })

    it('partitionMapKind', async () => {
      const partitionMapKind = FilterableKind.traversePartitionMap(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? _.of(n + 1) : _.fail(n - 1))
      U.deepStrictEqual(await pipe(_.fail('foo'), partitionMapKind(f))(), [_.fail('foo'), _.fail('foo')])
      U.deepStrictEqual(await pipe(_.of(1), partitionMapKind(f))(), [_.of(0), _.fail(S.Monoid.empty)])
      U.deepStrictEqual(await pipe(_.of(3), partitionMapKind(f))(), [_.fail(S.Monoid.empty), _.of(4)])
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(N.SemigroupSum)
    U.deepStrictEqual(pipe(_.fail('a'), S.combine(_.fail('b'))), _.fail('a'))
    U.deepStrictEqual(pipe(_.fail('a'), S.combine(_.of(2))), _.of(2))
    U.deepStrictEqual(pipe(_.of(1), S.combine(_.fail('b'))), _.of(1))
    U.deepStrictEqual(pipe(_.of(1), S.combine(_.of(2))), _.of(3))
  })

  describe('getShow', () => {
    it('show', () => {
      const Sh = _.getShow(S.Show, S.Show)
      U.deepStrictEqual(Sh.show(_.fail('a')), `fail("a")`)
      U.deepStrictEqual(Sh.show(_.of('a')), `of("a")`)
    })
  })

  it('getApplicativeValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)

    const flatZipPar =
      <B>(fb: _.Result<string, B>) =>
      <A extends ReadonlyArray<unknown>>(fas: _.Result<string, A>): _.Result<string, readonly [...A, B]> =>
        pipe(
          fas,
          _.map((a) => (b: B): readonly [...A, B] => [...a, b]),
          A.ap(fb)
        )

    U.deepStrictEqual(pipe(_.fail('a'), flatZipPar(_.fail('b'))), _.fail('ab'))
    U.deepStrictEqual(pipe(_.of([1]), flatZipPar(_.fail('b'))), _.fail('b'))
    U.deepStrictEqual(pipe(_.of([1]), flatZipPar(_.of(2))), _.of([1, 2] as const))
  })

  it('getSemigroupKValidation', () => {
    const A = _.getValidatedAlt(S.Monoid)
    U.deepStrictEqual(pipe(_.fail('a'), A.orElse(_.fail('b'))), _.fail('ab'))
    U.deepStrictEqual(pipe(_.of(1), A.orElse(_.fail('b'))), _.of(1))
    U.deepStrictEqual(pipe(_.fail('a'), A.orElse(_.of(2))), _.of(2))
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption('none')(O.none), _.fail('none'))
    U.deepStrictEqual(_.fromOption('none')(O.some(1)), _.of(1))
  })

  it('liftOption', () => {
    const f = _.liftOption((n: number) => (n > 0 ? O.some(n) : O.none), 'a')
    U.deepStrictEqual(f(1), _.of(1))
    U.deepStrictEqual(f(-1), _.fail('a'))
  })

  it('flatMapOption', () => {
    const f = _.flatMapOption((n: number) => (n > 0 ? O.some(n) : O.none), 'a')
    U.deepStrictEqual(f(_.of(1)), _.of(1))
    U.deepStrictEqual(f(_.of(-1)), _.fail('a'))
    U.deepStrictEqual(f(_.fail('b')), _.fail('b'))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.fail('a')), false)
    U.deepStrictEqual(gt2(_.of(1)), false)
    U.deepStrictEqual(gt2(_.of(3)), true)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.of(1),
        _.bindTo('a'),
        _.bind('b', () => _.of('b')),
        _.let('c', ({ a, b }) => [a, b])
      ),
      _.of({ a: 1, b: 'b', c: [1, 'b'] })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.of(1), _.bindTo('a'), _.bindRight('b', _.of('b'))), _.of({ a: 1, b: 'b' }))
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.of(1), _.tupled, _.zipFlatten(_.of('b'))), _.of([1, 'b'] as const))
  })

  it('liftNullable', () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null), 'error')
    U.deepStrictEqual(f(1), _.of(1))
    U.deepStrictEqual(f(-1), _.fail('error'))
  })

  it('flatMapNullable', () => {
    const f = _.flatMapNullable((n: number) => (n > 0 ? n : null), 'error')
    U.deepStrictEqual(f(_.of(1)), _.of(1))
    U.deepStrictEqual(f(_.of(-1)), _.fail('error'))
    U.deepStrictEqual(f(_.fail('a')), _.fail('a'))
  })

  it('toUnion', () => {
    U.deepStrictEqual(_.toUnion(_.of(1)), 1)
    U.deepStrictEqual(_.toUnion(_.fail('a')), 'a')
  })

  it('liftThrowable', () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error('empty string')
    }, identity)
    U.deepStrictEqual(f('a'), _.of(1))
    U.deepStrictEqual(f(''), _.fail(new Error('empty string')))
  })

  it('flatMapRec', () => {
    const flatMapRec = _.flatMapRec
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec(() => _.fail('a'))
      ),
      _.fail('a')
    )
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec((_a: number) => _.of(_.of(1)))
      ),
      _.of(1)
    )
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec((a) => {
          if (a < 5) {
            return _.of(_.fail(a + 1))
          } else {
            return _.of(_.of(a))
          }
        })
      ),
      _.of(5)
    )
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.of(a) : _.fail('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.of(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f), _.fail('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.of(a + i) : _.fail('e')))
    U.deepStrictEqual(pipe(RA.empty, f), _.of(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.of(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f), _.fail('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.of('a'), _.of('b')], _.sequenceReadonlyArray), _.of(['a', 'b']))
    U.deepStrictEqual(pipe([_.of('a'), _.fail('e')], _.sequenceReadonlyArray), _.fail('e'))
  })
})
