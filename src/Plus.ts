import { HKT, HKTS } from './HKT'
import { Alt, FantasyAlt } from './Alt'

export interface Plus<F extends HKTS> extends Alt<F> {
  zero(): HKT<any>[F]
}

export interface FantasyPlus<F extends HKTS, A> extends FantasyAlt<F, A> {
  zero(): FantasyPlus<F, any>
}
