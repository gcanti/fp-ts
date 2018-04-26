import * as assert from 'assert'
import {
  StrMap,
  getSetoid,
  lookup,
  fromFoldable,
  toArray,
  toUnfoldable,
  size,
  isEmpty,
  insert,
  remove,
  pop,
  getMonoid,
  strmap,
  traverseWithKey
} from '../src/StrMap'
import { setoidNumber } from '../src/Setoid'
import { array } from '../src/Array'
import { traverse } from '../src/Traversable'
import { Option, none, some, option } from '../src/Option'

describe('StrMap', () => {
  it('getMonoid', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 3 })
    const d2 = new StrMap<number>({ k2: 2, k3: 4 })
    const S = getMonoid<number>()
    assert.deepEqual(S.concat(d1, d2), new StrMap({ k1: 1, k2: 2, k3: 4 }))
  })

  it('map', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 2 })
    const double = (n: number): number => n * 2
    const d2 = d1.map(double)
    assert.deepEqual(d2, new StrMap({ k1: 2, k2: 4 }))
  })

  it('reduce', () => {
    const d1 = new StrMap({ k1: 'a', k2: 'b' })
    assert.strictEqual(d1.reduce('', (b, a) => b + a), 'ab')
    const d2 = new StrMap({ k2: 'b', k1: 'a' })
    assert.strictEqual(d2.reduce('', (b, a) => b + a), 'ab')
  })

  it('traverse', () => {
    assert.deepEqual(
      traverse(option, strmap)(new StrMap<number>({ k1: 1, k2: 2 }), n => (n <= 2 ? some(n) : none)),
      some(new StrMap<number>({ k1: 1, k2: 2 }))
    )
    assert.deepEqual(
      traverse(option, strmap)(new StrMap<number>({ k1: 1, k2: 2 }), n => (n >= 2 ? some(n) : none)),
      none
    )
  })

  it('getSetoid', () => {
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 1 })), true)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 2 })), false)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ b: 1 })), false)
  })

  it('lookup', () => {
    assert.deepEqual(lookup('a', new StrMap({ a: 1 })), some(1))
    assert.deepEqual(lookup('b', new StrMap({ a: 1 })), none)
  })

  it('fromFoldable', () => {
    assert.deepEqual(fromFoldable(array)([['a', 1]], (existing, a) => existing), new StrMap({ a: 1 }))
    assert.deepEqual(
      fromFoldable(array)([['a', 1], ['a', 2]], (existing, a) => existing),
      new StrMap({
        a: 1
      })
    )
  })

  it('toArray', () => {
    assert.deepEqual(toArray(new StrMap({ a: 1 })), [['a', 1]])
  })

  it('toUnfoldable', () => {
    assert.deepEqual(toUnfoldable(array)(new StrMap({ a: 1 })), [['a', 1]])
  })

  it('mapWithKey', () => {
    assert.deepEqual(new StrMap({ aa: 1 }).mapWithKey((k, a) => a + k.length), new StrMap({ aa: 3 }))
  })

  it('traverseWithKey', () => {
    const d1 = new StrMap({ k1: 1, k2: 2 })
    const t1 = traverseWithKey(option)(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
    assert.deepEqual(t1, none)
    const d2 = new StrMap({ k1: 2, k2: 3 })
    const t2 = traverseWithKey(option)(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
    assert.deepEqual(t2, some(new StrMap<number>({ k1: 2, k2: 3 })))
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
    assert.deepEqual(insert('a', 1, new StrMap({})), new StrMap({ a: 1 }))
  })

  it('remove', () => {
    assert.deepEqual(remove('a', new StrMap({ a: 1, b: 2 })), new StrMap({ b: 2 }))
  })

  it('pop', () => {
    assert.deepEqual(pop('a', new StrMap({ a: 1, b: 2 })), some([1, new StrMap({ b: 2 })]))
    assert.deepEqual(pop('c', new StrMap({ a: 1, b: 2 })), none)
  })

  it('insert', () => {
    assert.deepEqual(insert('c', 3, new StrMap({ a: 1, b: 2 })), new StrMap({ a: 1, b: 2, c: 3 }))
  })

  it('filter', () => {
    const d = new StrMap({ a: 1, b: 2 })
    assert.deepEqual(d.filter(a => a === 1), new StrMap({ a: 1 }))
  })
})
