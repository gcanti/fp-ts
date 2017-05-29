import { HKT, HKTS } from './HKT'
import { Functor, FantasyFunctor } from './Functor'

export interface Alt<F extends HKTS> extends Functor<F> {
  alt<A, U = any, V = any>(fx: HKT<A, U, V>[F], fy: HKT<A, U, V>[F]): HKT<A, U, V>[F]
}

export interface FantasyAlt<F extends HKTS, A> extends FantasyFunctor<F, A> {
  alt<U = any, V = any>(fy: HKT<A, U, V>[F]): HKT<A, U, V>[F]
}
