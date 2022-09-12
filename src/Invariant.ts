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
  readonly imap: <A, B>(
    f: (a: A) => B,
    g: (b: B) => A
  ) => <R, W, E, _>(fa: Kind<F, A, R, W, E, _>) => Kind<F, B, R, W, E, _>
}
