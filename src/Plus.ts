import { HKT } from './HKT'
import { Alt, FantasyAlt } from './Alt'

export interface Plus<F> extends Alt<F> {
  zero: <A>() => HKT<F, A>
}

export interface FantasyPlus<F, A> extends FantasyAlt<F, A> {
  zero: <A>() => HKT<F, A>
}
