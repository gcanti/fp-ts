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
import { apply, constant } from '@fp-ts/core/Function'
import type { Kind, TypeClass, TypeLambda } from '@fp-ts/core/HKT'
import * as tuple from '@fp-ts/core/tuple'

/**
 * @category model
 * @since 3.0.0
 */
export interface Functor<F extends TypeLambda> extends TypeClass<F> {
  readonly map: <A, B>(f: (a: A) => B) => <S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>
}

/**
 * Returns a default `map` composition.
 *
 * @since 3.0.0
 */
export const mapComposition = <F extends TypeLambda, G extends TypeLambda>(
  FunctorF: Functor<F>,
  FunctorG: Functor<G>
): (<A, B>(
  f: (a: A) => B
) => <FS, FR, FO, FE, GS, GR, GO, GE>(
  self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, B>>) => (f) => FunctorF.map(FunctorG.map(f))

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap = <F extends TypeLambda>(Functor: Functor<F>) =>
  <A>(a: A): (<S, R, O, E, B>(self: Kind<F, S, R, O, E, (a: A) => B>) => Kind<F, S, R, O, E, B>) =>
    Functor.map(apply(a))

/**
 * @category mapping
 * @since 3.0.0
 */
export const as = <F extends TypeLambda>(Functor: Functor<F>) =>
  <B>(b: B): (<S, R, O, E>(self: Kind<F, S, R, O, E, unknown>) => Kind<F, S, R, O, E, B>) => Functor.map(constant(b))

/**
 * @category mapping
 * @since 3.0.0
 */
export const unit = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E>(self: Kind<F, S, R, O, E, unknown>) => Kind<F, S, R, O, E, void>) => as(Functor)(undefined)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo = <F extends TypeLambda>(Functor: Functor<F>) =>
  <N extends string>(
    name: N
  ): (<S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, { readonly [K in N]: A }>) =>
    Functor.map((a) => ({ [name]: a } as any))

const let_ = <F extends TypeLambda>(
  F: Functor<F>
): (<N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => <S, R, O, E>(
  self: Kind<F, S, R, O, E, A>
) => Kind<F, S, R, O, E, { readonly [K in keyof A | N]: K extends keyof A ? A[K] : B }>) => {
  return (name, f) => F.map((a) => Object.assign({}, a, { [name]: f(a) }) as any)
}

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled = <F extends TypeLambda>(
  Functor: Functor<F>
): (<S, R, O, E, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, readonly [A]>) => Functor.map(tuple.tuple)
