import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticCopointed<F extends HKTS> extends StaticFunctor<F> {
  extract<A>(ca: HKT<A>[F]): A
}

export interface FantasyCopointed<F extends HKTS, A> extends FantasyFunctor<F, A> {}
