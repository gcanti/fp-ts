import * as T from '@fp-ts/core/Async'
import { identity, pipe } from '@fp-ts/core/Function'
import * as N from '@fp-ts/core/number'
import * as _ from '@fp-ts/core/Option'
import * as RA from '@fp-ts/core/ReadonlyArray'
import * as E from '@fp-ts/core/Result'
import * as S from '@fp-ts/core/string'
import * as U from '@fp-ts/core/test/util'
import * as tree from '@fp-ts/core/Tree'

const p = (n: number): boolean => n > 2

describe('Option', () => {
  it('reduce', () => {
    U.deepStrictEqual(
      pipe(
        _.none,
        _.reduce(2, (b, a) => b + a)
      ),
      2
    )
    U.deepStrictEqual(
      pipe(
        _.some(3),
        _.reduce(2, (b, a) => b + a)
      ),
      5
    )
  })

  it('foldMap', () => {
    U.deepStrictEqual(pipe(_.some('a'), _.foldMap(S.Monoid)(identity)), 'a')
    U.deepStrictEqual(pipe(_.none, _.foldMap(S.Monoid)(identity)), '')
  })

  it('reduceRight', () => {
    const f = (a: string, acc: string) => acc + a
    U.deepStrictEqual(pipe(_.some('a'), _.reduceRight('', f)), 'a')
    U.deepStrictEqual(pipe(_.none, _.reduceRight('', f)), '')
  })

  it('fromIterable', () => {
    U.deepStrictEqual(_.fromIterable([]), _.none)
    U.deepStrictEqual(_.fromIterable(['a']), _.some('a'))
    U.deepStrictEqual(_.fromIterable(tree.make('a')), _.some('a'))
  })

  it('fromEntries', () => {
    U.deepStrictEqual(_.fromEntries(new Map()), _.none)
    U.deepStrictEqual(
      _.fromEntries(
        new Map([
          ['a', 1],
          ['b', 2]
        ])
      ),
      _.some(1)
    )
  })

  it('idKleisli', () => {
    U.deepStrictEqual(_.idKleisli<number>()(1), _.some(1))
  })

  it('composeKleisli', () => {
    const g = (n: number): _.Option<number> => (n !== 0 ? _.some(n / 2) : _.none)
    const h = pipe(RA.head<number>, _.composeKleisli(g))
    U.deepStrictEqual(h([2]), _.some(1))
    U.deepStrictEqual(h([]), _.none)
    U.deepStrictEqual(h([0]), _.none)
  })

  it('lift2', () => {
    const f = (a: number, b: number) => a + b
    const g = _.lift2(f)
    U.deepStrictEqual(g(_.none, _.none), _.none)
    U.deepStrictEqual(g(_.some(1), _.none), _.none)
    U.deepStrictEqual(g(_.none, _.some(2)), _.none)
    U.deepStrictEqual(g(_.some(1), _.some(2)), _.some(3))
  })

  it('lift3', () => {
    const f = (a: number, b: number, c: number) => a + b + c
    const g = _.lift3(f)
    U.deepStrictEqual(g(_.none, _.none, _.none), _.none)
    U.deepStrictEqual(g(_.some(1), _.none, _.none), _.none)
    U.deepStrictEqual(g(_.none, _.some(2), _.none), _.none)
    U.deepStrictEqual(g(_.none, _.none, _.some(3)), _.none)
    U.deepStrictEqual(g(_.some(1), _.some(2), _.none), _.none)
    U.deepStrictEqual(g(_.some(1), _.none, _.some(3)), _.none)
    U.deepStrictEqual(g(_.none, _.some(2), _.some(3)), _.none)
    U.deepStrictEqual(g(_.some(1), _.some(2), _.some(3)), _.some(6))
  })

  describe('pipeables', () => {
    it('map', () => {
      U.deepStrictEqual(pipe(_.some(2), _.map(U.double)), _.some(4))
      U.deepStrictEqual(pipe(_.none, _.map(U.double)), _.none)
    })

    it('ap', () => {
      U.deepStrictEqual(pipe(_.some(U.double), _.ap(_.some(2))), _.some(4))
      U.deepStrictEqual(pipe(_.some(U.double), _.ap(_.none)), _.none)
      U.deepStrictEqual(pipe(_.none, _.ap(_.some(2))), _.none)
      U.deepStrictEqual(pipe(_.none, _.ap(_.none)), _.none)
    })

    it('flatMap', () => {
      const f = (n: number) => _.some(n * 2)
      const g = () => _.none
      U.deepStrictEqual(pipe(_.some(1), _.flatMap(f)), _.some(2))
      U.deepStrictEqual(pipe(_.none, _.flatMap(f)), _.none)
      U.deepStrictEqual(pipe(_.some(1), _.flatMap(g)), _.none)
      U.deepStrictEqual(pipe(_.none, _.flatMap(g)), _.none)
    })

    it('tap', () => {
      const f = (n: number) => _.some(n * 2)
      U.deepStrictEqual(pipe(_.some(1), _.tap(f)), _.some(1))
    })

    it('duplicate', () => {
      U.deepStrictEqual(pipe(_.some(1), _.duplicate), _.some(_.some(1)))
    })

    it('flatten', () => {
      U.deepStrictEqual(pipe(_.some(_.some(1)), _.flatten), _.some(1))
    })

    it('orElse', () => {
      const assertAlt = (a: _.Option<number>, b: _.Option<number>, expected: _.Option<number>) => {
        U.deepStrictEqual(pipe(a, _.orElse(b)), expected)
      }
      assertAlt(_.some(1), _.some(2), _.some(1))
      assertAlt(_.some(1), _.none, _.some(1))
      assertAlt(_.none, _.some(2), _.some(2))
      assertAlt(_.none, _.none, _.none)
    })

    it('extend', () => {
      const f = _.getOrElse(() => 0)
      U.deepStrictEqual(pipe(_.some(2), _.extend(f)), _.some(2))
      U.deepStrictEqual(pipe(_.none, _.extend(f)), _.none)
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact(_.none), _.none)
      U.deepStrictEqual(_.compact(_.some(_.none)), _.none)
      U.deepStrictEqual(_.compact(_.some(_.some('123'))), _.some('123'))
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate(_.none), [_.none, _.none])
      U.deepStrictEqual(_.separate(_.some(E.fail('123'))), [_.some('123'), _.none])
      U.deepStrictEqual(_.separate(_.some(E.succeed('123'))), [_.none, _.some('123')])
    })

    it('filter', () => {
      const predicate = (a: number) => a === 2
      U.deepStrictEqual(pipe(_.none, _.filter(predicate)), _.none)
      U.deepStrictEqual(pipe(_.some(1), _.filter(predicate)), _.none)
      U.deepStrictEqual(pipe(_.some(2), _.filter(predicate)), _.some(2))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? _.some(n + 1) : _.none)
      U.deepStrictEqual(pipe(_.none, _.filterMap(f)), _.none)
      U.deepStrictEqual(pipe(_.some(1), _.filterMap(f)), _.none)
      U.deepStrictEqual(pipe(_.some(3), _.filterMap(f)), _.some(4))
    })

    it('partition', () => {
      U.deepStrictEqual(pipe(_.none, _.partition(p)), [_.none, _.none])
      U.deepStrictEqual(pipe(_.some(1), _.partition(p)), [_.some(1), _.none])
      U.deepStrictEqual(pipe(_.some(3), _.partition(p)), [_.none, _.some(3)])
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? E.succeed(n + 1) : E.fail(n - 1))
      U.deepStrictEqual(pipe(_.none, _.partitionMap(f)), [_.none, _.none])
      U.deepStrictEqual(pipe(_.some(1), _.partitionMap(f)), [_.some(0), _.none])
      U.deepStrictEqual(pipe(_.some(3), _.partitionMap(f)), [_.none, _.some(4)])
    })

    it('traverse', () => {
      U.deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(RA.Applicative)(() => [])
        ),
        []
      )
      U.deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(RA.Applicative)((s) => [s.length])
        ),
        [_.some(5)]
      )
      U.deepStrictEqual(
        pipe(
          _.none,
          _.traverse(RA.Applicative)((s) => [s])
        ),
        [_.none]
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(RA.Applicative)
      U.deepStrictEqual(sequence(_.some([1, 2])), [_.some(1), _.some(2)])
      U.deepStrictEqual(sequence(_.none), [_.none])
    })

    it('filterMapKind', async () => {
      const filterMapKind = _.traverseFilterMap(T.ApplicativePar)((n: number) => T.of(p(n) ? _.some(n + 1) : _.none))
      U.deepStrictEqual(await pipe(_.none, filterMapKind)(), _.none)
      U.deepStrictEqual(await pipe(_.some(1), filterMapKind)(), _.none)
      U.deepStrictEqual(await pipe(_.some(3), filterMapKind)(), _.some(4))
    })

    it('partitionMapKind', async () => {
      const partitionMapKind = _.traversePartitionMap(T.ApplicativePar)((n: number) =>
        T.of(p(n) ? E.succeed(n + 1) : E.fail(n - 1))
      )
      U.deepStrictEqual(await pipe(_.none, partitionMapKind)(), [_.none, _.none])
      U.deepStrictEqual(await pipe(_.some(1), partitionMapKind)(), [_.some(0), _.none])
      U.deepStrictEqual(await pipe(_.some(3), partitionMapKind)(), [_.none, _.some(4)])
    })
  })

  it('fromResult', () => {
    U.deepStrictEqual(_.fromResult(E.fail('a')), _.none)
    U.deepStrictEqual(_.fromResult(E.succeed(1)), _.some(1))
  })

  it('toResult', () => {
    U.deepStrictEqual(pipe(_.none, _.toResult('e')), E.fail('e'))
    U.deepStrictEqual(pipe(_.some(1), _.toResult('e')), E.succeed(1))
  })

  it('match', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    const match = _.match(f, g)
    U.deepStrictEqual(match(_.none), 'none')
    U.deepStrictEqual(match(_.some('abc')), 'some3')
  })

  it('toNullable', () => {
    U.deepStrictEqual(_.toNull(_.none), null)
    U.deepStrictEqual(_.toNull(_.some(1)), 1)
  })

  it('toUndefined', () => {
    U.deepStrictEqual(_.toUndefined(_.none), undefined)
    U.deepStrictEqual(_.toUndefined(_.some(1)), 1)
  })

  it('getOrElse', () => {
    U.deepStrictEqual(pipe(_.some(1), _.getOrElse(0)), 1)
    U.deepStrictEqual(pipe(_.none, _.getOrElse(0)), 0)
  })

  it('getEq', () => {
    const { equals } = _.getEq(N.Eq)
    U.deepStrictEqual(equals(_.none)(_.none), true)
    U.deepStrictEqual(equals(_.none)(_.some(1)), false)
    U.deepStrictEqual(equals(_.some(1))(_.none), false)
    U.deepStrictEqual(equals(_.some(2))(_.some(1)), false)
    U.deepStrictEqual(equals(_.some(1))(_.some(2)), false)
    U.deepStrictEqual(equals(_.some(2))(_.some(2)), true)
  })

  it('getOrd', () => {
    const OS = _.getOrd(S.Ord)
    U.deepStrictEqual(pipe(_.none, OS.compare(_.none)), 0)
    U.deepStrictEqual(pipe(_.some('a'), OS.compare(_.none)), 1)
    U.deepStrictEqual(pipe(_.none, OS.compare(_.some('a'))), -1)
    U.deepStrictEqual(pipe(_.some('a'), OS.compare(_.some('a'))), 0)
    U.deepStrictEqual(pipe(_.some('a'), OS.compare(_.some('b'))), -1)
    U.deepStrictEqual(pipe(_.some('b'), OS.compare(_.some('a'))), 1)
  })

  it('flatMapNullable', () => {
    interface X {
      readonly a?: {
        readonly b?: {
          readonly c?: {
            readonly d: number
          }
        }
      }
    }
    const x1: X = { a: {} }
    const x2: X = { a: { b: {} } }
    const x3: X = { a: { b: { c: { d: 1 } } } }
    U.deepStrictEqual(
      pipe(
        _.fromNullable(x1.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.none
    )
    U.deepStrictEqual(
      pipe(
        _.fromNullable(x2.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.none
    )
    U.deepStrictEqual(
      pipe(
        _.fromNullable(x3.a),
        _.flatMapNullable((x) => x.b),
        _.flatMapNullable((x) => x.c),
        _.flatMapNullable((x) => x.d)
      ),
      _.some(1)
    )
  })

  it('getMonoid', () => {
    const M = _.getMonoid(S.Semigroup)
    U.deepStrictEqual(pipe(_.none, M.combine(_.none)), _.none)
    U.deepStrictEqual(pipe(_.none, M.combine(_.some('a'))), _.some('a'))
    U.deepStrictEqual(pipe(_.some('a'), M.combine(_.none)), _.some('a'))
    U.deepStrictEqual(pipe(_.some('b'), M.combine(_.some('a'))), _.some('ba'))
    U.deepStrictEqual(pipe(_.some('a'), M.combine(_.some('b'))), _.some('ab'))
  })

  it('fromNullable', () => {
    U.deepStrictEqual(_.fromNullable(2), _.some(2))
    U.deepStrictEqual(_.fromNullable(null), _.none)
    U.deepStrictEqual(_.fromNullable(undefined), _.none)
  })

  it('fromPredicate', () => {
    const f = _.liftPredicate(p)
    U.deepStrictEqual(f(1), _.none)
    U.deepStrictEqual(f(3), _.some(3))

    type Direction = 'asc' | 'desc'
    const parseDirection = _.liftPredicate((s: string): s is Direction => s === 'asc' || s === 'desc')
    U.deepStrictEqual(parseDirection('asc'), _.some('asc'))
    U.deepStrictEqual(parseDirection('foo'), _.none)
  })

  it('elem', () => {
    U.deepStrictEqual(pipe(_.none, _.elem(N.Eq)(2)), false)
    U.deepStrictEqual(pipe(_.some(2), _.elem(N.Eq)(2)), true)
    U.deepStrictEqual(pipe(_.some(2), _.elem(N.Eq)(1)), false)
  })

  it('isNone', () => {
    U.deepStrictEqual(_.isNone(_.none), true)
    U.deepStrictEqual(_.isNone(_.some(1)), false)
  })

  it('isSome', () => {
    U.deepStrictEqual(_.isSome(_.none), false)
    U.deepStrictEqual(_.isSome(_.some(1)), true)
  })

  it('exists', () => {
    const predicate = (a: number) => a === 2
    U.deepStrictEqual(pipe(_.none, _.exists(predicate)), false)
    U.deepStrictEqual(pipe(_.some(1), _.exists(predicate)), false)
    U.deepStrictEqual(pipe(_.some(2), _.exists(predicate)), true)
  })

  it('tryCatch', () => {
    U.deepStrictEqual(
      _.fromThrowable(() => JSON.parse('2')),
      _.some(2)
    )
    U.deepStrictEqual(
      _.fromThrowable(() => JSON.parse('(')),
      _.none
    )
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    U.deepStrictEqual(Sh.show(_.some('a')), `some("a")`)
    U.deepStrictEqual(Sh.show(_.none), `none`)
  })

  it('getLeft', () => {
    U.deepStrictEqual(_.getFailure(E.succeed(1)), _.none)
    U.deepStrictEqual(_.getFailure(E.fail('err')), _.some('err'))
  })

  it('getRight', () => {
    U.deepStrictEqual(_.getSuccess(E.succeed(1)), _.some(1))
    U.deepStrictEqual(_.getSuccess(E.fail('err')), _.none)
  })

  it('do notation', () => {
    U.deepStrictEqual(
      pipe(
        _.some(1),
        _.bindTo('a'),
        _.bind('b', () => _.some('b'))
      ),
      _.some({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    U.deepStrictEqual(pipe(_.some(1), _.bindTo('a'), _.bindRight('b', _.some('b'))), _.some({ a: 1, b: 'b' }))
  })

  it('zipFlatten', () => {
    U.deepStrictEqual(pipe(_.some(1), _.tupled, _.zipFlatten(_.some('b'))), _.some([1, 'b'] as const))
  })

  it('liftNullable', () => {
    const f = _.liftNullable((n: number) => (n > 0 ? n : null))
    U.deepStrictEqual(f(1), _.some(1))
    U.deepStrictEqual(f(-1), _.none)
  })

  it('liftThrowable', () => {
    const f = _.liftThrowable((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error('empty string')
    })
    U.deepStrictEqual(f('a'), _.some(1))
    U.deepStrictEqual(f(''), _.none)
  })

  it('guard', () => {
    U.deepStrictEqual(
      pipe(
        _.Do,
        _.bind('x', () => _.some('a')),
        _.bind('y', () => _.some('a')),
        _.tap(({ x, y }) => _.guard(x === y))
      ),
      _.some({ x: 'a', y: 'a' })
    )
    U.deepStrictEqual(
      pipe(
        _.Do,
        _.bind('x', () => _.some('a')),
        _.bind('y', () => _.some('b')),
        _.tap(({ x, y }) => _.guard(x === y))
      ),
      _.none
    )
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('traverseReadonlyArrayWithIndex', () => {
    const f = _.traverseReadonlyArrayWithIndex((i, a: string) => (a.length > 0 ? _.some(a + i) : _.none))
    U.deepStrictEqual(pipe(RA.empty, f), _.some(RA.empty))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.some(['a0', 'b1']))
    U.deepStrictEqual(pipe(['a', ''], f), _.none)
  })

  it('traverseNonEmptyReadonlyArray', () => {
    const f = _.traverseNonEmptyReadonlyArray((a: string) => (a.length > 0 ? _.some(a) : _.none))
    U.deepStrictEqual(pipe(['a', 'b'], f), _.some(['a', 'b'] as const))
    U.deepStrictEqual(pipe(['a', ''], f), _.none)
  })

  it('sequenceReadonlyArray', () => {
    U.deepStrictEqual(pipe([_.some('a'), _.some('b')], _.sequenceReadonlyArray), _.some(['a', 'b']))
    U.deepStrictEqual(pipe([_.some('a'), _.none], _.sequenceReadonlyArray), _.none)
  })
})
