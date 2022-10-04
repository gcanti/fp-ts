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
 * Returns a default `mapLeft` implementation.
 *
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
