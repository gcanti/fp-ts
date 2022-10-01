/**
 * Lift a computation from the `IO` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './Function'
import type { TypeLambda, Kind, TypeClass } from './HKT'
import type { IO } from './IO'
import * as console from './Console'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface FromIO<F extends TypeLambda> extends TypeClass<F> {
  readonly fromIO: <A, S>(fa: IO<A>) => Kind<F, S, unknown, never, never, A>
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftIO =
  <F extends TypeLambda>(F: FromIO<F>) =>
  <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => IO<B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, never, B> =>
    F.fromIO(f(...a))

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapIO =
  <M extends TypeLambda>(F: FromIO<M>, M: Flattenable<M>) =>
  <A, B>(f: (a: A) => IO<B>) =>
  <S, R, O, E>(self: Kind<M, S, R, O, E, A>): Kind<M, S, R, O, E, B> => {
    return pipe(
      self,
      M.flatMap<A, S, R, O, E, B>((a) => F.fromIO(f(a)))
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
  <M extends TypeLambda>(F: FromIO<M>) =>
  <S>(...x: ReadonlyArray<unknown>): Kind<M, S, unknown, never, never, void> =>
    F.fromIO(console.log(...x))

/**
 * @category logging
 * @since 3.0.0
 */
export const logError =
  <M extends TypeLambda>(F: FromIO<M>) =>
  <S>(...x: ReadonlyArray<unknown>): Kind<M, S, unknown, never, never, void> =>
    F.fromIO(console.error(...x))
