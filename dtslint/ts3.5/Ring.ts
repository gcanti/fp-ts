import * as _ from '../../src/Ring'
import { fieldNumber } from '../../src/Field'

//
// getTupleRing
//

_.getTupleRing(fieldNumber, fieldNumber, fieldNumber) // $ExpectType Ring<[number, number, number]>
