import { HKT } from './HKT'
import { StaticApplicative } from './Applicative'
import { StaticTraversable } from './Traversable'
import * as option from './Option'
import { ops } from './Traversable'
import { constant } from './function'

/** This class identifies data structures which can be _unfolded_,
 * generalizing `unfoldr` on arrays.
 */
export interface StaticUnfoldable<T> {
  unfoldr<A, B>(f: (b: B) => option.HKTOption<[A, B]>, b: B): HKT<T, A>
}

/** Replicate a value some natural number of times. */
export function replicate<T, A>(unfoldable: StaticUnfoldable<T>, n: number, a: A): HKT<T, A> {
  function step(n: number): option.HKTOption<[A, number]> {
    return n <= 0 ? option.none : option.of<[A, number]>([a, n - 1])
  }
  return unfoldable.unfoldr(step, n)
}

/** Perform an Applicative action `n` times, and accumulate all the results. */
export function replicateA<M, F, A>(
    applicative: StaticApplicative<M>,
    unfoldableTraversable: StaticUnfoldable<F> & StaticTraversable<F>,
    n: number,
    ma: HKT<M, A>
  ): HKT<M, HKT<F, A>> {
  return ops.sequenceS(applicative, unfoldableTraversable, replicate(unfoldableTraversable, n, ma))
}

/** The container with no elements - unfolded with zero iterations. */
export function none<F, A>(unfoldable: StaticUnfoldable<F>): HKT<F, A> {
  return unfoldable.unfoldr<A, void>(constant(option.none), undefined)
}

export function singleton<F, A>(unfoldable: StaticUnfoldable<F>, a: A): HKT<F, A> {
  return replicate(unfoldable, 1, a)
}
