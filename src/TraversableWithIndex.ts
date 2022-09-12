/**
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import type { HKT, Typeclass, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export interface TraversableWithIndex<T extends HKT, I> extends Typeclass<T> {
  readonly traverseWithIndex: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (i: I, a: A) => Kind<F, S, R, W, E, B>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}
