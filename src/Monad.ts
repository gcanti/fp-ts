import { URIS, URIS2, URIS3 } from './HKT'
import { Applicative, Applicative2, Applicative3, Applicative2C, Applicative3C, Applicative1 } from './Applicative'
import { Chain, Chain1, Chain2, Chain3, Chain2C, Chain3C } from './Chain'

/**
 * The `Monad` type class combines the operations of the `Bind` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the `Applicative` and `Bind` laws:
 *
 * 1. Left identity: `M.chain(f, M.of(a)) <-> f(a)`
 * 2. Right identity: `M.chain(M.of, u) <-> u`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = (f, u) => A.chain(x => A.of(f(x)), u)`
 *
 * @typeclass
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}

export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}

export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}

export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}

export interface Monad3C<M extends URIS3, U, L> extends Applicative3C<M, U, L>, Chain3C<M, U, L> {}
