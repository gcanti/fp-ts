import { HKT } from './HKT'
import { Function1 } from './function'

export interface Contravariant<F> {
  contramap<A, B>(f: Function1<B, A>, fa: HKT<F, A>): HKT<F, B>
}

