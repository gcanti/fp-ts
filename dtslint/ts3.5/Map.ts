import * as _ from '../../src/Map'
import * as S from '../../src/string'
import * as N from '../../src/number'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: unknown): x is string

FWI.filterWithIndex(_.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Map<"a" | "b", string>
FWI.partitionWithIndex(_.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Separated<Map<"a" | "b", string | number>, Map<"a" | "b", string>>

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
