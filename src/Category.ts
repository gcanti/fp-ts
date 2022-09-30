/**
 * @since 3.0.0
 */
import type { TypeLambda, Kind } from './HKT'
import type { Composable } from './Composable'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Category<F extends TypeLambda> extends Composable<F> {
  readonly id: <S, R>() => Kind<F, S, R, never, never, R>
}
