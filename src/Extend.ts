/**
 * @since 3.0.0
 */
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Extend<W extends HKT> extends Functor<W> {
  readonly extend: <S, R, E, A, B>(
    f: (wa: Kind<W, S, R, E, A>) => B
  ) => (wa: Kind<W, S, R, E, A>) => Kind<W, S, R, E, B>
}
