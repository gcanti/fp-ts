import { Comonad2C } from './Comonad'
import { Monoid } from './Monoid'
import { Functor2 } from './Functor'

declare module './HKT' {
  interface URI2HKT2<L, A> {
    Traced: Traced<L, A>
  }
}

export const URI = 'Traced'

export type URI = typeof URI

/**
 * @since 1.16.0
 */
export class Traced<P, A> {
  readonly _A!: A
  readonly _L!: P
  readonly _URI!: URI
  constructor(readonly run: (p: P) => A) {}
  /** @obsolete */
  map<B>(f: (a: A) => B): Traced<P, B> {
    return new Traced((p: P) => f(this.run(p)))
  }
}

/**
 * Extracts a value at a relative position which depends on the current value.
 * @since 1.16.0
 */
export const tracks = <P, A>(M: Monoid<P>, f: (a: A) => P) => (wa: Traced<P, A>): A => {
  return wa.run(f(wa.run(M.empty)))
}

/**
 * Get the current position
 * @since 1.16.0
 */
export const listen = <P, A>(wa: Traced<P, A>): Traced<P, [A, P]> => {
  return new Traced(e => [wa.run(e), e])
}

/**
 * Get a value which depends on the current position
 * @since 1.16.0
 */
export const listens = <P, A, B>(wa: Traced<P, A>, f: (p: P) => B): Traced<P, [A, B]> => {
  return new Traced(e => [wa.run(e), f(e)])
}

/**
 * Apply a function to the current position
 * @since 1.16.0
 */
export const censor = <P, A>(wa: Traced<P, A>, f: (p: P) => P): Traced<P, A> => {
  return new Traced(e => wa.run(f(e)))
}

/**
 * @since 1.16.0
 */
export function getComonad<P>(monoid: Monoid<P>): Comonad2C<URI, P> {
  function extend<A, B>(wa: Traced<P, A>, f: (wa: Traced<P, A>) => B): Traced<P, B> {
    return new Traced((p1: P) => f(new Traced((p2: P) => wa.run(monoid.concat(p1, p2)))))
  }

  function extract<A>(wa: Traced<P, A>): A {
    return wa.run(monoid.empty)
  }

  return {
    URI,
    _L: undefined as any,
    map,
    extend,
    extract
  }
}

function map<P, A, B>(wa: Traced<P, A>, f: (a: A) => B): Traced<P, B> {
  return wa.map(f)
}

/**
 * @since 1.16.0
 */
export const traced: Functor2<URI> = {
  URI,
  map
}
