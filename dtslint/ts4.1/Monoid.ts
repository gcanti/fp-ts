import * as _ from '../../src/Monoid'

//
// getTupleMonoid
//

_.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll) // $ExpectType Monoid<[string, number, boolean]>
