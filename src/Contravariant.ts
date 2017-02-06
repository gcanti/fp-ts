import { HKT } from './HKT'
import { Function1 } from './function'

export interface Contravariant<F> {
  contramap<A, B>(f: Function1<B, A>, fa: HKT<F, A>): HKT<F, B>
}

export function lift<F, A, B>(contravariant: Contravariant<F>, f: Function1<B, A>): Function1<HKT<F, A>, HKT<F, B>> {
  return fa => contravariant.contramap(f, fa)
}
