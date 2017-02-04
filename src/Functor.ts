import { HKT, from, to } from './HKT'

export interface Functor<F> {
  map<A, B>(f: (a: A) => B, fa: HKT<F, A>): HKT<F, B>
}

export function lift<F, A, B>(functor: Functor<F>, f: (a: A) => B): (fa: HKT<F, A>) => HKT<F, B> {
  return fa => functor.map(f, fa)
}

export function compose<F, G>(f: Functor<F>, g: Functor<G>): Functor<HKT<F, G>> {

  function map<A, B>(h: (a: A) => B, fga: HKT<HKT<F, G>, A>): HKT<HKT<F, G>, B> {
    return to(f.map(ga => g.map(h, ga), from(fga)))
  }

  return { map }
}
