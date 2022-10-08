/**
 * @since 3.0.0
 */
import type { Functor } from '@fp-ts/core/Functor'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Extendable<F extends TypeLambda> extends Functor<F> {
  readonly extend: <S, R, O, E, A, B>(
    f: (wa: Kind<F, S, R, O, E, A>) => B
  ) => (wa: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}
