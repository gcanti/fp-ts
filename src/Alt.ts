import { HKT, URIS, URIS2, URIS3, Type, Type2, Type3 } from './HKT'
import { Functor, Functor1, Functor2, Functor3, Functor2C, Functor3C } from './Functor'

/**
 * The `Alt` type class identifies an associative operation on a type
 * constructor.  It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`, like `Array` or `Option`, rather than concrete types
 * like `string` or `number`.
 *
 * `Alt` instances are required to satisfy the following laws:
 *
 * 1. Associativity: `A.alt(A.alt(fa, ga), ha) = A.alt(fa, A.alt(ga, ha))`
 * 2. Distributivity: `A.map(A.alt(fa, ga), ab) = A.alt(A.map(fa, ab), A.map(ga, ab))`
 *
 * @typeclass
 */
export interface Alt<F> extends Functor<F> {
  readonly alt: <A>(fx: HKT<F, A>, fy: HKT<F, A>) => HKT<F, A>
}

export interface Alt1<F extends URIS> extends Functor1<F> {
  readonly alt: <A>(fx: Type<F, A>, fy: Type<F, A>) => Type<F, A>
}

export interface Alt2<F extends URIS2> extends Functor2<F> {
  readonly alt: <L, A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}

export interface Alt3<F extends URIS3> extends Functor3<F> {
  readonly alt: <U, L, A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}

export interface Alt2C<F extends URIS2, L> extends Functor2C<F, L> {
  readonly alt: <A>(fx: Type2<F, L, A>, fy: Type2<F, L, A>) => Type2<F, L, A>
}

export interface Alt3C<F extends URIS3, U, L> extends Functor3C<F, U, L> {
  readonly alt: <A>(fx: Type3<F, U, L, A>, fy: Type3<F, U, L, A>) => Type3<F, U, L, A>
}
