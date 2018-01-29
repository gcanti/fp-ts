import { Applicative, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative'
import { Chain, Chain2, Chain3, Chain2C, Chain3C } from './Chain'

/** @typeclass */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Monad2<M> extends Applicative2<M>, Chain2<M> {}

export interface Monad3<M> extends Applicative3<M>, Chain3<M> {}

export interface Monad2C<M, L> extends Applicative2C<M, L>, Chain2C<M, L> {}

export interface Monad3C<M, U, L> extends Applicative3C<M, U, L>, Chain3C<M, U, L> {}
