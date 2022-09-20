/**
 * @since 3.0.0
 */
import * as bifunctor from './Bifunctor'
import * as functor from './Functor'
import type { HKT } from './HKT'

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
export const bimap: <E, G, A, B>(f: (e: E) => G, g: (a: A) => B) => (fea: Separated<E, A>) => Separated<G, B> =
  (f, g) => (fa) =>
    separated(f(left(fa)), g(right(fa)))

/**
 * Map a function over the first type argument of a bifunctor.
 *
 * @category Bifunctor
 * @since 3.0.0
 */
export const mapLeft: <E, G>(f: (e: E) => G) => <A>(fea: Separated<E, A>) => Separated<G, A> =
  /*#__PURE__*/ bifunctor.mapLeftDefault<SeparatedF>(bimap)

// -------------------------------------------------------------------------------------
// HKT
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface SeparatedF extends HKT {
  readonly type: Separated<this['Covariant2'], this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Bifunctor: bifunctor.Bifunctor<SeparatedF> = {
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
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Separated<E, A>) => Separated<E, B> =
  /*#__PURE__*/ bifunctor.mapDefault<SeparatedF>(bimap)

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<SeparatedF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <E, B>(fab: Separated<E, (a: A) => B>) => Separated<E, B> =
  /*#__PURE__*/ functor.flap(Functor)

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
