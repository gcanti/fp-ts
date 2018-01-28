import { HKT2 } from './HKT'

/** @typeclass */
export interface Bifunctor<F> {
  readonly URI: F
  bimap<L, A, M, B>(f: (l: L) => M, g: (a: A) => B, fla: HKT2<F, L, A>): HKT2<F, M, B>
}
