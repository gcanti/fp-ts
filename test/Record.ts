import * as assert from 'assert'
import * as R from '../src/Record'
import { semigroupSum, getLastSemigroup } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { eqNumber } from '../src/Eq'
import { array, zip } from '../src/Array'
import { left, right } from '../src/Either'
import * as I from '../src/Identity'
import { showString } from '../src/Show'

const p = (n: number) => n > 2

describe('Record', () => {
  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const S2 = R.getMonoid(semigroupSum)
    assert.deepStrictEqual(S2.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
  })

  it('map', () => {
    const d1 = { k1: 1, k2: 2 }
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(R.map(d1, double), { k1: 2, k2: 4 })
  })

  it('reduce', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.strictEqual(R.reduce(d1, '', (b, a) => b + a), 'ab')
    const d2 = { k2: 'b', k1: 'a' }
    assert.strictEqual(R.reduce(d2, '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = R.foldMap(monoidString)
    const x1 = { a: 'a', b: 'b' }
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'ab')
  })

  it('foldr', () => {
    const foldr = R.foldr
    const x1 = { a: 'a', b: 'b' }
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'ba')
  })

  it('traverse', () => {
    assert.deepStrictEqual(R.traverse(option)({ k1: 1, k2: 2 }, n => (n <= 2 ? some(n) : none)), some({ k1: 1, k2: 2 }))
    assert.deepStrictEqual(R.traverse(option)({ k1: 1, k2: 2 }, n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = R.sequence(option)
    const x1 = { k1: some(1), k2: some(2) }
    assert.deepStrictEqual(sequence(x1), some({ k1: 1, k2: 2 }))
    const x2 = { k1: none, k2: some(2) }
    assert.deepStrictEqual(sequence(x2), none)
  })

  it('getEq', () => {
    assert.strictEqual(R.getEq(eqNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.strictEqual(R.getEq(eqNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.strictEqual(R.getEq(eqNumber).equals({ a: 1 }, { b: 1 }), false)
  })

  it('lookup', () => {
    assert.deepStrictEqual(R.lookup('a', { a: 1 }), some(1))
    assert.deepStrictEqual(R.lookup('b', { a: 1 }), none)
  })

  it('fromFoldable', () => {
    assert.deepStrictEqual(R.fromFoldable(array)([['a', 1]], (existing, _) => existing), { a: 1 })
    assert.deepStrictEqual(R.fromFoldable(array)([['a', 1], ['a', 2]], (existing, _) => existing), {
      a: 1
    })
    assert.deepStrictEqual(R.fromFoldable(array)([['a', 1], ['a', 2]], (_, a) => a), {
      a: 2
    })
  })

  it('toArray', () => {
    assert.deepStrictEqual(R.toArray({ a: 1, b: 2 }), [['a', 1], ['b', 2]])
    assert.deepStrictEqual(R.toArray({ b: 2, a: 1 }), [['a', 1], ['b', 2]])
  })

  it('toUnfoldable', () => {
    assert.deepStrictEqual(R.toUnfoldable(array)({ a: 1 }), [['a', 1]])
  })

  it('mapWithKey', () => {
    assert.deepStrictEqual(R.mapWithKey({ aa: 1 }, (k, a) => a + k.length), { aa: 3 })
  })

  it('traverseWithKey', () => {
    const d1 = { k1: 1, k2: 2 }
    const t1 = R.traverseWithKey(option)(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
    assert.deepStrictEqual(t1, none)
    const d2 = { k1: 2, k2: 3 }
    const t2 = R.traverseWithKey(option)(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
    assert.deepStrictEqual(t2, some({ k1: 2, k2: 3 }))
    const t3 = R.traverseWithKey(option)({}, (k, n): Option<number> => none)
    assert.strictEqual(t3.getOrElse({}), R.empty)
  })

  it('size', () => {
    assert.strictEqual(R.size({}), 0)
    assert.strictEqual(R.size({ a: 1 }), 1)
  })

  it('isEmpty', () => {
    assert.strictEqual(R.isEmpty({}), true)
    assert.strictEqual(R.isEmpty({ a: 1 }), false)
  })

  it('insert', () => {
    assert.deepStrictEqual(R.insert('a', 1, {}), { a: 1 })
    assert.deepStrictEqual(R.insert('c', 3, { a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
    // should return the same reference if the value is already there
    const x = { a: 1 }
    assert.strictEqual(R.insert('a', 1, x), x)
  })

  it('remove', () => {
    assert.deepStrictEqual(R.remove('a', { a: 1, b: 2 }), { b: 2 })
    // should return the same reference if the key is missing
    const x = { a: 1 }
    assert.strictEqual(R.remove('b', x), x)
  })

  it('pop', () => {
    assert.deepStrictEqual(R.pop('a', { a: 1, b: 2 }), some([1, { b: 2 }]))
    assert.deepStrictEqual(R.pop('c', { a: 1, b: 2 }), none)
  })

  it('compact', () => {
    assert.deepStrictEqual(R.compact({ foo: none, bar: some(123) }), { bar: 123 })
  })

  it('separate', () => {
    assert.deepStrictEqual(R.separate({ foo: left(123), bar: right(123) }), {
      left: { foo: 123 },
      right: { bar: 123 }
    })
  })

  it('filter', () => {
    const d = { a: 1, b: 3 }
    assert.deepStrictEqual(R.filter(d, p), { b: 3 })

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const y: Record<string, string | number> = { a: 1, b: 'foo' }
    const actual = R.filter(y, isNumber)
    assert.deepStrictEqual(actual, { a: 1 })

    assert.strictEqual(R.filter(y, _ => true), y)

    const x = Object.assign(Object.create({ c: true }), { a: 1, b: 'foo' })
    assert.deepStrictEqual(R.filter(x, isNumber), { a: 1 })
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(R.filterMap({}, f), {})
    assert.deepStrictEqual(R.filterMap({ a: 1, b: 3 }, f), { b: 4 })
  })

  it('partition', () => {
    assert.deepStrictEqual(R.partition({}, p), { left: {}, right: {} })
    assert.deepStrictEqual(R.partition({ a: 1, b: 3 }, p), {
      left: { a: 1 },
      right: { b: 3 }
    })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(R.partitionMap({}, f), { left: {}, right: {} })
    assert.deepStrictEqual(R.partitionMap({ a: 1, b: 3 }, f), {
      left: { a: 0 },
      right: { b: 4 }
    })
  })

  it('wither', () => {
    const witherIdentity = R.wither(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(witherIdentity({}, f), new I.Identity<Record<string, number>>({}))
    assert.deepStrictEqual(witherIdentity({ a: 1, b: 3 }, f), new I.Identity({ b: 4 }))
  })

  it('wilt', () => {
    const wiltIdentity = R.wilt(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(wiltIdentity({}, f), new I.Identity({ left: {}, right: {} }))
    assert.deepStrictEqual(wiltIdentity({ a: 1, b: 3 }, f), new I.Identity({ left: { a: 0 }, right: { b: 4 } }))
  })

  it('reduceWithKey', () => {
    const d1 = { k1: 'a', k2: 'b' }
    assert.strictEqual(R.reduceWithKey(d1, '', (k, b, a) => b + k + a), 'k1ak2b')
    const d2 = { k2: 'b', k1: 'a' }
    assert.strictEqual(R.reduceWithKey(d2, '', (k, b, a) => b + k + a), 'k1ak2b')
  })

  it('foldMapWithKey', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.strictEqual(R.foldMapWithKey(monoidString)(x1, (k, a) => k + a), 'k1ak2b')
  })

  it('foldrWithKey', () => {
    const x1 = { k1: 'a', k2: 'b' }
    assert.strictEqual(R.foldrWithKey(x1, '', (k, a, b) => b + k + a), 'k2bk1a')
  })

  it('every', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: { [key: string]: number } = { a: 1, b: 2 }
    assert.strictEqual(R.every(x, n => n <= 2), true)
    assert.strictEqual(R.every(y, n => n <= 1), false)
  })

  it('some', () => {
    const x: Record<string, number> = { a: 1, b: 2 }
    const y: { [key: string]: number } = { a: 1, b: 2 }
    assert.strictEqual(R.some(x, n => n <= 1), true)
    assert.strictEqual(R.some(y, n => n <= 0), false)
  })

  it('elem', () => {
    assert.strictEqual(R.elem(eqNumber)(1, { a: 1, b: 2 }), true)
    assert.strictEqual(R.elem(eqNumber)(3, { a: 1, b: 2 }), false)
  })

  it('partitionMapWithIndex', () => {
    const x = { a: 'a', b: 'b' }
    const expected = {
      left: { b: 'b' },
      right: { a: 1 }
    }
    const f = (k: string, a: string) => (k === 'a' ? right(a.length) : left(a))
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(R.partitionMapWithIndex(x, f), expected)
  })

  it('partitionWithIndex', () => {
    const x = { a: 'a', b: 'b' }
    const f = (k: string) => k === 'a'
    const expected = {
      left: { b: 'b' },
      right: { a: 'a' }
    }
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(R.partitionWithIndex(x, f), expected)
  })

  it('filterMapWithIndex', () => {
    const x = { a: 'a', b: 'b' }
    const f = (k: string, a: string) => (k === 'a' ? some(a.length) : none)
    const expected = {
      a: 1
    }
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(R.filterMapWithIndex(x, f), expected)
  })

  it('filterWithIndex', () => {
    const x = { a: 'a', b: 'b' }
    const f = (k: string) => k === 'a'
    const expected = { a: 'a' }
    // tslint:disable-next-line: deprecation
    assert.deepStrictEqual(R.filterWithIndex(x, f), expected)
  })

  it('fromFoldableMap', () => {
    const zipObject = <K extends string, A>(keys: Array<K>, values: Array<A>): Record<K, A> =>
      R.fromFoldableMap(getLastSemigroup<A>(), array)(zip(keys, values), identity)

    assert.deepStrictEqual(zipObject(['a', 'b'], [1, 2, 3]), { a: 1, b: 2 })

    interface User {
      id: string
      name: string
    }

    const users: Array<User> = [
      { id: 'id1', name: 'name1' },
      { id: 'id2', name: 'name2' },
      { id: 'id1', name: 'name3' }
    ]

    assert.deepStrictEqual(R.fromFoldableMap(getLastSemigroup<User>(), array)(users, user => [user.id, user]), {
      id1: { id: 'id1', name: 'name3' },
      id2: { id: 'id2', name: 'name2' }
    })
  })

  it('getShow', () => {
    const S = R.getShow(showString)
    assert.strictEqual(S.show({}), `{}`)
    assert.strictEqual(S.show({ a: 'a' }), `{ "a": "a" }`)
    assert.strictEqual(S.show({ a: 'a', b: 'b' }), `{ "a": "a", "b": "b" }`)
  })
})
