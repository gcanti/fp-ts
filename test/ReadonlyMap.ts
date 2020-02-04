import * as assert from 'assert'
import * as _ from '../src/ReadonlyMap'
import { semigroupSum, getStructSemigroup, getFirstSemigroup, getLastSemigroup } from '../src/Semigroup'
import { monoidString } from '../src/Monoid'
import { Refinement, identity } from '../src/function'
import { option, some, none, Option } from '../src/Option'
import { Eq, eqNumber, fromEquals } from '../src/Eq'
import { array } from '../src/Array'
import { Either, left, right } from '../src/Either'
import * as I from '../src/Identity'
import { ord, ordString, fromCompare, ordNumber } from '../src/Ord'
import { showString, getStructShow, Show } from '../src/Show'

interface User {
  readonly id: string
}

const ordUser = ord.contramap(ordString, (u: User) => u.id)

const eqUser: Eq<User> = { equals: ordUser.equals }

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

interface Key {
  readonly id: number
}

interface Value {
  readonly value: number
}

const eqKey: Eq<Key> = fromEquals((x, y) => x.id % 3 === y.id % 3)

const ordKey = fromCompare<Key>((x, y) => ordNumber.compare(x.id % 3, y.id % 3))

const eqValue: Eq<Value> = fromEquals((x, y) => x.value % 3 === y.value % 3)

const semigroupValue = getStructSemigroup({ value: semigroupSum })

const key1 = { id: 1 }
const value1 = { value: 1 }
const repo = new Map<Key, Value>([
  [key1, value1],
  [{ id: 2 }, { value: 2 }]
])

describe('ReadonlyMap', () => {
  it('size', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    assert.deepStrictEqual(_.size(emptyMap), 0)
    assert.deepStrictEqual(_.size(a1), 1)

    assert.deepStrictEqual(_.size(_.empty), 0)
    assert.deepStrictEqual(_.size(new Map()), 0)
    assert.deepStrictEqual(_.size(new Map([['a', 1]])), 1)
  })

  it('isEmpty', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    assert.deepStrictEqual(_.isEmpty(emptyMap), true)
    assert.deepStrictEqual(_.isEmpty(a1), false)

    assert.deepStrictEqual(_.isEmpty(_.empty), true)
    assert.deepStrictEqual(_.isEmpty(new Map()), true)
    assert.deepStrictEqual(_.isEmpty(new Map([['a', 1]])), false)
  })

  it('member', () => {
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const memberS = _.member(eqUser)
    assert.deepStrictEqual(memberS({ id: 'a' }, a1b2), true)
    assert.deepStrictEqual(memberS({ id: 'c' }, a1b2), false)

    const member = _.member(eqKey)
    assert.deepStrictEqual(member({ id: 1 }, repo), true)
    assert.deepStrictEqual(member({ id: 2 }, repo), true)
    assert.deepStrictEqual(member({ id: 4 }, repo), true)
    assert.deepStrictEqual(member({ id: 3 }, repo), false)
  })

  it('elem', () => {
    const a1b2 = new Map<string, number>([
      ['a', 1],
      ['b', 2]
    ])
    const elemS = _.elem(eqNumber)
    assert.deepStrictEqual(elemS(2, a1b2), true)
    assert.deepStrictEqual(elemS(3, a1b2), false)

    const elem = _.elem(eqValue)
    assert.deepStrictEqual(elem({ value: 1 }, repo), true)
    assert.deepStrictEqual(elem({ value: 2 }, repo), true)
    assert.deepStrictEqual(elem({ value: 4 }, repo), true)
    assert.deepStrictEqual(elem({ value: 3 }, repo), false)
  })

  it('keys', () => {
    const m = new Map<User, number>([
      [{ id: 'b' }, 2],
      [{ id: 'a' }, 1]
    ])
    const ks = _.keys(ordUser)(m)
    assert.deepStrictEqual(ks, Array.from(m.keys()).sort(ordUser.compare))
    assert.deepStrictEqual(ks, [{ id: 'a' }, { id: 'b' }])

    assert.deepStrictEqual(
      _.keys(ordString)(
        new Map([
          ['a', 1],
          ['b', 2]
        ])
      ),
      ['a', 'b']
    )
    assert.deepStrictEqual(
      _.keys(ordString)(
        new Map([
          ['b', 2],
          ['a', 1]
        ])
      ),
      ['a', 'b']
    )
  })

  it('values', () => {
    const m = new Map<number, User>([
      [2, { id: 'b' }],
      [1, { id: 'a' }]
    ])
    const vals = _.values(ordUser)(m)
    assert.deepStrictEqual(vals, Array.from(m.values()).sort(ordUser.compare))
    assert.deepStrictEqual(vals, [{ id: 'a' }, { id: 'b' }])
  })

  it('collect', () => {
    const m1 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const m2 = new Map<User, number>([
      [{ id: 'b' }, 2],
      [{ id: 'a' }, 1]
    ])
    const collectO = _.collect(ordUser)
    const f = (_k: User, a: number): number => a + 1
    assert.deepStrictEqual(collectO(f)(m1), [2, 3])
    assert.deepStrictEqual(collectO(f)(m2), [2, 3])

    const collect = _.collect(ordKey)
    const g = (k: Key, a: Value): readonly [number, number] => [k.id, a.value]
    assert.deepStrictEqual(
      collect(g)(
        new Map([
          [{ id: 1 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      ),
      [
        [1, 1],
        [2, 2]
      ]
    )
    assert.deepStrictEqual(
      collect(g)(
        new Map([
          [{ id: 2 }, { value: 2 }],
          [{ id: 1 }, { value: 1 }]
        ])
      ),
      [
        [1, 1],
        [2, 2]
      ]
    )
    assert.deepStrictEqual(
      collect(g)(
        new Map([
          [{ id: 4 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      ),
      [
        [4, 1],
        [2, 2]
      ]
    )
    assert.deepStrictEqual(
      collect(g)(
        new Map([
          [{ id: 2 }, { value: 2 }],
          [{ id: 4 }, { value: 1 }]
        ])
      ),
      [
        [4, 1],
        [2, 2]
      ]
    )
  })

  it('toReadonlyArray', () => {
    const m1 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const m2 = new Map<User, number>([
      [{ id: 'b' }, 2],
      [{ id: 'a' }, 1]
    ])
    const toArrayO = _.toReadonlyArray(ordUser)
    assert.deepStrictEqual(toArrayO(m1), [
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    assert.deepStrictEqual(toArrayO(m2), [
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])

    const toArray = _.toReadonlyArray(ordKey)
    assert.deepStrictEqual(
      toArray(
        new Map([
          [{ id: 1 }, 1],
          [{ id: 2 }, 2]
        ])
      ),
      [
        [{ id: 1 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toArray(
        new Map([
          [{ id: 2 }, 2],
          [{ id: 1 }, 1]
        ])
      ),
      [
        [{ id: 1 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toArray(
        new Map([
          [{ id: 4 }, 1],
          [{ id: 2 }, 2]
        ])
      ),
      [
        [{ id: 4 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toArray(
        new Map([
          [{ id: 2 }, 2],
          [{ id: 4 }, 1]
        ])
      ),
      [
        [{ id: 4 }, 1],
        [{ id: 2 }, 2]
      ]
    )
  })

  it('toUnfoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const toUnfoldableO = _.toUnfoldable(ordUser, array)
    assert.deepStrictEqual(toUnfoldableO(a1), [[{ id: 'a' }, 1]])

    const toUnfoldable = _.toUnfoldable(ordKey, array)
    assert.deepStrictEqual(
      toUnfoldable(
        new Map([
          [{ id: 1 }, 1],
          [{ id: 2 }, 2]
        ])
      ),
      [
        [{ id: 1 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toUnfoldable(
        new Map([
          [{ id: 2 }, 2],
          [{ id: 1 }, 1]
        ])
      ),
      [
        [{ id: 1 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toUnfoldable(
        new Map([
          [{ id: 4 }, 1],
          [{ id: 2 }, 2]
        ])
      ),
      [
        [{ id: 4 }, 1],
        [{ id: 2 }, 2]
      ]
    )
    assert.deepStrictEqual(
      toUnfoldable(
        new Map([
          [{ id: 2 }, 2],
          [{ id: 4 }, 1]
        ])
      ),
      [
        [{ id: 4 }, 1],
        [{ id: 2 }, 2]
      ]
    )
  })

  it('insertAt', () => {
    const emptyMap = new Map<User, number>()
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const a2b2 = new Map<User, number>([
      [{ id: 'a' }, 2],
      [{ id: 'b' }, 2]
    ])
    const a1b2c3 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2],
      [{ id: 'c' }, 3]
    ])
    const insertS = _.insertAt(eqUser)
    assert.deepStrictEqual(insertS({ id: 'a' }, 1)(emptyMap), a1)
    assert.deepStrictEqual(insertS({ id: 'a' }, 1)(a1b2), a1b2)
    assert.deepStrictEqual(insertS({ id: 'a' }, 2)(a1b2), a2b2)
    assert.deepStrictEqual(insertS({ id: 'c' }, 3)(a1b2), a1b2c3)

    const insert = _.insertAt(eqKey)
    assert.deepStrictEqual(insert({ id: 1 }, { value: 1 })(_.empty), new Map([[{ id: 1 }, { value: 1 }]]))
    const x = insert({ id: 1 }, value1)(repo)
    assert.deepStrictEqual(
      x,
      new Map<Key, Value>([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    assert.deepStrictEqual(x.get(key1), value1)
    assert.deepStrictEqual(
      insert({ id: 1 }, { value: 2 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 2 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    assert.deepStrictEqual(
      insert({ id: 4 }, { value: 2 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 2 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    assert.deepStrictEqual(
      insert({ id: 3 }, { value: 3 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    // should not modify the source
    assert.deepStrictEqual(
      repo,
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  it('deleteAt', () => {
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const a1b2_ = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const b2 = new Map<User, number>([[{ id: 'b' }, 2]])
    const removeS = _.deleteAt(eqUser)
    assert.deepStrictEqual(removeS({ id: 'a' })(a1b2), b2)
    assert.deepStrictEqual(a1b2, a1b2_)
    assert.deepStrictEqual(removeS({ id: 'c' })(a1b2), a1b2)

    const remove = _.deleteAt(eqKey)
    assert.deepStrictEqual(remove({ id: 1 })(repo), new Map([[{ id: 2 }, { value: 2 }]]))
    assert.deepStrictEqual(remove({ id: 4 })(repo), new Map([[{ id: 2 }, { value: 2 }]]))
    assert.deepStrictEqual(remove({ id: 3 })(repo), repo)
    // should not modify the source
    assert.deepStrictEqual(
      repo,
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  it('pop', () => {
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const b2 = new Map<User, number>([[{ id: 'b' }, 2]])
    const popS = _.pop(eqUser)
    assert.deepStrictEqual(popS({ id: 'a' })(a1b2), some([1, b2]))
    assert.deepStrictEqual(popS({ id: 'c' })(a1b2), none)

    const pop = _.pop(eqKey)
    assert.deepStrictEqual(pop({ id: 1 })(repo), some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    assert.deepStrictEqual(pop({ id: 4 })(repo), some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    assert.deepStrictEqual(pop({ id: 3 })(repo), none)
    // should not modify the source
    assert.deepStrictEqual(
      repo,
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  it('lookupWithKey', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupWithKeyS = _.lookupWithKey(eqUser)
    assert.deepStrictEqual(lookupWithKeyS({ id: 'a' }, a1), some([{ id: 'a' }, 1]))
    assert.deepStrictEqual(lookupWithKeyS({ id: 'b' }, a1), none)

    const lookupWithKey = _.lookupWithKey(eqKey)
    assert.deepStrictEqual(lookupWithKey({ id: 1 }, repo), some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 4 }, repo), some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 3 }, repo), none)
  })

  it('lookup', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupS = _.lookup(eqUser)
    assert.deepStrictEqual(lookupS({ id: 'a' }, a1), some(1))
    assert.deepStrictEqual(lookupS({ id: 'b' }, a1), none)

    const lookup = _.lookup(eqKey)
    assert.deepStrictEqual(lookup({ id: 1 }, repo), some({ value: 1 }))
    assert.deepStrictEqual(lookup({ id: 4 }, repo), some({ value: 1 }))
    assert.deepStrictEqual(lookup({ id: 3 }, repo), none)
  })

  it('isSubmap', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const isSubmapS = _.isSubmap(eqUser, eqNumber)
    assert.deepStrictEqual(isSubmapS(a1, a1b2), true)

    const isSubmap = _.isSubmap(eqKey, eqValue)
    assert.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 1 }]]), repo), true)
    assert.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 2 }]]), repo), false)
    assert.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 4 }]]), repo), true)
    assert.deepStrictEqual(isSubmap(new Map([[{ id: 4 }, { value: 1 }]]), repo), true)
    assert.deepStrictEqual(isSubmap(new Map([[{ id: 3 }, { value: 3 }]]), repo), false)
  })

  it('empty', () => {
    assert.deepStrictEqual(_.empty, new Map<string, number>())
    assert.deepStrictEqual(_.isEmpty(_.empty), true)
  })

  it('singleton', () => {
    assert.deepStrictEqual(
      _.singleton('k1', 0),
      new Map<string, number>([['k1', 0]])
    )
  })

  it('getEq', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1_ = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const b1 = new Map<User, number>([[{ id: 'b' }, 1]])
    const S = _.getEq(eqUser, eqNumber)
    assert.deepStrictEqual(S.equals(a1, a1), true)
    assert.deepStrictEqual(S.equals(a1, a1_), true)
    assert.deepStrictEqual(S.equals(a1_, a1), true)
    assert.deepStrictEqual(S.equals(a1, a2), false)
    assert.deepStrictEqual(S.equals(a2, a1), false)
    assert.deepStrictEqual(S.equals(a1, b1), false)
    assert.deepStrictEqual(S.equals(b1, a1), false)

    const equals = _.getEq(eqKey, eqValue).equals
    assert.deepStrictEqual(equals(repo, repo), true)
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 2 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      false
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 4 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 4 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 3 }, { value: 3 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      false
    )
  })

  it('getMonoid', () => {
    const d1 = new Map<User, number>([
      [{ id: 'k1' }, 1],
      [{ id: 'k2' }, 3]
    ])
    const d2 = new Map<User, number>([
      [{ id: 'k2' }, 2],
      [{ id: 'k3' }, 4]
    ])
    const expected = new Map<User, number>([
      [{ id: 'k1' }, 1],
      [{ id: 'k2' }, 5],
      [{ id: 'k3' }, 4]
    ])
    const M1 = _.getMonoid(eqUser, semigroupSum)
    assert.deepStrictEqual(M1.concat(d1, d2), expected)
    assert.deepStrictEqual(M1.concat(d1, M1.empty), d1)
    assert.deepStrictEqual(M1.concat(M1.empty, d2), d2)

    const M2 = _.getMonoid(eqKey, semigroupValue)
    assert.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 3 }, { value: 3 }]])),
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    assert.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 1 }, { value: 2 }]])),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    assert.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 4 }, { value: 2 }]])),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  describe('readonlyMap', () => {
    describe('functor', () => {
      it('map', () => {
        const map = _.readonlyMap.map
        const d1 = new Map<string, number>([
          ['k1', 1],
          ['k2', 2]
        ])
        const expected = new Map<string, number>([
          ['k1', 2],
          ['k2', 4]
        ])
        const double = (n: number): number => n * 2
        assert.deepStrictEqual(map(d1, double), expected)
      })
    })

    describe('filterable', () => {
      it('compact', () => {
        const compact = _.readonlyMap.compact
        const fooBar = new Map<string, Option<number>>([
          ['foo', none],
          ['bar', some(123)]
        ])
        const bar = new Map<string, number>([['bar', 123]])
        assert.deepStrictEqual(compact(fooBar), bar)
      })

      it('partitionMap', () => {
        const partitionMap = _.readonlyMap.partitionMap
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ])
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
        const partition = _.readonlyMap.partition
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ])
        const a1 = new Map<string, number>([['a', 1]])
        const b3 = new Map<string, number>([['b', 3]])
        assert.deepStrictEqual(partition(emptyMap, p), { left: emptyMap, right: emptyMap })
        assert.deepStrictEqual(partition(a1b3, p), {
          left: a1,
          right: b3
        })
      })

      it('separate', () => {
        const separate = _.readonlyMap.separate
        const fooBar = new Map<string, Either<number, number>>([
          ['foo', left(123)],
          ['bar', right(123)]
        ])
        const foo = new Map<string, number>([['foo', 123]])
        const bar = new Map<string, number>([['bar', 123]])
        assert.deepStrictEqual(separate(fooBar), {
          left: foo,
          right: bar
        })
      })

      it('filter', () => {
        const filter = _.readonlyMap.filter
        const a1b3 = new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ])
        const b3 = new Map<string, number>([['b', 3]])
        assert.deepStrictEqual(filter(a1b3, p), b3)

        // refinements
        const isNumber = (u: string | number): u is number => typeof u === 'number'
        const y = new Map<string, string | number>([
          ['a', 1],
          ['b', 'foo']
        ])
        const a1 = new Map<string, number>([['a', 1]])
        const actual = filter(y, isNumber)
        assert.deepStrictEqual(actual, a1)
      })

      it('filterMap', () => {
        const filterMap = _.readonlyMap.filterMap
        const emptyMap = new Map<string, number>()
        const a1b3 = new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ])
        const b4 = new Map<string, number>([['b', 4]])
        const f = (n: number) => (p(n) ? some(n + 1) : none)
        assert.deepStrictEqual(filterMap(emptyMap, f), emptyMap)
        assert.deepStrictEqual(filterMap(a1b3, f), b4)
      })
    })
  })

  describe('getWitherable', () => {
    const W = _.getWitherable(ordUser)

    it('mapWithIndex', () => {
      const mapWithIndex = W.mapWithIndex
      const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
      const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
      assert.deepStrictEqual(
        mapWithIndex(aa1, (k, a) => a + k.id.length),
        aa3
      )
    })

    it('reduce', () => {
      const d1 = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      const reduceO = W.reduce
      assert.deepStrictEqual(
        reduceO(d1, '', (b, a) => b + a),
        'ab'
      )
      const d2 = new Map<User, string>([
        [{ id: 'k2' }, 'b'],
        [{ id: 'k1' }, 'a']
      ])
      assert.deepStrictEqual(
        reduceO(d2, '', (b, a) => b + a),
        'ab'
      )
    })

    it('foldMap', () => {
      const foldMapOM = W.foldMap(monoidString)
      const m = new Map<User, string>([
        [{ id: 'a' }, 'a'],
        [{ id: 'a' }, 'b']
      ])
      assert.deepStrictEqual(foldMapOM(m, identity), 'ab')
    })

    it('reduceRight', () => {
      const reduceRightO = W.reduceRight
      const m = new Map<User, string>([
        [{ id: 'a' }, 'a'],
        [{ id: 'b' }, 'b']
      ])
      const init = ''
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(reduceRightO(m, init, f), 'ba')
    })

    it('reduceWithIndex', () => {
      const d1 = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      const reduceWithIndexO = W.reduceWithIndex
      assert.deepStrictEqual(
        reduceWithIndexO(d1, '', (k, b, a) => b + k.id + a),
        'k1ak2b'
      )
      const d2 = new Map<User, string>([
        [{ id: 'k2' }, 'b'],
        [{ id: 'k1' }, 'a']
      ])
      assert.deepStrictEqual(
        reduceWithIndexO(d2, '', (k, b, a) => b + k.id + a),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      const foldMapWithIndexOM = W.foldMapWithIndex(monoidString)
      const m = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      assert.deepStrictEqual(
        foldMapWithIndexOM(m, (k, a) => k.id + a),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      const reduceRightWithIndexO = W.reduceRightWithIndex
      const m = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      assert.deepStrictEqual(
        reduceRightWithIndexO(m, '', (k, a, b) => b + k.id + a),
        'k2bk1a'
      )
    })

    it('traverse', () => {
      const optionTraverse = W.traverse(option)
      const x = new Map<User, number>([
        [{ id: 'k1' }, 1],
        [{ id: 'k2' }, 2]
      ])
      assert.deepStrictEqual(
        optionTraverse(x, n => (n <= 2 ? some(n) : none)),
        some(x)
      )
      assert.deepStrictEqual(
        optionTraverse(x, n => (n >= 2 ? some(n) : none)),
        none
      )
    })

    it('sequence', () => {
      const optionSequence = W.sequence(option)
      const m1 = new Map<User, Option<number>>([
        [{ id: 'k1' }, some(1)],
        [{ id: 'k2' }, some(2)]
      ])
      const m2 = new Map<User, Option<number>>([
        [{ id: 'k1' }, none],
        [{ id: 'k2' }, some(2)]
      ])
      assert.deepStrictEqual(
        optionSequence(m1),
        some(
          new Map<User, number>([
            [{ id: 'k1' }, 1],
            [{ id: 'k2' }, 2]
          ])
        )
      )
      assert.deepStrictEqual(optionSequence(m2), none)
    })

    it('traverseWithIndex', () => {
      const optionTraverseWithIndex = W.traverseWithIndex(option)
      const d1 = new Map<User, number>([
        [{ id: 'k1' }, 1],
        [{ id: 'k2' }, 2]
      ])
      const t1 = optionTraverseWithIndex(
        d1,
        (k, n): Option<number> => (!ordUser.equals(k, { id: 'k1' }) ? some(n) : none)
      )
      assert.deepStrictEqual(t1, none)
      const d2 = new Map<User, number>([
        [{ id: 'k1' }, 2],
        [{ id: 'k2' }, 3]
      ])
      const t2 = optionTraverseWithIndex(
        d2,
        (k, n): Option<number> => (!ordUser.equals(k, { id: 'k3' }) ? some(n) : none)
      )
      const expected = new Map<User, number>([
        [{ id: 'k1' }, 2],
        [{ id: 'k2' }, 3]
      ])
      assert.deepStrictEqual(t2, some(expected))
    })

    it('wither', () => {
      const emptyMap = new Map<User, number>()
      const a1b3 = new Map<User, number>([
        [{ id: 'a' }, 1],
        [{ id: 'b' }, 3]
      ])
      const b4 = new Map<User, number>([[{ id: 'b' }, 4]])
      const witherIdentity = W.wither(I.identity)
      const f = (n: number) => I.identity.of(p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(witherIdentity(emptyMap, f), I.identity.of(emptyMap))
      assert.deepStrictEqual(witherIdentity(a1b3, f), I.identity.of(b4))
    })

    it('wilt', () => {
      const emptyMap = new Map<User, number>()
      const a1b3 = new Map<User, number>([
        [{ id: 'a' }, 1],
        [{ id: 'b' }, 3]
      ])
      const a0 = new Map<User, number>([[{ id: 'a' }, 0]])
      const b4 = new Map<User, number>([[{ id: 'b' }, 4]])
      const wiltIdentity = W.wilt(I.identity)
      const f = (n: number) => I.identity.of(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(wiltIdentity(emptyMap, f), I.identity.of({ left: emptyMap, right: emptyMap }))
      assert.deepStrictEqual(wiltIdentity(a1b3, f), I.identity.of({ left: a0, right: b4 }))
    })
  })

  describe('getFilterableWithIndex', () => {
    it('partitionMapWithIndex', () => {
      const partitionMapWithIndex = _.getFilterableWithIndex<string>().partitionMapWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const a0 = new Map<string, number>([['a', 0]])
      const b4 = new Map<string, number>([['b', 4]])
      const f = (_: string, n: number) => (p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(partitionMapWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionMapWithIndex(a1b3, f), {
        left: a0,
        right: b4
      })
    })

    it('partitionWithIndex', () => {
      const partitionWithIndex = _.getFilterableWithIndex<string>().partitionWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const a1 = new Map<string, number>([['a', 1]])
      const b3 = new Map<string, number>([['b', 3]])
      const f = (_: string, n: number) => p(n)
      assert.deepStrictEqual(partitionWithIndex(emptyMap, f), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(partitionWithIndex(a1b3, f), {
        left: a1,
        right: b3
      })
    })

    it('filterMapWithIndex', () => {
      const filterMapWithIndex = _.getFilterableWithIndex<string>().filterMapWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const b4 = new Map<string, number>([['b', 4]])
      const f = (_: string, n: number) => (p(n) ? some(n + 1) : none)
      assert.deepStrictEqual(filterMapWithIndex(emptyMap, f), emptyMap)
      assert.deepStrictEqual(filterMapWithIndex(a1b3, f), b4)
    })

    it('filterWithIndex', () => {
      const filterWithIndex = _.getFilterableWithIndex<string>().filterWithIndex
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const b3 = new Map<string, number>([['b', 3]])
      const f = (_: string, n: number) => p(n)
      assert.deepStrictEqual(filterWithIndex(a1b3, f), b3)

      // refinements
      const filterWithIndexStr = _.getFilterableWithIndex<string>().filterWithIndex
      const isNumber = (_: string, u: string | number): u is number => typeof u === 'number'
      const y = new Map<string, string | number>([
        ['a', 1],
        ['b', 'foo']
      ])
      const a1 = new Map<string, number>([['a', 1]])
      const actual = filterWithIndexStr(y, isNumber)
      assert.deepStrictEqual(actual, a1)
    })
  })

  it('fromFoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const fromFoldableS1 = _.fromFoldable(eqUser, getFirstSemigroup<number>(), array)
    assert.deepStrictEqual(fromFoldableS1([[{ id: 'a' }, 1]]), a1)
    assert.deepStrictEqual(
      fromFoldableS1([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a1
    )
    const fromFoldableS2 = _.fromFoldable(eqUser, getLastSemigroup<number>(), array)
    assert.deepStrictEqual(
      fromFoldableS2([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a2
    )
  })

  it('getShow', () => {
    const showUser: Show<User> = getStructShow({ id: showString })
    const S = _.getShow(showUser, showString)
    const m1 = new Map<User, string>([])
    assert.deepStrictEqual(S.show(m1), `new Map([])`)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    assert.deepStrictEqual(S.show(m2), `new Map([[{ id: "a" }, "b"]])`)
    const m3 = new Map<User, string>([
      [{ id: 'a' }, 'b'],
      [{ id: 'c' }, 'd']
    ])
    assert.deepStrictEqual(S.show(m3), `new Map([[{ id: "a" }, "b"], [{ id: "c" }, "d"]])`)
  })

  it('updateAt', () => {
    const m1 = new Map<User, string>([])
    assert.deepStrictEqual(_.updateAt(eqUser)({ id: 'a' }, 'a')(m1), none)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    assert.deepStrictEqual(
      _.updateAt(eqUser)({ id: 'a' }, 'a')(m2),
      some(
        new Map<User, string>([[{ id: 'a' }, 'a']])
      )
    )
  })

  it('modifyAt', () => {
    const m1 = new Map<User, number>([])
    assert.deepStrictEqual(_.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m1), none)
    const m2 = new Map<User, number>([[{ id: 'a' }, 1]])
    assert.deepStrictEqual(
      _.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m2),
      some(
        new Map<User, number>([[{ id: 'a' }, 2]])
      )
    )
  })

  it('fromMap', () => {
    const as = new Map([[1, 'a']])
    const bs = _.fromMap(as)
    assert.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toMap', () => {
    const as: ReadonlyMap<number, string> = new Map([[1, 'a']])
    const bs = _.toMap(as)
    assert.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })
})
