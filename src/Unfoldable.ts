/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfold` on arrays.
 *
 * @since 3.0.0
 */
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { Option } from './Option'

/**
 * @category model
 * @since 3.0.0
 */
export interface Unfoldable<F extends TypeLambda> extends TypeClass<F> {
  readonly unfold: <B, A, S>(b: B, f: (b: B) => Option<readonly [A, B]>) => Kind<F, S, unknown, never, never, A>
}
