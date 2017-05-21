import { HKT, HKTS } from './HKT'

export interface StaticFunctor<F extends HKTS> {
  readonly URI: F
  map<A, B, U = any, V = any>(f: (a: A) => B, fa: HKT<A, U, V>[F]): HKT<B, U, V>[F]
}

export interface FantasyFunctor<F extends HKTS, A> {
  map<B, U = any, V = any>(f: (a: A) => B): HKT<B, U, V>[F]
}

export function lift<F extends HKTS, A, B>(functor: StaticFunctor<F>, f: (a: A) => B): <U, V>(fa: HKT<A, U, V>[F]) => HKT<B, U, V>[F] {
  return (fa: HKT<A>[F]) => functor.map(f, fa)
}

/** returns the composition of two functors */
export function getStaticFunctorComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(functorF: StaticFunctor<F>, functorG: StaticFunctor<G>) => StaticFunctor<FG> {
  return <F extends HKTS, G extends HKTS>(functorF: StaticFunctor<F>, functorG: StaticFunctor<G>): StaticFunctor<FG> => ({
    URI,
    map<A, B>(f: (a: A) => B, fa: HKT<HKT<A>[G]>[F]): HKT<HKT<B>[G]>[F] {
      return functorF.map((ga: HKT<A>[G]) => functorG.map(f, ga), fa)
    }
  })
}
