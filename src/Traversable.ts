/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import type { Applicative } from './Applicative'
import { pipe } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable<T extends HKT> extends Functor<T> {
  readonly traverse: <F extends HKT>(
    F: Applicative<F>
  ) => <A, S, R, W, E, B>(
    f: (a: A) => Kind<F, S, R, W, E, B>
  ) => <TS, TR, TW, TE>(ta: Kind<T, TS, TR, TW, TE, A>) => Kind<F, S, R, W, E, Kind<T, TS, TR, TW, TE, B>>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `traverse` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const traverse = <T extends HKT, G extends HKT>(
  T: Traversable<T>,
  G: Traversable<G>
): (<F extends HKT>(
  F: Applicative<F>
) => <A, FS, FR, FW, FE, B>(
  f: (a: A) => Kind<F, FS, FR, FW, FE, B>
) => <TS, TR, TW, TE, GS, GR, GW, GE>(
  tga: Kind<T, TS, TR, TW, TE, Kind<G, GS, GR, GW, GE, A>>
) => Kind<F, FS, FR, FW, FE, Kind<T, TS, TR, TW, TE, Kind<G, GS, GR, GW, GE, B>>>) => {
  return (F) => (f) => (tga) =>
    pipe(
      tga,
      T.traverse(F)((ga) => pipe(ga, G.traverse(F)(f)))
    )
}
