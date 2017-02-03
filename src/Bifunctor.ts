import { HKT, HKT2 } from './HKT'
import { Functor } from './Functor'

export interface Bifunctor<F> extends Functor<HKT<F, any>> {
  bimap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fac: HKT2<F, A, C>): HKT2<F, B, D>
}
