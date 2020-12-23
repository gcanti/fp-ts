import * as _ from '../../src/Ring'
import { fieldNumber } from '../../src/Field'

//
// getTupleRing
//

// $ExpectType Ring<[number, number, number]>
_.getTupleRing(fieldNumber, fieldNumber, fieldNumber)
