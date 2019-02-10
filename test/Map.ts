import * as assert from 'assert'
import * as M from '../src/Map'
import { semigroupSum } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { Refinement, identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { setoidNumber } from '../src/Setoid'
import { array } from '../src/Array'
import { Either, left, right } from '../src/Either'
import * as I from '../src/Identity'

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

describe('Map', () => {
  it('getMonoid', () => {
    const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 3]])
    const d2 = new Map<'k2' | 'k3', number>([['k2', 2], ['k3', 4]])
    const expected = new Map<'k1' | 'k2' | 'k3', number>([['k1', 1], ['k2', 5], ['k3', 4]])
    const S2 = M.getMonoid(semigroupSum)
    assert.deepEqual(S2.concat(d1, d2), expected)
  })

  it('map', () => {
    const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
    const expected = new Map<'k1' | 'k2', number>([['k1', 2], ['k2', 4]])
    const double = (n: number): number => n * 2
    assert.deepEqual(M.map(d1, double), expected)
  })

  it('reduce', () => {
    const d1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
    assert.strictEqual(M.reduce(d1, '', (b, a) => b + a), 'ab')
    const d2 = new Map<'k1' | 'k2', string>([['k2', 'b'], ['k1', 'a']])
    assert.strictEqual(M.reduce(d2, '', (b, a) => b + a), 'ab')
  })

  it('foldMap', () => {
    const foldMap = M.foldMap(monoidString)
    const x1 = new Map<'a' | 'b', string>([['a', 'a'], ['b', 'b']])
    const f1 = identity
    assert.strictEqual(foldMap(x1, f1), 'ab')
  })

  it('foldr', () => {
    const foldr = M.foldr
    const x1 = new Map<'a' | 'b', string>([['a', 'a'], ['b', 'b']])
    const init1 = ''
    const f1 = (a: string, acc: string) => acc + a
    assert.strictEqual(foldr(x1, init1, f1), 'ba')
  })

  it('traverse', () => {
    const x = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
    assert.deepEqual(M.traverse(option)(x, n => (n <= 2 ? some(n) : none)), some(x))
    assert.deepEqual(M.traverse(option)(x, n => (n >= 2 ? some(n) : none)), none)
  })

  it('sequence', () => {
    const sequence = M.sequence(option)
    const x1 = new Map<'k1' | 'k2', Option<number>>([['k1', some(1)], ['k2', some(2)]])
    assert.deepEqual(sequence(x1), some(new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])))
    const x2 = new Map<'k1' | 'k2', Option<number>>([['k1', none], ['k2', some(2)]])
    assert.deepEqual(sequence(x2), none)
  })

  it('getSetoid', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const a2 = new Map<'a', number>([['a', 2]])
    const b1 = new Map<'b', number>([['b', 1]])
    assert.strictEqual(M.getSetoid(setoidNumber).equals(a1, a1), true)
    assert.strictEqual(M.getSetoid(setoidNumber).equals(a1, a2), false)
    assert.strictEqual(M.getSetoid(setoidNumber).equals(a1, b1), false)
  })

  it('lookup', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    assert.deepEqual(M.lookup('a', a1), some(1))
    assert.deepEqual(M.lookup('b', a1), none)
  })

  it('fromFoldable', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const a2 = new Map<'a', number>([['a', 2]])
    assert.deepEqual(M.fromFoldable(array)([['a', 1]], (existing, _) => existing), a1)
    assert.deepEqual(M.fromFoldable(array)([['a', 1], ['a', 2]], (existing, _) => existing), a1)
    assert.deepEqual(M.fromFoldable(array)([['a', 1], ['a', 2]], (_, a) => a), a2)
  })

  it('toArray', () => {
    const x1 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const x2 = new Map<'a' | 'b', number>([['b', 2], ['a', 1]])
    assert.deepEqual(M.toArray(x1), [['a', 1], ['b', 2]])
    assert.deepEqual(M.toArray(x2), [['a', 1], ['b', 2]])
  })

  it('toUnfoldable', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    assert.deepEqual(M.toUnfoldable(array)(a1), [['a', 1]])
  })

  it('mapWithKey', () => {
    const aa1 = new Map<'aa', number>([['aa', 1]])
    const aa3 = new Map<'aa', number>([['aa', 3]])
    assert.deepEqual(M.mapWithKey(aa1, (k, a) => a + k.length), aa3)
  })

  it('traverseWithKey', () => {
    const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
    const t1 = M.traverseWithKey(option)(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
    assert.deepEqual(t1, none)
    const d2 = new Map<'k1' | 'k2' | 'k3', number>([['k1', 5], ['k2', 3]])
    const t2 = M.traverseWithKey(option)(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
    const expected = new Map<'k1' | 'k2', number>([['k1', 4], ['k2', 3]])
    assert.deepEqual(t2, some(expected))
  })

  it('size', () => {
    const emptyMap = new Map<'a', number>()
    const a1 = new Map<'a', number>([['a', 1]])
    assert.strictEqual(M.size(emptyMap), 0)
    assert.strictEqual(M.size(a1), 1)
  })

  it('isEmpty', () => {
    const emptyMap = new Map<'a', number>()
    const a1 = new Map<'a', number>([['a', 1]])
    assert.strictEqual(M.isEmpty(emptyMap), true)
    assert.strictEqual(M.isEmpty(a1), false)
  })

  it('insert', () => {
    const emptyMap = new Map<'a', number>()
    const a1 = new Map<'a', number>([['a', 1]])
    const a1b2 = new Map<'a' | 'b' | 'c', number>([['a', 1], ['b', 2]])
    const a1b2c3 = new Map<'a' | 'b' | 'c', number>([['a', 1], ['b', 2], ['c', 3]])
    assert.deepEqual(M.insert('a', 1, emptyMap), a1)
    assert.deepEqual(M.insert('c', 3, a1b2), a1b2c3)
  })

  it('remove', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const b2 = new Map<'a' | 'b', number>([['b', 2]])
    assert.deepEqual(M.remove('a', a1b2), b2)
  })

  it('pop', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const b2 = new Map<'a' | 'b', number>([['b', 2]])
    assert.deepEqual(M.pop('a', a1b2), some([1, b2]))
    assert.deepEqual(M.pop('c', a1b2), none)
  })

  it('compact', () => {
    const fooBar = new Map<'foo' | 'bar', Option<number>>([['foo', none], ['bar', some(123)]])
    const bar = new Map<'bar', number>([['bar', 123]])
    assert.deepEqual(M.compact(fooBar), bar)
  })

  it('separate', () => {
    const fooBar = new Map<'foo' | 'bar', Either<number, number>>([
      ['foo', left<number, number>(123)],
      ['bar', right<number, number>(123)]
    ])
    const foo = new Map<'foo', number>([['foo', 123]])
    const bar = new Map<'bar', number>([['bar', 123]])
    assert.deepEqual(M.separate(fooBar), {
      left: foo,
      right: bar
    })
  })

  it('filter', () => {
    // const d = { a: 1, b: 3 }
    const d = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const b3 = new Map<'b', number>([['b', 3]])
    assert.deepEqual(M.filter(d, p), b3)

    // refinements
    const isNumber = (u: string | number): u is number => typeof u === 'number'
    const y = new Map<string, string | number>([['a', 1], ['b', 'foo']])
    const a1 = new Map<string, number>([['a', 1]])
    const actual = M.filter(y, isNumber)
    assert.deepEqual(actual, a1)
  })

  it('filterMap', () => {
    const emptyMap = new Map<'a' | 'b', number>()
    const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const b4 = new Map<'b', number>([['b', 4]])
    const f = (n: number) => (p(n) ? some(n + 1) : none)
    assert.deepEqual(M.filterMap(emptyMap, f), emptyMap)
    assert.deepEqual(M.filterMap(a1b3, f), b4)
  })

  it('partition', () => {
    const emptyMap = new Map<'a' | 'b', number>()
    const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const a1 = new Map<'a', number>([['a', 1]])
    const b3 = new Map<'b', number>([['b', 3]])
    assert.deepEqual(M.partition(emptyMap, p), { left: emptyMap, right: emptyMap })
    assert.deepEqual(M.partition(a1b3, p), {
      left: a1,
      right: b3
    })
  })

  it('partitionMap', () => {
    // const emptyMap = new Map<'a' | 'b', number>()
    const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const a0 = new Map<'a', number>([['a', 0]])
    const b4 = new Map<'b', number>([['b', 4]])
    const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
    // assert.deepEqual(M.partitionMap(emptyMap, f), { left: emptyMap, right: emptyMap })
    assert.deepEqual(M.partitionMap(a1b3, f), {
      left: a0,
      right: b4
    })
  })

  it('wither', () => {
    // const emptyMap = new Map<'a' | 'b', number>()
    const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const b4 = new Map<'b', number>([['b', 4]])
    const witherIdentity = M.wither(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
    // assert.deepEqual(witherIdentity(emptyMap, f), new I.Identity(emptyMap))
    assert.deepEqual(witherIdentity(a1b3, f), new I.Identity(b4))
  })

  it('wilt', () => {
    const emptyMap = new Map<'a' | 'b', number>()
    const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
    const a0 = new Map<'a', number>([['a', 0]])
    const b4 = new Map<'b', number>([['b', 4]])
    const wiltIdentity = M.wilt(I.identity)
    const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
    assert.deepEqual(wiltIdentity(emptyMap, f), new I.Identity({ left: emptyMap, right: emptyMap }))
    assert.deepEqual(wiltIdentity(a1b3, f), new I.Identity({ left: a0, right: b4 }))
  })

  it('reduceWithKey', () => {
    const d1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
    assert.strictEqual(M.reduceWithKey(d1, '', (k, b, a) => b + k + a), 'k1ak2b')
    const d2 = new Map<'k1' | 'k2', string>([['k2', 'b'], ['k1', 'a']])
    assert.strictEqual(M.reduceWithKey(d2, '', (k, b, a) => b + k + a), 'k1ak2b')
  })

  it('foldMapWithKey', () => {
    const x1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
    assert.strictEqual(M.foldMapWithKey(monoidString)(x1, (k, a) => k + a), 'k1ak2b')
  })

  it('foldrWithKey', () => {
    const x1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
    assert.strictEqual(M.foldrWithKey(x1, '', (k, a, b) => b + k + a), 'k2bk1a')
  })
})
