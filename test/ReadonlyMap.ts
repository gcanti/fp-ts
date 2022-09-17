import { Either, left, right } from '../src/Either'
import { Eq, fromEquals, fromOrd } from '../src/Eq'
import { identity, pipe } from '../src/function'
import * as IO from '../src/IO'
import * as N from '../src/number'
import * as O from '../src/Option'
import * as Ord from '../src/Ord'
import * as RA from '../src/ReadonlyArray'
import * as _ from '../src/ReadonlyMap'
import { Refinement } from '../src/Refinement'
import * as Se from '../src/Semigroup'
import { separated } from '../src/Separated'
import * as Sh from '../src/Show'
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

const eqUser: Eq<User> = fromOrd(ordUser)

const p = ((n: number): boolean => n > 2) as Refinement<number, number>

interface Key {
  readonly id: number
}

interface Value {
  readonly value: number
}

const eqKey: Eq<Key> = fromEquals((second) => (first) => first.id % 3 === second.id % 3)

const ordKey = Ord.fromCompare<Key>((second) => {
  const f = N.Ord.compare(second.id % 3)
  return (first) => f(first.id % 3)
})

const eqValue: Eq<Value> = fromEquals((second) => (first) => first.value % 3 === second.value % 3)

const semigroupValue = Se.struct({ value: N.SemigroupSum })

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
    U.deepStrictEqual(
      pipe(
        new Map<string, number>([
          ['k1', 1],
          ['k2', 2]
        ]),
        _.map(U.double)
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

  // -------------------------------------------------------------------------------------
  // constructors
  // -------------------------------------------------------------------------------------

  it('singleton', () => {
    U.deepStrictEqual(
      _.singleton('k1', 0),
      new Map<string, number>([['k1', 0]])
    )
  })

  it('fromFoldable', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const fromFoldableS1 = _.fromFoldable(RA.Foldable)(eqUser, Se.first<number>())<readonly [User, number]>(identity)
    U.deepStrictEqual(fromFoldableS1([[{ id: 'a' }, 1]]), a1)
    U.deepStrictEqual(
      fromFoldableS1([
        [{ id: 'a' }, 1],
        [{ id: 'a' }, 2]
      ]),
      a1
    )
    const fromFoldableS2 = _.fromFoldable(RA.Foldable)(eqUser, Se.last<number>())<readonly [User, number]>(identity)
    U.deepStrictEqual(
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
    U.deepStrictEqual(_.size(emptyMap), 0)
    U.deepStrictEqual(_.size(a1), 1)

    U.deepStrictEqual(_.size(_.empty()), 0)
    U.deepStrictEqual(_.size(new Map()), 0)
    U.deepStrictEqual(_.size(new Map([['a', 1]])), 1)
  })

  it('isEmpty', () => {
    const emptyMap = new Map<string, number>()
    const a1 = new Map<string, number>([['a', 1]])
    U.deepStrictEqual(_.isEmpty(emptyMap), true)
    U.deepStrictEqual(_.isEmpty(a1), false)

    U.deepStrictEqual(_.isEmpty(_.empty()), true)
    U.deepStrictEqual(_.isEmpty(new Map()), true)
    U.deepStrictEqual(_.isEmpty(new Map([['a', 1]])), false)
  })

  it('member', () => {
    const x = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const memberS = _.member(eqUser)
    U.deepStrictEqual(memberS({ id: 'a' })(x), true)
    U.deepStrictEqual(memberS({ id: 'c' })(x), false)

    const member = _.member(eqKey)
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
    U.deepStrictEqual(
      ks,
      Array.from(m.keys()).sort((first, second) => ordUser.compare(second)(first))
    )
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
    U.deepStrictEqual(
      vals,
      Array.from(m.values()).sort((first, second) => ordUser.compare(second)(first))
    )
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
    const toUnfoldableO = _.toUnfoldable(RA.Unfoldable)(ordUser)
    U.deepStrictEqual(toUnfoldableO(a1), [[{ id: 'a' }, 1]])

    const toUnfoldable = _.toUnfoldable(RA.Unfoldable)(ordKey)
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
    const insert = _.insertAt(eqUser)
    const m: ReadonlyMap<User, number> = new Map([[{ id: 'a' }, 1]])
    U.deepStrictEqual(pipe(_.empty<User>(), insert({ id: 'a' }, 1)), O.some(m))
    U.deepStrictEqual(pipe(m, insert({ id: 'a' }, 1)), O.none)
  })

  it('upsertAt', () => {
    const upsert = _.upsertAt(eqUser)
    const m: ReadonlyMap<User, number> = new Map([[{ id: 'a' }, 1]])
    U.deepStrictEqual(pipe(_.empty<User>(), upsert({ id: 'a' }, 1)), m)
    U.deepStrictEqual(pipe(m, upsert({ id: 'a' }, 2)), new Map([[{ id: 'a' }, 2]]))
    U.deepStrictEqual(
      pipe(m, upsert({ id: 'b' }, 2)),
      new Map([
        [{ id: 'a' }, 1],
        [{ id: 'b' }, 2]
      ])
    )
    // should return the same reference if nothing changed
    U.strictEqual(pipe(m, upsert({ id: 'a' }, 1)), m)
  })

  it('deleteAt', () => {
    const m = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const del = _.deleteAt(eqUser)
    U.deepStrictEqual(
      pipe(m, del({ id: 'a' })),
      O.some(
        new Map<User, number>([[{ id: 'b' }, 2]])
      )
    )
    U.deepStrictEqual(pipe(m, del({ id: 'c' })), O.none)
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
    // should return the same reference if nothing changed
    const input: ReadonlyMap<string, number> = new Map([['a', 1]])
    U.deepStrictEqual(
      pipe(
        input,
        _.modifyAt(S.Eq)('a', identity),
        O.map((out) => out === input)
      ),
      O.some(true)
    )
  })

  it('pop', () => {
    const a1b2 = new Map<User, number>([
      [{ id: 'a' }, 1],
      [{ id: 'b' }, 2]
    ])
    const b2 = new Map<User, number>([[{ id: 'b' }, 2]])
    const popS = _.pop(eqUser)
    U.deepStrictEqual(popS({ id: 'a' })(a1b2), O.some([1, b2] as const))
    U.deepStrictEqual(popS({ id: 'c' })(a1b2), O.none)

    const pop = _.pop(eqKey)
    U.deepStrictEqual(pop({ id: 1 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])] as const))
    U.deepStrictEqual(pop({ id: 4 })(repo), O.some([{ value: 1 }, new Map([[{ id: 2 }, { value: 2 }]])] as const))
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
    U.deepStrictEqual(lookupWithKeyS({ id: 'a' })(x), O.some([{ id: 'a' }, 1] as const))
    U.deepStrictEqual(lookupWithKeyS({ id: 'b' })(x), O.none)

    const lookupWithKey = _.lookupWithKey(eqKey)
    U.deepStrictEqual(lookupWithKey({ id: 1 })(repo), O.some([{ id: 1 }, { value: 1 }] as const))
    U.deepStrictEqual(lookupWithKey({ id: 4 })(repo), O.some([{ id: 1 }, { value: 1 }] as const))
    U.deepStrictEqual(lookupWithKey({ id: 3 })(repo), O.none)
  })

  it('lookup', () => {
    const x = new Map<User, number>([[{ id: 'a' }, 1]])
    const lookupS = _.lookup(eqUser)
    U.deepStrictEqual(lookupS({ id: 'a' })(x), O.some(1))
    U.deepStrictEqual(lookupS({ id: 'b' })(x), O.none)

    const lookup = _.lookup(eqKey)
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
    U.deepStrictEqual(isSubmapS(that)(me), true)

    const isSubmap = _.isSubmap(eqKey, eqValue)
    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 1 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 2 }]]), isSubmap(repo)), false)
    U.deepStrictEqual(pipe(new Map([[{ id: 1 }, { value: 4 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 4 }, { value: 1 }]]), isSubmap(repo)), true)
    U.deepStrictEqual(pipe(new Map([[{ id: 3 }, { value: 3 }]]), isSubmap(repo)), false)
  })

  it('empty', () => {
    U.deepStrictEqual(_.empty().size, 0)
    U.deepStrictEqual(_.isEmpty(_.empty()), true)
  })

  // -------------------------------------------------------------------------------------
  // instances
  // -------------------------------------------------------------------------------------

  it('getEq', () => {
    const a1 = new Map<User, number>([[{ id: 'a' }, 1]])
    const a1_ = new Map<User, number>([[{ id: 'a' }, 1]])
    const a2 = new Map<User, number>([[{ id: 'a' }, 2]])
    const b1 = new Map<User, number>([[{ id: 'b' }, 1]])
    const S = _.getEq(eqUser, N.Eq)
    U.deepStrictEqual(S.equals(a1)(a1), true)
    U.deepStrictEqual(S.equals(a1)(a1_), true)
    U.deepStrictEqual(S.equals(a1_)(a1), true)
    U.deepStrictEqual(S.equals(a1)(a2), false)
    U.deepStrictEqual(S.equals(a2)(a1), false)
    U.deepStrictEqual(S.equals(a1)(b1), false)
    U.deepStrictEqual(S.equals(b1)(a1), false)

    const equals = _.getEq(eqKey, eqValue).equals
    U.deepStrictEqual(equals(repo)(repo), true)
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 2 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      false
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 1 }, { value: 4 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    U.deepStrictEqual(
      equals(
        new Map([
          [{ id: 4 }, { value: 1 }],
          [{ id: 2 }, { value: 2 }]
        ])
      )(repo),
      true
    )
    U.deepStrictEqual(
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
    const M1 = _.getMonoid(eqUser, N.SemigroupSum)
    U.deepStrictEqual(pipe(d1, M1.concat(d2)), expected)
    U.deepStrictEqual(pipe(d1, M1.concat(M1.empty)), d1)
    U.deepStrictEqual(pipe(M1.empty, M1.concat(d2)), d2)

    const M2 = _.getMonoid(eqKey, semigroupValue)
    U.deepStrictEqual(
      pipe(repo, M2.concat(new Map([[{ id: 3 }, { value: 3 }]]))),
      new Map([
        [{ id: 1 }, { value: 1 }],
        [{ id: 2 }, { value: 2 }],
        [{ id: 3 }, { value: 3 }]
      ])
    )
    U.deepStrictEqual(
      pipe(repo, M2.concat(new Map([[{ id: 1 }, { value: 2 }]]))),
      new Map([
        [{ id: 1 }, { value: 3 }],
        [{ id: 2 }, { value: 2 }]
      ])
    )
    U.deepStrictEqual(
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
      U.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          F.reduce('', (b, a) => b + a)
        ),
        'ab'
      )
      U.deepStrictEqual(
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
      U.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'a' }, 'a'],
            [{ id: 'a' }, 'b']
          ]),
          F.foldMap(S.Monoid)(identity)
        ),
        'ab'
      )
    })

    it('reduceRight', () => {
      const f = (a: string, acc: string) => acc + a
      U.deepStrictEqual(
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
      U.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          FWI.reduceWithIndex('', (k, b, a) => b + k.id + a)
        ),
        'k1ak2b'
      )
      U.deepStrictEqual(
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
      U.deepStrictEqual(
        pipe(
          new Map<User, string>([
            [{ id: 'k1' }, 'a'],
            [{ id: 'k2' }, 'b']
          ]),
          FWI.foldMapWithIndex(S.Monoid)((k, a) => k.id + a)
        ),
        'k1ak2b'
      )
    })

    it('reduceRightWithIndex', () => {
      U.deepStrictEqual(
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
      U.deepStrictEqual(
        pipe(
          new Map([
            [{ id: 'k1' }, 1],
            [{ id: 'k2' }, 2]
          ]),
          traverseWithIndex((k, n): O.Option<number> => (!eqUser.equals(k)({ id: 'k1' }) ? O.some(n) : O.none))
        ),
        O.none
      )
      U.deepStrictEqual(
        pipe(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ]),
          traverseWithIndex((k, n): O.Option<number> => (!eqUser.equals(k)({ id: 'k3' }) ? O.some(n) : O.none))
        ),
        O.some(
          new Map([
            [{ id: 'k1' }, 2],
            [{ id: 'k2' }, 3]
          ])
        )
      )
      // should not change `empty`
      U.deepStrictEqual(_.empty(), new Map<never, never>())
    })

    it('traverseWithIndex should sort the keys', () => {
      const TWI = _.getTraversableWithIndex(S.Ord)
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
      U.deepStrictEqual(log, ['a', 'b'])
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
        pipe(
          x,
          traverse((n) => (n <= 2 ? O.some(n) : O.none))
        ),
        O.some(x)
      )
      U.deepStrictEqual(
        pipe(
          x,
          traverse((n) => (n >= 2 ? O.some(n) : O.none))
        ),
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

    it('wither', async () => {
      const wither = W.wither(T.ApplicativePar)
      const f = (n: number) => T.of(p(n) ? O.some(n + 1) : O.none)
      U.deepStrictEqual(await pipe(_.empty<User>(), wither(f))(), _.empty<User>())
      U.deepStrictEqual(
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
      U.deepStrictEqual(await pipe(_.empty<User>(), wilt(f))(), separated(_.empty<User>(), _.empty<User>()))
      U.deepStrictEqual(
        await pipe(
          new Map([
            [{ id: 'a' }, 1],
            [{ id: 'b' }, 3]
          ]),
          wilt(f)
        )(),
        separated(new Map([[{ id: 'a' }, 0]]), new Map([[{ id: 'b' }, 4]]))
      )
    })
  })

  describe('getFilterableWithIndex', () => {
    it('filterWithIndex', () => {
      const filterWithIndex = _.getFilterableWithIndex<string>().filterWithIndex
      U.deepStrictEqual(
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
      U.deepStrictEqual(pipe(emptyMap, partitionMapWithIndex(f)), separated(emptyMap, emptyMap))
      U.deepStrictEqual(pipe(a1b3, partitionMapWithIndex(f)), separated(a0, b4))
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
      U.deepStrictEqual(pipe(emptyMap, partitionWithIndex(f)), separated(emptyMap, emptyMap))
      U.deepStrictEqual(pipe(a1b3, partitionWithIndex(f)), separated(a1, b3))
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
      U.deepStrictEqual(pipe(emptyMap, filterMapWithIndex(f)), emptyMap)
      U.deepStrictEqual(pipe(a1b3, filterMapWithIndex(f)), b4)
    })
  })

  it('getShow', () => {
    const showUser: Sh.Show<User> = Sh.struct({ id: S.Show })
    const ShowMap = _.getShow(showUser, S.Show)
    const m1 = new Map<User, string>([])
    U.deepStrictEqual(ShowMap.show(m1), `new Map([])`)
    const m2 = new Map<User, string>([[{ id: 'a' }, 'b']])
    U.deepStrictEqual(ShowMap.show(m2), `new Map([[{ id: "a" }, "b"]])`)
    const m3 = new Map<User, string>([
      [{ id: 'c' }, 'd'],
      [{ id: 'a' }, 'b']
    ])
    U.deepStrictEqual(ShowMap.show(m3), `new Map([[{ id: "a" }, "b"], [{ id: "c" }, "d"]])`)
  })

  describe('getFunctorWithIndex', () => {
    it('mapWithIndex', () => {
      const mapWithIndex = _.getFunctorWithIndex<User>().mapWithIndex
      const aa1 = new Map<User, number>([[{ id: 'aa' }, 1]])
      const aa3 = new Map<User, number>([[{ id: 'aa' }, 3]])
      U.deepStrictEqual(
        pipe(
          aa1,
          mapWithIndex((k, a) => a + k.id.length)
        ),
        aa3
      )
    })
  })

  it('getUnionMonoid', () => {
    const M = _.getUnionMonoid(eqUser, S.Semigroup)
    const x = new Map<User, string>([
      [{ id: 'a' }, 'a1'],
      [{ id: 'b' }, 'b1'],
      [{ id: 'c' }, 'c1']
    ])
    const y = new Map<User, string>([
      [{ id: 'b' }, 'b2'],
      [{ id: 'c' }, 'c2'],
      [{ id: 'd' }, 'd2']
    ])
    U.strictEqual(pipe(x, M.concat(M.empty)), x)
    U.strictEqual(pipe(M.empty, M.concat(x)), x)
    U.strictEqual(pipe(x, M.concat(new Map())), x)
    U.strictEqual(pipe(new Map(), M.concat(x)), x)
    U.deepStrictEqual(
      pipe(x, M.concat(y)),
      new Map([
        [{ id: 'a' }, 'a1'],
        [{ id: 'b' }, 'b1b2'],
        [{ id: 'c' }, 'c1c2'],
        [{ id: 'd' }, 'd2']
      ])
    )
  })

  it('getIntersectionSemigroup', () => {
    const M = _.getIntersectionSemigroup(eqUser, S.Semigroup)
    const x = new Map<User, string>([
      [{ id: 'a' }, 'a1'],
      [{ id: 'b' }, 'b1'],
      [{ id: 'c' }, 'c1']
    ])
    const y = new Map<User, string>([
      [{ id: 'b' }, 'b2'],
      [{ id: 'c' }, 'c2'],
      [{ id: 'd' }, 'd2']
    ])
    U.strictEqual(pipe(x, M.concat(_.empty())), _.empty())
    U.strictEqual(pipe(_.empty<User>(), M.concat(x)), _.empty())
    U.strictEqual(pipe(x, M.concat(new Map())), _.empty())
    U.strictEqual(pipe(new Map(), M.concat(x)), _.empty())
    U.deepStrictEqual(
      pipe(x, M.concat(y)),
      new Map([
        [{ id: 'b' }, 'b1b2'],
        [{ id: 'c' }, 'c1c2']
      ])
    )
  })

  it('getDifferenceMagma', () => {
    const M = _.getDifferenceMagma(eqUser)<string>()
    const x = new Map<User, string>([
      [{ id: 'a' }, 'a1'],
      [{ id: 'b' }, 'b1'],
      [{ id: 'c' }, 'c1']
    ])
    const y = new Map<User, string>([
      [{ id: 'b' }, 'b2'],
      [{ id: 'c' }, 'c2'],
      [{ id: 'd' }, 'd2']
    ])
    U.strictEqual(pipe(x, M.concat(_.empty())), x)
    U.strictEqual(pipe(_.empty<User>(), M.concat(x)), x)
    U.strictEqual(pipe(x, M.concat(new Map())), x)
    U.strictEqual(pipe(new Map(), M.concat(x)), x)
    U.deepStrictEqual(
      pipe(x, M.concat(y)),
      new Map([
        [{ id: 'a' }, 'a1'],
        [{ id: 'd' }, 'd2']
      ])
    )
  })
})
