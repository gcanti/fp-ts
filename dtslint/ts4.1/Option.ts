import { pipe } from '../../src/Function'
import * as _ from '../../src/Option'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType Option<string>
pipe(sn, _.liftPredicate(isString))
pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)

// $ExpectType Option<string | number>
pipe(sn, _.liftPredicate(predicate))
// $ExpectType Option<number>
pipe(n, _.liftPredicate(predicate))
// $ExpectType Option<number>
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

// $ExpectType string | null
pipe(_.some('a'), _.getOrElse(null))

//
// Do
//

// $ExpectType Option<{ readonly a1: number; readonly a2: string; }>
pipe(
  _.Do,
  _.bind('a1', () => _.some(1)),
  _.bind('a2', () => _.some('b'))
)

// -------------------------------------------------------------------------------------
// Predicate-based APIs
// -------------------------------------------------------------------------------------

declare const on: _.Option<number>
declare const osn: _.Option<string | number>
declare const isNumber: (sn: string | number) => sn is number

//
// refine
//

// $ExpectType Option<string>
pipe(osn, _.filter(isString))

// $ExpectType Option<number>
pipe(
  on,
  _.filter(
    (
      x // $ExpectType number
    ): x is number => true
  )
)

//
// filter
//

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
// refinement
//

// $ExpectType readonly [Option<string | number>, Option<string>]
pipe(osn, _.partition(isString))

// $ExpectType readonly [Option<string | number>, Option<number>]
pipe(osn, _.partition(isNumber))

// $ExpectType readonly [Option<number>, Option<number>]
pipe(
  on,
  _.partition(
    (
      x // $ExpectType number
    ): x is number => true
  )
)

//
// partition
//

// $ExpectType readonly [Option<number>, Option<number>]
pipe(on, _.partition(predicate))
// $ExpectType readonly [Option<number>, Option<number>]
pipe(
  on,
  _.partition(
    (
      _x // $ExpectType number
    ) => true
  )
)
