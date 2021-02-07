import * as _ from '../../src/Ring'
import * as N from '../../src/number'

//
// tuple
//

// $ExpectType Ring<[number, number, number]>
_.tuple(N.Field, N.Field, N.Field)
