/**
 * The `Alternative` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.
 *
 * It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
 * concrete types like `string` or `number`.
 *
 * `Alternative` instances should satisfy the following laws in addition to the `Alt` laws:
 *
 * 1. Left identity: `zero |> alt(() => fa) <-> fa`
 * 2. Right identity: `fa |> alt(() => zero) <-> fa`
 * 3. Annihilation1: `zero |> map(f) <-> zero`
 * 4. Distributivity: `fab |> alt(() => gab) |> ap(fa) <-> fab |> ap(fa) |> alt(() => gab |> A.ap(fa))`
 * 5. Annihilation2: `zero |> ap(fa) <-> zero`
 *
 * @since 3.0.0
 */
import { Alt, altAll as altAll_ } from './Alt'
import type { HKT, Kind } from './HKT'
import type { Zero } from './Zero'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative<F extends HKT> extends Alt<F>, Zero<F> {}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const altAll = <F extends HKT>(
  F: Alternative<F>
): (<S, R, E, A>(as: ReadonlyArray<Kind<F, S, R, E, A>>) => Kind<F, S, R, E, A>) => altAll_(F)(F.zero())
