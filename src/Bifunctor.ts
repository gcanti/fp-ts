import { HKT2, HKT2S } from './HKT'

export interface StaticBifunctor<F extends HKT2S> {
  readonly URI: F
  bimap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fac: HKT2<A, C>[F]): HKT2<B, D>[F]
}

export interface FantasyBifunctor<F extends HKT2S, A, C> {
  bimap<B, D>(f: (a: A) => B, g: (c: C) => D): HKT2<B, D>[F]
}
