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
import type { Kind, TypeLambda } from '../HKT'
import type { Alternative } from './Alternative'
import * as flattenable from './Flattenable'
import type { FromIdentity } from './FromIdentity'

/**
 * @category model
 * @since 3.0.0
 */
export interface Monad<F extends TypeLambda> extends FromIdentity<F>, flattenable.Flattenable<F> {}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard =
  <F extends TypeLambda>(Monad: Monad<F>, Alternative: Alternative<F>) =>
  <A, S, R2, O2, E2>(
    f: (a: A) => boolean
  ): (<R1, O1, E1>(self: Kind<F, S, R1, O1, E1, A>) => Kind<F, S, R1 & R2, O1 | O2, E1 | E2, A>) =>
    flattenable.tap(Monad)((a) => (f(a) ? Monad.of(undefined) : Alternative.none()))
