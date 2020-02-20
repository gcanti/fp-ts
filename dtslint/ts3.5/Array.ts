import * as _ from '../../src/Array'
import { pipe } from '../../src/pipeable'

declare const ns: Array<number>
declare const ss: Array<string>
declare const tns: Array<[number, string]>

//
// zip
//

_.zip(ns, ss) // $ExpectType [number, string][]

//
// zipWith
//

_.zipWith(ns, ss, (n, s) => [n, s] as const) // $ExpectType (readonly [number, string])[]

//
// unzip
//

_.unzip(tns) // $ExpectType [number[], string[]]
pipe(tns, _.unzip) // $ExpectType [number[], string[]]
