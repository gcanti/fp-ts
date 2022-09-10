/**
 * The `Alt` type class identifies an associative operation on a type constructor.  It is similar to `Semigroup`, except
 * that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
 * `number`.
 *
 * `Alt` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `fa1 |> alt(() => fa2) |> alt(() => fa3) <-> fa1 |> alt(() => fa2 |> alt(() => fa3))`
 * 2. Distributivity: `fa1 |> alt(() => fa2) |> map(ab) <-> fa1 |> map(ab) |> alt(() => fa2 |> map(ab))`
 *
 * @since 3.0.0
 */
import type { Lazy } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alt<F extends HKT> extends Functor<F> {
  readonly alt: <S, R, E, A>(second: Lazy<Kind<F, S, R, E, A>>) => (first: Kind<F, S, R, E, A>) => Kind<F, S, R, E, A>
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const altAll = <F extends HKT>(F: Alt<F>) => <S, R, E, A>(startWith: Kind<F, S, R, E, A>) => (
  as: ReadonlyArray<Kind<F, S, R, E, A>>
): Kind<F, S, R, E, A> => as.reduce((acc, a) => F.alt(() => a)(acc), startWith)
