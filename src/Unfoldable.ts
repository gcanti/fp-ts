import { HKT, URIS, Type, URIS2, Type2, URIS3, Type3 } from './HKT'
import { Applicative, Applicative1, Applicative2, Applicative3, Applicative2C, Applicative3C } from './Applicative'
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
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}

export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type<F, A>
}

export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfoldr: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}

export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfoldr: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>
}

export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type2<F, L, A>
}

export interface Unfoldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Type3<F, U, L, A>
}

/**
 * Replicate a value some natural number of times.
 * @function
 */
export function replicate<F extends URIS3>(unfoldable: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Type3<F, U, L, A>
export function replicate<F extends URIS3, U, L>(
  unfoldable: Unfoldable3C<F, U, L>
): <A>(a: A, n: number) => Type3<F, U, L, A>
export function replicate<F extends URIS2>(unfoldable: Unfoldable2<F>): <L, A>(a: A, n: number) => Type2<F, L, A>
export function replicate<F extends URIS2, L>(unfoldable: Unfoldable2C<F, L>): <A>(a: A, n: number) => Type2<F, L, A>
export function replicate<F extends URIS>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => Type<F, A>
export function replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>
export function replicate<F>(unfoldable: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A> {
  return (a, n) => {
    function step(n: number) {
      return n <= 0 ? none : option.of(tuple(a, n - 1))
    }
    return unfoldable.unfoldr(n, step)
  }
}

/**
 * The container with no elements - unfolded with zero iterations.
 * @function
 */
export function empty<F extends URIS3, U, L, A>(unfoldable: Unfoldable3<F>): Type3<F, U, L, A>
export function empty<F extends URIS3, U, L, A>(unfoldable: Unfoldable3C<F, U, L>): Type3<F, U, L, A>
export function empty<F extends URIS2, L, A>(unfoldable: Unfoldable2<F>): Type2<F, L, A>
export function empty<F extends URIS2, L, A>(unfoldable: Unfoldable2C<F, L>): Type2<F, L, A>
export function empty<F extends URIS, A>(unfoldable: Unfoldable1<F>): Type<F, A>
export function empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A>
export function empty<F, A>(unfoldable: Unfoldable<F>): HKT<F, A> {
  return unfoldable.unfoldr(undefined, constant(none))
}

/** @function */
export function singleton<F extends URIS3>(unfoldable: Unfoldable3<F>): <U, L, A>(a: A) => Type3<F, U, L, A>
export function singleton<F extends URIS3, U, L>(unfoldable: Unfoldable3C<F, U, L>): <A>(a: A) => Type3<F, U, L, A>
export function singleton<F extends URIS2>(unfoldable: Unfoldable2<F>): <L, A>(a: A) => Type2<F, L, A>
export function singleton<F extends URIS2, L>(unfoldable: Unfoldable2C<F, L>): <A>(a: A) => Type2<F, L, A>
export function singleton<F extends URIS>(unfoldable: Unfoldable1<F>): <A>(a: A) => Type<F, A>
export function singleton<F>(unfoldable: Unfoldable<F>): <A>(a: A) => HKT<F, A>
export function singleton<F>(unfoldable: Unfoldable<F>): <A>(a: A) => HKT<F, A> {
  return a => replicate(unfoldable)(a, 1)
}

/** Perform an Applicative action `n` times, and accumulate all the results */
export function replicateA<F extends URIS3, T extends URIS>(
  applicative: Applicative3<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): <U, L, A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, Type<T, A>>
export function replicateA<F extends URIS3, T extends URIS, U, L>(
  applicative: Applicative3C<F, U, L>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Type3<F, U, L, A>) => Type3<F, U, L, Type<T, A>>
export function replicateA<F extends URIS2, T extends URIS>(
  applicative: Applicative2<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): <L, A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, Type<T, A>>
export function replicateA<F extends URIS2, T extends URIS, L>(
  applicative: Applicative2C<F, L>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Type2<F, L, A>) => Type2<F, L, Type<T, A>>
export function replicateA<F extends URIS, T extends URIS>(
  applicative: Applicative1<F>,
  unfoldableTraversable: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Type<F, A>) => Type<F, Type<T, A>>
/**
 * Perform an Applicative action `n` times, and accumulate all the results
 * @function
 */
export function replicateA<F, T>(
  applicative: Applicative<F>,
  unfoldableTraversable: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>> {
  return (n, ma) => sequence(applicative, unfoldableTraversable)(replicate(unfoldableTraversable)(ma, n))
}
