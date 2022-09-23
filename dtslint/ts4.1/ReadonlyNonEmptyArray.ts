import * as _ from '../../src/ReadonlyNonEmptyArray'
import { pipe } from '../../src/function'
import type { Ord } from '../../src/Ord'
import type { Eq } from '../../src/Eq'

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

// $ExpectType ReadonlyNonEmptyArray<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

//
// concat
//

_.concat(ras)(rneas) // $ExpectType ReadonlyNonEmptyArray<string>
_.concat(rneas)(ras) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(ras, _.concat(rneas)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rneas, _.concat(ras)) // $ExpectType ReadonlyNonEmptyArray<string>

//
// concat
//

_.concat(ras)(rneas) // $ExpectType ReadonlyNonEmptyArray<string>
_.concat(rneas)(ras) // $ExpectType ReadonlyNonEmptyArray<string>
_.concat(ras)(rnens) // $ExpectType ReadonlyNonEmptyArray<string | number>
_.concat(rnens)(ras) // $ExpectType ReadonlyNonEmptyArray<string | number>
pipe(ras, _.concat(rneas)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rneas, _.concat(ras)) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(ras, _.concat(rnens)) // $ExpectType ReadonlyNonEmptyArray<string | number>
pipe(rnens, _.concat(ras)) // $ExpectType ReadonlyNonEmptyArray<string | number>
