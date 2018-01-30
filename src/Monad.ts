import { URIS, URIS2, URIS3 } from './HKT'
import { Applicative, Applicative2, Applicative3, Applicative2C, Applicative3C, Applicative1 } from './Applicative'
import { Chain, Chain1, Chain2, Chain3, Chain2C, Chain3C } from './Chain'

/** @typeclass */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}

export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}

export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}

export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}

export interface Monad3C<M extends URIS3, U, L> extends Applicative3C<M, U, L>, Chain3C<M, U, L> {}
