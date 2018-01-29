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
  getSemigroup
} from '../src/StrMap'
import * as option from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import * as array from '../src/Array'

describe('StrMap', () => {
  it('concat', () => {
    const d1 = new StrMap<number>({ k1: 1 })
    const d2 = new StrMap<number>({ k2: 2 })
    const S = getSemigroup<number>()
    assert.deepEqual(S.concat(d1, d2), new StrMap({ k1: 1, k2: 2 }))
  })

  it('map', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 2 })
    const double = (n: number): number => n * 2
    const d2 = d1.map(double)
    assert.deepEqual(d2, new StrMap({ k1: 2, k2: 4 }))
  })

  it('reduce', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 2 })
    const b = d1.reduce(0, (b, a) => b + a)
    assert.strictEqual(b, 3)
  })

  it('traverse', () => {
    const d1 = new StrMap<number>({ k1: 1, k2: 2 })
    const t1 = d1.traverse(option.option)((n): option.Option<number> => (n >= 2 ? option.some(n) : option.none))
    assert.deepEqual(t1, option.none)
    const d2 = new StrMap<number>({ k1: 2, k2: 3 })
    const t2 = d2.traverse(option.option)((n): option.Option<number> => (n >= 2 ? option.some(n) : option.none))
    assert.deepEqual(t2, option.some(new StrMap<number>({ k1: 2, k2: 3 })))
  })

  it('getSetoid', () => {
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 1 })), true)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ a: 2 })), false)
    assert.strictEqual(getSetoid(setoidNumber).equals(new StrMap({ a: 1 }), new StrMap({ b: 1 })), false)
  })

  it('lookup', () => {
    assert.deepEqual(lookup('a')(new StrMap({ a: 1 })), option.some(1))
    assert.deepEqual(lookup('b')(new StrMap({ a: 1 })), option.none)
  })

  it('fromFoldable', () => {
    assert.deepEqual(
      fromFoldable(array)(existing => a => existing)([['a', 1]] as Array<[string, number]>),
      new StrMap({ a: 1 })
    )
    assert.deepEqual(
      fromFoldable(array)(existing => a => existing)([['a', 1], ['a', 2]] as Array<[string, number]>),
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
    const t1 = d1.traverseWithKey(option.option)(
      (k, n): option.Option<number> => (k !== 'k1' ? option.some(n) : option.none)
    )
    assert.deepEqual(t1, option.none)
    const d2 = new StrMap({ k1: 2, k2: 3 })
    const t2 = d2.traverseWithKey(option.option)(
      (k, n): option.Option<number> => (k !== 'k3' ? option.some(n) : option.none)
    )
    assert.deepEqual(t2, option.some(new StrMap<number>({ k1: 2, k2: 3 })))
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
    assert.deepEqual(insert('a')(1)(new StrMap({})), new StrMap({ a: 1 }))
  })

  it('remove', () => {
    assert.deepEqual(remove('a')(new StrMap({ a: 1, b: 2 })), new StrMap({ b: 2 }))
  })

  it('pop', () => {
    assert.deepEqual(pop('a')(new StrMap({ a: 1, b: 2 })), option.some([1, new StrMap({ b: 2 })]))
    assert.deepEqual(pop('c')(new StrMap({ a: 1, b: 2 })), option.none)
  })
})
