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
// $ExpectType Separated<ReadonlySet<string>, ReadonlySet<number>>
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
