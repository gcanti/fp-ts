/**
 * A type for natural transformations.
 *
 * A natural transformation is a mapping between type constructors of kind `* -> *` where the mapping
 * operation has no ability to manipulate the inner values.
 *
 * The definition of a natural transformation in category theory states that `F` and `G` should be functors,
 * but the `Functor` constraint is not enforced here; that the types are of kind `* -> *` is enough for our purposes.
 *
 * @since 3.0.0
 */
import type { HKT, Kind } from './HKT'

/**
 * @since 3.0.0
 */
export interface NaturalTransformation<F extends HKT, G extends HKT> {
  <S, R, E, A>(fa: Kind<F, S, R, E, A>): Kind<G, S, R, E, A>
}
