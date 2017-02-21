import { HKT } from './HKT'
import { Functor } from './Functor'
import { Foldable } from './Foldable'
import { Applicative } from './Applicative'
import { identity, Function1 } from './function'

export interface Traversable<T> extends Functor<T>, Foldable<T> {
  traverse<F, A, B>(applicative: Applicative<F>, f: Function1<A, HKT<F, B>>, ta: HKT<T, A>): HKT<F, HKT<T, B>>
}

export function sequence<F, T, A>(
  applicative: Applicative<F>,
  traversable: Traversable<T>,
  tfa: HKT<T, HKT<F, A>>): HKT<F, HKT<T, A>> {
  return traversable.traverse<F, HKT<F, A>, A>(applicative, identity, tfa)
}
