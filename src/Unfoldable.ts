import { HKT } from './HKT'
import { Applicative } from './Applicative'
import { Traversable } from './Traversable'
import * as option from './Option'
import { sequence } from './Traversable'
import { constant, tuple } from './function'

/** This class identifies data structures which can be _unfolded_,
 * generalizing `unfoldr` on arrays.
 */
export interface Unfoldable<F> {
  readonly URI: F
  unfoldr<A, B>(f: (b: B) => option.Option<[A, B]>, b: B): HKT<F, A>
}

/** Replicate a value some natural number of times. */
export function replicate<F>(unfoldable: Unfoldable<F>): <A>(n: number, a: A) => HKT<F, A> {
  return (n, a) => {
    function step(n: number) {
      return n <= 0 ? option.none : option.of(tuple(a, n - 1))
    }
    return unfoldable.unfoldr(step, n)
  }
}

/** Perform an Applicative action `n` times, and accumulate all the results. */
export function replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>> {
  return (n, ma) => sequence(applicative, unfoldableTraversable)(replicate(unfoldableTraversable)(n, ma))
}

/** The container with no elements - unfolded with zero iterations. */
export function none<F, A>(unfoldable: Unfoldable<F>): HKT<F, A> {
  return unfoldable.unfoldr(constant(option.none), undefined)
}

export function singleton<F, A>(unfoldable: Unfoldable<F>, a: A): HKT<F, A> {
  return replicate(unfoldable)(1, a)
}
