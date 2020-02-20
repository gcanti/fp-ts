import * as _ from '../../src/ReadonlyArray'
import { pipe } from '../../src/pipeable'

declare const rns: ReadonlyArray<number>
declare const rss: ReadonlyArray<string>
declare const rtns: ReadonlyArray<readonly [number, string]>

//
// zip
//

_.zip(rns, rss) // $ExpectType readonly (readonly [number, string])[]

//
// zipWith
//

_.zipWith(rns, rss, (n, s) => [n, s] as const) // $ExpectType readonly (readonly [number, string])[]

//
// unzip
//

_.unzip(rtns) // $ExpectType readonly [readonly number[], readonly string[]]
pipe(rtns, _.unzip) // $ExpectType readonly [readonly number[], readonly string[]]
