import * as _ from '../../src/ReadonlySet'
import * as N from '../../src/number'
import { pipe } from '../../src/function'

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

//
// filter
//

declare const refinement: (u: unknown) => u is string
pipe(new Set<string | number>(), _.filter(refinement)) // $ExpectType ReadonlySet<string>
declare const predicate: (u: unknown) => boolean
pipe(new Set<string | number>(), _.filter(predicate)) // $ExpectType ReadonlySet<string | number>

pipe(
  new Set<string | number>(),
  _.filter(
    (
      a // $ExpectType string | number
    ) => true
  )
)

//
// partition
//

pipe(new Set<string | number>(), _.partition(refinement)) // $ExpectType Separated<ReadonlySet<unknown>, ReadonlySet<string>>
pipe(new Set<string | number>(), _.partition(predicate)) // $ExpectType Separated<ReadonlySet<string | number>, ReadonlySet<string | number>>

pipe(
  new Set<string | number>(),
  _.partition(
    (
      a // $ExpectType string | number
    ) => true
  )
)
