import { HKT } from './HKT'
import { Extend } from './Extend'

/** @typeclass */
export interface Comonad<F> extends Extend<F> {
  extract<A>(ca: HKT<F, A>): A
}
