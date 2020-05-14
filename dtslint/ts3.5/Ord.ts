import * as _ from '../../src/Ord'

//
// getTupleOrd
//

_.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean) // $ExpectType Ord<[string, number, boolean]>
