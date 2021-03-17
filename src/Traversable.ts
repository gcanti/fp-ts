/**
 * `Traversable` represents data structures which can be _traversed_ accumulating results and effects in some
 * `Applicative` functor.
 *
 * - `traverse` runs an action for every element in a data structure, and accumulates the results
 *
 * @since 3.0.0
 */
import {
  Applicative,
  Applicative1,
  Applicative2,
  Applicative2C,
  Applicative3,
  Applicative3C,
  Applicative4
} from './Applicative'
import { flow } from './function'
import { Functor, Functor1, Functor2, Functor2C, Functor3 } from './Functor'
import { HKT, Kind, Kind2, Kind3, Kind4, URIS, URIS2, URIS3, URIS4 } from './HKT'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable<T> extends Functor<T> {
  readonly traverse: Traverse<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable1<T extends URIS> extends Functor1<T> {
  readonly traverse: Traverse1<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable2<T extends URIS2> extends Functor2<T> {
  readonly traverse: Traverse2<T>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable2C<T extends URIS2, E> extends Functor2C<T, E> {
  readonly traverse: Traverse2C<T, E>
}

/**
 * @category type classes
 * @since 3.0.0
 */
export interface Traversable3<T extends URIS3> extends Functor3<T> {
  readonly traverse: Traverse3<T>
}

/**
 * @since 3.0.0
 */
export interface Traverse<T> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: HKT<T, A>) => Kind4<F, S, R, E, HKT<T, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: HKT<T, A>) => Kind3<F, R, E, HKT<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: HKT<T, A>) => Kind2<F, E, HKT<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: HKT<T, A>) => Kind<F, HKT<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: HKT<T, A>) => HKT<F, HKT<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse1<T extends URIS> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, E, B>(
    f: (a: A) => Kind4<F, S, R, E, B>
  ) => (ta: Kind<T, A>) => Kind4<F, S, R, E, Kind<T, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, E, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS3, E>(F: Applicative3C<F, E>): <A, R, B>(
    f: (a: A) => Kind3<F, R, E, B>
  ) => (ta: Kind<T, A>) => Kind3<F, R, E, Kind<T, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, E, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS2, E>(F: Applicative2C<F, E>): <A, B>(
    f: (a: A) => Kind2<F, E, B>
  ) => (ta: Kind<T, A>) => Kind2<F, E, Kind<T, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(f: (a: A) => Kind<F, B>) => (ta: Kind<T, A>) => Kind<F, Kind<T, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind<T, A>) => HKT<F, Kind<T, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2<T extends URIS2> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind4<F, S, R, FE, Kind2<T, TE, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind3<F, R, FE, Kind2<T, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind2<F, FE, Kind2<T, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <TE>(ta: Kind2<T, TE, A>) => Kind<F, Kind2<T, TE, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <TE>(ta: Kind2<T, TE, A>) => HKT<F, Kind2<T, TE, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse2C<T extends URIS2, E> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, R, FE, B>(
    f: (a: A) => Kind4<F, S, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind4<F, S, R, FE, Kind2<T, E, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, R, FE, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, R, B>(
    f: (a: A) => Kind3<F, R, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind3<F, R, FE, Kind2<T, E, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => (ta: Kind2<T, E, A>) => Kind2<F, FE, Kind2<T, E, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (ta: Kind2<T, E, A>) => Kind<F, Kind2<T, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (ta: Kind2<T, E, A>) => HKT<F, Kind2<T, E, B>>
}

/**
 * @since 3.0.0
 */
export interface Traverse3<T extends URIS3> {
  <F extends URIS4>(F: Applicative4<F>): <A, S, FR, FE, B>(
    f: (a: A) => Kind4<F, S, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind4<F, S, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS3>(F: Applicative3<F>): <A, FR, FE, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS3, FE>(F: Applicative3C<F, FE>): <A, FR, B>(
    f: (a: A) => Kind3<F, FR, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind3<F, FR, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2>(F: Applicative2<F>): <A, FE, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <TR, TE>(ta: Kind3<T, TR, TE, A>) => Kind2<F, FE, Kind3<T, TR, TE, B>>
  <F extends URIS2, FE>(F: Applicative2C<F, FE>): <A, B>(
    f: (a: A) => Kind2<F, FE, B>
  ) => <R, TE>(ta: Kind3<T, R, TE, A>) => Kind2<F, FE, Kind3<T, R, TE, B>>
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => <R, E>(ta: Kind3<T, R, E, A>) => Kind<F, Kind3<T, R, E, B>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => <R, E>(ta: Kind3<T, R, E, A>) => HKT<F, Kind3<T, R, E, B>>
}

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * `traverse` composition.
 *
 * @category combinators
 * @since 3.0.0
 */
export function traverse<T extends URIS, G extends URIS>(
  T: Traversable1<T>,
  G: Traversable1<G>
): {
  <F extends URIS>(F: Applicative1<F>): <A, B>(
    f: (a: A) => Kind<F, B>
  ) => (tga: Kind<T, Kind<G, A>>) => Kind<F, Kind<T, Kind<G, B>>>
  <F>(F: Applicative<F>): <A, B>(f: (a: A) => HKT<F, B>) => (tga: Kind<T, Kind<G, A>>) => HKT<F, Kind<T, Kind<G, B>>>
}
export function traverse<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (tga: HKT<T, HKT<G, A>>) => HKT<F, HKT<T, HKT<G, B>>>
export function traverse<T, G>(
  T: Traversable<T>,
  G: Traversable<G>
): <F>(F: Applicative<F>) => <A, B>(f: (a: A) => HKT<F, B>) => (tga: HKT<T, HKT<G, A>>) => HKT<F, HKT<T, HKT<G, B>>> {
  return (F) => flow(G.traverse(F), T.traverse(F))
}
