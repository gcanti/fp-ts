import { HKT } from './HKT'
import { StaticAlt } from './Alt'
import { Function1 } from './function'

export interface StaticPlus<F> extends StaticAlt<F> {
  zero(): HKT<F, any>
}

export interface FantasyPlus<F, A> {
  map<B>(f: Function1<A, B>): FantasyPlus<F, B>
  alt(fy: FantasyPlus<F, A>): FantasyPlus<F, A>
  zero(): FantasyPlus<F, any>
}
