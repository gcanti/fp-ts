import { HKT, HKTS } from './HKT'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticAlt<F extends HKTS> extends StaticFunctor<F> {
  alt<A, U = any, V = any>(fx: HKT<A, U, V>[F], fy: HKT<A, U, V>[F]): HKT<A, U, V>[F]
}

export interface FantasyAlt<F extends HKTS, A> extends FantasyFunctor<F, A> {
  alt<U = any, V = any>(fy: HKT<A, U, V>[F]): HKT<A, U, V>[F]
}
