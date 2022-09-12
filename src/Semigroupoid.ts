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
  readonly compose: <S, B, E, C>(bc: Kind<F, S, B, E, C>) => <A>(ab: Kind<F, S, A, E, B>) => Kind<F, S, A, E, C>
}
