/**
 * Kleisli category.
 *
 * @since 3.0.0
 */
import type { ComposableKind } from './ComposableKind'
import type { Kind, TypeLambda } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface CategoryKind<F extends TypeLambda> extends ComposableKind<F> {
  readonly idKind: <A>() => <S>(a: A) => Kind<F, S, unknown, never, never, A>
}
