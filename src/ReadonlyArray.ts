/**
 * @since 3.0.0
 */
import type { Alt as Alt_ } from './Alt'
import type { Alternative as Alternative_ } from './Alternative'
import type { Applicative as Applicative_ } from './Applicative'
import { apFirst as apFirst_, Apply as Apply_, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain as Chain_, chainFirst as chainFirst_ } from './Chain'
import { ChainRec as ChainRec_ } from './ChainRec'
import type { Compactable as Compactable_ } from './Compactable'
import type { Either } from './Either'
import type { Endomorphism } from './Endomorphism'
import { Eq, fromEquals } from './Eq'
import type { Extend as Extend_ } from './Extend'
import type { Filterable as Filterable_ } from './Filterable'
import type {
  FilterableWithIndex as FilterableWithIndex_,
  PredicateWithIndex,
  RefinementWithIndex
} from './FilterableWithIndex'
import type { Foldable as Foldable_ } from './Foldable'
import type { FoldableWithIndex as FoldableWithIndex_ } from './FoldableWithIndex'
import { FromEither as FromEither_, fromEitherK as fromEitherK_, fromPredicate as fromPredicate_ } from './FromEither'
import { identity, Lazy, pipe } from './function'
import { bindTo as bindTo_, flap as flap_, Functor as Functor_, tupled as tupled_ } from './Functor'
import type { FunctorWithIndex as FunctorWithIndex_ } from './FunctorWithIndex'
import type { HKT, Kind } from './HKT'
import * as _ from './internal'
import type { Magma } from './Magma'
import type { Monad as Monad_ } from './Monad'
import type { Monoid } from './Monoid'
import * as NEA from './NonEmptyArray'
import * as N from './number'
import type { Option } from './Option'
import { fromCompare, Ord } from './Ord'
import type { Pointed as Pointed_ } from './Pointed'
import type { Predicate } from './Predicate'
import * as RNEA from './ReadonlyNonEmptyArray'
import type { Refinement } from './Refinement'
import type { Semigroup } from './Semigroup'
import { separated, Separated } from './Separated'
import type { Show } from './Show'
import type { Traversable as Traversable_ } from './Traversable'
import type { TraversableWithIndex as TraversableWithIndex_ } from './TraversableWithIndex'
import type { Unfoldable as Unfoldable_ } from './Unfoldable'
import { wiltDefault, Witherable as Witherable_, witherDefault, filterE as filterE_ } from './Witherable'
import { Zero as Zero_, guard as guard_ } from './Zero'

import ReadonlyNonEmptyArray = RNEA.ReadonlyNonEmptyArray

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 3.0.0
 */
export const makeBy = <A>(f: (i: number) => A) => (n: number): ReadonlyArray<A> => (n <= 0 ? empty : RNEA.makeBy(f)(n))

/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 3.0.0
 */
export const replicate = <A>(a: A): ((n: number) => ReadonlyArray<A>) => makeBy(() => a)

// -------------------------------------------------------------------------------------
// natural transformations
// -------------------------------------------------------------------------------------

/**
 * @category natural transformations
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => ReadonlyArray<A> = (ma) => (_.isNone(ma) ? empty : [ma.value])

/**
 * Transforms an `Either` to a `ReadonlyArray`.
 *
 * @category natural transformations
 * @since 3.0.0
 */
export const fromEither: <A>(fa: Either<unknown, A>) => ReadonlyArray<A> = (e) => (_.isLeft(e) ? empty : [e.right])

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Less strict version of [`match`](#match).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchW = <B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (as: ReadonlyNonEmptyArray<A>) => C) => (
  as: ReadonlyArray<A>
): B | C => (isNonEmpty(as) ? onNonEmpty(as) : onEmpty())

/**
 * @category destructors
 * @since 3.0.0
 */
export const match: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (as: ReadonlyNonEmptyArray<A>) => B
) => (as: ReadonlyArray<A>) => B = matchW

/**
 * Less strict version of [`matchLeft`](#matchLeft).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchLeftW = <B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (head: A, tail: ReadonlyArray<A>) => C) => (
  as: ReadonlyArray<A>
): B | C => (isNonEmpty(as) ? onNonEmpty(RNEA.head(as), RNEA.tail(as)) : onEmpty())

/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from 'fp-ts/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchLeft: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (head: A, tail: ReadonlyArray<A>) => B
) => (as: ReadonlyArray<A>) => B = matchLeftW

/**
 * Less strict version of [`matchRight`](#matchRight).
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchRightW = <B, A, C>(onEmpty: Lazy<B>, onNonEmpty: (init: ReadonlyArray<A>, last: A) => C) => (
  as: ReadonlyArray<A>
): B | C => (isNonEmpty(as) ? onNonEmpty(RNEA.init(as), RNEA.last(as)) : onEmpty())

/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchRight: <B, A>(
  onEmpty: Lazy<B>,
  onNonEmpty: (init: ReadonlyArray<A>, last: A) => B
) => (as: ReadonlyArray<A>) => B = matchRightW

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromOptionK = <A extends ReadonlyArray<unknown>, B>(f: (...a: A) => Option<B>) => (
  ...a: A
): ReadonlyArray<B> => fromOption(f(...a))

/**
 * `ReadonlyArray` comprehension.
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/ReadonlyArray'
 * import { tuple } from 'fp-ts/tuple'
 *
 * assert.deepStrictEqual(comprehension([[1, 2, 3], ['a', 'b']], tuple, (a, b) => (a + b.length) % 2 === 0), [
 *   [1, 'a'],
 *   [1, 'b'],
 *   [3, 'a'],
 *   [3, 'b']
 * ])
 *
 * @category constructors
 * @since 3.0.0
 */
export function comprehension<A, B, C, D, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>, ReadonlyArray<D>],
  f: (a: A, b: B, c: C, d: D) => R,
  g?: (a: A, b: B, c: C, d: D) => boolean
): ReadonlyArray<R>
export function comprehension<A, B, C, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>, ReadonlyArray<C>],
  f: (a: A, b: B, c: C) => R,
  g?: (a: A, b: B, c: C) => boolean
): ReadonlyArray<R>
export function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
): ReadonlyArray<R>
export function comprehension<A, R>(
  input: ReadonlyArray<ReadonlyArray<A>>,
  f: (...as: ReadonlyArray<A>) => R,
  g: (...as: ReadonlyArray<A>) => boolean = () => true
): ReadonlyArray<R> {
  const go = (as: ReadonlyArray<A>, input: ReadonlyArray<ReadonlyArray<A>>): ReadonlyArray<R> =>
    isNonEmpty(input)
      ? pipe(
          RNEA.head(input),
          chain((head) => go(append(head)(as), RNEA.tail(input)))
        )
      : g(...as)
      ? [f(...as)]
      : empty
  return go(empty, input)
}

/**
 * @category combinators
 * @since 3.0.0
 */
export const concatW = <B>(second: ReadonlyArray<B>) => <A>(first: ReadonlyArray<A>): ReadonlyArray<A | B> =>
  isEmpty(first) ? second : isEmpty(second) ? first : (first as ReadonlyArray<A | B>).concat(second)

/**
 * @category combinators
 * @since 3.0.0
 */
export const concat: <A>(second: ReadonlyArray<A>) => (first: ReadonlyArray<A>) => ReadonlyArray<A> = concatW

/**
 * Fold a `ReadonlyArray` from the left, keeping all intermediate results instead of only the final result.
 *
 * @example
 * import { scanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export const scanLeft = <B, A>(b: B, f: (b: B, a: A) => B) => (as: ReadonlyArray<A>): ReadonlyNonEmptyArray<B> => {
  const len = as.length
  const out = new Array(len + 1) as [B, ...Array<B>]
  out[0] = b
  for (let i = 0; i < len; i++) {
    out[i + 1] = f(out[i], as[i])
  }
  return out
}

/**
 * Fold a `ReadonlyArray` from the right, keeping all intermediate results instead of only the final result.
 *
 * @example
 * import { scanRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @category combinators
 * @since 3.0.0
 */
export const scanRight = <B, A>(b: B, f: (a: A, b: B) => B) => (as: ReadonlyArray<A>): ReadonlyNonEmptyArray<B> => {
  const len = as.length
  const out = new Array(len + 1) as [B, ...Array<B>]
  out[len] = b
  for (let i = len - 1; i >= 0; i--) {
    out[i] = f(as[i], out[i + 1])
  }
  return out
}

/**
 * Test whether a `ReadonlyArray` is empty.
 *
 * @example
 * import { isEmpty } from 'fp-ts/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 3.0.0
 */
export const isEmpty = <A>(as: ReadonlyArray<A>): as is readonly [] => as.length === 0

/**
 * Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category guards
 * @since 3.0.0
 */
export const isNonEmpty: <A>(as: ReadonlyArray<A>) => as is ReadonlyNonEmptyArray<A> = _.isNonEmpty

/**
 * Calculate the number of elements in a `ReadonlyArray`.
 *
 * @since 3.0.0
 */
export const size = <A>(as: ReadonlyArray<A>): number => as.length

/**
 * Test whether a `ReadonlyArray` contains a particular index
 *
 * @since 3.0.0
 */
export const isOutOfBound: <A>(i: number, as: ReadonlyArray<A>) => boolean = RNEA.isOutOfBound

/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`
 *
 * @example
 * import { lookup } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 3.0.0
 */
export const lookup = (i: number) => <A>(as: ReadonlyArray<A>): Option<A> =>
  isOutOfBound(i, as) ? _.none : _.some(as[i])

/**
 * Less strict version of [`prepend`](#prepend)
 *
 * @category constructors
 * @since 3.0.0
 */
export const prependW: <B>(head: B) => <A>(tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A | B> = RNEA.prependW

/**
 * Prepend an element to the front of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { prepend } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], prepend(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 3.0.0
 */
export const prepend: <A>(head: A) => (tail: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = RNEA.prepend

/**
 * Less strict version of [`append`](#append)
 *
 * @category constructors
 * @since 3.0.0
 */
export const appendW: <B>(end: B) => <A>(init: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A | B> = RNEA.appendW

/**
 * Append an element to the end of a `ReadonlyArray`, creating a new `ReadonlyNonEmptyArray`.
 *
 * @example
 * import { append } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 3.0.0
 */
export const append: <A>(end: A) => (init: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A> = RNEA.append

/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { head } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 3.0.0
 */
export const head = <A>(as: ReadonlyArray<A>): Option<A> => (isNonEmpty(as) ? _.some(RNEA.head(as)) : _.none)

/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { last } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 3.0.0
 */
export const last = <A>(as: ReadonlyArray<A>): Option<A> => (isNonEmpty(as) ? _.some(RNEA.last(as)) : _.none)

/**
 * Get all but the first element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { tail } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 3.0.0
 */
export const tail = <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> =>
  isNonEmpty(as) ? _.some(RNEA.tail(as)) : _.none

/**
 * Get all but the last element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { init } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 3.0.0
 */
export const init = <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> =>
  isNonEmpty(as) ? _.some(RNEA.init(as)) : _.none

/**
 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
 *
 * @category combinators
 * @since 3.0.0
 */
export const takeLeft = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(0, n)

/**
 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeRight(2)), [2, 3])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeRight(4)), input)
 * assert.strictEqual(pipe(input, RA.takeRight(-1)), input)
 *
 * @since 3.0.0
 */
export const takeRight = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(-n)

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.
 *
 * @example
 * import { takeLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export function takeLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as: ReadonlyArray<A>) => {
    const out: Array<A> = []
    for (const a of as) {
      if (!predicate(a)) {
        break
      }
      out.push(a)
    }
    const len = out.length
    return len === as.length ? as : len === 0 ? empty : out
  }
}

const spanLeftIndex = <A>(as: ReadonlyArray<A>, predicate: Predicate<A>): number => {
  const l = as.length
  let i = 0
  for (; i < l; i++) {
    if (!predicate(as[i])) {
      break
    }
  }
  return i
}

/**
 * Split a `ReadonlyArray` into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [[1, 3], [2, 4, 5]])
 *
 * @since 3.0.0
 */
export function spanLeft<A, B extends A>(
  refinement: Refinement<A, B>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<A>]
export function spanLeft<A>(
  predicate: Predicate<A>
): <B extends A>(bs: ReadonlyArray<B>) => readonly [init: ReadonlyArray<B>, rest: ReadonlyArray<B>]
export function spanLeft<A>(
  predicate: Predicate<A>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<A>, rest: ReadonlyArray<A>]
export function spanLeft<A>(
  predicate: Predicate<A>
): (as: ReadonlyArray<A>) => readonly [init: ReadonlyArray<A>, rest: ReadonlyArray<A>] {
  return (as) => splitAt(spanLeftIndex(as, predicate))(as)
}

/**
 * Drop a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
 *
 * @category combinators
 * @since 3.0.0
 */
export const dropLeft = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(n, as.length)

/**
 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
 *
 * @category combinators
 * @since 3.0.0
 */
export const dropRight = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(0, as.length - n)

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.
 *
 * @example
 * import { dropLeftWhile } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
 * @category combinators
 * @since 3.0.0
 */
export function dropLeftWhile<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => ReadonlyArray<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => ReadonlyArray<B>
export function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
export function dropLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => {
    const i = spanLeftIndex(as, predicate)
    return i === 0 ? as : i === as.length ? empty : as.slice(i)
  }
}

/**
 * Find the first index for which a predicate holds
 *
 * @example
 * import { findIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 3.0.0
 */
export const findIndex = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): Option<number> => {
  const len = as.length
  for (let i = 0; i < len; i++) {
    if (predicate(as[i])) {
      return _.some(i)
    }
  }
  return _.none
}

/**
 * Find the first element which satisfies a predicate (or a refinement) function
 *
 * @example
 * import { findFirst } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findFirst((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 1 }))
 *
 * @since 3.0.0
 */
export function findFirst<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export function findFirst<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
export function findFirst<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A> {
  return (as) => {
    const len = as.length
    for (let i = 0; i < len; i++) {
      if (predicate(as[i])) {
        return _.some(as[i])
      }
    }
    return _.none
  }
}

/**
 * Find the first element returned by an option based selector function
 *
 * @example
 * import { findFirstMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the first person that has an age
 * assert.deepStrictEqual(findFirstMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Mary'))
 *
 * @since 3.0.0
 */
export const findFirstMap = <A, B>(f: (a: A) => Option<B>) => (as: ReadonlyArray<A>): Option<B> => {
  const len = as.length
  for (let i = 0; i < len; i++) {
    const v = f(as[i])
    if (_.isSome(v)) {
      return v
    }
  }
  return _.none
}

/**
 * Find the last element which satisfies a predicate function
 *
 * @example
 * import { findLast } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(findLast((x: { a: number, b: number }) => x.a === 1)([{ a: 1, b: 1 }, { a: 1, b: 2 }]), some({ a: 1, b: 2 }))
 *
 * @since 3.0.0
 */
export function findLast<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Option<B>
export function findLast<A>(predicate: Predicate<A>): <B extends A>(bs: ReadonlyArray<B>) => Option<B>
export function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A>
export function findLast<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Option<A> {
  return (as) => {
    const len = as.length
    for (let i = len - 1; i >= 0; i--) {
      if (predicate(as[i])) {
        return _.some(as[i])
      }
    }
    return _.none
  }
}

/**
 * Find the last element returned by an option based selector function
 *
 * @example
 * import { findLastMap } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface Person {
 *   name: string
 *   age?: number
 * }
 *
 * const persons: ReadonlyArray<Person> = [{ name: 'John' }, { name: 'Mary', age: 45 }, { name: 'Joey', age: 28 }]
 *
 * // returns the name of the last person that has an age
 * assert.deepStrictEqual(findLastMap((p: Person) => (p.age === undefined ? none : some(p.name)))(persons), some('Joey'))
 *
 * @since 3.0.0
 */
export const findLastMap = <A, B>(f: (a: A) => Option<B>) => (as: ReadonlyArray<A>): Option<B> => {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    const v = f(as[i])
    if (_.isSome(v)) {
      return v
    }
  }
  return _.none
}

/**
 * Returns the index of the last element of the list which matches the predicate
 *
 * @example
 * import { findLastIndex } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 *
 * @since 3.0.0
 */
export const findLastIndex = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): Option<number> => {
  const len = as.length
  for (let i = len - 1; i >= 0; i--) {
    if (predicate(as[i])) {
      return _.some(i)
    }
  }
  return _.none
}

/**
 * Insert an element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.
 *
 * @example
 * import { insertAt } from 'fp-ts/ReadonlyArray'
 * import { some } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 3.0.0
 */
export const insertAt = <A>(i: number, a: A) => (as: ReadonlyArray<A>): Option<ReadonlyNonEmptyArray<A>> => {
  if (i < 0 || i > as.length) {
    return _.none
  }
  if (isNonEmpty(as)) {
    const out = NEA.fromReadonlyNonEmptyArray(as)
    out.splice(i, 0, a)
    return _.some(out)
  }
  return _.some([a])
}

/**
 * Change the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.
 *
 * @example
 * import { updateAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(updateAt(1, 1)([1, 2, 3]), some([1, 1, 3]))
 * assert.deepStrictEqual(updateAt(1, 1)([]), none)
 *
 * @since 3.0.0
 */
export const updateAt = <A>(i: number, a: A): ((as: ReadonlyArray<A>) => Option<ReadonlyArray<A>>) =>
  modifyAt(i, () => a)

/**
 * Apply a function to the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out
 * of bounds.
 *
 * @example
 * import { modifyAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 3.0.0
 */
export const modifyAt = <A>(i: number, f: Endomorphism<A>) => (as: ReadonlyArray<A>): Option<ReadonlyArray<A>> => {
  if (isOutOfBound(i, as)) {
    return _.none
  }
  const prev = as[i]
  const next = f(prev)
  if (next === prev) {
    return _.some(as)
  }
  const out = as.slice()
  out[i] = next
  return _.some(out)
}

const unsafeDeleteAt = <A>(i: number, as: ReadonlyArray<A>): ReadonlyArray<A> => {
  const xs = as.slice()
  xs.splice(i, 1)
  return xs
}

/**
 * Delete the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.
 *
 * @example
 * import { deleteAt } from 'fp-ts/ReadonlyArray'
 * import { some, none } from 'fp-ts/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 3.0.0
 */
export const deleteAt = (i: number) => <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> =>
  isOutOfBound(i, as) ? _.none : _.some(unsafeDeleteAt(i, as))

/**
 * Reverse a `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * @example
 * import { reverse } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @category combinators
 * @since 3.0.0
 */
export const reverse = <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => (as.length <= 1 ? as : as.slice().reverse())

/**
 * Extracts from a `ReadonlyArray` of `Either`s all the `Right` elements.
 *
 * @example
 * import { rights } from 'fp-ts/ReadonlyArray'
 * import { right, left } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(rights([right(1), left('foo'), right(2)]), [1, 2])
 *
 * @category combinators
 * @since 3.0.0
 */
export const rights = <E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<A> => {
  const len = as.length
  const out: Array<A> = []
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (_.isRight(a)) {
      out.push(a.right)
    }
  }
  return out
}

/**
 * Extracts from a `ReadonlyArray` of `Either` all the `Left` elements. All the `Left` elements are extracted in order
 *
 * @example
 * import { lefts } from 'fp-ts/ReadonlyArray'
 * import { left, right } from 'fp-ts/Either'
 *
 * assert.deepStrictEqual(lefts([right(1), left('foo'), right(2)]), ['foo'])
 *
 * @category combinators
 * @since 3.0.0
 */
export const lefts = <E, A>(as: ReadonlyArray<Either<E, A>>): ReadonlyArray<E> => {
  const out: Array<E> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (_.isLeft(a)) {
      out.push(a.left)
    }
  }
  return out
}

/**
 * Sort the elements of a `ReadonlyArray` in increasing order, creating a new `ReadonlyArray`.
 *
 * @example
 * import { sort } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @category combinators
 * @since 3.0.0
 */
export const sort = <B>(O: Ord<B>) => <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  as.length <= 1 ? as : as.slice().sort((first, second) => O.compare(second)(first))

/**
 * Apply a function to pairs of elements at the same index in two `ReadonlyArray`s, collecting the results in a new `ReadonlyArray`. If one
 * input `ReadonlyArray` is short, excess elements of the longer `ReadonlyArray` are discarded.
 *
 * @example
 * import { zipWith } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)), ['a1', 'b2', 'c3'])
 *
 * @category combinators
 * @since 3.0.0
 */
export const zipWith = <B, A, C>(fb: ReadonlyArray<B>, f: (a: A, b: B) => C) => (
  fa: ReadonlyArray<A>
): ReadonlyArray<C> => {
  const out: Array<C> = []
  const len = Math.min(fa.length, fb.length)
  for (let i = 0; i < len; i++) {
    out[i] = f(fa[i], fb[i])
  }
  return out
}

/**
 * Takes two `ReadonlyArray`s and returns a `ReadonlyArray` of corresponding pairs. If one input `ReadonlyArray` is short, excess elements of the
 * longer `ReadonlyArray` are discarded.
 *
 * @example
 * import { zip } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @category combinators
 * @since 3.0.0
 */
export const zip: <B>(bs: ReadonlyArray<B>) => <A>(as: ReadonlyArray<A>) => ReadonlyArray<readonly [A, B]> = (bs) =>
  zipWith(bs, (a, b) => [a, b])

/**
 * This function is the inverse of `zip`. Takes a `ReadonlyArray` of pairs and return two corresponding `ReadonlyArray`s.
 *
 * @example
 * import { unzip } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(unzip([[1, 'a'], [2, 'b'], [3, 'c']]), [[1, 2, 3], ['a', 'b', 'c']])
 *
 * @since 3.0.0
 */
export const unzip = <A, B>(as: ReadonlyArray<readonly [A, B]>): readonly [ReadonlyArray<A>, ReadonlyArray<B>] => {
  const fa: Array<A> = []
  const fb: Array<B> = []
  for (let i = 0; i < as.length; i++) {
    fa[i] = as[i][0]
    fb[i] = as[i][1]
  }
  return [fa, fb]
}

/**
 * Prepend an element to every member of a `ReadonlyArray`
 *
 * @example
 * import { prependAll } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export const prependAll = <A>(middle: A): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = RNEA.prependAll(middle)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Places an element in between members of a `ReadonlyArray`
 *
 * @example
 * import { intersperse } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
 *
 * @category combinators
 * @since 3.0.0
 */
export const intersperse = <A>(middle: A): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = RNEA.intersperse(middle)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Rotate a `ReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @category combinators
 * @since 3.0.0
 */
export const rotate = (n: number): (<A>(as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = RNEA.rotate(n)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Tests whether a value is a member of a `ReadonlyArray`.
 *
 * @example
 * import { elem } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) => (a: A) => (as: ReadonlyArray<A>): boolean => {
  const predicate = E.equals(a)
  let i = 0
  const len = as.length
  for (; i < len; i++) {
    if (predicate(as[i])) {
      return true
    }
  }
  return false
}

/**
 * Remove duplicates from a `ReadonlyArray`, keeping the first occurrence of an element.
 *
 * @example
 * import { uniq } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @category combinators
 * @since 3.0.0
 */
export const uniq = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = RNEA.uniq(E)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Sort the elements of a `ReadonlyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from 'fp-ts/ReadonlyArray'
 * import { contramap } from 'fp-ts/Ord'
 * import * as S from 'fp-ts/string'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * interface Person {
 *   name: string
 *   age: number
 * }
 * const byName = pipe(S.Ord, contramap((p: Person) => p.name))
 * const byAge = pipe(N.Ord, contramap((p: Person) => p.age))
 *
 * const sortByNameByAge = sortBy([byName, byAge])
 *
 * const persons = [{ name: 'a', age: 1 }, { name: 'b', age: 3 }, { name: 'c', age: 2 }, { name: 'b', age: 2 }]
 * assert.deepStrictEqual(sortByNameByAge(persons), [
 *   { name: 'a', age: 1 },
 *   { name: 'b', age: 2 },
 *   { name: 'b', age: 3 },
 *   { name: 'c', age: 2 }
 * ])
 *
 * @category combinators
 * @since 3.0.0
 */
export const sortBy = <B>(ords: ReadonlyArray<Ord<B>>): (<A extends B>(as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = RNEA.sortBy(ords)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
 * `ReadonlyArray`. Typically chop is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
 * value and the rest of the `ReadonlyArray`.
 *
 * @example
 * import { Eq } from 'fp-ts/Eq'
 * import * as N from 'fp-ts/number'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const group = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return RA.chop(as => pipe(as, RA.spanLeft(E.equals(as[0]))))
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @category combinators
 * @since 3.0.0
 */
export const chop = <A, B>(
  f: (as: ReadonlyNonEmptyArray<A>) => readonly [B, ReadonlyArray<A>]
): ((as: ReadonlyArray<A>) => ReadonlyArray<B>) => {
  const g = RNEA.chop(f)
  return (as) => (isNonEmpty(as) ? g(as) : empty)
}

/**
 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @category combinators
 * @since 3.0.0
 */
export const splitAt = (n: number) => <A>(as: ReadonlyArray<A>): readonly [ReadonlyArray<A>, ReadonlyArray<A>] =>
  n >= 1 && isNonEmpty(as) ? RNEA.splitAt(n)(as) : isEmpty(as) ? [as, empty] : [empty, as]

/**
 * Splits a `ReadonlyArray` into length-`n` pieces. The last piece will be shorter if `n` does not evenly divide the length of
 * the `ReadonlyArray`. Note that `chunksOf(n)([])` is `[]`, not `[[]]`. This is intentional, and is consistent with a recursive
 * definition of `chunksOf`; it satisfies the property that
 *
 * ```ts
 * chunksOf(n)(xs).concat(chunksOf(n)(ys)) == chunksOf(n)(xs.concat(ys)))
 * ```
 *
 * whenever `n` evenly divides the length of `as`.
 *
 * @example
 * import { chunksOf } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 3.0.0
 */
export const chunksOf = (n: number): (<A>(as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>>) => {
  const f = RNEA.chunksOf(n)
  return (as) => (isNonEmpty(as) ? f(as) : empty)
}

/**
 * Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.
 *
 * @example
 * import { union } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
 *
 * @category combinators
 * @since 3.0.0
 */
export const union = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>>['concat'] => {
  const unionE = RNEA.union(E)
  return (second) => (first) =>
    isNonEmpty(first) && isNonEmpty(second) ? unionE(second)(first) : isNonEmpty(first) ? first : second
}

/**
 * Creates a `ReadonlyArray` of unique values that are included in all given `ReadonlyArray`s using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first `ReadonlyArray`.
 *
 * @example
 * import { intersection } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
 *
 * @category combinators
 * @since 3.0.0
 */
export const intersection = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>>['concat'] => {
  const elemE = elem(E)
  return (second) => (first) => first.filter((a) => elemE(a)(second))
}

/**
 * Creates a `ReadonlyArray` of values not included in the other given `ReadonlyArray` using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first `ReadonlyArray`.
 *
 * @example
 * import { difference } from 'fp-ts/ReadonlyArray'
 * import * as N from 'fp-ts/number'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
 *
 * @category combinators
 * @since 3.0.0
 */
export const difference = <A>(E: Eq<A>): Magma<ReadonlyArray<A>>['concat'] => {
  const elemE = elem(E)
  return (second) => (first) => first.filter((a) => !elemE(a)(second))
}

/**
 * @category Pointed
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReadonlyArray<A> = RNEA.of

/**
 * @category Zero
 * @since 3.0.0
 */
export const zero: <A>() => ReadonlyArray<A> = () => empty

/**
 * Less strict version of [`alt`](#alt).
 *
 * The `W` suffix (short for **W**idening) means that the return types will be merged.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.altW(() => ['a', 'b'])
 *   ),
 *   [1, 2, 3, 'a', 'b']
 * )
 *
 * @category Alt
 * @since 3.0.0
 */
export const altW = <B>(second: Lazy<ReadonlyArray<B>>) => <A>(first: ReadonlyArray<A>): ReadonlyArray<A | B> =>
  (first as ReadonlyArray<A | B>).concat(second())

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.alt(() => [4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @category Alt
 * @since 3.0.0
 */
export const alt: <A>(second: Lazy<ReadonlyArray<A>>) => (first: ReadonlyArray<A>) => ReadonlyArray<A> = altW

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: <A>(fa: ReadonlyArray<A>) => <B>(fab: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B> = (fa) =>
  chain((f) => pipe(fa, map(f)))

/**
 * @since 3.0.0
 */
export const chainWithIndex = <A, B>(f: (i: number, a: A) => ReadonlyArray<B>) => (
  as: ReadonlyArray<A>
): ReadonlyArray<B> => {
  if (isEmpty(as)) {
    return empty
  }
  const out: Array<B> = []
  for (let i = 0; i < as.length; i++) {
    out.push(...f(i, as[i]))
  }
  return out
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chain((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chain(() => [])
 *   ),
 *   []
 * )
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: <A, B>(f: (a: A) => ReadonlyArray<B>) => (ma: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  chainWithIndex((_, a) => f(a))

/**
 * Removes one level of nesting
 *
 * Derivable from `Chain`.
 *
 * @example
 * import { flatten } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2, 3], [4]]), [1, 2, 3, 4])
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const flatten: <A>(mma: ReadonlyArray<ReadonlyArray<A>>) => ReadonlyArray<A> = /*#__PURE__*/ chain(identity)

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (fa) =>
  fa.map((a) => f(a)) // <= intended eta expansion

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (
  fa
) => fa.map((a, i) => f(i, a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => Option<B>
) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = <A, B>(f: (i: number, a: A) => Option<B>) => (
  fa: ReadonlyArray<A>
): ReadonlyArray<B> => {
  const out: Array<B> = []
  for (let i = 0; i < fa.length; i++) {
    const optionB = f(i, fa[i])
    if (_.isSome(optionB)) {
      out.push(optionB.value)
    }
  }
  return out
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  filterMapWithIndex((_, a) => f(a))

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: <A>(foa: ReadonlyArray<Option<A>>) => ReadonlyArray<A> = /*#__PURE__*/ filterMap(
  identity as any
) as any // TODO

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: <A, B>(fe: ReadonlyArray<Either<A, B>>) => Separated<ReadonlyArray<A>, ReadonlyArray<B>> = <
  A,
  B
>(
  fa: ReadonlyArray<Either<A, B>>
) => {
  const left: Array<A> = []
  const right: Array<B> = []
  for (const e of fa) {
    if (_.isLeft(e)) {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return separated(left, right)
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const filter: {
  <A, B extends A>(refinement: Refinement<A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): <B extends A>(fb: ReadonlyArray<B>) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
} = <A>(predicate: Predicate<A>) => (fa: ReadonlyArray<A>) => fa.filter(predicate)

/**
 * @category Filterable
 * @since 3.0.00
 */
export const partition: {
  <A, B extends A>(refinement: Refinement<A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicate: Predicate<A>): <B extends A>(fb: ReadonlyArray<B>) => Separated<ReadonlyArray<B>, ReadonlyArray<B>>
  <A>(predicate: Predicate<A>): (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
} = <A>(predicate: Predicate<A>): ((fa: ReadonlyArray<A>) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(
    fb: ReadonlyArray<B>
  ) => Separated<ReadonlyArray<B>, ReadonlyArray<B>>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (
    fa: ReadonlyArray<A>
  ) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>
} = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (
  fa: ReadonlyArray<A>
): Separated<ReadonlyArray<A>, ReadonlyArray<A>> => {
  const left: Array<A> = []
  const right: Array<A> = []
  for (let i = 0; i < fa.length; i++) {
    const a = fa[i]
    if (predicateWithIndex(i, a)) {
      right.push(a)
    } else {
      left.push(a)
    }
  }
  return separated(left, right)
}

/**
 * @category Filterable
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Either<B, C>
) => (fa: ReadonlyArray<A>) => Separated<ReadonlyArray<B>, ReadonlyArray<C>> = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionMapWithIndex = <A, B, C>(f: (i: number, a: A) => Either<B, C>) => (
  fa: ReadonlyArray<A>
): Separated<ReadonlyArray<B>, ReadonlyArray<C>> => {
  const left: Array<B> = []
  const right: Array<C> = []
  for (let i = 0; i < fa.length; i++) {
    const e = f(i, fa[i])
    if (_.isLeft(e)) {
      left.push(e.left)
    } else {
      right.push(e.right)
    }
  }
  return separated(left, right)
}

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const filterWithIndex: {
  <A, B extends A>(refinementWithIndex: RefinementWithIndex<number, A, B>): (fa: ReadonlyArray<A>) => ReadonlyArray<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): <B extends A>(fb: ReadonlyArray<B>) => ReadonlyArray<B>
  <A>(predicateWithIndex: PredicateWithIndex<number, A>): (fa: ReadonlyArray<A>) => ReadonlyArray<A>
} = <A>(predicateWithIndex: PredicateWithIndex<number, A>) => (fa: ReadonlyArray<A>): ReadonlyArray<A> =>
  fa.filter((a, i) => predicateWithIndex(i, a))

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: ReadonlyArray<A>) => B) => (wa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (
  wa
) => wa.map((_, i, as) => f(as.slice(i)))

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <A>(wa: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>> = /*#__PURE__*/ extend(identity)

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const foldMapWithIndex: <M>(M: Monoid<M>) => <A>(f: (i: number, a: A) => M) => (fa: ReadonlyArray<A>) => M = (
  M
) => (f) => (fa) => fa.reduce((b, a, i) => M.concat(f(i, a))(b), M.empty)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B = (b, f) =>
  reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: <M>(M: Monoid<M>) => <A>(f: (a: A) => M) => (fa: ReadonlyArray<A>) => M = (M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (f) => foldMapWithIndexM((_, a) => f(a))
}

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceWithIndex: <B, A>(b: B, f: (i: number, b: B, a: A) => B) => (fa: ReadonlyArray<A>) => B = (b, f) => (
  fa
) => {
  const len = fa.length
  let r = b
  for (let i = 0; i < len; i++) {
    r = f(i, r, fa[i])
  }
  return r
}

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B = (b, f) =>
  reduceRightWithIndex(b, (_, a, b) => f(a, b))

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceRightWithIndex: <B, A>(b: B, f: (i: number, a: A, b: B) => B) => (fa: ReadonlyArray<A>) => B = (
  b,
  f
) => (fa) => fa.reduceRight((b, a, i) => f(i, a, b), b)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E, B>(
  f: (a: A) => Kind<F, S, R, E, B>
) => (ta: ReadonlyArray<A>) => Kind<F, S, R, E, ReadonlyArray<B>> = (F) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category TraversableWithIndex
 * @since 3.0.0
 */
export const traverseWithIndex: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E, B>(
  f: (i: number, a: A) => Kind<F, S, R, E, B>
) => (ta: ReadonlyArray<A>) => Kind<F, S, R, E, ReadonlyArray<B>> = (F) => (f) =>
  reduceWithIndex(F.of(zero()), (i, fbs, a) =>
    pipe(
      fbs,
      F.map((bs) => (b: any) => append(b)(bs)), // TODO
      F.ap(f(i, a))
    )
  )

/**
 * @category Unfoldable
 * @since 3.0.0
 */
export const unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => ReadonlyArray<A> = <B, A>(
  b: B,
  f: (b: B) => Option<readonly [A, B]>
) => {
  const out: Array<A> = []
  let next: B = b
  let o: Option<readonly [A, B]>
  while (_.isSome((o = f(next)))) {
    const [a, b] = o.value
    out.push(a)
    next = b
  }
  return out
}

// -------------------------------------------------------------------------------------
// instances
// -------------------------------------------------------------------------------------

/**
 * @category instances
 * @since 3.0.0
 */
export interface ReadonlyArrayF extends HKT {
  readonly type: ReadonlyArray<this['A']>
}

/**
 * @category instances
 * @since 3.0.0
 */
export const getShow = <A>(S: Show<A>): Show<ReadonlyArray<A>> => ({
  show: (as) => `[${as.map(S.show).join(', ')}]`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>> => ({
  concat: union(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(E: Eq<A>): Monoid<ReadonlyArray<A>> => ({
  concat: getUnionSemigroup(E).concat,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>> => ({
  concat: intersection(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(E: Eq<A>): Magma<ReadonlyArray<A>> => ({
  concat: difference(E)
})

/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @example
 * import { getSemigroup } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const S = getSemigroup<number>()
 * assert.deepStrictEqual(pipe([1, 2], S.concat([3, 4])), [1, 2, 3, 4])
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A = never>(): Semigroup<ReadonlyArray<A>> => ({
  concat
})

/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A = never>(): Monoid<ReadonlyArray<A>> => ({
  concat: getSemigroup<A>().concat,
  empty
})

/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * `ReadonlyArray`s as equal if all elements of both `ReadonlyArray`s are compared equal pairwise with the given `E`. In case of `ReadonlyArray`s of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { getEq } from 'fp-ts/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'])(['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'])([]), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<ReadonlyArray<A>> =>
  fromEquals((second) => (first) => first.length === second.length && first.every((x, i) => E.equals(second[i])(x)))

/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * `ReadonlyArray`s is equal to: the first non equal comparison of each `ReadonlyArray`s elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest `ReadonlyArray` is considered the greatest, if both `ReadonlyArray`s have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from 'fp-ts/ReadonlyArray'
 * import * as S from 'fp-ts/string'
 * import { pipe } from 'fp-ts/function'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(pipe(['b'], O.compare(['a'])), 1)
 * assert.strictEqual(pipe(['a'], O.compare(['a'])), 0)
 * assert.strictEqual(pipe(['a'], O.compare(['b'])), -1)
 *
 *
 * @category instances
 * @since 3.0.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<ReadonlyArray<A>> =>
  fromCompare((second) => (first) => {
    const aLen = first.length
    const bLen = second.length
    const len = Math.min(aLen, bLen)
    for (let i = 0; i < len; i++) {
      const o = O.compare(second[i])(first[i])
      if (o !== 0) {
        return o
      }
    }
    return N.Ord.compare(bLen)(aLen)
  })

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: Functor_<ReadonlyArrayF> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B> = /*#__PURE__*/ flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed_<ReadonlyArrayF> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: FunctorWithIndex_<ReadonlyArrayF, number> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply_<ReadonlyArrayF> = {
  map,
  ap
}

/**
 * Combine two effectful actions, keeping only the result of the first.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apFirst: <B>(
  second: ReadonlyArray<B>
) => <A>(first: ReadonlyArray<A>) => ReadonlyArray<A> = /*#__PURE__*/ apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond: <B>(
  second: ReadonlyArray<B>
) => <A>(first: ReadonlyArray<A>) => ReadonlyArray<B> = /*#__PURE__*/ apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative_<ReadonlyArrayF> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain_<ReadonlyArrayF> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<ReadonlyArrayF> = {
  map,
  of,
  chain
}

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation and
 * keeping only the result of the first.
 *
 * Derivable from `Chain`.
 *
 * @example
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.chainFirst(() => [])
 *   ),
 *   []
 * )
 *
 * @category combinators
 * @since 3.0.0
 */
export const chainFirst: <A, B>(
  f: (a: A) => ReadonlyArray<B>
) => (first: ReadonlyArray<A>) => ReadonlyArray<A> = /*#__PURE__*/ chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Unfoldable: Unfoldable_<ReadonlyArrayF> = {
  unfold
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt_<ReadonlyArrayF> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Zero: Zero_<ReadonlyArrayF> = {
  zero
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const guard: (b: boolean) => ReadonlyArray<void> = /*#__PURE__*/ guard_(Zero, Pointed)

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative_<ReadonlyArrayF> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Extend: Extend_<ReadonlyArrayF> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable_<ReadonlyArrayF> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable_<ReadonlyArrayF> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: FilterableWithIndex_<ReadonlyArrayF, number> = {
  partitionMapWithIndex,
  partitionWithIndex,
  filterMapWithIndex,
  filterWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable_<ReadonlyArrayF> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: FoldableWithIndex_<ReadonlyArrayF, number> = {
  reduceWithIndex,
  foldMapWithIndex,
  reduceRightWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable_<ReadonlyArrayF> = {
  map,
  traverse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: TraversableWithIndex_<ReadonlyArrayF, number> = {
  traverseWithIndex
}

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E, B>(
  f: (a: A) => Kind<F, S, R, E, Option<B>>
) => (ta: ReadonlyArray<A>) => Kind<F, S, R, E, ReadonlyArray<B>> = /*#__PURE__*/ witherDefault(
  Traversable,
  Compactable
)

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E, B, C>(
  f: (a: A) => Kind<F, S, R, E, Either<B, C>>
) => (
  wa: ReadonlyArray<A>
) => Kind<F, S, R, E, Separated<ReadonlyArray<B>, ReadonlyArray<C>>> = /*#__PURE__*/ wiltDefault(
  Traversable,
  Compactable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Witherable: Witherable_<ReadonlyArrayF> = {
  wither,
  wilt
}

/**
 * Filter values inside a context.
 *
 * @example
 * import { pipe } from 'fp-ts/function'
 * import * as RA from 'fp-ts/ReadonlyArray'
 * import * as T from 'fp-ts/Task'
 *
 * const filterE = RA.filterE(T.ApplicativePar)
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       [-1, 2, 3],
 *       filterE((n) => T.of(n > 0))
 *     )(),
 *     [2, 3]
 *   )
 * }
 * test()
 *
 * @since 3.0.0
 */
export const filterE: <F extends HKT>(
  F: Applicative_<F>
) => <A, S, R, E>(
  predicate: (a: A) => Kind<F, S, R, E, boolean>
) => (ga: ReadonlyArray<A>) => Kind<F, S, R, E, ReadonlyArray<A>> = /*#__PURE__*/ filterE_(Witherable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither_<ReadonlyArrayF> = {
  fromEither
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate: {
  <A, B extends A>(refinement: Refinement<A, B>): (a: A) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): <B extends A>(b: B) => ReadonlyArray<B>
  <A>(predicate: Predicate<A>): (a: A) => ReadonlyArray<A>
} = /*#__PURE__*/ fromPredicate_(FromEither)

/**
 * @category combinators
 * @since 3.0.0
 */
export const fromEitherK: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Either<E, B>
) => (...a: A) => ReadonlyArray<B> = /*#__PURE__*/ fromEitherK_(FromEither)

/**
 * @category ChainRec
 * @since 3.0.0
 */
export const chainRecDepthFirst = <A, B>(f: (a: A) => ReadonlyArray<Either<A, B>>) => (a: A): ReadonlyArray<B> => {
  const todo: Array<Either<A, B>> = [...f(a)]
  const out: Array<B> = []

  while (todo.length > 0) {
    const e = todo.shift()!
    if (_.isLeft(e)) {
      todo.unshift(...f(e.left))
    } else {
      out.push(e.right)
    }
  }

  return out
}

/**
 * @category ChainRec
 * @since 3.0.0
 */
export const chainRecBreadthFirst = <A, B>(f: (a: A) => ReadonlyArray<Either<A, B>>) => (a: A): ReadonlyArray<B> => {
  const initial = f(a)
  const todo: Array<Either<A, B>> = []
  const out: Array<B> = []

  function go(e: Either<A, B>): void {
    if (_.isLeft(e)) {
      f(e.left).forEach((v) => todo.push(v))
    } else {
      out.push(e.right)
    }
  }

  for (const e of initial) {
    go(e)
  }

  while (todo.length > 0) {
    go(todo.shift()!)
  }

  return out
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ChainRecDepthFirst: ChainRec_<ReadonlyArrayF> = {
  chainRec: chainRecDepthFirst
}

/**
 * @category instances
 * @since 3.0.0
 */
export const ChainRecBreadthFirst: ChainRec_<ReadonlyArrayF> = {
  chainRec: chainRecBreadthFirst
}

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * An empty `ReadonlyArray`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyArray<never> = _.emptyReadonlyArray

/**
 * Check if a predicate holds true for every `ReadonlyArray` member.
 *
 * @example
 * import { every } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], every(isPositive)), true)
 * assert.deepStrictEqual(pipe([1, 2, -3], every(isPositive)), false)
 *
 * @since 3.0.0
 */
export function every<A, B extends A>(refinement: Refinement<A, B>): Refinement<ReadonlyArray<A>, ReadonlyArray<B>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>>
export function every<A>(predicate: Predicate<A>): Predicate<ReadonlyArray<A>> {
  return (as) => as.every(predicate)
}

/**
 * Check if a predicate holds true for any `ReadonlyArray` member.
 *
 * @example
 * import { some } from 'fp-ts/ReadonlyArray'
 * import { pipe } from 'fp-ts/function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 3.0.0
 */
export const some = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): as is ReadonlyNonEmptyArray<A> =>
  as.some(predicate)

/**
 * Alias of [`some`](#some)
 *
 * @since 3.0.0
 */
export const exists = some

/**
 * Places an element in between members of a `ReadonlyArray`, then folds the results using the provided `Monoid`.
 *
 * @example
 * import * as S from 'fp-ts/string'
 * import { intercalate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 3.0.0
 */
export const intercalate = <A>(M: Monoid<A>): ((middle: A) => (as: ReadonlyArray<A>) => A) => {
  const intercalateM = RNEA.intercalate(M)
  return (middle) => match(() => M.empty, intercalateM(middle))
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReadonlyArray<{}> = /*#__PURE__*/ of(_.emptyRecord)

/**
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(fa: ReadonlyArray<A>) => ReadonlyArray<{ readonly [K in N]: A }> = /*#__PURE__*/ bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  f: <A2 extends A>(a: A | A2) => ReadonlyArray<B>
) => (
  ma: ReadonlyArray<A>
) => ReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS: <N extends string, A, B>(
  name: Exclude<N, keyof A>,
  fb: ReadonlyArray<B>
) => (
  fa: ReadonlyArray<A>
) => ReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = /*#__PURE__*/ apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReadonlyArray<readonly []> = /*#__PURE__*/ of(_.emptyReadonlyArray)

/**
 * @since 3.0.0
 */
export const tupled: <A>(fa: ReadonlyArray<A>) => ReadonlyArray<readonly [A]> = /*#__PURE__*/ tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT: <B>(
  fb: ReadonlyArray<B>
) => <A extends ReadonlyArray<unknown>>(
  fas: ReadonlyArray<A>
) => ReadonlyArray<readonly [...A, B]> = /*#__PURE__*/ apT_(Apply)
