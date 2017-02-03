import { HKT } from './HKT'

export interface Contravariant<F> {
  contramap<A, B>(f: (a: B) => A, fa: HKT<F, A>): HKT<F, B>
}

