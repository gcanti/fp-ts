import { Applicative, Applicative2, Applicative3, FantasyApplicative } from './Applicative'
import { Chain, Chain2, Chain3, FantasyChain } from './Chain'

/** @typeclass */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

/** Monad interface specialized for kind * -> * -> * */
export interface Monad2<M, L> extends Applicative2<M, L>, Chain2<M, L> {}

/** Monad interface specialized for kind * -> * -> * -> * */
export interface Monad3<M, U, L> extends Applicative3<M, U, L>, Chain3<M, U, L> {}

export interface FantasyMonad<F, A> extends FantasyApplicative<F, A>, FantasyChain<F, A> {}
