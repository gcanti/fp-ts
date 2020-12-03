import * as _ from '../../src/Map'
import { eqString, eqNumber } from '../../src/Eq'

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

_.member(eqString)('a', new Map()) // $ExpectType boolean
_.member(eqString)('a') // $ExpectType <A>(m: Map<string, A>) => boolean

//
// elem
//

_.elem(eqString)('a', new Map()) // $ExpectType boolean
_.elem(eqString)('a') // $ExpectType <K>(m: Map<K, string>) => boolean

//
// lookup
//

_.lookup(eqString)('a', new Map([['a', 1]])) // $ExpectType Option<number>
_.lookup(eqString)('a') // $ExpectType <A>(m: Map<string, A>) => Option<A>

//
// lookupWithKey
//

_.lookupWithKey(eqString)('a', new Map([['a', 1]])) // $ExpectType Option<[string, number]>
_.lookupWithKey(eqString)('a') // $ExpectType <A>(m: Map<string, A>) => Option<[string, A]>

//
// isSubmap
//

_.isSubmap(eqString, eqNumber)(new Map([['a', 1]]), new Map([['a', 1]])) // $ExpectType boolean
_.isSubmap(eqString, eqNumber)(new Map([['a', 1]])) // $ExpectType (me: Map<string, number>) => boolean
