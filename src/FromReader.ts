/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import * as flat from './Flat'
import type { Flat } from './Flat'
import { pipe } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import type { Reader } from './Reader'
import * as _ from './internal'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader<F extends HKT> extends Typeclass<F> {
  readonly fromReader: <R, A, S, W = never, E = never>(fa: Reader<R, A>) => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function ask<F extends HKT>(
  F: FromReader<F>
): <S, R = unknown, W = never, E = never>() => Kind<F, S, R, W, E, R> {
  return () => F.fromReader(_.ask())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asks<F extends HKT>(
  F: FromReader<F>
): <R, A, S, W = never, E = never>(f: (r: R) => A) => Kind<F, S, R, W, E, A> {
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
  <S, W = never, E = never>(...a: A): Kind<F, S, R, W, E, B> =>
    F.fromReader(f(...a))

/**
 * @category combinators
 * @since 3.0.0
 */
export const flatMapReaderK =
  <M extends HKT>(F: FromReader<M>, M: Flat<M>) =>
  <A, R2, B>(f: (a: A) => Reader<R2, B>) =>
  <S, R1, W, E>(ma: Kind<M, S, R1, W, E, A>): Kind<M, S, R1 & R2, W, E, B> => {
    return pipe(
      ma,
      M.flatMap((a) => F.fromReader(f(a)))
    )
  }

/**
 * @category combinators
 * @since 3.0.0
 */
export const tapReaderK = <M extends HKT>(
  F: FromReader<M>,
  M: Flat<M>
): (<A, R2, _>(
  f: (a: A) => Reader<R2, _>
) => <S, R1, W, E>(self: Kind<M, S, R1, W, E, A>) => Kind<M, S, R1 & R2, W, E, A>) => {
  const tapM = flat.tap(M)
  return (f) => tapM((a) => F.fromReader(f(a)))
}
