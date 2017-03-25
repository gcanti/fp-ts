import { HKT, HKTS, HKT2, HKT2S } from './HKT'

export interface StaticFunctor<F extends HKTS> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<A>[F]): HKT<B>[F]
}

export interface FantasyFunctor<F extends HKTS, A> {
  map<B>(f: (a: A) => B): HKT<B>[F]
}

export function lift<F extends HKT2S, A, B>(functor: StaticFunctor<F>, f: (a: A) => B): <L>(fa: HKT2<L, A>[F]) => HKT2<L, B>[F]
export function lift<F extends HKTS, A, B>(functor: StaticFunctor<F>, f: (a: A) => B): (fa: HKT<A>[F]) => HKT<B>[F]
export function lift<F extends HKTS, A, B>(functor: StaticFunctor<F>, f: (a: A) => B): (fa: HKT<A>[F]) => HKT<B>[F] {
  return fa => functor.map(f, fa)
}
