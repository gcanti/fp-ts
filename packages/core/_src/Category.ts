/**
 * @since 3.0.0
 */
import type { Composable } from '@fp-ts/core/Composable'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
