/**
 * @since 2.12.0
 */
import {
  Contravariant,
  Contravariant1,
  Contravariant2,
  Contravariant2C,
  Contravariant3,
  Contravariant3C,
  Contravariant4
} from './Contravariant'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3, URIS4, Kind4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible<F> extends Contravariant<F> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: HKT<F, B>, second: HKT<F, C>) => HKT<F, A>
  readonly conquer: HKT<F, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible1<F extends URIS> extends Contravariant1<F> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: Kind<F, B>, second: Kind<F, C>) => Kind<F, A>
  readonly conquer: Kind<F, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible2<F extends URIS2> extends Contravariant2<F> {
  readonly divide: <E, C, B, A>(f: (a: A) => [B, C], first: Kind2<F, E, B>, second: Kind2<F, E, C>) => Kind2<F, E, A>
  readonly conquer: Kind2<F, unknown, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible2C<F extends URIS2, E> extends Contravariant2C<F, E> {
  readonly divide: <C, B, A>(f: (a: A) => [B, C], first: Kind2<F, E, B>, second: Kind2<F, E, C>) => Kind2<F, E, A>
  readonly conquer: Kind2<F, E, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible3<F extends URIS3> extends Contravariant3<F> {
  readonly divide: <R, E, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind3<F, R, E, B>,
    second: Kind3<F, R, E, C>
  ) => Kind3<F, R, E, A>
  readonly conquer: Kind3<F, unknown, unknown, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible3C<F extends URIS3, E> extends Contravariant3C<F, E> {
  readonly divide: <R, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind3<F, R, E, B>,
    second: Kind3<F, R, E, C>
  ) => Kind3<F, R, E, A>
  readonly conquer: Kind3<F, unknown, unknown, unknown>
}

/**
 * @category type classes
 * @since 2.12.0
 */
export interface Divisible4<F extends URIS4> extends Contravariant4<F> {
  readonly divide: <S, R, E, C, B, A>(
    f: (a: A) => [B, C],
    first: Kind4<F, S, R, E, B>,
    second: Kind4<F, S, R, E, C>
  ) => Kind4<F, S, R, E, A>
  readonly conquer: Kind4<F, unknown, unknown, unknown, unknown>
}
