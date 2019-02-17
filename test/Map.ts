import * as assert from 'assert'
import * as M from '../src/Map'
import { semigroupSum } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { Refinement, identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { setoidNumber, setoidString } from '../src/Setoid'
import { array } from '../src/Array'
import { Either, left, right } from '../src/Either'
import * as I from '../src/Identity'
import { ordString } from '../src/Ord'
import { fromArray } from '../src/Set'

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

describe('Map', () => {
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

  it('has', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const hasS = M.has(setoidString)
    assert.deepStrictEqual(hasS('a', a1b2), true)
    assert.deepStrictEqual(hasS('c', a1b2), false)
  })

  it('isMember', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const isMemberS = M.isMember(setoidNumber)
    assert.deepStrictEqual(isMemberS(2, a1b2), true)
    assert.deepStrictEqual(isMemberS(3, a1b2), false)
  })

  it('keys', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const ks = M.keys(ordString)(a1b2)
    const expected = Array.from(a1b2.keys())
    assert.deepStrictEqual(ks, expected)
    assert.deepStrictEqual(ks, ['a', 'b'])
  })

  it('keysSet', () => {
    const a1b2 = new Map<'a' | 'b' | 'c', number>([['a', 1], ['a', 2], ['b', 3]])
    const ks = M.keysSet(a1b2)
    const arr = Array.from(a1b2.keys())
    assert.deepStrictEqual(ks, fromArray(ordString)(arr))
    assert.deepStrictEqual(ks, new Set(['a', 'b']))
  })

  it('collect', () => {
    const x1 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const x2 = new Map<'a' | 'b', number>([['b', 2], ['a', 1]])
    const collectO = M.collect(ordString)
    const f = (k: string, a: number): number => a + 1
    assert.deepStrictEqual(collectO(x1, f), [2, 3])
    assert.deepStrictEqual(collectO(x2, f), [2, 3])
  })

  it('toArray', () => {
    const x1 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const x2 = new Map<'a' | 'b', number>([['b', 2], ['a', 1]])
    const toArrayO = M.toArray(ordString)
    assert.deepStrictEqual(toArrayO(x1), [['a', 1], ['b', 2]])
    assert.deepStrictEqual(toArrayO(x2), [['a', 1], ['b', 2]])
  })

  it('toUnfoldable', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const toUnfoldableO = M.toUnfoldable(ordString, array)
    assert.deepStrictEqual(toUnfoldableO(a1), [['a', 1]])
  })

  it('insert', () => {
    const emptyMap = new Map<'a', number>()
    const a1 = new Map<'a', number>([['a', 1]])
    const a1b2 = new Map<'a' | 'b' | 'c', number>([['a', 1], ['b', 2]])
    const a1b2c3 = new Map<'a' | 'b' | 'c', number>([['a', 1], ['b', 2], ['c', 3]])
    const insertS = M.insert(setoidString)
    assert.deepStrictEqual(insertS('a', 1, emptyMap), a1)
    assert.deepStrictEqual(insertS('c', 3, a1b2), a1b2c3)
  })

  it('remove', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const b2 = new Map<'a' | 'b', number>([['b', 2]])
    const removeS = M.remove(setoidString)
    assert.deepStrictEqual(removeS('a', a1b2), b2)
  })

  it('pop', () => {
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const b2 = new Map<'a' | 'b', number>([['b', 2]])
    const popS = M.pop(setoidString)
    assert.deepStrictEqual(popS('a', a1b2), some([1, b2]))
    assert.deepStrictEqual(popS('c', a1b2), none)
  })

  it('lookupWithKey', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const lookupWithKeyS = M.lookupWithKey(setoidString)
    assert.deepStrictEqual(lookupWithKeyS('a', a1), some(['a', 1]))
    assert.deepStrictEqual(lookupWithKeyS('b', a1), none)
  })

  it('lookup', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const lookupS = M.lookup(setoidString)
    assert.deepStrictEqual(lookupS('a', a1), some(1))
    assert.deepStrictEqual(lookupS('b', a1), none)
  })

  it('isSubmap', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const a1b2 = new Map<'a' | 'b', number>([['a', 1], ['b', 2]])
    const isSubmapS = M.isSubmap(setoidString, setoidNumber)
    assert.strictEqual(isSubmapS(a1, a1b2), true)
  })

  it('empty', () => {
    assert.deepStrictEqual(M.empty, new Map<string, number>())
    assert.strictEqual(M.isEmpty(M.empty), true)
  })

  it('getSetoid', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const a2 = new Map<'a', number>([['a', 2]])
    const b1 = new Map<'b', number>([['b', 1]])
    const S = M.getSetoid(setoidString, setoidNumber)
    assert.strictEqual(S.equals(a1, a1), true)
    assert.strictEqual(S.equals(a1, a2), false)
    assert.strictEqual(S.equals(a1, b1), false)
  })

  it('getMonoid', () => {
    const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 3]])
    const d2 = new Map<'k2' | 'k3', number>([['k2', 2], ['k3', 4]])
    const expected = new Map<'k1' | 'k2' | 'k3', number>([['k1', 1], ['k2', 5], ['k3', 4]])
    const S2 = M.getMonoid(setoidString, semigroupSum)
    assert.deepStrictEqual(S2.concat(d1, d2), expected)
  })

  describe('map', () => {
    describe('functor', () => {
      it('map', () => {
        const map = M.map.map
        const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
        const expected = new Map<'k1' | 'k2', number>([['k1', 2], ['k2', 4]])
        const double = (n: number): number => n * 2
        assert.deepStrictEqual(map(d1, double), expected)
      })
    })
    describe('filterable', () => {
      it('compact', () => {
        const compact = M.map.compact
        const fooBar = new Map<'foo' | 'bar', Option<number>>([['foo', none], ['bar', some(123)]])
        const bar = new Map<'bar', number>([['bar', 123]])
        assert.deepStrictEqual(compact(fooBar), bar)
      })

      it('partitionMap', () => {
        const partitionMap = M.map.partitionMap
        const emptyMap = new Map<'a' | 'b', number>()
        const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
        const a0 = new Map<'a', number>([['a', 0]])
        const b4 = new Map<'b', number>([['b', 4]])
        const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
        assert.deepStrictEqual(partitionMap(emptyMap, f), { left: emptyMap, right: emptyMap })
        assert.deepStrictEqual(partitionMap(a1b3, f), {
          left: a0,
          right: b4
        })
      })

      it('partition', () => {
        const partition = M.map.partition
        const emptyMap = new Map<'a' | 'b', number>()
        const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
        const a1 = new Map<'a', number>([['a', 1]])
        const b3 = new Map<'b', number>([['b', 3]])
        assert.deepStrictEqual(partition(emptyMap, p), { left: emptyMap, right: emptyMap })
        assert.deepStrictEqual(partition(a1b3, p), {
          left: a1,
          right: b3
        })
      })

      it('separate', () => {
        const separate = M.map.separate
        const fooBar = new Map<'foo' | 'bar', Either<number, number>>([
          ['foo', left<number, number>(123)],
          ['bar', right<number, number>(123)]
        ])
        const foo = new Map<'foo', number>([['foo', 123]])
        const bar = new Map<'bar', number>([['bar', 123]])
        assert.deepStrictEqual(separate(fooBar), {
          left: foo,
          right: bar
        })
      })

      it('filter', () => {
        const filter = M.map.filter
        const d = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
        const b3 = new Map<'b', number>([['b', 3]])
        assert.deepStrictEqual(filter(d, p), b3)

        // refinements
        const isNumber = (u: string | number): u is number => typeof u === 'number'
        const y = new Map<string, string | number>([['a', 1], ['b', 'foo']])
        const a1 = new Map<string, number>([['a', 1]])
        const actual = filter(y, isNumber)
        assert.deepStrictEqual(actual, a1)
      })

      it('filterMap', () => {
        const filterMap = M.map.filterMap
        const emptyMap = new Map<'a' | 'b', number>()
        const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
        const b4 = new Map<'b', number>([['b', 4]])
        const f = (n: number) => (p(n) ? some(n + 1) : none)
        assert.deepStrictEqual(filterMap(emptyMap, f), emptyMap)
        assert.deepStrictEqual(filterMap(a1b3, f), b4)
      })
    })
  })

  it('singleton', () => {
    assert.deepStrictEqual(M.singleton('k1', 0), new Map<string, number>([['k1', 0]]))
  })

  describe('getTraversableWithIndex', () => {
    it('traverseWithIndex', () => {
      const optionTraverseWithIndex = M.getTraversableWithIndex(ordString).traverseWithIndex(option)
      const d1 = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
      const t1 = optionTraverseWithIndex(d1, (k, n): Option<number> => (k !== 'k1' ? some(n) : none))
      assert.deepStrictEqual(t1, none)
      const d2 = new Map<'k1' | 'k2' | 'k3', number>([['k1', 2], ['k2', 3]])
      const t2 = optionTraverseWithIndex(d2, (k, n): Option<number> => (k !== 'k3' ? some(n) : none))
      const expected = new Map<'k1' | 'k2', number>([['k1', 2], ['k2', 3]])
      assert.deepStrictEqual(t2, some(expected))
    })

    describe('getTraversable', () => {
      it('traverse', () => {
        const optionTraverse = M.getTraversableWithIndex(ordString).traverse(option)
        const x = new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])
        assert.deepStrictEqual(optionTraverse(x, n => (n <= 2 ? some(n) : none)), some(x))
        assert.deepStrictEqual(optionTraverse(x, n => (n >= 2 ? some(n) : none)), none)
      })

      it('sequence', () => {
        const optionSequence = M.getTraversableWithIndex(ordString).sequence(option)
        const x1 = new Map<'k1' | 'k2', Option<number>>([['k1', some(1)], ['k2', some(2)]])
        assert.deepStrictEqual(optionSequence(x1), some(new Map<'k1' | 'k2', number>([['k1', 1], ['k2', 2]])))
        const x2 = new Map<'k1' | 'k2', Option<number>>([['k1', none], ['k2', some(2)]])
        assert.deepStrictEqual(optionSequence(x2), none)
      })
    })

    describe('getFoldable', () => {
      it('reduce', () => {
        const d1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
        const reduceO = M.getTraversableWithIndex(ordString).reduce
        assert.strictEqual(reduceO(d1, '', (b, a) => b + a), 'ab')
        const d2 = new Map<'k1' | 'k2', string>([['k2', 'b'], ['k1', 'a']])
        assert.strictEqual(reduceO(d2, '', (b, a) => b + a), 'ab')
      })

      it('foldMap', () => {
        const foldMapOM = M.getTraversableWithIndex(ordString).foldMap(monoidString)
        const x1 = new Map<'a' | 'b', string>([['a', 'a'], ['b', 'b']])
        const f1 = identity
        assert.strictEqual(foldMapOM(x1, f1), 'ab')
      })

      it('foldr', () => {
        const foldrO = M.getTraversableWithIndex(ordString).foldr
        const x1 = new Map<'a' | 'b', string>([['a', 'a'], ['b', 'b']])
        const init1 = ''
        const f1 = (a: string, acc: string) => acc + a
        assert.strictEqual(foldrO(x1, init1, f1), 'ba')
      })
    })

    describe('getFoldableWithIndex', () => {
      it('reduceWithIndex', () => {
        const d1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
        const reduceWithIndexO = M.getTraversableWithIndex(ordString).reduceWithIndex
        assert.strictEqual(reduceWithIndexO(d1, '', (k, b, a) => b + k + a), 'k1ak2b')
        const d2 = new Map<'k1' | 'k2', string>([['k2', 'b'], ['k1', 'a']])
        assert.strictEqual(reduceWithIndexO(d2, '', (k, b, a) => b + k + a), 'k1ak2b')
      })

      it('foldMapWithIndex', () => {
        const foldMapWithIndexOM = M.getTraversableWithIndex(ordString).foldMapWithIndex(monoidString)
        const x1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
        assert.strictEqual(foldMapWithIndexOM(x1, (k, a) => k + a), 'k1ak2b')
      })

      it('foldrWithIndex', () => {
        const foldrWithIndexO = M.getTraversableWithIndex(ordString).foldrWithIndex
        const x1 = new Map<'k1' | 'k2', string>([['k1', 'a'], ['k2', 'b']])
        assert.strictEqual(foldrWithIndexO(x1, '', (k, a, b) => b + k + a), 'k2bk1a')
      })
    })

    describe('getFunctorWithIndex', () => {
      it('mapWithIndex', () => {
        const mapWithIndex = M.getTraversableWithIndex<'aa'>(ordString).mapWithIndex
        const aa1 = new Map<'aa', number>([['aa', 1]])
        const aa3 = new Map<'aa', number>([['aa', 3]])
        assert.deepStrictEqual(mapWithIndex(aa1, (k, a) => a + k.length), aa3)
      })
    })
  })

  describe('getWitherable', () => {
    it('wither', () => {
      const emptyMap = new Map<'a' | 'b', number>()
      const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const b4 = new Map<'b', number>([['b', 4]])
      const witherIdentity = M.getWitherable(ordString).wither(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(witherIdentity(emptyMap, f), new I.Identity(emptyMap))
      assert.deepStrictEqual(witherIdentity(a1b3, f), new I.Identity(b4))
    })

    it('wilt', () => {
      const emptyMap = new Map<'a' | 'b', number>()
      const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const a0 = new Map<'a', number>([['a', 0]])
      const b4 = new Map<'b', number>([['b', 4]])
      const wiltIdentity = M.getWitherable(ordString).wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(wiltIdentity(emptyMap, f), new I.Identity({ left: emptyMap, right: emptyMap }))
      assert.deepStrictEqual(wiltIdentity(a1b3, f), new I.Identity({ left: a0, right: b4 }))
    })
  })

  describe('getFilterableWithIndex', () => {
    it('partitionMapWithIndex', () => {
      const partitionMapWithIndex = M.getFilterableWithIndex<'a' | 'b'>().partitionMapWithIndex
      const emptyMap = new Map<'a' | 'b', number>()
      const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const a0 = new Map<'a', number>([['a', 0]])
      const b4 = new Map<'b', number>([['b', 4]])
      const f = (K: 'a' | 'b', n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(partitionMapWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionMapWithIndex(a1b3, f), {
        left: a0,
        right: b4
      })
    })

    it('partitionWithIndex', () => {
      const partitionWithIndex = M.getFilterableWithIndex<'a' | 'b'>().partitionWithIndex
      const emptyMap = new Map<'a' | 'b', number>()
      const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const a1 = new Map<'a', number>([['a', 1]])
      const b3 = new Map<'b', number>([['b', 3]])
      const f = (k: 'a' | 'b', n: number) => p(n)
      assert.deepStrictEqual(partitionWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionWithIndex(a1b3, f), {
        left: a1,
        right: b3
      })
    })

    it('filterMapWithIndex', () => {
      const filterMapWithIndex = M.getFilterableWithIndex<'a' | 'b'>().filterMapWithIndex
      const emptyMap = new Map<'a' | 'b', number>()
      const a1b3 = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const b4 = new Map<'b', number>([['b', 4]])
      const f = (k: 'a' | 'b', n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(filterMapWithIndex(emptyMap, f), emptyMap)
      assert.deepStrictEqual(filterMapWithIndex(a1b3, f), b4)
    })

    it('filterWithIndex', () => {
      const filterWithIndex = M.getFilterableWithIndex<'a' | 'b'>().filterWithIndex
      const d = new Map<'a' | 'b', number>([['a', 1], ['b', 3]])
      const b3 = new Map<'b', number>([['b', 3]])
      const f = (k: 'a' | 'b', n: number) => p(n)
      assert.deepStrictEqual(filterWithIndex(d, f), b3)

      // refinements
      const filterWithIndexStr = M.getFilterableWithIndex<string>().filterWithIndex
      const isNumber = (k: string, u: string | number): u is number => typeof u === 'number'
      const y = new Map<string, string | number>([['a', 1], ['b', 'foo']])
      const a1 = new Map<string, number>([['a', 1]])
      const actual = filterWithIndexStr(y, isNumber)
      assert.deepStrictEqual(actual, a1)
    })
  })

  it('fromFoldable', () => {
    const a1 = new Map<'a', number>([['a', 1]])
    const a2 = new Map<'a', number>([['a', 2]])
    const fromFoldableS = M.fromFoldable(setoidString, array)
    assert.deepStrictEqual(fromFoldableS([['a', 1]], (existing, _) => existing), a1)
    assert.deepStrictEqual(fromFoldableS([['a', 1], ['a', 2]], (existing, _) => existing), a1)
    assert.deepStrictEqual(fromFoldableS([['a', 1], ['a', 2]], (_, a) => a), a2)
  })
})
