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
import { apply } from './function'
import type { HKT, Kind, Typeclass } from './HKT'
import * as tuple from './tuple'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor<F extends HKT> extends Typeclass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, W, E>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  <F extends HKT>(F: Functor<F>) =>
  <A>(a: A): (<S, R, W, E, B>(fab: Kind<F, S, R, W, E, (a: A) => B>) => Kind<F, S, R, W, E, B>) =>
    F.map(apply(a))

/**
 * `map` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const map =
  <F extends HKT, G extends HKT>(
    F: Functor<F>,
    G: Functor<G>
  ): (<A, B>(
    f: (a: A) => B
  ) => <FS, FR, FW, FE, GS, GR, GW, GE>(
    fga: Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, A>>
  ) => Kind<F, FS, FR, FW, FE, Kind<G, GS, GR, GW, GE, B>>) =>
  (f) =>
    F.map(G.map(f))

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo =
  <F extends HKT>(F: Functor<F>) =>
  <N extends string>(
    name: N
  ): (<S, R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, { readonly [K in N]: A }>) =>
    F.map((a) => ({ [name]: a } as any))

/**
 * @since 3.0.0
 */
export const tupled = <F extends HKT>(
  F: Functor<F>
): (<S, R, W, E, A>(fa: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, readonly [A]>) => F.map(tuple.tuple)

const let_ = <F extends HKT>(
  F: Functor<F>
): (<N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, W, E>(
  fa: Kind<F, S, R, W, E, A>
) => Kind<F, S, R, W, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) => {
  return (name, f) => F.map((a) => Object.assign({}, a, { [name]: f(a) }) as any)
}

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}
