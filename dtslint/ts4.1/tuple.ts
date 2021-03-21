import * as _ from '../../src/tuple'

//
// make
//

_.tuple() // $ExpectType []
_.tuple(1) // $ExpectType [number]
_.tuple(1, 'a') // $ExpectType [number, string]
_.tuple(1, 'a', true) // $ExpectType [number, string, boolean]
