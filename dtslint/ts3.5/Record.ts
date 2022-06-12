import { pipe, identity } from '../../src/function'
import * as _ from '../../src/Record'
import * as O from '../../src/Option'
import * as A from '../../src/Array'
import * as E from '../../src/Either'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { getFirstSemigroup } from '../../src/Semigroup'
import { Foldable } from '../../src/Foldable'
import { HKT } from '../../src/HKT'

declare const do1: { [key: string]: O.Option<number> }
declare const ro1: Record<'a1' | 'a2', O.Option<number>>
declare const stringKey: string
declare const d1: { [key: string]: number }
declare const recordString: Record<string, number>
declare const r1: Record<'a1' | 'a2', number>
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

pipe(d1, _.updateAt('a1', 3)) // $ExpectType Option<Record<string, number>>
pipe(recordString, _.updateAt('a', 3)) // $ExpectType Option<Record<string, number>>
pipe(r1, _.updateAt('a1', 3)) // $ExpectType Option<Record<"a1" | "a2", number>>

//
// modifyAt
//

pipe(d1, _.modifyAt('a1', identity)) // $ExpectType Option<Record<string, number>>
pipe(recordString, _.modifyAt('a', identity)) // $ExpectType Option<Record<string, number>>
pipe(r1, _.modifyAt('a1', identity)) // $ExpectType Option<Record<"a1" | "a2", number>>

//
// pop
//

_.pop('a1')(r1) // $ExpectType Option<[number, Record<"a2", number>]>
_.pop('a1')(d1) // $ExpectType Option<[number, Record<string, number>]>
_.pop(stringKey)(r1) // $ExpectType Option<[number, Record<string, number>]>

//
// collect
//

_.collect((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType number[]
_.collect((_k: 'a', n: number) => n)(l1) // $ExpectType number[]
_.collect((_k, n: number) => n)(d1) // $ExpectType number[]
_.collect((_k: 'a1' | 'a2', n: number) => n)(r1) // $ExpectType number[]

_.collect(S.Ord)((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType number[]
_.collect(S.Ord)((_k: 'a', n: number) => n)(l1) // $ExpectType number[]
_.collect(S.Ord)((_k, n: number) => n)(d1) // $ExpectType number[]
_.collect(S.Ord)((_k: 'a1' | 'a2', n: number) => n)(r1) // $ExpectType number[]

//
// toArray
//

_.toArray({ a: 1 }) // $ExpectType ["a", number][]
_.toArray(l1) // $ExpectType ["a", number][]
_.toArray(d1) // $ExpectType [string, number][]
_.toArray(r1) // $ExpectType ["a1" | "a2", number][]

//
// insertAt
//

_.insertAt('b', 0)(d1) // $ExpectType Record<string, number>
_.insertAt(stringKey, 0)(r1) // $ExpectType Record<string, number>

//
// deleteAt
//

_.deleteAt('a')({ a: 1 }) // $ExpectType Record<never, number>
_.deleteAt('b')({ a: 1 }) // $ExpectType Record<"a", number>
_.deleteAt('a')(l1) // $ExpectType Record<never, number>
_.deleteAt('b')(l1) // $ExpectType Record<"a", number>
_.deleteAt('b')(d1) // $ExpectType Record<string, number>
_.deleteAt('c')(r1) // $ExpectType Record<"a1" | "a2", number>
_.deleteAt('a1')(r1) // $ExpectType Record<"a2", number>
_.deleteAt(stringKey)(r1) // $ExpectType Record<string, number>

//
// mapWithIndex
//

_.mapWithIndex((_k: 'a', n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
_.mapWithIndex((_k: 'a', n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
_.mapWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
_.mapWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Record<"a1" | "a2", boolean>

//
// map
//

_.map((n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
_.map((n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
_.map((n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
_.map((n: number) => n > 2)(r1) // $ExpectType Record<"a1" | "a2", boolean>

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

_.singleton('a', 1) // $ExpectType Record<string, number>

_.traverseWithIndex(O.option)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
_.traverseWithIndex(O.option)((_k: 'a1' | 'a2', n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a1" | "a2", number>>

_.traverse(O.option)((n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
_.traverse(O.option)((n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a1" | "a2", number>>

_.sequence(O.option)(do1) // $ExpectType Option<Record<string, number>>
_.sequence(O.option)(ro1) // $ExpectType Option<Record<"a1" | "a2", number>>

_.record.compact(do1) // $ExpectType Record<string, number>

_.partitionMapWithIndex((_k: string, n: number): E.Either<string, number> => E.right(n))(d1) // $ExpectType Separated<Record<string, string>, Record<string, number>>
_.partitionMapWithIndex((_k: 'a1' | 'a2', n: number): E.Either<string, number> => E.right(n))(r1) // $ExpectType Separated<Record<string, string>, Record<string, number>>

_.partitionWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Separated<Record<string, number>, Record<string, number>>
_.partitionWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Separated<Record<string, number>, Record<string, number>>

_.filterMapWithIndex((_k: string, n: number) => O.some(n))(d1) // $ExpectType Record<string, number>
_.filterMapWithIndex((_k: 'a1' | 'a2', n: number) => O.some(n))(r1) // $ExpectType Record<string, number>

_.filterWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, number>
_.filterWithIndex((_k: 'a1' | 'a2', n: number) => n > 2)(r1) // $ExpectType Record<string, number>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

_.fromFoldable(getFirstSemigroup<number>(), A.array)(arr1) // $ExpectType Record<string, number>
_.fromFoldable(getFirstSemigroup<number>(), A.array)(arr2) // $ExpectType Record<string, number>

type Keys = 'key1' | 'key2'
_.getMonoid(N.SemigroupSum) // $ExpectType Monoid<Record<string, number>>
_.getMonoid<Keys, number>(N.SemigroupSum) // $ExpectType Monoid<Record<Keys, number>>

_.getEq<Keys, number>(N.Eq) // $ExpectType Eq<Record<Keys, number>>
_.getEq(N.Eq) // $ExpectType Eq<Record<string, number>>

_.toUnfoldable(A.array)({ a: 1 }) // $ExpectType ["a", number][]
_.toUnfoldable(A.array)({ a1: 1, a2: 2 }) // $ExpectType ["a1" | "a2", number][]

declare const fromFoldableF1: Foldable<'Test'>
declare const fromFoldableInput1: HKT<'Test', ['a' | 'b', number]>
_.fromFoldable(getFirstSemigroup<number>(), fromFoldableF1)(fromFoldableInput1) // $ExpectType Record<string, number>

//
// isSubrecord
//

_.isSubrecord(N.Eq)(recordString, recordString) // $ExpectType boolean
_.isSubrecord(N.Eq)(recordString) // $ExpectType (me: Record<string, number>) => boolean

//
// lookup
//

_.lookup('a', recordString) // $ExpectType Option<number>
_.lookup('a') // $ExpectType <A>(r: Record<string, A>) => Option<A>

//
// elem
//

_.elem(N.Eq)(1, recordString) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (fa: Record<string, number>) => boolean

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
