/**
 * @since 3.0.0
 */
import type { HKT, Kind } from './HKT'
import type { Semigroupoid } from './Semigroupoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Category<F extends HKT> extends Semigroupoid<F> {
  readonly id: <S, R, A>() => Kind<F, S, R, A, A>
}
