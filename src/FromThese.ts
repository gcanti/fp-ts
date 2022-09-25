/**
 * The `FromThese` type class represents those data types which support errors and warnings.
 *
 * @since 3.0.0
 */
import type { TypeLambda, Kind, Typeclass } from './HKT'
import type { These } from './These'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface FromThese<F extends TypeLambda> extends Typeclass<F> {
  readonly fromThese: <E, A, S>(fa: These<E, A>) => Kind<F, S, unknown, never, E, A>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromTheseK =
  <F extends TypeLambda>(F: FromThese<F>) =>
  <A extends ReadonlyArray<unknown>, E, B>(f: (...a: A) => These<E, B>) =>
  <S>(...a: A): Kind<F, S, unknown, never, E, B> =>
    F.fromThese(f(...a))
