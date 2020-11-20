import * as _ from '../../src/Array'
import { pipe } from '../../src/function'
import { eqNumber } from '../../src/Eq'
import { Ord } from '../../src/Ord'

declare const us: Array<unknown>
declare const ns: Array<number>
declare const ss: Array<string>
declare const tns: Array<[number, string]>

//
// zip
//

_.zip(ns, ss) // $ExpectType [number, string][]

//
// zipWith
//

_.zipWith(ns, ss, (n, s) => [n, s] as const) // $ExpectType (readonly [number, string])[]

//
// unzip
//

_.unzip(tns) // $ExpectType [number[], string[]]
pipe(tns, _.unzip) // $ExpectType [number[], string[]]

//
// Filterable overlodings
//

declare function isStringWithIndex(i: number, x: unknown): x is string

_.array.filterWithIndex([] as Array<string | number>, isStringWithIndex) // $ExpectType string[]
_.array.partitionWithIndex([] as Array<string | number>, isStringWithIndex) // $ExpectType Separated<(string | number)[], string[]>

//
// filter
//

// $ExpectType number[]
pipe(
  us,
  _.filter((u: unknown): u is number => typeof u === 'number')
)

//
// filterWithIndex
//

// $ExpectType number[]
pipe(
  us,
  _.filterWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// partition
//

// $ExpectType Separated<unknown[], number[]>
pipe(
  us,
  _.partition((u: unknown): u is number => typeof u === 'number')
)

//
// partitionWithIndex
//

// $ExpectType Separated<unknown[], number[]>
pipe(
  us,
  _.partitionWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// spanLeft
//

// $ExpectType { init: number[]; rest: unknown[]; }
pipe(
  us,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)

//
// lookup
//

_.lookup(0, [1, 2, 3]) // $ExpectType Option<number>
_.lookup(0) // $ExpectType <A>(as: A[]) => Option<A>

//
// elem
//

_.elem(eqNumber)(1, [1, 2, 3]) // $ExpectType boolean
_.elem(eqNumber)(1) // $ExpectType (as: number[]) => boolean

//
// difference
//

_.difference(eqNumber)([1, 2], [3, 4]) // $ExpectType number[]
_.difference(eqNumber)([3, 4]) // $ExpectType (ys: number[]) => number[]

//
// intersection
//

_.intersection(eqNumber)([1, 2], [3, 4]) // $ExpectType number[]
_.intersection(eqNumber)([3, 4]) // $ExpectType (ys: number[]) => number[]

//
// union
//

_.union(eqNumber)([1, 2], [3, 4]) // $ExpectType number[]
_.union(eqNumber)([3, 4]) // $ExpectType (ys: number[]) => number[]

//
// zip
//

_.zip([1, 2], ['a', 'b']) // $ExpectType [number, string][]
_.zip(['a', 'b']) // $ExpectType <A>(as: A[]) => [A, string][]

//
// cons
//

_.cons(0, [1, 2]) // $ExpectType NonEmptyArray<number>
_.cons(0) // $ExpectType (tail: number[]) => NonEmptyArray<number>

//
// sort
//

declare const ord1: Ord<{ readonly a: string }>
interface X1 {
  readonly a: string
  readonly b: number
}
declare const x1s: Array<X1>

_.sort(ord1)(x1s) // $ExpectType X1[]
pipe(x1s, _.sort(ord1)) // $ExpectType X1[]

//
// sortBy
//

declare const ord2: Ord<X1>
declare const ord3: Ord<X1>
interface X2 {
  readonly a: string
  readonly b: number
  readonly c: boolean
}
declare const x2s: Array<X2>

_.sortBy([ord2, ord3])(x2s) // $ExpectType X2[]
pipe(x2s, _.sortBy([ord2, ord3])) // $ExpectType X2[]

//
// Do
//

// $ExpectType { a: number; b: string; }[]
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)
