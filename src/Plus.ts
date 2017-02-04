import { HKT } from './HKT'
import { Alt } from './Alt'

export interface Plus<F> extends Alt<F> {
  zero(): HKT<F, any>
}
