import { HKT2 } from './HKT'

/** @typeclass */
export interface Bifunctor<F> {
  readonly URI: F
  bimap<L, A, M, B>(f: (u: L) => M, g: (a: A) => B, fla: HKT2<F, L, A>): HKT2<F, M, B>
}

export interface FantasyBifunctor<F, L, A> {
  bimap<M, B>(f: (l: L) => M, g: (a: A) => B): HKT2<F, M, B>
}
