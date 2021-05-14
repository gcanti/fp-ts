import * as _ from '../../src/Map'
import * as S from '../../src/string'
import * as N from '../../src/number'
import { pipe } from '../../src/function'
import * as E from '../../src/Either'

//
// member
//

_.member(S.Eq)('a', new Map()) // $ExpectType boolean
_.member(S.Eq)('a') // $ExpectType <A>(m: Map<string, A>) => boolean

//
// elem
//

_.elem(S.Eq)('a', new Map()) // $ExpectType boolean
_.elem(S.Eq)('a') // $ExpectType <K>(m: Map<K, string>) => boolean

//
// lookup
//

_.lookup(S.Eq)('a', new Map([['a', 1]])) // $ExpectType Option<number>
_.lookup(S.Eq)('a') // $ExpectType <A>(m: Map<string, A>) => Option<A>

//
// lookupWithKey
//

_.lookupWithKey(S.Eq)('a', new Map([['a', 1]])) // $ExpectType Option<[string, number]>
_.lookupWithKey(S.Eq)('a') // $ExpectType <A>(m: Map<string, A>) => Option<[string, A]>

//
// isSubmap
//

_.isSubmap(S.Eq, N.Eq)(new Map([['a', 1]]), new Map([['a', 1]])) // $ExpectType boolean
_.isSubmap(S.Eq, N.Eq)(new Map([['a', 1]])) // $ExpectType (me: Map<string, number>) => boolean

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: Map<string, number>
declare const prsns: Map<string, string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean
declare const isStringWithIndex: (k: string, u: unknown) => u is string
declare const isNumberWithIndex: (k: string, sn: string | number) => sn is number
declare const predicateWithIndex: (k: string, sn: string | number) => boolean

//
// filter
//

// $ExpectType Map<string, string>
pipe(prsns, _.filter(isString))
// $ExpectType Map<string, number>
pipe(prns, _.filter(predicate))
// $ExpectType Map<string, number>
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

// $ExpectType Map<string, string>
pipe(prsns, _.filterWithIndex(isStringWithIndex))
// $ExpectType Map<string, number>
pipe(prns, _.filterWithIndex(predicateWithIndex))
// $ExpectType Map<string, number>
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

// $ExpectType Separated<Map<string, unknown>, Map<string, string>>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<Map<string, number>, Map<string, number>>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<Map<string, string | number>, Map<string, number>>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<Map<string, number>, Map<string, number>>
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

// $ExpectType Separated<Map<string, unknown>, Map<string, string>>
pipe(prsns, _.partitionWithIndex(isStringWithIndex))
// $ExpectType Separated<Map<string, number>, Map<string, number>>
pipe(prns, _.partitionWithIndex(predicateWithIndex))
// $ExpectType Separated<Map<string, string | number>, Map<string, number>>
pipe(prsns, _.partitionWithIndex(isNumberWithIndex))
// $ExpectType Separated<Map<string, number>, Map<string, number>>
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

// $ExpectType Either<Map<string, number>, Map<string, number>>
pipe(
  prns,
  E.fromPredicate(_.isEmpty, (as) => as)
)
