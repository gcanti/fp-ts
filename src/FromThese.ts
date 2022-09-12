/**
 * The `FromThese` type class represents those data types which support errors and warnings.
 *
 * @since 3.0.0
 */
import { flow } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import type { These } from './These'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese<F extends HKT> extends Typeclass<F> {
  readonly fromThese: <E, A, S, R>(fa: These<E, A>) => Kind<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function fromTheseK<F extends HKT>(
  F: FromThese<F>
): <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) => <S, R>(...a: A) => Kind<F, S, R, E, B> {
  // TODO
  return (f) => flow(f, F.fromThese) as any
}
