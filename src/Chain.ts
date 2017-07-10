import { HKT } from './HKT'
import { Apply, FantasyApply } from './Apply'
import { Kleisli } from './function'
import './overloadings'

export interface Chain<F> extends Apply<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyChain<F, A> extends FantasyApply<F, A> {
  chain<B>(f: Kleisli<F, A, B>): HKT<F, B>
}

export class Ops {
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A>
  flatten<F>(chain: Chain<F>): <A>(mma: HKT<F, HKT<F, A>>) => HKT<F, A> {
    return mma => chain.chain(ma => ma, mma)
  }
}

const ops = new Ops()
export const flatten: Ops['flatten'] = ops.flatten
