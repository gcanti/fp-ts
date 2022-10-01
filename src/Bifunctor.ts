/**
 * @since 3.0.0
 */
import { identity } from './Function'
import type { Functor } from './Functor'
import type { TypeLambda, Kind, TypeClass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

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
  ): (<E, G>(f: (e: E) => G) => <S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
  <E, G>(f: (e: E) => G): (<S, R, O, A>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, G, A>) =>
    mapBoth(f, identity)

/**
 * Returns a default `map` implementation from `mapBoth`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const getDefaultMap =
  <F extends TypeLambda>(mapBoth: Bifunctor<F>['mapBoth']): Functor<F>['map'] =>
  <A, B>(f: (a: A) => B): (<S, R, O, E>(self: Kind<F, S, R, O, E, A>) => Kind<F, S, R, O, E, B>) =>
    mapBoth(identity, f)
