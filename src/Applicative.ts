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
import { Apply, getApplySemigroup } from './Apply'
import type { HKT, Kind } from './HKT'
import type { Monoid } from './Monoid'
import type { Pointed } from './Pointed'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative<F extends HKT> extends Apply<F>, Pointed<F> {}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Lift a monoid into 'F', the inner values are concatenated using the provided `Monoid`.
 *
 * @since 3.0.0
 */
export const getApplicativeMonoid = <F extends HKT>(
  F: Applicative<F>
): (<A, S, R, W, E>(M: Monoid<A>) => Monoid<Kind<F, S, R, W, E, A>>) => {
  const f = getApplySemigroup(F)
  return <A, S, R, W, E>(M: Monoid<A>): Monoid<Kind<F, S, R, W, E, A>> => {
    return {
      concat: f<A, S, R, W, E>(M).concat,
      empty: F.of(M.empty)
    }
  }
}
