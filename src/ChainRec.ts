/**
 * @since 2.0.0
 */
import { Either } from './Either'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

// TODO: remove module in v3

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec<F> {
  readonly URI: F
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec1<F extends URIS> {
  readonly URI: F
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind<F, Either<A, B>>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2<F extends URIS2> {
  readonly URI: F
  readonly chainRec: <A, E, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2C<F extends URIS2, E> {
  readonly URI: F
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec3<F extends URIS3> {
  readonly URI: F
  readonly chainRec: <A, R, E, B>(a: A, f: (a: A) => Kind3<F, R, E, Either<A, B>>) => Kind3<F, R, E, B>
}

/**
 * @since 2.0.0
 */
export function tailRec<A, B>(a: A, f: (a: A) => Either<A, B>): B {
  let v = f(a)
  while (v._tag === 'Left') {
    v = f(v.left)
  }
  return v.right
}
