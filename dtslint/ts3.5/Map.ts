import * as _ from '../../src/Map'

//
// FilterableWithIndex overloadings
//

const FWI = _.getFilterableWithIndex<'a' | 'b'>()

declare function isStringWithKey(i: 'a' | 'b', x: unknown): x is string

FWI.filterWithIndex(_.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Map<"a" | "b", string>
FWI.partitionWithIndex(_.empty as Map<'a' | 'b', string | number>, isStringWithKey) // $ExpectType Separated<Map<"a" | "b", string | number>, Map<"a" | "b", string>>
