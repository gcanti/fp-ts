import { HKT } from './HKT'
import { Alt } from './Alt'

/** @typeclass */
export interface Plus<F> extends Alt<F> {
  zero: <A>() => HKT<F, A>
}
