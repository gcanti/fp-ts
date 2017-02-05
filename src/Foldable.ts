import { HKT, from } from './HKT'
import { Monoid } from './Monoid'
import { Function1, Function2 } from './function'

export interface Foldable<F> {
  reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKT<F, A>): B
}

/** A default implementation of `foldMap` using `foldl`. */
export function foldMap<F, M, A>(foldable: Foldable<F>, monoid: Monoid<M>, f: Function1<A, M>, fa: HKT<F, A>): M {
  return foldable.reduce((acc, x) => monoid.concat(f(x), acc), monoid.empty(), fa)
}

export function compose<F1, F2>(f1: Foldable<F1>, f2: Foldable<F2>): Foldable<HKT<F1, F2>> {

  function reduce<A, B>(f: Function2<B, A, B>, b: B, fa: HKT<HKT<F1, F2>, A>): B {
    return f1.reduce((a, gb) => f2.reduce(f, a, gb), b, from(fa))
  }

  return { reduce }
}
