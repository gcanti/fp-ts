/**
 * The `FromWriter` type class represents those data types which support accumulators.
 *
 * @since 3.0.0
 */
import { flow } from './function'
import type { HKT2, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'
import {
  NaturalTransformation21,
  NaturalTransformation22,
  NaturalTransformation22C,
  NaturalTransformation23,
  NaturalTransformation23C,
  NaturalTransformation24
} from './NaturalTransformation'
import type { URI, Writer } from './Writer'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter<F> {
  readonly URI?: F
  readonly fromWriter: <E, A>(e: Writer<E, A>) => HKT2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter1<F extends URIS> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation21<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter2<F extends URIS2> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation22<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromWriter: NaturalTransformation22C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter3<F extends URIS3> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation23<URI, F>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly fromWriter: NaturalTransformation23C<URI, F, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter4<F extends URIS4> {
  readonly URI?: F
  readonly fromWriter: NaturalTransformation24<URI, F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromWriterK<F extends URIS4>(
  F: FromWriter4<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => <S, R>(...a: A) => Kind4<F, S, R, E, B>
export function fromWriterK<F extends URIS3>(
  F: FromWriter3<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromWriterK<F extends URIS3, E>(
  F: FromWriter3C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Writer<E, B>) => <R>(...a: A) => Kind3<F, R, E, B>
export function fromWriterK<F extends URIS2>(
  F: FromWriter2<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromWriterK<F extends URIS2, E>(
  F: FromWriter2C<F, E>
): <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind2<F, E, B>
export function fromWriterK<F extends URIS>(
  F: FromWriter1<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => Kind<F, B>
export function fromWriterK<F>(
  F: FromWriter<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => HKT2<F, E, B>
export function fromWriterK<F>(
  F: FromWriter<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => (...a: A) => HKT2<F, E, B> {
  return (f) => flow(f, F.fromWriter)
}
