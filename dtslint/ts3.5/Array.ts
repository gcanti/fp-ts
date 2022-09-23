import * as _ from '../../src/Array'
import { identity, pipe } from '../../src/function'
import * as N from '../../src/number'
import { Ord } from '../../src/Ord'
import * as E from '../../src/Either'

declare const us: Array<unknown>
declare const ns: Array<number>
declare const ss: Array<string>
declare const tns: Array<[number, string]>

// prepend

pipe(ss, _.prepend('a')) // $ExpectType NonEmptyArray<string>
pipe(ss, _.prependW(1)) // $ExpectType NonEmptyArray<string | number>

// append

pipe(ss, _.append('a')) // $ExpectType NonEmptyArray<string>
pipe(ss, _.appendW(1)) // $ExpectType NonEmptyArray<string | number>

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
// spanLeft
//

// $ExpectType Spanned<number, unknown>
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

_.elem(N.Eq)(1, [1, 2, 3]) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (as: number[]) => boolean

//
// difference
//

_.difference(N.Eq)([1, 2], [3, 4]) // $ExpectType number[]
_.difference(N.Eq)([3, 4]) // $ExpectType (ys: number[]) => number[]

//
// intersection
//

_.intersection(N.Eq)([1, 2], [3, 4]) // $ExpectType number[]
_.intersection(N.Eq)([3, 4]) // $ExpectType (ys: number[]) => number[]

//
// union
//

_.union(N.Eq)([1, 2], [3, 4]) // $ExpectType number[]
_.union(N.Eq)([3, 4]) // $ExpectType (ys: number[]) => number[]

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

// $ExpectType { readonly a1: number; readonly a2: string; }[]
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

//
// some
//

// $ExpectType Either<number[], NonEmptyArray<number>>
pipe(
  ns,
  E.fromPredicate(
    _.some((n) => n > 0),
    identity
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: Array<number>
declare const prsns: Array<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean
declare const isStringWithIndex: (i: number, u: unknown) => u is string
declare const isNumberWithIndex: (i: number, sn: string | number) => sn is number
declare const predicateWithIndex: (i: number, sn: string | number) => boolean

//
// filter
//

// $ExpectType string[]
pipe(prsns, _.filter(isString))
// $ExpectType number[]
pipe(prns, _.filter(predicate))
// $ExpectType number[]
pipe(
  prns,
  _.filter(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// filterWithIndex
//

// $ExpectType string[]
pipe(prsns, _.filterWithIndex(isStringWithIndex))
// $ExpectType number[]
pipe(prns, _.filterWithIndex(predicateWithIndex))
// $ExpectType number[]
pipe(
  prns,
  _.filterWithIndex(
    (
      i, // $ExpectType number
      x // $ExpectType number
    ) => true
  )
)

//
// partition
//

// $ExpectType Separated<unknown[], string[]>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<number[], number[]>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<(string | number)[], number[]>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<number[], number[]>
pipe(
  prns,
  _.partition(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// partitionWithIndex
//

// $ExpectType Separated<unknown[], string[]>
pipe(prsns, _.partitionWithIndex(isStringWithIndex))
// $ExpectType Separated<number[], number[]>
pipe(prns, _.partitionWithIndex(predicateWithIndex))
// $ExpectType Separated<(string | number)[], number[]>
pipe(prsns, _.partitionWithIndex(isNumberWithIndex))
// $ExpectType Separated<number[], number[]>
pipe(
  prns,
  _.partitionWithIndex(
    (
      i, // $ExpectType number
      x // $ExpectType number
    ) => true
  )
)

//
// takeLeftWhile
//

// $ExpectType string[]
pipe(prsns, _.takeLeftWhile(isString))
// $ExpectType number[]
pipe(prns, _.takeLeftWhile(predicate))

//
// dropLeftWhile
//

// $ExpectType string[]
pipe(prsns, _.dropLeftWhile(isString))
// $ExpectType number[]
pipe(prns, _.dropLeftWhile(predicate))

//
// spanLeft
//

// $ExpectType Spanned<string, unknown>
pipe(prsns, _.spanLeft(isString))
// $ExpectType Spanned<number, number>
pipe(prns, _.spanLeft(predicate))

//
// findFirst
//

// $ExpectType Option<string>
pipe(prsns, _.findFirst(isString))
// $ExpectType Option<number>
pipe(prns, _.findFirst(predicate))

//
// findLast
//

// $ExpectType Option<string>
pipe(prsns, _.findLast(isString))
// $ExpectType Option<number>
pipe(prns, _.findLast(predicate))

//
// isEmpty
//

// $ExpectType Either<string[], []>
pipe(
  ss,
  E.fromPredicate(_.isEmpty, (as) => as)
)
