/**
 * @since 3.0.0
 */
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Composable<F extends TypeLambda> extends TypeClass<F> {
  readonly compose: <S, B, O2, E2, C>(
    bc: Kind<F, S, B, O2, E2, C>
  ) => <A, O1, E1>(ab: Kind<F, S, A, O1, E1, B>) => Kind<F, S, A, O1 | O2, E1 | E2, C>
}
