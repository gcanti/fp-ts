/**
 * @since 3.0.0
 */
import { identity } from './function'
import type { Functor, Functor2, Functor2C, Functor3, Functor3C, Functor4 } from './Functor'
import type { HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor<F> {
  readonly URI?: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT2<F, E, A>) => HKT2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: HKT2<F, E, A>) => HKT2<F, G, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor2<F extends URIS2> {
  readonly URI?: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <E, G, A>(f: (e: E) => G) => (fea: Kind2<F, E, A>) => Kind2<F, G, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor2C<F extends URIS2, E> {
  readonly URI?: F
  readonly _E?: E
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <A>(fea: Kind2<F, E, A>) => Kind2<F, G, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor3<F extends URIS3> {
  readonly URI?: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor3C<F extends URIS3, E> {
  readonly URI?: F
  readonly _E?: E
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Bifunctor4<F extends URIS4> {
  readonly URI?: F
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, A>
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
export function mapLeftDefault<F extends URIS4>(bimap: Bifunctor4<F>['bimap']): Bifunctor4<F>['mapLeft']
export function mapLeftDefault<F extends URIS3>(bimap: Bifunctor3<F>['bimap']): Bifunctor3<F>['mapLeft']
export function mapLeftDefault<F extends URIS3, E>(bimap: Bifunctor3C<F, E>['bimap']): Bifunctor3C<F, E>['mapLeft']
export function mapLeftDefault<F extends URIS2>(bimap: Bifunctor2<F>['bimap']): Bifunctor2<F>['mapLeft']
export function mapLeftDefault<F extends URIS2, E>(bimap: Bifunctor2C<F, E>['bimap']): Bifunctor2C<F, E>['mapLeft']
export function mapLeftDefault<F>(bimap: Bifunctor<F>['bimap']): Bifunctor<F>['mapLeft']
export function mapLeftDefault<F>(bimap: Bifunctor<F>['bimap']): Bifunctor<F>['mapLeft'] {
  return (f) => bimap(f, identity)
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export function map<F extends URIS4>(B: Bifunctor4<F>): Functor4<F>['map']
export function map<F extends URIS3>(B: Bifunctor3<F>): Functor3<F>['map']
export function map<F extends URIS3, E>(B: Bifunctor3C<F, E>): Functor3C<F, E>['map']
export function map<F extends URIS2>(B: Bifunctor2<F>): Functor2<F>['map']
export function map<F extends URIS2, E>(B: Bifunctor2C<F, E>): Functor2C<F, E>['map']
export function map<F>(B: Bifunctor<F>): Functor<F>['map']
export function map<F extends URIS2>(B: Bifunctor2<F>): Functor2<F>['map'] {
  return (f) => B.bimap(identity, f)
}
