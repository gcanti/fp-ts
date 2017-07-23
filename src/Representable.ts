import { HKT } from './HKT'
import { Functor } from './Functor'

/** A Functor f is Representable if tabulate and index witness an isomorphism to Reader. */
export interface Representable<F, R> extends Functor<F> {
  tabulate<A>(f: (rep: R) => A): HKT<F, A>
  index<A>(fa: HKT<F, A>, rep: R): A
}
