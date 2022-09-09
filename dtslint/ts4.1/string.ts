import * as _ from '../../src/string'

declare const s: string;
declare const su: 'ABC';
declare const sl: 'abc';

//
// toUpperCase
//

_.toUpperCase(s) // $ExpectType string
_.toUpperCase(sl) // $ExpectType "ABC"

//
// toLowerCase
//

_.toLowerCase(s) // $ExpectType string
_.toLowerCase(su) // $ExpectType "abc"
