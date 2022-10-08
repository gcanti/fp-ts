import * as _ from '../../src/AsyncOption'
import * as T from '../../src/Async'
import { pipe } from '../../src/Function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType AsyncOption<string>
pipe(sn, _.liftPredicate(isString))
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// $ExpectType AsyncOption<string | number>
pipe(sn, _.liftPredicate(predicate))
// $ExpectType AsyncOption<number>
pipe(n, _.liftPredicate(predicate))
// $ExpectType AsyncOption<number>
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

// $ExpectType Async<string | null>
pipe(_.some('a'), _.getOrElse(null))

//
// getOrElseAsync
//

// $ExpectType Async<string | null>
pipe(_.some('a'), _.getOrElseAsync(T.of(null)))

//
// match
//

// $ExpectType Async<number | boolean>
pipe(
  _.some('a'),
  _.match(
    () => 1,
    () => true
  )
)

//
// matchAsync
//

// $ExpectType Async<number | boolean>
pipe(
  _.some('a'),
  _.matchAsync(
    () => T.of(1),
    () => T.of(true)
  )
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const on: _.AsyncOption<number>
declare const osn: _.AsyncOption<string | number>
declare const isNumber: (sn: string | number) => sn is number

//
// refine
//

// $ExpectType AsyncOption<string>
pipe(osn, _.filter(isString))

//
// filter
//

// $ExpectType AsyncOption<number>
pipe(on, _.filter(predicate))
// $ExpectType AsyncOption<number>
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

// $ExpectType readonly [AsyncOption<string | number>, AsyncOption<string>]
pipe(osn, _.partition(isString))

// $ExpectType readonly [AsyncOption<string | number>, AsyncOption<number>]
pipe(osn, _.partition(isNumber))

//
// partition
//

// $ExpectType readonly [AsyncOption<number>, AsyncOption<number>]
pipe(on, _.partition(predicate))
// $ExpectType readonly [AsyncOption<number>, AsyncOption<number>]
pipe(
  on,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)
