import * as assert from 'assert'
import { Either, left, right } from '../src/Either'
import { Eq, eqNumber, fromEquals } from '../src/Eq'
import { identity, pipe, Refinement } from '../src/function'
import * as IO from '../src/IO'
import { monoidString } from '../src/Monoid'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as A from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyMap'
import { getFirstSemigroup, getLastSemigroup, getStructSemigroup, semigroupSum } from '../src/Semigroup'
import { getStructShow, Show, showString } from '../src/Show'
import * as T from '../src/Task'

interface User {
  readonly id: string
}

const ordUser = pipe(
  Ord.ordString,
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

const eqKey: Eq<Key> = fromEquals((second) => (first) => first.id % 3 === second.id % 3)

const ordKey = Ord.fromCompare<Key>((second) => {
  const f = Ord.ordNumber.compare(second.id % 3)
  return (first) => f(first.id % 3)
})

const eqValue: Eq<Value> = fromEquals((second) => (first) => first.value % 3 === second.value % 3)

const semigroupValue = getStructSemigroup({ value: semigroupSum })

const key1 = { id: 1 }
const value1 = { value: 1 }
const repo = new Map<Key, Value>([
  [key1, value1],
  [{ id: 2 }, { value: 2 }]
])

describe('ReadonlyMap', () => {
  // -------------------------------------------------------------------------------------
  // type class members
  // -------------------------------------------------------------------------------------

  it('map', () => {
    const double = (n: number): number => n * 2
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(pipe(empty, _.filterMap(f)), empty)
    assert.deepStrictEqual(
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
    assert.deepStrictEqual(pipe(empty, _.partitionMap(f)), { left: empty, right: empty })
    assert.deepStrictEqual(
      pipe(
        new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ]),
        _.partitionMap(f)
      ),
      {
        left: new Map<string, number>([['a', 0]]),
        right: new Map<string, number>([['b', 4]])
      }
    )
  })

  it('partition', () => {
    const empty = new Map<string, number>()
    assert.deepStrictEqual(pipe(empty, _.partition(p)), { left: empty, right: empty })
    assert.deepStrictEqual(
      pipe(
        new Map<string, number>([
          ['a', 1],
          ['b', 3]
        ]),
        _.partition(p)
      ),
      {
        left: new Map<string, number>([['a', 1]]),
        right: new Map<string, number>([['b', 3]])
      }
    )
  })

  it('compact', () => {
    const fooBar = new Map<string, O.Option<number>>([
      ['foo', O.none],
      ['bar', O.some(123)]
    ])
    const bar = new Map<string, number>([['bar', 123]])
    assert.deepStrictEqual(_.compact(fooBar), bar)
  })

  it('separate', () => {
    const fooBar = new Map<string, Either<number, number>>([
      ['foo', left(123)],
      ['bar', right(123)]
    ])
    const foo = new Map<string, number>([['foo', 123]])
    const bar = new Map<string, number>([['bar', 123]])
    assert.deepStrictEqual(_.separate(fooBar), {
      left: foo,
      right: bar
    })
  })

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('singleton', () => {
    assert.deepStrictEqual(
      _.singleton('k1', 0),
      new Map<string, number>([['k1', 0]])
    )
  })

  it('fromFoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const fromFoldableS1 = _.fromFoldable(eqUser, getFirstSemigroup<number>(), A.Foldable)
    assert.deepStrictEqual(fromFoldableS1([[{ id: 'a' }, 1]]), a1)
    assert.deepStrictEqual(
      fromFoldableS1([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a1
    )
    const fromFoldableS2 = _.fromFoldable(eqUser, getLastSemigroup<number>(), A.Foldable)
    assert.deepStrictEqual(
      fromFoldableS2([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a2
    )
  })

  // -------------------------------------------------------------------------------------
  // utils
  // -------------------------------------------------------------------------------------

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
    const x = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const memberS = _.member(eqUser)
    assert.deepStrictEqual(memberS({ id: 'a' })(x), true)
    assert.deepStrictEqual(memberS({ id: 'c' })(x), false)

    const member = _.member(eqKey)
    assert.deepStrictEqual(member({ id: 1 })(repo), true)
    assert.deepStrictEqual(member({ id: 2 })(repo), true)
    assert.deepStrictEqual(member({ id: 4 })(repo), true)
    assert.deepStrictEqual(member({ id: 3 })(repo), false)
  })

  it('elem', () => {
    const x = new Map<string, number>([
      ['a', 1],
      ['b', 2]
    ])
    const elemS = _.elem(eqNumber)
    assert.deepStrictEqual(elemS(2)(x), true)
    assert.deepStrictEqual(elemS(3)(x), false)

    const elem = _.elem(eqValue)
    assert.deepStrictEqual(elem({ value: 1 })(repo), true)
    assert.deepStrictEqual(elem({ value: 2 })(repo), true)
    assert.deepStrictEqual(elem({ value: 4 })(repo), true)
    assert.deepStrictEqual(elem({ value: 3 })(repo), false)
    assert.deepStrictEqual(elem({ value: 1 })(repo), true)
    assert.deepStrictEqual(elem({ value: 2 })(repo), true)
    assert.deepStrictEqual(elem({ value: 4 })(repo), true)
    assert.deepStrictEqual(elem({ value: 3 })(repo), false)
  })

  it('keys', () => {
    const m = new Map<User, number>([
      [{ id: 'b' }, 2],
      [{ id: 'a' }, 1]
    ])
    const ks = _.keys(ordUser)(m)
    assert.deepStrictEqual(
      ks,
      Array.from(m.keys()).sort((first, second) => ordUser.compare(second)(first))
    )
    assert.deepStrictEqual(ks, [{ id: 'a' }, { id: 'b' }])

    assert.deepStrictEqual(
      _.keys(Ord.ordString)(
        new Map([
          ['a', 1],
          ['b', 2]
        ])
      ),
      ['a', 'b']
    )
    assert.deepStrictEqual(
      _.keys(Ord.ordString)(
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
    assert.deepStrictEqual(
      vals,
      Array.from(m.values()).sort((first, second) => ordUser.compare(second)(first))
    )
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
    const toUnfoldableO = _.toUnfoldable(ordUser, A.Unfoldable)
    assert.deepStrictEqual(toUnfoldableO(a1), [[{ id: 'a' }, 1]])

    const toUnfoldable = _.toUnfoldable(ordKey, A.Unfoldable)
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
    const insert = _.insertAt(eqUser)
    const m: ReadonlyMap<User, number> = new Map([[{ id: 'a' }, 1]])
    assert.deepStrictEqual(pipe(_.empty, insert({ id: 'a' }, 1)), O.some(m))
    assert.deepStrictEqual(pipe(m, insert({ id: 'a' }, 1)), O.none)
  })

  it('upsertAt', () => {
    const upsert = _.upsertAt(eqUser)
    const m: ReadonlyMap<User, number> = new Map([[{ id: 'a' }, 1]])
    assert.deepStrictEqual(pipe(_.empty, upsert({ id: 'a' }, 1)), m)
    assert.deepStrictEqual(pipe(m, upsert({ id: 'a' }, 2)), new Map([[{ id: 'a' }, 2]]))
    assert.deepStrictEqual(
      pipe(m, upsert({ id: 'b' }, 2)),
      new Map([
        [{ id: 'a' }, 1],
        [{ id: 'b' }, 2]
      ])
    )
    // should return the same reference if nothing changed
    assert.strictEqual(pipe(m, upsert({ id: 'a' }, 1)), m)
  })

  it('deleteAt', () => {
    const m = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const del = _.deleteAt(eqUser)
    assert.deepStrictEqual(
      pipe(m, del({ id: 'a' })),
      new Map<User, number>([[{ id: 'b' }, 2]])
    )
    // should return the same reference if nothing changed
    assert.strictEqual(pipe(m, del({ id: 'c' })), m)
  })

  it('updateAt', () => {
    const m1 = new Map<User, string>([])
    assert.deepStrictEqual(_.updateAt(eqUser)({ id: 'a' }, 'a')(m1), O.none)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    assert.deepStrictEqual(
      _.updateAt(eqUser)({ id: 'a' }, 'a')(m2),
      O.some(
        new Map<User, string>([[{ id: 'a' }, 'a']])
      )
    )
  })

  it('modifyAt', () => {
    const m1 = new Map<User, number>([])
    assert.deepStrictEqual(_.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m1), O.none)
    const m2 = new Map<User, number>([[{ id: 'a' }, 1]])
    assert.deepStrictEqual(
      _.modifyAt(eqUser)({ id: 'a' }, (n: number) => n * 2)(m2),
      O.some(
        new Map<User, number>([[{ id: 'a' }, 2]])
      )
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
    assert.deepStrictEqual(popS({ id: 'c' })(a1b2), O.none)

    const pop = _.pop(eqKey)
    assert.deepStrictEqual(pop({ id: 1 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    assert.deepStrictEqual(pop({ id: 4 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])]))
    assert.deepStrictEqual(pop({ id: 3 })(repo), O.none)
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
    const x = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupWithKeyS = _.lookupWithKey(eqUser)
    assert.deepStrictEqual(lookupWithKeyS({ id: 'a' })(x), O.some([{ id: 'a' }, 1]))
    assert.deepStrictEqual(lookupWithKeyS({ id: 'b' })(x), O.none)

    const lookupWithKey = _.lookupWithKey(eqKey)
    assert.deepStrictEqual(lookupWithKey({ id: 1 })(repo), O.some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 4 })(repo), O.some([{ id: 1 }, { value: 1 }]))
    assert.deepStrictEqual(lookupWithKey({ id: 3 })(repo), O.none)
  })

  it('lookup', () => {
    const x = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupS = _.lookup(eqUser)
    assert.deepStrictEqual(lookupS({ id: 'a' })(x), O.some(1))
    assert.deepStrictEqual(lookupS({ id: 'b' })(x), O.none)

    const lookup = _.lookup(eqKey)
    assert.deepStrictEqual(lookup({ id: 1 })(repo), O.some({ value: 1 }))
    assert.deepStrictEqual(lookup({ id: 4 })(repo), O.some({ value: 1 }))
    assert.deepStrictEqual(lookup({ id: 3 })(repo), O.none)
  })

  it('isSubmap', () => {
    const me = new Map<User, number>([[{ id: 'a' }, 1]])
    const that = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const isSubmapS = _.isSubmap(eqUser, eqNumber)
    assert.deepStrictEqual(isSubmapS(that)(me), true)

    const isSubmap = _.isSubmap(eqKey, eqValue)
    assert.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 1 }]]), isSubmap(repo)), true)
    assert.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 2 }]]), isSubmap(repo)), false)
    assert.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 4 }]]), isSubmap(repo)), true)
    assert.deepStrictEqual(pipe(new Map([[{ id: 4 }, { value: 1 }]]), isSubmap(repo)), true)
    assert.deepStrictEqual(pipe(new Map([[{ id: 3 }, { value: 3 }]]), isSubmap(repo)), false)
  })

  it('empty', () => {
    assert.deepStrictEqual(_.empty, new Map<string, number>())
    assert.deepStrictEqual(_.isEmpty(_.empty), true)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getEq', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1_ = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const b1 = new Map<User, number>([[{ id: 'b' }, 1]])
    const S = _.getEq(eqUser, eqNumber)
    assert.deepStrictEqual(S.equals(a1)(a1), true)
    assert.deepStrictEqual(S.equals(a1)(a1_), true)
    assert.deepStrictEqual(S.equals(a1_)(a1), true)
    assert.deepStrictEqual(S.equals(a1)(a2), false)
    assert.deepStrictEqual(S.equals(a2)(a1), false)
    assert.deepStrictEqual(S.equals(a1)(b1), false)
    assert.deepStrictEqual(S.equals(b1)(a1), false)

    const equals = _.getEq(eqKey, eqValue).equals
    assert.deepStrictEqual(equals(repo)(repo), true)
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 2 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      false
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 4 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 4 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    assert.deepStrictEqual(
      equals(
        new Map([
          [{ id: 3 }, { value: 3 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
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
    assert.deepStrictEqual(pipe(d1, M1.concat(d2)), expected)
    assert.deepStrictEqual(pipe(d1, M1.concat(M1.empty)), d1)
    assert.deepStrictEqual(pipe(M1.empty, M1.concat(d2)), d2)

    const M2 = _.getMonoid(eqKey, semigroupValue)
    assert.deepStrictEqual(
      pipe(repo, M2.concat(new Map([[{ id: 3 }, { value: 3 }]]))),
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    assert.deepStrictEqual(
      pipe(repo, M2.concat(new Map([[{ id: 1 }, { value: 2 }]]))),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    assert.deepStrictEqual(
      pipe(repo, M2.concat(new Map([[{ id: 4 }, { value: 2 }]]))),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
  })

  describe('getFoldable', () => {
    const F = _.getFoldable(ordUser)
    it('reduce', () => {
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          F.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k2' }, 'b'],
            [{ id: 'k1' }, 'a']
          ]),
          F.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
    })

    it('foldMap', () => {
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'a' }, 'a'],
            [{ id: 'a' }, 'b']
          ]),
          F.foldMap(monoidString)(identity)
        ),
        'ab'
      )
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'a' }, 'a'],
            [{ id: 'b' }, 'b']
          ]),
          F.reduceRight('', f)
        ),
        'ba'
      )
    })
  })

  describe('getFoldableWithIndex', () => {
    const FWI = _.getFoldableWithIndex(ordUser)
    it('reduceWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          FWI.reduceWithIndex('', (k, b, a) => b + k.id + a)
        ),
        'k1ak2b'
      )
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k2' }, 'b'],
            [{ id: 'k1' }, 'a']
          ]),
          FWI.reduceWithIndex('', (k, b, a) => b + k.id + a)
        ),
        'k1ak2b'
      )
    })

    it('foldMapWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          FWI.foldMapWithIndex(monoidString)((k, a) => k.id + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      assert.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          FWI.reduceRightWithIndex('', (k, a, b) => b + k.id + a)
        ),
        'k2bk1a'
      )
    })
  })

  describe('getTraversableWithIndex', () => {
    it('traverseWithIndex', () => {
      const TWI = _.getTraversableWithIndex(ordUser)
      const traverseWithIndex = TWI.traverseWithIndex(O.Applicative)
      assert.deepStrictEqual(
        pipe(
          new Map([
            [{ id: 'k1' }, 1],
            [{ id: 'k2' }, 2]
          ]),
          traverseWithIndex((k, n): O.Option<number> => (!ordUser.equals(k)({ id: 'k1' }) ? O.some(n) : O.none))
        ),
        O.none
      )
      assert.deepStrictEqual(
        pipe(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ]),
          traverseWithIndex((k, n): O.Option<number> => (!ordUser.equals(k)({ id: 'k3' }) ? O.some(n) : O.none))
        ),
        O.some(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ])
        )
      )
    })

    it('traverseWithIndex should sort the keys', () => {
      const TWI = _.getTraversableWithIndex(Ord.ordString)
      // tslint:disable-next-line: readonly-array
      const log: Array<string> = []
      const append = (message: string): IO.IO<void> => () => {
        log.push(message)
      }

      pipe(
        new Map([
          ['b', append('b')],
          ['a', append('a')]
        ]),
        TWI.traverseWithIndex(IO.Applicative)((_, io) => io)
      )()
      assert.deepStrictEqual(log, ['a', 'b'])
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
      assert.deepStrictEqual(
        pipe(
          x,
          traverse((n) => (n <= 2 ? O.some(n) : O.none))
        ),
        O.some(x)
      )
      assert.deepStrictEqual(
        pipe(
          x,
          traverse((n) => (n >= 2 ? O.some(n) : O.none))
        ),
        O.none
      )
    })

    it('sequence', () => {
      const sequence = T.sequence(O.Applicative)
      assert.deepStrictEqual(
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
      assert.deepStrictEqual(
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

    it('wither', async () => {
      const wither = W.wither(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(await pipe(_.empty, wither(f))(), _.empty)
      assert.deepStrictEqual(
        await pipe(
          new Map([
            [{ id: 'a' }, 1],
            [{ id: 'b' }, 3]
          ]),
          wither(f)
        )(),
        new Map([[{ id: 'b' }, 4]])
      )
    })

    it('wilt', async () => {
      const wilt = W.wilt(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? right(n + 1) : left(n - 1))
      assert.deepStrictEqual(await pipe(_.empty, wilt(f))(), { left: _.empty, right: _.empty })
      assert.deepStrictEqual(
        await pipe(
          new Map([
            [{ id: 'a' }, 1],
            [{ id: 'b' }, 3]
          ]),
          wilt(f)
        )(),
        { left: new Map([[{ id: 'a' }, 0]]), right: new Map([[{ id: 'b' }, 4]]) }
      )
    })
  })

  describe('getFilterableWithIndex', () => {
    it('filterWithIndex', () => {
      const filterWithIndex = _.getFilterableWithIndex<string>().filterWithIndex
      assert.deepStrictEqual(
        pipe(
          new Map<string, number>([
            ['a', 1],
            ['bb', 1],
            ['c', 2]
          ]),
          filterWithIndex((k, a) => a + k.length > 2)
        ),
        new Map<string, number>([
          ['bb', 1],
          ['c', 2]
        ])
      )
    })

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
      assert.deepStrictEqual(pipe(emptyMap, partitionMapWithIndex(f)), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(pipe(a1b3, partitionMapWithIndex(f)), {
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
      assert.deepStrictEqual(pipe(emptyMap, partitionWithIndex(f)), { left: emptyMap, right: emptyMap })
      assert.deepStrictEqual(pipe(a1b3, partitionWithIndex(f)), {
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
      const f = (_: string, n: number) => (p(n) ? O.some(n + 1) : O.none)
      assert.deepStrictEqual(pipe(emptyMap, filterMapWithIndex(f)), emptyMap)
      assert.deepStrictEqual(pipe(a1b3, filterMapWithIndex(f)), b4)
    })
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

  describe('getFunctorWithIndex', () => {
    it('mapWithIndex', () => {
      const mapWithIndex = _.getFunctorWithIndex<User>().mapWithIndex
      const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
      const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
      assert.deepStrictEqual(
        pipe(
          aa1,
          mapWithIndex((k, a) => a + k.id.length)
        ),
        aa3
      )
    })
  })
})
