import { pipe } from '../../src/function'
import * as _ from '../../src/Option'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType Option<string>
pipe(sn, _.fromRefinement(isString))
pipe(
  sn,
  _.fromRefinement(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType Option<string | number>
pipe(sn, _.fromPredicate(predicate))
// $ExpectType Option<number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType Option<number>
pipe(
  n,
  _.fromPredicate(
    (
      _n // $ExpectType number
    ) => true
  )
)

//
// -------------------------------------------------------------------------------------
//

//
// getOrElse
//

// $ExpectType string | null
pipe(
  _.some('a'),
  _.getOrElse(() => null)
)

//
// Do
//

// $ExpectType Option<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.of(1)),
  _.bind('a2', () => _.of('b'))
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const on: _.Option<number>
declare const osn: _.Option<string | number>
declare const isNumber: (sn: string | number) => sn is number

//
// filter
//

// $ExpectType Option<string>
pipe(osn, _.filter(isString))
// $ExpectType Option<number>
pipe(on, _.filter(predicate))
// $ExpectType Option<number>
pipe(
  on,
  _.filter(
    (
      _x // $ExpectType number
    ) => true
  )
)

//
// partition
//

// $ExpectType Separated<Option<unknown>, Option<string>>
pipe(osn, _.partition(isString))
// $ExpectType Separated<Option<number>, Option<number>>
pipe(on, _.partition(predicate))
// $ExpectType Separated<Option<string | number>, Option<number>>
pipe(osn, _.partition(isNumber))
// $ExpectType Separated<Option<number>, Option<number>>
pipe(
  on,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)
