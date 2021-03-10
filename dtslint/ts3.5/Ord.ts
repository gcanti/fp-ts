import * as _ from '../../src/Ord'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Ord<readonly [string, number, boolean]>
_.tuple(S.Ord, N.Ord, B.Ord)

//
// getTupleOrd
//

_.getTupleOrd(_.ordString, _.ordNumber, _.ordBoolean) // $ExpectType Ord<[string, number, boolean]>
