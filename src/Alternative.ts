/**
 * @file The `Alternative` type class extends the `Alt` type class with a value that should be the left and right identity for `alt`.
 *
 * It is similar to `Monoid`, except that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than
 * concrete types like `string` or `number`.
 *
 * `Alternative` instances should satisfy the following laws:
 *
 * 1. Left identity: `A.alt(zero, fa) == fa`
 * 2. Right identity: `A.alt(fa, zero) == fa`
 * 3. Annihilation: `A.map(zero, f) == zero`
 * 4. Distributivity: `A.ap(A.alt(fab, gab), fa) = A.alt(A.ap(fab, fa), A.ap(gab, fa))`
 * 5. Annihilation: `A.ap(zero, fa) = zero`
 */
import { Alt, Alt1, Alt2, Alt2C, Alt3 } from './Alt'
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3 } from './Applicative'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Alternative<F> extends Applicative<F>, Alt<F> {
  readonly zero: <A>() => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface Alternative1<F extends URIS> extends Applicative1<F>, Alt1<F> {
  readonly zero: <A>() => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface Alternative2<F extends URIS2> extends Applicative2<F>, Alt2<F> {
  readonly zero: <E, A>() => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Alternative2C<F extends URIS2, E> extends Applicative2C<F, E>, Alt2C<F, E> {
  readonly zero: <A>() => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Alternative3<F extends URIS3> extends Applicative3<F>, Alt3<F> {
  readonly zero: <R, E, A>() => Kind3<F, R, E, A>
}
