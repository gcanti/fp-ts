/**
 * @since 3.0.0
 */
import type * as alt from '@fp-ts/core/Alt'
import * as alternative from '@fp-ts/core/Alternative'
import type * as applicative from '@fp-ts/core/Applicative'
import * as apply from '@fp-ts/core/Apply'
import type * as compactable from '@fp-ts/core/Compactable'
import type { Endomorphism } from '@fp-ts/core/Endomorphism'
import type { Eq } from '@fp-ts/core/Eq'
import * as eq from '@fp-ts/core/Eq'
import type * as extendable from '@fp-ts/core/Extendable'
import * as filterable from '@fp-ts/core/Filterable'
import * as filterableWithIndex from '@fp-ts/core/FilterableWithIndex'
import * as flattenable from '@fp-ts/core/Flattenable'
import type * as flattenableRec from '@fp-ts/core/FlattenableRec'
import * as foldable from '@fp-ts/core/Foldable'
import * as foldableWithIndex from '@fp-ts/core/FoldableWithIndex'
import * as fromIdentity from '@fp-ts/core/FromIdentity'
import * as fromOption_ from '@fp-ts/core/FromOption'
import * as fromResult_ from '@fp-ts/core/FromResult'
import type { LazyArg } from '@fp-ts/core/Function'
import { identity, pipe } from '@fp-ts/core/Function'
import * as functor from '@fp-ts/core/Functor'
import type * as functorWithIndex from '@fp-ts/core/FunctorWithIndex'
import type { Kind, TypeLambda } from '@fp-ts/core/HKT'
import * as _ from '@fp-ts/core/internal'
import * as iterable from '@fp-ts/core/Iterable'
import type * as kleisliCategory from '@fp-ts/core/KleisliCategory'
import type * as kleisliComposable from '@fp-ts/core/KleisliComposable'
import type { Magma } from '@fp-ts/core/Magma'
import type { Monad as Monad_ } from '@fp-ts/core/Monad'
import type { Monoid } from '@fp-ts/core/Monoid'
import type { NonEmptyReadonlyArray } from '@fp-ts/core/NonEmptyReadonlyArray'
import * as nonEmptyReadonlyArray from '@fp-ts/core/NonEmptyReadonlyArray'
import * as number from '@fp-ts/core/number'
import type { Option } from '@fp-ts/core/Option'
import type { Ord } from '@fp-ts/core/Ord'
import * as ord from '@fp-ts/core/Ord'
import type { Predicate } from '@fp-ts/core/Predicate'
import type { Refinement } from '@fp-ts/core/Refinement'
import type { Result } from '@fp-ts/core/Result'
import type { Semigroup } from '@fp-ts/core/Semigroup'
import type { Show } from '@fp-ts/core/Show'
import * as traversable from '@fp-ts/core/Traversable'
import * as traversableFilterable from '@fp-ts/core/TraversableFilterable'
import type * as traversableWithIndex from '@fp-ts/core/TraversableWithIndex'
import type * as unfoldable from '@fp-ts/core/Unfoldable'

// -------------------------------------------------------------------------------------
// type lambdas
// -------------------------------------------------------------------------------------

/**
 * @category type lambdas
 * @since 3.0.0
 */
export interface ReadonlyArrayTypeLambda extends TypeLambda {
  readonly type: ReadonlyArray<this['Out1']>
}

/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { makeBy } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(pipe(5, makeBy(double)), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 3.0.0
 */
export const makeBy = <A>(f: (i: number) => A) =>
  (n: number): ReadonlyArray<A> => n <= 0 ? empty : nonEmptyReadonlyArray.makeBy(f)(n)

/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import { replicate } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe(3, replicate('a')), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 3.0.0
 */
export const replicate = <A>(a: A): ((n: number) => ReadonlyArray<A>) => makeBy(() => a)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromOption: <A>(fa: Option<A>) => ReadonlyArray<A> = (ma) => (_.isNone(ma) ? empty : [ma.value])

/**
 * Converts an `Result` to a `ReadonlyArray`.
 *
 * @category conversions
 * @since 3.0.0
 */
export const fromResult: <A>(fa: Result<unknown, A>) => ReadonlyArray<A> = (e) => (_.isFailure(e) ? empty : [e.success])

// -------------------------------------------------------------------------------------
// pattern matching
// -------------------------------------------------------------------------------------

/**
 * @category pattern matching
 * @since 3.0.0
 */
export const match = <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (as: NonEmptyReadonlyArray<A>) => C) =>
  (as: ReadonlyArray<A>): B | C => isNonEmpty(as) ? onNonEmpty(as) : onEmpty()

/**
 * Break a `ReadonlyArray` into its first element and remaining elements.
 *
 * @example
 * import { matchLeft } from '@fp-ts/core/ReadonlyArray'
 *
 * const len: <A>(as: ReadonlyArray<A>) => number = matchLeft(() => 0, (_, tail) => 1 + len(tail))
 * assert.strictEqual(len([1, 2, 3]), 3)
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const matchLeft = <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (head: A, tail: ReadonlyArray<A>) => C) =>
  (as: ReadonlyArray<A>): B | C =>
    isNonEmpty(as) ? onNonEmpty(nonEmptyReadonlyArray.head(as), nonEmptyReadonlyArray.tail(as)) : onEmpty()

/**
 * Break a `ReadonlyArray` into its initial elements and the last element.
 *
 * @category pattern matching
 * @since 3.0.0
 */
export const matchRight = <B, A, C = B>(onEmpty: LazyArg<B>, onNonEmpty: (init: ReadonlyArray<A>, last: A) => C) =>
  (as: ReadonlyArray<A>): B | C =>
    isNonEmpty(as) ? onNonEmpty(nonEmptyReadonlyArray.init(as), nonEmptyReadonlyArray.last(as)) : onEmpty()

/**
 * `ReadonlyArray` comprehension.
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from '@fp-ts/core/ReadonlyArray'
 * import { tuple } from '@fp-ts/core/tuple'
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
        nonEmptyReadonlyArray.head(input),
        flatMap((head) => go(append(head)(as), nonEmptyReadonlyArray.tail(input)))
      )
      : g(...as)
      ? [f(...as)]
      : empty
  return go(empty, input)
}

/**
 * @since 3.0.0
 */
export const concat = <B>(that: ReadonlyArray<B>) =>
  <A>(self: ReadonlyArray<A>): ReadonlyArray<A | B> =>
    isEmpty(self) ? that : isEmpty(that) ? self : (self as ReadonlyArray<A | B>).concat(that)

/**
 * Fold a `ReadonlyArray` from the left, keeping all intermediate results instead of only the final result.
 *
 * @example
 * import { scanLeft } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanLeft(10, (b, a: number) => b - a)([1, 2, 3]), [10, 9, 7, 4])
 *
 * @since 3.0.0
 */
export const scanLeft = <B, A>(b: B, f: (b: B, a: A) => B) =>
  (as: ReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
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
 * import { scanRight } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(scanRight(10, (a: number, b) => b - a)([1, 2, 3]), [4, 5, 7, 10])
 *
 * @since 3.0.0
 */
export const scanRight = <B, A>(b: B, f: (a: A, b: B) => B) =>
  (as: ReadonlyArray<A>): NonEmptyReadonlyArray<B> => {
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
 * import { isEmpty } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.strictEqual(isEmpty([]), true)
 *
 * @since 3.0.0
 */
export const isEmpty = <A>(as: ReadonlyArray<A>): as is readonly [] => as.length === 0

/**
 * Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category refinements
 * @since 3.0.0
 */
export const isNonEmpty: <A>(as: ReadonlyArray<A>) => as is NonEmptyReadonlyArray<A> = _.isNonEmpty

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
export const isOutOfBound: <A>(i: number, as: ReadonlyArray<A>) => boolean = nonEmptyReadonlyArray.isOutOfBound

/**
 * This function provides a safe way to read a value at a particular index from a `ReadonlyArray`
 *
 * @example
 * import { lookup } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(1)), some(2))
 * assert.deepStrictEqual(pipe([1, 2, 3], lookup(3)), none)
 *
 * @since 3.0.0
 */
export const lookup = (i: number) =>
  <A>(as: ReadonlyArray<A>): Option<A> => isOutOfBound(i, as) ? _.none : _.some(as[i])

/**
 * Prepend an element to the front of a `ReadonlyArray`, creating a new `NonEmptyReadonlyArray`.
 *
 * @example
 * import { prepend } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], prepend(0)), [0, 1, 2, 3])
 *
 * @category constructors
 * @since 3.0.0
 */
export const prepend: <B>(head: B) => <A>(tail: ReadonlyArray<A>) => NonEmptyReadonlyArray<A | B> =
  nonEmptyReadonlyArray.prepend

/**
 * Append an element to the end of a `ReadonlyArray`, creating a new `NonEmptyReadonlyArray`.
 *
 * @example
 * import { append } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], append(4)), [1, 2, 3, 4])
 *
 * @category constructors
 * @since 3.0.0
 */
export const append: <B>(end: B) => <A>(init: ReadonlyArray<A>) => NonEmptyReadonlyArray<A | B> =
  nonEmptyReadonlyArray.append

/**
 * Get the first element of a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { head } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(head([1, 2, 3]), some(1))
 * assert.deepStrictEqual(head([]), none)
 *
 * @since 3.0.0
 */
export const head = <A>(as: ReadonlyArray<A>): Option<A> =>
  isNonEmpty(as) ? _.some(nonEmptyReadonlyArray.head(as)) : _.none

/**
 * Get the last element in a `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { last } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(last([1, 2, 3]), some(3))
 * assert.deepStrictEqual(last([]), none)
 *
 * @since 3.0.0
 */
export const last = <A>(as: ReadonlyArray<A>): Option<A> =>
  isNonEmpty(as) ? _.some(nonEmptyReadonlyArray.last(as)) : _.none

/**
 * Get all but the first element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { tail } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(tail([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(tail([]), none)
 *
 * @since 3.0.0
 */
export const tail = <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> =>
  isNonEmpty(as) ? _.some(nonEmptyReadonlyArray.tail(as)) : _.none

/**
 * Get all but the last element of a `ReadonlyArray`, creating a new `ReadonlyArray`, or `None` if the `ReadonlyArray` is empty.
 *
 * @example
 * import { init } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(init([1, 2, 3]), some([1, 2]))
 * assert.deepStrictEqual(init([]), none)
 *
 * @since 3.0.0
 */
export const init = <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> =>
  isNonEmpty(as) ? _.some(nonEmptyReadonlyArray.init(as)) : _.none

/**
 * Keep only a max number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.takeLeft(2)), [1, 2])
 *
 * // out of bounds
 * assert.strictEqual(pipe(input, RA.takeLeft(4)), input)
 * assert.strictEqual(pipe(input, RA.takeLeft(-1)), input)
 *
 * @since 3.0.0
 */
export const takeLeft = (n: number) =>
  <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(0, n)

/**
 * Keep only a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
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
export const takeRight = (n: number) =>
  <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(-n)

/**
 * Calculate the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.
 *
 * @example
 * import { takeLeftWhile } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeftWhile((n: number) => n % 2 === 0)([2, 4, 3, 6]), [2, 4])
 *
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
 * import { spanLeft } from '@fp-ts/core/ReadonlyArray'
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
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropLeft(2)), [3])
 * assert.strictEqual(pipe(input, RA.dropLeft(0)), input)
 * assert.strictEqual(pipe(input, RA.dropLeft(-1)), input)
 *
 * @since 3.0.0
 */
export const dropLeft = (n: number) =>
  <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
    n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(n, as.length)

/**
 * Drop a max number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * **Note**. `n` is normalized to a non negative integer.
 *
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const input: ReadonlyArray<number> = [1, 2, 3]
 * assert.deepStrictEqual(pipe(input, RA.dropRight(2)), [1])
 * assert.strictEqual(pipe(input, RA.dropRight(0)), input)
 * assert.strictEqual(pipe(input, RA.dropRight(-1)), input)
 *
 * @since 3.0.0
 */
export const dropRight = (n: number) =>
  <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
    n <= 0 || isEmpty(as) ? as : n >= as.length ? empty : as.slice(0, as.length - n)

/**
 * Remove the longest initial subarray for which all element satisfy the specified predicate, creating a new `ReadonlyArray`.
 *
 * @example
 * import { dropLeftWhile } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeftWhile((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), [2, 4, 5])
 *
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
 * import { findIndex } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([1, 2, 3]), some(1))
 * assert.deepStrictEqual(findIndex((n: number) => n === 2)([]), none)
 *
 * @since 3.0.0
 */
export const findIndex = <A>(predicate: Predicate<A>) =>
  (as: ReadonlyArray<A>): Option<number> => {
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
 * import { findFirst } from '@fp-ts/core/ReadonlyArray'
 * import { some } from '@fp-ts/core/Option'
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
 * import { findFirstMap } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
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
export const findFirstMap = <A, B>(f: (a: A) => Option<B>) =>
  (as: ReadonlyArray<A>): Option<B> => {
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
 * import { findLast } from '@fp-ts/core/ReadonlyArray'
 * import { some } from '@fp-ts/core/Option'
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
 * import { findLastMap } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
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
export const findLastMap = <A, B>(f: (a: A) => Option<B>) =>
  (as: ReadonlyArray<A>): Option<B> => {
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
 * import { findLastIndex } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * interface X {
 *   a: number
 *   b: number
 * }
 * const xs: ReadonlyArray<X> = [{ a: 1, b: 0 }, { a: 1, b: 1 }]
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 1)(xs), some(1))
 * assert.deepStrictEqual(findLastIndex((x: { a: number }) => x.a === 4)(xs), none)
 *
 * @since 3.0.0
 */
export const findLastIndex = <A>(predicate: Predicate<A>) =>
  (as: ReadonlyArray<A>): Option<number> => {
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
 * import { insertAt } from '@fp-ts/core/ReadonlyArray'
 * import { some } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(insertAt(2, 5)([1, 2, 3, 4]), some([1, 2, 5, 3, 4]))
 *
 * @since 3.0.0
 */
export const insertAt = <A>(i: number, a: A) =>
  (as: ReadonlyArray<A>): Option<NonEmptyReadonlyArray<A>> => {
    if (i < 0 || i > as.length) {
      return _.none
    }
    if (isNonEmpty(as)) {
      const out = _.fromNonEmptyReadonlyArray(as)
      out.splice(i, 0, a)
      return _.some(out)
    }
    return _.some([a])
  }

/**
 * Change the element at the specified index, creating a new `ReadonlyArray`, or returning `None` if the index is out of bounds.
 *
 * @example
 * import { updateAt } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
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
 * import { modifyAt } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * const double = (x: number): number => x * 2
 * assert.deepStrictEqual(modifyAt(1, double)([1, 2, 3]), some([1, 4, 3]))
 * assert.deepStrictEqual(modifyAt(1, double)([]), none)
 *
 * @since 3.0.0
 */
export const modifyAt = <A>(i: number, f: Endomorphism<A>) =>
  (as: ReadonlyArray<A>): Option<ReadonlyArray<A>> => {
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
 * import { deleteAt } from '@fp-ts/core/ReadonlyArray'
 * import { some, none } from '@fp-ts/core/Option'
 *
 * assert.deepStrictEqual(deleteAt(0)([1, 2, 3]), some([2, 3]))
 * assert.deepStrictEqual(deleteAt(1)([]), none)
 *
 * @since 3.0.0
 */
export const deleteAt = (i: number) =>
  <A>(as: ReadonlyArray<A>): Option<ReadonlyArray<A>> => isOutOfBound(i, as) ? _.none : _.some(unsafeDeleteAt(i, as))

/**
 * Reverse a `ReadonlyArray`, creating a new `ReadonlyArray`.
 *
 * @example
 * import { reverse } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(reverse([1, 2, 3]), [3, 2, 1])
 *
 * @since 3.0.0
 */
export const reverse = <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => (as.length <= 1 ? as : as.slice().reverse())

/**
 * Extracts from a `ReadonlyArray` of `Result`s all the `Success` elements.
 *
 * @example
 * import { successes } from '@fp-ts/core/ReadonlyArray'
 * import { succeed, fail } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(successes([succeed(1), fail('foo'), succeed(2)]), [1, 2])
 *
 * @since 3.0.0
 */
export const successes = <E, A>(as: ReadonlyArray<Result<E, A>>): ReadonlyArray<A> => {
  const len = as.length
  const out: Array<A> = []
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (_.isSuccess(a)) {
      out.push(a.success)
    }
  }
  return out
}

/**
 * Extracts from a `ReadonlyArray` of `Result` all the `Failure` elements. All the `Failure` elements are extracted in order
 *
 * @example
 * import { failures } from '@fp-ts/core/ReadonlyArray'
 * import { fail, succeed } from '@fp-ts/core/Result'
 *
 * assert.deepStrictEqual(failures([succeed(1), fail('foo'), succeed(2)]), ['foo'])
 *
 * @since 3.0.0
 */
export const failures = <E, A>(as: ReadonlyArray<Result<E, A>>): ReadonlyArray<E> => {
  const out: Array<E> = []
  const len = as.length
  for (let i = 0; i < len; i++) {
    const a = as[i]
    if (_.isFailure(a)) {
      out.push(a.failure)
    }
  }
  return out
}

/**
 * Sort the elements of a `ReadonlyArray` in increasing order, creating a new `ReadonlyArray`.
 *
 * @example
 * import { sort } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 *
 * assert.deepStrictEqual(sort(N.Ord)([3, 2, 1]), [1, 2, 3])
 *
 * @since 3.0.0
 */
export const sort = <B>(O: Ord<B>) =>
  <A extends B>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
    as.length <= 1 ? as : as.slice().sort((self, that) => O.compare(that)(self))

/**
 * Apply a function to pairs of elements at the same index in two `ReadonlyArray`s, collecting the results in a new `ReadonlyArray`. If one
 * input `ReadonlyArray` is short, excess elements of the longer `ReadonlyArray` are discarded.
 *
 * @example
 * import { zipWith } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zipWith(['a', 'b', 'c', 'd'], (n, s) => s + n)), ['a1', 'b2', 'c3'])
 *
 * @since 3.0.0
 */
export const zipWith = <B, A, C>(fb: ReadonlyArray<B>, f: (a: A, b: B) => C) =>
  (fa: ReadonlyArray<A>): ReadonlyArray<C> => {
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
 * import { zip } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3], zip(['a', 'b', 'c', 'd'])), [[1, 'a'], [2, 'b'], [3, 'c']])
 *
 * @since 3.0.0
 */
export const zip: <B>(bs: ReadonlyArray<B>) => <A>(as: ReadonlyArray<A>) => ReadonlyArray<readonly [A, B]> = (bs) =>
  zipWith(bs, (a, b) => [a, b])

/**
 * This function is the inverse of `zip`. Takes a `ReadonlyArray` of pairs and return two corresponding `ReadonlyArray`s.
 *
 * @example
 * import { unzip } from '@fp-ts/core/ReadonlyArray'
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
 * import { prependAll } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], prependAll(9)), [9, 1, 9, 2, 9, 3, 9, 4])
 *
 * @since 3.0.0
 */
export const prependAll = <A>(middle: A): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = nonEmptyReadonlyArray.prependAll(middle)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Places an element in between members of a `ReadonlyArray`
 *
 * @example
 * import { intersperse } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2, 3, 4], intersperse(9)), [1, 9, 2, 9, 3, 9, 4])
 *
 * @since 3.0.0
 */
export const intersperse = <A>(middle: A): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = nonEmptyReadonlyArray.intersperse(middle)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Rotate a `ReadonlyArray` by `n` steps.
 *
 * @example
 * import { rotate } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 * assert.deepStrictEqual(rotate(-2)([1, 2, 3, 4, 5]), [3, 4, 5, 1, 2])
 *
 * @since 3.0.0
 */
export const rotate = (n: number): (<A>(as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = nonEmptyReadonlyArray.rotate(n)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * Tests whether a value is a member of a `ReadonlyArray`.
 *
 * @example
 * import { elem } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(2)), true)
 * assert.strictEqual(pipe([1, 2, 3], elem(N.Eq)(0)), false)
 *
 * @since 3.0.0
 */
export const elem = <A>(E: Eq<A>) =>
  (a: A) =>
    (as: ReadonlyArray<A>): boolean => {
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
 * import { uniq } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 *
 * assert.deepStrictEqual(uniq(N.Eq)([1, 2, 1]), [1, 2])
 *
 * @since 3.0.0
 */
export const uniq = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const uniq = nonEmptyReadonlyArray.uniq(E)
  return (as) => (isNonEmpty(as) ? uniq(as) : as)
}

/**
 * Sort the elements of a `ReadonlyArray` in increasing order, where elements are compared using first `ords[0]`, then `ords[1]`,
 * etc...
 *
 * @example
 * import { sortBy } from '@fp-ts/core/ReadonlyArray'
 * import { contramap } from '@fp-ts/core/Ord'
 * import * as S from '@fp-ts/core/string'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
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
 * @since 3.0.0
 */
export const sortBy = <B>(ords: ReadonlyArray<Ord<B>>): (<A extends B>(as: ReadonlyArray<A>) => ReadonlyArray<A>) => {
  const f = nonEmptyReadonlyArray.sortBy(ords)
  return (as) => (isNonEmpty(as) ? f(as) : as)
}

/**
 * A useful recursion pattern for processing a `ReadonlyArray` to produce a new `ReadonlyArray`, often used for "chopping" up the input
 * `ReadonlyArray`. Typically chop is called with some function that will consume an initial prefix of the `ReadonlyArray` and produce a
 * value and the rest of the `ReadonlyArray`.
 *
 * @example
 * import { Eq } from '@fp-ts/core/Eq'
 * import * as N from '@fp-ts/core/number'
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const group = <A>(E: Eq<A>): ((as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>>) => {
 *   return RA.chop(as => pipe(as, RA.spanLeft(E.equals(as[0]))))
 * }
 * assert.deepStrictEqual(group(N.Eq)([1, 1, 2, 3, 3, 4]), [[1, 1], [2], [3, 3], [4]])
 *
 * @since 3.0.0
 */
export const chop = <A, B>(
  f: (as: NonEmptyReadonlyArray<A>) => readonly [B, ReadonlyArray<A>]
): ((as: ReadonlyArray<A>) => ReadonlyArray<B>) => {
  const g = nonEmptyReadonlyArray.chop(f)
  return (as) => (isNonEmpty(as) ? g(as) : empty)
}

/**
 * Splits a `ReadonlyArray` into two pieces, the first piece has max `n` elements.
 *
 * @example
 * import { splitAt } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 3.0.0
 */
export const splitAt = (n: number) =>
  <A>(as: ReadonlyArray<A>): readonly [ReadonlyArray<A>, ReadonlyArray<A>] =>
    n >= 1 && isNonEmpty(as) ? nonEmptyReadonlyArray.splitAt(n)(as) : isEmpty(as) ? [as, empty] : [empty, as]

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
 * import { chunksOf } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(chunksOf(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4], [5]])
 *
 * @since 3.0.0
 */
export const chunksOf = (n: number): (<A>(as: ReadonlyArray<A>) => ReadonlyArray<NonEmptyReadonlyArray<A>>) => {
  const f = nonEmptyReadonlyArray.chunksOf(n)
  return (as) => (isNonEmpty(as) ? f(as) : empty)
}

/**
 * Creates a `ReadonlyArray` of unique values, in order, from all given `ReadonlyArray`s using a `Eq` for equality comparisons.
 *
 * @example
 * import { union } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2], union(N.Eq)([2, 3])), [1, 2, 3])
 *
 * @since 3.0.0
 */
export const union = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>>['combine'] => {
  const unionE = nonEmptyReadonlyArray.union(E)
  return (that) => (self) => isNonEmpty(self) && isNonEmpty(that) ? unionE(that)(self) : isNonEmpty(self) ? self : that
}

/**
 * Creates a `ReadonlyArray` of unique values that are included in all given `ReadonlyArray`s using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first `ReadonlyArray`.
 *
 * @example
 * import { intersection } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2], intersection(N.Eq)([2, 3])), [2])
 *
 * @since 3.0.0
 */
export const intersection = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>>['combine'] => {
  const elemE = elem(E)
  return (that) => (self) => self.filter((a) => elemE(a)(that))
}

/**
 * Creates a `ReadonlyArray` of values not included in the other given `ReadonlyArray` using a `Eq` for equality
 * comparisons. The order and references of result values are determined by the first `ReadonlyArray`.
 *
 * @example
 * import { difference } from '@fp-ts/core/ReadonlyArray'
 * import * as N from '@fp-ts/core/number'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(pipe([1, 2], difference(N.Eq)([2, 3])), [1])
 *
 * @since 3.0.0
 */
export const difference = <A>(E: Eq<A>): Magma<ReadonlyArray<A>>['combine'] => {
  const elemE = elem(E)
  return (that) => (self) => self.filter((a) => !elemE(a)(that))
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const of: <A>(a: A) => ReadonlyArray<A> = nonEmptyReadonlyArray.of

/**
 * @since 3.0.0
 */
export const empty: ReadonlyArray<never> = _.emptyReadonlyArray

/**
 * Identifies an associative operation on a type constructor. It is similar to `Semigroup`, except that it applies to
 * types of kind `* -> *`.
 *
 * In case of `ReadonlyArray` concatenates the inputs into a single array.
 *
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.orElse([4, 5])
 *   ),
 *   [1, 2, 3, 4, 5]
 * )
 *
 * @since 3.0.0
 */
export const orElse = <B>(that: ReadonlyArray<B>) =>
  <A>(self: ReadonlyArray<A>): ReadonlyArray<A | B> => (self as ReadonlyArray<A | B>).concat(that)

/**
 * Returns an effect whose success is mapped by the specified `f` function.
 *
 * @category mapping
 * @since 3.0.0
 */
export const map: <A, B>(f: (a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  (fa) => fa.map((a) => f(a)) // <= intended eta expansion

/**
 * @category instances
 * @since 3.0.0
 */
export const FromIdentity: fromIdentity.FromIdentity<ReadonlyArrayTypeLambda> = {
  of
}

/**
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap((n) => [`a${n}`, `b${n}`])
 *   ),
 *   ['a1', 'b1', 'a2', 'b2', 'a3', 'b3']
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.flatMap(() => [])
 *   ),
 *   []
 * )
 *
 * @category sequencing
 * @since 3.0.0
 */
export const flatMap: <A, B>(f: (a: A) => ReadonlyArray<B>) => (self: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  flatMapWithIndex((_, a) => f(a))

/**
 * @category instances
 * @since 3.0.0
 */
export const Flattenable: flattenable.Flattenable<ReadonlyArrayTypeLambda> = {
  map,
  flatMap
}

/**
 * @since 3.0.0
 */
export const composeKleisli: <B, C>(
  bfc: (b: B) => ReadonlyArray<C>
) => <A>(afb: (a: A) => ReadonlyArray<B>) => (a: A) => ReadonlyArray<C> = flattenable.composeKleisli(
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const KleisliComposable: kleisliComposable.KleisliComposable<ReadonlyArrayTypeLambda> = {
  composeKleisli
}

/**
 * @since 3.0.0
 */
export const idKleisli: <A>() => (a: A) => ReadonlyArray<A> = fromIdentity.idKleisli(FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const CategoryKind: kleisliCategory.KleisliCategory<ReadonlyArrayTypeLambda> = {
  composeKleisli,
  idKleisli
}

/**
 * Sequences the specified effect after this effect, but ignores the value
 * produced by the effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipLeft: (that: ReadonlyArray<unknown>) => <A>(self: ReadonlyArray<A>) => ReadonlyArray<A> = flattenable
  .zipLeft(Flattenable)

/**
 * A variant of `flatMap` that ignores the value produced by this effect.
 *
 * @category sequencing
 * @since 3.0.0
 */
export const zipRight: <A>(that: ReadonlyArray<A>) => (self: ReadonlyArray<unknown>) => ReadonlyArray<A> = flattenable
  .zipRight(Flattenable)

/**
 * @since 3.0.0
 */
export const ap: <A>(fa: ReadonlyArray<A>) => <B>(self: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B> = flattenable
  .ap(Flattenable)

/**
 * @since 3.0.0
 */
export const flatMapWithIndex = <A, B>(f: (i: number, a: A) => ReadonlyArray<B>) =>
  (as: ReadonlyArray<A>): ReadonlyArray<B> => {
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
 * Removes one level of nesting
 *
 * @example
 * import { flatten } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(flatten([[1], [2, 3], [4]]), [1, 2, 3, 4])
 *
 * @since 3.0.0
 */
export const flatten: <A>(mma: ReadonlyArray<ReadonlyArray<A>>) => ReadonlyArray<A> = flatMap(identity)

/**
 * @since 3.0.0
 */
export const mapWithIndex: <A, B>(f: (i: number, a: A) => B) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  (fa) => fa.map((a, i) => f(i, a))

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterMapWithIndex: <A, B>(
  f: (i: number, a: A) => Option<B>
) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = <A, B>(f: (i: number, a: A) => Option<B>) =>
  (fa: ReadonlyArray<A>): ReadonlyArray<B> => {
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
 * @category filtering
 * @since 3.0.0
 */
export const filterMap: <A, B>(f: (a: A) => Option<B>) => (fa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  filterMapWithIndex((_, a) => f(a))

/**
 * @category filtering
 * @since 3.0.0
 */
export const compact: <A>(foa: ReadonlyArray<Option<A>>) => ReadonlyArray<A> = filterMap(identity)

/**
 * @category filtering
 * @since 3.0.0
 */
export const separate: <A, B>(fe: ReadonlyArray<Result<A, B>>) => readonly [ReadonlyArray<A>, ReadonlyArray<B>] = <
  A,
  B
>(
  fa: ReadonlyArray<Result<A, B>>
) => {
  const left: Array<A> = []
  const right: Array<B> = []
  for (const e of fa) {
    if (_.isFailure(e)) {
      left.push(e.failure)
    } else {
      right.push(e.success)
    }
  }
  return [left, right]
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMap: <A, B, C>(
  f: (a: A) => Result<B, C>
) => (fa: ReadonlyArray<A>) => readonly [ReadonlyArray<B>, ReadonlyArray<C>] = (f) =>
  partitionMapWithIndex((_, a) => f(a))

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionMapWithIndex = <A, B, C>(f: (i: number, a: A) => Result<B, C>) =>
  (fa: ReadonlyArray<A>): readonly [ReadonlyArray<B>, ReadonlyArray<C>] => {
    const left: Array<B> = []
    const right: Array<C> = []
    for (let i = 0; i < fa.length; i++) {
      const e = f(i, fa[i])
      if (_.isFailure(e)) {
        left.push(e.failure)
      } else {
        right.push(e.success)
      }
    }
    return [left, right]
  }

/**
 * @since 3.0.0
 */
export const extend: <A, B>(f: (wa: ReadonlyArray<A>) => B) => (wa: ReadonlyArray<A>) => ReadonlyArray<B> = (f) =>
  (wa) => wa.map((_, i, as) => f(as.slice(i)))

/**
 * @since 3.0.0
 */
export const duplicate: <A>(wa: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>> = extend(identity)

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverse: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, B>
) => (as: ReadonlyArray<A>) => Kind<F, S, R, O, E, ReadonlyArray<B>> = (F) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const traverseWithIndex = <F extends TypeLambda>(F: applicative.Applicative<F>) =>
  <A, S, R, O, E, B>(f: (i: number, a: A) => Kind<F, S, R, O, E, B>) =>
    (ta: ReadonlyArray<A>): Kind<F, S, R, O, E, ReadonlyArray<B>> => {
      return pipe(
        toEntries(ta),
        iterable.reduceWithIndex<Kind<F, S, R, O, E, ReadonlyArray<B>>, number, A>(F.of(empty), (i, fbs, a) =>
          pipe(
            fbs,
            F.map((bs) => (b: B) => append(b)(bs)),
            F.ap(f(i, a))
          ))
      )
    }

/**
 * @since 3.0.0
 */
export const unfold: <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => ReadonlyArray<A> = <B, A>(
  b: B,
  f: (b: B) => Option<readonly [A, B]>
) => {
  const out: Array<A> = []
  let next: B = b
  let o: Option<readonly [A, B]>
  while (_.isSome(o = f(next))) {
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
export const getShow = <A>(S: Show<A>): Show<ReadonlyArray<A>> => ({
  show: (as) => `[${as.map(S.show).join(', ')}]`
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>> => ({
  combine: union(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getUnionMonoid = <A>(E: Eq<A>): Monoid<ReadonlyArray<A>> => ({
  combine: getUnionSemigroup(E).combine,
  empty
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getIntersectionSemigroup = <A>(E: Eq<A>): Semigroup<ReadonlyArray<A>> => ({
  combine: intersection(E)
})

/**
 * @category instances
 * @since 3.0.0
 */
export const getDifferenceMagma = <A>(E: Eq<A>): Magma<ReadonlyArray<A>> => ({
  combine: difference(E)
})

/**
 * Returns a `Semigroup` for `ReadonlyArray<A>`.
 *
 * @example
 * import { getSemigroup } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const S = getSemigroup<number>()
 * assert.deepStrictEqual(pipe([1, 2], S.combine([3, 4])), [1, 2, 3, 4])
 *
 * @category instances
 * @since 3.0.0
 */
export const getSemigroup = <A>(): Semigroup<ReadonlyArray<A>> => ({
  combine: concat
})

/**
 * Returns a `Monoid` for `ReadonlyArray<A>`.
 *
 * @category instances
 * @since 3.0.0
 */
export const getMonoid = <A>(): Monoid<ReadonlyArray<A>> => ({
  combine: getSemigroup<A>().combine,
  empty
})

/**
 * Derives an `Eq` over the `ReadonlyArray` of a given element type from the `Eq` of that type. The derived `Eq` defines two
 * `ReadonlyArray`s as equal if all elements of both `ReadonlyArray`s are compared equal pairwise with the given `E`. In case of `ReadonlyArray`s of
 * different lengths, the result is non equality.
 *
 * @example
 * import * as S from '@fp-ts/core/string'
 * import { getEq } from '@fp-ts/core/ReadonlyArray'
 *
 * const E = getEq(S.Eq)
 * assert.strictEqual(E.equals(['a', 'b'])(['a', 'b']), true)
 * assert.strictEqual(E.equals(['a'])([]), false)
 *
 * @category instances
 * @since 3.0.0
 */
export const getEq = <A>(E: Eq<A>): Eq<ReadonlyArray<A>> =>
  eq.fromEquals((that) => (self) => self.length === that.length && self.every((x, i) => E.equals(that[i])(x)))

/**
 * Derives an `Ord` over the `ReadonlyArray` of a given element type from the `Ord` of that type. The ordering between two such
 * `ReadonlyArray`s is equal to: the first non equal comparison of each `ReadonlyArray`s elements taken pairwise in increasing order, in
 * case of equality over all the pairwise elements; the longest `ReadonlyArray` is considered the greatest, if both `ReadonlyArray`s have
 * the same length, the result is equality.
 *
 * @example
 * import { getOrd } from '@fp-ts/core/ReadonlyArray'
 * import * as S from '@fp-ts/core/string'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const O = getOrd(S.Ord)
 * assert.strictEqual(pipe(['b'], O.compare(['a'])), 1)
 * assert.strictEqual(pipe(['a'], O.compare(['a'])), 0)
 * assert.strictEqual(pipe(['a'], O.compare(['b'])), -1)
 *
 * @category instances
 * @since 3.0.0
 */
export const getOrd = <A>(O: Ord<A>): Ord<ReadonlyArray<A>> =>
  ord.fromCompare((that) =>
    (self) => {
      const aLen = self.length
      const bLen = that.length
      const len = Math.min(aLen, bLen)
      for (let i = 0; i < len; i++) {
        const o = O.compare(that[i])(self[i])
        if (o !== 0) {
          return o
        }
      }
      return number.Ord.compare(bLen)(aLen)
    }
  )

/**
 * @category instances
 * @since 3.0.0
 */
export const Functor: functor.Functor<ReadonlyArrayTypeLambda> = {
  map
}

/**
 * @category mapping
 * @since 3.0.0
 */
export const flap: <A>(a: A) => <B>(fab: ReadonlyArray<(a: A) => B>) => ReadonlyArray<B> = functor.flap(
  Functor
)

/**
 * Maps the success value of this effect to the specified constant value.
 *
 * @category mapping
 * @since 3.0.0
 */
export const as: <B>(b: B) => (self: ReadonlyArray<unknown>) => ReadonlyArray<B> = functor.as(Functor)

/**
 * Returns the effect resulting from mapping the success of this effect to unit.
 *
 * @category mapping
 * @since 3.0.0
 */
export const unit: (self: ReadonlyArray<unknown>) => ReadonlyArray<void> = functor.unit(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: functorWithIndex.FunctorWithIndex<ReadonlyArrayTypeLambda, number> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: apply.Apply<ReadonlyArrayTypeLambda> = {
  map,
  ap
}

/**
 * Lifts a binary function into `ReadonlyArray`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift2: <A, B, C>(
  f: (a: A, b: B) => C
) => (fa: ReadonlyArray<A>, fb: ReadonlyArray<B>) => ReadonlyArray<C> = apply.lift2(Apply)

/**
 * Lifts a ternary function into `ReadonlyArray`.
 *
 * @category lifting
 * @since 3.0.0
 */
export const lift3: <A, B, C, D>(
  f: (a: A, b: B, c: C) => D
) => (fa: ReadonlyArray<A>, fb: ReadonlyArray<B>, fc: ReadonlyArray<C>) => ReadonlyArray<D> = apply.lift3(
  Apply
)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: applicative.Applicative<ReadonlyArrayTypeLambda> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad_<ReadonlyArrayTypeLambda> = {
  map,
  of,
  flatMap
}

/**
 * Returns an effect that effectfully "peeks" at the success of this effect.
 *
 * @example
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.tap(() => ['a', 'b'])
 *   ),
 *   [1, 1, 2, 2, 3, 3]
 * )
 * assert.deepStrictEqual(
 *   pipe(
 *     [1, 2, 3],
 *     RA.tap(() => [])
 *   ),
 *   []
 * )
 *
 * @since 3.0.0
 */
export const tap: <A>(f: (a: A) => ReadonlyArray<unknown>) => (self: ReadonlyArray<A>) => ReadonlyArray<A> = flattenable
  .tap(Flattenable)

/**
 * @category instances
 * @since 3.0.0
 */
export const Unfoldable: unfoldable.Unfoldable<ReadonlyArrayTypeLambda> = {
  unfold
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: alt.Alt<ReadonlyArrayTypeLambda> = {
  orElse
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: alternative.Alternative<ReadonlyArrayTypeLambda> = {
  orElse,
  none: () => empty
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const guard: (b: boolean) => ReadonlyArray<void> = alternative.guard(Alternative, FromIdentity)

/**
 * @category instances
 * @since 3.0.0
 */
export const Extendable: extendable.Extendable<ReadonlyArrayTypeLambda> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: compactable.Compactable<ReadonlyArrayTypeLambda> = {
  compact
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: filterable.Filterable<ReadonlyArrayTypeLambda> = {
  filterMap
}

// TODO: perf
/**
 * @category filtering
 * @since 3.0.0
 */
export const filter: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (fc: ReadonlyArray<C>) => ReadonlyArray<B>
  <B extends A, A = B>(predicate: Predicate<A>): (fb: ReadonlyArray<B>) => ReadonlyArray<B>
} = filterable.filter(Filterable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partition: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (
    fc: ReadonlyArray<C>
  ) => readonly [ReadonlyArray<C>, ReadonlyArray<B>]
  <B extends A, A = B>(predicate: Predicate<A>): (fb: ReadonlyArray<B>) => readonly [ReadonlyArray<B>, ReadonlyArray<B>]
} = filterable.partition(Filterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: filterableWithIndex.FilterableWithIndex<ReadonlyArrayTypeLambda, number> = {
  partitionMapWithIndex,
  filterMapWithIndex
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const filterWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (fc: ReadonlyArray<C>) => ReadonlyArray<B>
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (fb: ReadonlyArray<B>) => ReadonlyArray<B>
} = filterableWithIndex.filterWithIndex(FilterableWithIndex)

/**
 * @category filtering
 * @since 3.0.0
 */
export const partitionWithIndex: {
  <C extends A, B extends A, A = C>(refinement: (i: number, a: A) => a is B): (
    fb: ReadonlyArray<C>
  ) => readonly [ReadonlyArray<C>, ReadonlyArray<B>]
  <B extends A, A = B>(predicate: (i: number, a: A) => boolean): (
    fb: ReadonlyArray<B>
  ) => readonly [ReadonlyArray<B>, ReadonlyArray<B>]
} = filterableWithIndex.partitionWithIndex(FilterableWithIndex)

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: foldable.Foldable<ReadonlyArrayTypeLambda> = {
  toIterable: identity
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduce: <B, A>(b: B, f: (b: B, a: A) => B) => (self: ReadonlyArray<A>) => B = foldable
  .reduce(Foldable)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMap: <M>(Monoid: Monoid<M>) => <A>(f: (a: A) => M) => (self: ReadonlyArray<A>) => M = foldable.foldMap(
  Foldable
)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRight: <B, A>(b: B, f: (a: A, b: B) => B) => (self: ReadonlyArray<A>) => B = foldable
  .reduceRight(Foldable)

/**
 * @category folding
 * @since 3.0.0
 */
export const toEntries: <A>(self: ReadonlyArray<A>) => Iterable<readonly [number, A]> = iterable.toEntries

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: foldableWithIndex.FoldableWithIndex<ReadonlyArrayTypeLambda, number> = {
  toEntries
}

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceWithIndex: <B, A>(b: B, f: (i: number, b: B, a: A) => B) => (self: ReadonlyArray<A>) => B =
  foldableWithIndex.reduceWithIndex(FoldableWithIndex)

/**
 * @category folding
 * @since 3.0.0
 */
export const foldMapWithIndex: <M>(
  Monoid: Monoid<M>
) => <A>(f: (i: number, a: A) => M) => (self: ReadonlyArray<A>) => M = foldableWithIndex.foldMapWithIndex(
  FoldableWithIndex
)

/**
 * @category folding
 * @since 3.0.0
 */
export const reduceRightWithIndex: <B, A>(b: B, f: (i: number, a: A, b: B) => B) => (self: ReadonlyArray<A>) => B =
  foldableWithIndex.reduceRightWithIndex(FoldableWithIndex)

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: traversable.Traversable<ReadonlyArrayTypeLambda> = {
  traverse
}

/**
 * @category traversing
 * @since 3.0.0
 */
export const sequence: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <S, R, O, E, A>(fas: ReadonlyArray<Kind<F, S, R, O, E, A>>) => Kind<F, S, R, O, E, ReadonlyArray<A>> = traversable
  .sequence(Traversable)

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: traversableWithIndex.TraversableWithIndex<ReadonlyArrayTypeLambda, number> = {
  traverseWithIndex
}

/**
 * @category filtering
 * @since 3.0.0
 */
export const traverseFilterMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B>(
  f: (a: A) => Kind<F, S, R, O, E, Option<B>>
) => (ta: ReadonlyArray<A>) => Kind<F, S, R, O, E, ReadonlyArray<B>> = traversableFilterable
  .traverseFilterMap(Traversable, Compactable)

/**
 * @category filtering
 * @since 3.0.0
 */
export const traversePartitionMap: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <A, S, R, O, E, B, C>(
  f: (a: A) => Kind<F, S, R, O, E, Result<B, C>>
) => (wa: ReadonlyArray<A>) => Kind<F, S, R, O, E, readonly [ReadonlyArray<B>, ReadonlyArray<C>]> =
  traversableFilterable.traversePartitionMap(Traversable, Functor, Compactable)

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableFilterable: traversableFilterable.TraversableFilterable<ReadonlyArrayTypeLambda> = {
  traverseFilterMap,
  traversePartitionMap
}

/**
 * Filter values inside a context.
 *
 * @example
 * import { pipe } from '@fp-ts/core/Function'
 * import * as RA from '@fp-ts/core/ReadonlyArray'
 * import * as T from '@fp-ts/core/Async'
 *
 * const traverseFilter = RA.traverseFilter(T.ApplicativePar)
 * async function test() {
 *   assert.deepStrictEqual(
 *     await pipe(
 *       [-1, 2, 3],
 *       traverseFilter((n) => T.of(n > 0))
 *     )(),
 *     [2, 3]
 *   )
 * }
 * test()
 *
 * @since 3.0.0
 */
export const traverseFilter: <F extends TypeLambda>(
  F: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: ReadonlyArray<B>) => Kind<F, S, R, O, E, ReadonlyArray<B>> = traversableFilterable
  .traverseFilter(TraversableFilterable)

/**
 * @since 3.0.0
 */
export const traversePartition: <F extends TypeLambda>(
  ApplicativeF: applicative.Applicative<F>
) => <B extends A, S, R, O, E, A = B>(
  predicate: (a: A) => Kind<F, S, R, O, E, boolean>
) => (self: ReadonlyArray<B>) => Kind<F, S, R, O, E, readonly [ReadonlyArray<B>, ReadonlyArray<B>]> =
  traversableFilterable.traversePartition(TraversableFilterable)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromOption: fromOption_.FromOption<ReadonlyArrayTypeLambda> = {
  fromOption
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftPredicate: {
  <C extends A, B extends A, A = C>(refinement: Refinement<A, B>): (c: C) => ReadonlyArray<B>
  <B extends A, A = B>(predicate: Predicate<A>): (b: B) => ReadonlyArray<B>
} = fromOption_.liftPredicate(FromOption)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftOption: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => Option<B>
) => (...a: A) => ReadonlyArray<B> = fromOption_.liftOption(FromOption)

/**
 * @category conversions
 * @since 3.0.0
 */
export const fromNullable: <A>(a: A) => ReadonlyArray<NonNullable<A>> = fromOption_.fromNullable(
  FromOption
)

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftNullable: <A extends ReadonlyArray<unknown>, B>(
  f: (...a: A) => B | null | undefined
) => (...a: A) => ReadonlyArray<NonNullable<B>> = fromOption_.liftNullable(FromOption)

/**
 * @category sequencing
 * @since 3.0.0
 */
export const flatMapNullable: <A, B>(
  f: (a: A) => B | null | undefined
) => (ma: ReadonlyArray<A>) => ReadonlyArray<NonNullable<B>> = fromOption_.flatMapNullable(
  FromOption,
  Flattenable
)

/**
 * @category instances
 * @since 3.0.0
 */
export const FromResult: fromResult_.FromResult<ReadonlyArrayTypeLambda> = {
  fromResult
}

/**
 * @category lifting
 * @since 3.0.0
 */
export const liftResult: <A extends ReadonlyArray<unknown>, E, B>(
  f: (...a: A) => Result<E, B>
) => (...a: A) => ReadonlyArray<B> = fromResult_.liftResult(FromResult)

/**
 * @category FlattenableRec
 * @since 3.0.0
 */
export const flatMapRecDepthFirst = <A, B>(f: (a: A) => ReadonlyArray<Result<A, B>>) =>
  (a: A): ReadonlyArray<B> => {
    const abs: Array<Result<A, B>> = [...f(a)]
    const out: Array<B> = []

    while (abs.length > 0) {
      const e = abs.shift()!
      if (_.isFailure(e)) {
        abs.unshift(...f(e.failure))
      } else {
        out.push(e.success)
      }
    }

    return out
  }

/**
 * @category FlattenableRec
 * @since 3.0.0
 */
export const flatMapRecBreadthFirst = <A, B>(f: (a: A) => ReadonlyArray<Result<A, B>>) =>
  (a: A): ReadonlyArray<B> => {
    const initial = f(a)
    const abs: Array<Result<A, B>> = []
    const out: Array<B> = []

    function go(e: Result<A, B>): void {
      if (_.isFailure(e)) {
        f(e.failure).forEach((v) => abs.push(v))
      } else {
        out.push(e.success)
      }
    }

    for (const e of initial) {
      go(e)
    }

    while (abs.length > 0) {
      go(abs.shift()!)
    }

    return out
  }

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRecDepthFirst: flattenableRec.FlattenableRec<ReadonlyArrayTypeLambda> = {
  flatMapRec: flatMapRecDepthFirst
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FlattenableRecBreadthFirst: flattenableRec.FlattenableRec<ReadonlyArrayTypeLambda> = {
  flatMapRec: flatMapRecBreadthFirst
}

/**
 * Check if a predicate holds true for every `ReadonlyArray` member.
 *
 * @example
 * import { every } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
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
 * import { some } from '@fp-ts/core/ReadonlyArray'
 * import { pipe } from '@fp-ts/core/Function'
 *
 * const isPositive = (n: number): boolean => n > 0
 *
 * assert.deepStrictEqual(pipe([-1, -2, 3], some(isPositive)), true)
 * assert.deepStrictEqual(pipe([-1, -2, -3], some(isPositive)), false)
 *
 * @since 3.0.0
 */
export const some = <A>(predicate: Predicate<A>) =>
  (as: ReadonlyArray<A>): as is NonEmptyReadonlyArray<A> => as.some(predicate)

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
 * import * as S from '@fp-ts/core/string'
 * import { intercalate } from '@fp-ts/core/ReadonlyArray'
 *
 * assert.deepStrictEqual(intercalate(S.Monoid)('-')(['a', 'b', 'c']), 'a-b-c')
 *
 * @since 3.0.0
 */
export const intercalate = <A>(M: Monoid<A>): ((middle: A) => (as: ReadonlyArray<A>) => A) => {
  const intercalateM = nonEmptyReadonlyArray.intercalate(M)
  return (middle) => match(() => M.empty, intercalateM(middle))
}

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @category do notation
 * @since 3.0.0
 */
export const Do: ReadonlyArray<{}> = of(_.emptyReadonlyRecord)

/**
 * @category do notation
 * @since 3.0.0
 */
export const bindTo: <N extends string>(
  name: N
) => <A>(self: ReadonlyArray<A>) => ReadonlyArray<{ readonly [K in N]: A }> = functor.bindTo(Functor)

const let_: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => B
) => (self: ReadonlyArray<A>) => ReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = functor
  .let(Functor)

export {
  /**
   * @category do notation
   * @since 3.0.0
   */
  let_ as let
}

/**
 * @category do notation
 * @since 3.0.0
 */
export const bind: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  f: (a: A) => ReadonlyArray<B>
) => (self: ReadonlyArray<A>) => ReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> =
  flattenable.bind(Flattenable)

/**
 * A variant of `bind` that sequentially ignores the scope.
 *
 * @category do notation
 * @since 3.0.0
 */
export const bindRight: <N extends string, A extends object, B>(
  name: Exclude<N, keyof A>,
  fb: ReadonlyArray<B>
) => (self: ReadonlyArray<A>) => ReadonlyArray<{ readonly [K in N | keyof A]: K extends keyof A ? A[K] : B }> = apply
  .bindRight(Apply)

// -------------------------------------------------------------------------------------
// tuple sequencing
// -------------------------------------------------------------------------------------

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const Zip: ReadonlyArray<readonly []> = empty

/**
 * @category tuple sequencing
 * @since 3.0.0
 */
export const tupled: <A>(self: ReadonlyArray<A>) => ReadonlyArray<readonly [A]> = functor.tupled(Functor)

/**
 * Sequentially zips this effect with the specified effect.
 *
 * @category tuple sequencing
 * @since 3.0.0
 */
export const zipFlatten: <B>(
  fb: ReadonlyArray<B>
) => <A extends ReadonlyArray<unknown>>(self: ReadonlyArray<A>) => ReadonlyArray<readonly [...A, B]> = apply.zipFlatten(
  Apply
)
