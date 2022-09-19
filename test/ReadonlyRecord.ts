import * as assert from 'assert'
import * as E from '../src/Either'
import { identity, pipe } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import { reverse } from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyRecord'
import * as Se from '../src/Semigroup'
import { separated } from '../src/Separated'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('ReadonlyRecord', () => {
  describe('pipeables', () => {
    it('collect', () => {
      const x: { readonly a: string; readonly b: boolean } = { a: 'c', b: false }
      U.deepStrictEqual(_.collect(S.Ord)((key, val) => ({ key: key, value: val }))(x), [
        { key: 'a', value: 'c' },
        { key: 'b', value: false }
      ])
      U.deepStrictEqual(_.collect((key, val) => ({ key: key, value: val }))(x), [
        { key: 'a', value: 'c' },
        { key: 'b', value: false }
      ])
    })

    it('map', () => {
      U.deepStrictEqual(pipe({ k1: 1, k2: 2 }, _.map(U.double)), { k1: 2, k2: 4 })
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, _.map(U.double)), { a: 2, b: 4 })
      U.deepStrictEqual(_.Functor.map({ a: 1, b: 2 }, U.double), { a: 2, b: 4 })
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
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
          _.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Ord)(S.Monoid)(identity)), 'ab')
      U.deepStrictEqual(_.getFoldable(S.Ord).foldMap(S.Monoid)({ a: 'a', b: 'b' }, identity), 'ab')

      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.foldMap(S.Monoid)(identity)), 'ab')
      U.deepStrictEqual(_.Foldable.foldMap(S.Monoid)({ a: 'a', b: 'b' }, identity), 'ab')
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight(S.Ord)('', f)), 'ba')
      U.deepStrictEqual(pipe({ a: 'a', b: 'b' }, _.reduceRight('', f)), 'ba')
    })

    it('compact', () => {
      U.deepStrictEqual(_.compact({ foo: O.none, bar: O.some(123) }), { bar: 123 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, O.Option<number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.compact), {})
    })

    it('separate', () => {
      U.deepStrictEqual(_.separate({ foo: E.left(123), bar: E.right(123) }), separated({ foo: 123 }, { bar: 123 }))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, E.Either<string, number>> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, _.separate), separated({}, {}))
    })

    it('filter', () => {
      const d = { a: 1, b: 3 }
      U.deepStrictEqual(pipe(d, _.filter(p)), { b: 3 })

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      const y: _.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
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
      const f = (n: number) => (p(n) ? E.right(n + 1) : E.left(n - 1))
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
          _.reduceWithIndex('', (k, b, a) => b + k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
        pipe(
          { k2: 'b', k1: 'a' },
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
          _.foldMapWithIndex(S.Monoid)((k, a) => k + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
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
          _.reduceRightWithIndex('', (k, a, b) => b + k + a)
        ),
        'k2bk1a'
      )
    })

    it('partitionMapWithIndex', () => {
      const f = _.partitionMapWithIndex((k, a: number) => (a > 1 ? E.right(a) : E.left(k)))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), separated({ a: 'a' }, { b: 2 }))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), separated({}, {}))
    })

    it('partitionWithIndex', () => {
      const f = _.partitionWithIndex((_, a: number) => a > 1)
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), separated({ a: 1 }, { b: 2 }))
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), separated({}, {}))
    })

    it('filterMapWithIndex', () => {
      const f = _.filterMapWithIndex((_, a: number) => (a > 1 ? O.some(a) : O.none))
      U.deepStrictEqual(pipe({ a: 1, b: 2 }, f), { b: 2 })
      // should ignore non own properties
      const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
      U.deepStrictEqual(pipe(o, f), {})
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
        _.readonlyRecord.sequence(O.Applicative)({ a: O.some(1), b: O.some(2) }),
        O.some({ a: 1, b: 2 })
      )
    })

    describe('traverseWithIndex', () => {
      it('simple Traversal', () => {
        const f = (k: string, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
        const traverseWithIndex = _.traverseWithIndex(O.Applicative)(f)
        U.deepStrictEqual(pipe({ a: 1, b: 2 }, traverseWithIndex), O.none)
        U.deepStrictEqual(pipe({ b: 2 }, traverseWithIndex), O.some({ b: 2 }))
      })

      it('should not modify arrays in place', () => {
        const result = pipe(
          { a: 2, b: 3 },
          _.fromRecord,
          _.traverseWithIndex(RA.Applicative)((_, n) => RA.makeBy(n, (i) => i * 4))
        )

        U.deepStrictEqual(result, [
          { a: 0, b: 0 },
          { a: 0, b: 4 },
          { a: 0, b: 8 },
          { a: 4, b: 0 },
          { a: 4, b: 4 },
          { a: 4, b: 8 }
        ])
      })
    })

    it('getTraversableWithIndex', () => {
      const TWI = _.getTraversableWithIndex(reverse(S.Ord))
      const f = (k: string, n: number): O.Option<number> => (k !== 'a' ? O.some(n) : O.none)
      U.deepStrictEqual(TWI.traverseWithIndex(O.Applicative)({ b: 2 }, f), O.some({ b: 2 }))
      U.deepStrictEqual(TWI.traverseWithIndex(O.Applicative)({ a: 1, b: 2 }, f), O.none)
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
      const wilt = _.wilt(T.ApplicativePar)((n: number) => T.of(p(n) ? E.right(n + 1) : E.left(n - 1)))
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
    // should ignore non own properties
    const o = Object.create({ a: 1 })
    o.k2 = 2
    o.k3 = 4
    U.deepStrictEqual(M.concat(d1, o), { k1: 1, k2: 5, k3: 4 })
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
    U.deepStrictEqual(_.fromFoldable(First, RA.Foldable)([['a', 1]]), { a: 1 })
    U.deepStrictEqual(
      _.fromFoldable(
        First,
        RA.Foldable
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
        RA.Foldable
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 2
      }
    )
  })

  it('toReadonlyArray', () => {
    U.deepStrictEqual(_.toReadonlyArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    U.deepStrictEqual(_.toReadonlyArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    U.deepStrictEqual(_.toUnfoldable(RA.Unfoldable)({ a: 1 }), [['a', 1]])
  })

  it('toEntries', () => {
    U.deepStrictEqual(_.toEntries({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('fromEntries', () => {
    U.deepStrictEqual(
      _.fromEntries([
        ['a', 1],
        ['b', 2],
        ['a', 3]
      ]),
      { b: 2, a: 3 }
    )
  })

  it('traverseWithIndex should sort the keys', () => {
    const log: Array<string> = []
    const append =
      (message: string): IO.IO<void> =>
      () => {
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
    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty({}), true)
    U.deepStrictEqual(_.isEmpty({ a: 1 }), false)
    // should ignore non own properties
    U.deepStrictEqual(_.isEmpty(Object.create({ a: 1 })), true)
  })

  it('insertAt', () => {
    U.deepStrictEqual(_.insertAt('a', 1)({}), { a: 1 })
    U.deepStrictEqual(_.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
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
    assert.deepStrictEqual(_.pop('a')({ a: 1, b: 2 }), O.some([1, { b: 2 }]))
    U.deepStrictEqual(_.pop('c')({ a: 1, b: 2 }), O.none)
  })

  it('every', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    U.deepStrictEqual(_.every((n: number) => n <= 2)(x), true)
    U.deepStrictEqual(_.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
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
    const zipObject = <K extends string, A>(keys: ReadonlyArray<K>, values: ReadonlyArray<A>): _.ReadonlyRecord<K, A> =>
      _.fromFoldableMap(Se.last<A>(), RA.Foldable)(RA.zip(keys, values), identity)

    U.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: ReadonlyArray<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    U.deepStrictEqual(
      _.fromFoldableMap(Se.last<User>(), RA.Foldable)(users, (user) => [user.id, user]),
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

    const DepSh = _.getShow(S.Show)
    U.deepStrictEqual(DepSh.show({}), `{}`)
    U.deepStrictEqual(DepSh.show({ a: 'a' }), `{ "a": "a" }`)
    U.deepStrictEqual(DepSh.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    U.deepStrictEqual(_.singleton('a', 1), { a: 1 })
  })

  it('has', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.has('a', x), true)
    U.deepStrictEqual(_.has('b', x), false)
    // TODO: remove in v3
    // #1249
    // eslint-disable-next-line no-prototype-builtins
    U.deepStrictEqual(_.hasOwnProperty('a', x), true)
    // eslint-disable-next-line no-prototype-builtins
    U.deepStrictEqual(_.hasOwnProperty('b', x), false)
    // eslint-disable-next-line deprecation/deprecation
    const hasOwnProperty: any = _.hasOwnProperty
    U.deepStrictEqual(hasOwnProperty.call(x, 'a'), true)
    U.deepStrictEqual(hasOwnProperty.call(x, 'b'), false)
  })

  it('updateAt', () => {
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
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
    const x: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(_.modifyAt('b', (n: number) => n * 2)(x), O.none)
    U.deepStrictEqual(_.modifyAt('a', (n: number) => n * 2)(x), O.some({ a: 2 }))
    // should return the same reference if nothing changed
    const input: _.ReadonlyRecord<string, number> = { a: 1 }
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt('a', identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('fromRecord', () => {
    const as = { a: 1, b: 2 }
    const bs = _.fromRecord(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toRecord', () => {
    const as: _.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const bs = _.toRecord(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(S.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(M.concat(x, M.empty), x)
    U.strictEqual(M.concat(M.empty, x), x)
    U.strictEqual(M.concat(x, {}), x)
    U.strictEqual(M.concat({}, x), x)
    U.deepStrictEqual(M.concat(x, y), {
      a: 'a1',
      b: 'b1b2',
      c: 'c1c2',
      d: 'd2'
    })
  })

  it('getIntersectionSemigroup', () => {
    const M = _.getIntersectionSemigroup(S.Semigroup)
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(M.concat(x, _.empty), _.empty)
    U.strictEqual(M.concat(x, _.empty), _.empty)
    U.strictEqual(M.concat(x, {}), _.empty)
    U.strictEqual(M.concat(x, {}), _.empty)
    U.deepStrictEqual(M.concat(x, y), {
      b: 'b1b2',
      c: 'c1c2'
    })
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma<string>()
    const x: _.ReadonlyRecord<string, string> = {
      a: 'a1',
      b: 'b1',
      c: 'c1'
    }
    const y: _.ReadonlyRecord<string, string> = {
      b: 'b2',
      c: 'c2',
      d: 'd2'
    }
    U.strictEqual(M.concat(_.empty, x), x)
    U.strictEqual(M.concat(x, _.empty), x)
    U.strictEqual(M.concat({}, x), x)
    U.strictEqual(M.concat(x, {}), x)
    U.deepStrictEqual(M.concat(x, y), {
      a: 'a1',
      d: 'd2'
    })
  })

  it('mapWithIndex', () => {
    // should ignore non own properties
    const o: _.ReadonlyRecord<string, number> = Object.create({ a: 1 })
    U.deepStrictEqual(
      pipe(
        o,
        _.mapWithIndex((_, a) => U.double(a))
      ),
      {}
    )
  })
})
