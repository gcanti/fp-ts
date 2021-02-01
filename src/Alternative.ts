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
import { Alt, Alt1, Alt2, Alt2C, Alt3, Alt3C, Alt4 } from './Alt'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative<F> extends Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative1<F extends URIS> extends Alt1<F> {
  readonly zero: <A>() => Kind<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative2<F extends URIS2> extends Alt2<F> {
  readonly zero: <E, A>() => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative2C<F extends URIS2, E> extends Alt2C<F, E> {
  readonly zero: <A>() => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative3<F extends URIS3> extends Alt3<F> {
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative3C<F extends URIS3, E> extends Alt3C<F, E> {
  readonly zero: <R, A>() => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Alternative4<F extends URIS4> extends Alt4<F> {
  readonly zero: <S, R, E, A>() => Kind4<F, S, R, E, A>
}
