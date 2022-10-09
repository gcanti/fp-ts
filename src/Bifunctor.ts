/**
 * @since 3.0.0
 */
import { identity } from './Function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'

/**
 * @category model
 * @since 3.0.0
 */
export interface Bifunctor<F extends TypeLambda> extends TypeClass<F> {
  readonly mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, O>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, B>
}

/**
 * @since 3.0.0
 */
export const mapLeft =
  <F extends TypeLambda>(
    Bifunctor: Bifunctor<F>
  ): (<E, G>(f: (e: E) => G) => <S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
  <E, G>(f: (e: E) => G): (<S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
    Bifunctor.mapBoth(f, identity)

/**
 * Returns a default `map` implementation.
 *
 * @since 3.0.0
 */
export const map =
  <F extends TypeLambda>(Bifunctor: Bifunctor<F>): Functor<F>['map'] =>
  <A, B>(f: (a: A) => B): (<S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) =>
    Bifunctor.mapBoth(identity, f)

/**
 * Returns a default `mapBoth` composition.
 *
 * @since 3.0.0
 */
export const mapBothComposition =
  <F extends TypeLambda, G extends TypeLambda>(FunctorF: Functor<F>, BifunctorG: Bifunctor<G>) =>
  <GE, GG, A, B>(
    f: (e: GE) => GG,
    g: (a: A) => B
  ): (<FS, FR, FO, FE, GS, GR, GO>(
    self: Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GE, A>>
  ) => Kind<F, FS, FR, FO, FE, Kind<G, GS, GR, GO, GG, B>>) =>
    FunctorF.map(BifunctorG.mapBoth(f, g))
