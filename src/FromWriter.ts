/**
 * The `FromWriter` type class represents those data types which support accumulators.
 *
 * @since 3.0.0
 */
import { flow } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import { NaturalTransformation } from './NaturalTransformation'
import type { WriterF, Writer } from './Writer'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromWriter<F extends HKT> extends Typeclass<F> {
  readonly fromWriter: NaturalTransformation<WriterF, F>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromWriterK<F extends HKT>(
  F: FromWriter<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) => <S, R>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromWriter) as any
}
