import * as _ from '../../src/ReadonlyMap'
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
