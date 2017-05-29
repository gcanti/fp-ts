import { HKT, HKTS } from './HKT'
import { Applicative } from './Applicative'
import { Traversable } from './Traversable'
import * as option from './Option'
import { sequence } from './Traversable'
import { constant } from './function'

/** This class identifies data structures which can be _unfolded_,
 * generalizing `unfoldr` on arrays.
 */
export interface Unfoldable<F extends HKTS> {
  readonly URI: F
  unfoldr<A, B, U = any, V = any>(f: (b: B) => option.Option<[A, B]>, b: B): HKT<A, U, V>[F]
}

/** Replicate a value some natural number of times. */
export function replicate<F extends HKTS>(unfoldable: Unfoldable<F>): <A, U = any, V = any>(n: number, a: A) => HKT<A, U, V>[F] {
  return <A>(n: number, a: A) => {
    function step(n: number): option.Option<[A, number]> {
      return n <= 0 ? option.none : option.of<[A, number]>([a, n - 1])
    }
    return unfoldable.unfoldr(step, n)
  }
}

/** Perform an Applicative action `n` times, and accumulate all the results. */
export function replicateA<F extends HKTS, T extends HKTS>(applicative: Applicative<F>, unfoldableTraversable: Unfoldable<T> & Traversable<T>): <A, UF = any, UT = any, VF = any, VT = any>(n: number, ma: HKT<A, UF, VF>[F]) => HKT<HKT<A, UT, VT>[T], UF, VF>[F] {
  return <A>(n: number, ma: HKT<A>[F]) => sequence<F, T>(applicative, unfoldableTraversable)<A>(replicate(unfoldableTraversable)(n, ma))
}

/** The container with no elements - unfolded with zero iterations. */
export function none<F extends HKTS, A, U = any, V = any>(unfoldable: Unfoldable<F>): HKT<A, U, V>[F] {
  return unfoldable.unfoldr<A, void>(constant(option.none), undefined)
}

export function singleton<F extends HKTS, A, U = any, V = any>(unfoldable: Unfoldable<F>, a: A): HKT<A, U, V>[F] {
  return replicate(unfoldable)(1, a)
}
