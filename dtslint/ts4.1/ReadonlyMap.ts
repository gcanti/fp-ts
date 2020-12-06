import * as _ from '../../src/ReadonlyMap'
import { eqString, eqNumber } from '../../src/Eq'
import { pipe } from '../../src/function'

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

pipe(new Map(), _.member(eqString)('a')) // $ExpectType boolean

//
// elem
//

pipe(new Map(), _.elem(eqString)('a')) // $ExpectType boolean

//
// lookup
//

_.lookup(eqString)('a', new Map([['a', 1]])) // $ExpectType Option<number>
_.lookup(eqString)('a') // $ExpectType <A>(m: ReadonlyMap<string, A>) => Option<A>

//
// lookupWithKey
//

pipe(new Map([['a', 1]]), _.lookupWithKey(eqString)('a')) // $ExpectType Option<readonly [string, number]>

//
// isSubmap
//

_.isSubmap(eqString, eqNumber)(new Map([['a', 1]]), new Map([['a', 1]])) // $ExpectType boolean
_.isSubmap(eqString, eqNumber)(new Map([['a', 1]])) // $ExpectType (me: ReadonlyMap<string, number>) => boolean
