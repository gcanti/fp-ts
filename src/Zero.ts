/**
 * @since 3.0.0
 */
import type { HKT, Kind, Typeclass } from './HKT'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Zero<F extends HKT> extends Typeclass<F> {
  readonly zero: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  <F extends HKT>(F: Zero<F>, P: Pointed<F>) =>
  <S, R = unknown, W = never, E = never>(b: boolean): Kind<F, S, R, W, E, void> =>
    b ? P.of(undefined) : F.zero()
