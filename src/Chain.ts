import { HKT, HKTS, HKT2S, HKTAs, HKT2As, HKT3S, HKT3As } from './HKT'
import { Apply, FantasyApply } from './Apply'

/** @typeclass */
export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: (a: A) => HKT<F, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyChain<F, A> extends FantasyApply<F, A> {
  chain<B>(f: (a: A) => HKT<F, B>): HKT<F, B>
}

export function flatten<F extends HKT3S>(
  chain: Chain<F>
): <U, L, A>(mma: HKT3As<F, U, L, HKT3As<F, U, L, A>>) => HKT3As<F, U, L, A>
export function flatten<F extends HKT2S>(chain: Chain<F>): <L, A>(mma: HKT2As<F, L, HKT2As<F, L, A>>) => HKT2As<F, L, A>
export function flatten<F extends HKTS>(chain: Chain<F>): <A>(mma: HKTAs<F, HKTAs<F, A>>) => HKTAs<F, A>
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
/** @function */
export function flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> {
  return mma => chain.chain(ma => ma, mma)
}
