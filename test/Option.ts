import * as assert from 'assert'
import { left, right } from '../src/Either'
import { identity, pipe } from '../src/function'
import * as N from '../src/number'
import * as _ from '../src/Option'
import * as RA from '../src/ReadonlyArray'
import * as S from '../src/string'
import * as T from '../src/Task'

const p = (n: number): boolean => n > 2

describe('Option', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.some(2), _.map(double)), _.some(4))
      assert.deepStrictEqual(pipe(_.none, _.map(double)), _.none)
    })

    it('flap', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.some(double), _.flap(2)), _.some(4))
      assert.deepStrictEqual(pipe(_.none, _.flap(2)), _.none)
    })

    it('ap', () => {
      const double = (n: number) => n * 2
      assert.deepStrictEqual(pipe(_.some(double), _.ap(_.some(2))), _.some(4))
      assert.deepStrictEqual(pipe(_.some(double), _.ap(_.none)), _.none)
      assert.deepStrictEqual(pipe(_.none, _.ap(_.some(2))), _.none)
      assert.deepStrictEqual(pipe(_.none, _.ap(_.none)), _.none)
    })

    it('apFirst', () => {
      assert.deepStrictEqual(pipe(_.some('a'), _.apFirst(_.some('b'))), _.some('a'))
    })

    it('apSecond', () => {
      assert.deepStrictEqual(pipe(_.some('a'), _.apSecond(_.some('b'))), _.some('b'))
    })

    it('chain', () => {
      const f = (n: number) => _.some(n * 2)
      const g = () => _.none
      assert.deepStrictEqual(pipe(_.some(1), _.chain(f)), _.some(2))
      assert.deepStrictEqual(pipe(_.none, _.chain(f)), _.none)
      assert.deepStrictEqual(pipe(_.some(1), _.chain(g)), _.none)
      assert.deepStrictEqual(pipe(_.none, _.chain(g)), _.none)
    })

    it('chainFirst', () => {
      const f = (n: number) => _.some(n * 2)
      assert.deepStrictEqual(pipe(_.some(1), _.chainFirst(f)), _.some(1))
    })

    it('duplicate', () => {
      assert.deepStrictEqual(pipe(_.some(1), _.duplicate), _.some(_.some(1)))
    })

    it('flatten', () => {
      assert.deepStrictEqual(pipe(_.some(_.some(1)), _.flatten), _.some(1))
    })

    it('alt', () => {
      assert.deepStrictEqual(
        pipe(
          _.some(1),
          _.alt(() => _.some(2))
        ),
        _.some(1)
      )
      assert.deepStrictEqual(
        pipe(
          _.some(2),
          _.alt(() => _.none as _.Option<number>)
        ),
        _.some(2)
      )
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.alt(() => _.some(1))
        ),
        _.some(1)
      )
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.alt(() => _.none)
        ),
        _.none
      )
    })

    it('extend', () => {
      const f = _.getOrElse(() => 0)
      assert.deepStrictEqual(pipe(_.some(2), _.extend(f)), _.some(2))
      assert.deepStrictEqual(pipe(_.none, _.extend(f)), _.none)
    })

    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.reduce(2, (b, a) => b + a)
        ),
        2
      )
      assert.deepStrictEqual(
        pipe(
          _.some(3),
          _.reduce(2, (b, a) => b + a)
        ),
        5
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(pipe(_.some('a'), _.foldMap(S.Monoid)(identity)), 'a')
      assert.deepStrictEqual(pipe(_.none, _.foldMap(S.Monoid)(identity)), '')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(pipe(_.some('a'), _.reduceRight('', f)), 'a')
      assert.deepStrictEqual(pipe(_.none, _.reduceRight('', f)), '')
    })

    it('compact', () => {
      assert.deepStrictEqual(_.compact(_.none), _.none)
      assert.deepStrictEqual(_.compact(_.some(_.none)), _.none)
      assert.deepStrictEqual(_.compact(_.some(_.some('123'))), _.some('123'))
    })

    it('separate', () => {
      assert.deepStrictEqual(_.separate(_.none), { left: _.none, right: _.none })
      assert.deepStrictEqual(_.separate(_.some(left('123'))), { left: _.some('123'), right: _.none })
      assert.deepStrictEqual(_.separate(_.some(right('123'))), { left: _.none, right: _.some('123') })
    })

    it('filter', () => {
      const predicate = (a: number) => a === 2
      assert.deepStrictEqual(pipe(_.none, _.filter(predicate)), _.none)
      assert.deepStrictEqual(pipe(_.some(1), _.filter(predicate)), _.none)
      assert.deepStrictEqual(pipe(_.some(2), _.filter(predicate)), _.some(2))
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? _.some(n + 1) : _.none)
      assert.deepStrictEqual(pipe(_.none, _.filterMap(f)), _.none)
      assert.deepStrictEqual(pipe(_.some(1), _.filterMap(f)), _.none)
      assert.deepStrictEqual(pipe(_.some(3), _.filterMap(f)), _.some(4))
    })

    it('partition', () => {
      assert.deepStrictEqual(pipe(_.none, _.partition(p)), { left: _.none, right: _.none })
      assert.deepStrictEqual(pipe(_.some(1), _.partition(p)), { left: _.some(1), right: _.none })
      assert.deepStrictEqual(pipe(_.some(3), _.partition(p)), { left: _.none, right: _.some(3) })
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(pipe(_.none, _.partitionMap(f)), { left: _.none, right: _.none })
      assert.deepStrictEqual(pipe(_.some(1), _.partitionMap(f)), { left: _.some(0), right: _.none })
      assert.deepStrictEqual(pipe(_.some(3), _.partitionMap(f)), { left: _.none, right: _.some(4) })
    })

    it('traverse', () => {
      assert.deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(RA.Applicative)(() => [])
        ),
        []
      )
      assert.deepStrictEqual(
        pipe(
          _.some('hello'),
          _.traverse(RA.Applicative)((s) => [s.length])
        ),
        [_.some(5)]
      )
      assert.deepStrictEqual(
        pipe(
          _.none,
          _.traverse(RA.Applicative)((s) => [s])
        ),
        [_.none]
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(RA.Applicative)
      assert.deepStrictEqual(sequence(_.some([1, 2])), [_.some(1), _.some(2)])
      assert.deepStrictEqual(sequence(_.none), [_.none])
    })

    it('wither', async () => {
      const wither = _.wither(T.ApplicativePar)((n: number) => T.of(p(n) ? _.some(n + 1) : _.none))
      assert.deepStrictEqual(await pipe(_.none, wither)(), _.none)
      assert.deepStrictEqual(await pipe(_.some(1), wither)(), _.none)
      assert.deepStrictEqual(await pipe(_.some(3), wither)(), _.some(4))
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      assert.deepStrictEqual(await pipe(_.none, wilt)(), { left: _.none, right: _.none })
      assert.deepStrictEqual(await pipe(_.some(1), wilt)(), { left: _.some(0), right: _.none })
      assert.deepStrictEqual(await pipe(_.some(3), wilt)(), { left: _.none, right: _.some(4) })
    })
  })

  describe('constructors', () => {
    it('fromEither', () => {
      assert.deepStrictEqual(_.fromEither(left('a')), _.none)
      assert.deepStrictEqual(_.fromEither(right(1)), _.some(1))
    })
  })

  it('zero', () => {
    assert.deepStrictEqual(_.zero(), _.none)
  })

  it('fold', () => {
    const f = () => 'none'
    const g = (s: string) => `some${s.length}`
    const fold = _.fold(f, g)
    assert.deepStrictEqual(fold(_.none), 'none')
    assert.deepStrictEqual(fold(_.some('abc')), 'some3')
  })

  it('toNullable', () => {
    assert.deepStrictEqual(_.toNullable(_.none), null)
    assert.deepStrictEqual(_.toNullable(_.some(1)), 1)
  })

  it('toUndefined', () => {
    assert.deepStrictEqual(_.toUndefined(_.none), undefined)
    assert.deepStrictEqual(_.toUndefined(_.some(1)), 1)
  })

  it('getOrElse', () => {
    assert.deepStrictEqual(
      pipe(
        _.some(1),
        _.getOrElse(() => 0)
      ),
      1
    )
    assert.deepStrictEqual(
      pipe(
        _.none,
        _.getOrElse(() => 0)
      ),
      0
    )
  })

  it('equals', () => {
    const { equals } = _.getEq(N.Eq)
    assert.deepStrictEqual(equals(_.none, _.none), true)
    assert.deepStrictEqual(equals(_.none, _.some(1)), false)
    assert.deepStrictEqual(equals(_.some(1), _.none), false)
    assert.deepStrictEqual(equals(_.some(2), _.some(1)), false)
    assert.deepStrictEqual(equals(_.some(1), _.some(2)), false)
    assert.deepStrictEqual(equals(_.some(2), _.some(2)), true)
  })

  it('getEq', () => {
    const E = _.getEq(S.Ord)
    assert.deepStrictEqual(E.equals(_.none, _.none), true)
    assert.deepStrictEqual(E.equals(_.some('a'), _.none), false)
    assert.deepStrictEqual(E.equals(_.none, _.some('a')), false)
    assert.deepStrictEqual(E.equals(_.some('a'), _.some('a')), true)
    assert.deepStrictEqual(E.equals(_.some('a'), _.some('b')), false)
  })

  it('getOrd', () => {
    const OS = _.getOrd(S.Ord)
    assert.deepStrictEqual(OS.compare(_.none, _.none), 0)
    assert.deepStrictEqual(OS.compare(_.some('a'), _.none), 1)
    assert.deepStrictEqual(OS.compare(_.none, _.some('a')), -1)
    assert.deepStrictEqual(OS.compare(_.some('a'), _.some('a')), 0)
    assert.deepStrictEqual(OS.compare(_.some('a'), _.some('b')), -1)
    assert.deepStrictEqual(OS.compare(_.some('b'), _.some('a')), 1)
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
    assert.deepStrictEqual(
      pipe(
        _.fromNullable(x1.a),
        _.chainNullableK((x) => x.b),
        _.chainNullableK((x) => x.c),
        _.chainNullableK((x) => x.d)
      ),
      _.none
    )
    assert.deepStrictEqual(
      pipe(
        _.fromNullable(x2.a),
        _.chainNullableK((x) => x.b),
        _.chainNullableK((x) => x.c),
        _.chainNullableK((x) => x.d)
      ),
      _.none
    )
    assert.deepStrictEqual(
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
    const { concat } = _.getMonoid(S.Semigroup)
    assert.deepStrictEqual(concat(_.none, _.none), _.none)
    assert.deepStrictEqual(concat(_.none, _.some('a')), _.some('a'))
    assert.deepStrictEqual(concat(_.some('a'), _.none), _.some('a'))
    assert.deepStrictEqual(concat(_.some('b'), _.some('a')), _.some('ba'))
    assert.deepStrictEqual(concat(_.some('a'), _.some('b')), _.some('ab'))
  })

  it('fromNullable', () => {
    assert.deepStrictEqual(_.fromNullable(2), _.some(2))
    assert.deepStrictEqual(_.fromNullable(null), _.none)
    assert.deepStrictEqual(_.fromNullable(undefined), _.none)
  })

  it('fromPredicate', () => {
    const f = _.fromPredicate(p)
    assert.deepStrictEqual(f(1), _.none)
    assert.deepStrictEqual(f(3), _.some(3))

    type Direction = 'asc' | 'desc'
    const parseDirection = _.fromPredicate((s: string): s is Direction => s === 'asc' || s === 'desc')
    assert.deepStrictEqual(parseDirection('asc'), _.some('asc'))
    assert.deepStrictEqual(parseDirection('foo'), _.none)
  })

  it('getApplySemigroup', () => {
    // tslint:disable-next-line: deprecation
    const S = _.getApplySemigroup(N.SemigroupSum)
    assert.deepStrictEqual(S.concat(_.none, _.none), _.none)
    assert.deepStrictEqual(S.concat(_.some(1), _.none), _.none)
    assert.deepStrictEqual(S.concat(_.none, _.some(1)), _.none)
    assert.deepStrictEqual(S.concat(_.some(1), _.some(2)), _.some(3))
  })

  it('getApplyMonoid', () => {
    // tslint:disable-next-line: deprecation
    const M = _.getApplyMonoid(N.MonoidSum)
    assert.deepStrictEqual(M.concat(M.empty, _.none), _.none)
    assert.deepStrictEqual(M.concat(_.none, M.empty), _.none)
    assert.deepStrictEqual(M.concat(M.empty, _.some(1)), _.some(1))
    assert.deepStrictEqual(M.concat(_.some(1), M.empty), _.some(1))
  })

  it('getFirstMonoid', () => {
    const M = _.getFirstMonoid<number>()
    assert.deepStrictEqual(M.concat(_.none, _.none), _.none)
    assert.deepStrictEqual(M.concat(_.some(1), _.none), _.some(1))
    assert.deepStrictEqual(M.concat(_.none, _.some(1)), _.some(1))
    assert.deepStrictEqual(M.concat(_.some(1), _.some(2)), _.some(1))
  })

  it('getLastMonoid', () => {
    const M = _.getLastMonoid<number>()
    assert.deepStrictEqual(M.concat(_.none, _.none), _.none)
    assert.deepStrictEqual(M.concat(_.some(1), _.none), _.some(1))
    assert.deepStrictEqual(M.concat(_.none, _.some(1)), _.some(1))
    assert.deepStrictEqual(M.concat(_.some(1), _.some(2)), _.some(2))
  })

  it('elem', () => {
    assert.deepStrictEqual(_.elem(N.Eq)(2, _.none), false)
    assert.deepStrictEqual(_.elem(N.Eq)(2, _.some(2)), true)
    assert.deepStrictEqual(_.elem(N.Eq)(1, _.some(2)), false)
  })

  it('isNone', () => {
    assert.deepStrictEqual(_.isNone(_.none), true)
    assert.deepStrictEqual(_.isNone(_.some(1)), false)
  })

  it('isSome', () => {
    assert.deepStrictEqual(_.isSome(_.none), false)
    assert.deepStrictEqual(_.isSome(_.some(1)), true)
  })

  it('exists', () => {
    const predicate = (a: number) => a === 2
    assert.deepStrictEqual(pipe(_.none, _.exists(predicate)), false)
    assert.deepStrictEqual(pipe(_.some(1), _.exists(predicate)), false)
    assert.deepStrictEqual(pipe(_.some(2), _.exists(predicate)), true)
  })

  it('tryCatch', () => {
    assert.deepStrictEqual(
      _.tryCatch(() => JSON.parse('2')),
      _.some(2)
    )
    assert.deepStrictEqual(
      _.tryCatch(() => JSON.parse('(')),
      _.none
    )
  })

  it('getRefinement', () => {
    const f = (s: string | number): _.Option<string> => (typeof s === 'string' ? _.some(s) : _.none)
    const isString = _.getRefinement(f)
    assert.deepStrictEqual(isString('s'), true)
    assert.deepStrictEqual(isString(1), false)
    type A = { readonly type: 'A' }
    type B = { readonly type: 'B' }
    type C = A | B
    const isA = _.getRefinement<C, A>((c) => (c.type === 'A' ? _.some(c) : _.none))
    assert.deepStrictEqual(isA({ type: 'A' }), true)
    assert.deepStrictEqual(isA({ type: 'B' }), false)
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Show)
    assert.deepStrictEqual(Sh.show(_.some('a')), `some("a")`)
    assert.deepStrictEqual(Sh.show(_.none), `none`)
  })

  it('getLeft', () => {
    assert.deepStrictEqual(_.getLeft(right(1)), _.none)
    assert.deepStrictEqual(_.getLeft(left('err')), _.some('err'))
  })

  it('getRight', () => {
    assert.deepStrictEqual(_.getRight(right(1)), _.some(1))
    assert.deepStrictEqual(_.getRight(left('err')), _.none)
  })

  it('throwError', () => {
    assert.deepStrictEqual(_.throwError(undefined), _.none)
  })

  it('do notation', () => {
    assert.deepStrictEqual(
      pipe(
        _.some(1),
        _.bindTo('a'),
        _.bind('b', () => _.some('b'))
      ),
      _.some({ a: 1, b: 'b' })
    )
  })

  it('apS', () => {
    assert.deepStrictEqual(pipe(_.some(1), _.bindTo('a'), _.apS('b', _.some('b'))), _.some({ a: 1, b: 'b' }))
  })

  it('fromNullableK', () => {
    const f = _.fromNullableK((n: number) => (n > 0 ? n : null))
    assert.deepStrictEqual(f(1), _.some(1))
    assert.deepStrictEqual(f(-1), _.none)
  })

  it('sequenceArray', () => {
    assert.deepStrictEqual(pipe([_.of(1), _.of(2)], _.sequenceArray), _.some([1, 2]))
    assert.deepStrictEqual(pipe([_.of(1), _.none], _.sequenceArray), _.none)
  })

  it('tryCatchK', () => {
    const f = _.tryCatchK((s: string) => {
      const len = s.length
      if (len > 0) {
        return len
      }
      throw new Error('empty string')
    })
    assert.deepStrictEqual(f('a'), _.some(1))
    assert.deepStrictEqual(f(''), _.none)
  })
})
