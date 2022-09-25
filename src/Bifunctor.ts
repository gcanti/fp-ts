/**
 * @since 3.0.0
 */
import { identity } from './function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor<F extends TypeLambda> extends TypeClass<F> {
  readonly mapBoth: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R, W>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, G, B>
}
// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Returns a default `mapLeft` implementation from `mapBoth`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const getDefaultMapLeft =
  <F extends TypeLambda>(
    mapBoth: Bifunctor<F>['mapBoth']
  ): (<E, G>(f: (e: E) => G) => <S, R, W, A>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, G, A>) =>
  <E, G>(f: (e: E) => G): (<S, R, W, A>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, G, A>) =>
    mapBoth(f, identity)

/**
 * Returns a default `map` implementation from `mapBoth`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const getDefaultMap =
  <F extends TypeLambda>(mapBoth: Bifunctor<F>['mapBoth']): Functor<F>['map'] =>
  <A, B>(f: (a: A) => B): (<S, R, W, E>(self: Kind<F, S, R, W, E, A>) => Kind<F, S, R, W, E, B>) =>
    mapBoth(identity, f)
