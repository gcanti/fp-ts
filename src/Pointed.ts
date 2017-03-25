import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticPointed<F extends HKTS> extends StaticFunctor<F> {
  of<A>(a: A): HKT<A>[F]
}

export interface FantasyPointed<F extends HKTS, A> extends FantasyFunctor<F, A> {
  of<A>(a: A): HKT<A>[F]
}
