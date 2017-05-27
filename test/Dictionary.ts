import * as assert from 'assert'
import {
  Dictionary,
  concat,
  map,
  reduce,
  traverse,
  getStaticSetoid,
  lookup,
  fromFoldable,
  toArray,
  toUnfoldable,
  mapWithKey,
  traverseWithKey
} from '../src/Dictionary'
import * as option from '../src/Option'
import { eqOptions as eq } from './helpers'
import { setoidNumber } from '../src/Setoid'
import * as array from '../src/Array'

describe('Dictionary', () => {

  it('concat', () => {
    const d1: Dictionary<number> = { k1: 1 }
    const d2: Dictionary<number> = { k2: 2 }
    assert.deepEqual(concat(d1, d2), { k1: 1, k2: 2 })
  })

  it('map', () => {
    const d1: Dictionary<number> = { k1: 1, k2: 2 }
    const double = (n: number): number => n * 2
    const d2 = map(double, d1)
    assert.deepEqual(d2, { k1: 2, k2: 4 })
  })

  it('reduce', () => {
    const d1: Dictionary<number> = { k1: 1, k2: 2 }
    const b = reduce((b, a) => b + a, 0, d1)
    assert.strictEqual(b, 3)
  })

  it('traverse', () => {
    const d1: Dictionary<number> = { k1: 1, k2: 2 }
    const t1 = traverse(option)((n): option.Option<number> => n >= 2 ? option.some(n) : option.none, d1)
    eq(t1, option.none)
    const d2: Dictionary<number> = { k1: 2, k2: 3 }
    const t2 = traverse(option)((n): option.Option<number> => n >= 2 ? option.some(n) : option.none, d2)
    eq(t2, option.some({ k1: 2, k2: 3 }))
  })

  it('getStaticSetoid', () => {
    assert.strictEqual(getStaticSetoid(setoidNumber).equals({ a: 1 }, { a: 1 }), true)
    assert.strictEqual(getStaticSetoid(setoidNumber).equals({ a: 1 }, { a: 2 }), false)
    assert.strictEqual(getStaticSetoid(setoidNumber).equals({ a: 1 }, { b: 1 }), false)
  })

  it('lookup', () => {
    eq(lookup('a', { a: 1}), option.some(1))
    eq(lookup('b', { a: 1}), option.none)
  })

  it('fromFoldable', () => {
    assert.deepEqual(fromFoldable(array)((existing, a) => existing, [['a', 1]]), { a: 1 })
    assert.deepEqual(fromFoldable(array)((existing, a) => existing, [['a', 1], ['a', 2]]), { a: 1 })
  })

  it('toArray', () => {
    assert.deepEqual(toArray({ a: 1 }), [['a', 1]])
  })

  it('toUnfoldable', () => {
    assert.deepEqual(toUnfoldable(array)({ a: 1 }), [['a', 1]])
  })

  it('mapWithKey', () => {
    assert.deepEqual(mapWithKey((k, a) => a + k.length, { aa: 1 }), { aa: 3 })
  })

  it('traverseWithKey', () => {
    const d1: Dictionary<number> = { k1: 1, k2: 2 }
    const t1 = traverseWithKey(option)((k, n): option.Option<number> => k !== 'k1' ? option.some(n) : option.none, d1)
    eq(t1, option.none)
    const d2: Dictionary<number> = { k1: 2, k2: 3 }
    const t2 = traverseWithKey(option)((k, n): option.Option<number> => k !== 'k3' ? option.some(n) : option.none, d2)
    eq(t2, option.some({ k1: 2, k2: 3 }))
  })

})
