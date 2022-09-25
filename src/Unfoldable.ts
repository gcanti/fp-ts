/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.
 *
 * @since 3.0.0
 */
import type { TypeLambda, Kind, Typeclass } from './HKT'
import type { Option } from './Option'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Unfoldable<F extends TypeLambda> extends Typeclass<F> {
  readonly unfold: <B, A, S>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, S, unknown, never, never, A>
}
