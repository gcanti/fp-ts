import { HKT, from, to } from './HKT'
import { Functor, compose as composeFunctor } from './Functor'
import { Foldable, compose as composeFoldable } from './Foldable'
import { Applicative } from './Applicative'
import { identity, Function1 } from './function'

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKT<T, A>): HKT<F, HKT<T, B>>;
}

export function sequence<F, T, A>(
  applicative: Applicative<F>,
  traversable: Traversable<T>,
  tfa: HKT<T, HKT<F, A>>): HKT<F, HKT<T, A>> {
  return traversable.traverse<F, HKT<F, A>, A>(applicative, identity, tfa)
}

export function compose<T1, T2>(t1: Traversable<T1>, t2: Traversable<T2>): Traversable<HKT<T1, T2>> {

  function traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKT<HKT<T1, T2>, A>): HKT<F, HKT<HKT<T1, T2>, B>> {
    return applicative.map(x => to<T1, T2, B>(x), t1.traverse(applicative, t2a => t2.traverse(applicative, f, t2a), from(ta)))
  }

  return {
    map: composeFunctor(t1, t2).map,
    reduce: composeFoldable(t1, t2).reduce,
    traverse
  }
}
