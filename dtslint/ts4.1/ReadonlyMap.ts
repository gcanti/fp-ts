import * as _ from '../../src/ReadonlyMap'
import * as RA from '../../src/ReadonlyArray'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { pipe } from '../../src/function'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a1' | 'a2'>()

declare function isStringWithKey(i: 'a1' | 'a2', x: unknown): x is string

pipe(_.empty as ReadonlyMap<'a1' | 'a2', string | number>, FWI.filterWithIndex(isStringWithKey)) // $ExpectType ReadonlyMap<"a1" | "a2", string>
pipe(_.empty as ReadonlyMap<'a1' | 'a2', string | number>, FWI.partitionWithIndex(isStringWithKey)) // $ExpectType Separated<ReadonlyMap<"a1" | "a2", unknown>, ReadonlyMap<"a1" | "a2", string>>

//
// member
//

pipe(new Map(), _.member(S.Eq)('a')) // $ExpectType boolean

//
// elem
//

pipe(new Map(), _.elem(S.Eq)('a')) // $ExpectType boolean

//
// lookup
//

pipe(new Map([['a', 1]]), _.lookup(S.Eq)('a')) // $ExpectType Option<number>

//
// lookupWithKey
//

pipe(new Map([['a', 1]]), _.lookupWithKey(S.Eq)('a')) // $ExpectType Option<readonly [string, number]>

//
// isSubmap
//

pipe(new Map([['a', 1]]), _.isSubmap(S.Eq, N.Eq)(new Map([['a', 1]]))) // $ExpectType boolean

//
// fromFoldable
//

// $ExpectType ReadonlyMap<string, string>
pipe(
  ['a', 'b'] as const,
  _.fromFoldable(RA.Foldable)(S.Eq, S.Semigroup)((s: 'a' | 'b' | 'c') => [s, s])
)

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
