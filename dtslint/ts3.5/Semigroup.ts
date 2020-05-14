import * as _ from '../../src/Semigroup'

//
// getTupleSemigroup
//

_.getTupleSemigroup(_.semigroupString, _.semigroupSum, _.semigroupAll) // $ExpectType Semigroup<[string, number, boolean]>
