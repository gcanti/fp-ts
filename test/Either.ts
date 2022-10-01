import * as _ from '../src/Either'
import { flow, identity, pipe } from '../src/f'
import * as N from '../src/number'
import * as O from '../src/Option'
import { gt } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

describe('Either', () => {
  // -------------------------------------------------------------------------------------
  // conversions
  // -------------------------------------------------------------------------------------

  it('toOption', () => {
    U.deepStrictEqual(pipe(_.right(1), _.toOption), O.some(1))
    U.deepStrictEqual(pipe(_.left('a'), _.toOption), O.none)
  })

  it('toNull', () => {
    U.deepStrictEqual(pipe(_.right(1), _.toNull), 1)
    U.deepStrictEqual(pipe(_.left('a'), _.toNull), null)
  })

  it('toUndefined', () => {
    U.deepStrictEqual(pipe(_.right(1), _.toUndefined), 1)
    U.deepStrictEqual(pipe(_.left('a'), _.toUndefined), undefined)
  })

  // -------------------------------------------------------------------------------------
  // filtering
  // -------------------------------------------------------------------------------------

  it('compact', () => {
    U.deepStrictEqual(
      pipe(
        _.right(O.some(1)),
        _.compact(() => 'e2')
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.right(O.none),
        _.compact(() => 'e2')
      ),
      _.left('e2')
    )
    U.deepStrictEqual(
      pipe(
        _.left('e1'),
        _.compact(() => 'e2')
      ),
      _.left('e1')
    )
  })

  it('separate', () => {
    U.deepStrictEqual(
      pipe(
        _.right(_.right(1)),
        _.separate(() => 'e2')
      ),
      [_.left('e2'), _.right(1)]
    )
    U.deepStrictEqual(
      pipe(
        _.right(_.left('e1')),
        _.separate(() => 'e2')
      ),
      [_.right('e1'), _.left('e2')]
    )
    U.deepStrictEqual(
      pipe(
        _.left('e1'),
        _.separate(() => 'e2')
      ),
      [_.left('e1'), _.left('e1')]
    )
  })

  it('tapError', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.tapError(() => _.right(2))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.tapError(() => _.right(2))
      ),
      _.left('a')
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.tapError(() => _.left('b'))
      ),
      _.left('b')
    )
  })

  it('zipLeft', () => {
    U.deepStrictEqual(pipe(_.right(1), _.zipLeft(_.right('a'))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), _.zipLeft(_.left(true))), _.left(true))
    U.deepStrictEqual(pipe(_.left(1), _.zipLeft(_.right('a'))), _.left(1))
    U.deepStrictEqual(pipe(_.left(1), _.zipLeft(_.left(true))), _.left(1))
  })

  it('zipRight', () => {
    U.deepStrictEqual(pipe(_.right(1), _.zipRight(_.right('a'))), _.right('a'))
    U.deepStrictEqual(pipe(_.right(1), _.zipRight(_.left(true))), _.left(true))
    U.deepStrictEqual(pipe(_.left(1), _.zipRight(_.right('a'))), _.left(1))
    U.deepStrictEqual(pipe(_.left(1), _.zipRight(_.left(true))), _.left(1))
  })

  describe('pipeables', () => {
    it('orElse', () => {
      const assertSemigroupKind = (
        a: _.Either<string, number>,
        b: _.Either<string, number>,
        expected: _.Either<string, number>
      ) => {
        U.deepStrictEqual(pipe(a, _.orElse(b)), expected)
      }
      assertSemigroupKind(_.right(1), _.right(2), _.right(1))
      assertSemigroupKind(_.right(1), _.left('b'), _.right(1))
      assertSemigroupKind(_.left('a'), _.right(2), _.right(2))
      assertSemigroupKind(_.left('a'), _.left('b'), _.left('b'))
    })

    it('map', () => {
      const f = _.map(S.size)
      U.deepStrictEqual(pipe(_.right('abc'), f), _.right(3))
      U.deepStrictEqual(pipe(_.left('s'), f), _.left('s'))
    })

    it('ap', () => {
      const assertAp = (
        a: _.Either<string, number>,
        b: _.Either<string, number>,
        expected: _.Either<string, number>
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
      assertAp(_.right(1), _.right(2), _.right(3))
      assertAp(_.right(1), _.left('b'), _.left('b'))
      assertAp(_.left('a'), _.right(2), _.left('a'))
      assertAp(_.left('a'), _.left('b'), _.left('a'))
    })

    it('flatMap', () => {
      const f = _.flatMap<string, string, number>(flow(S.size, _.of))
      U.deepStrictEqual(pipe(_.right('abc'), f), _.right(3))
      U.deepStrictEqual(pipe(_.left('maError'), f), _.left('maError'))
    })

    it('tap', () => {
      const f = _.tap<string, string, number>(flow(S.size, _.of))
      U.deepStrictEqual(pipe(_.right('abc'), f), _.right('abc'))
      U.deepStrictEqual(pipe(_.left('maError'), f), _.left('maError'))
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe(_.right('a'), _.duplicate), _.right(_.right('a')))
    })

    it('extend', () => {
      U.deepStrictEqual(
        pipe(
          _.right(1),
          _.extend(() => 2)
        ),
        _.right(2)
      )
      U.deepStrictEqual(
        pipe(
          _.left('err'),
          _.extend(() => 2)
        ),
        _.left('err')
      )
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.right(_.right('a')), _.flatten), _.right('a'))
    })

    it('mapBoth', () => {
      const f = _.mapBoth(S.size, gt(N.Ord)(2))
      U.deepStrictEqual(pipe(_.right(1), f), _.right(false))
    })

    it('mapError', () => {
      const f = _.mapError(U.double)
      U.deepStrictEqual(pipe(_.right('a'), f), _.right('a'))
      U.deepStrictEqual(pipe(_.left(1), f), _.left(2))
    })

    it('foldMap', () => {
      const f = _.foldMap(S.Monoid)((s: string) => s)
      U.deepStrictEqual(pipe(_.right('a'), f), 'a')
      U.deepStrictEqual(pipe(_.left(1), f), '')
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          _.right('bar'),
          _.reduce('foo', (b, a) => b + a)
        ),
        'foobar'
      )
      U.deepStrictEqual(
        pipe(
          _.left('bar'),
          _.reduce('foo', (b, a) => b + a)
        ),
        'foo'
      )
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe(_.right('a'), _.reduceRight('', f)), 'a')
      U.deepStrictEqual(pipe(_.left(1), _.reduceRight('', f)), '')
    })

    it('traverse', () => {
      const traverse = _.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))
      U.deepStrictEqual(pipe(_.left('a'), traverse), O.some(_.left('a')))
      U.deepStrictEqual(pipe(_.right(1), traverse), O.none)
      U.deepStrictEqual(pipe(_.right(3), traverse), O.some(_.right(3)))
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence(_.right(O.some(1))), O.some(_.right(1)))
      U.deepStrictEqual(sequence(_.left('a')), O.some(_.left('a')))
      U.deepStrictEqual(sequence(_.right(O.none)), O.none)
    })
  })

  it('match', () => {
    const f = (s: string) => `left${s.length}`
    const g = (s: string) => `right${s.length}`
    const match = _.match(f, g)
    U.deepStrictEqual(match(_.left('abc')), 'left3')
    U.deepStrictEqual(match(_.right('abc')), 'right3')
  })

  it('getOrElse', () => {
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.getOrElse(() => 17)
      ),
      12
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse(() => 17)
      ),
      17
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.getOrElse((l: string) => l.length + 1)
      ),
      2
    )
  })

  it('elem', () => {
    U.deepStrictEqual(pipe(_.left('a'), _.elem(N.Eq)(2)), false)
    U.deepStrictEqual(pipe(_.right(2), _.elem(N.Eq)(2)), true)
    U.deepStrictEqual(pipe(_.right(2), _.elem(N.Eq)(1)), false)
  })

  it('filter', () => {
    const predicate = (n: number) => n > 10
    U.deepStrictEqual(
      pipe(
        _.right(12),
        _.filter(predicate, () => -1)
      ),
      _.right(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filter(predicate, () => -1)
      ),
      _.left(-1)
    )
    U.deepStrictEqual(
      pipe(
        _.left(12),
        _.filter(predicate, () => -1)
      ),
      _.left(12)
    )
    U.deepStrictEqual(
      pipe(
        _.right(7),
        _.filter(predicate, (n) => `invalid ${n}`)
      ),
      _.left('invalid 7')
    )
  })

  it('isLeft', () => {
    U.deepStrictEqual(_.isLeft(_.right(1)), false)
    U.deepStrictEqual(_.isLeft(_.left(1)), true)
  })

  it('isRight', () => {
    U.deepStrictEqual(_.isRight(_.right(1)), true)
    U.deepStrictEqual(_.isRight(_.left(1)), false)
  })

  it('catchAll', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.catchAll(() => _.right(2))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.catchAll(() => _.left('foo'))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.catchAll(() => _.right(1))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.catchAll(() => _.left('b'))
      ),
      _.left('b')
    )
  })

  it('swap', () => {
    U.deepStrictEqual(_.swap(_.right('a')), _.left('a'))
    U.deepStrictEqual(_.swap(_.left('b')), _.right('b'))
  })

  it('fromPredicate', () => {
    const f = _.liftPredicate(
      (n: number) => n >= 2,
      (a) => a
    )
    U.deepStrictEqual(f(3), _.right(3))
    U.deepStrictEqual(f(1), _.left(1))
  })

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable(() => 'default')(null), _.left('default'))
    U.deepStrictEqual(_.fromNullable(() => 'default')(undefined), _.left('default'))
    U.deepStrictEqual(_.fromNullable(() => 'default')(1), _.right(1))
  })

  it('tryCatch', () => {
    U.deepStrictEqual(
      _.fromThrowable(() => {
        return 1
      }, identity),
      _.right(1)
    )

    U.deepStrictEqual(
      _.fromThrowable(() => {
        // tslint:disable-next-line: no-string-throw
        throw 'string error'
      }, identity),
      _.left('string error')
    )
  })

  describe('getEq', () => {
    it('equals', () => {
      const equals = _.getEq(S.Eq, N.Eq).equals
      U.deepStrictEqual(equals(_.right(1))(_.right(1)), true)
      U.deepStrictEqual(equals(_.right(1))(_.right(2)), false)
      U.deepStrictEqual(equals(_.right(1))(_.left('foo')), false)
      U.deepStrictEqual(equals(_.left('foo'))(_.left('foo')), true)
      U.deepStrictEqual(equals(_.left('foo'))(_.left('bar')), false)
      U.deepStrictEqual(equals(_.left('foo'))(_.right(1)), false)
    })
  })

  describe('getCompactable', () => {
    const C = _.getCompactable(S.Monoid)
    it('compact', () => {
      U.deepStrictEqual(C.compact(_.left('1')), _.left('1'))
      U.deepStrictEqual(C.compact(_.right(O.none)), _.left(S.Monoid.empty))
      U.deepStrictEqual(C.compact(_.right(O.some(123))), _.right(123))
    })

    it('separate', () => {
      U.deepStrictEqual(C.separate(_.left('123')), [_.left('123'), _.left('123')])
      U.deepStrictEqual(C.separate(_.right(_.left('123'))), [_.right('123'), _.left(S.Monoid.empty)])
      U.deepStrictEqual(C.separate(_.right(_.right('123'))), [_.left(S.Monoid.empty), _.right('123')])
    })
  })

  it('partition', () => {
    const p = (n: number) => n > 2
    U.deepStrictEqual(
      pipe(
        _.left('a'),
        _.partition(p, () => '')
      ),
      [_.left('a'), _.left('a')]
    )
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.partition(p, () => '')
      ),
      [_.right(1), _.left('')]
    )
    U.deepStrictEqual(
      pipe(
        _.right(3),
        _.partition(p, () => '')
      ),
      [_.left(''), _.right(3)]
    )
  })

  describe('getFilterable', () => {
    const F = _.getFilterable(S.Monoid)

    it('partitionMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(pipe(_.left('123'), F.partitionMap(f)), [_.left('123'), _.left('123')])
      U.deepStrictEqual(pipe(_.right(1), F.partitionMap(f)), [_.right(0), _.left(S.Monoid.empty)])
      U.deepStrictEqual(pipe(_.right(3), F.partitionMap(f)), [_.left(S.Monoid.empty), _.right(4)])
    })

    it('filterMap', () => {
      const p = (n: number) => n > 2
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(_.left('123'), F.filterMap(f)), _.left('123'))
      U.deepStrictEqual(pipe(_.right(1), F.filterMap(f)), _.left(S.Monoid.empty))
      U.deepStrictEqual(pipe(_.right(3), F.filterMap(f)), _.right(4))
    })
  })

  describe('getFilterableKind', () => {
    const W = _.getFilterableKind(S.Monoid)
    const p = (n: number) => n > 2

    it('filterMapKind', async () => {
      const filterMapKind = W.filterMapKind(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await pipe(_.left('foo'), filterMapKind(f))(), _.left('foo'))
      U.deepStrictEqual(await pipe(_.right(1), filterMapKind(f))(), _.left(S.Monoid.empty))
      U.deepStrictEqual(await pipe(_.right(3), filterMapKind(f))(), _.right(4))
    })

    it('partitionMapKind', async () => {
      const partitionMapKind = W.partitionMapKind(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? _.right(n + 1) : _.left(n - 1))
      U.deepStrictEqual(await pipe(_.left('foo'), partitionMapKind(f))(), [_.left('foo'), _.left('foo')])
      U.deepStrictEqual(await pipe(_.right(1), partitionMapKind(f))(), [_.right(0), _.left(S.Monoid.empty)])
      U.deepStrictEqual(await pipe(_.right(3), partitionMapKind(f))(), [_.left(S.Monoid.empty), _.right(4)])
    })
  })

  it('getSemigroup', () => {
    const S = _.getSemigroup(N.SemigroupSum)
    U.deepStrictEqual(pipe(_.left('a'), S.combine(_.left('b'))), _.left('a'))
    U.deepStrictEqual(pipe(_.left('a'), S.combine(_.right(2))), _.right(2))
    U.deepStrictEqual(pipe(_.right(1), S.combine(_.left('b'))), _.right(1))
    U.deepStrictEqual(pipe(_.right(1), S.combine(_.right(2))), _.right(3))
  })

  describe('getShow', () => {
    it('show', () => {
      const Sh = _.getShow(S.Show, S.Show)
      U.deepStrictEqual(Sh.show(_.left('a')), `left("a")`)
      U.deepStrictEqual(Sh.show(_.right('a')), `right("a")`)
    })
  })

  it('getApplicativeValidation', () => {
    const A = _.getValidatedApplicative(S.Monoid)

    const flatZipPar =
      <B>(fb: _.Either<string, B>) =>
      <A extends ReadonlyArray<unknown>>(fas: _.Either<string, A>): _.Either<string, readonly [...A, B]> =>
        pipe(
          fas,
          _.map((a) => (b: B): readonly [...A, B] => [...a, b]),
          A.ap(fb)
        )

    U.deepStrictEqual(pipe(_.left('a'), flatZipPar(_.left('b'))), _.left('ab'))
    U.deepStrictEqual(pipe(_.right([1]), flatZipPar(_.left('b'))), _.left('b'))
    U.deepStrictEqual(pipe(_.right([1]), flatZipPar(_.right(2))), _.right([1, 2] as const))
  })

  it('getSemigroupKValidation', () => {
    const A = _.getValidatedSemigroupKind(S.Monoid)
    U.deepStrictEqual(pipe(_.left('a'), A.combineKind(_.left('b'))), _.left('ab'))
    U.deepStrictEqual(pipe(_.right(1), A.combineKind(_.left('b'))), _.right(1))
    U.deepStrictEqual(pipe(_.left('a'), A.combineKind(_.right(2))), _.right(2))
  })

  it('fromOption', () => {
    U.deepStrictEqual(_.fromOption(() => 'none')(O.none), _.left('none'))
    U.deepStrictEqual(_.fromOption(() => 'none')(O.some(1)), _.right(1))
  })

  it('liftOption', () => {
    const f = _.liftOption(
      (n: number) => (n > 0 ? O.some(n) : O.none),
      () => 'a'
    )
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left('a'))
  })

  it('flatMapOption', () => {
    const f = _.flatMapOption(
      (n: number) => (n > 0 ? O.some(n) : O.none),
      () => 'a'
    )
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('a'))
    U.deepStrictEqual(f(_.left('b')), _.left('b'))
  })

  it('exists', () => {
    const gt2 = _.exists((n: number) => n > 2)
    U.deepStrictEqual(gt2(_.left('a')), false)
    U.deepStrictEqual(gt2(_.right(1)), false)
    U.deepStrictEqual(gt2(_.right(3)), true)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.right(1),
        _.bindTo('a'),
        _.bind('b', () => _.right('b')),
        _.let('c', ({ a, b }) => [a, b])
      ),
      _.right({ a: 1, b: 'b', c: [1, 'b'] })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.right(1), _.bindTo('a'), _.bindRight('b', _.right('b'))), _.right({ a: 1, b: 'b' }))
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.right(1), _.tupled, _.zipFlatten(_.right('b'))), _.right([1, 'b'] as const))
  })

  it('liftNullable', () => {
    const f = _.liftNullable(
      (n: number) => (n > 0 ? n : null),
      () => 'error'
    )
    U.deepStrictEqual(f(1), _.right(1))
    U.deepStrictEqual(f(-1), _.left('error'))
  })

  it('flatMapNullable', () => {
    const f = _.flatMapNullable(
      (n: number) => (n > 0 ? n : null),
      () => 'error'
    )
    U.deepStrictEqual(f(_.right(1)), _.right(1))
    U.deepStrictEqual(f(_.right(-1)), _.left('error'))
    U.deepStrictEqual(f(_.left('a')), _.left('a'))
  })

  it('toUnion', () => {
    U.deepStrictEqual(_.toUnion(_.right(1)), 1)
    U.deepStrictEqual(_.toUnion(_.left('a')), 'a')
  })

  it('liftThrowable', () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error('empty string')
    }, identity)
    U.deepStrictEqual(f('a'), _.right(1))
    U.deepStrictEqual(f(''), _.left(new Error('empty string')))
  })

  it('flatMapRec', () => {
    const flatMapRec = _.flatMapRec
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec(() => _.left('a'))
      ),
      _.left('a')
    )
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec((_a: number) => _.right(_.right(1)))
      ),
      _.right(1)
    )
    U.deepStrictEqual(
      pipe(
        1,
        flatMapRec((a) => {
          if (a < 5) {
            return _.right(_.left(a + 1))
          } else {
            return _.right(_.right(a))
          }
        })
      ),
      _.right(5)
    )
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyNonEmptyArray', () => {
    const f = _.traverseReadonlyNonEmptyArray((a: string) => (a.length > 0 ? _.right(a) : _.left('e')))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.right(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f), _.left('e'))
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.right(a + i) : _.left('e')))
    U.deepStrictEqual(pipe(RA.empty, f), _.right(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.right(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f), _.left('e'))
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.right('a'), _.right('b')], _.sequenceReadonlyArray), _.right(['a', 'b']))
    U.deepStrictEqual(pipe([_.right('a'), _.left('e')], _.sequenceReadonlyArray), _.left('e'))
  })
})
