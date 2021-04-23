import * as _ from '../../src/ReadonlyArray'
import { pipe } from '../../src/function'
import * as N from '../../src/number'
import { Ord } from '../../src/Ord'
import * as E from '../../src/Either'

declare const rus: ReadonlyArray<unknown>
declare const rss: ReadonlyArray<string>
declare const rns: ReadonlyArray<number>
declare const rtns: ReadonlyArray<readonly [number, string]>

//
// zip
//

pipe(rns, _.zip(rss)) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

// $ExpectType readonly (readonly [number, string])[]
pipe(
  rns,
  _.zipWith(rss, (n, s) => [n, s] as const)
)

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]

//
// filter
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filter((u: unknown): u is number => typeof u === 'number')
)

//
// filterWithIndex
//

// $ExpectType readonly number[]
pipe(
  rus,
  _.filterWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// partition
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partition((u: unknown): u is number => typeof u === 'number')
)

//
// partitionWithIndex
//

// $ExpectType Separated<readonly unknown[], readonly number[]>
pipe(
  rus,
  _.partitionWithIndex((_, u: unknown): u is number => typeof u === 'number')
)

//
// spanLeft
//

// $ExpectType readonly [init: readonly number[], rest: readonly unknown[]]
pipe(
  rus,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)

//
// lookup
//

_.lookup(0) // $ExpectType <A>(as: readonly A[]) => Option<A>

//
// elem
//

pipe([1, 2, 3], _.elem(N.Eq)(1)) // $ExpectType boolean

//
// difference
//

pipe([1, 2], _.difference(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// intersection
//

pipe([1, 2], _.intersection(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// union
//

pipe([1, 2], _.union(N.Eq)([3, 4])) // $ExpectType readonly number[]

//
// zip
//

pipe([1, 2], _.zip(['a', 'b'])) // $ExpectType readonly (readonly [number, string])[]

//
// sort
//

declare const ord1: Ord<{ readonly a: string }>
interface X1 {
  readonly a: string
  readonly b: number
}
declare const x1s: ReadonlyArray<X1>

_.sort(ord1)(x1s) // $ExpectType ReadonlyArray<X1>
pipe(x1s, _.sort(ord1)) // $ExpectType ReadonlyArray<X1>

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
declare const x2s: ReadonlyArray<X2>

_.sortBy([ord2, ord3])(x2s) // $ExpectType ReadonlyArray<X2>
pipe(x2s, _.sortBy([ord2, ord3])) // $ExpectType ReadonlyArray<X2>

//
// Do
//

// $ExpectType readonly { readonly a: number; readonly b: string; }[]
pipe(
  _.Do,
  _.bind('a', () => _.of(1)),
  _.bind('b', () => _.of('b'))
)

//
// scanLeft
//

// $ExpectType ReadonlyNonEmptyArray<number>
pipe(
  [],
  _.scanLeft(1, () => 2)
)

//
// scanRight
//

// $ExpectType ReadonlyNonEmptyArray<number>
pipe(
  [],
  _.scanRight(1, () => 2)
)

//
// some
//

// $ExpectType Either<readonly number[], ReadonlyNonEmptyArray<number>>
pipe(rns, E.fromPredicate(_.some((n) => n > 0)))

//
// prepend
//

_.prepend(0) // $ExpectType (tail: readonly number[]) => ReadonlyNonEmptyArray<number>
pipe(rns, _.prepend(0)) // $ExpectType ReadonlyNonEmptyArray<number>

//
// prependW
//

_.prependW('a') // $ExpectType <A>(tail: readonly A[]) => ReadonlyNonEmptyArray<string | A>
pipe(rns, _.prependW('a')) // $ExpectType ReadonlyNonEmptyArray<string | number>

//
// append
//

_.append(0) // $ExpectType (init: readonly number[]) => ReadonlyNonEmptyArray<number>
pipe(rns, _.append(0)) // $ExpectType ReadonlyNonEmptyArray<number>

//
// appendW
//

_.appendW('a') // $ExpectType <A>(init: readonly A[]) => ReadonlyNonEmptyArray<string | A>
pipe(rns, _.appendW('a')) // $ExpectType ReadonlyNonEmptyArray<string | number>

//
// concat
//

_.concat(rss)(rss) // $ExpectType readonly string[]
pipe(rss, _.concat(rss)) // $ExpectType readonly string[]

//
// concatW
//

_.concatW(rss)(rss) // $ExpectType readonly string[]
_.concatW(rss)(rns) // $ExpectType readonly (string | number)[]
_.concatW(rns)(rss) // $ExpectType readonly (string | number)[]
pipe(rss, _.concatW(rss)) // $ExpectType readonly string[]
pipe(rss, _.concatW(rns)) // $ExpectType readonly (string | number)[]
pipe(rns, _.concatW(rss)) // $ExpectType readonly (string | number)[]

//
// filterWithIndex
//

declare const filterTest: ReadonlyArray<string | number>
// $ExpectType readonly (string | number)[]
pipe(
  filterTest,
  _.filterWithIndex(
    (
      i, // $ExpectType number
      a // $ExpectType string | number
    ) => true
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: ReadonlyArray<number>
declare const prsns: ReadonlyArray<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean
declare const isStringWithIndex: (i: number, u: unknown) => u is string
declare const isNumberWithIndex: (i: number, sn: string | number) => sn is number
declare const predicateWithIndex: (i: number, sn: string | number) => boolean

//
// filter
//

// $ExpectType readonly string[]
pipe(prsns, _.filter(isString))
// $ExpectType readonly number[]
pipe(prns, _.filter(predicate))
// $ExpectType readonly number[]
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

// $ExpectType readonly string[]
pipe(prsns, _.filterWithIndex(isStringWithIndex))
// $ExpectType readonly number[]
pipe(prns, _.filterWithIndex(predicateWithIndex))
// $ExpectType readonly number[]
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

// $ExpectType Separated<readonly unknown[], readonly string[]>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<readonly number[], readonly number[]>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<readonly (string | number)[], readonly number[]>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<readonly number[], readonly number[]>
pipe(
  rns,
  _.partition(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// partitionWithIndex
//

// $ExpectType Separated<readonly unknown[], readonly string[]>
pipe(prsns, _.partitionWithIndex(isStringWithIndex))
// $ExpectType Separated<readonly number[], readonly number[]>
pipe(prns, _.partitionWithIndex(predicateWithIndex))
// $ExpectType Separated<readonly (string | number)[], readonly number[]>
pipe(prsns, _.partitionWithIndex(isNumberWithIndex))
// $ExpectType Separated<readonly number[], readonly number[]>
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

// $ExpectType readonly string[]
pipe(prsns, _.takeLeftWhile(isString))
// $ExpectType readonly number[]
pipe(prns, _.takeLeftWhile(predicate))

//
// dropLeftWhile
//

// $ExpectType readonly string[]
pipe(prsns, _.dropLeftWhile(isString))
// $ExpectType readonly number[]
pipe(prns, _.dropLeftWhile(predicate))

//
// spanLeft
//

// $ExpectType readonly [init: readonly string[], rest: readonly unknown[]]
pipe(prsns, _.spanLeft(isString))
// $ExpectType readonly [init: readonly number[], rest: readonly number[]]
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
