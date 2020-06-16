import * as _ from '../../src/Map'
import { eqString } from '../../src/Eq'

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
