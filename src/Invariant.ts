/**
 * @since 3.0.0
 */
import type { HKT, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Invariant<F extends HKT> extends Typeclass<F> {
  readonly imap: <S, T>(
    f: (s: S) => T,
    g: (t: T) => S
  ) => <R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, T, R, W, E, A>
}
