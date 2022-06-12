import * as _ from '../../src/ReadonlyArray'
import { identity, pipe } from '../../src/function'
import * as N from '../../src/number'
import { Ord } from '../../src/Ord'
import * as E from '../../src/Either'

declare const rus: ReadonlyArray<unknown>
declare const rns: ReadonlyArray<number>
declare const rss: ReadonlyArray<string>
declare const rtns: ReadonlyArray<readonly [number, string]>

// prepend

pipe(rss, _.prepend('a')) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rss, _.prependW(1)) // $ExpectType ReadonlyNonEmptyArray<string | number>

// append

pipe(rss, _.append('a')) // $ExpectType ReadonlyNonEmptyArray<string>
pipe(rss, _.appendW(1)) // $ExpectType ReadonlyNonEmptyArray<string | number>

//
// zip
//

_.zip(rns, rss) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

_.zipWith(rns, rss, (n, s) => [n, s] as const) // $ExpectType readonly (readonly [number, string])[]

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]

//
// spanLeft
//

// $ExpectType Spanned<number, unknown>
pipe(
  rus,
  _.spanLeft((u: unknown): u is number => typeof u === 'number')
)

//
// lookup
//

_.lookup(0, [1, 2, 3]) // $ExpectType Option<number>
_.lookup(0) // $ExpectType <A>(as: readonly A[]) => Option<A>

//
// elem
//

_.elem(N.Eq)(1, [1, 2, 3]) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (as: readonly number[]) => boolean

//
// difference
//

_.difference(N.Eq)([1, 2], [3, 4]) // $ExpectType readonly number[]
_.difference(N.Eq)([3, 4]) // $ExpectType (ys: readonly number[]) => readonly number[]

//
// intersection
//

_.intersection(N.Eq)([1, 2], [3, 4]) // $ExpectType readonly number[]
_.intersection(N.Eq)([3, 4]) // $ExpectType (ys: readonly number[]) => readonly number[]

//
// union
//

_.union(N.Eq)([1, 2], [3, 4]) // $ExpectType readonly number[]
_.union(N.Eq)([3, 4]) // $ExpectType (ys: readonly number[]) => readonly number[]

//
// zip
//

_.zip([1, 2], ['a', 'b']) // $ExpectType readonly (readonly [number, string])[]
_.zip(['a', 'b']) // $ExpectType <A>(as: readonly A[]) => readonly (readonly [A, string])[]

//
// cons
//

_.cons(0, [1, 2]) // $ExpectType ReadonlyNonEmptyArray<number>
_.cons(0) // $ExpectType (tail: readonly number[]) => ReadonlyNonEmptyArray<number>

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

// $ExpectType readonly { readonly a1: number; readonly a2: string; }[]
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

//
// some
//

// $ExpectType Either<readonly number[], ReadonlyNonEmptyArray<number>>
pipe(
  rns,
  E.fromPredicate(
    _.some((n) => n > 0),
    identity
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

// #1484
const isPositive = E.exists((n: number) => n > 0)
declare const eithers: ReadonlyArray<E.Either<string, number>>
pipe(eithers, _.filter(E.isRight), _.filter(isPositive))

interface Registered {
  readonly type: 'Registered'
  readonly username: string
}
interface Unregistered {
  readonly type: 'Unregistered'
}

type User = Registered | Unregistered

declare const users: ReadonlyArray<User>
declare const isRegistered: (u: User) => u is Registered
declare const p: (u: User) => boolean

const registereds = _.filter(isRegistered)(users)
_.filter(p)(registereds) // $ExpectType readonly Registered[]

interface Test {
  test: string
}
declare const arrayOfTest: Test[]
const isFoo = <T extends Test>(t: T) => t.test === 'foo'
pipe(arrayOfTest, _.filter(isFoo)) // $ExpectType readonly Test[]

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

// $ExpectType Either<readonly string[], readonly []>
pipe(
  rss,
  E.fromPredicate(_.isEmpty, (as) => as)
)
