import * as _ from '../../src/TaskOption'
import * as T from '../../src/Task'
import { pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType TaskOption<string>
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

// $ExpectType TaskOption<string | number>
pipe(sn, _.fromPredicate(predicate))
// $ExpectType TaskOption<number>
pipe(n, _.fromPredicate(predicate))
// $ExpectType TaskOption<number>
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

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElse(() => null)
)

//
// getOrElseE
//

// $ExpectType Task<string | null>
pipe(
  _.some('a'),
  _.getOrElseE(() => T.of(null))
)

//
// match
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.match(
    () => 1,
    () => true
  )
)

//
// matchE
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchE(
    () => T.of(1),
    () => T.of(true)
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const on: _.TaskOption<number>
declare const osn: _.TaskOption<string | number>
declare const isNumber: (sn: string | number) => sn is number

//
// filter
//

// $ExpectType TaskOption<string>
pipe(osn, _.filter(isString))
// $ExpectType TaskOption<number>
pipe(on, _.filter(predicate))
// $ExpectType TaskOption<number>
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

// $ExpectType Separated<TaskOption<unknown>, TaskOption<string>>
pipe(osn, _.partition(isString))
// $ExpectType Separated<TaskOption<number>, TaskOption<number>>
pipe(on, _.partition(predicate))
// $ExpectType Separated<TaskOption<string | number>, TaskOption<number>>
pipe(osn, _.partition(isNumber))
// $ExpectType Separated<TaskOption<number>, TaskOption<number>>
pipe(
  on,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)
