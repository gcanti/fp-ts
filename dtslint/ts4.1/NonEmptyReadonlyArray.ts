import * as _ from '../../src/NonEmptyReadonlyArray'
import { pipe } from '../../src/Function'
import type { Ord } from '../../src/typeclasses/Ord'
import type { Eq } from '../../src/typeclasses/Eq'

declare const ras: ReadonlyArray<string>
declare const rneas: _.NonEmptyReadonlyArray<string>
declare const rnens: _.NonEmptyReadonlyArray<number>
declare const rnetns: _.NonEmptyReadonlyArray<[number, string]>

//
// zip
//

pipe(rnens, _.zip(rneas)) // $ExpectType readonly [readonly [number, string], ...(readonly [number, string])[]]

//
// zipWith
//

// $ExpectType readonly [readonly [number, string], ...(readonly [number, string])[]]
pipe(
  rnens,
  _.zipWith(rneas, (n, s) => [n, s] as const)
)

//
// unzip
//

_.unzip(rnetns) // $ExpectType readonly [readonly [number, ...number[]], readonly [string, ...string[]]]
pipe(rnetns, _.unzip) // $ExpectType readonly [readonly [number, ...number[]], readonly [string, ...string[]]]

//
// cons
//

_.prepend(1)([]) // $ExpectType readonly [number, ...number[]]
_.prepend(1)([2, 3]) // $ExpectType readonly [number, ...number[]]

//
// sort
//

declare const ordSubX: Ord<{ readonly a: string }>
interface X {
  readonly a: string
  readonly b: number
}

declare const xs: ReadonlyArray<X>
declare const nexs: _.NonEmptyReadonlyArray<X>

_.sort(ordSubX)(nexs) // $ExpectType readonly [X, ...X[]]
pipe(nexs, _.sort(ordSubX)) // $ExpectType readonly [X, ...X[]]

//
// group
//

declare const eqSubX: Eq<{ readonly a: string }>

_.group(eqSubX)(nexs) // $ExpectType readonly [readonly [X, ...X[]], ...(readonly [X, ...X[]])[]]
pipe(nexs, _.group(eqSubX)) // $ExpectType readonly [readonly [X, ...X[]], ...(readonly [X, ...X[]])[]]

//
// groupBy
//

_.groupBy((x: { readonly a: string }) => x.a)(xs) // $ExpectType Readonly<Record<string, readonly [{ readonly a: string; }, ...{ readonly a: string; }[]]>>
// $ExpectType Readonly<Record<string, readonly [X, ...X[]]>>
pipe(
  xs,
  _.groupBy((x) => x.a)
)

//
// Do
//

// $ExpectType readonly [{ readonly a1: number; readonly a2: string; }, ...{ readonly a1: number; readonly a2: string; }[]]
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

//
// concat
//

_.concat(ras)(rneas) // $ExpectType readonly [string, ...string[]]
_.concat(rneas)(ras) // $ExpectType readonly [string, ...string[]]
pipe(ras, _.concat(rneas)) // $ExpectType readonly [string, ...string[]]
pipe(rneas, _.concat(ras)) // $ExpectType readonly [string, ...string[]]

//
// concat
//

_.concat(ras)(rneas) // $ExpectType readonly [string, ...string[]]
_.concat(rneas)(ras) // $ExpectType readonly [string, ...string[]]
_.concat(ras)(rnens) // $ExpectType readonly [string | number, ...(string | number)[]]
_.concat(rnens)(ras) // $ExpectType readonly [string | number, ...(string | number)[]]
pipe(ras, _.concat(rneas)) // $ExpectType readonly [string, ...string[]]
pipe(rneas, _.concat(ras)) // $ExpectType readonly [string, ...string[]]
pipe(ras, _.concat(rnens)) // $ExpectType readonly [string | number, ...(string | number)[]]
pipe(rnens, _.concat(ras)) // $ExpectType readonly [string | number, ...(string | number)[]]
