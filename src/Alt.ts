/**
 * The `Alt` type class identifies an associative operation on a type constructor.  It is similar to `Semigroup`, except
 * that it applies to types of kind `* -> *`, like `Array` or `Option`, rather than concrete types like `string` or
 * `number`.
 *
 * `Alt` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `A.alt(A.alt(fa, ga), ha) <-> A.alt(fa, A.alt(ga, ha))`
 * 2. Distributivity: `A.map(A.alt(fa, ga), ab) <-> A.alt(A.map(fa, ab), A.map(ga, ab))`
 *
 * @since 2.0.0
 */
import { Lazy } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fa: HKT<F, A>, that: Lazy<HKT<F, A>>) => HKT<F, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fa: Kind<F, A>, that: Lazy<Kind<F, A>>) => Kind<F, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <E, A>(fa: Kind2<F, E, A>, that: Lazy<Kind2<F, E, A>>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly alt: <A>(fa: Kind2<F, E, A>, that: Lazy<Kind2<F, E, A>>) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <R, E, A>(fa: Kind3<F, R, E, A>, that: Lazy<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Alt3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly alt: <R, A>(fa: Kind3<F, R, E, A>, that: Lazy<Kind3<F, R, E, A>>) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Alt4<F extends URIS4> extends Functor4<F> {
  readonly alt: <S, R, E, A>(fa: Kind4<F, S, R, E, A>, that: Lazy<Kind4<F, S, R, E, A>>) => Kind4<F, S, R, E, A>
}
