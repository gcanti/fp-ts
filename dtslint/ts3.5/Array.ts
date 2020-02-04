import * as _ from '../../src/Array'
import { NonEmptyArray } from '../../src/NonEmptyArray'

declare const ns: Array<number>
declare const ss: Array<string>
declare const nens: NonEmptyArray<number>
declare const sess: NonEmptyArray<string>
declare const tns: Array<[number, string]>
declare const netns: NonEmptyArray<[number, string]>

//
// zip
//

_.zip(ns, ss) // $ExpectType [number, string][]
_.zip(nens, sess) // $ExpectType NonEmptyArray<[number, string]>

//
// zipWith
//

_.zipWith(ns, ss, (n, s) => [n, s] as const) // $ExpectType (readonly [number, string])[]
_.zipWith(nens, sess, (n, s) => [n, s] as const) // $ExpectType NonEmptyArray<readonly [number, string]>

//
// unzip
//

_.unzip(tns) // $ExpectType [number[], string[]]
_.unzip(netns) // $ExpectType [NonEmptyArray<number>, NonEmptyArray<string>]
