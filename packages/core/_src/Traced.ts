/**
 * @since 3.0.0
 */
import type { Comonad } from '@fp-ts/core/Comonad'
import * as functor from '@fp-ts/core/Functor'
import type { TypeLambda } from '@fp-ts/core/HKT'
import type { Monoid } from '@fp-ts/core/Monoid'

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
export interface TracedTypeLambda extends TypeLambda {
  readonly type: Traced<this['In1'], this['Out1']>
}

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface TracedFFix<W> extends TypeLambda {
  readonly type: Traced<W, this['Out1']>
}

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
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
export const Functor: functor.Functor<TracedTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <O, B>(self: Traced<O, (a: A) => B>) => Traced<O, B> = functor.flap(
  Functor
)

/**
 * @category instances
 * @since 3.0.0
 */
export const getComonad = <W>(M: Monoid<W>): Comonad<TracedFFix<W>> => ({
  map,
  extend: (f) => (self) => (w1) => f((w2) => self(M.combine(w2)(w1))),
  extract: (self) => self(M.empty)
})

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
export const listens = <W, B>(f: (w: W) => B) =>
  <A>(pa: Traced<W, A>): Traced<W, readonly [A, B]> => (w) => [pa(w), f(w)]

/**
 * Apply a function to the current position.
 *
 * @since 3.0.0
 */
export const censor = <W>(f: (p: W) => W) => <A>(pa: Traced<W, A>): Traced<W, A> => (w) => pa(f(w))
