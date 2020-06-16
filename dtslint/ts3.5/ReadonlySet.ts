import * as _ from '../../src/ReadonlySet'
import { eqNumber } from '../../src/Eq'

declare const me: ReadonlySet<number>

//
// isSubset
//

_.isSubset(eqNumber)(me, me) // $ExpectType boolean
_.isSubset(eqNumber)(me) // $ExpectType (me: ReadonlySet<number>) => boolean
