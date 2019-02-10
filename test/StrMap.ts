import * as assert from 'assert'
import { array } from '../src/Array'
import { left, right } from '../src/Either'
import * as F from '../src/Foldable'
import { identity } from '../src/function'
import * as I from '../src/Identity'
import { monoidString } from '../src/Monoid'
import { none, Option, option, some } from '../src/Option'
import { semigroupSum } from '../src/Semigroup'
import { setoidNumber } from '../src/Setoid'
import {
  fromFoldable,
  getMonoid,
  getSetoid,
  insert,
  isEmpty,
  lookup,
  pop,
  remove,
  size,
  StrMap,
  strmap,
  toArray,
  toUnfoldable,
  traverseWithKey,
  singleton,
  isSubdictionary,
  collect
} from '../src/StrMap'
import * as T from '../src/Traversable'

const p = (n: number) => n > 2

describe('StrMap', () => {
  it('getMonoid', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 3 })
    const d2 = new StrMap<number>({ k2: 2, k3: 4 })
    const S1 = getMonoid<number>()
    assert.deepStrictEqual(S1.concat(d1, d2), new StrMap({ k1: 1, k2: 2, k3: 4 }))

    const S2 = getMonoid<number>(semigroupSum)
    assert.deepStrictEqual(S2.concat(d1, d2), new StrMap({ k1: 1, k2: 5, k3: 4 }))
  })

  it('map', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 2 })
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(d1.map(double), new StrMap({ k1: 2, k2: 4 }))
    assert.deepStrictEqual(strmap.map(d1, double), new StrMap({ k1: 2, k2: 4 }))
  })

  it('reduce', () => {
    const d1 = new StrMap({ k1: 'a', k2: 'b' })
    assert.strictEqual(d1.reduce('', (b, a) => b + a), 'ab')
    const d2 = new StrMap({ k2: 'b', k1: 'a' })
    assert.strictEqual(d2.reduce('', (b, a) => b + a), 'ab')
    assert.strictEqual(strmap.reduce(d1, '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const old = F.foldMap(strmap, monoidString)
    const foldMap = strmap.foldMap(monoidString)
    const x1 = new StrMap({ a: 'a', b: 'b' })
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'ab')
    assert.strictEqual(foldMap(x1, f1), old(x1, f1))
  })

  it('foldr', () => {
    const old = F.foldr(strmap)
    const foldr = strmap.foldr
    const x1 = new StrMap({ a: 'a', b: 'b' })
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'ba')
    assert.strictEqual(foldr(x1, init1, f1), old(x1, init1, f1))
  })

  it('traverse', () => {
    assert.deepStrictEqual(
      strmap.traverse(option)(new StrMap<number>({ k1: 1, k2: 2 }), n => (n <= 2 ? some(n) : none)),
      some(new StrMap<number>({ k1: 1, k2: 2 }))
    )
    assert.deepStrictEqual(
      strmap.traverse(option)(new StrMap<number>({ k1: 1, k2: 2 }), n => (n >= 2 ? some(n) : none)),
      none
    )
  })

  it('sequence', () => {
    const old = T.sequence(option, strmap)
    const sequence = strmap.sequence(option)
    const x1 = new StrMap({ k1: some(1), k2: some(2) })
    assert.deepStrictEqual(sequence(x1), some(new StrMap({ k1: 1, k2: 2 })))
    assert.deepStrictEqual(sequence(x1), old(x1))
    const x2 = new StrMap({ k1: none, k2: some(2) })
    assert.deepStrictEqual(sequence(x2), none)
    assert.deepStrictEqual(sequence(x2), old(x2))
  })

  it('getSetoid', () => {
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 1 })), true)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 2 })), false)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ b: 1 })), false)
  })

  it('lookup', () => {
    assert.deepStrictEqual(lookup('a', new StrMap({ a: 1 })), some(1))
    assert.deepStrictEqual(lookup('b', new StrMap({ a: 1 })), none)
  })

  it('fromFoldable', () => {
    assert.deepStrictEqual(fromFoldable(array)([['a', 1]], (existing, _) => existing), new StrMap({ a: 1 }))
    assert.deepStrictEqual(
      fromFoldable(array)([['a', 1], ['a', 2]], (existing, _) => existing),
      new StrMap({
        a: 1
      })
    )
    assert.deepStrictEqual(
      fromFoldable(array)([['a', 1], ['a', 2]], (_, a) => a),
      new StrMap({
        a: 2
      })
    )
  })

  it('toArray', () => {
    assert.deepStrictEqual(toArray(new StrMap({ a: 1, b: 2 })), [['a', 1], ['b', 2]])
    assert.deepStrictEqual(toArray(new StrMap({ b: 2, a: 1 })), [['a', 1], ['b', 2]])
  })

  it('toUnfoldable', () => {
    assert.deepStrictEqual(toUnfoldable(array)(new StrMap({ a: 1 })), [['a', 1]])
  })

  it('mapWithKey', () => {
    assert.deepStrictEqual(new StrMap({ aa: 1 }).mapWithKey((k, a) => a + k.length), new StrMap({ aa: 3 }))
    assert.deepStrictEqual(strmap.mapWithIndex(new StrMap({ aa: 1 }), (k, a) => a + k.length), new StrMap({ aa: 3 }))
  })

  it('traverseWithKey', () => {
    const d1 = new StrMap({ k1: 1, k2: 2 })
    const t1 = traverseWithKey(option)(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
    assert.deepStrictEqual(t1, none)
    const d2 = new StrMap({ k1: 2, k2: 3 })
    const t2 = traverseWithKey(option)(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
    assert.deepStrictEqual(t2, some(new StrMap<number>({ k1: 2, k2: 3 })))
  })

  it('size', () => {
    assert.strictEqual(size(new StrMap({})), 0)
    assert.strictEqual(size(new StrMap({ a: 1 })), 1)
  })

  it('isEmpty', () => {
    assert.strictEqual(isEmpty(new StrMap({})), true)
    assert.strictEqual(isEmpty(new StrMap({ a: 1 })), false)
  })

  it('insert', () => {
    assert.deepStrictEqual(insert('a', 1, new StrMap({})), new StrMap({ a: 1 }))
    // should return the same reference if the value is already there
    const x = new StrMap({ a: 1 })
    assert.strictEqual(insert('a', 1, x), x)
  })

  it('remove', () => {
    assert.deepStrictEqual(remove('a', new StrMap({ a: 1, b: 2 })), new StrMap({ b: 2 }))
    // should return the same reference if the key is missing
    const x = new StrMap({ a: 1 })
    assert.strictEqual(remove('b', x), x)
  })

  it('pop', () => {
    assert.deepStrictEqual(pop('a', new StrMap({ a: 1, b: 2 })), some([1, new StrMap({ b: 2 })]))
    assert.deepStrictEqual(pop('c', new StrMap({ a: 1, b: 2 })), none)
  })

  it('insert', () => {
    assert.deepStrictEqual(insert('c', 3, new StrMap({ a: 1, b: 2 })), new StrMap({ a: 1, b: 2, c: 3 }))
  })

  it('compact', () => {
    assert.deepStrictEqual(strmap.compact(new StrMap({ foo: none, bar: some(123) })), new StrMap({ bar: 123 }))
  })

  it('separate', () => {
    assert.deepStrictEqual(strmap.separate(new StrMap({ foo: left(123), bar: right(123) })), {
      left: new StrMap({ foo: 123 }),
      right: new StrMap({ bar: 123 })
    })
  })

  it('filter', () => {
    const d = new StrMap({ a: 1, b: 3 })
    assert.deepStrictEqual(d.filter(p), new StrMap({ b: 3 }))
    assert.deepStrictEqual(strmap.filter(d, p), new StrMap({ b: 3 }))

    // refinements
    const x = new StrMap({ a: 1, b: 'foo' })
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const actual = x.filter(isNumber)
    assert.deepStrictEqual(actual, new StrMap({ a: 1 }))
  })

  it('filterWithIndex', () => {
    assert.deepStrictEqual(
      strmap.filterWithIndex(new StrMap({ a: 'a', b: 'b' }), k => k === 'a'),
      new StrMap({ a: 'a' })
    )
  })

  it('filterMap', () => {
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(strmap.filterMap(new StrMap<number>({}), f), new StrMap({}))
    assert.deepStrictEqual(strmap.filterMap(new StrMap({ a: 1, b: 3 }), f), new StrMap({ b: 4 }))
  })

  it('filterMapWithIndex', () => {
    assert.deepStrictEqual(
      strmap.filterMapWithIndex(new StrMap({ a: 'a', b: 'b' }), (k, a) => (k === 'a' ? some(a.length) : none)),
      new StrMap({
        a: 1
      })
    )
  })

  it('partition', () => {
    assert.deepStrictEqual(strmap.partition(new StrMap<number>({}), p), { left: new StrMap({}), right: new StrMap({}) })
    assert.deepStrictEqual(strmap.partition(new StrMap<number>({ a: 1, b: 3 }), p), {
      left: new StrMap({ a: 1 }),
      right: new StrMap({ b: 3 })
    })
  })

  it('partitionWithIndex', () => {
    assert.deepStrictEqual(strmap.partitionWithIndex(new StrMap<string>({ a: 'a', b: 'b' }), k => k === 'a'), {
      left: new StrMap({ b: 'b' }),
      right: new StrMap({ a: 'a' })
    })
  })

  it('partitionMap', () => {
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(strmap.partitionMap(new StrMap<number>({}), f), {
      left: new StrMap({}),
      right: new StrMap({})
    })
    assert.deepStrictEqual(strmap.partitionMap(new StrMap<number>({ a: 1, b: 3 }), f), {
      left: new StrMap({ a: 0 }),
      right: new StrMap({ b: 4 })
    })
  })

  it('partitionMapWithIndex', () => {
    assert.deepStrictEqual(
      strmap.partitionMapWithIndex(
        new StrMap<string>({ a: 'a', b: 'b' }),
        (k, a) => (k === 'a' ? right(a.length) : left(a))
      ),
      {
        left: new StrMap({ b: 'b' }),
        right: new StrMap({ a: 1 })
      }
    )
  })

  it('wither', () => {
    const witherIdentity = strmap.wither(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
    assert.deepStrictEqual(witherIdentity(new StrMap<number>({}), f), new I.Identity(new StrMap({})))
    assert.deepStrictEqual(witherIdentity(new StrMap({ a: 1, b: 3 }), f), new I.Identity(new StrMap({ b: 4 })))
  })

  it('wilt', () => {
    const wiltIdentity = strmap.wilt(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepStrictEqual(
      wiltIdentity(new StrMap<number>({}), f),
      new I.Identity({ left: new StrMap({}), right: new StrMap({}) })
    )
    assert.deepStrictEqual(
      wiltIdentity(new StrMap({ a: 1, b: 3 }), f),
      new I.Identity({ left: new StrMap({ a: 0 }), right: new StrMap({ b: 4 }) })
    )
  })

  it('singleton', () => {
    assert.deepStrictEqual(singleton('a', 1), new StrMap({ a: 1 }))
  })

  it('isSubdictionary', () => {
    assert.strictEqual(isSubdictionary(setoidNumber)(new StrMap({ a: 1 }), new StrMap({ a: 1, b: 2 })), true)
  })

  it('collect', () => {
    assert.deepStrictEqual(collect(new StrMap({ b: 1, a: 2 }), identity), ['a', 'b'])
  })

  it('reduceWithKey', () => {
    const d1 = new StrMap({ k1: 'a', k2: 'b' })
    assert.strictEqual(strmap.reduceWithIndex(d1, '', (k, b, a) => b + k + a), 'k1ak2b')
    const d2 = new StrMap({ k2: 'b', k1: 'a' })
    assert.strictEqual(strmap.reduceWithIndex(d2, '', (k, b, a) => b + k + a), 'k1ak2b')
  })

  it('foldMapWithKey', () => {
    const x1 = new StrMap({ k1: 'a', k2: 'b' })
    assert.strictEqual(strmap.foldMapWithIndex(monoidString)(x1, (k, a) => k + a), 'k1ak2b')
  })

  it('foldrWithKey', () => {
    const x1 = new StrMap({ k1: 'a', k2: 'b' })
    assert.strictEqual(strmap.foldrWithIndex(x1, '', (k, a, b) => b + k + a), 'k2bk1a')
  })
})
