import { HKT, HKT2 } from './HKT'
import { Functor } from './Functor'
import { Function1 } from './function'

export interface Bifunctor<F> extends Functor<HKT<F, any>> {
  bimap<A, B, C, D>(f: Function1<A, B>, g: Function1<C, D>, fac: HKT2<F, A, C>): HKT2<F, B, D>
}
