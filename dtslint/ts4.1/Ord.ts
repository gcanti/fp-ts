import * as _ from '../../src/Ord'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// getTupleOrd
//

// $ExpectType Ord<[string, number, boolean]>
_.getTupleOrd(S.Ord, N.Ord, B.Ord)
