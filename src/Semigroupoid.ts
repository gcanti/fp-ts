import { HKT2 } from './HKT'

/** @typeclass */
export interface Semigroupoid<F> {
  readonly URI: F
  compose<L, A, B>(bc: HKT2<F, A, B>, ab: HKT2<F, L, A>): HKT2<F, L, B>
}

export interface FantasySemigroupoid<F, L, A> {
  compose<B>(bc: HKT2<F, A, B>): HKT2<F, L, B>
}
