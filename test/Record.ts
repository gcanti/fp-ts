import * as assert from 'assert'
import * as A from '../src/Array'
import { left, right } from '../src/Either'
import { identity, pipe } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import { reverse } from '../src/Ord'
import * as _ from '../src/Record'
import * as Se from '../src/Semigroup'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('Record', () => {
  describe('pipeables', () => {
    it('collect', () => {
      const x: { readonly a: string; readonly b: boolean } = { a: 'c', b: false }
      U.deepStrictEqual(_.collect(S.Ord)((key, val) => ({ key: key, value: val }))(x), [
        { key: 'a', value: 'c' },
        { key: 'b', value: false }
      ])
      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(_.collect((key, val) => ({ key: key, value: val }))(x), [
        { key: 'a', value: 'c' },
        { key: 'b', value: false }
      ])
    })

    it('map', () => {
      U.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(U.double)), { k1: 2, k2: 4 })
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(U.double)), { a: 2, b: 4 })
    })

    it('mapWithIndex', () => {
      const doubleWithIndex = (_: string, n: number): number => n * 2
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.mapWithIndex(doubleWithIndex)), { a: 2, b: 4 })
    })

    it('reduce', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduce(S.Ord)('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce(S.Ord)('', (b, a) => b + a)
        ),
        'ab'
      )

      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          // tslint:disable-next-line: deprecation
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          // tslint:disable-next-line: deprecation
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Ord)(S.Monoid)(identity)), 'ab')
      U.deepStrictEqual(_.getFoldable(S.Ord).foldMap(S.Monoid)({ a: 'a', b: 'b' }, identity), 'ab')

      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Monoid)(identity)), 'ab')
      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(_.Foldable.foldMap(S.Monoid)({ a: 'a', b: 'b' }, identity), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight(S.Ord)('', f)), 'ba')

      // tslint:disable-next-line: deprecation
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate({ foo: left(123), bar: right(123) }), separated({ foo: 123 }, { bar: 123 }))
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      U.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: Record<string, string | number> = { a: 1, b: 'foo' }
      const actual = pipe(y, _.filter(isNumber))
      U.deepStrictEqual(actual, { a: 1 })
      U.deepStrictEqual(
        pipe(
          y,
          _.filter((_) => true)
        ),
        y
      )

      const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
      U.deepStrictEqual(pipe(x, _.filter(isNumber)), { a: 1 })
      U.deepStrictEqual(pipe(noPrototype, _.filter(isNumber)), noPrototype)
    })

    it('filterMap', () => {
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe({}, _.filterMap(f)), {})
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.filterMap(f)), { b: 4 })
    })

    it('partition', () => {
      U.deepStrictEqual(pipe({}, _.partition(p)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partition(p)), separated({ a: 1 }, { b: 3 }))
    })

    it('partitionMap', () => {
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      U.deepStrictEqual(pipe({}, _.partitionMap(f)), separated({}, {}))
      U.deepStrictEqual(pipe({ a: 1, b: 3 }, _.partitionMap(f)), separated({ a: 0 }, { b: 4 }))
    })

    it('reduceWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceWithIndex(S.Ord)('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduceWithIndex(S.Ord)('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )

      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          // tslint:disable-next-line: deprecation
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          // tslint:disable-next-line: deprecation
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.foldMapWithIndex(S.Ord)(S.Monoid)((k, a) => k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        _.getFoldableWithIndex(S.Ord).foldMapWithIndex(S.Monoid)({ k1: 'a', k2: 'b' }, (k, a) => k + a),
        'k1ak2b'
      )

      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          // tslint:disable-next-line: deprecation
          _.foldMapWithIndex(S.Monoid)((k, a) => k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        // tslint:disable-next-line: deprecation
        _.FoldableWithIndex.foldMapWithIndex(S.Monoid)({ k1: 'a', k2: 'b' }, (k, a) => k + a),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          _.reduceRightWithIndex(S.Ord)('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
      U.deepStrictEqual(
        pipe(
          { k1: 'a', k2: 'b' },
          // tslint:disable-next-line: deprecation
          _.reduceRightWithIndex('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
    })

    it('partitionMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionMapWithIndex((k, a: number) => (a > 1 ? right(a) : left(k)))
        ),
        separated({ a: 'a' }, { b: 2 })
      )
    })

    it('partitionWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.partitionWithIndex((_, a: number) => a > 1)
        ),
        separated({ a: 1 }, { b: 2 })
      )
    })

    it('filterMapWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
        ),
        { b: 2 }
      )
    })

    it('filterWithIndex', () => {
      U.deepStrictEqual(
        pipe(
          { a: 1, b: 2 },
          _.filterWithIndex((_, a: number) => a > 1)
        ),
        { b: 2 }
      )
    })

    it('traverse', () => {
      U.deepStrictEqual(
        _.traverse(O.Applicative)((n: number) => (n <= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }),
        O.some({ a: 1, b: 2 })
      )
      U.deepStrictEqual(_.traverse(O.Applicative)((n: number) => (n >= 2 ? O.some(n) : O.none))({ a: 1, b: 2 }), O.none)
    })

    it('getTraversable', () => {
      const T = _.getTraversable(reverse(S.Ord))
      const f = (n: number) => (n <= 2 ? O.some(n) : O.none)
      U.deepStrictEqual(T.traverse(O.Applicative)({ a: 1, b: 2 }, f), O.some({ a: 1, b: 2 }))
      U.deepStrictEqual(T.traverse(O.Applicative)({ a: 1, b: 3 }, f), O.none)
      // should respect the order
      U.deepStrictEqual(pipe(T.traverse(O.Applicative)({ b: 2, a: 1 }, f), O.map(Object.keys)), O.some(['b', 'a']))
      U.deepStrictEqual(
        pipe(T.sequence(O.Applicative)({ b: O.some(2), a: O.some(1) }), O.map(Object.keys)),
        O.some(['b', 'a'])
      )
    })

    it('sequence', () => {
      const sequence = _.sequence(O.Applicative)
      U.deepStrictEqual(sequence({ a: O.some(1), b: O.some(2) }), O.some({ a: 1, b: 2 }))
      U.deepStrictEqual(sequence({ a: O.none, b: O.some(2) }), O.none)

      U.deepStrictEqual(
        // tslint:disable-next-line: deprecation
        _.record.sequence(O.Applicative)({ a: O.some(1), b: O.some(2) }),
        O.some({ a: 1, b: 2 })
      )
    })

    it('traverseWithIndex', () => {
      const f = (k: string, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      const traverseWithIndex = _.traverseWithIndex(O.Applicative)(f)
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
      U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
      U.deepStrictEqual(pipe({}, traverseWithIndex), O.some({}))
    })

    it('getTraversableWithIndex', () => {
      const TWI = _.getTraversableWithIndex(reverse(S.Ord))
      const f = (k: string, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      U.deepStrictEqual(TWI.traverseWithIndex(O.Applicative)({ b: 2 }, f), O.some({ b: 2 }))
      U.deepStrictEqual(TWI.traverseWithIndex(O.Applicative)({ a: 1, b: 2 }, f), O.none)
      U.deepStrictEqual(TWI.traverseWithIndex(O.Applicative)({}, f), O.some({}))
      // should respect the order
      U.deepStrictEqual(
        pipe(TWI.traverseWithIndex(O.Applicative)({ b: 2, c: 1 }, f), O.map(Object.keys)),
        O.some(['c', 'b'])
      )
    })

    it('wither', async () => {
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      const wither = _.wither(T.ApplicativePar)(f)
      U.deepStrictEqual(await pipe({}, wither)(), {})
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wither)(), { b: 4 })

      U.deepStrictEqual(await _.getWitherable(S.Ord).wither(T.ApplicativePar)({ a: 1, b: 3 }, f)(), { b: 4 })
    })

    it('wilt', async () => {
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? right(n + 1) : left(n - 1)))
      U.deepStrictEqual(await pipe({}, wilt)(), separated({}, {}))
      U.deepStrictEqual(await pipe({ a: 1, b: 3 }, wilt)(), separated({ a: 0 }, { b: 4 }))
    })
  })

  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = _.getMonoid(N.SemigroupSum)
    U.deepStrictEqual(M.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
    U.deepStrictEqual(M.concat(d1, M.empty), d1)
    U.deepStrictEqual(M.concat(M.empty, d2), d2)
    U.deepStrictEqual(M.concat(d1, {}), d1)
  })

  it('getEq', () => {
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { a: 1 }), true)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { a: 2 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals({ a: 1 }, { b: 1 }), false)
    U.deepStrictEqual(_.getEq(N.Eq).equals(noPrototype, { b: 1 }), false)
  })

  it('lookup', () => {
    U.deepStrictEqual(_.lookup('a', { a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b', { a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b', noPrototype), O.none)

    U.deepStrictEqual(_.lookup('a')({ a: 1 }), O.some(1))
    U.deepStrictEqual(_.lookup('b')({ a: 1 }), O.none)
    U.deepStrictEqual(_.lookup('b')(noPrototype), O.none)
  })

  it('fromFoldable', () => {
    const First = Se.first<number>()
    U.deepStrictEqual(_.fromFoldable(First, A.Foldable)([['a', 1]]), { a: 1 })
    U.deepStrictEqual(
      _.fromFoldable(
        First,
        A.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 1
      }
    )
    const Last = Se.last<number>()
    U.deepStrictEqual(
      _.fromFoldable(
        Last,
        A.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 2
      }
    )
  })

  it('toUnfoldable', () => {
    U.deepStrictEqual(_.toUnfoldable(A.Unfoldable)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex should sort the keys', () => {
    // tslint:disable-next-line: readonly-array
    const log: Array<string> = []
    const append = (message: string): IO.IO<void> => () => {
      log.push(message)
    }

    pipe(
      { b: append('b'), a: append('a') },
      _.traverseWithIndex(IO.Applicative)((_, io) => io)
    )()
    U.deepStrictEqual(log, ['a', 'b'])
  })

  it('size', () => {
    U.deepStrictEqual(_.size({}), 0)
    U.deepStrictEqual(_.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    U.deepStrictEqual(_.isEmpty({}), true)
    U.deepStrictEqual(_.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.insertAt('a', 1)({}), { a: 1 })
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    // tslint:disable-next-line: deprecation
    U.deepStrictEqual(_.insertAt('a', 1)(x), x)
  })

  it('deleteAt', () => {
    U.deepStrictEqual(_.deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    U.deepStrictEqual(_.deleteAt('b')(x), x)
    U.deepStrictEqual(_.deleteAt('b')(noPrototype), noPrototype)
  })

  it('pop', () => {
    U.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }]))
    U.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: Record<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    U.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: Record<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.some((n: number) => n <= 1)(x), true)
    U.deepStrictEqual(_.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    U.deepStrictEqual(_.elem(N.Eq)(1, { a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3, { a: 1, b: 2 }), false)

    U.deepStrictEqual(_.elem(N.Eq)(1)({ a: 1, b: 2 }), true)
    U.deepStrictEqual(_.elem(N.Eq)(3)({ a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    // tslint:disable-next-line: readonly-array
    const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
      _.fromFoldableMap(Se.last<A>(), A.Foldable)(A.zip(keys, values), identity)

    U.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    // tslint:disable-next-line: readonly-array
    const users: Array<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    U.deepStrictEqual(
      _.fromFoldableMap(Se.last<User>(), A.Foldable)(users, (user) => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const Sh = _.getShow(S.Ord)(S.Show)
    U.deepStrictEqual(Sh.show({}), `{}`)
    U.deepStrictEqual(Sh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(Sh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)

    // tslint:disable-next-line: deprecation
    const DepSh = _.getShow(S.Show)
    U.deepStrictEqual(DepSh.show({}), `{}`)
    U.deepStrictEqual(DepSh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(DepSh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('has', () => {
    const x: Record<string, number> = { a: 1 }
    U.deepStrictEqual(_.has('a', x), true)
    U.deepStrictEqual(_.has('b', x), false)
  })

  it('updateAt', () => {
    const x: Record<string, number> = { a: 1 }
    U.deepStrictEqual(_.updateAt('b', 2)(x), O.none)
    U.deepStrictEqual(_.updateAt('a', 2)(x), O.some({ a: 2 }))
    const r = _.updateAt('a', 1)(x)
    if (O.isSome(r)) {
      U.deepStrictEqual(r.value, x)
    } else {
      assert.fail()
    }
  })

  it('modifyAt', () => {
    const x: Record<string, number> = { a: 1 }
    U.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    U.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
    // should not return the same reference if nothing changed
    const input: Record<string, number> = { a: 1 }
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt('a', identity),
        O.map((out) => out === input)
      ),
      O.some(false)
    )
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(S.Semigroup)
    const x: Record<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: Record<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.deepStrictEqual(M.concat(x, M.empty), x)
    U.deepStrictEqual(M.concat(M.empty, x), x)
    U.deepStrictEqual(M.concat(x, {}), x)
    U.deepStrictEqual(M.concat({}, x), x)
    U.deepStrictEqual(M.concat(x, y), {
      a: 'a1',
      b: 'b1b2',
      c: 'c1c2',
      d: 'd2'
    })
  })

  it('getIntersectionSemigroup', () => {
    const M = _.getIntersectionSemigroup(S.Semigroup)
    const x: Record<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: Record<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.deepStrictEqual(M.concat(x, {}), {})
    U.deepStrictEqual(M.concat(x, {}), {})
    U.deepStrictEqual(M.concat(x, {}), {})
    U.deepStrictEqual(M.concat(x, {}), {})
    U.deepStrictEqual(M.concat(x, y), {
      b: 'b1b2',
      c: 'c1c2'
    })
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma<string>()
    const x: Record<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: Record<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.deepStrictEqual(M.concat({}, x), x)
    U.deepStrictEqual(M.concat(x, {}), x)
    U.deepStrictEqual(M.concat({}, x), x)
    U.deepStrictEqual(M.concat(x, {}), x)
    U.deepStrictEqual(M.concat(x, y), {
      a: 'a1',
      d: 'd2'
    })
  })
})
