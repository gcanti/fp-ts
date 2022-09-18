import * as _ from '../../src/IOOption'
import { pipe } from '../../src/function'

declare const sn: string | number
declare const isString: (u: unknown) => u is string

// -------------------------------------------------------------------------------------
// fromRefinement
// -------------------------------------------------------------------------------------

// $ExpectType IOOption<string>
pipe(sn, _.fromRefinement(isString))
pipe(
  sn,
  _.fromRefinement(
    (
      n // $ExpectType string | number
    ): n is number => typeof n === 'number'
  )
)
