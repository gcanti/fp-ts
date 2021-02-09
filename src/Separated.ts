/**
 * ```ts
 * interface Separated<E, A> {
 *    readonly left: E
 *    readonly right: A
 * }
 * ```
 *
 * Represents a result of separating a whole into two parts.
 *
 * @since 2.10.0
 */

import { pipe } from './function'
import { flap as flap_, Functor2 } from './Functor'
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
export interface Separated<E, A> {
  readonly left: E
  readonly right: A
}

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * @category constructors
 * @since 2.10.0
 */
export const separated = <E, A>(left: E, right: A): Separated<E, A> => ({ left, right })

// -------------------------------------------------------------------------------------
// non-pipeables
// -------------------------------------------------------------------------------------

const _map: Functor2<URI>['map'] = (fa, f) => pipe(fa, map(f))
const _mapLeft: Bifunctor2<URI>['mapLeft'] = (fa, f) => pipe(fa, mapLeft(f))
const _bimap: Bifunctor2<URI>['bimap'] = (fa, g, f) => pipe(fa, bimap(g, f))

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 2.10.0
 */
export const map = <A, B>(f: (a: A) => B) => <E>(fa: Separated<E, A>): Separated<E, B> =>
  separated(left(fa), f(right(fa)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
export const mapLeft = <E, G>(f: (e: E) => G) => <A>(fa: Separated<E, A>): Separated<G, A> =>
  separated(f(left(fa)), right(fa))

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 2.10.0
 */
export const bimap = <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fa: Separated<E, A>): Separated<G, B> =>
  separated(f(left(fa)), g(right(fa)))

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
  mapLeft: _mapLeft,
  bimap: _bimap
}

/**
 * @category instances
 * @since 2.10.0
 */
export const Functor: Functor2<URI> = {
  URI,
  map: _map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 2.10.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 2.10.0
 */
export const left = <E, A>(s: Separated<E, A>): E => s.left

/**
 * @since 2.10.0
 */
export const right = <E, A>(s: Separated<E, A>): A => s.right
