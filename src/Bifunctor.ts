/**
 * @since 2.0.0
 */
import { HKT2, Kind2, Kind3, URIS2, URIS3, URIS4, Kind4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor<F> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: HKT2<F, E, A>) => HKT2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: HKT2<F, E, A>) => HKT2<F, G, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor2<F extends URIS2> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Kind2<F, E, A>) => Kind2<F, G, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor2C<F extends URIS2, E> {
  readonly URI: F
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <A>(fea: Kind2<F, E, A>) => Kind2<F, G, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor3<F extends URIS3> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Bifunctor3C<F extends URIS3, E> {
  readonly URI: F
  readonly bimap: <G, A, B>(f: (e: E) => G, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, B>
  readonly mapLeft: <G>(f: (e: E) => G) => <R, A>(fea: Kind3<F, R, E, A>) => Kind3<F, R, G, A>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Bifunctor4<F extends URIS4> {
  readonly URI: F
  readonly bimap: <E, G, A, B>(
    f: (e: E) => G,
    g: (a: A) => B
  ) => <S, R>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, B>
  readonly mapLeft: <E, G>(f: (e: E) => G) => <S, R, A>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, G, A>
}
