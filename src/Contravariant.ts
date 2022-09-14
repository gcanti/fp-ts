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
export interface Contravariant<F extends HKT> extends Typeclass<F> {
  readonly contramap: <Q, R>(f: (q: Q) => R) => <S, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, Q, W, E, A>
}
