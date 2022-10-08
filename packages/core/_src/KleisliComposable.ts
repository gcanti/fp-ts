/**
 * Kleisli arrows composition.
 *
 * @since 3.0.0
 */
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface KleisliComposable<F extends TypeLambda> extends TypeClass<F> {
  readonly composeKleisli: <B, S, R2, O2, E2, C>(
    bfc: (b: B) => Kind<F, S, R2, O2, E2, C>
  ) => <A, R1, O1, E1>(afb: (a: A) => Kind<F, S, R1, O1, E1, B>) => (a: A) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, C>
}
