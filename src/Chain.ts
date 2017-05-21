import { HKT, HKTS } from './HKT'
import { StaticApply, FantasyApply } from './Apply'
import { Kleisli, identity } from './function'

export interface StaticChain<F extends HKTS> extends StaticApply<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<A>[F]): HKT<B>[F]
}

export interface FantasyChain<F extends HKTS, A> extends FantasyApply<F, A> {
  chain<B>(f: Kleisli<F, A, B>): HKT<B>[F]
}

export function flatten<F extends HKTS>(chain: StaticChain<F>): <A>(mma: HKT<HKT<A>[F]>[F]) => HKT<A>[F] {
  return <A>(mma: HKT<HKT<A>[F]>[F]) => chain.chain<HKT<A>[F], A>(identity, mma)
}
