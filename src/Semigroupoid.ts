/**
 * @since 2.0.0
 */
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid<F> {
  readonly URI: F
  readonly compose: <A, B>(ab: HKT2<F, A, B>) => <C>(bc: HKT2<F, B, C>) => HKT2<F, A, C>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid2<F extends URIS2> {
  readonly URI: F
  readonly compose: <A, B>(ab: Kind2<F, A, B>) => <C>(bc: Kind2<F, B, C>) => Kind2<F, A, C>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid2C<F extends URIS2, A> {
  readonly URI: F
  readonly compose: <B>(ab: Kind2<F, A, B>) => <C>(bc: Kind2<F, B, C>) => Kind2<F, A, C>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid3<F extends URIS3> {
  readonly URI: F
  readonly compose: <R, A, B>(ab: Kind3<F, R, A, B>) => <C>(bc: Kind3<F, R, B, C>) => Kind3<F, R, A, C>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Semigroupoid3C<F extends URIS3, A> {
  readonly URI: F
  readonly compose: <R, B>(ab: Kind3<F, R, A, B>) => <C>(bc: Kind3<F, R, B, C>) => Kind3<F, R, A, C>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Semigroupoid4<F extends URIS4> {
  readonly URI: F
  readonly compose: <S, R, A, B>(ab: Kind4<F, S, R, A, B>) => <C>(bc: Kind4<F, S, R, B, C>) => Kind4<F, S, R, A, C>
}
