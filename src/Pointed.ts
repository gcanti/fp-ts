/**
 * @since 2.10.0
 */
import { Functor, Functor1, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed<F> extends Functor<F> {
  readonly of: <A>(a: A) => HKT<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed1<F extends URIS> extends Functor1<F> {
  readonly of: <A>(a: A) => Kind<F, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed2<F extends URIS2> extends Functor2<F> {
  readonly of: <E, A>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly of: <A>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed3<F extends URIS3> extends Functor3<F> {
  readonly of: <R, E, A>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly of: <R, A>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 2.10.0
 */
export interface Pointed4<F extends URIS4> extends Functor4<F> {
  readonly of: <S, R, E, A>(a: A) => Kind4<F, S, R, E, A>
}
