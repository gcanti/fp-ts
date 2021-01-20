/**
 * @since 3.0.0
 */
import { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroupoid<F> {
  readonly URI?: F
  readonly compose: <B, C>(bc: HKT2<F, B, C>) => <A>(ab: HKT2<F, A, B>) => HKT2<F, A, C>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroupoid2<F extends URIS2> {
  readonly URI?: F
  readonly compose: <B, C>(bc: Kind2<F, B, C>) => <A>(ab: Kind2<F, A, B>) => Kind2<F, A, C>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroupoid3<F extends URIS3> {
  readonly URI?: F
  readonly compose: <R, B, C>(bc: Kind3<F, R, B, C>) => <A>(ab: Kind3<F, R, A, B>) => Kind3<F, R, A, C>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Semigroupoid4<F extends URIS4> {
  readonly URI?: F
  readonly compose: <S, R, B, C>(bc: Kind4<F, S, R, B, C>) => <A>(ab: Kind4<F, S, R, A, B>) => Kind4<F, S, R, A, C>
}
