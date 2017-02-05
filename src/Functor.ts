import { HKT, from, to } from './HKT'
import { Function1 } from './function'

export interface Functor<F> {
  map<A, B>(f: Function1<A, B>, fa: HKT<F, A>): HKT<F, B>
}

export function lift<F, A, B>(functor: Functor<F>, f: Function1<A, B>): Function1<HKT<F, A>, HKT<F, B>> {
  return fa => functor.map(f, fa)
}

export function compose<F, G>(f: Functor<F>, g: Functor<G>): Functor<HKT<F, G>> {

  function map<A, B>(h: Function1<A, B>, fga: HKT<HKT<F, G>, A>): HKT<HKT<F, G>, B> {
    return to(f.map(ga => g.map(h, ga), from(fga)))
  }

  return { map }
}
