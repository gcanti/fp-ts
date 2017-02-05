import { HKT } from './HKT'
import { Function1 } from './function'

export interface Functor<F> {
  map<A, B>(f: Function1<A, B>, fa: HKT<F, A>): HKT<F, B>
}

export function lift<F, A, B>(functor: Functor<F>, f: Function1<A, B>): Function1<HKT<F, A>, HKT<F, B>> {
  return fa => functor.map(f, fa)
}
