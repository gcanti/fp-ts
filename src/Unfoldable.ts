import { HKT, HKTS, HKTAs, HKT2S, HKT2As, HKT3S, HKT3As } from './HKT'
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
  unfoldr: <A, B>(f: (b: B) => option.Option<[A, B]>, b: B) => HKT<F, A>
}

/** Replicate a value some natural number of times. */
export const replicate = <F>(unfoldable: Unfoldable<F>) => (n: number) => <A>(a: A): HKT<F, A> => {
  function step(n: number) {
    return n <= 0 ? option.none : option.of(tuple(a, n - 1))
  }
  return unfoldable.unfoldr(step, n)
}

/** The container with no elements - unfolded with zero iterations. */
export const none = <F, A>(unfoldable: Unfoldable<F>): HKT<F, A> => unfoldable.unfoldr(constant(option.none), undefined)

export const singleton = <F>(unfoldable: Unfoldable<F>) => <A>(a: A): HKT<F, A> => replicate(unfoldable)(1)(a)

export class Ops {
  /** Perform an Applicative action `n` times, and accumulate all the results. */
  replicateA<F extends HKT3S, T>(
    applicative: Applicative<F>,
    unfoldableTraversable: Unfoldable<T> & Traversable<T>
  ): (n: number) => <U, L, A>(ma: HKT3As<F, U, L, A>) => HKT3As<F, U, L, HKT<T, A>>
  replicateA<F extends HKT2S, T>(
    applicative: Applicative<F>,
    unfoldableTraversable: Unfoldable<T> & Traversable<T>
  ): (n: number) => <L, A>(ma: HKT2As<F, L, A>) => HKT2As<F, L, HKT<T, A>>
  replicateA<F extends HKTS, T>(
    applicative: Applicative<F>,
    unfoldableTraversable: Unfoldable<T> & Traversable<T>
  ): (n: number) => <A>(ma: HKTAs<F, A>) => HKTAs<F, HKT<T, A>>
  replicateA<F, T>(
    applicative: Applicative<F>,
    unfoldableTraversable: Unfoldable<T> & Traversable<T>
  ): (n: number) => <A>(ma: HKT<F, A>) => HKT<F, HKT<T, A>> {
    return n => ma => sequence(applicative, unfoldableTraversable)(replicate(unfoldableTraversable)(n)(ma))
  }
}

const ops = new Ops()
export const replicateA: Ops['replicateA'] = ops.replicateA
