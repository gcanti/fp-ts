import * as _ from '../../src/TaskThese'
import { pipe } from '../../src/function'

declare const sn: string | number
declare const isString: (u: unknown) => u is string

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType TaskThese<string | number, string>
pipe(sn, _.fromRefinement(isString))
pipe(
  sn,
  _.fromRefinement(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)
