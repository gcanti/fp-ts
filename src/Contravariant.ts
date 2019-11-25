import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Contravariant<F> {
  readonly URI: F
  readonly contramap: <A, B>(fa: HKT<F, A>, f: (b: B) => A) => HKT<F, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant1<F extends URIS> {
  readonly URI: F
  readonly contramap: <A, B>(fa: Kind<F, A>, f: (b: B) => A) => Kind<F, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant2<F extends URIS2> {
  readonly URI: F
  readonly contramap: <E, A, B>(fa: Kind2<F, E, A>, f: (b: B) => A) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly contramap: <A, B>(fa: Kind2<F, E, A>, f: (b: B) => A) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (b: B) => A) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface Contravariant3C<F extends URIS3, E> {
  readonly URI: F
  readonly contramap: <R, A, B>(fa: Kind3<F, R, E, A>, f: (b: B) => A) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (b: B) => A) => Kind4<F, S, R, E, B>
}
