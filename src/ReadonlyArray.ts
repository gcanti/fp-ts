/**
 * @since 3.0.0
 */
import { Alt1 } from './Alt'
import { Alternative1 } from './Alternative'
import { Applicative as Applicative_, Applicative1 } from './Applicative'
import { apFirst as apFirst_, Apply1, apS as apS_, apSecond as apSecond_, apT as apT_ } from './Apply'
import { bind as bind_, Chain1, chainFirst as chainFirst_ } from './Chain'
import { Compactable1 } from './Compactable'
import { Either } from './Either'
import * as _ from './internal'
import { Eq, fromEquals } from './Eq'
import { Extend1 } from './Extend'
import { Filterable1 } from './Filterable'
import { FilterableWithIndex1, PredicateWithIndex } from './FilterableWithIndex'
import { Foldable1 } from './Foldable'
import { FoldableWithIndex1 } from './FoldableWithIndex'
import { FromEither1, fromPredicate as fromPredicate_ } from './FromEither'
import { Endomorphism, flow, identity, Lazy, pipe, Predicate, Refinement } from './function'
import { bindTo as bindTo_, flap as flap_, Functor1, tupled as tupled_ } from './Functor'
import { FunctorWithIndex1 } from './FunctorWithIndex'
import { HKT } from './HKT'
import { Magma } from './Magma'
import { Monad1 } from './Monad'
import { Monoid } from './Monoid'
import * as NEA from './NonEmptyArray'
import * as N from './number'
import { Option } from './Option'
import { fromCompare, getMonoid as getOrdMonoid, Ord } from './Ord'
import { Pointed1 } from './Pointed'
import * as RNEA from './ReadonlyNonEmptyArray'
import { Semigroup } from './Semigroup'
import { separated, Separated } from './Separated'
import { Show } from './Show'
import { Traversable1 } from './Traversable'
import { TraversableWithIndex1 } from './TraversableWithIndex'
import { Unfoldable1 } from './Unfoldable'
import { Witherable1 } from './Witherable'

import ReadonlyNonEmptyArray = RNEA.ReadonlyNonEmptyArray

// -------------------------------------------------------------------------------------
// constructors
// -------------------------------------------------------------------------------------

/**
 * Transforms an `Either` to a `ReadonlyArray`.
 *
 * @category constructors
 * @since 3.0.0
 */
export const fromEither = <E, A>(e: Either<E, A>): ReadonlyArray<A> => (_.isLeft(e) ? empty : [e.right])

/**
 * Return a `ReadonlyArray` of length `n` with element `i` initialized with `f(i)`.
 * If `n` (must be a natural number) is negative return `empty`.
 *
 * @example
 * import { makeBy } from 'fp-ts/ReadonlyArray'
 *
 * const double = (n: number): number => n * 2
 * assert.deepStrictEqual(makeBy(5, double), [0, 2, 4, 6, 8])
 *
 * @category constructors
 * @since 3.0.0
 */
export const makeBy = <A>(n: number, f: (i: number) => A): ReadonlyArray<A> => (n <= 0 ? empty : RNEA.makeBy(n, f))

/**
 * Create a `ReadonlyArray` containing a value repeated the specified number of times
 *
 * @example
 * import { replicate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(replicate(3, 'a'), ['a', 'a', 'a'])
 *
 * @category constructors
 * @since 3.0.0
 */
export const replicate = <A>(n: number, a: A): ReadonlyArray<A> => makeBy(n, () => a)

// -------------------------------------------------------------------------------------
// destructors
// -------------------------------------------------------------------------------------

/**
 * Break a `ReadonlyArray` into its first element and remaining elements
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
export const matchLeft = <A, B>(onEmpty: Lazy<B>, onCons: (head: A, tail: ReadonlyArray<A>) => B) => (
  as: ReadonlyArray<A>
): B => (isNonEmpty(as) ? onCons(RNEA.head(as), RNEA.tail(as)) : onEmpty())

/**
 * Break a `ReadonlyArray` into its initial elements and the last element
 *
 * @category destructors
 * @since 3.0.0
 */
export const matchRight = <A, B>(onEmpty: Lazy<B>, onCons: (init: ReadonlyArray<A>, last: A) => B) => (
  as: ReadonlyArray<A>
): B => (isNonEmpty(as) ? onCons(RNEA.init(as), RNEA.last(as)) : onEmpty())

// -------------------------------------------------------------------------------------
// combinators
// -------------------------------------------------------------------------------------

/**
 * @category combinators
 * @since 3.0.0
 */
export const concatW: {
  <B>(second: ReadonlyNonEmptyArray<B>): <A>(first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A | B>
  <B>(second: ReadonlyArray<B>): <A>(first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A | B>
  <B>(second: ReadonlyArray<B>): <A>(first: ReadonlyArray<A>) => ReadonlyArray<A | B>
} = RNEA.concatW

/**
 * @category combinators
 * @since 3.0.0
 */
export const concat: {
  <A>(second: ReadonlyNonEmptyArray<A>): (first: ReadonlyArray<A>) => ReadonlyNonEmptyArray<A>
  <A>(second: ReadonlyArray<A>): (first: ReadonlyNonEmptyArray<A>) => ReadonlyNonEmptyArray<A>
  <A>(second: ReadonlyArray<A>): (first: ReadonlyArray<A>) => ReadonlyArray<A>
} = concatW

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
export const isEmpty = <A>(as: ReadonlyArray<A>): boolean => as.length === 0

/**
 * Test whether a `ReadonlyArray` is non empty narrowing down the type to `NonEmptyReadonlyArray<A>`
 *
 * @category guards
 * @since 3.0.0
 */
export const isNonEmpty: <A>(as: ReadonlyArray<A>) => as is ReadonlyNonEmptyArray<A> = RNEA.isNonEmpty

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
export const prepend = RNEA.prepend

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
export const append = RNEA.append

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
 * Keep only a number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 * If `n` (must be a natural number) is out of bound the input is returned.
 *
 * @example
 * import { takeLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeLeft(2)([1, 2, 3]), [1, 2])
 *
 * @category combinators
 * @since 3.0.0
 */
export const takeLeft = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  isOutOfBound(n, as) ? as : n === 0 ? empty : as.slice(0, n)

/**
 * Keep only a number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 * If `n` (must be a natural number) is out of bound the input is returned.
 *
 * @example
 * import { takeRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(takeRight(2)([1, 2, 3, 4, 5]), [4, 5])
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
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A>
export function takeLeftWhile<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => ReadonlyArray<A> {
  return (as) => {
    const i = spanIndexUncurry(as, predicate)
    const init = Array(i)
    for (let j = 0; j < i; j++) {
      init[j] = as[j]
    }
    return init
  }
}

const spanIndexUncurry = <A>(as: ReadonlyArray<A>, predicate: Predicate<A>): number => {
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
 * @since 3.0.0
 */
export interface Spanned<I, R> {
  readonly init: ReadonlyArray<I>
  readonly rest: ReadonlyArray<R>
}

/**
 * Split a `ReadonlyArray` into two parts:
 * 1. the longest initial subarray for which all elements satisfy the specified predicate
 * 2. the remaining elements
 *
 * @example
 * import { spanLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(spanLeft((n: number) => n % 2 === 1)([1, 3, 2, 4, 5]), { init: [1, 3], rest: [2, 4, 5] })
 *
 * @since 3.0.0
 */
export function spanLeft<A, B extends A>(refinement: Refinement<A, B>): (as: ReadonlyArray<A>) => Spanned<B, A>
export function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A>
export function spanLeft<A>(predicate: Predicate<A>): (as: ReadonlyArray<A>) => Spanned<A, A> {
  return (as) => {
    const i = spanIndexUncurry(as, predicate)
    const init = Array(i)
    for (let j = 0; j < i; j++) {
      init[j] = as[j]
    }
    const l = as.length
    const rest = Array(l - i)
    for (let j = i; j < l; j++) {
      rest[j - i] = as[j]
    }
    return { init, rest }
  }
}

/**
 * Drop a number of elements from the start of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 * If `n` (must be a natural number) is negative the input is returned.
 *
 * @example
 * import { dropLeft } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropLeft(2)([1, 2, 3]), [3])
 *
 * @category combinators
 * @since 3.0.0
 */
export const dropLeft = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  n <= 0 ? as : n >= as.length ? empty : as.slice(n, as.length)

/**
 * Drop a number of elements from the end of an `ReadonlyArray`, creating a new `ReadonlyArray`.
 * If `n` (must be a natural number) is negative the input is returned.
 *
 * @example
 * import { dropRight } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(dropRight(2)([1, 2, 3, 4, 5]), [1, 2, 3])
 *
 * @category combinators
 * @since 3.0.0
 */
export const dropRight = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> =>
  n <= 0 ? as : n >= as.length ? empty : as.slice(0, as.length - n)

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
export const dropLeftWhile = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): ReadonlyArray<A> => {
  const i = spanIndexUncurry(as, predicate)
  const l = as.length
  const rest = Array(l - i)
  for (let j = i; j < l; j++) {
    rest[j - i] = as[j]
  }
  return rest
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
export const reverse = <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => (isEmpty(as) ? empty : as.slice().reverse())

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
export const prependAll = <A>(a: A) => (as: ReadonlyArray<A>): ReadonlyArray<A> => {
  const prependAlla = RNEA.prependAll(a)
  return isNonEmpty(as) ? prependAlla(as) : empty
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
export const intersperse = <A>(a: A) => (as: ReadonlyArray<A>): ReadonlyArray<A> => {
  const len = as.length
  return len === 0 ? as : prepend(as[0])(prependAll(a)(as.slice(1, len)))
}

/**
 * Rotate a `ReadonlyArray` to the right by `n` steps
 *
 * @example
 * import { rotate } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(rotate(2)([1, 2, 3, 4, 5]), [4, 5, 1, 2, 3])
 *
 * @category combinators
 * @since 3.0.0
 */
export const rotate = (n: number) => <A>(as: ReadonlyArray<A>): ReadonlyArray<A> => {
  const len = as.length
  if (n === 0 || len <= 1 || len === Math.abs(n)) {
    return as
  } else if (n < 0) {
    return rotate(len + n)(as)
  } else {
    return as.slice(-n).concat(as.slice(0, len - n))
  }
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
  const elemS = elem(E)
  return (as) => {
    const len = as.length
    if (len <= 1) {
      return as
    }
    const out: Array<A> = []
    let i = 0
    for (; i < len; i++) {
      const a = as[i]
      if (!elemS(a)(out)) {
        out.push(a)
      }
    }
    return len === out.length ? as : out
  }
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
  const M = getOrdMonoid<B>()
  return sort(ords.reduce((a, acc) => M.concat(acc)(a), M.empty))
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
 *   return RA.chop(as => {
 *     const { init, rest } = pipe(as, RA.spanLeft(E.equals(as[0])))
 *     return [init, rest]
 *   })
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
 * Splits a `ReadonlyArray` into two pieces, the first piece has `n` elements.
 * If `n` is out of bounds, the input is returned.
 *
 * @example
 * import { splitAt } from 'fp-ts/ReadonlyArray'
 *
 * assert.deepStrictEqual(splitAt(2)([1, 2, 3, 4, 5]), [[1, 2], [3, 4, 5]])
 *
 * @since 3.0.0
 */
export const splitAt = (n: number) => <A>(as: ReadonlyArray<A>): readonly [ReadonlyArray<A>, ReadonlyArray<A>] =>
  n === 0 ? [empty, as] : isNonEmpty(as) ? RNEA.splitAt(n)(as) : [empty, empty]

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
 *
 * @since 3.0.0
 */
export const chunksOf = (n: number): (<A>(as: ReadonlyArray<A>) => ReadonlyArray<ReadonlyNonEmptyArray<A>>) => {
  const f = RNEA.chunksOf(n)
  return (as) => (isNonEmpty(as) ? f(as) : empty)
}

/**
 * Array comprehension
 *
 * ```
 * [ f(x, y, ...) | x ← xs, y ← ys, ..., g(x, y, ...) ]
 * ```
 *
 * @example
 * import { comprehension } from 'fp-ts/ReadonlyArray'
 * import { tuple } from 'fp-ts/function'
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
export function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => R,
  g?: (a: A) => boolean
): ReadonlyArray<R>
export function comprehension<A, B, R>(
  input: readonly [ReadonlyArray<A>, ReadonlyArray<B>],
  f: (a: A, b: B) => R,
  g?: (a: A, b: B) => boolean
): ReadonlyArray<R>
export function comprehension<A, R>(
  input: readonly [ReadonlyArray<A>],
  f: (a: A) => boolean,
  g?: (a: A) => R
): ReadonlyArray<R>
export function comprehension<R>(
  input: ReadonlyArray<ReadonlyArray<any>>,
  f: (...xs: ReadonlyArray<any>) => R,
  g: (...xs: ReadonlyArray<any>) => boolean = () => true
): ReadonlyArray<R> {
  const go = (scope: ReadonlyArray<any>, input: ReadonlyArray<ReadonlyArray<any>>): ReadonlyArray<R> =>
    isNonEmpty(input)
      ? pipe(
          RNEA.head(input),
          chain((head) => go(append(head)(scope), RNEA.tail(input)))
        )
      : g(...scope)
      ? [f(...scope)]
      : empty
  return go(empty, input)
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
  const elemE = elem(E)
  return (second) => (first) => first.concat(second.filter((a) => !elemE(a)(first)))
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
export const of: Pointed1<URI>['of'] = RNEA.of

/**
 * @category Alternative
 * @since 3.0.0
 */
export const zero: Alternative1<URI>['zero'] = () => empty

/**
 * Less strict version of [`alt`](#alt).
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
 * @category Alt
 * @since 3.0.0
 */
export const alt: Alt1<URI>['alt'] = altW

/**
 * Apply a function to an argument under a type constructor.
 *
 * @category Apply
 * @since 3.0.0
 */
export const ap: Apply1<URI>['ap'] = (fa) => chain((f) => pipe(fa, map(f)))

/**
 * Composes computations in sequence, using the return value of one computation to determine the next computation.
 *
 * @category Chain
 * @since 3.0.0
 */
export const chain: Chain1<URI>['chain'] = (f) => (ma) =>
  pipe(
    ma,
    chainWithIndex((_, a) => f(a))
  )

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
export const flatten: <A>(mma: ReadonlyArray<ReadonlyArray<A>>) => ReadonlyArray<A> =
  /*#__PURE__*/
  chain(identity)

/**
 * @since 3.0.0
 */
export const chainWithIndex: <A, B>(
  f: (i: number, a: A) => ReadonlyArray<B>
) => (ma: ReadonlyArray<A>) => ReadonlyArray<B> = (f) => (ma) => {
  let outLen = 0
  const l = ma.length
  const temp = new Array(l)
  for (let i = 0; i < l; i++) {
    const e = ma[i]
    const arr = f(i, e)
    outLen += arr.length
    temp[i] = arr
  }
  const out = Array(outLen)
  let start = 0
  for (let i = 0; i < l; i++) {
    const arr = temp[i]
    const l = arr.length
    for (let j = 0; j < l; j++) {
      out[j + start] = arr[j]
    }
    start += l
  }
  return out
}

/**
 * `map` can be used to turn functions `(a: A) => B` into functions `(fa: F<A>) => F<B>` whose argument and return types
 * use the type constructor `F` to represent some computational context.
 *
 * @category Functor
 * @since 3.0.0
 */
export const map: Functor1<URI>['map'] = (f) => (fa) => fa.map((a) => f(a))

/**
 * @category FunctorWithIndex
 * @since 3.0.0
 */
export const mapWithIndex: FunctorWithIndex1<URI, number>['mapWithIndex'] = (f) => (fa) => fa.map((a, i) => f(i, a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const filterMapWithIndex: FilterableWithIndex1<URI, number>['filterMapWithIndex'] = <A, B>(
  f: (i: number, a: A) => Option<B>
) => (fa: ReadonlyArray<A>): ReadonlyArray<B> => {
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
export const filterMap: Filterable1<URI>['filterMap'] = (f) => filterMapWithIndex((_, a) => f(a))

/**
 * @category Compactable
 * @since 3.0.0
 */
export const compact: Compactable1<URI>['compact'] =
  /*#__PURE__*/
  filterMap(identity)

/**
 * @category Compactable
 * @since 3.0.0
 */
export const separate: Compactable1<URI>['separate'] = <A, B>(fa: ReadonlyArray<Either<A, B>>) => {
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
export const filter: Filterable1<URI>['filter'] = <A>(predicate: Predicate<A>) => (fa: ReadonlyArray<A>) =>
  fa.filter(predicate)

/**
 * @category Filterable
 * @since 3.0.00
 */
export const partition: Filterable1<URI>['partition'] = <A>(
  predicate: Predicate<A>
): ((fa: ReadonlyArray<A>) => Separated<ReadonlyArray<A>, ReadonlyArray<A>>) =>
  partitionWithIndex((_, a) => predicate(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionWithIndex: FilterableWithIndex1<URI, number>['partitionWithIndex'] = <A>(
  predicateWithIndex: PredicateWithIndex<number, A>
) => (fa: ReadonlyArray<A>): Separated<ReadonlyArray<A>, ReadonlyArray<A>> => {
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
export const partitionMap: Filterable1<URI>['partitionMap'] = (f) => partitionMapWithIndex((_, a) => f(a))

/**
 * @category FilterableWithIndex
 * @since 3.0.0
 */
export const partitionMapWithIndex: FilterableWithIndex1<URI, number>['partitionMapWithIndex'] = <A, B, C>(
  f: (i: number, a: A) => Either<B, C>
) => (fa: ReadonlyArray<A>): Separated<ReadonlyArray<B>, ReadonlyArray<C>> => {
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
export const filterWithIndex: FilterableWithIndex1<URI, number>['filterWithIndex'] = <A>(
  predicateWithIndex: PredicateWithIndex<number, A>
) => (fa: ReadonlyArray<A>): ReadonlyArray<A> => fa.filter((a, i) => predicateWithIndex(i, a))

/**
 * @category Extend
 * @since 3.0.0
 */
export const extend: Extend1<URI>['extend'] = (f) => (wa) => wa.map((_, i, as) => f(as.slice(i)))

/**
 * Derivable from `Extend`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const duplicate: <A>(wa: ReadonlyArray<A>) => ReadonlyArray<ReadonlyArray<A>> =
  /*#__PURE__*/
  extend(identity)

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const foldMapWithIndex: FoldableWithIndex1<URI, number>['foldMapWithIndex'] = (M) => (f) => (fa) =>
  fa.reduce((b, a, i) => M.concat(f(i, a))(b), M.empty)

/**
 * @category Foldable
 * @since 3.0.0
 */
export const reduce: Foldable1<URI>['reduce'] = (b, f) => reduceWithIndex(b, (_, b, a) => f(b, a))

/**
 * @category Foldable
 * @since 3.0.0
 */
export const foldMap: Foldable1<URI>['foldMap'] = (M) => {
  const foldMapWithIndexM = foldMapWithIndex(M)
  return (f) => foldMapWithIndexM((_, a) => f(a))
}

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceWithIndex: FoldableWithIndex1<URI, number>['reduceWithIndex'] = (b, f) => (fa) => {
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
export const reduceRight: Foldable1<URI>['reduceRight'] = (b, f) => reduceRightWithIndex(b, (_, a, b) => f(a, b))

/**
 * @category FoldableWithIndex
 * @since 3.0.0
 */
export const reduceRightWithIndex: FoldableWithIndex1<URI, number>['reduceRightWithIndex'] = (b, f) => (fa) =>
  fa.reduceRight((b, a, i) => f(i, a, b), b)

/**
 * @category Traversable
 * @since 3.0.0
 */
export const traverse: Traversable1<URI>['traverse'] = <F>(
  F: Applicative_<F>
): (<A, B>(f: (a: A) => HKT<F, B>) => (ta: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseWithIndexF = traverseWithIndex(F)
  return (f) => traverseWithIndexF((_, a) => f(a))
}

/**
 * @category Traversable
 * @since 3.0.0
 */
export const sequence: Traversable1<URI>['sequence'] = <F>(F: Applicative_<F>) => <A>(
  ta: ReadonlyArray<HKT<F, A>>
): HKT<F, ReadonlyArray<A>> => {
  return pipe(
    ta,
    reduce(F.of(zero()), (fas, fa) =>
      pipe(
        fas,
        F.map((as) => (a: A) => append(a)(as)),
        F.ap(fa)
      )
    )
  )
}

/**
 * @category TraversableWithIndex
 * @since 3.0.0
 */
export const traverseWithIndex: TraversableWithIndex1<URI, number>['traverseWithIndex'] = <F>(F: Applicative_<F>) => <
  A,
  B
>(
  f: (i: number, a: A) => HKT<F, B>
): ((ta: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) =>
  reduceWithIndex(F.of(zero()), (i, fbs, a) =>
    pipe(
      fbs,
      F.map((bs) => (b: B) => append(b)(bs)),
      F.ap(f(i, a))
    )
  )

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wither: Witherable1<URI>['wither'] = <F>(
  F: Applicative_<F>
): (<A, B>(f: (a: A) => HKT<F, Option<B>>) => (fa: ReadonlyArray<A>) => HKT<F, ReadonlyArray<B>>) => {
  const traverseF = traverse(F)
  return (f) => flow(traverseF(f), F.map(compact))
}

/**
 * @category Witherable
 * @since 3.0.0
 */
export const wilt: Witherable1<URI>['wilt'] = <F>(
  F: Applicative_<F>
): (<A, B, C>(
  f: (a: A) => HKT<F, Either<B, C>>
) => (fa: ReadonlyArray<A>) => HKT<F, Separated<ReadonlyArray<B>, ReadonlyArray<C>>>) => {
  const traverseF = traverse(F)
  return (f) => flow(traverseF(f), F.map(separate))
}

/**
 * @category Unfoldable
 * @since 3.0.0
 */
export const unfold: Unfoldable1<URI>['unfold'] = <B, A>(b: B, f: (b: B) => Option<readonly [A, B]>) => {
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
export type URI = 'ReadonlyArray'

declare module './HKT' {
  interface URItoKind<A> {
    readonly ReadonlyArray: ReadonlyArray<A>
  }
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
  concat: (second) => (first) => (isEmpty(first) ? second : isEmpty(second) ? first : first.concat(second))
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
export const Functor: Functor1<URI> = {
  map
}

/**
 * Derivable from `Functor`.
 *
 * @category combinators
 * @since 3.0.0
 */
export const flap =
  /*#_PURE_*/
  flap_(Functor)

/**
 * @category instances
 * @since 3.0.0
 */
export const Pointed: Pointed1<URI> = {
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FunctorWithIndex: FunctorWithIndex1<URI, number> = {
  mapWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Apply: Apply1<URI> = {
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
export const apFirst =
  /*#__PURE__*/
  apFirst_(Apply)

/**
 * Combine two effectful actions, keeping only the result of the second.
 *
 * Derivable from `Apply`.
 *
 * @category derivable combinators
 * @since 3.0.0
 */
export const apSecond =
  /*#__PURE__*/
  apSecond_(Apply)

/**
 * @category instances
 * @since 3.0.0
 */
export const Applicative: Applicative1<URI> = {
  map,
  ap,
  of
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Chain: Chain1<URI> = {
  map,
  chain
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Monad: Monad1<URI> = {
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
 * @category derivable combinators
 * @since 3.0.0
 */
export const chainFirst =
  /*#__PURE__*/
  chainFirst_(Chain)

/**
 * @category instances
 * @since 3.0.0
 */
export const Unfoldable: Unfoldable1<URI> = {
  unfold
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alt: Alt1<URI> = {
  map,
  alt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Alternative: Alternative1<URI> = {
  map,
  alt,
  zero
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Extend: Extend1<URI> = {
  map,
  extend
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Compactable: Compactable1<URI> = {
  compact,
  separate
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Filterable: Filterable1<URI> = {
  filter,
  filterMap,
  partition,
  partitionMap
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FilterableWithIndex: FilterableWithIndex1<URI, number> = {
  partitionMapWithIndex,
  partitionWithIndex,
  filterMapWithIndex,
  filterWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Foldable: Foldable1<URI> = {
  reduce,
  foldMap,
  reduceRight
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FoldableWithIndex: FoldableWithIndex1<URI, number> = {
  reduceWithIndex,
  foldMapWithIndex,
  reduceRightWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Traversable: Traversable1<URI> = {
  map,
  traverse,
  sequence
}

/**
 * @category instances
 * @since 3.0.0
 */
export const TraversableWithIndex: TraversableWithIndex1<URI, number> = {
  traverseWithIndex
}

/**
 * @category instances
 * @since 3.0.0
 */
export const Witherable: Witherable1<URI> = {
  wither,
  wilt
}

/**
 * @category instances
 * @since 3.0.0
 */
export const FromEither: FromEither1<URI> = {
  fromEither
}

/**
 * @category constructors
 * @since 3.0.0
 */
export const fromPredicate =
  /*#__PURE__*/
  fromPredicate_(FromEither)

// -------------------------------------------------------------------------------------
// utils
// -------------------------------------------------------------------------------------

/**
 * An empty `ReadonlyArray`.
 *
 * @since 3.0.0
 */
export const empty: ReadonlyArray<never> = RNEA.empty

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
export const every = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): boolean => as.every(predicate)

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
export const some = <A>(predicate: Predicate<A>) => (as: ReadonlyArray<A>): boolean => as.some(predicate)

// -------------------------------------------------------------------------------------
// do notation
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const Do: ReadonlyArray<{}> =
  /*#__PURE__*/
  of({})

/**
 * @since 3.0.0
 */
export const bindTo =
  /*#__PURE__*/
  bindTo_(Functor)

/**
 * @since 3.0.0
 */
export const bind =
  /*#__PURE__*/
  bind_(Chain)

// -------------------------------------------------------------------------------------
// sequence S
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const apS =
  /*#__PURE__*/
  apS_(Apply)

// -------------------------------------------------------------------------------------
// sequence T
// -------------------------------------------------------------------------------------

/**
 * @since 3.0.0
 */
export const ApT: ReadonlyArray<readonly []> = of([])

/**
 * @since 3.0.0
 */
export const tupled =
  /*#__PURE__*/
  tupled_(Functor)

/**
 * @since 3.0.0
 */
export const apT =
  /*#__PURE__*/
  apT_(Apply)
