/**
 * @file This class identifies data structures which can be _unfolded_, generalizing `unfoldr` on arrays.
 */
import { Applicative, Applicative1, Applicative2, Applicative2C, Applicative3, Applicative3C } from './Applicative'
import { HKT, Kind, Kind2, Kind3, URIS, URIS2, URIS3 } from './HKT'
import { Option, none, option } from './Option'
import { Traversable, Traversable1, sequence } from './Traversable'

/**
 * @since 1.0.0
 */
export interface Unfoldable<F> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => HKT<F, A>
}

export interface Unfoldable1<F extends URIS> {
  readonly URI: F
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind<F, A>
}

export interface Unfoldable2<F extends URIS2> {
  readonly URI: F
  readonly unfoldr: <L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, L, A>
}

export interface Unfoldable3<F extends URIS3> {
  readonly URI: F
  readonly unfoldr: <U, L, A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, U, L, A>
}

export interface Unfoldable2C<F extends URIS2, L> {
  readonly URI: F
  readonly _L: L
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind2<F, L, A>
}

export interface Unfoldable3C<F extends URIS3, U, L> {
  readonly URI: F
  readonly _L: L
  readonly _U: U
  readonly unfoldr: <A, B>(b: B, f: (b: B) => Option<[A, B]>) => Kind3<F, U, L, A>
}

/**
 * Replicate a value some natural number of times.
 *
 * @example
 * import { replicate } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(replicate(array)('s', 2), ['s', 's'])
 *
 * @since 1.0.0
 */
export function replicate<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A, n: number) => Kind3<F, U, L, A>
export function replicate<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A, n: number) => Kind3<F, U, L, A>
export function replicate<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A, n: number) => Kind2<F, L, A>
export function replicate<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A, n: number) => Kind2<F, L, A>
export function replicate<F extends URIS>(U: Unfoldable1<F>): <A>(a: A, n: number) => Kind<F, A>
export function replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A>
export function replicate<F>(U: Unfoldable<F>): <A>(a: A, n: number) => HKT<F, A> {
  return <A>(a: A, n: number) => {
    function step(n: number): Option<[A, number]> {
      return n <= 0 ? none : option.of([a, n - 1])
    }
    return U.unfoldr(n, step)
  }
}

/**
 * The container with no elements - unfolded with zero iterations.
 *
 * @example
 * import { empty } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(empty(array), [])
 *
 * @since 1.0.0
 */
export function empty<F extends URIS3, U, L, A>(U: Unfoldable3<F> | Unfoldable3C<F, U, L>): Kind3<F, U, L, A>
export function empty<F extends URIS2, L, A>(U: Unfoldable2<F> | Unfoldable2C<F, L>): Kind2<F, L, A>
export function empty<F extends URIS, A>(U: Unfoldable1<F>): Kind<F, A>
export function empty<F, A>(U: Unfoldable<F>): HKT<F, A>
export function empty<F, A>(U: Unfoldable<F>): HKT<F, A> {
  return U.unfoldr(undefined, () => none)
}

/**
 * Contain a single value
 *
 * @example
 * import { singleton } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 *
 * assert.deepStrictEqual(singleton(array)(1), [1])
 *
 * @since 1.0.0
 */
export function singleton<F extends URIS3>(U: Unfoldable3<F>): <U, L, A>(a: A) => Kind3<F, U, L, A>
export function singleton<F extends URIS3, U, L>(U: Unfoldable3C<F, U, L>): <A>(a: A) => Kind3<F, U, L, A>
export function singleton<F extends URIS2>(U: Unfoldable2<F>): <L, A>(a: A) => Kind2<F, L, A>
export function singleton<F extends URIS2, L>(U: Unfoldable2C<F, L>): <A>(a: A) => Kind2<F, L, A>
export function singleton<F extends URIS>(U: Unfoldable1<F>): <A>(a: A) => Kind<F, A>
export function singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A>
export function singleton<F>(U: Unfoldable<F>): <A>(a: A) => HKT<F, A> {
  const replicateU = replicate(U)
  return a => replicateU(a, 1)
}

/**
 * Perform an Applicative action `n` times, and accumulate all the results
 *
 * @example
 * import { replicateA } from 'fp-ts/lib/Unfoldable'
 * import { array } from 'fp-ts/lib/Array'
 * import { option, some, none } from 'fp-ts/lib/Option'
 *
 * assert.deepStrictEqual(replicateA(option, array)(2, some(1)), some([1, 1]))
 * assert.deepStrictEqual(replicateA(option, array)(2, none), none)
 *
 * @since 1.0.0
 */
export function replicateA<F extends URIS3, T extends URIS>(
  A: Applicative3<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <U, L, A>(n: number, ma: Kind3<F, U, L, A>) => Kind3<F, U, L, Kind<T, A>>
export function replicateA<F extends URIS3, T extends URIS, U, L>(
  A: Applicative3C<F, U, L>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind3<F, U, L, A>) => Kind3<F, U, L, Kind<T, A>>
export function replicateA<F extends URIS2, T extends URIS>(
  A: Applicative2<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <L, A>(n: number, ma: Kind2<F, L, A>) => Kind2<F, L, Kind<T, A>>
export function replicateA<F extends URIS2, T extends URIS, L>(
  A: Applicative2C<F, L>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind2<F, L, A>) => Kind2<F, L, Kind<T, A>>
export function replicateA<F extends URIS, T extends URIS>(
  F: Applicative1<F>,
  UT: Unfoldable1<T> & Traversable1<T>
): <A>(n: number, ma: Kind<F, A>) => Kind<F, Kind<T, A>>
export function replicateA<F, T>(
  F: Applicative<F>,
  // tslint:disable-next-line: deprecation
  UT: Unfoldable<T> & Traversable<T>
): <A>(n: number, ma: HKT<F, A>) => HKT<F, HKT<T, A>> {
  const sequenceFUT = sequence(F, UT)
  const replicateUT = replicate(UT)
  return (n, ma) => sequenceFUT(replicateUT(ma, n))
}
