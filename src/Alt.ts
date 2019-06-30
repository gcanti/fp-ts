/**
 * @file The `Alt` type class identifies an associative operation on a type constructor.  It is similar to `Semigroup`, except
 * that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
 * `number`.
 *
 * `Alt` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `A.alt(A.alt(fa, ga), ha) = A.alt(fa, A.alt(ga, ha))`
 * 2. Distributivity: `A.map(A.alt(fa, ga), ab) = A.alt(A.map(fa, ab), A.map(ga, ab))`
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fx: HKT<F, A>, fy: () => HKT<F, A>) => HKT<F, A>
}

/**
 * @since 2.0.0
 */
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fx: Kind<F, A>, fy: () => Kind<F, A>) => Kind<F, A>
}

/**
 * @since 2.0.0
 */
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <E, A>(fx: Kind2<F, E, A>, fy: () => Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <R, E, A>(fx: Kind3<F, R, E, A>, fy: () => Kind3<F, R, E, A>) => Kind3<F, R, E, A>
}

/**
 * @since 2.0.0
 */
export interface Alt2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly alt: <A>(fx: Kind2<F, E, A>, fy: () => Kind2<F, E, A>) => Kind2<F, E, A>
}

/**
 * @since 2.0.0
 */
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <S, R, E, A>(fx: Kind4<F, S, R, E, A>, fy: () => Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, A>
}
