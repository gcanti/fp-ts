import { HKT, HKTS } from './HKT'

export interface StaticFunctor<F extends HKTS> {
  readonly URI: F
  map<A, B>(f: (a: A) => B, fa: HKT<A>[F]): HKT<B>[F]
}

export interface FantasyFunctor<F extends HKTS, A> {
  map<B>(f: (a: A) => B): HKT<B>[F]
}

export function lift<F extends HKTS, A, B>(functor: StaticFunctor<F>, f: (a: A) => B): (fa: HKT<A>[F]) => HKT<B>[F] {
  return fa => functor.map(f, fa)
}

/** returns the composition of two functors */
export function getFunctorComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(functorF: StaticFunctor<F>, functorG: StaticFunctor<G>) => StaticFunctor<FG> {
  return <F extends HKTS, G extends HKTS>(functorF: StaticFunctor<F>, functorG: StaticFunctor<G>) => ({
    URI,
    map<A, B>(f: (a: A) => B, fa: HKT<HKT<A>[G]>[F]): HKT<HKT<B>[G]>[F] {
      return functorF.map((ga: HKT<A>[G]) => functorG.map(f, ga), fa)
    }
  })
}
