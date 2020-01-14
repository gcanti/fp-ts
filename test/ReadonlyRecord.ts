import * as assert from 'assert'
import * as RR from '../src/ReadonlyRecord'
import { semigroupSum, getLastSemigroup, getFirstSemigroup } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { option, some, none, Option, getOrElse, isSome } from '../src/Option'
import { eqNumber } from '../src/Eq'
import { array, zip } from '../src/Array'
import { left, right } from '../src/Either'
import * as I from '../src/Identity'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

const noPrototype = Object.create(null)

describe('Record', () => {
  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const M = RR.getMonoid(semigroupSum)
    assert.deepStrictEqual(M.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
    assert.deepStrictEqual(M.concat(d1, M.empty), d1)
    assert.deepStrictEqual(M.concat(M.empty, d2), d2)
    assert.deepStrictEqual(M.concat(d1, {}), d1)
  })

  it('map', () => {
    const d1 = { k1: 1, k2: 2 }
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(RR.map(double)(d1), { k1: 2, k2: 4 })
    assert.deepStrictEqual(RR.readonlyRecord.map({ a: 1, b: 2 }, double), { a: 2, b: 4 })
  })

  it('reduce', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(
      RR.readonlyRecord.reduce(d1, '', (b, a) => b + a),
      'ab'
    )
    const d2 = { k2: 'b', k1: 'a' }
    assert.deepStrictEqual(
      RR.readonlyRecord.reduce(d2, '', (b, a) => b + a),
      'ab'
    )
  })

  it('foldMap', () => {
    const foldMap = RR.readonlyRecord.foldMap(monoidString)
    const x1 = { a: 'a', b: 'b' }
    const f1 = identity
    assert.deepStrictEqual(foldMap(x1, f1), 'ab')
  })

  it('reduceRight', () => {
    const reduceRight = RR.readonlyRecord.reduceRight
    const x1 = { a: 'a', b: 'b' }
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.deepStrictEqual(reduceRight(x1, init1, f1), 'ba')
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      RR.traverse(option)((n: number) => (n <= 2 ? some(n) : none))({ k1: 1, k2: 2 }),
      some({ k1: 1, k2: 2 })
    )
    assert.deepStrictEqual(RR.traverse(option)((n: number) => (n >= 2 ? some(n) : none))({ k1: 1, k2: 2 }), none)
  })

  it('sequence', () => {
    const sequence = RR.sequence(option)
    const x1 = { k1: some(1), k2: some(2) }
    assert.deepStrictEqual(sequence(x1), some({ k1: 1, k2: 2 }))
    const x2 = { k1: none, k2: some(2) }
    assert.deepStrictEqual(sequence(x2), none)
  })

  it('getEq', () => {
    assert.deepStrictEqual(RR.getEq(eqNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.deepStrictEqual(RR.getEq(eqNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.deepStrictEqual(RR.getEq(eqNumber).equals({ a: 1 }, { b: 1 }), false)
    assert.deepStrictEqual(RR.getEq(eqNumber).equals(noPrototype, { b: 1 }), false)
  })

  it('lookup', () => {
    assert.deepStrictEqual(RR.lookup('a', { a: 1 }), some(1))
    assert.deepStrictEqual(RR.lookup('b', { a: 1 }), none)
    assert.deepStrictEqual(RR.lookup('b', noPrototype), none)
  })

  it('fromFoldable', () => {
    const First = getFirstSemigroup<number>()
    assert.deepStrictEqual(RR.fromFoldable(First, array)([['a', 1]]), { a: 1 })
    assert.deepStrictEqual(
      RR.fromFoldable(
        First,
        array
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 1
      }
    )
    const Last = getLastSemigroup<number>()
    assert.deepStrictEqual(
      RR.fromFoldable(
        Last,
        array
      )([
        ['a', 1],
        ['a', 2]
      ]),
      {
        a: 2
      }
    )
  })

  it('toArray', () => {
    assert.deepStrictEqual(RR.toArray({ a: 1, b: 2 }), [
      ['a', 1],
      ['b', 2]
    ])
    assert.deepStrictEqual(RR.toArray({ b: 2, a: 1 }), [
      ['a', 1],
      ['b', 2]
    ])
  })

  it('toUnfoldable', () => {
    assert.deepStrictEqual(RR.toUnfoldable(array)({ a: 1 }), [['a', 1]])
  })

  it('traverseWithIndex', () => {
    const d1 = { k1: 1, k2: 2 }
    const t1 = RR.traverseWithIndex(option)((k, n: number): Option<number> => (k !== 'k1' ? some(n) : none))(d1)
    assert.deepStrictEqual(t1, none)
    const t2 = RR.traverseWithIndex(option)((): Option<number> => none)(RR.empty)
    assert.deepStrictEqual(getOrElse((): RR.ReadonlyRecord<string, number> => RR.empty)(t2), RR.empty)
  })

  it('size', () => {
    assert.deepStrictEqual(RR.size({}), 0)
    assert.deepStrictEqual(RR.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    assert.deepStrictEqual(RR.isEmpty({}), true)
    assert.deepStrictEqual(RR.isEmpty({ a: 1 }), false)
  })

  it('insertAt', () => {
    assert.deepStrictEqual(RR.insertAt('a', 1)({}), { a: 1 })
    assert.deepStrictEqual(RR.insertAt('c', 3)({ a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    assert.deepStrictEqual(RR.insertAt('a', 1)(x), x)
  })

  it('deleteAt', () => {
    assert.deepStrictEqual(RR.deleteAt('a')({ a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    assert.deepStrictEqual(RR.deleteAt('b')(x), x)
    assert.deepStrictEqual(RR.deleteAt('b')(noPrototype), noPrototype)
  })

  it('pop', () => {
    assert.deepStrictEqual(RR.pop('a')({ a: 1, b: 2 }), some([1, { b: 2 }]))
    assert.deepStrictEqual(RR.pop('c')({ a: 1, b: 2 }), none)
  })

  it('compact', () => {
    assert.deepStrictEqual(RR.readonlyRecord.compact({ foo: none, bar: some(123) }), { bar: 123 })
  })

  it('separate', () => {
    assert.deepStrictEqual(RR.readonlyRecord.separate({ foo: left(123), bar: right(123) }), {
      left: { foo: 123 },
      right: { bar: 123 }
    })
  })

  it('filter', () => {
    const d = { a: 1, b: 3 }
    assert.deepStrictEqual(RR.readonlyRecord.filter(d, p), { b: 3 })

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const y: RR.ReadonlyRecord<string, string | number> = { a: 1, b: 'foo' }
    const actual = RR.readonlyRecord.filter(y, isNumber)
    assert.deepStrictEqual(actual, { a: 1 })

    assert.deepStrictEqual(
      RR.readonlyRecord.filter(y, _ => true),
      y
    )

    const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
    assert.deepStrictEqual(RR.readonlyRecord.filter(x, isNumber), { a: 1 })

    assert.deepStrictEqual(RR.readonlyRecord.filter(noPrototype, isNumber), noPrototype)
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(RR.readonlyRecord.filterMap({}, f), {})
    assert.deepStrictEqual(RR.readonlyRecord.filterMap({ a: 1, b: 3 }, f), { b: 4 })
  })

  it('partition', () => {
    assert.deepStrictEqual(RR.readonlyRecord.partition({}, p), { left: {}, right: {} })
    assert.deepStrictEqual(RR.readonlyRecord.partition({ a: 1, b: 3 }, p), {
      left: { a: 1 },
      right: { b: 3 }
    })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(RR.readonlyRecord.partitionMap({}, f), { left: {}, right: {} })
    assert.deepStrictEqual(RR.readonlyRecord.partitionMap({ a: 1, b: 3 }, f), {
      left: { a: 0 },
      right: { b: 4 }
    })
  })

  it('wither', () => {
    const witherIdentity = RR.readonlyRecord.wither(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(witherIdentity({}, f), I.identity.of<RR.ReadonlyRecord<string, number>>({}))
    assert.deepStrictEqual(witherIdentity({ a: 1, b: 3 }, f), I.identity.of({ b: 4 }))
  })

  it('wilt', () => {
    const wiltIdentity = RR.readonlyRecord.wilt(I.identity)
    const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity({}, f), I.identity.of({ left: {}, right: {} }))
    assert.deepStrictEqual(wiltIdentity({ a: 1, b: 3 }, f), I.identity.of({ left: { a: 0 }, right: { b: 4 } }))
  })

  it('reduceWithIndex', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(RR.reduceWithIndex('', (k, b, a) => b + k + a)(d1), 'k1ak2b')
    const d2 = { k2: 'b', k1: 'a' }
    assert.deepStrictEqual(RR.reduceWithIndex('', (k, b, a) => b + k + a)(d2), 'k1ak2b')
  })

  it('foldMapWithIndex', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(RR.foldMapWithIndex(monoidString)((k, a) => k + a)(x1), 'k1ak2b')
  })

  it('reduceRightWithIndex', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.deepStrictEqual(RR.reduceRightWithIndex('', (k, a, b) => b + k + a)(x1), 'k2bk1a')
  })

  it('every', () => {
    const x: RR.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: RR.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(RR.every((n: number) => n <= 2)(x), true)
    assert.deepStrictEqual(RR.every((n: number) => n <= 1)(y), false)
  })

  it('some', () => {
    const x: RR.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    const y: RR.ReadonlyRecord<string, number> = { a: 1, b: 2 }
    assert.deepStrictEqual(RR.some((n: number) => n <= 1)(x), true)
    assert.deepStrictEqual(RR.some((n: number) => n <= 0)(y), false)
  })

  it('elem', () => {
    assert.deepStrictEqual(RR.elem(eqNumber)(1, { a: 1, b: 2 }), true)
    assert.deepStrictEqual(RR.elem(eqNumber)(3, { a: 1, b: 2 }), false)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): RR.ReadonlyRecord<K, A> =>
      RR.fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)

    assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      readonly id: string
      readonly name: string
    }

    const users: Array<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    assert.deepStrictEqual(
      RR.fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]),
      {
        id1: { id: 'id1', name: 'name3' },
        id2: { id: 'id2', name: 'name2' }
      }
    )
  })

  it('getShow', () => {
    const S = RR.getShow(showString)
    assert.deepStrictEqual(S.show({}), `{}`)
    assert.deepStrictEqual(S.show({ a: 'a' }), `{ "a": "a" }`)
    assert.deepStrictEqual(S.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })

  it('singleton', () => {
    assert.deepStrictEqual(RR.singleton('a', 1), { a: 1 })
  })

  it('hasOwnProperty', () => {
    const x: RR.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(RR.hasOwnProperty('a', x), true)
    assert.deepStrictEqual(RR.hasOwnProperty('b', x), false)
  })

  it('partitionMapWithIndex', () => {
    assert.deepStrictEqual(RR.partitionMapWithIndex((k, a: number) => (a > 1 ? right(a) : left(k)))({ a: 1, b: 2 }), {
      left: { a: 'a' },
      right: { b: 2 }
    })
  })

  it('partitionWithIndex', () => {
    assert.deepStrictEqual(RR.partitionWithIndex((_, a: number) => a > 1)({ a: 1, b: 2 }), {
      left: { a: 1 },
      right: { b: 2 }
    })
  })

  it('filterMapWithIndex', () => {
    assert.deepStrictEqual(RR.filterMapWithIndex((_, a: number) => (a > 1 ? some(a) : none))({ a: 1, b: 2 }), { b: 2 })
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(RR.filterWithIndex((_, a: number) => a > 1)({ a: 1, b: 2 }), { b: 2 })
  })

  it('updateAt', () => {
    const x: RR.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(RR.updateAt('b', 2)(x), none)
    assert.deepStrictEqual(RR.updateAt('a', 2)(x), some({ a: 2 }))
    const r = RR.updateAt('a', 1)(x)
    if (isSome(r)) {
      assert.deepStrictEqual(r.value, x)
    } else {
      assert.fail()
    }
  })

  it('modifyAt', () => {
    const x: RR.ReadonlyRecord<string, number> = { a: 1 }
    assert.deepStrictEqual(RR.modifyAt('b', (n: number) => n * 2)(x), none)
    assert.deepStrictEqual(RR.modifyAt('a', (n: number) => n * 2)(x), some({ a: 2 }))
  })
})
