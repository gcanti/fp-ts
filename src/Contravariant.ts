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
  readonly contramap: <B, A>(f: (b: B) => A) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
}
