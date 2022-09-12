/**
 * @since 3.0.0
 */
import type { Comonad } from './Comonad'
import { flap as flap_, Functor as Functor_ } from './Functor'
import { HKT } from './HKT'
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
export const map: <A, B>(f: (a: A) => B) => <P>(fa: Traced<P, A>) => Traced<P, B> = (f) => (fa) => (p) => f(fa(p))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface TracedF extends HKT {
  readonly type: Traced<this['E'], this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface TracedFE<E> extends HKT {
  readonly type: Traced<E, this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<TracedF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <P, B>(fab: Traced<P, (a: A) => B>) => Traced<P, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <P>(monoid: Monoid<P>): Comonad<TracedFE<P>> => ({
  map,
  extend: (f) => (pa) => (p1) => f((p2) => pa(monoid.concat(p2)(p1))),
  extract: (pa) => pa(monoid.empty)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 3.0.0
 */
export const tracks = <P>(M: Monoid<P>) => <A>(f: (a: A) => P) => (pa: Traced<P, A>): A => pa(f(pa(M.empty)))

/**
 * Get the current position.
 *
 * @since 3.0.0
 */
export const listen = <P, A>(pa: Traced<P, A>): Traced<P, readonly [A, P]> => (p) => [pa(p), p]

/**
 * Get a value which depends on the current position.
 *
 * @since 3.0.0
 */
export const listens = <P, B>(f: (p: P) => B) => <A>(pa: Traced<P, A>): Traced<P, readonly [A, B]> => (p) => [
  pa(p),
  f(p)
]

/**
 * Apply a function to the current position.
 *
 * @since 3.0.0
 */
export const censor = <P>(f: (p: P) => P) => <A>(pa: Traced<P, A>): Traced<P, A> => (p) => pa(f(p))
