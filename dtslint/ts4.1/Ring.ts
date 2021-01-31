import * as _ from '../../src/Ring'
import * as N from '../../src/number'

//
// getTupleRing
//

// $ExpectType Ring<[number, number, number]>
_.getTupleRing(N.Field, N.Field, N.Field)
