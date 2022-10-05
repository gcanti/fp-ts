import * as _ from '../../src/TaskOption'
import * as T from '../../src/Task'
import { pipe } from '../../src/Function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType TaskOption<string>
pipe(sn, _.liftPredicate(isString))
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// $ExpectType TaskOption<string | number>
pipe(sn, _.liftPredicate(predicate))
// $ExpectType TaskOption<number>
pipe(n, _.liftPredicate(predicate))
// $ExpectType TaskOption<number>
pipe(
  n,
  _.liftPredicate(
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
pipe(_.some('a'), _.getOrElse(null))

//
// getOrElseTask
//

// $ExpectType Task<string | null>
pipe(_.some('a'), _.getOrElseTask(T.succeed(null)))

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
// matchTask
//

// $ExpectType Task<number | boolean>
pipe(
  _.some('a'),
  _.matchTask(
    () => T.succeed(1),
    () => T.succeed(true)
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const on: _.TaskOption<number>
declare const osn: _.TaskOption<string | number>
declare const isNumber: (sn: string | number) => sn is number

//
// refine
//

// $ExpectType TaskOption<string>
pipe(osn, _.filter(isString))

//
// filter
//

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
// refinement
//

// $ExpectType readonly [TaskOption<string | number>, TaskOption<string>]
pipe(osn, _.partition(isString))

// $ExpectType readonly [TaskOption<string | number>, TaskOption<number>]
pipe(osn, _.partition(isNumber))

//
// partition
//

// $ExpectType readonly [TaskOption<number>, TaskOption<number>]
pipe(on, _.partition(predicate))
// $ExpectType readonly [TaskOption<number>, TaskOption<number>]
pipe(
  on,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)
