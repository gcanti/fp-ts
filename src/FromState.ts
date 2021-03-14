/**
 * Lift a computation from the `State` monad.
 *
 * @since 3.0.0
 */
import { HKT2 } from './HKT'
import { State } from './State'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromState<F> {
  readonly fromState: <S, A>(fa: State<S, A>) => HKT2<F, S, A>
}
