import * as _ from '../../src/Set'
import { eqNumber } from '../../src/Eq'

declare const me: Set<number>

//
// subset
//

_.subset(eqNumber)(me, me) // $ExpectType boolean
_.subset(eqNumber)(me) // $ExpectType (me: Set<number>) => boolean

//
// elem
//

_.elem(eqNumber)(1, me) // $ExpectType boolean
_.elem(eqNumber)(1) // $ExpectType (set: Set<number>) => boolean

//
// union
//

_.union(eqNumber)(me, me) // $ExpectType Set<number>
_.union(eqNumber)(me) // $ExpectType (me: Set<number>) => Set<number>

//
// intersection
//

_.intersection(eqNumber)(me, me) // $ExpectType Set<number>
_.intersection(eqNumber)(me) // $ExpectType (me: Set<number>) => Set<number>

//
// difference
//

_.difference(eqNumber)(me, me) // $ExpectType Set<number>
_.difference(eqNumber)(me) // $ExpectType (me: Set<number>) => Set<number>
