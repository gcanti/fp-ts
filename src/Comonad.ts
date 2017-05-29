import { HKT, HKTS } from './HKT'
import { Extend, FantasyExtend } from './Extend'

export interface Comonad<F extends HKTS> extends Extend<F> {
  extract<A>(ca: HKT<A>[F]): A
}

export interface FantasyComonad<F extends HKTS, A> extends FantasyExtend<F, A> {
  extract<A>(ca: HKT<A>[F]): A
}
