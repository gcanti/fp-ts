import { HKT } from './HKT'
import { StaticApply } from './Apply'
import { Kleisli, Function1, identity } from './function'

export interface StaticChain<F> extends StaticApply<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyChain<F, A> {
  map<B>(f: Function1<A, B>): FantasyChain<F, B>
  of<B>(b: B): FantasyChain<F, B>
  ap<B>(fab: FantasyChain<F, Function1<A, B>>): FantasyChain<F, B>
  chain<B>(f: Kleisli<F, A, B>): FantasyChain<F, B>
}

export class ChainOps {
  chain<F, A, B>(f: Kleisli<F, A, B>, fa: FantasyChain<F, A>): FantasyChain<F, B>
  chain<F, A, B>(f: Kleisli<F, A, B>, fa: FantasyChain<F, A>): FantasyChain<F, B> {
    return fa.chain(f)
  }

  flatten<F, A>(mma: FantasyChain<F, FantasyChain<F, A>>): FantasyChain<F, A>
  flatten<F, A>(mma: FantasyChain<F, FantasyChain<F, A>>): FantasyChain<F, A> {
    return mma.chain(identity)
  }
}

export const ops = new ChainOps()
