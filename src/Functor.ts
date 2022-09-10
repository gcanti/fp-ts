/**
 * A `Functor` is a type constructor which supports a mapping operation `map`.
 *
 * `map` can be used to turn functions `A -> B` into functions `F<A> -> F<B>` whose argument and return types use the type
 * constructor `F` to represent some computational context.
 *
 * Instances must satisfy the following laws:
 *
 * 1. Identity: `map(identity) <-> identity`
 * 2. Composition: `map(flow(ab, bc)) <-> flow(map(ab), map(bc))`
 *
 * @since 3.0.0
 */
import { apply, flow } from './function'
import type { HKT, Typeclass, Kind, ComposeF } from './HKT'
import { tuple } from './tuple'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor<F extends HKT> extends Typeclass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const flap = <F extends HKT>(F: Functor<F>) => <A>(
  a: A
): (<S, R, E, B>(fab: Kind<F, S, R, E, (a: A) => B>) => Kind<F, S, R, E, B>) => F.map(apply(a))

/**
 * `map` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const map = <F extends HKT, G extends HKT>(F: Functor<F>, G: Functor<G>): Functor<ComposeF<F, G>>['map'] =>
  flow(G.map, F.map)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo = <F extends HKT>(F: Functor<F>) => <N extends string>(
  name: N
): (<S, R, E, A>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, { readonly [K in N]: A }>) =>
  F.map((a) => ({ [name]: a } as any))

/**
 * @since 3.0.0
 */
export const tupled = <F extends HKT>(
  F: Functor<F>
): (<S, R, E, A>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, readonly [A]>) => F.map(tuple)
