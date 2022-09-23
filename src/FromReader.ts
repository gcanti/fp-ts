/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import type { Flattenable } from './Flattenable'
import { pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import * as _ from './internal'
import type { Reader } from './Reader'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader<F extends HKT> extends Typeclass<F> {
  readonly fromReader: <R, A, S>(fa: Reader<R, A>) => Kind<F, S, R, never, never, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function ask<F extends HKT>(F: FromReader<F>): <S, R>() => Kind<F, S, R, never, never, R> {
  return () => F.fromReader(_.ask())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asks<F extends HKT>(F: FromReader<F>): <R, A, S>(f: (r: R) => A) => Kind<F, S, R, never, never, A> {
  return F.fromReader
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromReaderK =
  <F extends HKT>(F: FromReader<F>) =>
  <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) =>
  <S>(...a: A): Kind<F, S, R, never, never, B> =>
    F.fromReader(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK =
  <M extends HKT>(F: FromReader<M>, M: Flattenable<M>) =>
  <A, R2, B>(f: (a: A) => Reader<R2, B>) =>
  <S, R1, W, E>(ma: Kind<M, S, R1, W, E, A>): Kind<M, S, R1 & R2, W, E, B> => {
    return pipe(
      ma,
      M.flatMap((a) => F.fromReader(f(a)))
    )
  }
