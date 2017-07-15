import { HKT, HKTS, HKT2S, URI2HKT, URI2HKT2 } from './HKT'
import { Apply, FantasyApply } from './Apply'
import { Kleisli } from './function'

export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyChain<F, A> extends FantasyApply<F, A> {
  chain<B>(f: Kleisli<F, A, B>): HKT<F, B>
}

export class Ops {
  flatten<F extends HKT2S>(chain: Chain<F>): <L, A>(mma: URI2HKT2<L, URI2HKT2<L, A>[F]>[F]) => URI2HKT2<L, A>[F]
  flatten<F extends HKTS>(chain: Chain<F>): <A>(mma: URI2HKT<URI2HKT<A>[F]>[F]) => URI2HKT<A>[F]
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> {
    return mma => chain.chain(ma => ma, mma)
  }
}

const ops = new Ops()
export const flatten: Ops['flatten'] = ops.flatten
