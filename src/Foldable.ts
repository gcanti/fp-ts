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
