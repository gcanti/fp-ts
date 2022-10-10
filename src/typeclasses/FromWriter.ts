/**
 * The `FromWriter` type class represents those data types which support accumulators.
 *
 * @since 3.0.0
 */
import type { TypeLambda, Kind, TypeClass } from '../HKT'
import type { Writer } from '../Writer'

/**
 * @category model
 * @since 3.0.0
 */
export interface FromWriter<F extends TypeLambda> extends TypeClass<F> {
  readonly fromWriter: <E, A, S>(fa: Writer<E, A>) => Kind<F, S, unknown, never, E, A>
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftWriter =
  <F extends TypeLambda>(F: FromWriter<F>) =>
  <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => Writer<E, B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, E, B> =>
    F.fromWriter(f(...a))
