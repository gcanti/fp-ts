/**
 * The `Applicative` type class extends the `Apply` type class with a `of` function, which can be used to create values
 * of type `f a` from values of type `a`.
 *
 * Where `Apply` provides the ability to lift functions of two or more arguments to functions whose arguments are
 * wrapped using `f`, and `Functor` provides the ability to lift functions of one argument, `pure` can be seen as the
 * function which lifts functions of _zero_ arguments. That is, `Applicative` functors support a lifting operation for
 * any number of function arguments.
 *
 * Instances must satisfy the following laws in addition to the `Apply` laws:
 *
 * 1. Identity: `of(identity) |> ap(fa) <-> fa`
 * 2. Homomorphism: `of(ab) |> ap(a) <-> of(ab(a))`
 * 3. Interchange: `fab |> ap(of(a)) <-> of(ab => ab(a)) |> ap(fab)`
 *
 * Note. `Functor`'s `map` can be derived: `map = f => fa => of(f) |> ap(fa)`
 *
 * @since 3.0.0
 */
import * as apply from './Apply'
import type { Apply } from './Apply'
import type { TypeLambda, Kind } from './HKT'
import type { Monoid } from './Monoid'
import type { FromIdentity } from './FromIdentity'

/**
 * @category model
 * @since 3.0.0
 */
export interface Applicative<F extends TypeLambda> extends Apply<F>, FromIdentity<F> {}

/**
 * Lift a monoid into 'F', the inner values are combined using the provided `Monoid`.
 *
 * @since 3.0.0
 */
export const getApplicativeMonoid = <F extends TypeLambda>(Applicative: Applicative<F>) => {
  const getApplySemigroup = apply.getApplySemigroup(Applicative)
  return <A, S, R, O, E>(Monoid: Monoid<A>): Monoid<Kind<F, S, R, O, E, A>> => {
    return {
      combine: getApplySemigroup<A, S, R, O, E>(Monoid).combine,
      empty: Applicative.of(Monoid.empty)
    }
  }
}
