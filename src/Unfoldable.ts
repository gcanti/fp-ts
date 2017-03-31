import { HKT, HKTS, HKT2, HKT2S } from './HKT'
import { StaticApplicative } from './Applicative'
import { StaticTraversable } from './Traversable'
import * as option from './Option'
import { sequence } from './Traversable'
import { constant } from './function'

/** This class identifies data structures which can be _unfolded_,
 * generalizing `unfoldr` on arrays.
 */
export interface StaticUnfoldable<F extends HKTS> {
  readonly URI: F
  unfoldr<A, B>(f: (b: B) => option.Option<[A, B]>, b: B): HKT<A>[F]
}

/** Replicate a value some natural number of times. */
export function replicate<F extends HKT2S, A, P1>(unfoldable: StaticUnfoldable<F>, n: number, a: A): HKT2<P1, A>[F]
export function replicate<F extends HKTS, A>(unfoldable: StaticUnfoldable<F>, n: number, a: A): HKT<A>[F]
export function replicate<F extends HKTS, A>(unfoldable: StaticUnfoldable<F>, n: number, a: A): HKT<A>[F] {
  function step(n: number): option.Option<[A, number]> {
    return n <= 0 ? option.none : option.of<[A, number]>([a, n - 1])
  }
  return unfoldable.unfoldr(step, n)
}

/** Perform an Applicative action `n` times, and accumulate all the results. */
export function replicateA<F extends HKT2S, T extends HKTS>(applicative: StaticApplicative<F>, unfoldableTraversable: StaticUnfoldable<T> & StaticTraversable<T>): <A, P1>(n: number, ma: HKT2<P1, A>[F]) => HKT2<P1, HKT<A>[T]>[F]
export function replicateA<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, unfoldableTraversable: StaticUnfoldable<T> & StaticTraversable<T>): <A>(n: number, ma: HKT<A>[F]) => HKT<HKT<A>[T]>[F]
export function replicateA<F extends HKTS, T extends HKTS>(applicative: StaticApplicative<F>, unfoldableTraversable: StaticUnfoldable<T> & StaticTraversable<T>): <A>(n: number, ma: HKT<A>[F]) => HKT<HKT<A>[T]>[F] {
  return <A>(n: number, ma: HKT<A>[F]) => sequence<F, T>(applicative, unfoldableTraversable)<A>(replicate(unfoldableTraversable, n, ma))
}

/** The container with no elements - unfolded with zero iterations. */
export function none<F extends HKTS, A>(unfoldable: StaticUnfoldable<F>): HKT<A>[F] {
  return unfoldable.unfoldr<A, void>(constant(option.none), undefined)
}

export function singleton<F extends HKTS, A>(unfoldable: StaticUnfoldable<F>, a: A): HKT<A>[F] {
  return replicate(unfoldable, 1, a)
}
