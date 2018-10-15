import * as assert from 'assert'
import * as R from '../src/Record'
import { semigroupSum } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import { array } from '../src/Array'
import { left, right } from '../src/Either'
import * as I from '../src/Identity'

const p = (n: number) => n > 2

describe('Record', () => {
  it('getMonoid', () => {
    const d1 = { k1: 1, k2: 3 }
    const d2 = { k2: 2, k3: 4 }
    const S2 = R.getMonoid(semigroupSum)
    assert.deepEqual(S2.concat(d1, d2), { k1: 1, k2: 5, k3: 4 })
  })

  it('map', () => {
    const d1 = { k1: 1, k2: 2 }
    const double = (n: number): number => n * 2
    assert.deepEqual(R.map(d1, double), { k1: 2, k2: 4 })
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
    assert.deepEqual(R.traverse(option)({ k1: 1, k2: 2 }, n => (n <= 2 ? some(n) : none)), some({ k1: 1, k2: 2 }))
    assert.deepEqual(R.traverse(option)({ k1: 1, k2: 2 }, n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = R.sequence(option)
    const x1 = { k1: some(1), k2: some(2) }
    assert.deepEqual(sequence(x1), some({ k1: 1, k2: 2 }))
    const x2 = { k1: none, k2: some(2) }
    assert.deepEqual(sequence(x2), none)
  })

  it('getSetoid', () => {
    assert.strictEqual(R.getSetoid(setoidNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.strictEqual(R.getSetoid(setoidNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.strictEqual(R.getSetoid(setoidNumber).equals({ a: 1 }, { b: 1 }), false)
  })

  it('lookup', () => {
    assert.deepEqual(R.lookup('a', { a: 1 }), some(1))
    assert.deepEqual(R.lookup('b', { a: 1 }), none)
  })

  it('fromFoldable', () => {
    assert.deepEqual(R.fromFoldable(array)([['a', 1]], (existing, _) => existing), { a: 1 })
    assert.deepEqual(R.fromFoldable(array)([['a', 1], ['a', 2]], (existing, _) => existing), {
      a: 1
    })
    assert.deepEqual(R.fromFoldable(array)([['a', 1], ['a', 2]], (_, a) => a), {
      a: 2
    })
  })

  it('toArray', () => {
    assert.deepEqual(R.toArray({ a: 1, b: 2 }), [['a', 1], ['b', 2]])
    assert.deepEqual(R.toArray({ b: 2, a: 1 }), [['a', 1], ['b', 2]])
  })

  it('toUnfoldable', () => {
    assert.deepEqual(R.toUnfoldable(array)({ a: 1 }), [['a', 1]])
  })

  it('mapWithKey', () => {
    assert.deepEqual(R.mapWithKey({ aa: 1 }, (k, a) => a + k.length), { aa: 3 })
  })

  it('traverseWithKey', () => {
    const d1 = { k1: 1, k2: 2 }
    const t1 = R.traverseWithKey(option)(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
    assert.deepEqual(t1, none)
    const d2 = { k1: 2, k2: 3 }
    const t2 = R.traverseWithKey(option)(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
    assert.deepEqual(t2, some({ k1: 2, k2: 3 }))
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
    assert.deepEqual(R.insert('a', 1, {}), { a: 1 })
    assert.deepEqual(R.insert('c', 3, { a: 1, b: 2 }), { a: 1, b: 2, c: 3 })
  })

  it('remove', () => {
    assert.deepEqual(R.remove('a', { a: 1, b: 2 }), { b: 2 })
  })

  it('pop', () => {
    assert.deepEqual(R.pop('a', { a: 1, b: 2 }), some([1, { b: 2 }]))
    assert.deepEqual(R.pop('c', { a: 1, b: 2 }), none)
  })

  it('compact', () => {
    assert.deepEqual(R.compact({ foo: none, bar: some(123) }), { bar: 123 })
  })

  it('separate', () => {
    assert.deepEqual(R.separate({ foo: left(123), bar: right(123) }), {
      left: { foo: 123 },
      right: { bar: 123 }
    })
  })

  it('filter', () => {
    const d = { a: 1, b: 3 }
    assert.deepEqual(R.filter(d, p), { b: 3 })
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepEqual(R.filterMap({}, f), {})
    assert.deepEqual(R.filterMap({ a: 1, b: 3 }, f), { b: 4 })
  })

  it('partition', () => {
    assert.deepEqual(R.partition({}, p), { left: {}, right: {} })
    assert.deepEqual(R.partition({ a: 1, b: 3 }, p), {
      left: { a: 1 },
      right: { b: 3 }
    })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(R.partitionMap({}, f), { left: {}, right: {} })
    assert.deepEqual(R.partitionMap({ a: 1, b: 3 }, f), {
      left: { a: 0 },
      right: { b: 4 }
    })
  })

  it('wither', () => {
    const witherIdentity = R.wither(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
    assert.deepEqual(witherIdentity({}, f), new I.Identity({}))
    assert.deepEqual(witherIdentity({ a: 1, b: 3 }, f), new I.Identity({ b: 4 }))
  })

  it('wilt', () => {
    const wiltIdentity = R.wilt(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(wiltIdentity({}, f), new I.Identity({ left: {}, right: {} }))
    assert.deepEqual(wiltIdentity({ a: 1, b: 3 }, f), new I.Identity({ left: { a: 0 }, right: { b: 4 } }))
  })
})
