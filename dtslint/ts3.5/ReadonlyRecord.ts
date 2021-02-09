import { pipe, identity } from '../../src/function'
import * as _ from '../../src/ReadonlyRecord'
import * as O from '../../src/Option'
import * as A from '../../src/Array'
import * as E from '../../src/Either'
import { monoidString } from '../../src/Monoid'
import { eqNumber } from '../../src/Eq'
import { semigroupSum, getFirstSemigroup } from '../../src/Semigroup'
import { Foldable } from '../../src/Foldable'
import { HKT } from '../../src/HKT'

declare const do1: { [key: string]: O.Option<number> }
declare const ro1: Readonly<Record<'a' | 'b', O.Option<number>>>
declare const stringKey: string
declare const d1: { [key: string]: number }
declare const recordString: Readonly<Record<string, number>>
declare const r1: Readonly<Record<'a' | 'b', number>>
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
  keyString // $ExpectType "a" | "b"
}

//
// updateAt
//

pipe(d1, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(r1, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

//
// modifyAt
//

pipe(d1, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(r1, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

//
// pop
//

_.pop('a')(r1) // $ExpectType Option<readonly [number, Readonly<Record<"b", number>>]>
_.pop('a')(d1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>
_.pop(stringKey)(r1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>

//
// collect
//

_.collect((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType readonly number[]
_.collect((_k: 'a', n: number) => n)(l1) // $ExpectType readonly number[]
_.collect((_k, n: number) => n)(d1) // $ExpectType readonly number[]
_.collect((_k: 'a' | 'b', n: number) => n)(r1) // $ExpectType readonly number[]

//
// insertAt
//

_.insertAt('b', 0)({ a: 1 }) // $ExpectType Readonly<Record<"a" | "b", number>>
_.insertAt('b', 0)(l1) // $ExpectType Readonly<Record<"a" | "b", number>>
_.insertAt('b', 0)(d1) // $ExpectType Readonly<Record<string, number>>
_.insertAt('b', 0)(r1) // $ExpectType Readonly<Record<"a" | "b", number>>
_.insertAt(stringKey, 0)(r1) // $ExpectType Readonly<Record<string, number>>
_.insertAt('c', 0)(r1) // $ExpectType Readonly<Record<"a" | "b" | "c", number>>

//
// deleteAt
//

_.deleteAt('a')({ a: 1 }) // $ExpectType Readonly<Record<never, number>>
_.deleteAt('b')({ a: 1 }) // $ExpectType Readonly<Record<"a", number>>
_.deleteAt('a')(l1) // $ExpectType Readonly<Record<never, number>>
_.deleteAt('b')(l1) // $ExpectType Readonly<Record<"a", number>>
_.deleteAt('b')(d1) // $ExpectType Readonly<Record<string, number>>
_.deleteAt('c')(r1) // $ExpectType Readonly<Record<"a" | "b", number>>
_.deleteAt('a')(r1) // $ExpectType Readonly<Record<"b", number>>
_.deleteAt(stringKey)(r1) // $ExpectType Readonly<Record<string, number>>

//
// mapWithIndex
//

_.mapWithIndex((_k: 'a', n: number) => n > 2)({ a: 1 }) // $ExpectType Readonly<Record<"a", boolean>>
_.mapWithIndex((_k: 'a', n: number) => n > 2)(l1) // $ExpectType Readonly<Record<"a", boolean>>
_.mapWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, boolean>>
_.mapWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Readonly<Record<"a" | "b", boolean>>

//
// map
//

_.map((n: number) => n > 2)({ a: 1 }) // $ExpectType Readonly<Record<"a", boolean>>
_.map((n: number) => n > 2)(l1) // $ExpectType Readonly<Record<"a", boolean>>
_.map((n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, boolean>>
_.map((n: number) => n > 2)(r1) // $ExpectType Readonly<Record<"a" | "b", boolean>>

//
// reduceWithIndex
//

_.reduceWithIndex('', (k: string, _n) => k)(d1) // $ExpectType string
_.reduceWithIndex('', (k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

_.foldMapWithIndex(monoidString)((k: string, _n) => k)(d1) // $ExpectType string
_.foldMapWithIndex(monoidString)((k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

_.reduceRightWithIndex('', (k: string, _n, _b) => k)(d1) // $ExpectType string
_.reduceRightWithIndex('', (k: 'a' | 'b', _n, _b) => k)(r1) // $ExpectType string

_.singleton('a', 1) // $ExpectType Readonly<Record<"a", number>>

_.traverseWithIndex(O.option)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverseWithIndex(O.option)((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

_.traverse(O.option)((n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverse(O.option)((n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

_.sequence(O.option)(do1) // $ExpectType Option<Readonly<Record<string, number>>>
_.sequence(O.option)(ro1) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

_.readonlyRecord.compact(do1) // $ExpectType Readonly<Record<string, number>>

_.partitionMapWithIndex((_k: string, n: number): E.Either<string, number> => E.right(n))(d1) // $ExpectType Separated<Readonly<Record<string, string>>, Readonly<Record<string, number>>>
_.partitionMapWithIndex((_k: 'a' | 'b', n: number): E.Either<string, number> => E.right(n))(r1) // $ExpectType Separated<Readonly<Record<string, string>>, Readonly<Record<string, number>>>

_.partitionWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Separated<Readonly<Record<string, number>>, Readonly<Record<string, number>>>
_.partitionWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Separated<Readonly<Record<string, number>>, Readonly<Record<string, number>>>

_.filterMapWithIndex((_k: string, n: number) => O.some(n))(d1) // $ExpectType Readonly<Record<string, number>>
_.filterMapWithIndex((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Readonly<Record<string, number>>

_.filterWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Readonly<Record<string, number>>
_.filterWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Readonly<Record<string, number>>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

_.fromFoldable(getFirstSemigroup<number>(), A.array)(arr1) // $ExpectType Readonly<Record<string, number>>
_.fromFoldable(getFirstSemigroup<number>(), A.array)(arr2) // $ExpectType Readonly<Record<string, number>>

type Keys = 'key1' | 'key2'
_.getMonoid(semigroupSum) // $ExpectType Monoid<Readonly<Record<string, number>>>
_.getMonoid<Keys, number>(semigroupSum) // $ExpectType Monoid<Readonly<Record<Keys, number>>>

_.getEq<Keys, number>(eqNumber) // $ExpectType Eq<Readonly<Record<Keys, number>>>
_.getEq(eqNumber) // $ExpectType Eq<Readonly<Record<string, number>>>

_.toUnfoldable(A.array)({ a: 1 }) // $ExpectType (readonly ["a", number])[]
_.toUnfoldable(A.array)({ a: 1, b: 2 }) // $ExpectType (readonly ["a" | "b", number])[]

declare const fromFoldableF1: Foldable<'Test'>
declare const fromFoldableInput1: HKT<'Test', ['a' | 'b', number]>
_.fromFoldable(getFirstSemigroup<number>(), fromFoldableF1)(fromFoldableInput1) // $ExpectType Readonly<Record<string, number>>

//
// isSubrecord
//

_.isSubrecord(eqNumber)(recordString, recordString) // $ExpectType boolean
_.isSubrecord(eqNumber)(recordString) // $ExpectType (me: Readonly<Record<string, number>>) => boolean

//
// lookup
//

_.lookup('a', recordString) // $ExpectType Option<number>
_.lookup('a') // $ExpectType <A>(r: Readonly<Record<string, A>>) => Option<A>

//
// elem
//

_.elem(eqNumber)(1, recordString) // $ExpectType boolean
_.elem(eqNumber)(1) // $ExpectType (fa: Readonly<Record<string, number>>) => boolean
