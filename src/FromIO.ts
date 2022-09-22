/**
 * Lift a computation from the `IO` monad.
 *
 * @since 3.0.0
 */
import * as flat from './Flat'
import type { Flat } from './Flat'
import { pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import type { IO } from './IO'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromIO<F extends HKT> extends Typeclass<F> {
  readonly fromIO: <A, S, R = unknown, W = never, E = never>(fa: IO<A>) => Kind<F, S, R, W, E, A>
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
  <S, R = unknown, W = never, E = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromIO(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapIOK =
  <M extends HKT>(F: FromIO<M>, M: Flat<M>) =>
  <A, B>(f: (a: A) => IO<B>) =>
  <S, R, W, E>(ma: Kind<M, S, R, W, E, A>): Kind<M, S, R, W, E, B> => {
    return pipe(
      ma,
      M.flatMap<A, S, R, W, E, B>((a) => F.fromIO(f(a)))
    )
  }

/**
 * Returns an effect that effectfully (`IO`) "peeks" at the success of this effect.
 *
 * @category tap
 * @since 3.0.0
 */
export const tapIO = <M extends HKT>(
  F: FromIO<M>,
  M: Flat<M>
): (<A, _>(f: (a: A) => IO<_>) => <S, R, W, E>(self: Kind<M, S, R, W, E, A>) => Kind<M, S, R, W, E, A>) => {
  const tapM = flat.tap(M)
  return (f) => tapM((a) => F.fromIO(f(a)))
}
