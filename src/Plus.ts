import { HKT } from './HKT'
import { Alt, FantasyAlt } from './Alt'

export interface Plus<F> extends Alt<F> {
  zero(): HKT<F, any>
}

export interface FantasyPlus<F, A> extends FantasyAlt<F, A> {
  zero(): FantasyPlus<F, any>
}
