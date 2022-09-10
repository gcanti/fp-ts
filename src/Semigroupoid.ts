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
  readonly compose: <S, R, B, C>(bc: Kind<F, S, R, B, C>) => <A>(ab: Kind<F, S, R, A, B>) => Kind<F, S, R, A, C>
}
