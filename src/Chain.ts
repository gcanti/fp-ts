import { HKT } from './HKT'
import { Apply, Ap } from './Apply'
import { Function1, Kleisli } from './function'
import { Functor } from './Functor'

export interface ChainedFunctor<F> extends Functor<F> {
  chain<A, B>(f: Kleisli<F, A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface Chain<F> extends Apply<F>, ChainedFunctor<F> {}

export function deriveAp<F>(chain: ChainedFunctor<F>): Ap<F> {
  return function ap<A, B>(fab: HKT<F, Function1<A, B>>, fa: HKT<F, A>): HKT<F, B> {
    return chain.chain(f => chain.map(f, fa), fab)
  }
}
