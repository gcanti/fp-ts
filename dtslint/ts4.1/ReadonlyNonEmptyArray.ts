import * as _ from '../../src/ReadonlyNonEmptyArray'
import { pipe } from '../../src/function'
import { Ord } from '../../src/Ord'
import { Eq } from '../../src/Eq'

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

_.prepend(1)([]) // $ExpectType ReadonlyNonEmptyArray<number>
_.prepend(1)([2, 3]) // $ExpectType ReadonlyNonEmptyArray<number>

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

declare const eqSubX: Eq<{ readonly a: string }>

_.group(eqSubX)(nexs) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>
pipe(nexs, _.group(eqSubX)) // $ExpectType ReadonlyNonEmptyArray<ReadonlyNonEmptyArray<X>>

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

//
// concat
//

_.concat(ras)(rneas) // $ExpectType ReadonlyNonEmptyArray<string>
_.concat(rneas)(ras) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(ras, _.concat(rneas)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rneas, _.concat(ras)) // $ExpectType ReadonlyNonEmptyArray<string>

//
// concatW
//

_.concatW(ras)(rneas) // $ExpectType ReadonlyNonEmptyArray<string>
_.concatW(rneas)(ras) // $ExpectType ReadonlyNonEmptyArray<string>
_.concatW(ras)(rnens) // $ExpectType ReadonlyNonEmptyArray<string | number>
_.concatW(rnens)(ras) // $ExpectType ReadonlyNonEmptyArray<string | number>
pipe(ras, _.concatW(rneas)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rneas, _.concatW(ras)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(ras, _.concatW(rnens)) // $ExpectType ReadonlyNonEmptyArray<string | number>
pipe(rnens, _.concatW(ras)) // $ExpectType ReadonlyNonEmptyArray<string | number>
