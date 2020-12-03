import * as _ from '../../src/Semigroup'

//
// getTupleSemigroup
//

_.getTupleSemigroup(_.semigroupString, _.semigroupSum, _.semigroupAll) // $ExpectType Semigroup<[string, number, boolean]>

//
// fold
//

_.fold(_.semigroupString)('', ['a']) // $ExpectType string
_.fold(_.semigroupString)('') // $ExpectType (as: readonly string[]) => string
