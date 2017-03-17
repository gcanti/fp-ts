import { HKT } from './HKT'
import { StaticFunctor } from './Functor'

export interface StaticPointedFunctor<F> extends StaticFunctor<F> {
  of<A>(a: A): HKT<F, A>
}
