import { HKT, HKTS } from './HKT'
import { constant } from './function'

export interface Functor<F extends HKTS> {
  readonly URI: F
  map<A, B, U = any, V = any>(f: (a: A) => B, fa: HKT<A, U, V>[F]): HKT<B, U, V>[F]
}

export interface FantasyFunctor<F extends HKTS, A> {
  map<B, U = any, V = any>(f: (a: A) => B): HKT<B, U, V>[F]
}

export function lift<F extends HKTS, A, B>(
  functor: Functor<F>,
  f: (a: A) => B
): <U = any, V = any>(fa: HKT<A, U, V>[F]) => HKT<B, U, V>[F] {
  return (fa: HKT<A>[F]) => functor.map(f, fa)
}

/** returns the composition of two functors
 * Note: requires an implicit proof that HKT<A>[FG] ~ HKT<HKT<A>[G]>[F]
 */
export function getCompositionFunctor<FG extends HKTS, F extends HKTS, G extends HKTS>(
  URI: FG,
  functorF: Functor<F>,
  functorG: Functor<G>
): Functor<FG> {
  return {
    URI,
    map<A, B>(f: (a: A) => B, fa: HKT<HKT<A>[G]>[F]): HKT<HKT<B>[G]>[F] {
      return functorF.map((ga: HKT<A>[G]) => functorG.map(f, ga), fa)
    }
  }
}

/** Ignore the return value of a computation, using the specified return value instead (`<$`) */
export function voidRight<F extends HKTS, A, B, U = any, V = any>(
  functor: Functor<F>,
  a: A,
  fb: HKT<B, U, V>[F]
): HKT<A, U, V>[F] {
  return functor.map(constant(a), fb)
}

/** A version of `voidRight` with its arguments flipped (`$>`) */
export function voidLeft<F extends HKTS, A, B, U = any, V = any>(
  functor: Functor<F>,
  fa: HKT<A, U, V>[F],
  b: B
): HKT<B, U, V>[F] {
  return functor.map(constant(b), fa)
}
