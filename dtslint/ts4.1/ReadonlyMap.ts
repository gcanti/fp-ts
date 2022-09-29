import * as _ from '../../src/ReadonlyMap'
import * as RA from '../../src/ReadonlyArray'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { pipe } from '../../src/function'

//
// refineWithIndex
//

declare function isStringWithKey(i: 'a1' | 'a2', x: unknown): x is string

// $ExpectType ReadonlyMap<"a1" | "a2", string>
pipe(_.emptyKind() as ReadonlyMap<'a1' | 'a2', string | number>, _.filterWithIndex(isStringWithKey))

//
// refinementWithIndex
//

// $ExpectType readonly [ReadonlyMap<"a1" | "a2", string | number>, ReadonlyMap<"a1" | "a2", string>]
pipe(_.emptyKind() as ReadonlyMap<'a1' | 'a2', string | number>, _.partitionWithIndex(isStringWithKey))

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
// refine
//

// $ExpectType ReadonlyMap<string, string>
pipe(prsns, _.filter(isString))

//
// filter
//

// $ExpectType ReadonlyMap<string, number>
pipe(prns, _.filter(predicate))
// $ExpectType ReadonlyMap<string, number>
pipe(
  prns,
  _.filter(
    (
      _x // $ExpectType number
    ) => true
  )
)

//
// refineWithIndex
//

// $ExpectType ReadonlyMap<string, string>
pipe(prsns, _.filterWithIndex(isStringWithIndex))

//
// filterWithIndex
//

// $ExpectType ReadonlyMap<string, number>
pipe(prns, _.filterWithIndex(predicateWithIndex))
// $ExpectType ReadonlyMap<string, number>
pipe(
  prns,
  _.filterWithIndex(
    (
      _k, // $ExpectType string
      _x // $ExpectType number
    ) => true
  )
)

//
// refinement
//

// $ExpectType readonly [ReadonlyMap<string, string | number>, ReadonlyMap<string, string>]
pipe(prsns, _.partition(isString))

// $ExpectType readonly [ReadonlyMap<string, string | number>, ReadonlyMap<string, number>]
pipe(prsns, _.partition(isNumber))

//
// partition
//

// $ExpectType readonly [ReadonlyMap<string, number>, ReadonlyMap<string, number>]
pipe(prns, _.partition(predicate))
// $ExpectType readonly [ReadonlyMap<string, number>, ReadonlyMap<string, number>]
pipe(
  prns,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)

//
// refinementWithIndex
//

// $ExpectType readonly [ReadonlyMap<string, string | number>, ReadonlyMap<string, string>]
pipe(prsns, _.partitionWithIndex(isStringWithIndex))

// $ExpectType readonly [ReadonlyMap<string, string | number>, ReadonlyMap<string, number>]
pipe(prsns, _.partitionWithIndex(isNumberWithIndex))

//
// partitionWithIndex
//

// $ExpectType readonly [ReadonlyMap<string, number>, ReadonlyMap<string, number>]
pipe(prns, _.partitionWithIndex(predicateWithIndex))
// $ExpectType readonly [ReadonlyMap<string, number>, ReadonlyMap<string, number>]
pipe(
  prns,
  _.partitionWithIndex(
    (
      _k, // $ExpectType string
      _x // $ExpectType number
    ) => true
  )
)
