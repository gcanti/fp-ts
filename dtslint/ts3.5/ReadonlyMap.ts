import * as _ from '../../src/ReadonlyMap'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { pipe } from '../../src/function'
import * as E from '../../src/Either'

//
// member
//

_.member(S.Eq)('a', new Map()) // $ExpectType boolean
_.member(S.Eq)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => boolean

//
// elem
//

_.elem(S.Eq)('a', new Map()) // $ExpectType boolean
_.elem(S.Eq)('a') // $ExpectType <K>(m: ReadonlyMap<K, string>) => boolean

//
// lookup
//

_.lookup(S.Eq)('a', new Map([['a', 1]])) // $ExpectType Option<number>
_.lookup(S.Eq)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => Option<A>

//
// lookupWithKey
//

_.lookupWithKey(S.Eq)('a', new Map([['a', 1]])) // $ExpectType Option<readonly [string, number]>
_.lookupWithKey(S.Eq)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => Option<readonly [string, A]>

//
// isSubmap
//

_.isSubmap(S.Eq, N.Eq)(new Map([['a', 1]]), new Map([['a', 1]])) // $ExpectType boolean
_.isSubmap(S.Eq, N.Eq)(new Map([['a', 1]])) // $ExpectType (me: ReadonlyMap<string, number>) => boolean

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: ReadonlyMap<string, number>
declare const prsns: ReadonlyMap<string, string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean
declare const isStringWithIndex: (k: string, u: unknown) => u is string
declare const isNumberWithIndex: (k: string, sn: string | number) => sn is number
declare const predicateWithIndex: (k: string, sn: string | number) => boolean

//
// filter
//

// $ExpectType ReadonlyMap<string, string>
pipe(prsns, _.filter(isString))
// $ExpectType ReadonlyMap<string, number>
pipe(prns, _.filter(predicate))
// $ExpectType ReadonlyMap<string, number>
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

// $ExpectType ReadonlyMap<string, string>
pipe(prsns, _.filterWithIndex(isStringWithIndex))
// $ExpectType ReadonlyMap<string, number>
pipe(prns, _.filterWithIndex(predicateWithIndex))
// $ExpectType ReadonlyMap<string, number>
pipe(
  prns,
  _.filterWithIndex(
    (
      k, // $ExpectType string
      x // $ExpectType number
    ) => true
  )
)

//
// partition
//

// $ExpectType Separated<ReadonlyMap<string, unknown>, ReadonlyMap<string, string>>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<ReadonlyMap<string, number>, ReadonlyMap<string, number>>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<ReadonlyMap<string, string | number>, ReadonlyMap<string, number>>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<ReadonlyMap<string, number>, ReadonlyMap<string, number>>
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

// $ExpectType Separated<ReadonlyMap<string, unknown>, ReadonlyMap<string, string>>
pipe(prsns, _.partitionWithIndex(isStringWithIndex))
// $ExpectType Separated<ReadonlyMap<string, number>, ReadonlyMap<string, number>>
pipe(prns, _.partitionWithIndex(predicateWithIndex))
// $ExpectType Separated<ReadonlyMap<string, string | number>, ReadonlyMap<string, number>>
pipe(prsns, _.partitionWithIndex(isNumberWithIndex))
// $ExpectType Separated<ReadonlyMap<string, number>, ReadonlyMap<string, number>>
pipe(
  prns,
  _.partitionWithIndex(
    (
      k, // $ExpectType string
      x // $ExpectType number
    ) => true
  )
)

//
// isEmpty
//

// $ExpectType Either<ReadonlyMap<string, number>, ReadonlyMap<string, number>>
pipe(
  prns,
  E.fromPredicate(_.isEmpty, (as) => as)
)
