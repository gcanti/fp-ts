import { HKT } from './HKT'

export interface Extend<F> {
  extend<A, B>(f: (ea: HKT<F, A>) => B, ea: HKT<F, A>): HKT<F, B>
}
