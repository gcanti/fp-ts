/**
 * Kleisli category.
 *
 * @since 3.0.0
 */
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import type { KleisliComposable } from '@fp-ts/core/KleisliComposable'

/**
 * @category model
 * @since 3.0.0
 */
export interface KleisliCategory<F extends TypeLambda> extends KleisliComposable<F> {
  readonly idKleisli: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
