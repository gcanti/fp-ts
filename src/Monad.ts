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
import type { Chain } from './Chain'
import { HKT } from './HKT'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Monad<M extends HKT> extends Pointed<M>, Chain<M> {}
