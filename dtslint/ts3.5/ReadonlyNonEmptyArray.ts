import * as _ from '../../src/ReadonlyNonEmptyArray'
import { pipe } from '../../src/pipeable'

declare const rneas: _.ReadonlyNonEmptyArray<string>
declare const rnens: _.ReadonlyNonEmptyArray<number>
declare const rnetns: _.ReadonlyNonEmptyArray<[number, string]>

//
// zip
//

_.zip(rnens, rneas) // $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>

//
// zipWith
//

_.zipWith(rnens, rneas, (n, s) => [n, s] as const) // $ExpectType ReadonlyNonEmptyArray<readonly [number, string]>

//
// unzip
//

_.unzip(rnetns) // $ExpectType readonly [ReadonlyNonEmptyArray<number>, ReadonlyNonEmptyArray<string>]
pipe(rnetns, _.unzip) // $ExpectType readonly [ReadonlyNonEmptyArray<number>, ReadonlyNonEmptyArray<string>]
