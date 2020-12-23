import * as _ from '../../src/Eq'

//
// getTupleEq
//

// $ExpectType Eq<[string, number, boolean]>
_.getTupleEq(_.eqString, _.eqNumber, _.eqBoolean)

//
// getStructEq
//

// $ExpectType Eq<{ a: string; b: number; c: boolean; }>
_.getStructEq({ a: _.eqString, b: _.eqNumber, c: _.eqBoolean })
