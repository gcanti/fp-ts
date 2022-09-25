/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { TypeLambda, TypeClass, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface TraversableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly traverseWithIndex: <G extends TypeLambda>(
    F: Applicative<G>
  ) => <A, S, R, W, E, B>(
    f: (i: I, a: A) => Kind<G, S, R, W, E, B>
  ) => <FS, FR, FW, FE>(self: Kind<F, FS, FR, FW, FE, A>) => Kind<G, S, R, W, E, Kind<F, FS, FR, FW, FE, B>>
}
