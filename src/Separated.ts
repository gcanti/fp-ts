/**
 * @since 3.0.0
 */
import { Bifunctor as Bifunctor_, mapDefault, mapLeftDefault } from './Bifunctor'
import { flap as flap_, Functor as Functor_ } from './Functor'
import { HKT } from './HKT'

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
export const bimap: Bifunctor_<SeparatedF>['bimap'] = (f, g) => (fa) => separated(f(left(fa)), g(right(fa)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: Bifunctor_<SeparatedF>['mapLeft'] =
  /*#__PURE__*/
  mapLeftDefault<SeparatedF>(bimap)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface SeparatedF extends HKT {
  readonly type: Separated<this['E'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: Bifunctor_<SeparatedF> = {
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
export const map: Functor_<SeparatedF>['map'] =
  /*#__PURE__*/
  mapDefault<SeparatedF>(Bifunctor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<SeparatedF> = {
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
