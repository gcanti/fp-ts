/**
 * @since 3.0.0
 */
import type { Extendable } from './Extendable'
import type { TypeLambda, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Comonad<F extends TypeLambda> extends Extendable<F> {
  readonly extract: <S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => A
}
