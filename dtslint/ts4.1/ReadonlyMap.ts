import * as _ from '../../src/ReadonlyMap'
import { eqString, eqNumber } from '../../src/Eq'

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

_.member(eqString)('a', new Map()) // $ExpectType boolean
_.member(eqString)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => boolean

//
// elem
//

_.elem(eqString)('a', new Map()) // $ExpectType boolean
_.elem(eqString)('a') // $ExpectType <K>(m: ReadonlyMap<K, string>) => boolean

//
// lookup
//

_.lookup(eqString)('a', new Map([['a', 1]])) // $ExpectType Option<number>
_.lookup(eqString)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => Option<A>

//
// lookupWithKey
//

_.lookupWithKey(eqString)('a', new Map([['a', 1]])) // $ExpectType Option<readonly [string, number]>
_.lookupWithKey(eqString)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => Option<readonly [string, A]>

//
// isSubmap
//

_.isSubmap(eqString, eqNumber)(new Map([['a', 1]]), new Map([['a', 1]])) // $ExpectType boolean
_.isSubmap(eqString, eqNumber)(new Map([['a', 1]])) // $ExpectType (me: ReadonlyMap<string, number>) => boolean
