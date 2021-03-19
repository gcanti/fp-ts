import * as _ from '../../src/ReadonlySet'
import * as N from '../../src/number'

declare const me: ReadonlySet<number>

//
// isSubset
//

_.isSubset(N.Eq)(me, me) // $ExpectType boolean
_.isSubset(N.Eq)(me) // $ExpectType (me: ReadonlySet<number>) => boolean

//
// elem
//

_.elem(N.Eq)(1, me) // $ExpectType boolean
_.elem(N.Eq)(1) // $ExpectType (set: ReadonlySet<number>) => boolean

//
// union
//

_.union(N.Eq)(me, me) // $ExpectType ReadonlySet<number>
_.union(N.Eq)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>

//
// intersection
//

_.intersection(N.Eq)(me, me) // $ExpectType ReadonlySet<number>
_.intersection(N.Eq)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>

//
// difference
//

_.difference(N.Eq)(me, me) // $ExpectType ReadonlySet<number>
_.difference(N.Eq)(me) // $ExpectType (me: ReadonlySet<number>) => ReadonlySet<number>
