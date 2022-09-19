import * as _ from '../../src/TaskThese'
import { identity, pipe } from '../../src/function'

declare const n: number
declare const sn: string | number
declare const isString: (u: unknown) => u is string
declare const predicate: (sn: string | number) => boolean

// -------------------------------------------------------------------------------------
// fromRefinementOrElse
// -------------------------------------------------------------------------------------

// $ExpectType TaskThese<string | number, string>
pipe(sn, _.fromRefinementOrElse(isString, identity))

// $ExpectType TaskThese<Error, string>
pipe(
  sn,
  _.fromRefinementOrElse(
    isString,
    (
      _n // $ExpectType string | number
    ) => new Error()
  )
)

pipe(
  sn,
  _.fromRefinementOrElse(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number',
    identity
  )
)

// -------------------------------------------------------------------------------------
// fromPredicateOrElse
// -------------------------------------------------------------------------------------

// $ExpectType TaskThese<string | number, string | number>
pipe(sn, _.fromPredicateOrElse(predicate, identity))

// $ExpectType TaskThese<Error, string | number>
pipe(
  sn,
  _.fromPredicateOrElse(predicate, () => new Error())
)

// $ExpectType TaskThese<number, number>
pipe(n, _.fromPredicateOrElse(predicate, identity))

pipe(
  n,
  _.fromPredicateOrElse(
    (
      _n // $ExpectType number
    ) => true,
    identity
  )
)
