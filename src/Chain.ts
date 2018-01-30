import { HKT, URIS, URIS2, Type, Type2, URIS3, Type3, HKT2, HKT3 } from './HKT'
import { Apply, Apply2, Apply3, Apply2C, Apply3C } from './Apply'

/** @typeclass */
export interface Chain<F> extends Apply<F> {
  chain<A, B>(fa: HKT<F, A>, f: (a: A) => HKT<F, B>): HKT<F, B>
}

export interface Chain2<F> extends Apply2<F> {
  chain<L, A, B>(fa: HKT2<F, L, A>, f: (a: A) => HKT2<F, L, B>): HKT2<F, L, B>
}

export interface Chain3<F> extends Apply3<F> {
  chain<U, L, A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => HKT3<F, U, L, B>): HKT3<F, U, L, B>
}

export interface Chain2C<F, L> extends Apply2C<F, L> {
  chain<A, B>(fa: HKT2<F, L, A>, f: (a: A) => HKT2<F, L, B>): HKT2<F, L, B>
}

export interface Chain3C<F, U, L> extends Apply3C<F, U, L> {
  chain<A, B>(fa: HKT3<F, U, L, A>, f: (a: A) => HKT3<F, U, L, B>): HKT3<F, U, L, B>
}

export function flatten<F extends URIS3>(
  chain: Chain<F>
): <U, L, A>(mma: HKT3<F, U, L, HKT3<F, U, L, A>>) => Type3<F, U, L, A>
export function flatten<F extends URIS2>(chain: Chain<F>): <L, A>(mma: HKT2<F, L, HKT2<F, L, A>>) => Type2<F, L, A>
export function flatten<F extends URIS>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => Type<F, A>
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
/** @function */
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> {
  return mma => chain.chain(mma, ma => ma)
}
