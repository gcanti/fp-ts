/**
 * @since 3.0.0
 */
import type { Functor } from './Functor'
import type { TypeLambda, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor<P extends TypeLambda> extends Functor<P> {
  readonly promap: <Q, R, A, B>(
    f: (q: Q) => R,
    g: (a: A) => B
  ) => <S, W, E>(pea: Kind<P, S, R, W, E, A>) => Kind<P, S, Q, W, E, B>
}
