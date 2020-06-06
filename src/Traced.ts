/**
 * @since 2.0.0
 */
import { Comonad2C } from './Comonad'
import { Functor2 } from './Functor'
import { Monoid } from './Monoid'

declare module './HKT' {
  interface URItoKind2<E, A> {
    readonly Traced: Traced<E, A>
  }
}

/**
 * @category model
 * @since 2.0.0
 */
export const URI = 'Traced'

/**
 * @category model
 * @since 2.0.0
 */
export type URI = typeof URI

/**
 * @category model
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
  return (wa) => wa(f(wa(M.empty)))
}

// tslint:disable:readonly-array
/**
 * Get the current position
 *
 * @since 2.0.0
 */
export function listen<P, A>(wa: Traced<P, A>): Traced<P, [A, P]> {
  return (e) => [wa(e), e]
}
// tslint:enable:readonly-array

// tslint:disable:readonly-array
/**
 * Get a value which depends on the current position
 *
 * @since 2.0.0
 */
export function listens<P, B>(f: (p: P) => B): <A>(wa: Traced<P, A>) => Traced<P, [A, B]> {
  return (wa) => (e) => [wa(e), f(e)]
}
// tslint:enable:readonly-array

/**
 * Apply a function to the current position
 *
 * @since 2.0.0
 */
export function censor<P>(f: (p: P) => P): <A>(wa: Traced<P, A>) => Traced<P, A> {
  return (wa) => (e) => wa(f(e))
}

/**
 * @category instances
 * @since 2.0.0
 */
export function getComonad<P>(monoid: Monoid<P>): Comonad2C<URI, P> {
  function extend<A, B>(wa: Traced<P, A>, f: (wa: Traced<P, A>) => B): Traced<P, B> {
    return (p1) => f((p2) => wa(monoid.concat(p1, p2)))
  }

  function extract<A>(wa: Traced<P, A>): A {
    return wa(monoid.empty)
  }

  return {
    URI,
    _E: undefined as any,
    map: map_,
    extend,
    extract
  }
}

// -------------------------------------------------------------------------------------
// pipeables
// -------------------------------------------------------------------------------------

const map_: <E, A, B>(fa: Traced<E, A>, f: (a: A) => B) => Traced<E, B> = (wa, f) => (p) => f(wa(p))

/**
 * @category Functor
 * @since 2.0.0
 */
export const map: <A, B>(f: (a: A) => B) => <E>(fa: Traced<E, A>) => Traced<E, B> = (f) => (fa) => map_(fa, f)

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 2.0.0
 */
export const traced: Functor2<URI> = {
  URI,
  map: map_
}
