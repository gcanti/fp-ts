import * as _ from '../../src/TaskThese'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType TaskThese<string | number, string>
pipe(sn, _.liftPredicate(isString, identity))

// $ExpectType TaskThese<Error, string>
pipe(
  sn,
  _.liftPredicate(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.liftPredicate(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicate
// -------------------------------------------------------------------------------------

// $ExpectType TaskThese<string | number, string | number>
pipe(sn, _.liftPredicate(predicate, identity))

// $ExpectType TaskThese<Error, string | number>
pipe(
  sn,
  _.liftPredicate(predicate, () => new Error())
)

// $ExpectType TaskThese<number, number>
pipe(n, _.liftPredicate(predicate, identity))

pipe(
  n,
  _.liftPredicate(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)
