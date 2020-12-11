/**
 * @since 2.0.0
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'

/**
 * @since 2.0.0
 */
export interface TraversableWithIndex<T, I> {
  readonly URI: T
  readonly traverseWithIndex: TraverseWithIndex<T, I>
}

/**
 * @since 2.0.0
 */
export interface TraversableWithIndex1<T extends URIS, I> {
  readonly URI: T
  readonly traverseWithIndex: TraverseWithIndex1<T, I>
}

/**
 * @since 2.0.0
 */
export interface TraversableWithIndex2<T extends URIS2, I> {
  readonly URI: T
  readonly traverseWithIndex: TraverseWithIndex2<T, I>
}

/**
 * @since 2.0.0
 */
export interface TraversableWithIndex2C<T extends URIS2, I, E> {
  readonly URI: T
  readonly traverseWithIndex: TraverseWithIndex2C<T, I, E>
}

/**
 * @since 2.0.0
 */
export interface TraverseWithIndex<T, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (i: I, a: A) => Kind<F, B>) => (ta: HKT<T, A>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => (ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}

/**
 * @since 2.0.0
 */
export interface TraverseWithIndex1<T extends URIS, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (i: I, a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}

/**
 * @since 2.0.0
 */
export interface TraverseWithIndex2<T extends URIS2, I> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (i: I, a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => <TE>(ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}

/**
 * @since 2.0.0
 */
export interface TraverseWithIndex2C<T extends URIS2, I, E> {
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (i: I, a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS3>(F: Applicative3C<F, E>): <A, R, B>(
    f: (i: I, a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, E, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (i: I, a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2C<F, E>): <A, B>(
    f: (i: I, a: A) => Kind2<F, E, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, E, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (i: I, a: A) => Kind<F, B>
  ) => (ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (i: I, a: A) => HKT<F, B>) => (ta: Kind2<T, E, A>) => HKT<F, Kind2<T, E, B>>
}
