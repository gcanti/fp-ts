import * as _ from '../../src/ReadonlySet'
import * as N from '../../src/number'
import { pipe } from '../../src/function'

declare const me: ReadonlySet<number>

//
// isSubset
//

pipe(me, _.isSubset(N.Eq)(me)) // $ExpectType boolean

//
// elem
//

pipe(me, _.elem(N.Eq)(1)) // $ExpectType boolean

//
// union
//

pipe(me, _.union(N.Eq)(me)) // $ExpectType ReadonlySet<number>

//
// intersection
//

pipe(me, _.intersection(N.Eq)(me)) // $ExpectType ReadonlySet<number>

//
// difference
//

pipe(me, _.difference(N.Eq)(me)) // $ExpectType ReadonlySet<number>
