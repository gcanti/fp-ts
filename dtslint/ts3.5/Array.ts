import * as _ from '../../src/Array'
import { pipe } from '../../src/pipeable'

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
