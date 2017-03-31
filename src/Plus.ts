import { HKT, HKTS } from './HKT'
import { StaticAlt, FantasyAlt } from './Alt'

export interface StaticPlus<F extends HKTS> extends StaticAlt<F> {
  zero(): HKT<any>[F]
}

export interface FantasyPlus<F extends HKTS, A> extends FantasyAlt<F, A> {
  zero(): FantasyPlus<F, any>
}
