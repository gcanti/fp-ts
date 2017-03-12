import { HKT } from './HKT'
import { Function1 } from './function'

export interface StaticFunctor<F> {
  map<A, B>(f: Function1<A, B>, fa: HKT<F, A>): HKT<F, B>
}

export interface FantasyFunctor<F, A> extends HKT<F, A> {
  map<B>(f: Function1<A, B>): FantasyFunctor<F, B>
}

export class FunctorOps {
  // module augmentation doesn't work for Arrays (its map method overloading has low priority)
  // I define an explicit overloading here
  map<F, A, B>(f: Function1<A, B>, fa: Array<A>): Array<B>
  map<F, A, B>(f: Function1<A, B>, fa: FantasyFunctor<F, A>): FantasyFunctor<F, B>
  map<F, A, B>(f: Function1<A, B>, fa: FantasyFunctor<F, A>): FantasyFunctor<F, B> {
    return fa.map(f)
  }

  lift<F, A, B>(functor: StaticFunctor<F>, f: Function1<A, B>): Function1<HKT<F, A>, HKT<F, B>>
  lift<F, A, B>(functor: StaticFunctor<F>, f: Function1<A, B>): Function1<HKT<F, A>, HKT<F, B>> {
    return fa => functor.map(f, fa)
  }
}

export const ops = new FunctorOps()
