/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 2.11.0
 */
import { Chain, Chain2, Chain3, Chain3C, Chain4, chainFirst } from './Chain'
import { flow } from './function'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import * as R from './Reader'

import Reader = R.Reader

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromReader<F> {
  readonly URI: F
  readonly fromReader: <R, A>(fa: Reader<R, A>) => HKT2<F, R, A>
}

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromReader2<F extends URIS2> {
  readonly URI: F
  readonly fromReader: <E, A>(fa: Reader<E, A>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromReader3<F extends URIS3> {
  readonly URI: F
  readonly fromReader: <R, A, E>(fa: Reader<R, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromReader3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly fromReader: <R, A>(fa: Reader<R, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.11.0
 */
export interface FromReader4<F extends URIS4> {
  readonly URI: F
  readonly fromReader: <R, A, S, E>(fa: Reader<R, A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.11.0
 */
export function ask<F extends URIS4>(F: FromReader4<F>): <S, R, E>() => Kind4<F, S, R, E, R>
export function ask<F extends URIS3>(F: FromReader3<F>): <R, E>() => Kind3<F, R, E, R>
export function ask<F extends URIS3, E>(F: FromReader3C<F, E>): <R>() => Kind3<F, R, E, R>
export function ask<F extends URIS2>(F: FromReader2<F>): <R>() => Kind2<F, R, R>
export function ask<F>(F: FromReader<F>): <R>() => HKT2<F, R, R>
export function ask<F>(F: FromReader<F>): <R>() => HKT2<F, R, R> {
  return () => F.fromReader(R.ask())
}

/**
 * @category constructors
 * @since 2.11.0
 */
export function asks<F extends URIS4>(F: FromReader4<F>): <R, A, S, E>(f: (r: R) => A) => Kind4<F, S, R, E, A>
export function asks<F extends URIS3>(F: FromReader3<F>): <R, A, E>(f: (r: R) => A) => Kind3<F, R, E, A>
export function asks<F extends URIS3, E>(F: FromReader3C<F, E>): <R, A>(f: (r: R) => A) => Kind3<F, R, E, A>
export function asks<F extends URIS2>(F: FromReader2<F>): <R, A>(f: (r: R) => A) => Kind2<F, R, A>
export function asks<F>(F: FromReader<F>): <R, A>(f: (r: R) => A) => HKT2<F, R, A>
export function asks<F>(F: FromReader<F>): <R, A>(f: (r: R) => A) => HKT2<F, R, A> {
  return F.fromReader
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 2.11.0
 */
export function fromReaderK<F extends URIS4>(
  F: FromReader4<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => <S, E>(...a: A) => Kind4<F, S, R, E, B>
export function fromReaderK<F extends URIS3>(
  F: FromReader3<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => <E>(...a: A) => Kind3<F, R, E, B>
export function fromReaderK<F extends URIS3, E>(
  F: FromReader3C<F, E>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => (...a: A) => Kind3<F, R, E, B>
export function fromReaderK<F extends URIS2>(
  F: FromReader2<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => (...a: A) => Kind2<F, R, B>
export function fromReaderK<F>(
  F: FromReader<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => (...a: A) => HKT2<F, R, B>
export function fromReaderK<F>(
  F: FromReader<F>
): <A extends ReadonlyArray<unknown>, R, B>(f: (...a: A) => Reader<R, B>) => (...a: A) => HKT2<F, R, B> {
  return (f) => flow(f, F.fromReader)
}

/**
 * @category combinators
 * @since 2.11.0
 */
export function chainReaderK<M extends URIS4>(
  F: FromReader4<M>,
  M: Chain4<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, B>
export function chainReaderK<M extends URIS3>(
  F: FromReader3<M>,
  M: Chain3<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <E>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainReaderK<M extends URIS3, E>(
  F: FromReader3C<M, E>,
  M: Chain3C<M, E>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, B>
export function chainReaderK<M extends URIS2>(
  F: FromReader2<M>,
  M: Chain2<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind2<M, R, A>) => Kind2<M, R, B>
export function chainReaderK<M>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: HKT2<M, R, A>) => HKT2<M, R, B>
export function chainReaderK<M extends URIS2>(
  F: FromReader2<M>,
  M: Chain2<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind2<M, R, A>) => Kind2<M, R, B> {
  const fromReaderKF = fromReaderK(F)
  return (f) => (ma) => M.chain(ma, fromReaderKF(f))
}

/**
 * @category combinators
 * @since 2.11.0
 */
export function chainFirstReaderK<M extends URIS4>(
  F: FromReader4<M>,
  M: Chain4<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <S, E>(ma: Kind4<M, S, R, E, A>) => Kind4<M, S, R, E, A>
export function chainFirstReaderK<M extends URIS3>(
  F: FromReader3<M>,
  M: Chain3<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => <E>(ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstReaderK<M extends URIS3, E>(
  F: FromReader3C<M, E>,
  M: Chain3C<M, E>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind3<M, R, E, A>) => Kind3<M, R, E, A>
export function chainFirstReaderK<M extends URIS2>(
  F: FromReader2<M>,
  M: Chain2<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind2<M, R, A>) => Kind2<M, R, A>
export function chainFirstReaderK<M>(
  F: FromReader<M>,
  M: Chain<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: HKT2<M, R, A>) => HKT2<M, R, A>
export function chainFirstReaderK<M extends URIS2>(
  F: FromReader2<M>,
  M: Chain2<M>
): <A, R, B>(f: (a: A) => Reader<R, B>) => (ma: Kind2<M, R, A>) => Kind2<M, R, A> {
  return flow(fromReaderK(F), chainFirst(M))
}
