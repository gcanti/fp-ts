import * as assert from 'assert'
import { Either, left, right } from '../src/Either'
import { Eq, fromEquals } from '../src/Eq'
import { identity, pipe, Refinement } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyMap'
import { getFirstSemigroup, getLastSemigroup, getStructSemigroup } from '../src/Semigroup'
import { separated } from '../src/Separated'
import { getStructShow, Show } from '../src/Show'
import * as S from '../src/string'
import * as T from '../src/Task'
import * as U from './util'

interface User {
  readonly id: string
}

const ordUser = pipe(
  S.Ord,
  Ord.contramap((u: User) => u.id)
)

const eqUser: Eq<User> = { equals: ordUser.equals }

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

interface Key {
  readonly id: number
}

interface Value {
  readonly value: number
}

const eqKey: Eq<Key> = fromEquals((x, y) => x.id % 3 === y.id % 3)

const ordKey = Ord.fromCompare<Key>((x, y) => N.Ord.compare(x.id % 3, y.id % 3))

const eqValue: Eq<Value> = fromEquals((x, y) => x.value % 3 === y.value % 3)

const semigroupValue = getStructSemigroup({ value: N.SemigroupSum })

const key1 = { id: 1 }
const value1 = { value: 1 }
const repo = new Map<Key, Value>([
  [key1, value1],
  [{ id: 2 }, { value: 2 }]
])

describe('ReadonlyMap', () => {
  describe('pipeables', () => {
    it('map', () => {
      const double = (n: number): number => n * 2
      U.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['k1', 1],
            ['k2', 2]
          ]),
          _.map(double)
        ),
        new Map<string, number>([
          ['k1', 2],
          ['k2', 4]
        ])
      )
    })

    it('filter', () => {
      U.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['a', 1],
            ['b', 3]
          ]),
          _.filter(p)
        ),
        new Map<string, number>([['b', 3]])
      )

      // refinements
      const isNumber = (u: string | number): u is number => typeof u === 'number'
      U.deepStrictEqual(
        pipe(
          new Map<string, string | number>([
            ['a', 1],
            ['b', 'foo']
          ]),
          _.filter(isNumber)
        ),
        new Map<string, number>([['a', 1]])
      )
    })

    it('filterMap', () => {
      const empty = new Map<string, number>()
      const f = (n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(pipe(empty, _.filterMap(f)), empty)
      U.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['a', 1],
            ['b', 3]
          ]),
          _.filterMap(f)
        ),
        new Map<string, number>([['b', 4]])
      )
    })

    it('partitionMap', () => {
      const empty = new Map<string, number>()
      const f = (n: number) => (p(n) ? right(n + 1) : left(n - 1))
      U.deepStrictEqual(pipe(empty, _.partitionMap(f)), separated(empty, empty))
      U.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['a', 1],
            ['b', 3]
          ]),
          _.partitionMap(f)
        ),
        separated(
          new Map<string, number>([['a', 0]]),
          new Map<string, number>([['b', 4]])
        )
      )
    })

    it('partition', () => {
      const empty = new Map<string, number>()
      U.deepStrictEqual(pipe(empty, _.partition(p)), separated(empty, empty))
      U.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['a', 1],
            ['b', 3]
          ]),
          _.partition(p)
        ),
        separated(
          new Map<string, number>([['a', 1]]),
          new Map<string, number>([['b', 3]])
        )
      )
    })
  })

  it('size', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    U.deepStrictEqual(_.size(emptyMap), 0)
    U.deepStrictEqual(_.size(a1), 1)

    U.deepStrictEqual(_.size(_.empty), 0)
    U.deepStrictEqual(_.size(new Map()), 0)
    U.deepStrictEqual(_.size(new Map([['a', 1]])), 1)
  })

  it('isEmpty', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    U.deepStrictEqual(_.isEmpty(emptyMap), true)
    U.deepStrictEqual(_.isEmpty(a1), false)

    U.deepStrictEqual(_.isEmpty(_.empty), true)
    U.deepStrictEqual(_.isEmpty(new Map()), true)
    U.deepStrictEqual(_.isEmpty(new Map([['a', 1]])), false)
  })

  it('member', () => {
    const x = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const memberS = _.member(eqUser)
    U.deepStrictEqual(memberS({ id: 'a' }, x), true)
    U.deepStrictEqual(memberS({ id: 'c' }, x), false)
    U.deepStrictEqual(memberS({ id: 'a' })(x), true)
    U.deepStrictEqual(memberS({ id: 'c' })(x), false)

    const member = _.member(eqKey)
    U.deepStrictEqual(member({ id: 1 }, repo), true)
    U.deepStrictEqual(member({ id: 2 }, repo), true)
    U.deepStrictEqual(member({ id: 4 }, repo), true)
    U.deepStrictEqual(member({ id: 3 }, repo), false)
    U.deepStrictEqual(member({ id: 1 })(repo), true)
    U.deepStrictEqual(member({ id: 2 })(repo), true)
    U.deepStrictEqual(member({ id: 4 })(repo), true)
    U.deepStrictEqual(member({ id: 3 })(repo), false)
  })

  it('elem', () => {
    const x = new Map<string, number>([
      ['a', 1],
      ['b', 2]
    ])
    const elemS = _.elem(N.Eq)
    U.deepStrictEqual(elemS(2, x), true)
    U.deepStrictEqual(elemS(3, x), false)
    U.deepStrictEqual(elemS(2)(x), true)
    U.deepStrictEqual(elemS(3)(x), false)

    const elem = _.elem(eqValue)
    U.deepStrictEqual(elem({ value: 1 })(repo), true)
    U.deepStrictEqual(elem({ value: 2 })(repo), true)
    U.deepStrictEqual(elem({ value: 4 })(repo), true)
    U.deepStrictEqual(elem({ value: 3 })(repo), false)
    U.deepStrictEqual(elem({ value: 1 })(repo), true)
    U.deepStrictEqual(elem({ value: 2 })(repo), true)
    U.deepStrictEqual(elem({ value: 4 })(repo), true)
    U.deepStrictEqual(elem({ value: 3 })(repo), false)
  })

  it('keys', () => {
    const m = new Map<User, number>([
      [{ id: 'b' }, 2],
      [{ id: 'a' }, 1]
    ])
    const ks = _.keys(ordUser)(m)
    U.deepStrictEqual(ks, Array.from(m.keys()).sort(ordUser.compare))
    U.deepStrictEqual(ks, [{ id: 'a' }, { id: 'b' }])

    U.deepStrictEqual(
      _.keys(S.Ord)(
        new Map([
          ['a', 1],
          ['b', 2]
        ])
      ),
      ['a', 'b']
    )
    U.deepStrictEqual(
      _.keys(S.Ord)(
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
    U.deepStrictEqual(vals, Array.from(m.values()).sort(ordUser.compare))
    U.deepStrictEqual(vals, [{ id: 'a' }, { id: 'b' }])
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
    U.deepStrictEqual(collectO(f)(m1), [2, 3])
    U.deepStrictEqual(collectO(f)(m2), [2, 3])

    const collect = _.collect(ordKey)
    const g = (k: Key, a: Value): readonly [number, number] => [k.id, a.value]
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(toArrayO(m1), [
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    U.deepStrictEqual(toArrayO(m2), [
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])

    const toArray = _.toReadonlyArray(ordKey)
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    const toUnfoldableO = _.toUnfoldable(ordUser, RA.Unfoldable)
    U.deepStrictEqual(toUnfoldableO(a1), [[{ id: 'a' }, 1]])

    const toUnfoldable = _.toUnfoldable(ordKey, RA.Unfoldable)
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(
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
    U.deepStrictEqual(insertS({ id: 'a' }, 1)(emptyMap), a1)
    U.deepStrictEqual(insertS({ id: 'a' }, 1)(a1b2), a1b2)
    U.deepStrictEqual(insertS({ id: 'a' }, 2)(a1b2), a2b2)
    U.deepStrictEqual(insertS({ id: 'c' }, 3)(a1b2), a1b2c3)

    const insert = _.insertAt(eqKey)
    U.deepStrictEqual(insert({ id: 1 }, { value: 1 })(_.empty), new Map([[{ id: 1 }, { value: 1 }]]))
    const x = insert({ id: 1 }, value1)(repo)
    U.deepStrictEqual(
      x,
      new Map<Key, Value>([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    U.deepStrictEqual(x.get(key1), value1)
    U.deepStrictEqual(
      insert({ id: 1 }, { value: 2 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 2 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    U.deepStrictEqual(
      insert({ id: 4 }, { value: 2 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 2 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    U.deepStrictEqual(
      insert({ id: 3 }, { value: 3 })(repo),
      new Map<Key, Value>([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    // should not modify the source
    U.deepStrictEqual(
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
    U.deepStrictEqual(removeS({ id: 'a' })(a1b2), b2)
    U.deepStrictEqual(a1b2, a1b2_)
    U.deepStrictEqual(removeS({ id: 'c' })(a1b2), a1b2)

    const remove = _.deleteAt(eqKey)
    U.deepStrictEqual(remove({ id: 1 })(repo), new Map([[{ id: 2 }, { value: 2 }]]))
    U.deepStrictEqual(remove({ id: 4 })(repo), new Map([[{ id: 2 }, { value: 2 }]]))
    U.deepStrictEqual(remove({ id: 3 })(repo), repo)
    // should not modify the source
    U.deepStrictEqual(
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
    assert.deepStrictEqual(popS({ id: 'a' })(a1b2), O.some([1, b2]))
    U.deepStrictEqual(popS({ id: 'c' })(a1b2), O.none)

    const pop = _.pop(eqKey)
    assert.deepStrictEqual(pop({ id: 1 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    assert.deepStrictEqual(pop({ id: 4 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    U.deepStrictEqual(pop({ id: 3 })(repo), O.none)
    // should not modify the source
    U.deepStrictEqual(
      repo,
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  it('lookupWithKey', () => {
    const x = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupWithKeyS = _.lookupWithKey(eqUser)
    assert.deepStrictEqual(lookupWithKeyS({ id: 'a' }, x), O.some([{ id: 'a' }, 1]))
    U.deepStrictEqual(lookupWithKeyS({ id: 'b' }, x), O.none)
    assert.deepStrictEqual(lookupWithKeyS({ id: 'a' })(x), O.some([{ id: 'a' }, 1]))
    U.deepStrictEqual(lookupWithKeyS({ id: 'b' })(x), O.none)

    const lookupWithKey = _.lookupWithKey(eqKey)
    assert.deepStrictEqual(lookupWithKey({ id: 1 }, repo), O.some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 4 }, repo), O.some([{ id: 1 }, { value: 1 }]))
    U.deepStrictEqual(lookupWithKey({ id: 3 }, repo), O.none)
    assert.deepStrictEqual(lookupWithKey({ id: 1 })(repo), O.some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 4 })(repo), O.some([{ id: 1 }, { value: 1 }]))
    U.deepStrictEqual(lookupWithKey({ id: 3 })(repo), O.none)
  })

  it('lookup', () => {
    const x = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupS = _.lookup(eqUser)
    U.deepStrictEqual(lookupS({ id: 'a' }, x), O.some(1))
    U.deepStrictEqual(lookupS({ id: 'b' }, x), O.none)
    U.deepStrictEqual(lookupS({ id: 'a' })(x), O.some(1))
    U.deepStrictEqual(lookupS({ id: 'b' })(x), O.none)

    const lookup = _.lookup(eqKey)
    U.deepStrictEqual(lookup({ id: 1 }, repo), O.some({ value: 1 }))
    U.deepStrictEqual(lookup({ id: 4 }, repo), O.some({ value: 1 }))
    U.deepStrictEqual(lookup({ id: 3 }, repo), O.none)
    U.deepStrictEqual(lookup({ id: 1 })(repo), O.some({ value: 1 }))
    U.deepStrictEqual(lookup({ id: 4 })(repo), O.some({ value: 1 }))
    U.deepStrictEqual(lookup({ id: 3 })(repo), O.none)
  })

  it('isSubmap', () => {
    const me = new Map<User, number>([[{ id: 'a' }, 1]])
    const that = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const isSubmapS = _.isSubmap(eqUser, N.Eq)
    U.deepStrictEqual(isSubmapS(me, that), true)
    U.deepStrictEqual(isSubmapS(that)(me), true)

    const isSubmap = _.isSubmap(eqKey, eqValue)
    U.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 1 }]]), repo), true)
    U.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 2 }]]), repo), false)
    U.deepStrictEqual(isSubmap(new Map([[{ id: 1 }, { value: 4 }]]), repo), true)
    U.deepStrictEqual(isSubmap(new Map([[{ id: 4 }, { value: 1 }]]), repo), true)
    U.deepStrictEqual(isSubmap(new Map([[{ id: 3 }, { value: 3 }]]), repo), false)

    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 1 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 2 }]]), isSubmap(repo)), false)
    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 4 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 4 }, { value: 1 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 3 }, { value: 3 }]]), isSubmap(repo)), false)
  })

  it('empty', () => {
    assert.deepStrictEqual(_.empty, new Map<string, number>())
    U.deepStrictEqual(_.isEmpty(_.empty), true)
  })

  it('singleton', () => {
    U.deepStrictEqual(
      _.singleton('k1', 0),
      new Map<string, number>([['k1', 0]])
    )
  })

  it('getEq', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1_ = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const b1 = new Map<User, number>([[{ id: 'b' }, 1]])
    const S = _.getEq(eqUser, N.Eq)
    U.deepStrictEqual(S.equals(a1, a1), true)
    U.deepStrictEqual(S.equals(a1, a1_), true)
    U.deepStrictEqual(S.equals(a1_, a1), true)
    U.deepStrictEqual(S.equals(a1, a2), false)
    U.deepStrictEqual(S.equals(a2, a1), false)
    U.deepStrictEqual(S.equals(a1, b1), false)
    U.deepStrictEqual(S.equals(b1, a1), false)

    const equals = _.getEq(eqKey, eqValue).equals
    U.deepStrictEqual(equals(repo, repo), true)
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 2 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      false
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 4 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 4 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ]),
        repo
      ),
      true
    )
    U.deepStrictEqual(
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
    const M1 = _.getMonoid(eqUser, N.SemigroupSum)
    U.deepStrictEqual(M1.concat(d1, d2), expected)
    U.deepStrictEqual(M1.concat(d1, M1.empty), d1)
    U.deepStrictEqual(M1.concat(M1.empty, d2), d2)

    const M2 = _.getMonoid(eqKey, semigroupValue)
    U.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 3 }, { value: 3 }]])),
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    U.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 1 }, { value: 2 }]])),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    U.deepStrictEqual(
      M2.concat(repo, new Map([[{ id: 4 }, { value: 2 }]])),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  describe('readonlyMap', () => {
    describe('compactable', () => {
      it('compact', () => {
        const fooBar = new Map<string, O.Option<number>>([
          ['foo', O.none],
          ['bar', O.some(123)]
        ])
        const bar = new Map<string, number>([['bar', 123]])
        U.deepStrictEqual(_.compact(fooBar), bar)
      })

      it('separate', () => {
        const fooBar = new Map<string, Either<number, number>>([
          ['foo', left(123)],
          ['bar', right(123)]
        ])
        const foo = new Map<string, number>([['foo', 123]])
        const bar = new Map<string, number>([['bar', 123]])
        U.deepStrictEqual(_.separate(fooBar), separated(foo, bar))
      })
    })
  })

  describe('getTraversable', () => {
    const T = _.getTraversable(ordUser)

    it('traverse', () => {
      const traverse = T.traverse(O.Applicative)
      const x = new Map([
        [{ id: 'k1' }, 1],
        [{ id: 'k2' }, 2]
      ])
      U.deepStrictEqual(
        traverse(x, (n) => (n <= 2 ? O.some(n) : O.none)),
        O.some(x)
      )
      U.deepStrictEqual(
        traverse(x, (n) => (n >= 2 ? O.some(n) : O.none)),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = T.sequence(O.Applicative)
      U.deepStrictEqual(
        sequence(
          new Map([
            [{ id: 'k1' }, O.some(1)],
            [{ id: 'k2' }, O.some(2)]
          ])
        ),
        O.some(
          new Map<User, number>([
            [{ id: 'k1' }, 1],
            [{ id: 'k2' }, 2]
          ])
        )
      )
      U.deepStrictEqual(
        sequence(
          new Map([
            [{ id: 'k1' }, O.none],
            [{ id: 'k2' }, O.some(2)]
          ])
        ),
        O.none
      )
    })
  })

  describe('getWitherable', () => {
    const W = _.getWitherable(ordUser)

    it('traverseWithIndex should sort the keys', () => {
      const W = _.getWitherable(S.Ord)
      // tslint:disable-next-line: readonly-array
      const log: Array<string> = []
      const append = (message: string): IO.IO<void> => () => {
        log.push(message)
      }

      W.traverseWithIndex(IO.Applicative)(
        new Map([
          ['b', append('b')],
          ['a', append('a')]
        ]),
        (_, io) => io
      )()
      U.deepStrictEqual(log, ['a', 'b'])
    })

    it('reduce', () => {
      const d1 = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      const reduceO = W.reduce
      U.deepStrictEqual(
        reduceO(d1, '', (b, a) => b + a),
        'ab'
      )
      const d2 = new Map<User, string>([
        [{ id: 'k2' }, 'b'],
        [{ id: 'k1' }, 'a']
      ])
      U.deepStrictEqual(
        reduceO(d2, '', (b, a) => b + a),
        'ab'
      )
    })

    it('foldMap', () => {
      const foldMapOM = W.foldMap(S.Monoid)
      const m = new Map<User, string>([
        [{ id: 'a' }, 'a'],
        [{ id: 'a' }, 'b']
      ])
      U.deepStrictEqual(foldMapOM(m, identity), 'ab')
    })

    it('reduceRight', () => {
      const reduceRightO = W.reduceRight
      const m = new Map<User, string>([
        [{ id: 'a' }, 'a'],
        [{ id: 'b' }, 'b']
      ])
      const init = ''
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(reduceRightO(m, init, f), 'ba')
    })

    it('reduceWithIndex', () => {
      const d1 = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      const reduceWithIndexO = W.reduceWithIndex
      U.deepStrictEqual(
        reduceWithIndexO(d1, '', (k, b, a) => b + k.id + a),
        'k1ak2b'
      )
      const d2 = new Map<User, string>([
        [{ id: 'k2' }, 'b'],
        [{ id: 'k1' }, 'a']
      ])
      U.deepStrictEqual(
        reduceWithIndexO(d2, '', (k, b, a) => b + k.id + a),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      const foldMapWithIndexOM = W.foldMapWithIndex(S.Monoid)
      const m = new Map<User, string>([
        [{ id: 'k1' }, 'a'],
        [{ id: 'k2' }, 'b']
      ])
      U.deepStrictEqual(
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
      U.deepStrictEqual(
        reduceRightWithIndexO(m, '', (k, a, b) => b + k.id + a),
        'k2bk1a'
      )
    })

    it('traverseWithIndex', () => {
      const traverseWithIndex = W.traverseWithIndex(O.Applicative)
      U.deepStrictEqual(
        traverseWithIndex(
          new Map([
            [{ id: 'k1' }, 1],
            [{ id: 'k2' }, 2]
          ]),
          (k, n): O.Option<number> => (!ordUser.equals(k, { id: 'k1' }) ? O.some(n) : O.none)
        ),
        O.none
      )
      U.deepStrictEqual(
        traverseWithIndex(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ]),
          (k, n): O.Option<number> => (!ordUser.equals(k, { id: 'k3' }) ? O.some(n) : O.none)
        ),
        O.some(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ])
        )
      )
    })

    it('wither', async () => {
      const wither = W.wither(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await wither(_.empty, f)(), _.empty)
      U.deepStrictEqual(
        await wither(
          new Map([
            [{ id: 'a' }, 1],
            [{ id: 'b' }, 3]
          ]),
          f
        )(),
        new Map([[{ id: 'b' }, 4]])
      )
    })

    it('wilt', async () => {
      const wilt = W.wilt(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? right(n + 1) : left(n - 1))
      U.deepStrictEqual(await wilt(_.empty, f)(), separated(_.empty, _.empty))
      U.deepStrictEqual(
        await wilt(
          new Map([
            [{ id: 'a' }, 1],
            [{ id: 'b' }, 3]
          ]),
          f
        )(),
        separated(new Map([[{ id: 'a' }, 0]]), new Map([[{ id: 'b' }, 4]]))
      )
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
      U.deepStrictEqual(partitionMapWithIndex(emptyMap, f), separated(emptyMap, emptyMap))
      U.deepStrictEqual(partitionMapWithIndex(a1b3, f), separated(a0, b4))
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
      U.deepStrictEqual(partitionWithIndex(emptyMap, f), separated(emptyMap, emptyMap))
      U.deepStrictEqual(partitionWithIndex(a1b3, f), separated(a1, b3))
    })

    it('filterMapWithIndex', () => {
      const filterMapWithIndex = _.getFilterableWithIndex<string>().filterMapWithIndex
      const emptyMap = new Map<string, number>()
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const b4 = new Map<string, number>([['b', 4]])
      const f = (_: string, n: number) => (p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(filterMapWithIndex(emptyMap, f), emptyMap)
      U.deepStrictEqual(filterMapWithIndex(a1b3, f), b4)
    })

    it('filterWithIndex', () => {
      const filterWithIndex = _.getFilterableWithIndex<string>().filterWithIndex
      const a1b3 = new Map<string, number>([
        ['a', 1],
        ['b', 3]
      ])
      const b3 = new Map<string, number>([['b', 3]])
      const f = (_: string, n: number) => p(n)
      U.deepStrictEqual(filterWithIndex(a1b3, f), b3)

      // refinements
      const filterWithIndexStr = _.getFilterableWithIndex<string>().filterWithIndex
      const isNumber = (_: string, u: string | number): u is number => typeof u === 'number'
      const y = new Map<string, string | number>([
        ['a', 1],
        ['b', 'foo']
      ])
      const a1 = new Map<string, number>([['a', 1]])
      const actual = filterWithIndexStr(y, isNumber)
      U.deepStrictEqual(actual, a1)
    })
  })

  it('fromFoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const fromFoldableS1 = _.fromFoldable(eqUser, getFirstSemigroup<number>(), RA.Foldable)
    U.deepStrictEqual(fromFoldableS1([[{ id: 'a' }, 1]]), a1)
    U.deepStrictEqual(
      fromFoldableS1([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a1
    )
    const fromFoldableS2 = _.fromFoldable(eqUser, getLastSemigroup<number>(), RA.Foldable)
    U.deepStrictEqual(
      fromFoldableS2([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a2
    )
  })

  it('getShow', () => {
    const showUser: Show<User> = getStructShow({ id: S.Show })
    const Sh = _.getShow(showUser, S.Show)
    const m1 = new Map<User, string>([])
    U.deepStrictEqual(Sh.show(m1), `new Map([])`)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    U.deepStrictEqual(Sh.show(m2), `new Map([[{ id: "a" }, "b"]])`)
    const m3 = new Map<User, string>([
      [{ id: 'a' }, 'b'],
      [{ id: 'c' }, 'd']
    ])
    U.deepStrictEqual(Sh.show(m3), `new Map([[{ id: "a" }, "b"], [{ id: "c" }, "d"]])`)
  })

  it('updateAt', () => {
    const m1 = new Map<User, string>([])
    U.deepStrictEqual(_.updateAt(eqUser)({ id: 'a' }, 'a')(m1), O.none)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    U.deepStrictEqual(
      _.updateAt(eqUser)({ id: 'a' }, 'a')(m2),
      O.some(
        new Map<User, string>([[{ id: 'a' }, 'a']])
      )
    )
  })

  it('modifyAt', () => {
    const m1 = new Map<User, number>([])
    U.deepStrictEqual(_.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m1), O.none)
    const m2 = new Map<User, number>([[{ id: 'a' }, 1]])
    U.deepStrictEqual(
      _.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m2),
      O.some(
        new Map<User, number>([[{ id: 'a' }, 2]])
      )
    )
  })

  it('fromMap', () => {
    const as = new Map([[1, 'a']])
    const bs = _.fromMap(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('toMap', () => {
    const as: ReadonlyMap<number, string> = new Map([[1, 'a']])
    const bs = _.toMap(as)
    U.deepStrictEqual(bs, as)
    assert.notStrictEqual(bs, as)
  })

  it('mapWithIndex', () => {
    const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
    const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
    U.deepStrictEqual(
      pipe(
        aa1,
        _.mapWithIndex((k, a) => a + k.id.length)
      ),
      aa3
    )
  })

  it('getFunctorWithIndex', () => {
    const FWI = _.getFunctorWithIndex<User>()
    const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
    const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
    U.deepStrictEqual(
      FWI.mapWithIndex(aa1, (k, a) => a + k.id.length),
      aa3
    )
  })
})
