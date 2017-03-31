import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticAlt<F extends HKTS> extends StaticFunctor<F> {
  alt<A>(fx: HKT<A>[F], fy: HKT<A>[F]): HKT<A>[F]
}

export interface FantasyAlt<F extends HKTS, A> extends FantasyFunctor<F, A> {
  alt(fy: FantasyAlt<F, A>): HKT<A>[F]
}
