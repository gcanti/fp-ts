import { HKT } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Alt<F> extends Functor<F> {
  alt<A>(fx: HKT<F, A>, fy: HKT<F, A>): HKT<F, A>
}

export interface FantasyAlt<F, A> extends FantasyFunctor<F, A> {
  alt(fy: HKT<F, A>): HKT<F, A>
}
