/**
 * @since 3.0.0
 */
import type { Comonad2C } from './Comonad'
import { flap as flap_, Functor2 } from './Functor'
import type { Monoid } from './Monoid'

// -------------------------------------------------------------------------------------
// model
// -------------------------------------------------------------------------------------

/**
 * @category model
 * @since 3.0.0
 */
export interface Traced<P, A> {
  (p: P): A
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor2<URI>['map'] = (f) => (fa) => (p) => f(fa(p))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export type URI = 'Traced'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Traced: Traced<E, A>
  }
}

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

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <P>(monoid: Monoid<P>): Comonad2C<URI, P> => ({
  map,
  extend: (f) => (wa) => (p1) => f((p2) => wa(monoid.concat(p2)(p1))),
  extract: (wa) => wa(monoid.empty)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 3.0.0
 */
export const tracks = <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (wa: Traced<P, A>): A => wa(f(wa(M.empty)))

/**
 * Get the current position.
 *
 * @since 3.0.0
 */
export const listen = <P, A>(wa: Traced<P, A>): Traced<P, readonly [A, P]> => (p) => [wa(p), p]

/**
 * Get a value which depends on the current position.
 *
 * @since 3.0.0
 */
export const listens = <P, B>(f: (p: P) => B) => <A>(wa: Traced<P, A>): Traced<P, readonly [A, B]> => (p) => [
  wa(p),
  f(p)
]

/**
 * Apply a function to the current position.
 *
 * @since 3.0.0
 */
export const censor = <P>(f: (p: P) => P) => <A>(wa: Traced<P, A>): Traced<P, A> => (p) => wa(f(p))
