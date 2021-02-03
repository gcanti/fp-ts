/**
 * ```ts
 * interface Separated<A, B> {
 *    readonly left: A
 *    readonly right: B
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */

import { pipe } from './function'
import { Functor2 } from './Functor'
import { Bifunctor2 } from './Bifunctor'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * A `Separated` type which holds `left` and `right` parts.
 *
 * @category type classes
 * @since 2.10.0
 */
export interface Separated<A, B> {
  readonly left: A
  readonly right: B
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export const separated = <A, B>(left: A, right: B): Separated<A, B> => ({ left, right })

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const map_: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))

const mapLeft_: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))

const bimap_: Bifunctor2<URI>['bimap'] = (fa, g, f) => pipe(fa, bimap(g, f))

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map = <B, C>(f: (b: B) => C) => <A>(fa: Separated<A, B>): Separated<A, C> =>
  separated(fa.left, f(fa.right))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
export const mapLeft = <A, B>(f: (a: A) => B) => <C>(fa: Separated<A, C>): Separated<B, C> =>
  separated(f(fa.left), fa.right)

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
export const bimap = <A, B, C, D>(g: (A: A) => B, f: (c: C) => D) => (fa: Separated<A, C>): Separated<B, D> =>
  separated(g(fa.left), f(fa.right))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.10.0
 */
export const URI = 'Separated'

/**
 * @category instances
 * @since 2.10.0
 */
export type URI = typeof URI

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly [URI]: Separated<E, A>
  }
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  URI,
  mapLeft: mapLeft_,
  bimap: bimap_
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: map_
}
