/**
 * @since 2.0.0
 */
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <E, A, B>(ab: HKT2<F, A, B>, la: HKT2<F, E, A>) => HKT2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <E, A, B>(ab: Kind2<F, A, B>, la: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface Semigroupoid2C<F extends URIS2, E> {
  readonly URI: F
  readonly _E: E
  readonly compose: <A, B>(ab: Kind2<F, A, B>, la: Kind2<F, E, A>) => Kind2<F, E, B>
}

/**
 * @since 2.0.0
 */
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <R, E, A, B>(ab: Kind3<F, R, A, B>, la: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.2.0
 */
export interface Semigroupoid3C<F extends URIS3, E> {
  readonly URI: F
  readonly _E: E
  readonly compose: <R, A, B>(ab: Kind3<F, R, A, B>, la: Kind3<F, R, E, A>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <S, R, E, A, B>(ab: Kind4<F, S, R, A, B>, la: Kind4<F, S, R, E, A>) => Kind4<F, S, R, E, B>
}
