/**
 * @since 3.0.0
 */
import type { Either } from './Either'
import type { HKT, Kind, Typeclass } from './HKT'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FlatRec<F extends HKT> extends Typeclass<F> {
  readonly flatMapRec: <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, Either<A, B>>
  ) => (a: A) => Kind<F, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const tailRec =
  <A, B>(f: (a: A) => Either<A, B>) =>
  (startWith: A): B => {
    let v = f(startWith)
    while (_.isLeft(v)) {
      v = f(v.left)
    }
    return v.right
  }
