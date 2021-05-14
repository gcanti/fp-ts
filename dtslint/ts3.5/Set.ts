import * as _ from '../../src/Set'
import * as N from '../../src/number'
import { pipe } from '../../src/function'
import * as E from '../../src/Either'

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

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const prns: Set<number>
declare const prsns: Set<string | number>
declare const isString: (u: unknown) => u is string
declare const isNumber: (sn: string | number) => sn is number
declare const predicate: (sn: string | number) => boolean

//
// filter
//

// $ExpectType Set<string>
pipe(prsns, _.filter(isString))
// $ExpectType Set<number>
pipe(prns, _.filter(predicate))
// $ExpectType Set<number>
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

// $ExpectType Separated<Set<unknown>, Set<string>>
pipe(prsns, _.partition(isString))
// $ExpectType Separated<Set<number>, Set<number>>
pipe(prns, _.partition(predicate))
// $ExpectType Separated<Set<string | number>, Set<number>>
pipe(prsns, _.partition(isNumber))
// $ExpectType Separated<Set<number>, Set<number>>
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

// $ExpectType Either<Set<number>, Set<number>>
pipe(
  me,
  E.fromPredicate(_.isEmpty, (as) => as)
)
