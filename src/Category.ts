import { HKT2 } from './HKT'
import { Semigroupoid } from './Semigroupoid'

/** @typeclass */
export interface Category<F> extends Semigroupoid<F> {
  id: <A>() => HKT2<F, A, A>
}
