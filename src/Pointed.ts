/**
 * @since 3.0.0
 */
import type { HKT, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed<F extends HKT> extends Typeclass<F> {
  readonly of: <S, R, E, A>(a: A) => Kind<F, S, R, E, A>
}
