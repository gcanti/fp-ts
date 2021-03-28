import * as _ from '../../src/Monoid'
import * as S from '../../src/string'
import * as N from '../../src/number'
import * as B from '../../src/boolean'

//
// tuple
//

// $ExpectType Monoid<readonly [string, number, boolean]>
_.tuple(S.Monoid, N.MonoidSum, B.MonoidAll)

//
// getTupleMonoid
//

_.getTupleMonoid(_.monoidString, _.monoidSum, _.monoidAll) // $ExpectType Monoid<[string, number, boolean]>
