import { HKT } from './HKT'
import { Cokleisli } from './function'

export interface Extend<F> {
  extend<A, B>(f: Cokleisli<F, A, B>, ea: HKT<F, A>): HKT<F, B>
}
