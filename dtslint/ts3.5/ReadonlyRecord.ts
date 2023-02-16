import { pipe, identity } from '../../src/function'
import * as _ from '../../src/ReadonlyRecord'
import * as O from '../../src/Option'
import * as RA from '../../src/ReadonlyArray'
import * as E from '../../src/Either'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { getFirstSemigroup } from '../../src/Semigroup'
import { Foldable } from '../../src/Foldable'
import { HKT } from '../../src/HKT'

declare const do1: { [key: string]: O.Option<number> }
declare const ro1: Readonly<Record<'a1' | 'a2', O.Option<number>>>
declare const stringKey: string
declare const d1: { [key: string]: number }
declare const recordString: Readonly<Record<string, number>>
declare const r1: Readonly<Record<'a1' | 'a2', number>>
const l1 = { a: 1 }

declare const keyString: string

//
// hasOwnProperty
//

if (_.hasOwnProperty(keyString, d1)) {
  keyString // $ExpectType string
}
if (_.hasOwnProperty(keyString, recordString)) {
  keyString // $ExpectType string
}
if (_.hasOwnProperty(keyString, r1)) {
  keyString // $ExpectType "a1" | "a2"
}

//
// updateAt
//

pipe(d1, _.updateAt('a1', 3)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(r1, _.updateAt('a1', 3)) // $ExpectType Option<Readonly<Record<"a1" | "a2", number>>>

//
// modifyAt
//

pipe(d1, _.modifyAt('a1', identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(r1, _.modifyAt('a1', identity)) // $ExpectType Option<Readonly<Record<"a1" | "a2", number>>>

//
// pop
//

_.pop('a1')(r1) // $ExpectType Option<readonly [number, Readonly<Record<"a2", number>>]>
_.pop('a1')(d1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>
_.pop(stringKey)(r1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>

//
// collect
//

_.collect((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType readonly number[]
_.collect((_k: 'a', n: number) => n)(l1) // $ExpectType readonly number[]
_.collect((_k, n: number) => n)(d1) // $ExpectType readonly number[]
_.collect((_k: 'a1' | 'a2', n: number) => n)(r1) // $ExpectType readonly number[]

_.collect(S.Ord)((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType readonly number[]
_.collect(S.Ord)((_k: 'a', n: number) => n)(l1) // $ExpectType readonly number[]
_.collect(S.Ord)((_k, n: number) => n)(d1) // $ExpectType readonly number[]
_.collect(S.Ord)((_k: 'a1' | 'a2', n: number) => n)(r1) // $ExpectType readonly number[]

//
// insertAt
//

_.insertAt('b', 0)(d1) // $ExpectType Readonly<Record<string, number>>
_.insertAt(stringKey, 0)(r1) // $ExpectType Readonly<Record<string, number>>

//
// deleteAt
//

_.deleteAt('a')({ a: 1 }) // $ExpectType Readonly<Record<never, number>>
_.deleteAt('b')({ a: 1 }) // $ExpectType Readonly<Record<"a", number>>
_.deleteAt('a')(l1) // $ExpectType Readonly<Record<never, number>>
_.deleteAt('b')(l1) // $ExpectType Readonly<Record<"a", number>>
_.deleteAt('b')(d1) // $ExpectType Readonly<Record<string, number>>
_.deleteAt('c')(r1) // $ExpectType Readonly<Record<"a1" | "a2", number>>
_.deleteAt('a1')(r1) // $ExpectType Readonly<Record<"a2", number>>
_.deleteAt(stringKey)(r1) // $ExpectType Readonly<Record<string, number>>

//
// mapWithIndex
//

_.mapWithIndex((_k: 'a', n: number) => n > 2)({ a: 1 }) // $ExpectType Readonly<Record<"a", boolean>>
_.mapWithIndex((_k: 'a', n: number) => n > 2)(l1) // $ExpectType Readonly<Record<"a", boolean>>
_.mapWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, boolean>>
_.mapWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Readonly<Record<"a1" | "a2", boolean>>

// $ExpectType Readonly<Record<string, boolean>>
pipe(
  d1,
  _.mapWithIndex(
    (
      _key, // $ExpectType string
      value // $ExpectType number
    ) => value > 0
  )
)

// $ExpectType Readonly<Record<"a1" | "a2", boolean>>
pipe(
  r1,
  _.mapWithIndex(
    (
      _key, // $ExpectType "a1" | "a2"
      value // $ExpectType number
    ) => value > 0
  )
)

//
// map
//

_.map((n: number) => n > 2)({ a: 1 }) // $ExpectType Readonly<Record<"a", boolean>>
_.map((n: number) => n > 2)(l1) // $ExpectType Readonly<Record<"a", boolean>>
_.map((n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, boolean>>
_.map((n: number) => n > 2)(r1) // $ExpectType Readonly<Record<"a1" | "a2", boolean>>

const constStruct = { a: 1, b: 2 } as const

function mapToBoolean(): { [K in keyof typeof constStruct]: boolean } {
  return pipe(
    constStruct,
    _.map(() => true)
  )
}

// $ExpectType { readonly a: boolean; readonly b: boolean; }
mapToBoolean()

//
// reduceWithIndex
//

_.reduceWithIndex(S.Ord)('', (k: string, _n) => k)(d1) // $ExpectType string
_.reduceWithIndex(S.Ord)('', (k: 'a1' | 'a2', _n) => k)(r1) // $ExpectType string

_.reduceWithIndex('', (k: string, _n) => k)(d1) // $ExpectType string
_.reduceWithIndex('', (k: 'a1' | 'a2', _n) => k)(r1) // $ExpectType string

_.foldMapWithIndex(S.Ord)(S.Monoid)((k: string, _n) => k)(d1) // $ExpectType string
_.foldMapWithIndex(S.Ord)(S.Monoid)((k: 'a1' | 'a2', _n) => k)(r1) // $ExpectType string

_.foldMapWithIndex(S.Monoid)((k: string, _n) => k)(d1) // $ExpectType string
_.foldMapWithIndex(S.Monoid)((k: 'a1' | 'a2', _n) => k)(r1) // $ExpectType string

_.reduceRightWithIndex(S.Ord)('', (k: string, _n, _b) => k)(d1) // $ExpectType string
_.reduceRightWithIndex(S.Ord)('', (k: 'a1' | 'a2', _n, _b) => k)(r1) // $ExpectType string

_.reduceRightWithIndex('', (k: string, _n, _b) => k)(d1) // $ExpectType string
_.reduceRightWithIndex('', (k: 'a1' | 'a2', _n, _b) => k)(r1) // $ExpectType string

_.singleton('a', 1) // $ExpectType Readonly<Record<string, number>>

_.traverseWithIndex(O.option)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverseWithIndex(O.option)((_k: 'a1' | 'a2', n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a1" | "a2", number>>>

_.traverse(O.option)((n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverse(O.option)((n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a1" | "a2", number>>>

_.sequence(O.option)(do1) // $ExpectType Option<Readonly<Record<string, number>>>
_.sequence(O.option)(ro1) // $ExpectType Option<Readonly<Record<"a1" | "a2", number>>>

_.readonlyRecord.compact(do1) // $ExpectType Readonly<Record<string, number>>

_.partitionMapWithIndex((_k: string, n: number): E.Either<string, number> => E.right(n))(d1) // $ExpectType Separated<Readonly<Record<string, string>>, Readonly<Record<string, number>>>
_.partitionMapWithIndex((_k: 'a1' | 'a2', n: number): E.Either<string, number> => E.right(n))(r1) // $ExpectType Separated<Readonly<Record<string, string>>, Readonly<Record<string, number>>>

_.partitionWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Separated<Readonly<Record<string, number>>, Readonly<Record<string, number>>>
_.partitionWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Separated<Readonly<Record<string, number>>, Readonly<Record<string, number>>>

_.filterMapWithIndex((_k: string, n: number) => O.some(n))(d1) // $ExpectType Readonly<Record<string, number>>
_.filterMapWithIndex((_k: 'a1' | 'a2', n: number) => O.some(n))(r1) // $ExpectType Readonly<Record<string, number>>

_.filterWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, number>>
_.filterWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Readonly<Record<string, number>>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

_.fromFoldable(getFirstSemigroup<number>(), RA.Foldable)(arr1) // $ExpectType Readonly<Record<string, number>>
_.fromFoldable(getFirstSemigroup<number>(), RA.Foldable)(arr2) // $ExpectType Readonly<Record<string, number>>

type Keys = 'key1' | 'key2'
_.getMonoid(N.SemigroupSum) // $ExpectType Monoid<Readonly<Record<string, number>>>
_.getMonoid<Keys, number>(N.SemigroupSum) // $ExpectType Monoid<Readonly<Record<Keys, number>>>

_.getEq<Keys, number>(N.Eq) // $ExpectType Eq<Readonly<Record<Keys, number>>>
_.getEq(N.Eq) // $ExpectType Eq<Readonly<Record<string, number>>>

_.toUnfoldable(RA.Unfoldable)({ a: 1 }) // $ExpectType readonly (readonly ["a", number])[]
_.toUnfoldable(RA.Unfoldable)({ a1: 1, a2: 2 }) // $ExpectType readonly (readonly ["a1" | "a2", number])[]

declare const fromFoldableF1: Foldable<'Test'>
declare const fromFoldableInput1: HKT<'Test', ['a' | 'b', number]>
_.fromFoldable(getFirstSemigroup<number>(), fromFoldableF1)(fromFoldableInput1) // $ExpectType Readonly<Record<string, number>>

//
// isSubrecord
//

_.isSubrecord(N.Eq)(recordString, recordString) // $ExpectType boolean
_.isSubrecord(N.Eq)(recordString) // $ExpectType (me: Readonly<Record<string, number>>) => boolean

//
// lookup
//

_.lookup('a', recordString) // $ExpectType Option<number>
_.lookup('a') // $ExpectType <A>(r: Readonly<Record<string, A>>) => Option<A>

//
// elem
//

_.elem(N.Eq)(1, recordString) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (fa: Readonly<Record<string, number>>) => boolean

//
// reduce
//

pipe(
  r1,
  _.reduce(1, (acc, n) => acc + n)
)
pipe(
  r1,
  _.reduce(S.Ord)(1, (acc, n) => acc + n)
)
