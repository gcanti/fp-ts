import { HKT2, HKT3 } from './HKT'

/** @typeclass */
export interface Semigroupoid<F> {
  readonly URI: F
  compose<L, A, B>(bc: HKT2<F, A, B>, ab: HKT2<F, L, A>): HKT2<F, L, B>
}

export interface Semigroupoid3<F, U> {
  readonly URI: F
  compose<L, A, B>(bc: HKT3<F, U, A, B>, ab: HKT3<F, U, L, A>): HKT3<F, U, L, B>
}
