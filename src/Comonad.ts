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
export interface Comonad<W extends HKT> extends Extend<W> {
  readonly extract: <S, R, E, A>(wa: Kind<W, S, R, E, A>) => A
}
