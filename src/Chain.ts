import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Apply, FantasyApply } from './Apply'
import { Kleisli } from './function'

export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyChain<F, A> extends FantasyApply<F, A> {
  chain<B>(f: Kleisli<F, A, B>): HKT<F, B>
}

export class Ops {
  flatten<F extends HKT2S>(chain: Chain<F>): <L, A>(mma: HKT2As<F, L, HKT2As<F, L, A>>) => HKT2As<F, L, A>
  flatten<F extends HKTS>(chain: Chain<F>): <A>(mma: HKTAs<F, HKTAs<F, A>>) => HKTAs<F, A>
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> {
    return mma => chain.chain(ma => ma, mma)
  }
}

const ops = new Ops()
export const flatten: Ops['flatten'] = ops.flatten
