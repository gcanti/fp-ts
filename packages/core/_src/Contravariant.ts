/**
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Contravariant<F extends TypeLambda> extends TypeClass<F> {
  readonly contramap: <Q, R>(f: (q: Q) => R) => <S, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, Q, O, E, A>
}
