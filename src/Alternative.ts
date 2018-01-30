import { URIS, URIS2, URIS3 } from './HKT'
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative'
import { Plus, Plus1, Plus2, Plus3, Plus2C, Plus3C } from './Plus'

/** @typeclass */
export interface Alternative<F> extends Applicative<F>, Plus<F> {}

export interface Alternative1<F extends URIS> extends Applicative1<F>, Plus1<F> {}

export interface Alternative2<F extends URIS2> extends Applicative2<F>, Plus2<F> {}

export interface Alternative3<F extends URIS3> extends Applicative3<F>, Plus3<F> {}

export interface Alternative2C<F extends URIS2, L> extends Applicative2C<F, L>, Plus2C<F, L> {}

export interface Alternative3C<F extends URIS3, U, L> extends Applicative3C<F, U, L>, Plus3C<F, U, L> {}
