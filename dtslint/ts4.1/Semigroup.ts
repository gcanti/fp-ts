import * as _ from '../../src/Semigroup'
import { pipe } from '../../src/function'

//
// getTupleSemigroup
//

_.getTupleSemigroup(_.semigroupString, _.semigroupSum, _.semigroupAll) // $ExpectType Semigroup<[string, number, boolean]>

//
// fold
//

pipe(['a'], _.fold(_.semigroupString)('')) // $ExpectType string
