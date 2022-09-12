/**
 * @since 3.0.0
 */
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor<P extends HKT> extends Functor<P> {
  readonly promap: <Q, R, A, B>(
    f: (q: Q) => R,
    g: (a: A) => B
  ) => <S, E>(pea: Kind<P, S, R, E, A>) => Kind<P, S, Q, E, B>
}
