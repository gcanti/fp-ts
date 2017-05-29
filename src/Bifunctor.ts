import { HKT, HKTS } from './HKT'

export interface Bifunctor<F extends HKTS> {
  readonly URI: F
  bimap<A, B, C, D, V = any>(f: (a: A) => B, g: (c: C) => D, fac: HKT<A, C, V>[F]): HKT<B, D, V>[F]
}

export interface FantasyBifunctor<F extends HKTS, A, C> {
  bimap<B, D, V = any>(f: (a: A) => B, g: (c: C) => D): HKT<B, D, V>[F]
}
