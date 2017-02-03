import { HKT } from './HKT'
import { Functor } from './Functor'

export interface Copointed<F> extends Functor<F> {
  extract<A>(ca: HKT<F, A>): A
}
