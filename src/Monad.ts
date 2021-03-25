/**
 * `Monad` instances represent type constructors which support sequential composition.
 *
 * Instances must satisfy the following laws in addition to the `Functor`:
 *
 * 1. Associativity: `flow(chain(afb), chain(bfc)) <-> chain(flow(afb, chain(bfc)))`
 * 2. Left identity: `of(a) |> chain(f) <-> f(a)`
 * 3. Right identity: `fa |> chain(of) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `map = f => chain(flow(f, of))`
 *
 * @since 3.0.0
 */
import type { Chain, Chain1, Chain2, Chain2C, Chain3, Chain3C, Chain4 } from './Chain'
import type { URIS, URIS2, URIS3, URIS4 } from './HKT'
import type { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad<M> extends Pointed<M>, Chain<M> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad1<M extends URIS> extends Pointed1<M>, Chain1<M> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad2<M extends URIS2> extends Pointed2<M>, Chain2<M> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad2C<M extends URIS2, E> extends Pointed2C<M, E>, Chain2C<M, E> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad3<M extends URIS3> extends Pointed3<M>, Chain3<M> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad3C<M extends URIS3, E> extends Pointed3C<M, E>, Chain3C<M, E> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad4<M extends URIS4> extends Pointed4<M>, Chain4<M> {}
