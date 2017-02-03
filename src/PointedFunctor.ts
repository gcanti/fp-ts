import { HKT } from './HKT'
import { Functor } from './Functor'

export interface PointedFunctor<F> extends Functor<F> {
  of<A>(a: A): HKT<F, A>
}
