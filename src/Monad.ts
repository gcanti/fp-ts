/**
 * The `Monad` type class combines the operations of the `Chain` and
 * `Applicative` type classes. Therefore, `Monad` instances represent type
 * constructors which support sequential composition, and also lifting of
 * functions of arbitrary arity.
 *
 * Instances must satisfy the following laws in addition to the `Applicative` and `Chain` laws:
 *
 * 1. Left identity: `M.chain(M.of(a), f) = f(a)`
 * 2. Right identity: `M.chain(fa, M.of) = fa`
 *
 * Note. `Functor`'s `map` can be derived: `A.map = (fa, f) => A.chain(fa, a => A.of(f(a)))`
 *
 * See [Getting started with fp-ts: Monad](https://dev.to/gcanti/getting-started-with-fp-ts-monad-6k)
 *
 * @since 2.0.0
 */
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative4,
  Applicative3C
} from './Applicative'
import { Chain, Chain1, Chain2, Chain2C, Chain3, Chain4, Chain3C } from './Chain'
import { URIS, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @since 2.0.0
 */
export interface Monad<F> extends Applicative<F>, Chain<F> {}

/**
 * @since 2.0.0
 */
export interface Monad1<F extends URIS> extends Applicative1<F>, Chain1<F> {}

/**
 * @since 2.0.0
 */
export interface Monad2<M extends URIS2> extends Applicative2<M>, Chain2<M> {}

/**
 * @since 2.0.0
 */
export interface Monad2C<M extends URIS2, L> extends Applicative2C<M, L>, Chain2C<M, L> {}

/**
 * @since 2.0.0
 */
export interface Monad3<M extends URIS3> extends Applicative3<M>, Chain3<M> {}

/**
 * @since 2.2.0
 */
export interface Monad3C<M extends URIS3, E> extends Applicative3C<M, E>, Chain3C<M, E> {}

/**
 * @since 2.0.0
 */
export interface Monad4<M extends URIS4> extends Applicative4<M>, Chain4<M> {}
