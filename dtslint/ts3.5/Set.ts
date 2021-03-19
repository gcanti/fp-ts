import * as _ from '../../src/Set'
import * as N from '../../src/number'

declare const me: Set<number>

//
// subset
//

_.subset(N.Eq)(me, me) // $ExpectType boolean
_.subset(N.Eq)(me) // $ExpectType (me: Set<number>) => boolean

//
// elem
//

_.elem(N.Eq)(1, me) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (set: Set<number>) => boolean

//
// union
//

_.union(N.Eq)(me, me) // $ExpectType Set<number>
_.union(N.Eq)(me) // $ExpectType (me: Set<number>) => Set<number>

//
// intersection
//

_.intersection(N.Eq)(me, me) // $ExpectType Set<number>
_.intersection(N.Eq)(me) // $ExpectType (me: Set<number>) => Set<number>

//
// difference
//

_.difference(N.Eq)(me, me) // $ExpectType Set<number>
_.difference(N.Eq)(me) // $ExpectType (me: Set<number>) => Set<number>
