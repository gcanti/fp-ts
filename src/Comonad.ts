import { HKT } from './HKT'
import { Extend, FantasyExtend } from './Extend'

export interface Comonad<F> extends Extend<F> {
  extract<A>(ca: HKT<F, A>): A
}

export interface FantasyComonad<F, A> extends FantasyExtend<F, A> {
  extract: () => A
}
