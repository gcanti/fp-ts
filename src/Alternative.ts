import { StaticApplicative } from './Applicative'
import { StaticPlus } from './Plus'
import { Function1 } from './function'

export interface StaticAlternative<F> extends StaticApplicative<F>, StaticPlus<F> {}

export interface FantasyAlternative<F, A> {
  map<B>(f: Function1<A, B>): FantasyAlternative<F, B>
  of<B>(b: B): FantasyAlternative<F, B>
  ap<B>(fab: FantasyAlternative<F, Function1<A, B>>): FantasyAlternative<F, B>
  alt(fy: FantasyAlternative<F, A>): FantasyAlternative<F, A>
  zero(): FantasyAlternative<F, any>
}
