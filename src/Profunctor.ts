/**
 * @since 2.0.0
 */
import { Functor2, Functor2C, Functor3, Functor4, Functor3C } from './Functor'
import { HKT, HKT2, Kind2, Kind3, Kind4, URIS2, URIS3, URIS4 } from './HKT'

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor<F> {
  readonly URI: F
  readonly map: <A, B>(f: (a: A) => B) => <E>(fea: HKT2<F, E, A>) => HKT<F, B>
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (fea: HKT2<F, E, A>) => HKT2<F, D, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor2<F extends URIS2> extends Functor2<F> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, D, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor2C<F extends URIS2, E> extends Functor2C<F, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => (fea: Kind2<F, E, A>) => Kind2<F, D, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor3<F extends URIS3> extends Functor3<F> {
  readonly promap: <D, E, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}

/**
 * @category type classes
 * @since 2.2.0
 */
export interface Profunctor3C<F extends URIS3, E> extends Functor3C<F, E> {
  readonly promap: <D, A, B>(f: (d: D) => E, g: (a: A) => B) => <R>(fea: Kind3<F, R, E, A>) => Kind3<F, R, D, B>
}

/**
 * @category type classes
 * @since 2.0.0
 */
export interface Profunctor4<F extends URIS4> extends Functor4<F> {
  readonly promap: <D, E, A, B>(
    f: (d: D) => E,
    g: (a: A) => B
  ) => <S, R>(fea: Kind4<F, S, R, E, A>) => Kind4<F, S, R, D, B>
}
