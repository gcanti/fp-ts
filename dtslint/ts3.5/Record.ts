import { pipe } from '../../src/pipeable'
import * as R from '../../src/Record'
import { identity } from '../../src/function'
import * as O from '../../src/Option'
import * as A from '../../src/Array'
import * as E from '../../src/Either'
import { monoidString } from '../../src/Monoid'
import { eqNumber } from '../../src/Eq'
import { semigroupSum, getFirstSemigroup } from '../../src/Semigroup'
import { Foldable } from '../../src/Foldable'
import { HKT } from '../../src/HKT'

declare const do1: { [key: string]: O.Option<number> }
declare const ro1: Record<'a' | 'b', O.Option<number>>
declare const stringKey: string
declare const d1: { [key: string]: number }
declare const recordString: Record<string, number>
declare const r1: Record<'a' | 'b', number>
const l1 = { a: 1 }

declare const keyString: string

//
// hasOwnProperty
//

if (R.hasOwnProperty(keyString, d1)) {
  keyString // $ExpectType string
}
if (R.hasOwnProperty(keyString, recordString)) {
  keyString // $ExpectType string
}
if (R.hasOwnProperty(keyString, r1)) {
  keyString // $ExpectType "a" | "b"
}

//
// updateAt
//

pipe(d1, R.updateAt('a', 3)) // $ExpectType Option<Record<string, number>>
pipe(recordString, R.updateAt('a', 3)) // $ExpectType Option<Record<string, number>>
pipe(r1, R.updateAt('a', 3)) // $ExpectType Option<Record<"a" | "b", number>>

//
// modifyAt
//

pipe(d1, R.modifyAt('a', identity)) // $ExpectType Option<Record<string, number>>
pipe(recordString, R.modifyAt('a', identity)) // $ExpectType Option<Record<string, number>>
pipe(r1, R.modifyAt('a', identity)) // $ExpectType Option<Record<"a" | "b", number>>

//
// pop
//

R.pop('a')(r1) // $ExpectType Option<[number, Record<"b", number>]>
R.pop('a')(d1) // $ExpectType Option<[number, Record<string, number>]>
R.pop(stringKey)(r1) // $ExpectType Option<[number, Record<string, number>]>

//
// collect
//

R.collect((_k: 'a', n: number) => n)({ a: 1 }) // $ExpectType number[]
R.collect((_k: 'a', n: number) => n)(l1) // $ExpectType number[]
R.collect((_k, n: number) => n)(d1) // $ExpectType number[]
R.collect((_k: 'a' | 'b', n: number) => n)(r1) // $ExpectType number[]

//
// toArray
//

R.toArray({ a: 1 }) // $ExpectType ["a", number][]
R.toArray(l1) // $ExpectType ["a", number][]
R.toArray(d1) // $ExpectType [string, number][]
R.toArray(r1) // $ExpectType ["a" | "b", number][]

//
// insertAt
//

R.insertAt('b', 0)({ a: 1 }) // $ExpectType Record<"a" | "b", number>
R.insertAt('b', 0)(l1) // $ExpectType Record<"a" | "b", number>
R.insertAt('b', 0)(d1) // $ExpectType Record<string, number>
R.insertAt('b', 0)(r1) // $ExpectType Record<"a" | "b", number>
R.insertAt(stringKey, 0)(r1) // $ExpectType Record<string, number>
R.insertAt('c', 0)(r1) // $ExpectType Record<"a" | "b" | "c", number>

//
// deleteAt
//

R.deleteAt('a')({ a: 1 }) // $ExpectType Record<never, number>
R.deleteAt('b')({ a: 1 }) // $ExpectType Record<"a", number>
R.deleteAt('a')(l1) // $ExpectType Record<never, number>
R.deleteAt('b')(l1) // $ExpectType Record<"a", number>
R.deleteAt('b')(d1) // $ExpectType Record<string, number>
R.deleteAt('c')(r1) // $ExpectType Record<"a" | "b", number>
R.deleteAt('a')(r1) // $ExpectType Record<"b", number>
R.deleteAt(stringKey)(r1) // $ExpectType Record<string, number>

//
// mapWithIndex
//

R.mapWithIndex((_k: 'a', n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
R.mapWithIndex((_k: 'a', n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
R.mapWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
R.mapWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Record<"a" | "b", boolean>

//
// map
//

R.map((n: number) => n > 2)({ a: 1 }) // $ExpectType Record<"a", boolean>
R.map((n: number) => n > 2)(l1) // $ExpectType Record<"a", boolean>
R.map((n: number) => n > 2)(d1) // $ExpectType Record<string, boolean>
R.map((n: number) => n > 2)(r1) // $ExpectType Record<"a" | "b", boolean>

//
// reduceWithIndex
//

R.reduceWithIndex('', (k: string, _n) => k)(d1) // $ExpectType string
R.reduceWithIndex('', (k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

R.foldMapWithIndex(monoidString)((k: string, _n) => k)(d1) // $ExpectType string
R.foldMapWithIndex(monoidString)((k: 'a' | 'b', _n) => k)(r1) // $ExpectType string

R.reduceRightWithIndex('', (k: string, _n, _b) => k)(d1) // $ExpectType string
R.reduceRightWithIndex('', (k: 'a' | 'b', _n, _b) => k)(r1) // $ExpectType string

R.singleton('a', 1) // $ExpectType Record<"a", number>

R.traverseWithIndex(O.option)((_k, n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
R.traverseWithIndex(O.option)((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a" | "b", number>>

R.traverse(O.option)((n: number) => O.some(n))(d1) // $ExpectType Option<Record<string, number>>
R.traverse(O.option)((n: number) => O.some(n))(r1) // $ExpectType Option<Record<"a" | "b", number>>

R.sequence(O.option)(do1) // $ExpectType Option<Record<string, number>>
R.sequence(O.option)(ro1) // $ExpectType Option<Record<"a" | "b", number>>

R.record.compact(do1) // $ExpectType Record<string, number>

R.partitionMapWithIndex((_k: string, n: number): E.Either<string, number> => E.right(n))(d1) // $ExpectType Separated<Record<string, string>, Record<string, number>>
R.partitionMapWithIndex((_k: 'a' | 'b', n: number): E.Either<string, number> => E.right(n))(r1) // $ExpectType Separated<Record<string, string>, Record<string, number>>

R.partitionWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Separated<Record<string, number>, Record<string, number>>
R.partitionWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Separated<Record<string, number>, Record<string, number>>

R.filterMapWithIndex((_k: string, n: number) => O.some(n))(d1) // $ExpectType Record<string, number>
R.filterMapWithIndex((_k: 'a' | 'b', n: number) => O.some(n))(r1) // $ExpectType Record<string, number>

R.filterWithIndex((_k: string, n: number) => n > 2)(d1) // $ExpectType Record<string, number>
R.filterWithIndex((_k: 'a' | 'b', n: number) => n > 2)(r1) // $ExpectType Record<string, number>

declare const arr1: Array<[string, number]>
declare const arr2: Array<['a' | 'b', number]>

R.fromFoldable(getFirstSemigroup<number>(), A.array)(arr1) // $ExpectType Record<string, number>
R.fromFoldable(getFirstSemigroup<number>(), A.array)(arr2) // $ExpectType Record<"a" | "b", number>

type Keys = 'key1' | 'key2'
R.getMonoid(semigroupSum) // $ExpectType Monoid<Record<string, number>>
R.getMonoid<Keys, number>(semigroupSum) // $ExpectType Monoid<Record<Keys, number>>

R.getEq<Keys, number>(eqNumber) // $ExpectType Eq<Record<Keys, number>>
R.getEq(eqNumber) // $ExpectType Eq<Record<string, number>>

R.toUnfoldable(A.array)({ a: 1 }) // $ExpectType ["a", number][]
R.toUnfoldable(A.array)({ a: 1, b: 2 }) // $ExpectType ["a" | "b", number][]

declare const fromFoldableF1: Foldable<'Test'>
declare const fromFoldableInput1: HKT<'Test', ['a' | 'b', number]>
R.fromFoldable(getFirstSemigroup<number>(), fromFoldableF1)(fromFoldableInput1) // $ExpectType Record<"a" | "b", number>
