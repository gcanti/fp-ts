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

pipe(me, _.intersection(eqNumber)(me)) // $ExpectType ReadonlySet<number>

//
// difference
//

pipe(me, _.difference(eqNumber)(me)) // $ExpectType ReadonlySet<number>
