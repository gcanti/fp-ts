/**
 * @since 3.0.0
 */
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed<F> {
  readonly URI?: F
  readonly of: <A>(a: A) => HKT<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed1<F extends URIS> {
  readonly URI?: F
  readonly of: <A>(a: A) => Kind<F, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed2<F extends URIS2> {
  readonly URI?: F
  readonly of: <A, E>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly of: <A>(a: A) => Kind2<F, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed3<F extends URIS3> {
  readonly URI?: F
  readonly of: <A, R, E>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly of: <A, R>(a: A) => Kind3<F, R, E, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Pointed4<F extends URIS4> {
  readonly URI?: F
  readonly of: <A, S, R, E>(a: A) => Kind4<F, S, R, E, A>
}
