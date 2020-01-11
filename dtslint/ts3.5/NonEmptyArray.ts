import * as NEA from '../../src/NonEmptyArray'
import { ordString } from '../../src/Ord'
import { eqString } from '../../src/Eq'

declare const as: Array<string>
declare const neas: NEA.NonEmptyArray<string>

neas.sort(ordString.compare) // $ExpectType NonEmptyArray<string>

//
// sort
//

NEA.sort(ordString)(neas) // $ExpectType NonEmptyArray<string>

//
// cons
//

NEA.cons(1, []) // $ExpectType NonEmptyArray<1>
NEA.cons(1, [2, 3]) // $ExpectType NonEmptyArray<number>

//
// group
//

NEA.group(eqString)(as) // $ExpectType NonEmptyArray<string>[]
NEA.group(eqString)(neas) // $ExpectType NonEmptyArray<NonEmptyArray<string>>
