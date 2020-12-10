import * as _ from '../../src/ReadonlyMap'
import { eqString, eqNumber } from '../../src/Eq'
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

pipe(new Map(), _.member(eqString)('a')) // $ExpectType boolean

//
// elem
//

pipe(new Map(), _.elem(eqString)('a')) // $ExpectType boolean

//
// lookup
//

pipe(new Map([['a', 1]]), _.lookup(eqString)('a')) // $ExpectType Option<number>

//
// lookupWithKey
//

pipe(new Map([['a', 1]]), _.lookupWithKey(eqString)('a')) // $ExpectType Option<readonly [string, number]>

//
// isSubmap
//

pipe(new Map([['a', 1]]), _.isSubmap(eqString, eqNumber)(new Map([['a', 1]]))) // $ExpectType boolean
