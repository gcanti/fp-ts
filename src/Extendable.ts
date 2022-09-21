/**
 * @since 3.0.0
 */
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extendable<F extends HKT> extends Functor<F> {
  readonly extend: <S, R, W, E, A, B>(
    f: (wa: Kind<F, S, R, W, E, A>) => B
  ) => (wa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}
