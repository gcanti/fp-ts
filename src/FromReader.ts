/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import { Chain, chainFirst } from './Chain'
import { flow } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import type { NaturalTransformation } from './NaturalTransformation'
import * as R from './Reader'

import Reader = R.Reader

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader<F extends HKT> extends Typeclass<F> {
  readonly fromReader: NaturalTransformation<R.ReaderF, F>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function ask<F extends HKT>(F: FromReader<F>): <S, R, E>() => Kind<F, S, R, E, R> {
  return () => F.fromReader(R.ask())
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asks<F extends HKT>(F: FromReader<F>): <R, A, S, E>(f: (r: R) => A) => Kind<F, S, R, E, A> {
  return F.fromReader
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromReaderK<F extends HKT>(
  F: FromReader<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => <S, E>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromReader) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainReaderK<M extends HKT>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, B> {
  // TODO
  return flow(fromReaderK(F) as any, M.chain) as any
}

/**
 * @category combinators
 * @since 3.0.0
 */
export function chainFirstReaderK<M extends HKT>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind<M, S, R, E, A>) => Kind<M, S, R, E, A> {
  // TODO
  return flow(fromReaderK(F) as any, chainFirst(M)) as any
}
