import { HKT, HKTS } from './HKT'
import { Cokleisli, identity } from './function'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticExtend<F extends HKTS> extends StaticFunctor<F> {
  extend<A, B, U = any, V = any>(f: Cokleisli<F, A, B, U, V>, ea: HKT<A, U, V>[F]): HKT<B, U, V>[F]
}

export interface FantasyExtend<F extends HKTS, A> extends FantasyFunctor<F, A> {
  extend<B, U = any, V = any>(f: Cokleisli<F, A, B, U, V>): HKT<B, U, V>[F]
}

export function duplicate<F extends HKTS>(extend: StaticExtend<F>): <A, U = any, V = any>(ma: HKT<A, U, V>[F]) => HKT<HKT<A, U, V>[F], U, V>[F] {
  return <A>(ma: HKT<A>[F]) => extend.extend<A, HKT<A>[F]>(identity, ma)
}
