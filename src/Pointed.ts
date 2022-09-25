/**
 * @since 3.0.0
 */
import type { TypeLambda, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed<F extends TypeLambda> extends Typeclass<F> {
  readonly of: <A, S>(a: A) => Kind<F, S, unknown, never, never, A>
}
