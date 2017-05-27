import { HKT, HKTS } from './HKT'
import { StaticExtend, FantasyExtend } from './Extend'

export interface StaticComonad<F extends HKTS> extends StaticExtend<F> {
  extract<A>(ca: HKT<A>[F]): A
}

export interface FantasyComonad<F extends HKTS, A> extends FantasyExtend<F, A> {
  extract<A>(ca: HKT<A>[F]): A
}
