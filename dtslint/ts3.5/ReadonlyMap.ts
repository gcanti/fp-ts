import * as _ from '../../src/ReadonlyMap'
import { eqString } from '../../src/Eq'

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
