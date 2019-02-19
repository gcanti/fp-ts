import * as assert from 'assert'
import * as M from '../src/Map'
import { semigroupSum } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { Refinement, identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { Setoid, setoidNumber } from '../src/Setoid'
import { array } from '../src/Array'
import { Either, left, right } from '../src/Either'
import * as I from '../src/Identity'
import { contramap, ordString } from '../src/Ord'

interface User {
  id: string
}

const ordUser = contramap((u: User) => u.id, ordString)

const setoidUser: Setoid<User> = { equals: ordUser.equals }

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

describe('Map', () => {
  it('URI', () => {
    assert.strictEqual(M.URI, 'Map')
  })

  it('size', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    assert.strictEqual(M.size(emptyMap), 0)
    assert.strictEqual(M.size(a1), 1)
  })

  it('isEmpty', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    assert.strictEqual(M.isEmpty(emptyMap), true)
    assert.strictEqual(M.isEmpty(a1), false)
  })

  it('member', () => {
    const a1b2 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const memberS = M.member(setoidUser)
    assert.deepStrictEqual(memberS({ id: 'a' }, a1b2), true)
    assert.deepStrictEqual(memberS({ id: 'c' }, a1b2), false)
  })

  it('elem', () => {
    const a1b2 = new Map<string, number>([['a', 1], ['b', 2]])
    const elemS = M.elem(setoidNumber)
    assert.deepStrictEqual(elemS(2, a1b2), true)
    assert.deepStrictEqual(elemS(3, a1b2), false)
  })

  it('keys', () => {
    const m = new Map<User, number>([[{ id: 'b' }, 2], [{ id: 'a' }, 1]])
    const ks = M.keys(ordUser)(m)
    assert.deepStrictEqual(ks, Array.from(m.keys()).sort(ordUser.compare))
    assert.deepStrictEqual(ks, [{ id: 'a' }, { id: 'b' }])
  })

  it('values', () => {
    const m = new Map<number, User>([[2, { id: 'b' }], [1, { id: 'a' }]])
    const vals = M.values(ordUser)(m)
    assert.deepStrictEqual(vals, Array.from(m.values()).sort(ordUser.compare))
    assert.deepStrictEqual(vals, [{ id: 'a' }, { id: 'b' }])
  })

  it('collect', () => {
    const m1 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const m2 = new Map<User, number>([[{ id: 'b' }, 2], [{ id: 'a' }, 1]])
    const collectO = M.collect(ordUser)
    const f = (k: User, a: number): number => a + 1
    assert.deepStrictEqual(collectO(m1, f), [2, 3])
    assert.deepStrictEqual(collectO(m2, f), [2, 3])
  })

  it('toArray', () => {
    const m1 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const m2 = new Map<User, number>([[{ id: 'b' }, 2], [{ id: 'a' }, 1]])
    const toArrayO = M.toArray(ordUser)
    assert.deepStrictEqual(toArrayO(m1), [[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    assert.deepStrictEqual(toArrayO(m2), [[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
  })

  it('toUnfoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const toUnfoldableO = M.toUnfoldable(ordUser, array)
    assert.deepStrictEqual(toUnfoldableO(a1), [[{ id: 'a' }, 1]])
  })

  it('insert', () => {
    const emptyMap = new Map<User, number>()
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1b2 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const a2b2 = new Map<User, number>([[{ id: 'a' }, 2], [{ id: 'b' }, 2]])
    const a1b2c3 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2], [{ id: 'c' }, 3]])
    const insertS = M.insert(setoidUser)
    assert.deepStrictEqual(insertS({ id: 'a' }, 1, emptyMap), a1)
    assert.deepStrictEqual(insertS({ id: 'a' }, 1, a1b2), a1b2)
    assert.deepStrictEqual(insertS({ id: 'a' }, 2, a1b2), a2b2)
    assert.deepStrictEqual(insertS({ id: 'c' }, 3, a1b2), a1b2c3)
  })

  it('remove', () => {
    const a1b2 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const a1b2_ = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const b2 = new Map<User, number>([[{ id: 'b' }, 2]])
    const removeS = M.remove(setoidUser)
    assert.deepStrictEqual(removeS({ id: 'a' }, a1b2), b2)
    assert.deepStrictEqual(a1b2, a1b2_)
    assert.deepStrictEqual(removeS({ id: 'c' }, a1b2), a1b2)
  })

  it('pop', () => {
    const a1b2 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const b2 = new Map<User, number>([[{ id: 'b' }, 2]])
    const popS = M.pop(setoidUser)
    assert.deepStrictEqual(popS({ id: 'a' }, a1b2), some([1, b2]))
    assert.deepStrictEqual(popS({ id: 'c' }, a1b2), none)
  })

  it('lookupWithKey', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupWithKeyS = M.lookupWithKey(setoidUser)
    assert.deepStrictEqual(lookupWithKeyS({ id: 'a' }, a1), some([{ id: 'a' }, 1]))
    assert.deepStrictEqual(lookupWithKeyS({ id: 'b' }, a1), none)
  })

  it('lookup', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupS = M.lookup(setoidUser)
    assert.deepStrictEqual(lookupS({ id: 'a' }, a1), some(1))
    assert.deepStrictEqual(lookupS({ id: 'b' }, a1), none)
  })

  it('isSubmap', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1b2 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 2]])
    const isSubmapS = M.isSubmap(setoidUser, setoidNumber)
    assert.strictEqual(isSubmapS(a1, a1b2), true)
  })

  it('empty', () => {
    assert.deepStrictEqual(M.empty, new Map<string, number>())
    assert.strictEqual(M.isEmpty(M.empty), true)
  })

  it('getSetoid', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1_ = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const b1 = new Map<User, number>([[{ id: 'b' }, 1]])
    const S = M.getSetoid(setoidUser, setoidNumber)
    assert.strictEqual(S.equals(a1, a1), true)
    assert.strictEqual(S.equals(a1, a1_), true)
    assert.strictEqual(S.equals(a1_, a1), true)
    assert.strictEqual(S.equals(a1, a2), false)
    assert.strictEqual(S.equals(a2, a1), false)
    assert.strictEqual(S.equals(a1, b1), false)
    assert.strictEqual(S.equals(b1, a1), false)
  })

  it('getMonoid', () => {
    const d1 = new Map<User, number>([[{ id: 'k1' }, 1], [{ id: 'k2' }, 3]])
    const d2 = new Map<User, number>([[{ id: 'k2' }, 2], [{ id: 'k3' }, 4]])
    const expected = new Map<User, number>([[{ id: 'k1' }, 1], [{ id: 'k2' }, 5], [{ id: 'k3' }, 4]])
    const S2 = M.getMonoid(setoidUser, semigroupSum)
    assert.deepStrictEqual(S2.concat(d1, d2), expected)
  })

  describe('map', () => {
    describe('functor', () => {
      it('map', () => {
        const map = M.map.map
        const d1 = new Map<string, number>([['k1', 1], ['k2', 2]])
        const expected = new Map<string, number>([['k1', 2], ['k2', 4]])
        const double = (n: number): number => n * 2
        assert.deepStrictEqual(map(d1, double), expected)
      })
    })
    describe('filterable', () => {
      it('compact', () => {
        const compact = M.map.compact
        const fooBar = new Map<string, Option<number>>([['foo', none], ['bar', some(123)]])
        const bar = new Map<string, number>([['bar', 123]])
        assert.deepStrictEqual(compact(fooBar), bar)
      })

      it('partitionMap', () => {
        const partitionMap = M.map.partitionMap
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
        const a0 = new Map<string, number>([['a', 0]])
        const b4 = new Map<string, number>([['b', 4]])
        const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
        assert.deepStrictEqual(partitionMap(emptyMap, f), { left: emptyMap, right: emptyMap })
        assert.deepStrictEqual(partitionMap(a1b3, f), {
          left: a0,
          right: b4
        })
      })

      it('partition', () => {
        const partition = M.map.partition
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
        const a1 = new Map<string, number>([['a', 1]])
        const b3 = new Map<string, number>([['b', 3]])
        assert.deepStrictEqual(partition(emptyMap, p), { left: emptyMap, right: emptyMap })
        assert.deepStrictEqual(partition(a1b3, p), {
          left: a1,
          right: b3
        })
      })

      it('separate', () => {
        const separate = M.map.separate
        const fooBar = new Map<string, Either<number, number>>([
          ['foo', left<number, number>(123)],
          ['bar', right<number, number>(123)]
        ])
        const foo = new Map<string, number>([['foo', 123]])
        const bar = new Map<string, number>([['bar', 123]])
        assert.deepStrictEqual(separate(fooBar), {
          left: foo,
          right: bar
        })
      })

      it('filter', () => {
        const filter = M.map.filter
        const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
        const b3 = new Map<string, number>([['b', 3]])
        assert.deepStrictEqual(filter(a1b3, p), b3)

        // refinements
        const isNumber = (u: string | number): u is number => typeof u === 'number'
        const y = new Map<string, string | number>([['a', 1], ['b', 'foo']])
        const a1 = new Map<string, number>([['a', 1]])
        const actual = filter(y, isNumber)
        assert.deepStrictEqual(actual, a1)
      })

      it('filterMap', () => {
        const filterMap = M.map.filterMap
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
        const b4 = new Map<string, number>([['b', 4]])
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
      const optionTraverseWithIndex = M.getTraversableWithIndex(ordUser).traverseWithIndex(option)
      const d1 = new Map<User, number>([[{ id: 'k1' }, 1], [{ id: 'k2' }, 2]])
      const t1 = optionTraverseWithIndex(
        d1,
        (k, n): Option<number> => (!ordUser.equals(k, { id: 'k1' }) ? some(n) : none)
      )
      assert.deepStrictEqual(t1, none)
      const d2 = new Map<User, number>([[{ id: 'k1' }, 2], [{ id: 'k2' }, 3]])
      const t2 = optionTraverseWithIndex(
        d2,
        (k, n): Option<number> => (!ordUser.equals(k, { id: 'k3' }) ? some(n) : none)
      )
      const expected = new Map<User, number>([[{ id: 'k1' }, 2], [{ id: 'k2' }, 3]])
      assert.deepStrictEqual(t2, some(expected))
    })

    describe('getTraversable', () => {
      it('traverse', () => {
        const optionTraverse = M.getTraversableWithIndex(ordUser).traverse(option)
        const x = new Map<User, number>([[{ id: 'k1' }, 1], [{ id: 'k2' }, 2]])
        assert.deepStrictEqual(optionTraverse(x, n => (n <= 2 ? some(n) : none)), some(x))
        assert.deepStrictEqual(optionTraverse(x, n => (n >= 2 ? some(n) : none)), none)
      })

      it('sequence', () => {
        const optionSequence = M.getTraversableWithIndex(ordUser).sequence(option)
        const m1 = new Map<User, Option<number>>([[{ id: 'k1' }, some(1)], [{ id: 'k2' }, some(2)]])
        const m2 = new Map<User, Option<number>>([[{ id: 'k1' }, none], [{ id: 'k2' }, some(2)]])
        assert.deepStrictEqual(optionSequence(m1), some(new Map<User, number>([[{ id: 'k1' }, 1], [{ id: 'k2' }, 2]])))
        assert.deepStrictEqual(optionSequence(m2), none)
      })
    })

    describe('getFoldable', () => {
      it('reduce', () => {
        const d1 = new Map<User, string>([[{ id: 'k1' }, 'a'], [{ id: 'k2' }, 'b']])
        const reduceO = M.getTraversableWithIndex(ordUser).reduce
        assert.strictEqual(reduceO(d1, '', (b, a) => b + a), 'ab')
        const d2 = new Map<User, string>([[{ id: 'k2' }, 'b'], [{ id: 'k1' }, 'a']])
        assert.strictEqual(reduceO(d2, '', (b, a) => b + a), 'ab')
      })

      it('foldMap', () => {
        const foldMapOM = M.getTraversableWithIndex(ordUser).foldMap(monoidString)
        const m = new Map<User, string>([[{ id: 'a' }, 'a'], [{ id: 'a' }, 'b']])
        assert.strictEqual(foldMapOM(m, identity), 'ab')
      })

      it('foldr', () => {
        const foldrO = M.getTraversableWithIndex(ordUser).foldr
        const m = new Map<User, string>([[{ id: 'a' }, 'a'], [{ id: 'b' }, 'b']])
        const init = ''
        const f = (a: string, acc: string) => acc + a
        assert.strictEqual(foldrO(m, init, f), 'ba')
      })
    })

    describe('getFoldableWithIndex', () => {
      it('reduceWithIndex', () => {
        const d1 = new Map<User, string>([[{ id: 'k1' }, 'a'], [{ id: 'k2' }, 'b']])
        const reduceWithIndexO = M.getTraversableWithIndex(ordUser).reduceWithIndex
        assert.strictEqual(reduceWithIndexO(d1, '', (k, b, a) => b + k.id + a), 'k1ak2b')
        const d2 = new Map<User, string>([[{ id: 'k2' }, 'b'], [{ id: 'k1' }, 'a']])
        assert.strictEqual(reduceWithIndexO(d2, '', (k, b, a) => b + k.id + a), 'k1ak2b')
      })

      it('foldMapWithIndex', () => {
        const foldMapWithIndexOM = M.getTraversableWithIndex(ordUser).foldMapWithIndex(monoidString)
        const m = new Map<User, string>([[{ id: 'k1' }, 'a'], [{ id: 'k2' }, 'b']])
        assert.strictEqual(foldMapWithIndexOM(m, (k, a) => k.id + a), 'k1ak2b')
      })

      it('foldrWithIndex', () => {
        const foldrWithIndexO = M.getTraversableWithIndex(ordUser).foldrWithIndex
        const m = new Map<User, string>([[{ id: 'k1' }, 'a'], [{ id: 'k2' }, 'b']])
        assert.strictEqual(foldrWithIndexO(m, '', (k, a, b) => b + k.id + a), 'k2bk1a')
      })
    })

    describe('getFunctorWithIndex', () => {
      it('mapWithIndex', () => {
        const mapWithIndex = M.getTraversableWithIndex(ordUser).mapWithIndex
        const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
        const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
        assert.deepStrictEqual(mapWithIndex(aa1, (k, a) => a + k.id.length), aa3)
      })
    })
  })

  describe('getWitherable', () => {
    it('wither', () => {
      const emptyMap = new Map<User, number>()
      const a1b3 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 3]])
      const b4 = new Map<User, number>([[{ id: 'b' }, 4]])
      const witherIdentity = M.getWitherable(ordUser).wither(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(witherIdentity(emptyMap, f), new I.Identity(emptyMap))
      assert.deepStrictEqual(witherIdentity(a1b3, f), new I.Identity(b4))
    })

    it('wilt', () => {
      const emptyMap = new Map<User, number>()
      const a1b3 = new Map<User, number>([[{ id: 'a' }, 1], [{ id: 'b' }, 3]])
      const a0 = new Map<User, number>([[{ id: 'a' }, 0]])
      const b4 = new Map<User, number>([[{ id: 'b' }, 4]])
      const wiltIdentity = M.getWitherable(ordUser).wilt(I.identity)
      const f = (n: number) => new I.Identity(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(wiltIdentity(emptyMap, f), new I.Identity({ left: emptyMap, right: emptyMap }))
      assert.deepStrictEqual(wiltIdentity(a1b3, f), new I.Identity({ left: a0, right: b4 }))
    })
  })

  describe('getFilterableWithIndex', () => {
    it('partitionMapWithIndex', () => {
      const partitionMapWithIndex = M.getFilterableWithIndex<string>().partitionMapWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
      const a0 = new Map<string, number>([['a', 0]])
      const b4 = new Map<string, number>([['b', 4]])
      const f = (K: string, n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(partitionMapWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionMapWithIndex(a1b3, f), {
        left: a0,
        right: b4
      })
    })

    it('partitionWithIndex', () => {
      const partitionWithIndex = M.getFilterableWithIndex<string>().partitionWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
      const a1 = new Map<string, number>([['a', 1]])
      const b3 = new Map<string, number>([['b', 3]])
      const f = (k: string, n: number) => p(n)
      assert.deepStrictEqual(partitionWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionWithIndex(a1b3, f), {
        left: a1,
        right: b3
      })
    })

    it('filterMapWithIndex', () => {
      const filterMapWithIndex = M.getFilterableWithIndex<string>().filterMapWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
      const b4 = new Map<string, number>([['b', 4]])
      const f = (k: string, n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(filterMapWithIndex(emptyMap, f), emptyMap)
      assert.deepStrictEqual(filterMapWithIndex(a1b3, f), b4)
    })

    it('filterWithIndex', () => {
      const filterWithIndex = M.getFilterableWithIndex<string>().filterWithIndex
      const a1b3 = new Map<string, number>([['a', 1], ['b', 3]])
      const b3 = new Map<string, number>([['b', 3]])
      const f = (k: string, n: number) => p(n)
      assert.deepStrictEqual(filterWithIndex(a1b3, f), b3)

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
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const fromFoldableS = M.fromFoldable(setoidUser, array)
    assert.deepStrictEqual(fromFoldableS([[{ id: 'a' }, 1]], (existing, _) => existing), a1)
    assert.deepStrictEqual(fromFoldableS([[{ id: 'a' }, 1], [{ id: 'a' }, 2]], (existing, _) => existing), a1)
    assert.deepStrictEqual(fromFoldableS([[{ id: 'a' }, 1], [{ id: 'a' }, 2]], (_, a) => a), a2)
  })
})
