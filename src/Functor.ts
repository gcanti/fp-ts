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
import type { TypeLambda, Kind, Typeclass } from './HKT'
import * as tuple from './tuple'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Functor<λ extends TypeLambda> extends Typeclass<λ> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, B>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  <λ extends TypeLambda>(Functorλ: Functor<λ>) =>
  <A>(a: A): (<S, R, O, E, B>(self: Kind<λ, S, R, O, E, (a: A) => B>) => Kind<λ, S, R, O, E, B>) =>
    Functorλ.map(apply(a))

/**
 * `map` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export const getMapComposition =
  <λ extends TypeLambda, μ extends TypeLambda>(
    Functorλ: Functor<λ>,
    Functorμ: Functor<μ>
  ): (<A, B>(
    f: (a: A) => B
  ) => <λS, λR, λO, λE, μS, μR, μO, μE>(
    self: Kind<λ, λS, λR, λO, λE, Kind<μ, μS, μR, μO, μE, A>>
  ) => Kind<λ, λS, λR, λO, λE, Kind<μ, μS, μR, μO, μE, B>>) =>
  (f) =>
    Functorλ.map(Functorμ.map(f))

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const bindTo =
  <λ extends TypeLambda>(Functorλ: Functor<λ>) =>
  <N extends string>(
    name: N
  ): (<S, R, O, E, A>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, { readonly [K in N]: A }>) =>
    Functorλ.map((a) => ({ [name]: a } as any))

/**
 * @since 3.0.0
 */
export const tupled = <λ extends TypeLambda>(
  Functorλ: Functor<λ>
): (<S, R, O, E, A>(self: Kind<λ, S, R, O, E, A>) => Kind<λ, S, R, O, E, readonly [A]>) => Functorλ.map(tuple.tuple)

const let_ = <λ extends TypeLambda>(
  Functorλ: Functor<λ>
): (<N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, O, E>(
  self: Kind<λ, S, R, O, E, A>
) => Kind<λ, S, R, O, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) => {
  return (name, f) => Functorλ.map((a) => Object.assign({}, a, { [name]: f(a) }) as any)
}

export {
  /**
   * @since 3.0.0
   */
  let_ as let
}
