import { HKT, URIS, Type, URIS2, Type2, URIS3, Type3 } from './HKT'
import { Applicative, Applicative1, Applicative2, Applicative3 } from './Applicative'
import { Traversable, Traversable1 } from './Traversable'
import { Option, option, none } from './Option'
import { sequence } from './Traversable'
import { constant, tuple } from './function'

/**
 * This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.
 * @typeclass
 */
export interface Unfoldable<F> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => HKT<F, A>
}

export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type<F, A>
}

export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  unfoldr: <L, A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type2<F, L, A>
}

export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  unfoldr: <U, L, A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type3<F, U, L, A>
}

export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type2<F, L, A>
}

export interface Unfoldable3C<F extends URIS3, U, L> {
  readonly URI: F
  unfoldr: <A, B>(f: (b: B) => Option<[A, B]>, b: B) => Type3<F, U, L, A>
}

/**
 * Replicate a value some natural number of times.
 * @function
 */
export function replicate<F extends URIS3>(unfoldable: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Type3<F, U, L, A>
export function replicate<F extends URIS2>(unfoldable: Unfoldable2<F>): <L, A>(a: A, n: number) => Type2<F, L, A>
export function replicate<F extends URIS>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => Type<F, A>
export function replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>
export function replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A> {
  return (a, n) => {
    function step(n: number) {
      return n <= 0 ? none : option.of(tuple(a, n - 1))
    }
    return unfoldable.unfoldr(step, n)
  }
}

/**
 * The container with no elements - unfolded with zero iterations.
 * @function
 */
export function empty<F extends URIS3, U, L, A>(unfoldable: Unfoldable3<F>): Type3<F, U, L, A>
export function empty<F extends URIS2, L, A>(unfoldable: Unfoldable2<F>): Type2<F, L, A>
export function empty<F extends URIS, A>(unfoldable: Unfoldable1<F>): Type<F, A>
export function empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>
export function empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A> {
  return unfoldable.unfoldr(constant(none), undefined)
}

/** @function */
export const singleton = <F>(unfoldable: Unfoldable<F>) => <A>(a: A): HKT<F, A> => {
  return replicate(unfoldable)(a, 1)
}

/** Perform an Applicative action `n` times, and accumulate all the results */
export function replicateA<F extends URIS3, T extends URIS>(
  applicative: Applicative3<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): (n: number) => <U, L, A>(ma: Type3<F, U, L, A>) => Type3<F, U, L, HKT<T, A>>
export function replicateA<F extends URIS2, T extends URIS>(
  applicative: Applicative2<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): (n: number) => <L, A>(ma: Type2<F, L, A>) => Type2<F, L, HKT<T, A>>
export function replicateA<F extends URIS, T extends URIS>(
  applicative: Applicative1<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): (n: number) => <A>(ma: Type<F, A>) => Type<F, HKT<T, A>>
/**
 * Perform an Applicative action `n` times, and accumulate all the results
 * @function
 */
export function replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): (n: number) => <A>(ma: HKT<F, A>) => HKT<F, HKT<T, A>> {
  return n => ma => sequence(applicative, unfoldableTraversable)(replicate(unfoldableTraversable)(ma, n))
}
