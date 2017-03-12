import { HKT2 } from './HKT'
import { Function1 } from './function'

export interface StaticBifunctor<F> {
  bimap<A, B, C, D>(f: Function1<A, B>, g: Function1<C, D>, fac: HKT2<F, A, C>): HKT2<F, B, D>
}

export interface FantasyBifunctor<F, A, C> extends HKT2<F, A, C> {
  bimap<B, D>(f: Function1<A, B>, g: Function1<C, D>): FantasyBifunctor<F, B, D>
}

export class BifunctorOps {
  bimap<F, A, B, C, D>(f: Function1<A, B>, g: Function1<C, D>, fac: FantasyBifunctor<F, A, C>): FantasyBifunctor<F, B, D>
  bimap<F, A, B, C, D>(f: Function1<A, B>, g: Function1<C, D>, fac: FantasyBifunctor<F, A, C>): FantasyBifunctor<F, B, D> {
    return fac.bimap(f, g)
  }
}

export const ops = new BifunctorOps()
