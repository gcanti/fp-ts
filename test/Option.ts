import { separated } from '../src/Compactable'
import { left, right } from '../src/Either'
import { eqNumber } from '../src/Eq'
import { identity, pipe } from '../src/function'
import { monoidString } from '../src/Monoid'
import * as _ from '../src/Option'
import { ordString } from '../src/Ord'
import * as A from '../src/ReadonlyArray'
import { semigroupString } from '../src/Semigroup'
import { showString } from '../src/Show'
import * as T from '../src/Task'
import { deepStrictEqual } from './util'

const p = (n: number): boolean => n > 2

describe('Option', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      deepStrictEqual(pipe(_.some(2), _.map(double)), _.some(4))
      deepStrictEqual(pipe(_.none, _.map(double)), _.none)
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      deepStrictEqual(pipe(_.some(double), _.ap(_.some(2))), _.some(4))
      deepStrictEqual(pipe(_.some(double), _.ap(_.none)), _.none)
      deepStrictEqual(pipe(_.none, _.ap(_.some(2))), _.none)
      deepStrictEqual(pipe(_.none, _.ap(_.none)), _.none)
    })

    it('apFirst', () => {
      deepStrictEqual(pipe(_.some('a'), _.apFirst(_.some('b'))), _.some('a'))
    })

    it('apSecond', () => {
      deepStrictEqual(pipe(_.some('a'), _.apSecond(_.some('b'))), _.some('b'))
    })

    it('chain', () => {
      const f = (n: number) => _.some(n * 2)
      const g = () => _.none
      deepStrictEqual(pipe(_.some(1), _.chain(f)), _.some(2))
      deepStrictEqual(pipe(_.none, _.chain(f)), _.none)
      deepStrictEqual(pipe(_.some(1), _.chain(g)), _.none)
      deepStrictEqual(pipe(_.none, _.chain(g)), _.none)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.some(n * 2)
      deepStrictEqual(pipe(_.some(1), _.chainFirst(f)), _.some(1))
    })

    it('duplicate', () => {
      deepStrictEqual(pipe(_.some(1), _.duplicate), _.some(_.some(1)))
    })

    it('flatten', () => {
      deepStrictEqual(pipe(_.some(_.some(1)), _.flatten), _.some(1))
    })

    it('alt', () => {
      const assertAlt = (a: _.Option<number>, b: _.Option<number>, expected: _.Option<number>) => {
        deepStrictEqual(
          pipe(
            a,
            _.alt(() => b)
          ),
          expected
        )
      }
      assertAlt(_.some(1), _.some(2), _.some(1))
      assertAlt(_.some(1), _.none, _.some(1))
      assertAlt(_.none, _.some(2), _.some(2))
      assertAlt(_.none, _.none, _.none)
    })

    it('extend', () => {
      const f = _.getOrElse(() => 0)
      deepStrictEqual(pipe(_.some(2), _.extend(f)), _.some(2))
      deepStrictEqual(pipe(_.none, _.extend(f)), _.none)
    })

    it('reduce', () => {
      deepStrictEqual(
        pipe(
          _.none,
          _.reduce(2, (b, a) => b + a)
        ),
        2
      )
      deepStrictEqual(
        pipe(
          _.some(3),
          _.reduce(2, (b, a) => b + a)
        ),
        5
      )
    })

    it('foldMap', () => {
      deepStrictEqual(pipe(_.some('a'), _.foldMap(monoidString)(identity)), 'a')
      deepStrictEqual(pipe(_.none, _.foldMap(monoidString)(identity)), '')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      deepStrictEqual(pipe(_.some('a'), _.reduceRight('', f)), 'a')
      deepStrictEqual(pipe(_.none, _.reduceRight('', f)), '')
    })

    it('compact', () => {
      deepStrictEqual(_.compact(_.none), _.none)
      deepStrictEqual(_.compact(_.some(_.none)), _.none)
      deepStrictEqual(_.compact(_.some(_.some('123'))), _.some('123'))
    })

    it('separate', () => {
      deepStrictEqual(_.separate(_.none), separated(_.none, _.none))
      deepStrictEqual(_.separate(_.some(left('123'))), separated(_.some('123'), _.none))
      deepStrictEqual(_.separate(_.some(right('123'))), separated(_.none, _.some('123')))
    })

    it('filter', () => {
      const predicate = (a: number) => a === 2
      deepStrictEqual(pipe(_.none, _.filter(predicate)), _.none)
      deepStrictEqual(pipe(_.some(1), _.filter(predicate)), _.none)
      deepStrictEqual(pipe(_.some(2), _.filter(predicate)), _.some(2))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? _.some(n + 1) : _.none)
      deepStrictEqual(pipe(_.none, _.filterMap(f)), _.none)
      deepStrictEqual(pipe(_.some(1), _.filterMap(f)), _.none)
      deepStrictEqual(pipe(_.some(3), _.filterMap(f)), _.some(4))
    })

    it('partition', () => {
      deepStrictEqual(pipe(_.none, _.partition(p)), separated(_.none, _.none))
      deepStrictEqual(pipe(_.some(1), _.partition(p)), separated(_.some(1), _.none))
      deepStrictEqual(pipe(_.some(3), _.partition(p)), separated(_.none, _.some(3)))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      deepStrictEqual(pipe(_.none, _.partitionMap(f)), separated(_.none, _.none))
      deepStrictEqual(pipe(_.some(1), _.partitionMap(f)), separated(_.some(0), _.none))
      deepStrictEqual(pipe(_.some(3), _.partitionMap(f)), separated(_.none, _.some(4)))
    })

    it('traverse', () => {
      deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(A.Applicative)(() => [])
        ),
        []
      )
      deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(A.Applicative)((s) => [s.length])
        ),
        [_.some(5)]
      )
      deepStrictEqual(
        pipe(
          _.none,
          _.traverse(A.Applicative)((s) => [s])
        ),
        [_.none]
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(A.Applicative)
      deepStrictEqual(sequence(_.some([1, 2])), [_.some(1), _.some(2)])
      deepStrictEqual(sequence(_.none), [_.none])
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? _.some(n + 1) : _.none))
      deepStrictEqual(await pipe(_.none, wither)(), _.none)
      deepStrictEqual(await pipe(_.some(1), wither)(), _.none)
      deepStrictEqual(await pipe(_.some(3), wither)(), _.some(4))
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      deepStrictEqual(await pipe(_.none, wilt)(), separated(_.none, _.none))
      deepStrictEqual(await pipe(_.some(1), wilt)(), separated(_.some(0), _.none))
      deepStrictEqual(await pipe(_.some(3), wilt)(), separated(_.none, _.some(4)))
    })
  })

  describe('constructors', () => {
    it('fromEither', () => {
      deepStrictEqual(_.fromEither(left('a')), _.none)
      deepStrictEqual(_.fromEither(right(1)), _.some(1))
    })
  })

  it('zero', () => {
    deepStrictEqual(_.zero(), _.none)
  })

  it('fold', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    const fold = _.fold(f, g)
    deepStrictEqual(fold(_.none), 'none')
    deepStrictEqual(fold(_.some('abc')), 'some3')
  })

  it('toNullable', () => {
    deepStrictEqual(_.toNullable(_.none), null)
    deepStrictEqual(_.toNullable(_.some(1)), 1)
  })

  it('toUndefined', () => {
    deepStrictEqual(_.toUndefined(_.none), undefined)
    deepStrictEqual(_.toUndefined(_.some(1)), 1)
  })

  it('getOrElse', () => {
    deepStrictEqual(
      pipe(
        _.some(1),
        _.getOrElse(() => 0)
      ),
      1
    )
    deepStrictEqual(
      pipe(
        _.none,
        _.getOrElse(() => 0)
      ),
      0
    )
  })

  it('getEq', () => {
    const { equals } = _.getEq(eqNumber)
    deepStrictEqual(equals(_.none)(_.none), true)
    deepStrictEqual(equals(_.none)(_.some(1)), false)
    deepStrictEqual(equals(_.some(1))(_.none), false)
    deepStrictEqual(equals(_.some(2))(_.some(1)), false)
    deepStrictEqual(equals(_.some(1))(_.some(2)), false)
    deepStrictEqual(equals(_.some(2))(_.some(2)), true)
  })

  it('getOrd', () => {
    const OS = _.getOrd(ordString)
    deepStrictEqual(pipe(_.none, OS.compare(_.none)), 0)
    deepStrictEqual(pipe(_.some('a'), OS.compare(_.none)), 1)
    deepStrictEqual(pipe(_.none, OS.compare(_.some('a'))), -1)
    deepStrictEqual(pipe(_.some('a'), OS.compare(_.some('a'))), 0)
    deepStrictEqual(pipe(_.some('a'), OS.compare(_.some('b'))), -1)
    deepStrictEqual(pipe(_.some('b'), OS.compare(_.some('a'))), 1)
  })

  it('chainNullableK', () => {
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
    deepStrictEqual(
      pipe(
        _.fromNullable(x1.a),
        _.chainNullableK((x) => x.b),
        _.chainNullableK((x) => x.c),
        _.chainNullableK((x) => x.d)
      ),
      _.none
    )
    deepStrictEqual(
      pipe(
        _.fromNullable(x2.a),
        _.chainNullableK((x) => x.b),
        _.chainNullableK((x) => x.c),
        _.chainNullableK((x) => x.d)
      ),
      _.none
    )
    deepStrictEqual(
      pipe(
        _.fromNullable(x3.a),
        _.chainNullableK((x) => x.b),
        _.chainNullableK((x) => x.c),
        _.chainNullableK((x) => x.d)
      ),
      _.some(1)
    )
  })

  it('getMonoid', () => {
    const M = _.getMonoid(semigroupString)
    deepStrictEqual(pipe(_.none, M.concat(_.none)), _.none)
    deepStrictEqual(pipe(_.none, M.concat(_.some('a'))), _.some('a'))
    deepStrictEqual(pipe(_.some('a'), M.concat(_.none)), _.some('a'))
    deepStrictEqual(pipe(_.some('b'), M.concat(_.some('a'))), _.some('ba'))
    deepStrictEqual(pipe(_.some('a'), M.concat(_.some('b'))), _.some('ab'))
  })

  it('fromNullable', () => {
    deepStrictEqual(_.fromNullable(2), _.some(2))
    deepStrictEqual(_.fromNullable(null), _.none)
    deepStrictEqual(_.fromNullable(undefined), _.none)
  })

  it('fromPredicate', () => {
    const f = _.fromPredicate(p)
    deepStrictEqual(f(1), _.none)
    deepStrictEqual(f(3), _.some(3))

    type Direction = 'asc' | 'desc'
    const parseDirection = _.fromPredicate((s: string): s is Direction => s === 'asc' || s === 'desc')
    deepStrictEqual(parseDirection('asc'), _.some('asc'))
    deepStrictEqual(parseDirection('foo'), _.none)
  })

  it('getFirstMonoid', () => {
    const M = _.getFirstMonoid<number>()
    deepStrictEqual(pipe(_.none, M.concat(_.none)), _.none)
    deepStrictEqual(pipe(_.some(1), M.concat(_.none)), _.some(1))
    deepStrictEqual(pipe(_.none, M.concat(_.some(1))), _.some(1))
    deepStrictEqual(pipe(_.some(1), M.concat(_.some(2))), _.some(1))
  })

  it('getLastMonoid', () => {
    const M = _.getLastMonoid<number>()
    deepStrictEqual(pipe(_.none, M.concat(_.none)), _.none)
    deepStrictEqual(pipe(_.some(1), M.concat(_.none)), _.some(1))
    deepStrictEqual(pipe(_.none, M.concat(_.some(1))), _.some(1))
    deepStrictEqual(pipe(_.some(1), M.concat(_.some(2))), _.some(2))
  })

  it('elem', () => {
    deepStrictEqual(pipe(_.none, _.elem(eqNumber)(2)), false)
    deepStrictEqual(pipe(_.some(2), _.elem(eqNumber)(2)), true)
    deepStrictEqual(pipe(_.some(2), _.elem(eqNumber)(1)), false)
  })

  it('isNone', () => {
    deepStrictEqual(_.isNone(_.none), true)
    deepStrictEqual(_.isNone(_.some(1)), false)
  })

  it('isSome', () => {
    deepStrictEqual(_.isSome(_.none), false)
    deepStrictEqual(_.isSome(_.some(1)), true)
  })

  it('exists', () => {
    const predicate = (a: number) => a === 2
    deepStrictEqual(pipe(_.none, _.exists(predicate)), false)
    deepStrictEqual(pipe(_.some(1), _.exists(predicate)), false)
    deepStrictEqual(pipe(_.some(2), _.exists(predicate)), true)
  })

  it('tryCatch', () => {
    deepStrictEqual(
      _.tryCatch(() => JSON.parse('2')),
      _.some(2)
    )
    deepStrictEqual(
      _.tryCatch(() => JSON.parse('(')),
      _.none
    )
  })

  it('getRefinement', () => {
    const f = (s: string | number): _.Option<string> => (typeof s === 'string' ? _.some(s) : _.none)
    const isString = _.getRefinement(f)
    deepStrictEqual(isString('s'), true)
    deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.getRefinement<C, A>((c) => (c.type === 'A' ? _.some(c) : _.none))
    deepStrictEqual(isA({ type: 'A' }), true)
    deepStrictEqual(isA({ type: 'B' }), false)
  })

  it('getShow', () => {
    const S = _.getShow(showString)
    deepStrictEqual(S.show(_.some('a')), `some("a")`)
    deepStrictEqual(S.show(_.none), `none`)
  })

  it('getLeft', () => {
    deepStrictEqual(_.getLeft(right(1)), _.none)
    deepStrictEqual(_.getLeft(left('err')), _.some('err'))
  })

  it('getRight', () => {
    deepStrictEqual(_.getRight(right(1)), _.some(1))
    deepStrictEqual(_.getRight(left('err')), _.none)
  })

  it('do notation', () => {
    deepStrictEqual(
      pipe(
        _.some(1),
        _.bindTo('a'),
        _.bind('b', () => _.some('b'))
      ),
      _.some({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    deepStrictEqual(pipe(_.some(1), _.bindTo('a'), _.apS('b', _.some('b'))), _.some({ a: 1, b: 'b' }))
  })

  it('apT', () => {
    deepStrictEqual(pipe(_.some(1), _.tupled, _.apT(_.some('b'))), _.some([1, 'b'] as const))
  })

  it('fromNullableK', () => {
    const f = _.fromNullableK((n: number) => (n > 0 ? n : null))
    deepStrictEqual(f(1), _.some(1))
    deepStrictEqual(f(-1), _.none)
  })

  // -------------------------------------------------------------------------------------
  // array utils
  // -------------------------------------------------------------------------------------

  it('sequenceReadonlyArray', () => {
    const arr = A.range(0, 10)
    deepStrictEqual(pipe(arr, A.map(_.some), _.sequenceReadonlyArray), _.some(arr))

    deepStrictEqual(pipe(arr, A.map(_.fromPredicate((x) => x > 5)), _.sequenceReadonlyArray), _.none)
  })

  it('traverseReadonlyArray', () => {
    const arr = A.range(0, 10)
    deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.some)), _.some(arr))
    deepStrictEqual(pipe(arr, _.traverseReadonlyArray(_.fromPredicate((x) => x > 5))), _.none)
  })

  it('traverseReadonlyArrayWithIndex', () => {
    const arr = A.range(0, 10)
    deepStrictEqual(
      pipe(
        arr,
        _.traverseReadonlyArrayWithIndex((index, _data) => _.some(index))
      ),
      _.some(arr)
    )
    deepStrictEqual(pipe(arr, _.traverseReadonlyArrayWithIndex(_.fromPredicate((x) => x > 5))), _.none)
  })
})
