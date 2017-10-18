import { Applicative, FantasyApplicative } from './Applicative'
import { Chain, FantasyChain } from './Chain'

/** @typeclass */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface FantasyMonad<F, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
