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
import { HKT, Kind, Kind2, URIS, URIS2 } from './HKT'

/**
 * @since 3.0.0
 */
export interface NaturalTransformation<F, G> {
  <A>(fa: HKT<F, A>): HKT<G, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation11<F extends URIS, G extends URIS> {
  <A>(fa: Kind<F, A>): Kind<G, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation12<F extends URIS, G extends URIS2> {
  <A, E>(fa: Kind<F, A>): Kind2<G, E, A>
}

/**
 * @since 3.0.0
 */
export interface NaturalTransformation22<F extends URIS2, G extends URIS2> {
  <A, E>(fa: Kind2<F, E, A>): Kind2<G, E, A>
}
