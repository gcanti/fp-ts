import * as _ from '../../src/Set'
import { eqNumber } from '../../src/Eq'

declare const me: Set<number>

//
// subset
//

_.subset(eqNumber)(me, me) // $ExpectType boolean
_.subset(eqNumber)(me) // $ExpectType (me: Set<number>) => boolean
