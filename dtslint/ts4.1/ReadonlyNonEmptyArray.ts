import * as _ from '../../src/ReadonlyNonEmptyArray'
import { pipe } from '../../src/function'
import { Ord } from '../../src/Ord'

declare const ras: ReadonlyArray<string>
declare const rneas: _.ReadonlyNonEmptyArray<string>
declare const rnens: _.ReadonlyNonEmptyArray<number>
declare const rnetns: _.ReadonlyNonEmptyArray<[number, string]>

//
// zip
//

pipe(rnens, _.zip(rneas)) // $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>

//
// zipWith
//

// $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>
pipe(
  rnens,
  _.zipWith(rneas, (n, s) => [n, s] as const)
)

//
// unzip
//

_.unzip(rnetns) // $ExpectType readonly [ReadonlyNonEmptyArray<number>, ReadonlyNonEmptyArray<string>]
pipe(rnetns, _.unzip) // $ExpectType readonly [ReadonlyNonEmptyArray<number>, ReadonlyNonEmptyArray<string>]

//
// cons
//

_.cons(1)([]) // $ExpectType ReadonlyNonEmptyArray<number>
_.cons(1)([2, 3]) // $ExpectType ReadonlyNonEmptyArray<number>

//
// sort
//

declare const ordSubX: Ord<{ readonly a: string }>
interface X {
  readonly a: string
  readonly b: number
}

declare const xs: ReadonlyArray<X>
declare const nexs: _.ReadonlyNonEmptyArray<X>

_.sort(ordSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<X>
pipe(nexs, _.sort(ordSubX)) // $ExpectType ReadonlyNonEmptyArray<X>

//
// group
//

_.group(ordSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>
pipe(xs, _.group<X>(ordSubX)) // $ExpectType ReadonlyArray<ReadonlyNonEmptyArray<X>>
_.group(ordSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>
// TODO pipe(nexs, _.group<X>(ordSubX)) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>

//
// groupSort
//

_.groupSort(ordSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>
pipe(xs, _.groupSort<X>(ordSubX)) // $ExpectType ReadonlyArray<ReadonlyNonEmptyArray<X>>
_.groupSort(ordSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>
// TODO pipe(nexs, _.groupSort<X>(ordSubX)) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>

//
// groupBy
//

_.groupBy((x: { readonly a: string }) => x.a)(xs) // $ExpectType Readonly<Record<string, ReadonlyNonEmptyArray<{ readonly a: string; }>>>
// $ExpectType Readonly<Record<string, ReadonlyNonEmptyArray<X>>>
pipe(
  xs,
  _.groupBy((x) => x.a)
)

//
// Do
//

// $ExpectType ReadonlyNonEmptyArray<{ a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)
