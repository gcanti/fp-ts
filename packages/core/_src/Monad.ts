/**
 * `Monad` instances represent type constructors which support sequential composition.
 *
 * Instances must satisfy the following laws in addition to the `Functor`:
 *
 * 1. Associativity: `flow(flatMap(afb), flatMap(bfc)) <-> flatMap(flow(afb, flatMap(bfc)))`
 * 2. Left identity: `of(a) |> flatMap(f) <-> f(a)`
 * 3. Right identity: `fa |> flatMap(of) <-> fa`
 *
 * Note. `Functor`'s `map` can be derived: `map = f => flatMap(flow(f, of))`
 *
 * @since 3.0.0
 */
import type { Flattenable } from '@fp-ts/core/Flattenable'
import type { FromIdentity } from '@fp-ts/core/FromIdentity'
import type { TypeLambda } from '@fp-ts/core/HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Monad<M extends TypeLambda> extends FromIdentity<M>, Flattenable<M> {}
