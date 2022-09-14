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
export interface Traced<W, A> {
  (w: W): A
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
export const map: <A, B>(f: (a: A) => B) => <W>(fa: Traced<W, A>) => Traced<W, B> = (f) => (fa) => (w) => f(fa(w))

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface TracedF extends HKT {
  readonly type: Traced<this['Invariant1'], this['Covariant1']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export interface TracedFE<P> extends HKT {
  readonly type: Traced<P, this['Covariant1']>
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
export const flap: <A>(a: A) => <W, B>(fab: Traced<W, (a: A) => B>) => Traced<W, B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <W>(monoid: Monoid<W>): Comonad<TracedFE<W>> => ({
  map,
  extend: (f) => (fa) => (w1) => f((w2) => fa(monoid.concat(w2)(w1))),
  extract: (fa) => fa(monoid.empty)
})

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 3.0.0
 */
export const tracks = <W>(M: Monoid<W>) => <A>(f: (a: A) => W) => (fa: Traced<W, A>): A => fa(f(fa(M.empty)))

/**
 * Get the current position.
 *
 * @since 3.0.0
 */
export const listen = <W, A>(fa: Traced<W, A>): Traced<W, readonly [A, W]> => (w) => [fa(w), w]

/**
 * Get a value which depends on the current position.
 *
 * @since 3.0.0
 */
export const listens = <W, B>(f: (w: W) => B) => <A>(pa: Traced<W, A>): Traced<W, readonly [A, B]> => (w) => [
  pa(w),
  f(w)
]

/**
 * Apply a function to the current position.
 *
 * @since 3.0.0
 */
export const censor = <W>(f: (p: W) => W) => <A>(pa: Traced<W, A>): Traced<W, A> => (w) => pa(f(w))
