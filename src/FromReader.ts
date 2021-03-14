/**
 * Lift a computation from the `Reader` monad.
 *
 * @since 3.0.0
 */
import { identity } from './function'
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'
import { Reader } from './Reader'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader<F> {
  readonly URI?: F
  readonly fromReader: <R, A>(fa: Reader<R, A>) => HKT2<F, R, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader2<F extends URIS2> {
  readonly URI?: F
  readonly fromReader: <R, A>(fa: Reader<R, A>) => Kind2<F, R, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader3<F extends URIS3> {
  readonly URI?: F
  readonly fromReader: <R, A, E>(fa: Reader<R, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromReader: <R, A>(fa: Reader<R, A>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromReader4<F extends URIS4> {
  readonly URI?: F
  readonly fromReader: <R, A, S, E>(fa: Reader<R, A>) => Kind4<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export function ask<F extends URIS4>(F: FromReader4<F>): <S, R, E>() => Kind4<F, S, R, E, R>
export function ask<F extends URIS3>(F: FromReader3<F>): <R, E>() => Kind3<F, R, E, R>
export function ask<F extends URIS3, E>(F: FromReader3C<F, E>): <R>() => Kind3<F, R, E, R>
export function ask<F extends URIS2>(F: FromReader2<F>): <R>() => Kind2<F, R, R>
export function ask<F>(F: FromReader<F>): <R>() => HKT2<F, R, R>
export function ask<F>(F: FromReader<F>): <R>() => HKT2<F, R, R> {
  return <R>() => F.fromReader<R, R>(identity)
}

/**
 * @category constructors
 * @since 3.0.0
 */
export function asks<F extends URIS4>(F: FromReader4<F>): <R, A, S, E>(f: (r: R) => A) => Kind4<F, S, R, E, A>
export function asks<F extends URIS3>(F: FromReader3<F>): <R, A, E>(f: (r: R) => A) => Kind3<F, R, E, A>
export function asks<F extends URIS3, E>(F: FromReader3C<F, E>): <R, A>(f: (r: R) => A) => Kind3<F, R, E, A>
export function asks<F extends URIS2>(F: FromReader2<F>): <R, A>(f: (r: R) => A) => Kind2<F, R, A>
export function asks<F>(F: FromReader<F>): <R, A>(f: (r: R) => A) => HKT2<F, R, A>
export function asks<F>(F: FromReader<F>): <R, A>(f: (r: R) => A) => HKT2<F, R, A> {
  return F.fromReader
}
