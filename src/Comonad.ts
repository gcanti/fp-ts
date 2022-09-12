/**
 * @since 3.0.0
 */
import type { Extend } from './Extend'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Comonad<F extends HKT> extends Extend<F> {
  readonly extract: <S, R, W, E, A>(wa: Kind<F, S, R, W, E, A>) => A
}
