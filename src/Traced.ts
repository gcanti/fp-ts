/**
 * @since 3.0.0
 */
import type { Comonad } from './Comonad'
import * as functor from './Functor'
import type { HKT } from './HKT'
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
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <W>(fa: Traced<W, A>) => Traced<W, B> = (f) => (fa) => (w) => f(fa(w))

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TracedF extends HKT {
  readonly type: Traced<this['Invariant1'], this['Covariant1']>
}

/**
 * @category HKT
 * @since 3.0.0
 */
export interface TracedFFixedW<W> extends HKT {
  readonly type: Traced<W, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<TracedF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <W, B>(fab: Traced<W, (a: A) => B>) => Traced<W, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <W>(monoid: Monoid<W>): Comonad<TracedFFixedW<W>> => ({
  map,
  extend: (f) => (fa) => (w1) => f((w2) => fa(monoid.combine(w2)(w1))),
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
export const tracks =
  <W>(M: Monoid<W>) =>
  <A>(f: (a: A) => W) =>
  (fa: Traced<W, A>): A =>
    fa(f(fa(M.empty)))

/**
 * Get the current position.
 *
 * @since 3.0.0
 */
export const listen =
  <W, A>(fa: Traced<W, A>): Traced<W, readonly [A, W]> =>
  (w) =>
    [fa(w), w]

/**
 * Get a value which depends on the current position.
 *
 * @since 3.0.0
 */
export const listens =
  <W, B>(f: (w: W) => B) =>
  <A>(pa: Traced<W, A>): Traced<W, readonly [A, B]> =>
  (w) =>
    [pa(w), f(w)]

/**
 * Apply a function to the current position.
 *
 * @since 3.0.0
 */
export const censor =
  <W>(f: (p: W) => W) =>
  <A>(pa: Traced<W, A>): Traced<W, A> =>
  (w) =>
    pa(f(w))
