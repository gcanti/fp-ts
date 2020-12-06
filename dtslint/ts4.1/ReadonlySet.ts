import * as _ from '../../src/ReadonlySet'
import { eqNumber } from '../../src/Eq'
import { pipe } from '../../src/function'

declare const me: ReadonlySet<number>

//
// isSubset
//

pipe(me, _.isSubset(eqNumber)(me)) // $ExpectType boolean

//
// elem
//

pipe(me, _.elem(eqNumber)(1)) // $ExpectType boolean

//
// union
//

pipe(me, _.union(eqNumber)(me)) // $ExpectType ReadonlySet<number>

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
