import { StaticApplicative } from './Applicative'
import { StaticChain } from './Chain'
import { Function1, Kleisli } from './function'

export interface StaticMonad<F> extends StaticApplicative<F>, StaticChain<F> {}

export interface FantasyMonad<F, A> {
  map<B>(f: Function1<A, B>): FantasyMonad<F, B>
  of<B>(b: B): FantasyMonad<F, B>
  ap<B>(fab: FantasyMonad<F, Function1<A, B>>): FantasyMonad<F, B>
  chain<B>(f: Kleisli<F, A, B>): FantasyMonad<F, B>
}
