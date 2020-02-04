import * as _ from '../../src/ReadonlyArray'
import { ReadonlyNonEmptyArray } from '../../src/ReadonlyNonEmptyArray'

declare const ns: ReadonlyArray<number>
declare const ss: ReadonlyArray<string>
declare const nens: ReadonlyNonEmptyArray<number>
declare const sess: ReadonlyNonEmptyArray<string>
declare const tns: ReadonlyArray<readonly [number, string]>
declare const netns: ReadonlyNonEmptyArray<readonly [number, string]>

//
// zip
//

_.zip(ns, ss) // $ExpectType readonly (readonly [number, string])[]
_.zip(nens, sess) // $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>

//
// zipWith
//

_.zipWith(ns, ss, (n, s) => [n, s] as const) // $ExpectType readonly (readonly [number, string])[]
_.zipWith(nens, sess, (n, s) => [n, s] as const) // $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>

//
// unzip
//

_.unzip(tns) // $ExpectType readonly [readonly number[], readonly string[]]
_.unzip(netns) // $ExpectType readonly [ReadonlyNonEmptyArray<number>, ReadonlyNonEmptyArray<string>]
