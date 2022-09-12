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
export interface Semigroupoid<F extends HKT> extends Typeclass<F> {
  readonly compose: <S, B, W, E, C>(
    bc: Kind<F, S, B, W, E, C>
  ) => <A>(ab: Kind<F, S, A, W, E, B>) => Kind<F, S, A, W, E, C>
}
