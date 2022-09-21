/**
 * The `Alternative` type class extends the `SemigroupK` type class with a value that should be the left and right identity for `alt`.
 *
 * It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
 * concrete types like `string` or `number`.
 *
 * `Alternative` instances should satisfy the following laws in addition to the `SemigroupK` laws:
 *
 * 1. Left identity: `zero |> alt(() => fa) <-> fa`
 * 2. Right identity: `fa |> alt(() => zero) <-> fa`
 * 3. Annihilation1: `zero |> map(f) <-> zero`
 * 4. Distributivity: `fab |> alt(() => gab) |> ap(fa) <-> fab |> ap(fa) |> alt(() => gab |> A.ap(fa))`
 * 5. Annihilation2: `zero |> ap(fa) <-> zero`
 *
 * @since 3.0.0
 */
import * as semigroupK from './SemigroupK'
import type { SemigroupK } from './SemigroupK'
import type { HKT, Kind } from './HKT'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative<F extends HKT> extends SemigroupK<F> {
  readonly zero: <S, R = unknown, W = never, E = never, A = never>() => Kind<F, S, R, W, E, A>
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard =
  <F extends HKT>(F: Alternative<F>, P: Pointed<F>) =>
  <S, R = unknown, W = never, E = never>(b: boolean): Kind<F, S, R, W, E, void> =>
    b ? P.of(undefined) : F.zero()

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const altAll = <F extends HKT>(
  F: Alternative<F>
): (<S, R, W, E, A>(as: ReadonlyArray<Kind<F, S, R, W, E, A>>) => Kind<F, S, R, W, E, A>) =>
  semigroupK.altAll(F)(F.zero())
