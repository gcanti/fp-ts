/**
 * @since 2.0.0
 */
import { Chain, Chain1, Chain2, Chain2C, Chain3 } from './Chain'
import { Either } from './Either'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

// TODO: remove module in v3

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec<F> extends Chain<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => HKT<F, Either<A, B>>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec1<F extends URIS> extends Chain1<F> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind<F, Either<A, B>>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2<F extends URIS2> extends Chain2<F> {
  readonly chainRec: <E, A, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec2C<F extends URIS2, E> extends Chain2C<F, E> {
  readonly chainRec: <A, B>(a: A, f: (a: A) => Kind2<F, E, Either<A, B>>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface ChainRec3<F extends URIS3> extends Chain3<F> {
  readonly chainRec: <R, E, A, B>(a: A, f: (a: A) => Kind3<F, R, E, Either<A, B>>) => Kind3<F, R, E, B>
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
