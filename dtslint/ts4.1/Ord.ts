import * as _ from '../../src/Ord'

//
// getTupleOrd
//

// $ExpectType Ord<[string, number, boolean]>
_.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean)
