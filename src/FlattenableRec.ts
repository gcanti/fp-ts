/**
 * @since 3.0.0
 */
import type { Result } from './Result'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import * as _ from './internal'

/**
 * @category model
 * @since 3.0.0
 */
export interface FlattenableRec<F extends TypeLambda> extends TypeClass<F> {
  readonly flatMapRec: <A, S, R, O, E, B>(
    f: (a: A) => Kind<F, S, R, O, E, Result<A, B>>
  ) => (a: A) => Kind<F, S, R, O, E, B>
}

/**
 * @since 3.0.0
 */
export const tailRec =
  <A, B>(f: (a: A) => Result<A, B>) =>
  (startWith: A): B => {
    let v = f(startWith)
    while (_.isFailure(v)) {
      v = f(v.failure)
    }
    return v.success
  }
