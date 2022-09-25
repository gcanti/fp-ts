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
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TracedF extends HKT {
  readonly type: Traced<this['Contravariant1'], this['Covariant1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TracedFFixedW<W> extends HKT {
  readonly type: Traced<W, this['Covariant1']>
}

// -------------------------------------------------------------------------------------
// type class members
// -------------------------------------------------------------------------------------

/**
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <W>(self: Traced<W, A>) => Traced<W, B> = (f) => (self) => (w) => f(self(w))

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
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <W, B>(self: Traced<W, (a: A) => B>) => Traced<W, B> =
  /*#__PURE__*/ functor.flap(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <W>(M: Monoid<W>): Comonad<TracedFFixedW<W>> => ({
  map,
  extend: (f) => (self) => (w1) => f((w2) => self(M.combine(w2)(w1))),
  extract: (self) => self(M.empty)
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
