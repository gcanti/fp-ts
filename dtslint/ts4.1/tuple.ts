import * as _ from '../../src/tuple'

//
// make
//

_.make() // $ExpectType []
_.make(1) // $ExpectType [number]
_.make(1, 'a') // $ExpectType [number, string]
_.make(1, 'a', true) // $ExpectType [number, string, boolean]
