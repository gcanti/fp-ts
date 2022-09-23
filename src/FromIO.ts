/**
 * Lift a computation from the `IO` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import type { IO } from './IO'
import * as console from './Console'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO<F extends HKT> extends Typeclass<F> {
  readonly fromIO: <A, S>(fa: IO<A>) => Kind<F, S, unknown, never, never, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromIOK =
  <F extends HKT>(F: FromIO<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, never, B> =>
    F.fromIO(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK =
  <M extends HKT>(F: FromIO<M>, M: Flattenable<M>) =>
  <A, B>(f: (a: A) => IO<B>) =>
  <S, R, W, E>(ma: Kind<M, S, R, W, E, A>): Kind<M, S, R, W, E, B> => {
    return pipe(
      ma,
      M.flatMap<A, S, R, W, E, B>((a) => F.fromIO(f(a)))
    )
  }

// -------------------------------------------------------------------------------------
// logging
// -------------------------------------------------------------------------------------

/**
 * @category logging
 * @since 3.0.0
 */
export const log =
  <M extends HKT>(F: FromIO<M>) =>
  <S>(...x: ReadonlyArray<unknown>): Kind<M, S, unknown, never, never, void> =>
    F.fromIO(console.log(...x))

/**
 * @category logging
 * @since 3.0.0
 */
export const logError =
  <M extends HKT>(F: FromIO<M>) =>
  <S>(...x: ReadonlyArray<unknown>): Kind<M, S, unknown, never, never, void> =>
    F.fromIO(console.error(...x))
