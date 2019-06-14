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
  readonly contramap: <L, A, B>(fa: Kind2<F, L, A>, f: (b: B) => A) => Kind2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly contramap: <A, B>(fa: Kind2<F, L, A>, f: (b: B) => A) => Kind2<F, L, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant3<F extends URIS3> {
  readonly URI: F
  readonly contramap: <U, L, A, B>(fa: Kind3<F, U, L, A>, f: (b: B) => A) => Kind3<F, U, L, B>
}

/**
 * @since 2.0.0
 */
export interface Contravariant4<F extends URIS4> {
  readonly URI: F
  readonly contramap: <X, U, L, A, B>(fa: Kind4<F, X, U, L, A>, f: (b: B) => A) => Kind4<F, X, U, L, B>
}
