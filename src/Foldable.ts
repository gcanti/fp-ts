import { HKT } from './HKT'
import { Monoid } from './Monoid'

export interface Foldable<F> {
  reduce<A, B>(f: (b: B, a: A) => B, b: B, fa: HKT<F, A>): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F, M, A>(foldable: Foldable<F>, monoid: Monoid<M>, f: (a: A) => M, fa: HKT<F, A>): M {
  return foldable.reduce((acc, x) => monoid.concat(f(x), acc), monoid.empty(), fa)
}

