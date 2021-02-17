/**
 * @since 3.0.0
 */
import { Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import { HKT, HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor<P> {
  readonly URI?: P
  readonly map: <A, B>(f: (a: A) => B) => <E>(pea: HKT2<P, E, A>) => HKT<P, B>
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: HKT2<P, E, A>) => HKT2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor2<P extends URIS2> extends Functor2<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor2C<P extends URIS2, E> extends Functor2C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => (pea: Kind2<P, E, A>) => Kind2<P, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor3<P extends URIS3> extends Functor3<P> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor3C<P extends URIS3, E> extends Functor3C<P, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(pea: Kind3<P, R, E, A>) => Kind3<P, R, D, B>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Profunctor4<P extends URIS4> extends Functor4<P> {
  readonly promap: <D, E, A, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => <S, R>(pea: Kind4<P, S, R, E, A>) => Kind4<P, S, R, D, B>
}
