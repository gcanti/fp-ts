import * as _ from '../../src/ReadonlySet'
import { eqNumber } from '../../src/Eq'

declare const me: ReadonlySet<number>

//
// isSubset
//

_.isSubset(eqNumber)(me, me) // $ExpectType boolean
_.isSubset(eqNumber)(me) // $ExpectType (me: ReadonlySet<number>) => boolean

//
// elem
//

_.elem(eqNumber)(1, me) // $ExpectType boolean
_.elem(eqNumber)(1) // $ExpectType (set: ReadonlySet<number>) => boolean

//
// union
//

_.union(eqNumber)(me, me) // $ExpectType ReadonlySet<number>
_.union(eqNumber)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>

//
// intersection
//

_.intersection(eqNumber)(me, me) // $ExpectType ReadonlySet<number>
_.intersection(eqNumber)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>

//
// difference
//

_.difference(eqNumber)(me, me) // $ExpectType ReadonlySet<number>
_.difference(eqNumber)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>
