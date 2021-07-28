import * as _ from '../../src/ReadonlySet'
import * as N from '../../src/number'
import { pipe } from '../../src/function'
import * as E from '../../src/Either'

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

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: ReadonlySet<number>
declare const prsns: ReadonlySet<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean

//
// filter
//

// $ExpectType ReadonlySet<string>
pipe(prsns, _.filter(isString))
// $ExpectType ReadonlySet<number>
pipe(prns, _.filter(predicate))
// $ExpectType ReadonlySet<number>
pipe(
  prns,
  _.filter(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// partition
//

// $ExpectType Separated<ReadonlySet<unknown>, ReadonlySet<string>>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<ReadonlySet<number>, ReadonlySet<number>>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<ReadonlySet<string | number>, ReadonlySet<number>>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<ReadonlySet<number>, ReadonlySet<number>>
pipe(
  prns,
  _.partition(
    (
      x // $ExpectType number
    ) => true
  )
)

//
// isEmpty
//

// $ExpectType Either<ReadonlySet<number>, ReadonlySet<number>>
pipe(
  me,
  E.fromPredicate(_.isEmpty, (as) => as)
)
