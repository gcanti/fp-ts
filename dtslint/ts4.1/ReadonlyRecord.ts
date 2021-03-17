import { pipe, identity } from '../../src/function'
import * as _ from '../../src/ReadonlyRecord'
import * as O from '../../src/Option'
import * as A from '../../src/ReadonlyArray'
import * as E from '../../src/Either'
import * as N from '../../src/number'
import * as S from '../../src/string'

declare const do1: { [key: string]: O.Option<number> }
declare const ro1: Readonly<Record<'a' | 'b', O.Option<number>>>
declare const stringKey: string
declare const d1: { [key: string]: number }
declare const recordString: Readonly<Record<string, number>>
declare const r1: Readonly<Record<'a' | 'b', number>>
const l1 = { a: 1 }

declare const keyString: string

//
// singleton
//

_.singleton('a', 1) // $ExpectType Readonly<Record<string, number>>

//
// has
//

if (_.has(keyString, d1)) {
  keyString // $ExpectType string
}
if (_.has(keyString, recordString)) {
  keyString // $ExpectType string
}
if (_.has(keyString, r1)) {
  keyString // $ExpectType "a" | "b"
}

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

_.insertAt('b', 0)(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.insertAt(stringKey, 0)(r1) // $ExpectType Option<Readonly<Record<string, number>>>

//
// upsertAt
//

_.upsertAt('b', 0)(d1) // $ExpectType Readonly<Record<string, number>>
_.upsertAt(stringKey, 0)(r1) // $ExpectType Readonly<Record<string, number>>

//
// updateAt
//

pipe(d1, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.updateAt('a', 3)) // $ExpectType Option<Readonly<Record<string, number>>>

//
// modifyAt
//

pipe(d1, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(recordString, _.modifyAt('a', identity)) // $ExpectType Option<Readonly<Record<string, number>>>

//
// deleteAt
//

_.deleteAt('b')(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.deleteAt(stringKey)(r1) // $ExpectType Option<Readonly<Record<string, number>>>

//
// pop
//

_.pop('a')(d1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>
_.pop(stringKey)(r1) // $ExpectType Option<readonly [number, Readonly<Record<string, number>>]>

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

_.foldMapWithIndex(S.Monoid)((k: string, _n) => k)(d1) // $ExpectType string
_.foldMapWithIndex(S.Monoid)((k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

_.reduceRightWithIndex('', (k: string, _n, _b) => k)(d1) // $ExpectType string
_.reduceRightWithIndex('', (k: 'a' | 'b', _n, _b) => k)(r1) // $ExpectType string

_.traverseWithIndex(O.Applicative)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverseWithIndex(O.Applicative)((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

_.traverse(O.Applicative)((n: number) => O.some(n))(d1) // $ExpectType Option<Readonly<Record<string, number>>>
_.traverse(O.Applicative)((n: number) => O.some(n))(r1) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

pipe(do1, _.traverse(O.Applicative)(identity)) // $ExpectType Option<Readonly<Record<string, number>>>
pipe(ro1, _.traverse(O.Applicative)(identity)) // $ExpectType Option<Readonly<Record<"a" | "b", number>>>

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

type Keys = 'key1' | 'key2'
_.getMonoid(N.SemigroupSum) // $ExpectType Monoid<Readonly<Record<string, number>>>
_.getMonoid<number, Keys>(N.SemigroupSum) // $ExpectType Monoid<Readonly<Record<Keys, number>>>

_.getEq<number, Keys>(N.Eq) // $ExpectType Eq<Readonly<Record<Keys, number>>>
_.getEq(N.Eq) // $ExpectType Eq<Readonly<Record<string, number>>>

_.toUnfoldable(A.Unfoldable)({ a: 1 }) // $ExpectType readonly (readonly ["a", number])[]
_.toUnfoldable(A.Unfoldable)({ a: 1, b: 2 }) // $ExpectType readonly (readonly ["a" | "b", number])[]

//
// isSubrecord
//

pipe(recordString, _.isSubrecord(N.Eq)(recordString)) // $ExpectType boolean

//
// lookup
//

pipe(recordString, _.lookup('a')) // $ExpectType Option<number>

//
// elem
//

pipe(r1, _.elem(N.Eq)(1)) // $ExpectType boolean

//
// fromFoldable
//

// $ExpectType Readonly<Record<string, string>>
pipe(
  ['a', 'b'],
  _.fromFoldable(A.Foldable)(S.Semigroup)((s: 'a' | 'b' | 'c') => [s, s])
)
