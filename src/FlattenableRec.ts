/**
 * @since 3.0.0
 */
import type { Either } from './Either'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface FlattenableRec<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMapRec: <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Either<A, B>>
  ) => (a: A) => Kind<F, S, R, O, E, B>
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
