import * as _ from '../../src/NonEmptyArray'
import { ordString } from '../../src/Ord'
import { eqString } from '../../src/Eq'
import { pipe } from '../../src/pipeable'

declare const as: Array<string>
declare const neas: _.NonEmptyArray<string>
declare const nens: _.NonEmptyArray<number>
declare const netns: _.NonEmptyArray<[number, string]>

//
// zip
//

_.zip(nens, neas) // $ExpectType NonEmptyArray<[number, string]>

//
// zipWith
//

_.zipWith(nens, neas, (n, s) => [n, s] as const) // $ExpectType NonEmptyArray<readonly [number, string]>

//
// unzip
//

_.unzip(netns) // $ExpectType [NonEmptyArray<number>, NonEmptyArray<string>]
pipe(netns, _.unzip) // $ExpectType [NonEmptyArray<number>, NonEmptyArray<string>]

//
// sort
//

neas.sort(ordString.compare) // $ExpectType NonEmptyArray<string>

_.sort(ordString)(neas) // $ExpectType NonEmptyArray<string>

//
// cons
//

_.cons(1, []) // $ExpectType NonEmptyArray<1>
_.cons(1, [2, 3]) // $ExpectType NonEmptyArray<number>

//
// group
//

_.group(eqString)(as) // $ExpectType NonEmptyArray<string>[]
_.group(eqString)(neas) // $ExpectType NonEmptyArray<NonEmptyArray<string>>
