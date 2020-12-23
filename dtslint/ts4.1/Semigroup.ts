import * as _ from '../../src/Semigroup'
import { pipe } from '../../src/function'

//
// getTupleSemigroup
//

// $ExpectType Semigroup<[string, number, boolean]>
_.getTupleSemigroup(_.semigroupString, _.semigroupSum, _.semigroupAll)

//
// getStructSemigroup
//

// $ExpectType Semigroup<{ a: string; b: number; c: boolean; }>
_.getStructSemigroup({ a: _.semigroupString, b: _.semigroupSum, c: _.semigroupAll })

//
// fold
//

// $ExpectType string
pipe(['a'], _.fold(_.semigroupString)(''))
