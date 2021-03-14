/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import { HKT2 } from './HKT'
import { Reader } from './Reader'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader<F> {
  readonly fromReader: <R, A>(fa: Reader<R, A>) => HKT2<F, R, A>
}
