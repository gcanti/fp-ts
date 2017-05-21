import { HKT, HKTS } from './HKT'
import { Cokleisli, identity } from './function'
import { StaticFunctor, FantasyFunctor } from './Functor'

export interface StaticExtend<F extends HKTS> extends StaticFunctor<F> {
  extend<A, B>(f: Cokleisli<F, A, B>, ea: HKT<A>[F]): HKT<B>[F]
}

export interface FantasyExtend<F extends HKTS, A> extends FantasyFunctor<F, A> {
  extend<B>(f: Cokleisli<F, A, B>): HKT<B>[F]
}

export function duplicate<F extends HKTS>(extend: StaticExtend<F>): <A>(ma: HKT<A>[F]) => HKT<HKT<A>[F]>[F] {
  return <A>(ma: HKT<A>[F]) => extend.extend<A, HKT<A>[F]>(identity, ma)
}
