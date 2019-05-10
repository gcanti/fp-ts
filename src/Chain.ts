/**
 * @file The `Chain` type class extends the `Apply` type class with a `chain` operation which composes computations in
 * sequence, using the return value of one computation to determine the next computation.
 *
 * Instances must satisfy the following law in addition to the `Apply` laws:
 *
 * 1. Associativity: `F.chain(F.chain(fa, afb), bfc) <-> F.chain(fa, a => F.chain(afb(a), bfc))`
 *
 * Note. `Apply`'s `ap` can be derived: `(fab, fa) => F.chain(fab, f => F.map(f, fa))`
 */
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply4 } from './Apply'
import { HKT, Type, Type2, Type3, Type4, URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Chain<F> extends Apply<F> {
  readonly chain: <A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>) => HKT<F, B>
}

export interface Chain1<F extends URIS> extends Apply1<F> {
  readonly chain: <A, B>(fa: Type<F, A>, f: (a: A) => Type<F, B>) => Type<F, B>
}

export interface Chain2<F extends URIS2> extends Apply2<F> {
  readonly chain: <L, A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}

export interface Chain3<F extends URIS3> extends Apply3<F> {
  readonly chain: <U, L, A, B>(fa: Type3<F, U, L, A>, f: (a: A) => Type3<F, U, L, B>) => Type3<F, U, L, B>
}

export interface Chain2C<F extends URIS2, L> extends Apply2C<F, L> {
  readonly chain: <A, B>(fa: Type2<F, L, A>, f: (a: A) => Type2<F, L, B>) => Type2<F, L, B>
}

export interface Chain4<F extends URIS4> extends Apply4<F> {
  readonly chain: <X, U, L, A, B>(fa: Type4<F, X, U, L, A>, f: (a: A) => Type4<F, X, U, L, B>) => Type4<F, X, U, L, B>
}

/**
 * @since 2.0.0
 */
export function flatMap<F extends URIS3>(
  F: Chain3<F>
): <U, L, A, B>(f: (a: A) => Type3<F, U, L, B>) => (fa: Type3<F, U, L, A>) => Type3<F, U, L, B>
export function flatMap<F extends URIS2>(
  F: Chain2<F>
): <L, A, B>(f: (a: A) => Type2<F, L, B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function flatMap<F extends URIS2, L>(
  F: Chain2C<F, L>
): <A, B>(f: (a: A) => Type2<F, L, B>) => (fa: Type2<F, L, A>) => Type2<F, L, B>
export function flatMap<F extends URIS>(F: Chain1<F>): <A, B>(f: (a: A) => Type<F, B>) => (fa: Type<F, A>) => Type<F, B>
export function flatMap<F>(F: Chain<F>): <A, B>(f: (a: A) => HKT<F, B>) => (fa: HKT<F, A>) => HKT<F, B>
export function flatMap<F>(F: Chain<F>): <A, B>(f: (a: A) => HKT<F, B>) => (fa: HKT<F, A>) => HKT<F, B> {
  return f => fa => F.chain(fa, f)
}
