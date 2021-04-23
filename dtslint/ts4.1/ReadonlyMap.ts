import * as _ from '../../src/ReadonlyMap'
import * as RA from '../../src/ReadonlyArray'
import * as N from '../../src/number'
import * as S from '../../src/string'
import { pipe } from '../../src/function'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: unknown): x is string

pipe(_.empty as ReadonlyMap<'a' | 'b', string | number>, FWI.filterWithIndex(isStringWithKey)) // $ExpectType ReadonlyMap<"a" | "b", string>
pipe(_.empty as ReadonlyMap<'a' | 'b', string | number>, FWI.partitionWithIndex(isStringWithKey)) // $ExpectType Separated<ReadonlyMap<"a" | "b", unknown>, ReadonlyMap<"a" | "b", string>>

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
  ['a', 'b'],
  _.fromFoldable(RA.Foldable)(S.Eq, S.Semigroup)((s: 'a' | 'b' | 'c') => [s, s])
)

//
// filter
//

declare const filterTest: ReadonlyMap<string, string | number>
declare const isString: (u: unknown) => u is string
declare const predicate: (u: unknown) => boolean
// $ExpectType ReadonlyMap<string, string>
pipe(filterTest, _.filter(isString))
// $ExpectType ReadonlyMap<string, string | number>
pipe(filterTest, _.filter(predicate))
pipe(
  filterTest,
  _.filter(
    (
      a // $ExpectType string | number
    ) => true
  )
)

//
// filterWithIndex
//

// $ExpectType ReadonlyMap<string, string | number>
pipe(
  filterTest,
  _.filterWithIndex(
    (
      k, // $ExpectType string
      a // $ExpectType string | number
    ) => true
  )
)
