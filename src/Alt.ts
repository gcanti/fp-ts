import { HKT } from './HKT'
import { StaticFunctor } from './Functor'
import { Function1 } from './function'

export interface StaticAlt<F> extends StaticFunctor<F> {
  alt<A>(fx: HKT<F, A>, fy: HKT<F, A>): HKT<F, A>
}

export interface FantasyAlt<F, A> {
  map<B>(f: Function1<A, B>): FantasyAlt<F, B>
  alt(fy: FantasyAlt<F, A>): FantasyAlt<F, A>
}

export class AltOps {
  alt<F, A>(fx: FantasyAlt<F, A>, fy: FantasyAlt<F, A>): FantasyAlt<F, A>
  alt<F, A>(fx: FantasyAlt<F, A>, fy: FantasyAlt<F, A>): FantasyAlt<F, A> {
    return fx.alt(fy)
  }
}

export const ops = new AltOps()
