import * as _ from '../../src/ReadonlyMap'
import * as N from '../../src/number'
import * as S from '../../src/string'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: unknown): x is string

FWI.filterWithIndex(_.empty as ReadonlyMap<'a' | 'b', string | number>, isStringWithKey) // $ExpectType ReadonlyMap<"a" | "b", string>
FWI.partitionWithIndex(_.empty as ReadonlyMap<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Separated<ReadonlyMap<"a" | "b", string | number>, ReadonlyMap<"a" | "b", string>>

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
