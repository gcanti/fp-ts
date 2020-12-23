import * as _ from '../../src/Monoid'

//
// getTupleMonoid
//

// $ExpectType Monoid<[string, number, boolean]>
_.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll)

//
// getStructMonoid
//

// $ExpectType Monoid<{ a: string; b: number; c: boolean; }>
_.getStructMonoid({ a: _.monoidString, b: _.monoidSum, c: _.monoidAll })
