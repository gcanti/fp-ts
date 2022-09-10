/**
 * @since 3.0.0
 */
import { identity } from './function'
import type { Functor } from './Functor'
import type { HKT, Kind, Typeclass } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor<F extends HKT> extends Typeclass<F> {
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, A>
}
// -------------------------------------------------------------------------------------
// defaults
// -------------------------------------------------------------------------------------

/**
 * Return a default `mapLeft` implementation from `bimap`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const mapLeftDefault = <F extends HKT>(bimap: Bifunctor<F>['bimap']): Bifunctor<F>['mapLeft'] => <E, G>(
  f: (e: E) => G
): (<S, R, A>(fea: Kind<F, S, R, E, A>) => Kind<F, S, R, G, A>) => bimap(f, identity)

/**
 * Return a default `map` implementation from `bimap`.
 *
 * @category defaults
 * @since 3.0.0
 */
export const mapDefault = <F extends HKT>(B: Bifunctor<F>): Functor<F>['map'] => <A, B>(
  f: (a: A) => B
): (<S, R, E>(fa: Kind<F, S, R, E, A>) => Kind<F, S, R, E, B>) => B.bimap(identity, f)
