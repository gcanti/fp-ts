import { HKT, HKTS } from './HKT'
import { StaticMonoid, monoidArray } from './Monoid'

export interface StaticFoldable<F extends HKTS> {
  readonly URI: F
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<A>[F]): B
}

export interface FantasyFoldable<A> {
  reduce<B>(f: (b: B, a: A) => B, b: B): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F extends HKTS, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: (a: A) => M, fa: HKT<A>[F]): M
export function foldMap<F extends HKTS, M, A>(foldable: StaticFoldable<F>, monoid: StaticMonoid<M>, f: (a: A) => M, fa: HKT<A>[F]): M {
  return foldable.reduce((acc, x: A) => monoid.concat(f(x), acc), monoid.empty(), fa)
}

export function toArray<F extends HKTS, A>(foldable: StaticFoldable<F>, fa: HKT<A>[F]): Array<A> {
  return foldMap<F, Array<A>, A>(foldable, monoidArray, a => [a], fa)
}

/** returns the composition of two foldables */
export function getFoldableComposition<FG extends HKTS>(URI: FG): <F extends HKTS, G extends HKTS>(foldableF: StaticFoldable<F>, foldableG: StaticFoldable<G>) => StaticFoldable<FG> {
  return <F extends HKTS, G extends HKTS>(foldableF: StaticFoldable<F>, foldableG: StaticFoldable<G>) => {
    function reduce<A, B>(f: (b: B, a: A) => B, b: B, fga: HKT<HKT<A>[G]>[F]): B {
      return foldableF.reduce<HKT<A>[G], B>((b, ga) => foldableG.reduce(f, b, ga), b, fga)
    }

    return {
      URI,
      reduce
    }
  }
}
