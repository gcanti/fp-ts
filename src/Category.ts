import { HKT2, HKT3 } from './HKT'
import { Semigroupoid, Semigroupoid3 } from './Semigroupoid'

/** @typeclass */
export interface Category<F> extends Semigroupoid<F> {
  id: <A>() => HKT2<F, A, A>
}

export interface Category3<F, U> extends Semigroupoid3<F, U> {
  id: <A>() => HKT3<F, U, A, A>
}
