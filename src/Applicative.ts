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
 * 1. Identity: `A.ap(A.of(a => a), fa) <-> fa`
 * 2. Homomorphism: `A.ap(A.of(ab), A.of(a)) <-> A.of(ab(a))`
 * 3. Interchange: `A.ap(fab, A.of(a)) <-> A.ap(A.of(ab => ab(a)), fab)`
 *
 * Note. `Functor`'s `map` can be derived: `A.map(x, f) = A.ap(A.of(f), x)`
 *
 * @since 3.0.0
 */
import { Apply, Apply1, Apply2, Apply2C, Apply3, Apply3C, Apply4 } from './Apply'
import { URIS, URIS2, URIS3, URIS4 } from './HKT'
import { Pointed, Pointed1, Pointed2, Pointed2C, Pointed3, Pointed3C, Pointed4 } from './Pointed'

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative<F> extends Apply<F>, Pointed<F> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative1<F extends URIS> extends Apply1<F>, Pointed1<F> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative2<F extends URIS2> extends Apply2<F>, Pointed2<F> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative2C<F extends URIS2, E> extends Apply2C<F, E>, Pointed2C<F, E> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative3<F extends URIS3> extends Apply3<F>, Pointed3<F> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative3C<F extends URIS3, E> extends Apply3C<F, E>, Pointed3C<F, E> {}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Applicative4<F extends URIS4> extends Apply4<F>, Pointed4<F> {}
