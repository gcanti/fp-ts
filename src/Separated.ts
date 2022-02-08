/**
 * @since 3.0.0
 */
import { Bifunctor2, map as map_, mapLeftDefault } from './Bifunctor'
import { flap as flap_, Functor2 } from './Functor'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
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
 * @since 3.0.0
 */
export const separated = <E, A>(left: E, right: A): Separated<E, A> => ({ left, right })

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * Map a pair of functions over the two type arguments of the bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const bimap: Bifunctor2<URI>['bimap'] = (f, g) => (fa) => separated(f(left(fa)), g(right(fa)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor2<URI>['mapLeft'] =
  /*#__PURE__*/
  mapLeftDefault<URI>(bimap)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Separated'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Separated: Separated<E, A>
  }
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor2<URI> = {
  bimap,
  mapLeft
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] =
  /*#__PURE__*/
  map_<URI>(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor2<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#__PURE__*/
  flap_(Functor)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const left = <E, A>(s: Separated<E, A>): E => s.left

/**
 * @since 3.0.0
 */
export const right = <E, A>(s: Separated<E, A>): A => s.right
