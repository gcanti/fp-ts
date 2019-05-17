import { Comonad2C } from './Comonad'
import { Monoid } from './Monoid'
import { Functor2 } from './Functor'
import { phantom, tuple } from './function'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Traced: Traced<L, A>
  }
}

/**
 * @since 2.0.0
 */
export const URI = 'Traced'

/**
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @since 2.0.0
 */
export interface Traced<P, A> {
  (p: P): A
}

/**
 * Extracts a value at a relative position which depends on the current value.
 *
 * @since 2.0.0
 */
export function tracks<P, A>(M: Monoid<P>, f: (a: A) => P): (wa: Traced<P, A>) => A {
  return wa => wa(f(wa(M.empty)))
}

/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]> {
  return e => tuple(wa(e), e)
}

/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens<P, B>(f: (p: P) => B): <A>(wa: Traced<P, A>) => Traced<P, [A, B]> {
  return wa => e => tuple(wa(e), f(e))
}

/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor<P>(f: (p: P) => P): <A>(wa: Traced<P, A>) => Traced<P, A> {
  return wa => e => wa(f(e))
}

/**
 * @since 2.0.0
 */
export function getComonad<P>(monoid: Monoid<P>): Comonad2C<URI, P> {
  function extend<A, B>(wa: Traced<P, A>, f: (wa: Traced<P, A>) => B): Traced<P, B> {
    return p1 => f(p2 => wa(monoid.concat(p1, p2)))
  }

  function extract<A>(wa: Traced<P, A>): A {
    return wa(monoid.empty)
  }

  return {
    URI,
    _L: phantom,
    map,
    extend,
    extract
  }
}

const map = <P, A, B>(wa: Traced<P, A>, f: (a: A) => B): Traced<P, B> => {
  return p => f(wa(p))
}

/**
 * @since 2.0.0
 */
export const traced: Functor2<URI> = {
  URI,
  map
}
