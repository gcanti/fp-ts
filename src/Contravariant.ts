/**
 * @since 2.0.0
 */
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: HKT<F, A>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: Kind<F, A>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <E>(fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => (fa: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <R, E>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Contravariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <R>(fa: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <B, A>(f: (b: B) => A) => <S, R, E>(fa: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
