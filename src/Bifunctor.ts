import { HKT, HKTS } from './HKT'

export interface StaticBifunctor<F extends HKTS> {
  readonly URI: F
  bimap<A, B, C, D>(f: (a: A) => B, g: (c: C) => D, fac: HKT<A, C>[F]): HKT<B, D>[F]
}

export interface FantasyBifunctor<F extends HKTS, A, C> {
  bimap<B, D>(f: (a: A) => B, g: (c: C) => D): HKT<B, D>[F]
}
