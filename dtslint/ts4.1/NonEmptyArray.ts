import * as _ from '../../src/NonEmptyArray'
import { Ord } from '../../src/Ord'
import { pipe } from '../../src/function'

declare const as: Array<string>
declare const neas: _.NonEmptyArray<string>
declare const nens: _.NonEmptyArray<number>
declare const netns: _.NonEmptyArray<[number, string]>

//
// zip
//

_.zip(nens, neas) // $ExpectType NonEmptyArray<[number, string]>
_.zip(neas) // $ExpectType <A>(as: NonEmptyArray<A>) => NonEmptyArray<[A, string]>

//
// zipWith
//

_.zipWith(nens, neas, (n, s) => [n, s] as const) // $ExpectType NonEmptyArray<readonly [number, string]>

//
// unzip
//

_.unzip(netns) // $ExpectType [NonEmptyArray<number>, NonEmptyArray<string>]
pipe(netns, _.unzip) // $ExpectType [NonEmptyArray<number>, NonEmptyArray<string>]

//
// cons
//

_.cons(1, []) // $ExpectType NonEmptyArray<1>
_.cons(1, [2, 3]) // $ExpectType NonEmptyArray<number>

//
// sort
//

declare const ordSubX: Ord<{ readonly a: string }>
interface X {
  readonly a: string
  readonly b: number
}

declare const xs: Array<X>
declare const nexs: _.NonEmptyArray<X>

_.sort(ordSubX)(nexs) // $ExpectType NonEmptyArray<X>
pipe(nexs, _.sort(ordSubX)) // $ExpectType NonEmptyArray<X>

//
// group
//

_.group(ordSubX)(xs) // $ExpectType NonEmptyArray<X>[]
pipe(xs, _.group<X>(ordSubX)) // $ExpectType NonEmptyArray<X>[]
_.group(ordSubX)(nexs) // $ExpectType NonEmptyArray<NonEmptyArray<X>>
// TODO pipe(nexs, _.group<X>(ordSubX)) // $ExpectType NonEmptyArray<NonEmptyArray<X>>

//
// groupSort
//

_.groupSort(ordSubX)(xs) // $ExpectType NonEmptyArray<X>[]
pipe(xs, _.groupSort<X>(ordSubX)) // $ExpectType NonEmptyArray<X>[]
_.groupSort(ordSubX)(nexs) // $ExpectType NonEmptyArray<NonEmptyArray<X>>
// TODO pipe(nexs, _.groupSort<X>(ordSubX)) // $ExpectType NonEmptyArray<NonEmptyArray<X>>

//
// groupBy
//

_.groupBy((x: { readonly a: string }) => x.a)(xs) // $ExpectType Record<string, NonEmptyArray<{ readonly a: string; }>>
// $ExpectType Record<string, NonEmptyArray<X>>
pipe(
  xs,
  _.groupBy((x) => x.a)
)

//
// Do
//

// $ExpectType NonEmptyArray<{ a: number; b: string; }>
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)
