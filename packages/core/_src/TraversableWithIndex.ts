/**
 * @since 3.0.0
 */
import type { Applicative } from '@fp-ts/core/Applicative'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @since 3.0.0
 */
export interface TraversableWithIndex<F extends TypeLambda, I> extends TypeClass<F> {
  readonly traverseWithIndex: <G extends TypeLambda>(
    F: Applicative<G>
  ) => <A, S, R, O, E, B>(
    f: (i: I, a: A) => Kind<G, S, R, O, E, B>
  ) => <FS, FR, FO, FE>(self: Kind<F, FS, FR, FO, FE, A>) => Kind<G, S, R, O, E, Kind<F, FS, FR, FO, FE, B>>
}
