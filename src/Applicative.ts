import { StaticPointedFunctor } from './PointedFunctor'
import { StaticApply } from './Apply'
import { Function1 } from './function'

export interface StaticApplicative<F> extends StaticPointedFunctor<F>, StaticApply<F> {}

export interface FantasyApplicative<F, A> {
  map<B>(f: Function1<A, B>): FantasyApplicative<F, B>
  of<B>(b: B): FantasyApplicative<F, B>
  ap<B>(fab: FantasyApplicative<F, Function1<A, B>>): FantasyApplicative<F, B>
}
