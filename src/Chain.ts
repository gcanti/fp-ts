/**
 * The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
 * sequence, using the return value of one computation to determine the next computation.
 *
 * Instances must satisfy the following law in addition to the `Apply` laws:
 *
 * 1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`
 *
 * Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(fa, f))`
 *
 * @since 2.0.0
 */
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply4, Apply3C } from './Apply'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// TODO: remove module in v3

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Kind<F, A>, f: (a: A) => Kind<F, B>) => Kind<F, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <E, A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain2C<F extends URIS2, E> extends Apply2C<F, E> {
  readonly chain: <A, B>(fa: Kind2<F, E, A>, f: (a: A) => Kind2<F, E, B>) => Kind2<F, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <R, E, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Chain3C<F extends URIS3, E> extends Apply3C<F, E> {
  readonly chain: <R, A, B>(fa: Kind3<F, R, E, A>, f: (a: A) => Kind3<F, R, E, B>) => Kind3<F, R, E, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <S, R, E, A, B>(fa: Kind4<F, S, R, E, A>, f: (a: A) => Kind4<F, S, R, E, B>) => Kind4<F, S, R, E, B>
}
